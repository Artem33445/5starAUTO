import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import {
  verifySignedSessionToken,
  SESSION_COOKIE_NAME,
  validateAdminAction,
  sanitizeString,
  checkCsrfOrigin,
} from '@/lib/security';
import {
  sendBookingConfirmedEmail,
  sendBookingRescheduledEmail,
  sendBookingRejectedEmail,
} from '@/lib/email';

export const dynamic = 'force-dynamic';

async function isAuthenticated(): Promise<boolean> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  const result = await verifySignedSessionToken(sessionCookie);
  return result.valid;
}

function isValidId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,64}$/.test(id);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 1. Strict Cryptographic Authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Доступ заборонено: потрібна автентифікація' }, { status: 401 });
  }

  // 2. CSRF Defense
  if (!checkCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Помилка безпеки: недійсне джерело запиту (CSRF)' }, { status: 403 });
  }

  // 3. ID format validation
  const id = sanitizeString(params?.id, 64);
  if (!id || !isValidId(id)) {
    return NextResponse.json({ error: 'Некоректний ідентифікатор заявки' }, { status: 400 });
  }

  try {
    const rawBody = await request.json().catch(() => ({}));

    // 4. Input Validation (OWASP ASVS V5.1)
    const validation = validateAdminAction(rawBody);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { error: 'Помилка валідації', details: validation.errors },
        { status: 400 }
      );
    }

    const { action, status, adminComment, suggestedDate, suggestedSlot, notes } = validation.data;

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: 'Заявку не знайдено' }, { status: 404 });
    }

    let updatedBooking;
    let emailResult: any = null;

    if (action === 'CONFIRM') {
      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'CONFIRMED',
          adminComment: adminComment || existingBooking.adminComment,
        },
      });

      // Send Confirmation Email
      if (existingBooking.email) {
        emailResult = await sendBookingConfirmedEmail({
          email: existingBooking.email,
          name: existingBooking.name,
          lang: (existingBooking as any).lang || 'pl',
          date: existingBooking.date,
          timeSlot: existingBooking.timeSlot,
          car: existingBooking.car,
          totalPrice: existingBooking.totalPrice,
        });
      }
    } else if (action === 'RESCHEDULE') {
      const finalDate = suggestedDate || existingBooking.date;
      const finalSlot = suggestedSlot || existingBooking.timeSlot;

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'RESCHEDULED',
          suggestedDate: finalDate,
          suggestedSlot: finalSlot,
          adminComment: adminComment || null,
        },
      });

      // Send Rescheduled Email
      if (existingBooking.email) {
        emailResult = await sendBookingRescheduledEmail({
          email: existingBooking.email,
          name: existingBooking.name,
          lang: (existingBooking as any).lang || 'pl',
          newDate: finalDate,
          newSlot: finalSlot,
          comment: adminComment || null,
        });
      }
    } else if (action === 'REJECT') {
      updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
          status: 'REJECTED',
          adminComment: adminComment || null,
        },
      });

      // Send Rejection Email
      if (existingBooking.email) {
        emailResult = await sendBookingRejectedEmail({
          email: existingBooking.email,
          name: existingBooking.name,
          lang: (existingBooking as any).lang || 'pl',
          comment: adminComment || null,
        });
      }
    } else {
      // General status update
      const dataToUpdate: any = {};
      if (status) dataToUpdate.status = status;
      if (notes !== undefined) dataToUpdate.notes = notes;
      if (adminComment !== undefined) dataToUpdate.adminComment = adminComment;
      if (suggestedDate !== undefined) dataToUpdate.suggestedDate = suggestedDate;
      if (suggestedSlot !== undefined) dataToUpdate.suggestedSlot = suggestedSlot;

      updatedBooking = await prisma.booking.update({
        where: { id },
        data: dataToUpdate,
      });
    }

    return NextResponse.json({ success: true, booking: updatedBooking, emailResult });
  } catch (error) {
    // OWASP ASVS V7: Safe error handling
    console.error(`[SECURITY ERROR] Error updating booking ${id}:`, error);
    return NextResponse.json(
      { error: 'Помилка при оновленні статусу заявки' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 1. Strict Cryptographic Authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Доступ заборонено: потрібна автентифікація' }, { status: 401 });
  }

  // 2. CSRF Defense
  if (!checkCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Помилка безпеки: недійсне джерело запиту (CSRF)' }, { status: 403 });
  }

  // 3. ID format validation
  const id = sanitizeString(params?.id, 64);
  if (!id || !isValidId(id)) {
    return NextResponse.json({ error: 'Некоректний ідентифікатор заявки' }, { status: 400 });
  }

  try {
    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Заявку успішно видалено' });
  } catch (error) {
    console.error(`[SECURITY ERROR] Error deleting booking ${id}:`, error);
    return NextResponse.json(
      { error: 'Помилка при видаленні заявки' },
      { status: 500 }
    );
  }
}
