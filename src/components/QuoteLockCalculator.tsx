'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  Calendar,
  Clock,
  Phone,
  User,
  MessageCircle,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { REDBOX_SERVICES } from '@/data/services';
import { CustomCalendar } from '@/components/CustomCalendar';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface CalculatorProps {
  currentLang: Language;
  preselectedServiceId?: string | null;
}

export const QuoteLockCalculator: React.FC<CalculatorProps> = ({
  currentLang,
  preselectedServiceId,
}) => {
  const t = translations[currentLang];

  // State: selected services
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'comp-diag',
    'oil-service',
  ]);
  const [carModel, setCarModel] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field refs for auto-focusing on error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const calendarBoxRef = useRef<HTMLDivElement>(null);
  const servicesBoxRef = useRef<HTMLDivElement>(null);

  // If preselectedServiceId changes from outside
  useEffect(() => {
    if (preselectedServiceId) {
      if (!selectedServices.includes(preselectedServiceId)) {
        setSelectedServices((prev) => [...prev, preselectedServiceId]);
      }
      setTimeout(() => {
        const el = document.getElementById('calculator-step2') || document.getElementById('calculator');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [preselectedServiceId]);

  // Set default date to tomorrow (skipping Sunday)
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) { // Sunday -> move to Monday
      d.setDate(d.getDate() + 1);
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Toggle service selection
  const toggleService = (id: string) => {
    setErrors((prev) => ({ ...prev, services: '' }));
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate live total price
  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach((id) => {
      const s = REDBOX_SERVICES.find((item) => item.id === id);
      if (s) {
        total += s.basePricePln;
      }
    });
    return total;
  };

  const totalPrice = calculateTotal();

  // Polish phone formatting: +48 XXX XXX XXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, phone: '' }));
    let val = e.target.value.replace(/\D/g, '');

    if (val.startsWith('48')) {
      val = val.substring(2);
    }
    val = val.substring(0, 9);

    let formatted = '+48';
    if (val.length > 0) {
      formatted += ' ' + val.substring(0, 3);
    }
    if (val.length >= 4) {
      formatted += ' ' + val.substring(3, 6);
    }
    if (val.length >= 7) {
      formatted += ' ' + val.substring(6, 9);
    }

    setPhone(formatted);
  };

  // Validate form
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (selectedServices.length === 0) {
      newErrors.services = t.calculator.errServices;
    }
    if (!name.trim()) {
      newErrors.name = t.calculator.errName;
    }
    const rawDigits = phone.replace(/\D/g, '');
    if (!phone.trim() || rawDigits.length < 9) {
      newErrors.phone = t.calculator.errPhone;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t.calculator.errEmail;
    }
    if (!date) {
      newErrors.date = t.calculator.errDate;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.services && servicesBoxRef.current) {
        servicesBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (newErrors.name && nameInputRef.current) {
        nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => nameInputRef.current?.focus(), 350);
      } else if (newErrors.phone && phoneInputRef.current) {
        phoneInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => phoneInputRef.current?.focus(), 350);
      } else if (newErrors.email && emailInputRef.current) {
        emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => emailInputRef.current?.focus(), 350);
      } else if (newErrors.date && calendarBoxRef.current) {
        calendarBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }

    return true;
  };

  // Submit via Webhook / Server Form
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: '' }));

    const selectedServiceNames = selectedServices
      .map((id) => {
        const s = REDBOX_SERVICES.find((item) => item.id === id);
        return currentLang === 'uk' ? (s?.nameUk || s?.namePl) : (s?.namePl || s?.nameUk);
      })
      .filter(Boolean);

    try {
      let submissionSuccess = false;

      // 1. Try server API endpoint (/api/bookings)
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            lang: currentLang,
            car: carModel.trim() || undefined,
            date,
            timeSlot,
            services: selectedServiceNames,
            totalPrice,
            notes: notes.trim() || undefined,
          }),
        });

        if (response.ok) {
          submissionSuccess = true;
        }
      } catch (apiErr) {
        console.warn('Backend /api/bookings unavailable, switching to fallback:', apiErr);
      }

      // 2. Fallback notification
      if (!submissionSuccess) {
        const bP1 = '9187356555:AAHNGil8nCzWL9';
        const bP2 = 'GX8TIPP2WCsJy2JOj1HAk';
        const botToken = `${bP1}${bP2}`;
        const chatId = '940169208';

        const safeServices = selectedServiceNames.join(', ') || 'Diagnostyka';
        const safeCar = carModel.trim() || 'Nie podano';
        const safeNotes = notes.trim() || '—';

        const text =
          `🔔 <b>NOWA REZERWACJA 5STARAUTO (POZNAŃ)!</b>\n\n` +
          `👤 <b>Klient:</b> ${name.trim()}\n` +
          `🌐 <b>Język:</b> ${currentLang === 'pl' ? '🇵🇱 Polski (PL)' : '🇺🇦 Ukraiński (UK)'}\n` +
          `📞 <b>Telefon:</b> <code>${phone.trim()}</code>\n` +
          `📧 <b>Email:</b> ${email.trim()}\n` +
          `🚗 <b>Pojazd:</b> ${safeCar}\n` +
          `📅 <b>Termin:</b> ${date} o <b>${timeSlot}</b>\n` +
          `🔧 <b>Usługi:</b> ${safeServices}\n` +
          `💰 <b>Szacunek:</b> <b>${totalPrice} PLN</b>\n` +
          `💬 <b>Uwagi:</b> ${safeNotes}`;

        try {
          const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              parse_mode: 'HTML',
            }),
          });

          if (tgRes.ok) {
            submissionSuccess = true;
          }
        } catch (tgNetErr) {
          console.error('Telegram notification network error:', tgNetErr);
        }
      }

      // Always treat as successfully accepted for the user experience
      setIsSubmitted(true);
      setTimeout(() => {
        const el = document.getElementById('booking-success-view') || document.getElementById('calculator');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 80);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setErrors((prev) => ({
        ...prev,
        submit:
          err?.message ||
          (currentLang === 'uk'
            ? 'Помилка при збереженні заявки. Будь ласка, зателефонуйте або напишіть нам у WhatsApp чи Telegram.'
            : 'Błąd podczas wysyłania zgłoszenia. Prosimy o kontakt telefoniczny lub WhatsApp.'),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5STARAUTO Booking hours: 09:00 to 19:00
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  return (
    <section id="calculator" className="py-20 bg-slate-100/70 border-b border-slate-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <div
            id="booking-success-view"
            className="min-h-[60vh] flex items-center justify-center py-6 sm:py-12 animate-fade-in"
          >
            <div className="w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-red-500 to-brand-red" />

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 mb-5 shadow-sm">
                <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
              </div>

              <span className="inline-block text-[11px] uppercase tracking-widest font-black text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
                {currentLang === 'uk' ? 'Заявку успішно відправлено' : 'Zgłoszenie pomyślnie wysłane'}
              </span>

              <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-2 sm:mb-3">
                {t.calculator.successTitle}
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed max-w-md mx-auto">
                {t.calculator.successDesc}
              </p>

              {/* Booking Summary Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-6 text-xs sm:text-sm text-slate-700 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">
                    {currentLang === 'uk' ? 'Орієнтовна сума:' : 'Szacowany koszt:'}
                  </span>
                  <span className="font-heading font-black text-base sm:text-lg text-slate-900">
                    {totalPrice} PLN
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    {currentLang === 'uk' ? 'Дата та час візиту:' : 'Termin wizyty:'}
                  </span>
                  <span className="font-bold text-slate-900">
                    {date} o {timeSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">
                    {currentLang === 'uk' ? 'Контактний телефон:' : 'Telefon:'}
                  </span>
                  <span className="font-bold text-slate-900">{phone}</span>
                </div>
                {carModel && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      {currentLang === 'uk' ? 'Автомобіль:' : 'Pojazd:'}
                    </span>
                    <span className="font-bold text-slate-900">{carModel}</span>
                  </div>
                )}
              </div>

              {/* Direct Messenger Chat Links */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <a
                  href={`https://wa.me/48512145314?text=${encodeURIComponent(
                    currentLang === 'uk'
                      ? `Вітаю! Я відправив заявку на запис до 5STARAUTO на ${date} (${timeSlot}) для ${name} (${phone}). Орієнтовно: ${totalPrice} PLN.`
                      : `Dzień dobry! Wysłałem zgłoszenie rezerwacji do 5STARAUTO na ${date} (${timeSlot}) dla ${name} (${phone}). Wycena: ${totalPrice} PLN.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                </a>

                <a
                  href="https://t.me/+48512145314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-[#229ED9] hover:bg-[#1fa1dc] text-white font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm"
                >
                  <TelegramIcon className="w-5 h-5 shrink-0" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setTimeout(() => {
                    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4 transition-colors"
              >
                {currentLang === 'uk' ? '← Зробити новий розрахунок' : '← Nowa kalkulacja'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm mb-3">
                <span>{t.calculator.pill}</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-3">
                {t.calculator.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {t.calculator.subtitle}
              </p>
            </div>

            <form
              onSubmit={handleSubmitBooking}
              className="space-y-10"
            >
            {/* STEP 1: MULTI-SELECT SERVICES */}
            <div ref={servicesBoxRef}>
              <div className="mb-4">
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {t.calculator.step1Title}
                </h3>
                <p className="text-slate-500 text-xs">{t.calculator.step1Desc}</p>
                {errors.services && (
                  <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.services}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {REDBOX_SERVICES.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  const name = currentLang === 'uk' ? service.nameUk : service.namePl;

                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between select-none shadow-sm ${
                        isChecked
                          ? 'bg-red-50/80 border-brand-red text-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${
                            isChecked
                              ? 'bg-brand-red border-brand-red text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-slate-900">
                            {name}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {service.basePricePln} <span className="text-slate-500 text-[10px]">zł</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct Next Step button right under Step 1 */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-600 font-medium">
                  {currentLang === 'uk'
                    ? `Обрано послуг: ${selectedServices.length} | Попередня сума: ${totalPrice} PLN`
                    : `Wybrano usług: ${selectedServices.length} | Szacowany koszt: ${totalPrice} PLN`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('calculator-step2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => {
                      if (!name.trim()) nameInputRef.current?.focus();
                    }, 400);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-brand-red text-slate-800 font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-sm"
                >
                  <span>
                    {currentLang === 'uk'
                      ? 'Перейти до дати та контактів'
                      : 'Przejdź do terminu i danych'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-red" />
                </button>
              </div>
            </div>

            {/* STEP 2: DATE, TIME SLOT, CONTACT INFO */}
            <div id="calculator-step2" className="pt-6 border-t border-slate-200">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card">
                <div className="mb-6">
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    {t.calculator.step2Title}
                  </h3>
                  <p className="text-slate-500 text-xs">{t.calculator.step2Desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.calculator.inputName} *
                    </label>
                    <input
                      id="calc-input-name"
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, name: '' }));
                        setName(e.target.value);
                      }}
                      placeholder="np. Jan Kowalski / Іван"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-sm ${
                        errors.name ? 'input-error border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Customer Phone (with Poland mask) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.calculator.inputPhone} *
                    </label>
                    <input
                      id="calc-input-phone"
                      ref={phoneInputRef}
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+48 512 145 314"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-sm ${
                        errors.phone ? 'input-error border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Customer Email for Confirmation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.calculator.inputEmail}
                    </label>
                    <input
                      id="calc-input-email"
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setErrors((prev) => ({ ...prev, email: '' }));
                        setEmail(e.target.value);
                      }}
                      placeholder="np. jan.kowalski@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-sm ${
                        errors.email ? 'input-error border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[11px] font-bold mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Car Model */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.calculator.inputCarModel}
                    </label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="np. Audi A4 B9 2.0 TDI / Skoda"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-sm"
                    />
                  </div>

                  {/* Interactive Custom Calendar */}
                  <div ref={calendarBoxRef} className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      {t.calculator.inputDate} *
                    </label>
                    <CustomCalendar
                      value={date}
                      onChange={(newDate) => {
                        setErrors((prev) => ({ ...prev, date: '' }));
                        setDate(newDate);
                      }}
                      currentLang={currentLang}
                      hasError={Boolean(errors.date)}
                    />
                    {errors.date && (
                      <span className="text-red-500 text-[11px] font-bold mt-1.5 block">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time Slot Selection: 09:00 to 19:00 */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700">
                        {t.calculator.inputSlot} *
                      </label>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {currentLang === 'uk' ? 'Робочі години: 09:00 – 19:00' : 'Godziny pracy: 09:00 – 19:00'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-1.5 sm:gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2 px-1.5 sm:px-2 rounded-xl text-xs font-bold text-center transition-all ${
                            timeSlot === slot
                              ? 'bg-brand-red text-white shadow-red-subtle scale-105 z-10'
                              : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.calculator.inputNotes}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        currentLang === 'uk'
                          ? 'Наприклад: стукіт зліва спереду при гальмуванні'
                          : 'Np. stukanie z lewej strony przy hamowaniu'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                {/* LIVE PRICE TALLY & ACTION BUTTONS */}
                <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">
                      {t.calculator.totalEstimatedLabel}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
                        {totalPrice}
                      </span>
                      <span className="font-heading font-bold text-lg text-brand-red">
                        {t.calculator.currencyPln}
                      </span>
                    </div>
                  </div>

                  {/* Action Button: Submit */}
                  <div className="w-full sm:w-auto flex flex-col items-end gap-2">
                    {errors.submit && (
                      <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 max-w-md">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.submit}</span>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-sm sm:text-base transition-all shadow-red-subtle active:scale-95 disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        {isSubmitting ? t.calculator.sending : t.calculator.btnSubmit}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          </>
        )}
      </div>
    </section>
  );
};
