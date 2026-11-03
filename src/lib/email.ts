import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build_testing');
const FROM_EMAIL = process.env.EMAIL_FROM || '5STARAUTO Warsztat <onboarding@resend.dev>';

// Safe wrapper that handles Resend test-domain restrictions
async function safeSendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const res = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (res.error) {
      console.error('[RESEND ERROR]', res.error);

      // In Resend free test mode (onboarding@resend.dev), emails can only be sent to the registered owner (zulv304@gmail.com)
      const match = res.error.message?.match(/own email address \(([^)]+)\)/);
      const fallbackAccountEmail = match ? match[1] : 'zulv304@gmail.com';

      if (res.error.statusCode === 403 && options.to.toLowerCase() !== fallbackAccountEmail.toLowerCase()) {
        console.warn(
          `[RESEND TEST-MODE REDIRECTION] Sending to account owner ${fallbackAccountEmail} instead of ${options.to}`
        );

        const fallbackRes = await resend.emails.send({
          from: FROM_EMAIL,
          to: fallbackAccountEmail,
          subject: `[Тест для ${options.to}] ${options.subject}`,
          html:
            `
            <div style="background-color: #27272a; color: #facc15; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px; line-height: 1.5; border-left: 4px solid #eab308;">
              ⚠️ <b>Тестовий режим Resend:</b> Оскільки власний домен СТО ще не верифіковано в <a href="https://resend.com/domains" style="color: #60a5fa;" target="_blank">resend.com/domains</a>, тестові листи від <code>onboarding@resend.dev</code> доставляються тільки на пошту власника акаунту (<b>${fallbackAccountEmail}</b>).<br/>
              Цей лист призначався для клієнта: <b>${options.to}</b>
            </div>
          ` + options.html,
        });

        return { ...fallbackRes, redirectedTo: fallbackAccountEmail };
      }
    }

    return res;
  } catch (err) {
    console.error('[RESEND FATAL]', err);
    return { data: null, error: err };
  }
}

function wrapHtml(inner: string, border: string) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; color: #0f172a; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid ${border}; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      ${inner}
    </div>
  `;
}

// 1. ПОДТВЕРЖДЕНИЕ ЗАПИСИ
export async function sendBookingConfirmedEmail(b: {
  email: string;
  name: string;
  lang?: string;
  date: string;
  timeSlot: string;
  car?: string | null;
  totalPrice: number;
}) {
  if (!b.email) return;

  const isPl = (b.lang || 'pl') === 'pl';
  const subject = isPl
    ? '5STARAUTO: Twoja wizyta została potwierdzona!'
    : '5STARAUTO: Вашу заявку підтверджено!';

  const content = isPl
    ? `
    <h2 style="color: #dc2626; margin-top: 0;">5STARAUTO Warsztat Samochodowy Poznań</h2>
    <p style="font-size: 16px;">Dzień dobry, <b>${b.name}</b>!</p>
    <p style="font-size: 15px; color: #334155;">Twoja rezerwacja w warsztacie została <b>pomyślnie potwierdzona</b> przez mechanika.</p>
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 6px 0;">📅 <b>Termin:</b> ${b.date} o godz. <b>${b.timeSlot}</b></p>
      <p style="margin: 6px 0;">🚗 <b>Pojazd:</b> ${b.car || 'Nie podano'}</p>
      <p style="margin: 6px 0;">💰 <b>Szacunkowy koszt:</b> ${b.totalPrice} PLN</p>
      <p style="margin: 6px 0;">📍 <b>Adres:</b> Poznań, ul. Kazimierza Jarochowskiego 105</p>
      <p style="margin: 6px 0;">📞 <b>Telefon do warsztatu:</b> +48 512 145 314</p>
    </div>
    <p style="font-size: 13px; color: #64748b;">Czekamy na Ciebie w wyznaczonym terminie. W razie potrzeby zmiany terminu, prosimy o kontakt telefoniczny.</p>
  `
    : `
    <h2 style="color: #dc2626; margin-top: 0;">5STARAUTO Автосервіс Познань</h2>
    <p style="font-size: 16px;">Вітаємо, <b>${b.name}</b>!</p>
    <p style="font-size: 15px; color: #334155;">Ваш візит до автосервісу <b>успішно підтверджено</b> майстром.</p>
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 6px 0;">📅 <b>Дата та час:</b> ${b.date} о <b>${b.timeSlot}</b></p>
      <p style="margin: 6px 0;">🚗 <b>Автомобіль:</b> ${b.car || 'Не вказано'}</p>
      <p style="margin: 6px 0;">💰 <b>Орієнтовна вартість:</b> ${b.totalPrice} PLN</p>
      <p style="margin: 6px 0;">📍 <b>Адреса:</b> Poznań, ul. Kazimierza Jarochowskiego 105</p>
      <p style="margin: 6px 0;">📞 <b>Телефон майстра:</b> +48 512 145 314</p>
    </div>
    <p style="font-size: 13px; color: #64748b;">Чекаємо на вас у призначений час. Якщо ваші плани зміняться, попередьте нас заздалегідь.</p>
  `;

  return await safeSendEmail({
    to: b.email,
    subject,
    html: wrapHtml(content, '#dc2626'),
  });
}

// 2. ПРЕДЛОЖЕНИЕ ДРУГОГО ВРЕМЕНИ (ПЕРЕНОС)
export async function sendBookingRescheduledEmail(b: {
  email: string;
  name: string;
  lang?: string;
  newDate: string;
  newSlot: string;
  comment?: string | null;
}) {
  if (!b.email) return;

  const isPl = (b.lang || 'pl') === 'pl';
  const subject = isPl
    ? '5STARAUTO: Propozycja zmiany terminu wizyty'
    : '5STARAUTO: Пропозиція зміни часу візиту';

  const content = isPl
    ? `
    <h2 style="color: #2563eb; margin-top: 0;">5STARAUTO Warsztat Samochodowy Poznań</h2>
    <p style="font-size: 16px;">Dzień dobry, <b>${b.name}</b>!</p>
    <p style="font-size: 15px; color: #334155;">Niestety wybrany termin jest już zajęty. Warsztat proponuje zmianę godziny:</p>
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 6px 0;">🕒 <b>Nowy proponowany termin:</b> <span style="color: #2563eb; font-weight: bold;">${b.newDate} o godz. ${b.newSlot}</span></p>
      ${b.comment ? `<p style="margin: 12px 0 6px 0; color: #d97706;">💬 <b>Komentarz mechanika:</b><br/><i>"${b.comment}"</i></p>` : ''}
      <p style="margin: 6px 0;">📍 <b>Adres:</b> Poznań, ul. Kazimierza Jarochowskiego 105</p>
      <p style="margin: 6px 0;">📞 <b>Telefon:</b> +48 512 145 314</p>
    </div>
    <p style="font-size: 14px; color: #475569;">Jeśli odpowiada Ci ta godzina — po prostu odpowiedz na tego maila lub zadzwoń do nas.</p>
  `
    : `
    <h2 style="color: #2563eb; margin-top: 0;">5STARAUTO Автосервіс Познань</h2>
    <p style="font-size: 16px;">Вітаємо, <b>${b.name}</b>!</p>
    <p style="font-size: 15px; color: #334155;">На жаль, обраний вами час зайнятий. Майстер пропонує скоригувати час візиту:</p>
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 6px 0;">🕒 <b>Пропонований новий час:</b> <span style="color: #2563eb; font-weight: bold;">${b.newDate} о ${b.newSlot}</span></p>
      ${b.comment ? `<p style="margin: 12px 0 6px 0; color: #d97706;">💬 <b>Коментар майстра:</b><br/><i>"${b.comment}"</i></p>` : ''}
      <p style="margin: 6px 0;">📍 <b>Адреса:</b> Poznań, ul. Kazimierza Jarochowskiego 105</p>
      <p style="margin: 6px 0;">📞 <b>Телефон:</b> +48 512 145 314</p>
    </div>
    <p style="font-size: 14px; color: #475569;">Якщо цей час вам підходить — просто надайте відповідь на цей лист або зателефонуйте нам.</p>
  `;

  return await safeSendEmail({
    to: b.email,
    subject,
    html: wrapHtml(content, '#2563eb'),
  });
}

// 3. ОТКЛОНЕНИЕ ЗАЯВКИ
export async function sendBookingRejectedEmail(b: {
  email: string;
  name: string;
  lang?: string;
  comment?: string | null;
}) {
  if (!b.email) return;

  const isPl = (b.lang || 'pl') === 'pl';
  const subject = isPl
    ? '5STARAUTO: Informacja o Twojej rezerwacji'
    : '5STARAUTO: Інформація щодо вашого запису';

  const content = isPl
    ? `
    <h2 style="color: #dc2626; margin-top: 0;">5STARAUTO Warsztat Samochodowy Poznań</h2>
    <p style="font-size: 16px;">Dzień dobry, <b>${b.name}</b>!</p>
    <p style="font-size: 15px; color: #334155;">Niestety nie jesteśmy w stanie przyjąć Twojego pojazdu w wybranym terminie.</p>
    ${b.comment ? `
    <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #fecaca;">
      <p style="margin: 0; color: #dc2626;"><b>Powód / Komentarz:</b><br/><i>"${b.comment}"</i></p>
    </div>` : ''}
    <p style="font-size: 14px; color: #64748b;">Skontaktuj się z nami telefonicznie pod numerem <b>+48 512 145 314</b>, aby ustalić inny wolny termin.</p>
  `
    : `
    <h2 style="color: #dc2626; margin-top: 0;">5STARAUTO Автосервіс Познань</h2>
    <p style="font-size: 16px;">Вітаємо, <b>${b.name}</b>!</p>
    <p style="font-size: 15px; color: #334155;">На жаль, ми не маємо можливості прийняти ваше авто на обслуговування у зазначений термін.</p>
    ${b.comment ? `
    <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #fecaca;">
      <p style="margin: 0; color: #dc2626;"><b>Причина / Коментар:</b><br/><i>"${b.comment}"</i></p>
    </div>` : ''}
    <p style="font-size: 14px; color: #64748b;">Ви можете зателефонувати нам за номером <b>+48 512 145 314</b>, щоб підібрати інші вільні дати.</p>
  `;

  return await safeSendEmail({
    to: b.email,
    subject,
    html: wrapHtml(content, '#dc2626'),
  });
}
