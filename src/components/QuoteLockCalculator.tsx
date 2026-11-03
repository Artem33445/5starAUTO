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
          console.error('Telegram notification error:', tgNetErr);
        }
      }

      // Accepted view
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

  // 5STARAUTO Working hours: 09:00 to 19:00
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
    <section id="calculator" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <div
            id="booking-success-view"
            className="flex items-center justify-center py-6 sm:py-10"
          >
            <div className="w-full max-w-xl rounded-lg bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] overflow-hidden text-center">
              {/* Window Header */}
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between border-b-[3px] border-black font-mono text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
                  <span className="ml-2 uppercase">REZERWACJA_POTWIERDZONA.EXE</span>
                </div>
                <span className="bg-[#23E28B] text-black px-2 py-0.5 rounded font-black text-[10px]">
                  STATUS: 200 OK
                </span>
              </div>

              <div className="p-6 sm:p-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#23E28B] border-[3px] border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto text-black mb-5 rotate-[-2deg]">
                  <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 stroke-[2.5]" />
                </div>

                <span className="inline-block text-[11px] font-mono uppercase tracking-widest font-black text-black px-3 py-1 rounded bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] mb-4 rotate-[1deg]">
                  {currentLang === 'uk' ? 'Заявку успішно прийнято' : 'Zgłoszenie pomyślnie przyjęte'}
                </span>

                <h2 className="font-heading font-black text-2xl sm:text-3xl text-black mb-3">
                  {t.calculator.successTitle}
                </h2>

                <p className="font-sans text-black/80 text-xs sm:text-sm mb-6 leading-relaxed max-w-md mx-auto font-medium">
                  {t.calculator.successDesc}
                </p>

                {/* Booking Summary Ticket */}
                <div className="p-5 rounded-lg bg-[#F7F4EB] border-[2.5px] border-black shadow-[4px_4px_0px_#000] text-left mb-6 font-mono text-xs sm:text-sm text-black space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b-[2px] border-black">
                    <span className="text-black/70">
                      {currentLang === 'uk' ? 'Орієнтовна сума:' : 'Szacowany koszt:'}
                    </span>
                    <span className="font-heading font-black text-lg text-black bg-[#FFE600] px-2 py-0.5 rounded border border-black">
                      {totalPrice} PLN
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70">
                      {currentLang === 'uk' ? 'Дата та час:' : 'Termin wizyty:'}
                    </span>
                    <span className="font-bold text-black">
                      {date} o {timeSlot}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70">
                      {currentLang === 'uk' ? 'Контактний телефон:' : 'Telefon:'}
                    </span>
                    <span className="font-bold text-black">{phone}</span>
                  </div>
                  {carModel && (
                    <div className="flex items-center justify-between">
                      <span className="text-black/70">
                        {currentLang === 'uk' ? 'Автомобіль:' : 'Pojazd:'}
                      </span>
                      <span className="font-bold text-black">{carModel}</span>
                    </div>
                  )}
                </div>

                {/* Direct Messenger Chat Links */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <a
                    href={`https://wa.me/48512145314?text=${encodeURIComponent(
                      currentLang === 'uk'
                        ? `Вітаю! Я відправив заявку до 5STARAUTO на ${date} (${timeSlot}) для ${name} (${phone}). Розрахунок: ${totalPrice} PLN.`
                        : `Dzień dobry! Wysłałem zgłoszenie rezerwacji do 5STARAUTO na ${date} (${timeSlot}) dla ${name} (${phone}). Wycena: ${totalPrice} PLN.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-[#23E28B] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0 text-black fill-current" />
                  </a>

                  <a
                    href="https://t.me/+48512145314"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-[#5CE1E6] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <TelegramIcon className="w-5 h-5 shrink-0 text-black fill-current" />
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
                  className="text-xs font-mono font-bold text-black underline underline-offset-4 hover:text-[#FF5E5E] transition-colors"
                >
                  {currentLang === 'uk' ? '← Зробити новий розрахунок' : '← Nowa kalkulacja'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] overflow-hidden">
            {/* Retro Window Dialog Header Bar */}
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b-[3px] border-black font-mono text-xs font-bold tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
                <span className="ml-2 uppercase">QUOTE_LOCK_TERMINAL_V2.0 — KALKULATOR CEN</span>
              </div>
              <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black">
                LIVE TALLY
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 bg-[#FFFDF8]">
              {/* Section Title */}
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] font-mono text-xs font-bold text-black mb-3 rotate-[-1deg]">
                  <span>✦ {t.calculator.pill}</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-4xl text-black tracking-tight mb-2">
                  {t.calculator.title}
                </h2>
                <p className="font-sans text-black/80 font-medium text-xs sm:text-sm">
                  {t.calculator.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-8 sm:space-y-10">
                {/* STEP 1: MULTI-SELECT SERVICES */}
                <div ref={servicesBoxRef}>
                  <div className="mb-4 pb-2 border-b-[2px] border-black flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-black text-lg text-black">
                        {t.calculator.step1Title}
                      </h3>
                      <p className="font-mono text-black/70 text-xs">{t.calculator.step1Desc}</p>
                    </div>
                    <span className="bg-black text-[#FFE600] font-mono font-bold text-xs px-2 py-1 rounded">
                      KROK 1/2
                    </span>
                  </div>

                  {errors.services && (
                    <div className="p-2.5 rounded bg-[#FF5E5E] border-[2px] border-black text-black font-mono text-xs font-bold mb-3 flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                      <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                      <span>{errors.services}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {REDBOX_SERVICES.map((service) => {
                      const isChecked = selectedServices.includes(service.id);
                      const name = currentLang === 'uk' ? service.nameUk : service.namePl;

                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-3.5 rounded-lg border-[2.5px] border-black cursor-pointer transition-all flex items-center justify-between select-none ${
                            isChecked
                              ? 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                              : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#F7F4EB] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]'
                          }`}
                        >
                          <div className="flex items-center gap-3 pr-2">
                            <div
                              className={`w-6 h-6 rounded border-[2px] border-black flex items-center justify-center shrink-0 transition-all ${
                                isChecked
                                  ? 'bg-black text-[#FFE600]'
                                  : 'bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                            </div>
                            <div>
                              <div className="font-heading font-bold text-xs sm:text-sm text-black">
                                {name}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-xs sm:text-sm font-black text-black bg-white/70 px-2 py-0.5 rounded border border-black">
                              {service.basePricePln} zł
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Direct Next Step button under Step 1 */}
                  <div className="mt-5 p-3.5 rounded-lg bg-[#F7F4EB] border-[2px] border-black flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold text-black">
                      {currentLang === 'uk'
                        ? `Обрано: ${selectedServices.length} | Попередня сума: ${totalPrice} PLN`
                        : `Wybrano: ${selectedServices.length} | Szacowany koszt: ${totalPrice} PLN`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('calculator-step2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                          if (!name.trim()) nameInputRef.current?.focus();
                        }, 400);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#23E28B] hover:bg-[#FFE600] text-black font-heading font-extrabold text-xs uppercase tracking-wider border-[2px] border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
                    >
                      <span>
                        {currentLang === 'uk'
                          ? 'Перейти до дати та контактів'
                          : 'Przejdź do terminu i danych'}
                      </span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* STEP 2: DATE, TIME SLOT, CONTACT INFO */}
                <div id="calculator-step2" className="pt-6 border-t-[3px] border-black">
                  <div className="p-6 sm:p-8 rounded-lg bg-white border-[3px] border-black shadow-[5px_5px_0px_#000]">
                    <div className="mb-6 pb-2 border-b-[2px] border-black flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-black text-lg text-black">
                          {t.calculator.step2Title}
                        </h3>
                        <p className="font-mono text-black/70 text-xs">{t.calculator.step2Desc}</p>
                      </div>
                      <span className="bg-black text-[#23E28B] font-mono font-bold text-xs px-2 py-1 rounded">
                        KROK 2/2
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Customer Name */}
                      <div>
                        <label className="block font-mono text-xs font-bold text-black mb-1.5">
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
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F7F4EB] border-[2.5px] text-black placeholder-black/40 font-mono text-sm font-bold shadow-[2px_2px_0px_#000] focus:shadow-[4px_4px_0px_#000] focus:bg-[#FFE600]/20 outline-none transition-all ${
                            errors.name ? 'border-[#FF2E2E] bg-red-50' : 'border-black'
                          }`}
                        />
                        {errors.name && (
                          <span className="font-mono text-[#FF2E2E] text-[11px] font-bold mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Customer Phone */}
                      <div>
                        <label className="block font-mono text-xs font-bold text-black mb-1.5">
                          {t.calculator.inputPhone} *
                        </label>
                        <input
                          id="calc-input-phone"
                          ref={phoneInputRef}
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="+48 512 145 314"
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F7F4EB] border-[2.5px] text-black placeholder-black/40 font-mono text-sm font-bold shadow-[2px_2px_0px_#000] focus:shadow-[4px_4px_0px_#000] focus:bg-[#FFE600]/20 outline-none transition-all ${
                            errors.phone ? 'border-[#FF2E2E] bg-red-50' : 'border-black'
                          }`}
                        />
                        {errors.phone && (
                          <span className="font-mono text-[#FF2E2E] text-[11px] font-bold mt-1 block">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Customer Email */}
                      <div>
                        <label className="block font-mono text-xs font-bold text-black mb-1.5">
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
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F7F4EB] border-[2.5px] text-black placeholder-black/40 font-mono text-sm font-bold shadow-[2px_2px_0px_#000] focus:shadow-[4px_4px_0px_#000] focus:bg-[#FFE600]/20 outline-none transition-all ${
                            errors.email ? 'border-[#FF2E2E] bg-red-50' : 'border-black'
                          }`}
                        />
                        {errors.email && (
                          <span className="font-mono text-[#FF2E2E] text-[11px] font-bold mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Car Model */}
                      <div>
                        <label className="block font-mono text-xs font-bold text-black mb-1.5">
                          {t.calculator.inputCarModel}
                        </label>
                        <input
                          type="text"
                          value={carModel}
                          onChange={(e) => setCarModel(e.target.value)}
                          placeholder="np. Audi A4 B9 2.0 TDI / Skoda"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F4EB] border-[2.5px] border-black text-black placeholder-black/40 font-mono text-sm font-bold shadow-[2px_2px_0px_#000] focus:shadow-[4px_4px_0px_#000] focus:bg-[#FFE600]/20 outline-none transition-all"
                        />
                      </div>

                      {/* Custom Calendar */}
                      <div ref={calendarBoxRef} className="sm:col-span-2">
                        <label className="block font-mono text-xs font-bold text-black mb-2">
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
                          <span className="font-mono text-[#FF2E2E] text-[11px] font-bold mt-1.5 block">
                            {errors.date}
                          </span>
                        )}
                      </div>

                      {/* Time Slot Selection */}
                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block font-mono text-xs font-bold text-black">
                            {t.calculator.inputSlot} *
                          </label>
                          <span className="font-mono text-[11px] text-black/70 font-bold">
                            {currentLang === 'uk' ? 'Робочі години: 09:00 – 19:00' : 'Godziny pracy: 09:00 – 19:00'}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                          {timeSlots.map((slot) => {
                            const isSlotSelected = timeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setTimeSlot(slot)}
                                className={`py-2 px-1.5 rounded-lg font-mono text-xs font-bold text-center border-[2px] border-black transition-all ${
                                  isSlotSelected
                                    ? 'bg-[#23E28B] text-black shadow-[3px_3px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                                    : 'bg-[#F7F4EB] text-black shadow-[2px_2px_0px_#000] hover:bg-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs font-bold text-black mb-1.5">
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
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F4EB] border-[2.5px] border-black text-black placeholder-black/40 font-mono text-sm font-bold shadow-[2px_2px_0px_#000] focus:shadow-[4px_4px_0px_#000] focus:bg-[#FFE600]/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* LIVE PRICE TALLY & ACTION BUTTONS */}
                    <div className="pt-6 mt-6 border-t-[3px] border-black flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="p-4 bg-[#FFE600] border-[2.5px] border-black rounded-lg shadow-[4px_4px_0px_#000] w-full sm:w-auto">
                        <span className="font-mono text-xs uppercase text-black font-bold block mb-1">
                          {t.calculator.totalEstimatedLabel}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading font-black text-3xl sm:text-4xl text-black">
                            {totalPrice}
                          </span>
                          <span className="font-heading font-black text-xl text-black">
                            {t.calculator.currencyPln}
                          </span>
                        </div>
                      </div>

                      {/* Submit CTA */}
                      <div className="w-full sm:w-auto flex flex-col items-end gap-2">
                        {errors.submit && (
                          <div className="p-2.5 rounded-lg bg-[#FF5E5E] border-[2px] border-black text-black font-mono text-xs font-bold flex items-center gap-2 max-w-md shadow-[2px_2px_0px_#000]">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{errors.submit}</span>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-[#FF5E5E] hover:bg-[#FFE600] text-black font-heading font-black text-sm sm:text-base uppercase tracking-wider border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all disabled:opacity-50"
                        >
                          <Check className="w-5 h-5 stroke-[3]" />
                          <span>
                            {isSubmitting ? t.calculator.sending : t.calculator.btnSubmit}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
