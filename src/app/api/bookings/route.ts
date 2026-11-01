import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  validateBookingPayload,
  checkCsrfOrigin,
  checkRateLimit,
  getClientIp,
  escapeHtml,
} from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. CSRF Defense (OWASP Cross-Site Request Forgery Cheat Sheet)
    if (!checkCsrfOrigin(request)) {
      return NextResponse.json(
        { error: 'Помилка безпеки: недійсне джерело запиту (CSRF)' },
        { status: 403 }
      );
    }

    // 2. Defense-in-depth Rate Limiting (OWASP ASVS V11.1)
    const ip = getClientIp(request.headers);
    const rate = checkRateLimit(`booking_api:${ip}`, 10, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Забагато запитів. Зачекайте ${rate.resetInSeconds} секунд перед повторною відправкою.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rate.resetInSeconds) },
        }
      );
    }

    // 3. Request Body Parsing & Input Validation (OWASP ASVS V5.1)
    const rawBody = await request.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json(
        { error: 'Некоректний JSON запиту' },
        { status: 400 }
      );
    }

    const validation = validateBookingPayload(rawBody);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        {
          error: validation.errors[0] || 'Помилка валідації полів',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, phone, email, lang, car, date, timeSlot, services, totalPrice, notes } = validation.data;

    // 4. Persistence into Database with Parameterized ORM (OWASP ASVS V5.3 - SQL Injection Defense)
    let bookingId = `rb-${Date.now().toString(36)}`;
    try {
      const booking = await prisma.booking.create({
        data: {
          name,
          phone,
          email,
          lang: lang || 'pl',
          car,
          date,
          timeSlot,
          services,
          totalPrice,
          notes,
          status: 'PENDING',
        },
      });
      bookingId = booking.id;
    } catch (dbError) {
      console.warn('[DATABASE WARNING] Could not persist booking:', dbError);
    }

    // 5. Send Telegram Notification with Strict HTML Escaping (OWASP ASVS V5.2 - XSS/HTML Injection Defense)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const safeName = escapeHtml(name);
      const safePhone = escapeHtml(phone);
      const safeEmail = escapeHtml(email);
      const safeCar = escapeHtml(car || 'Не вказано');
      const safeDate = escapeHtml(date);
      const safeTimeSlot = escapeHtml(timeSlot);
      const safeServices = escapeHtml(services);
      const safeNotes = escapeHtml(notes || '—');
      const langBadge = (lang || 'pl') === 'pl' ? '🇵🇱 Польська (PL)' : '🇺🇦 Українська (UK)';

      const htmlMessage =
        `🔔 <b>НОВА ЗАЯВКА НА СТО RED BOX!</b>\n\n` +
        `👤 <b>Клієнт:</b> ${safeName}\n` +
        `🌐 <b>Мова:</b> ${langBadge}\n` +
        `📞 <b>Телефон:</b> <code>${safePhone}</code>\n` +
        `📧 <b>Email:</b> ${safeEmail}\n` +
        `🚗 <b>Авто:</b> ${safeCar}\n` +
        `📅 <b>Бажаний час:</b> ${safeDate} о <b>${safeTimeSlot}</b>\n` +
        `🔧 <b>Послуги:</b> ${safeServices}\n` +
        `💰 <b>Орієнтовно:</b> <b>${totalPrice} PLN</b>\n` +
        `💬 <b>Симптоми:</b> ${safeNotes}\n\n` +
        `👉 <i>ID заявки: <code>${bookingId}</code></i>`;

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: htmlMessage,
            parse_mode: 'HTML',
          }),
        });

        if (!tgRes.ok) {
          // Plain text fallback if HTML parsing fails
          const plainText =
            `🔔 НОВА ЗАЯВКА НА СТО RED BOX!\n\n` +
            `Клієнт: ${name}\nМова: ${langBadge}\nТелефон: ${phone}\nEmail: ${email}\nАвто: ${car || 'Не вказано'}\nЧас: ${date} ${timeSlot}\nПослуги: ${services}\nСума: ${totalPrice} PLN\nСимптоми: ${notes || '—'}`;

          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: plainText,
            }),
          }).catch((e) => console.error('[TELEGRAM] Fallback failed:', e));
        }
      } catch (tgError) {
        // Log securely without leaking secrets
        console.error('[TELEGRAM] Notification error:', tgError);
      }
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Заявку успішно створено',
    });
  } catch (error) {
    // OWASP ASVS V7: Generic error response, avoid leaking stack trace or SQL schema
    console.error('[SECURITY ERROR] Booking creation error:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера при збереженні заявки. Спробуйте пізніше.' },
      { status: 500 }
    );
  }
}
