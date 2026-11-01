const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Starting Firebase export & deployment for 5STARAUTO...');

const apiDir = 'src/app/api';
const tempApiDir = 'src/app/_api_temp';
let moved = false;

try {
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, tempApiDir);
    moved = true;
    console.log('📦 Temporarily isolated server API routes for static export...');
  }

  console.log('⚡ Building static Next.js export...');
  execSync('npx next build', {
    stdio: 'inherit',
    env: { ...process.env, NEXT_EXPORT: 'true' },
  });

  console.log('🌐 Deploying static build to Firebase Hosting...');
  execSync('npx firebase-tools deploy --only hosting', {
    stdio: 'inherit',
  });

  console.log('✅ Successfully deployed to Firebase Hosting!');
} catch (err) {
  console.error('❌ Deployment error:', err.message);
  process.exitCode = 1;
} finally {
  if (moved && fs.existsSync(tempApiDir)) {
    fs.renameSync(tempApiDir, apiDir);
    console.log('🔄 Restored server API routes for local development.');
  }
}

