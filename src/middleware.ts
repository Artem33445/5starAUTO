import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  verifySignedSessionToken,
  SESSION_COOKIE_NAME,
  checkRateLimit,
  getClientIp,
} from '@/lib/security';

export const ADMIN_SECRET_SLUG = process.env.ADMIN_SECRET_SLUG || 'manage-rb94x';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request.headers);

  // 1. OBFUSCATION: HARD 404 ON LEGACY /admin PATHS (Security through obscurity)
  // Any bot, crawler or attacker probing standard /admin or /api/admin is rejected with 404 Not Found
  if (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/api/admin' ||
    pathname.startsWith('/api/admin/')
  ) {
    return NextResponse.rewrite(new URL('/_not-found', request.url), {
      status: 404,
    });
  }

  // 2. RATE LIMITING (OWASP ASVS V11.1 & Denial of Service Cheat Sheet)
  // Throttle secret login endpoint: max 5 requests per 15 minutes per IP
  if (pathname === `/api/${ADMIN_SECRET_SLUG}/login`) {
    const rate = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Забагато спроб входу. Зачекайте ${rate.resetInSeconds} секунд перед наступною спробою.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.resetInSeconds),
          },
        }
      );
    }
  }

  // Booking submissions: max 10 submissions per 60 seconds per IP
  if (pathname === '/api/bookings' && request.method === 'POST') {
    const rate = checkRateLimit(`booking:${ip}`, 10, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Забагато запитів. Зачекайте ${rate.resetInSeconds} секунд перед повторною відправкою.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.resetInSeconds),
          },
        }
      );
    }
  }

  // 3. CRYPTOGRAPHIC SESSION VERIFICATION (OWASP ASVS V2 & V3)
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionCheck = await verifySignedSessionToken(sessionCookie);
  const isAuthenticated = sessionCheck.valid;

  // Protect Secret Admin API routes (except login)
  if (
    pathname.startsWith(`/api/${ADMIN_SECRET_SLUG}`) &&
    pathname !== `/api/${ADMIN_SECRET_SLUG}/login`
  ) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Доступ заборонено: відсутня або недійсна авторизаційна сесія' },
        { status: 401 }
      );
    }
  }

  // Protect Secret Admin UI pages (except login)
  if (
    pathname.startsWith(`/${ADMIN_SECRET_SLUG}`) &&
    pathname !== `/${ADMIN_SECRET_SLUG}/login`
  ) {
    if (!isAuthenticated) {
      const loginUrl = new URL(`/${ADMIN_SECRET_SLUG}/login`, request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated and visits secret login page, redirect to dashboard
  if (pathname === `/${ADMIN_SECRET_SLUG}/login` && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${ADMIN_SECRET_SLUG}`, request.url));
  }

  // 4. APPLY OWASP RECOMMENDED SECURITY HEADERS (ASVS V14.4)
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('X-XSS-Protection', '1; mode=block');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/manage-rb94x/:path*',
    '/api/admin/:path*',
    '/api/manage-rb94x/:path*',
    '/api/bookings',
  ],
};
