import {
  createSignedSessionToken,
  verifySignedSessionToken,
  timingSafeEqualString,
  checkRateLimit,
  checkCsrfOrigin,
  sanitizeString,
  escapeHtml,
  validateBookingPayload,
  validateAdminAction,
} from '../src/lib/security';

async function runSecurityTests() {
  console.log('🔒 ========================================================');
  console.log('🔒 OWASP ASVS & OWASP CheatSheetSeries Security Test Suite');
  console.log('🔒 ========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(name: string, condition: boolean) {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
      failed++;
    }
  }

  // --------------------------------------------------------------------------
  // 1. ASVS V2.8: Constant-time password comparison
  // --------------------------------------------------------------------------
  console.log('▶️ 1. Testing Timing-Attack Resistant Comparison (ASVS V2.8)...');
  const validPass = await timingSafeEqualString('redbox_admin_2026', 'redbox_admin_2026');
  assert('Identical passwords match', validPass === true);

  const invalidPass = await timingSafeEqualString('redbox_admin_2026', 'wrong_password_99');
  assert('Different passwords rejected', invalidPass === false);

  const prefixAttack = await timingSafeEqualString('redbox_admin_2026', 'redbox_admin_202');
  assert('Prefix password guessing rejected', prefixAttack === false);

  // --------------------------------------------------------------------------
  // 2. ASVS V3.2: Cryptographic Session Management (Anti-tamper HMAC-SHA256)
  // --------------------------------------------------------------------------
  console.log('\n▶️ 2. Testing Cryptographic Session Tokens (ASVS V3.2)...');
  const token = await createSignedSessionToken();
  assert('Session token generated in JWT 3-part format', token.split('.').length === 3);

  const verified = await verifySignedSessionToken(token);
  assert('Legitimate session token successfully verified', verified.valid === true && verified.payload?.role === 'admin');

  // Test Tampering: Alter payload byte
  const parts = token.split('.');
  const tamperedPayload = parts[1].slice(0, -2) + 'AA';
  const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;
  const tamperedCheck = await verifySignedSessionToken(tamperedToken);
  assert('Tampered session token payload is REJECTED', tamperedCheck.valid === false);

  // Test Tampering: Invalid signature
  const fakeSigToken = `${parts[0]}.${parts[1]}.fake_signature_abc_123`;
  const fakeSigCheck = await verifySignedSessionToken(fakeSigToken);
  assert('Forged session signature is REJECTED', fakeSigCheck.valid === false);

  // Test Historical Bug: Static string 'authenticated'
  const staticCheck = await verifySignedSessionToken('authenticated');
  assert('Legacy static "authenticated" cookie is strictly REJECTED', staticCheck.valid === false);

  // --------------------------------------------------------------------------
  // 3. ASVS V11.1 & Denial of Service: Rate Limiting
  // --------------------------------------------------------------------------
  console.log('\n▶️ 3. Testing Rate Limiting & Brute-Force Throttle (ASVS V11.1)...');
  const testIp = '198.51.100.42';
  const rateLimitKey = `test_login:${testIp}`;

  // Allow 3 requests in 10-second window
  const r1 = checkRateLimit(rateLimitKey, 3, 10000);
  const r2 = checkRateLimit(rateLimitKey, 3, 10000);
  const r3 = checkRateLimit(rateLimitKey, 3, 10000);
  assert('Requests within limit are permitted', r1.allowed && r2.allowed && r3.allowed);

  const r4 = checkRateLimit(rateLimitKey, 3, 10000);
  assert('Request exceeding rate limit is BLOCKED with 429', r4.allowed === false && r4.resetInSeconds > 0);

  // --------------------------------------------------------------------------
  // 4. ASVS V5.1 & Input Validation Cheat Sheet
  // --------------------------------------------------------------------------
  console.log('\n▶️ 4. Testing Input Validation & Sanitization (ASVS V5.1 & V5.2)...');
  
  // Test XSS sanitization
  const rawXss = '<script>alert("xss")</script>Jan Kowalski';
  const sanitized = sanitizeString(rawXss);
  const escaped = escapeHtml(sanitized);
  assert('HTML characters escaped for safe display', escaped.includes('&lt;script&gt;') && !escaped.includes('<script>'));

  // Test Valid Booking Payload
  const today = new Date();
  today.setDate(today.getDate() + 2);
  const futureDate = today.toISOString().split('T')[0];

  const validPayload = {
    name: '  Marek Nowak  ',
    phone: '+48 571 365 253',
    email: 'Marek.Nowak@example.com',
    car: 'Audi A4 2.0 TDI',
    date: futureDate,
    timeSlot: '10:00',
    services: ['Діагностика', 'Ходова частина'],
    totalPrice: 250,
    notes: 'Шум у передній підвісці',
  };

  const bookingVal = validateBookingPayload(validPayload);
  assert('Valid booking payload accepted and sanitized', bookingVal.valid === true && bookingVal.data?.email === 'marek.nowak@example.com');

  // Test Malicious/Invalid Email
  const badEmailPayload = { ...validPayload, email: 'attacker<script>@evil.com' };
  const badEmailVal = validateBookingPayload(badEmailPayload);
  assert('Malformed email payload rejected', badEmailVal.valid === false);

  // Test Past Date Injection
  const pastDatePayload = { ...validPayload, date: '2020-01-01' };
  const pastDateVal = validateBookingPayload(pastDatePayload);
  assert('Past date injection rejected', pastDateVal.valid === false);

  // Test Invalid Time Slot Injection
  const badSlotPayload = { ...validPayload, timeSlot: '23:59' };
  const badSlotVal = validateBookingPayload(badSlotPayload);
  assert('Unlisted timeSlot injection rejected', badSlotVal.valid === false);

  // Test Admin Action Whitelist
  const badAdminAction = { action: 'DROP_DATABASE' };
  const adminVal = validateAdminAction(badAdminAction);
  assert('Illegal admin action rejected', adminVal.valid === false);

  const goodAdminAction = { action: 'CONFIRM', adminComment: 'Прийнято в роботу' };
  const goodAdminVal = validateAdminAction(goodAdminAction);
  assert('Valid admin action approved', goodAdminVal.valid === true);

  // --------------------------------------------------------------------------
  // 5. CSRF Defense (OWASP Cross-Site Request Forgery Cheat Sheet)
  // --------------------------------------------------------------------------
  console.log('\n▶️ 5. Testing CSRF Origin Validation (OWASP CSRF Cheat Sheet)...');
  const legitimateRequest = new Request('https://redbox.lubon.pl/api/bookings', {
    method: 'POST',
    headers: {
      host: 'redbox.lubon.pl',
      origin: 'https://redbox.lubon.pl',
    },
  });
  assert('Legitimate same-origin request accepted', checkCsrfOrigin(legitimateRequest) === true);

  const maliciousCsrfRequest = new Request('https://redbox.lubon.pl/api/bookings', {
    method: 'POST',
    headers: {
      host: 'redbox.lubon.pl',
      origin: 'https://evil-phishing-site.com',
    },
  });
  assert('Cross-site foreign origin request REJECTED (CSRF Defense)', checkCsrfOrigin(maliciousCsrfRequest) === false);

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  console.log('\n========================================================');
  console.log(`🎯 Test Summary: Passed ${passed} / ${passed + failed}`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTests().catch((e) => {
  console.error('Fatal error running tests:', e);
  process.exit(1);
});
