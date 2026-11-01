import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import {
  verifySignedSessionToken,
  SESSION_COOKIE_NAME,
  sanitizeString,
} from '@/lib/security';

export const dynamic = 'force-dynamic';

async function isAuthenticated(): Promise<boolean> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  const result = await verifySignedSessionToken(sessionCookie);
  return result.valid;
}

const ALLOWED_STATUSES = new Set([
  'ALL',
  'PENDING',
  'CONFIRMED',
  'RESCHEDULED',
  'REJECTED',
  'DONE',
]);

export async function GET(request: Request) {
  // 1. Strict Cryptographic Authentication (OWASP ASVS V2 & V3)
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: 'Доступ заборонено: потрібна автентифікація' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    // 2. Input Validation on Query Parameters (OWASP ASVS V5.1)
    const rawSearch = searchParams.get('search');
    const rawStatus = searchParams.get('status');

    const search = rawSearch ? sanitizeString(rawSearch, 50).toLowerCase() : '';
    const statusParam = rawStatus ? sanitizeString(rawStatus, 20).toUpperCase() : 'ALL';
    const status = ALLOWED_STATUSES.has(statusParam) ? statusParam : 'ALL';

    const where: any = {};
    if (status !== 'ALL') {
      if (status === 'PENDING') {
        where.status = { in: ['PENDING', 'NEW'] };
      } else {
        where.status = status;
      }
    }

    // 3. Database Query with Pagination Limit (OWASP ASVS V11 - DoS protection)
    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200, // Bound result set to prevent memory exhaustion
    });

    const filtered = search
      ? bookings.filter((b) => {
          return (
            b.name.toLowerCase().includes(search) ||
            b.phone.toLowerCase().includes(search) ||
            (b.email && b.email.toLowerCase().includes(search)) ||
            (b.car && b.car.toLowerCase().includes(search)) ||
            b.date.includes(search) ||
            b.services.toLowerCase().includes(search)
          );
        })
      : bookings;

    const normalized = filtered.map((b) => ({
      ...b,
      status: b.status === 'NEW' ? 'PENDING' : b.status,
    }));

    return NextResponse.json({ success: true, bookings: normalized });
  } catch (error) {
    // OWASP ASVS V7: Safe error handling
    console.error('[SECURITY ERROR] Error fetching admin bookings:', error);
    return NextResponse.json(
      { error: 'Помилка при завантаженні списку заявок' },
      { status: 500 }
    );
  }
}
