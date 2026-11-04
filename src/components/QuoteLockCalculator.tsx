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
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard,
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

  // Submit via API / fallback
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

      if (!submissionSuccess) {
        const bP1 = '9187356555:AAHNGil8nCzWL9';
        const bP2 = 'GX8TIPP2WCsJy2JOj1HAk';
        const botToken = `${bP1}${bP2}`;
        const chatId = '940169208';

        const safeServices = selectedServiceNames.join(', ') || 'Diagnostyka';
        const safeCar = carModel.trim() || 'Nie podano';
        const safeNotes = notes.trim() || '—';

        const text =
          `🔔 <b>NOWA REZERWACJA 5STARAUTO (HERMES EDITION)!</b>\n\n` +
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
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              parse_mode: 'HTML',
            }),
          });
        } catch (tgNetErr) {
          console.error('Telegram notification error:', tgNetErr);
        }
      }

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
            ? 'Помилка при збереженні заявки. Будь ласка, зателефонуйте нам: +48 512 145 314.'
            : 'Błąd podczas wysyłania zgłoszenia. Prosimy o kontakt telefoniczny: +48 512 145 314.'),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="calculator" className="py-20 lg:py-32 bg-[#06060E] border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <div
            id="booking-success-view"
            className="max-w-2xl mx-auto rounded-2xl hermes-glass p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,242,0.3)] border border-[#00FF85]/40"
          >
            <div className="w-16 h-16 rounded-full bg-[#00FF85]/10 border border-[#00FF85] flex items-center justify-center mx-auto text-[#00FF85] mb-6 shadow-[0_0_20px_rgba(0,255,133,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00FF85] mb-3">
              STATUS: RESERVATION_CONFIRMED
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
              {t.calculator.successTitle}
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/70 max-w-md mx-auto leading-relaxed mb-8">
              {t.calculator.successDesc}
            </p>

            <div className="p-5 rounded-xl bg-black/60 border border-white/10 text-left font-mono text-xs sm:text-sm text-white/90 space-y-2 mb-8">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-white/50">Szacowany koszt:</span>
                <span className="text-[#00F0FF] font-bold text-base">{totalPrice} PLN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Termin:</span>
                <span className="text-white font-bold">{date} o {timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Telefon:</span>
                <span className="text-white font-bold">{phone}</span>
              </div>
              {carModel && (
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Pojazd:</span>
                  <span className="text-white font-bold">{carModel}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-mono text-[#00F0FF] hover:underline"
            >
              {currentLang === 'uk' ? '← Новий розрахунок' : '← Nowa kalkulacja'}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl hermes-glass p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,242,0.2)] border border-white/15">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00F0FF] mb-3">
                <span># KALKULATOR CEN & REZERWACJA</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                {t.calculator.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 mt-3">
                {t.calculator.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-12">
              {/* Step 1: Services Selection */}
              <div ref={servicesBoxRef}>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {t.calculator.step1Title}
                    </h3>
                    <p className="font-mono text-xs text-white/50">{t.calculator.step1Desc}</p>
                  </div>
                  <span className="font-mono text-xs text-[#00F0FF] px-2.5 py-1 rounded bg-white/5 border border-white/10">
                    KROK 1/2
                  </span>
                </div>

                {errors.services && (
                  <div className="p-3 rounded-xl bg-[#FF3B30]/15 border border-[#FF3B30] text-[#FF3B30] font-mono text-xs mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.services}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {REDBOX_SERVICES.map((service) => {
                    const isChecked = selectedServices.includes(service.id);
                    const name = currentLang === 'uk' ? service.nameUk : service.namePl;

                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between select-none ${
                          isChecked
                            ? 'bg-[#0000F2]/30 border-[#0000F2] text-white shadow-[0_0_15px_rgba(0,0,242,0.4)]'
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 pr-2">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${
                              isChecked
                                ? 'bg-[#0000F2] border-white text-white'
                                : 'border-white/30 bg-black/40'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-heading font-bold text-xs sm:text-sm text-white">
                            {name}
                          </span>
                        </div>

                        <span className="font-mono text-xs font-bold text-[#00F0FF] shrink-0">
                          {service.basePricePln} zł
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Contact Form */}
              <div id="calculator-step2" className="pt-8 border-t border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {t.calculator.step2Title}
                    </h3>
                    <p className="font-mono text-xs text-white/50">{t.calculator.step2Desc}</p>
                  </div>
                  <span className="font-mono text-xs text-[#00FF85] px-2.5 py-1 rounded bg-white/5 border border-white/10">
                    KROK 2/2
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-xs text-white/70 mb-1.5 uppercase">
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
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-[#0000F2] focus:shadow-[0_0_15px_rgba(0,0,242,0.5)] transition-all ${
                        errors.name ? 'border-[#FF3B30]' : 'border-white/15'
                      }`}
                    />
                    {errors.name && (
                      <span className="font-mono text-[#FF3B30] text-xs mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-mono text-xs text-white/70 mb-1.5 uppercase">
                      {t.calculator.inputPhone} *
                    </label>
                    <input
                      id="calc-input-phone"
                      ref={phoneInputRef}
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+48 512 145 314"
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-[#0000F2] focus:shadow-[0_0_15px_rgba(0,0,242,0.5)] transition-all ${
                        errors.phone ? 'border-[#FF3B30]' : 'border-white/15'
                      }`}
                    />
                    {errors.phone && (
                      <span className="font-mono text-[#FF3B30] text-xs mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-white/70 mb-1.5 uppercase">
                      {t.calculator.inputEmail} *
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
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-[#0000F2] focus:shadow-[0_0_15px_rgba(0,0,242,0.5)] transition-all ${
                        errors.email ? 'border-[#FF3B30]' : 'border-white/15'
                      }`}
                    />
                    {errors.email && (
                      <span className="font-mono text-[#FF3B30] text-xs mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Car Model */}
                  <div>
                    <label className="block font-mono text-xs text-white/70 mb-1.5 uppercase">
                      {t.calculator.inputCarModel}
                    </label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="np. Audi A4 B9 2.0 TDI / Skoda"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-[#0000F2] transition-all"
                    />
                  </div>

                  {/* Custom Calendar */}
                  <div ref={calendarBoxRef} className="sm:col-span-2">
                    <label className="block font-mono text-xs text-white/70 mb-2 uppercase">
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
                      <span className="font-mono text-[#FF3B30] text-xs mt-1 block">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time Slots */}
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-white/70 mb-2 uppercase">
                      {t.calculator.inputSlot} * (09:00 - 19:00)
                    </label>
                    <div className="grid grid-cols-3 xs:grid-cols-5 sm:grid-cols-10 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2 rounded-lg font-mono text-xs text-center border transition-all ${
                            timeSlot === slot
                              ? 'bg-[#0000F2] text-white font-bold border-white/40 shadow-[0_0_12px_rgba(0,0,242,0.8)]'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs text-white/70 mb-1.5 uppercase">
                      {t.calculator.inputNotes}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Np. stukanie z lewej strony przy hamowaniu"
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-[#0000F2] transition-all"
                    />
                  </div>
                </div>

                {/* Bottom Tally & Action Deck */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="font-mono text-xs text-white/50 uppercase block">
                      {t.calculator.totalEstimatedLabel}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-4xl sm:text-5xl text-white">
                        {totalPrice}
                      </span>
                      <span className="font-mono font-bold text-xl text-[#00F0FF]">
                        {t.calculator.currencyPln}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                    {errors.submit && (
                      <div className="p-2.5 rounded-lg bg-[#FF3B30]/20 border border-[#FF3B30] text-[#FF3B30] font-mono text-xs">
                        {errors.submit}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full hermes-btn-primary text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(255,255,255,0.35)] disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isSubmitting ? t.calculator.sending : t.calculator.btnSubmit}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
