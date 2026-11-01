import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return NextResponse.json({ success: true, message: 'Ви успішно вийшли з панелі' });
}
