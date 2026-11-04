'use client';

import React, { useState } from 'react';
import { Globe, Check, ArrowRight, ShieldCheck, Clock, Calendar as CalendarIcon, Phone, Car, Sparkles, Send } from 'lucide-react';
import { Language } from '@/types';
import { CustomCalendar } from '@/components/CustomCalendar';

interface PortalSectionProps {
  currentLang: Language;
}

export const PortalSection: React.FC<PortalSectionProps> = ({ currentLang }) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'standard' | 'complex' | 'fleet'>('standard');
  const [bookingVehicleType, setBookingVehicleType] = useState<'osobowe' | 'suv' | 'dostawcze'>('osobowe');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('09:00');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [carModel, setCarModel] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const plans = [
    {
      id: 'basic' as const,
      name: currentLang === 'uk' ? 'Базовий' : 'Podstawowy',
      price: '150 zł',
      sub: currentLang === 'uk' ? 'Швидкий ТО & Огляд' : 'Szybki serwis eksploatacyjny',
      features: [
        'Wymiana oleju silnikowego i filtra oleju',
        'Kasowanie inspekcji serwisowej OBD2',
        'Kontrola płynu hamulcowego i chłodniczego',
        'Sprawdzenie oświetlenia i ciśnienia kół',
        'Gwarancja 24 miesiące',
      ],
      popular: false,
    },
    {
      id: 'standard' as const,
      name: currentLang === 'uk' ? 'Стандарт' : 'Standard',
      price: '350 zł',
      sub: currentLang === 'uk' ? 'Найпопулярніший пакет' : 'Najczęściej wybierany przez klientów',
      features: [
        'Wszystko z pakietu Podstawowego',
        'Wymiana kompletu filtrów (powietrza, kabiny, paliwa)',
        'Pełna ścieżka kontrolna zawieszenia i hamulców',
        'Diagnostyka komputerowa wszystkich modułów ECU',
        'Mycie karoserii gratis',
      ],
      popular: true,
    },
    {
      id: 'complex' as const,
      name: currentLang === 'uk' ? 'Комплексний' : 'Kompleksowy',
      price: '750 zł',
      sub: currentLang === 'uk' ? 'Повна підготовка авто' : 'Kompleksowy przegląd przedsezonowy',
      features: [
        'Wszystko z pakietu Standard',
        'Serwis klimatyzacji z uzupełnieniem czynnika i ozonowaniem',
        'Komputerowa geometria zawieszenia 3D Hunter',
        'Test sprawności akumulatora i alternatora',
        'Samochód zastępczy na czas serwisu gratis',
      ],
      popular: false,
    },
    {
      id: 'fleet' as const,
      name: currentLang === 'uk' ? 'Флота / VIP' : 'Flota / VIP',
      price: currentLang === 'uk' ? 'Індивідуально' : 'Wycena Indywidualna',
      sub: currentLang === 'uk' ? 'Для компаній та автопарків' : 'Dla firm, busów i wymagających aut',
      features: [
        'Dedykowany opiekun techniczny 24/7',
        'Priorytet przyjęcia bez kolejki',
        'Serwis door-to-door (odbiór i zwrot auta)',
        'Faktury zbiorcze VAT 23% z odroczonym terminem',
        'Dostęp do aut zastępczych klasy premium',
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: 'basic' | 'standard' | 'complex' | 'fleet') => {
    setSelectedPlan(planId);
    const formElement = document.getElementById('booking-portal-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.replace(/\D/g, '').length < 9) {
      alert(currentLang === 'uk' ? 'Будь ласка, введіть ім’я та коректний номер телефону' : 'Proszę podać imię oraz poprawny numer telefonu');
      return;
    }

    setIsSubmitting(true);
    try {
      const planName = plans.find((p) => p.id === selectedPlan)?.name || 'Standard';
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          phone: clientPhone,
          date: bookingDate || 'Do ustalenia',
          time: bookingTime,
          vehicleType: bookingVehicleType,
          carModel: carModel || 'Nie podano',
          plan: planName,
          totalPrice: plans.find((p) => p.id === selectedPlan)?.price || '350 zł',
          lang: currentLang,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        // Fallback directly to WhatsApp
        const msg = encodeURIComponent(
          `Cześć 5STAR AUTO! Chcę zarezerwować pakiet: ${planName} (${bookingVehicleType}). Data: ${bookingDate || 'najbliższy termin'}, ${bookingTime}. Imię: ${clientName}, Telefon: ${clientPhone}. Auto: ${carModel || 'brak'}`
        );
        window.open(`https://wa.me/48512145314?text=${msg}`, '_blank');
        setIsSuccess(true);
      }
    } catch {
      const msg = encodeURIComponent(
        `Cześć 5STAR AUTO! Rezerwacja: ${clientName}, tel: ${clientPhone}. Auto: ${carModel}`
      );
      window.open(`https://wa.me/48512145314?text=${msg}`, '_blank');
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-label="Nous Portal plans"
      className="bg-white text-[#000030] py-20 lg:py-28 border-t border-black/10"
      id="portal"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16">
        {/* Top Chips matching Hermes exactly (landing-plan-chips) */}
        <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs text-[#0000F2]">
          <span className="px-2.5 py-1 border border-current uppercase">Podstawowy</span>
          <span className="px-2.5 py-1 border border-current uppercase">Standard</span>
          <span className="px-2.5 py-1 border border-current uppercase">Kompleksowy</span>
          <span className="px-2.5 py-1 border border-current uppercase">Flota / VIP</span>
        </div>

        {/* Section Heading & Actions matching Hermes */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10 mb-10">
          <div className="flex items-center gap-3">
            <h2
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#000030] uppercase tracking-tight"
              style={{ fontWeight: 300 }}
            >
              5STAR Portal
            </h2>
            <Globe className="w-6 h-6 text-[#0000F2] shrink-0" />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#calculator"
              className="hermes-button hermes-button-primary px-4 py-2.5 text-xs font-semibold gap-2"
            >
              <span>{currentLang === 'uk' ? 'Забронювати' : 'Zarezerwuj pakiet'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#faqs"
              className="font-mono text-xs uppercase tracking-wider text-[#000030] underline underline-offset-4 hover:text-[#0000F2] transition-colors"
            >
              {currentLang === 'uk' ? 'Поширені питання' : 'Pytania & FAQ'}
            </a>
          </div>
        </div>

        {/* Subtitle description */}
        <p className="font-sans text-sm sm:text-base text-[#000030]/80 max-w-3xl mb-12">
          {currentLang === 'uk'
            ? 'Всі пакети обслуговування включають 24 місяці гарантії на запчастини та роботу, цифровий звіт комп’ютерної діагностики та контроль безпеки.'
            : 'Wszystkie pakiety serwisowe obejmują 24 miesiące gwarancji na części i robociznę, pełny protokół diagnostyczny OBD2 oraz mycie pojazdu gratis.'}
        </p>

        {/* 4-Tier Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <div
                key={p.id}
                className={`p-6 flex flex-col justify-between transition-all border ${
                  isSelected
                    ? 'border-[#0000F2] ring-2 ring-[#0000F2] bg-[#F5F5FF]'
                    : p.popular
                    ? 'border-[#0000F2]/50 bg-white'
                    : 'border-black/10 bg-white hover:border-black/30'
                }`}
              >
                <div>
                  {p.popular && (
                    <span className="inline-block px-2 py-0.5 bg-[#0000F2] text-white font-mono text-[9px] uppercase tracking-wider mb-2 font-bold">
                      Najpopularniejszy
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-bold text-[#000030] mb-1">
                    {p.name}
                  </h3>
                  <div className="font-heading text-3xl font-extrabold text-[#0000F2] mb-2">
                    {p.price}
                  </div>
                  <p className="font-sans text-xs text-[#000030]/70 mb-6">
                    {p.sub}
                  </p>

                  <ul className="space-y-2.5 mb-8 font-sans text-xs text-[#000030]/85 border-t border-black/10 pt-4">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0000F2] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(p.id)}
                  className={`hermes-button w-full py-2.5 text-xs font-semibold uppercase tracking-wider ${
                    isSelected
                      ? 'hermes-button-primary'
                      : 'bg-black/5 hover:bg-[#0000F2] hover:text-white text-[#000030]'
                  }`}
                >
                  {isSelected ? '✓ Wybrany pakiet' : 'Wybierz pakiet'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Integrated Reservation Engine & Live Terminal Calculator */}
        <div
          id="calculator"
          className="bg-[#000030] text-white p-6 sm:p-10 border border-white/15 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] block mb-1">
                // 5STAR AUTO RESERVATION ENGINE
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
                {currentLang === 'uk' ? 'Швидке Бронювання Терміну' : 'Potwierdzenie Terminu Wizyty'}
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs bg-white/10 px-3 py-1.5 border border-white/10">
              <span className="text-white/60">Wybrany pakiet:</span>
              <span className="text-[#00FF85] font-bold uppercase">
                {plans.find((p) => p.id === selectedPlan)?.name} ({plans.find((p) => p.id === selectedPlan)?.price})
              </span>
            </div>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#00FF85]/20 border border-[#00FF85] flex items-center justify-center text-[#00FF85] mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-2xl font-bold text-white mb-2">
                {currentLang === 'uk' ? 'Заявку успішно прийнято!' : 'Rezerwacja została przyjęta!'}
              </h4>
              <p className="font-mono text-xs text-white/70 max-w-md mb-6">
                Nasz doradca serwisowy skontaktuje się z Tobą telefonicznie w ciągu 15 minut w celu potwierdzenia stanowiska.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="hermes-button hermes-button-secondary px-5 py-2.5 text-xs font-semibold"
              >
                Nowa rezerwacja
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="booking-portal-form" className="space-y-6">
              {/* Row 1: Vehicle Category Selector */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-2">
                  1. Kategoria pojazdu :
                </label>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setBookingVehicleType('osobowe')}
                    className={`py-2.5 px-3 border transition-all text-center ${
                      bookingVehicleType === 'osobowe'
                        ? 'border-[#0000F2] bg-[#0000F2] text-white font-bold'
                        : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                    }`}
                  >
                    Samochód Osobowy
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingVehicleType('suv')}
                    className={`py-2.5 px-3 border transition-all text-center ${
                      bookingVehicleType === 'suv'
                        ? 'border-[#0000F2] bg-[#0000F2] text-white font-bold'
                        : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                    }`}
                  >
                    SUV / Crossover 4x4
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingVehicleType('dostawcze')}
                    className={`py-2.5 px-3 border transition-all text-center ${
                      bookingVehicleType === 'dostawcze'
                        ? 'border-[#0000F2] bg-[#0000F2] text-white font-bold'
                        : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                    }`}
                  >
                    Dostawczy / BUS
                  </button>
                </div>
              </div>

              {/* Row 2: Date & Time Picker */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-2">
                    2. Wybierz dogodną datę :
                  </label>
                  <CustomCalendar
                    value={bookingDate}
                    onChange={(d) => setBookingDate(d)}
                    currentLang={currentLang}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-2">
                      3. Preferowana godzina :
                    </label>
                    <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                      {['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:00'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setBookingTime(time)}
                          className={`py-2 text-center border transition-all ${
                            bookingTime === time
                              ? 'border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] font-bold'
                              : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1">
                      Twoje Imię i Nazwisko :
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="np. Jan Kowalski"
                      className="w-full bg-white/5 border border-white/20 p-2.5 text-xs font-mono text-white placeholder-white/40 focus:border-[#00F0FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1">
                      Numer Telefonu (do potwierdzenia SMS/WhatsApp) :
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+48 500 000 000"
                      className="w-full bg-white/5 border border-white/20 p-2.5 text-xs font-mono text-white placeholder-white/40 focus:border-[#00F0FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/70 mb-1">
                      Marka, Model lub Numer Rejestracyjny :
                    </label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="np. Audi A6 2.0 TDI 2018"
                      className="w-full bg-white/5 border border-white/20 p-2.5 text-xs font-mono text-white placeholder-white/40 focus:border-[#00F0FF] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-mono text-xs text-white/60">
                  <span>Rezerwacja bez opłaty z góry • Płatność na miejscu kartą / gotówką / BLIK</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hermes-button hermes-button-secondary w-full sm:w-auto px-8 py-3.5 text-xs font-bold gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? 'WYSYŁANIE...'
                      : currentLang === 'uk'
                      ? 'ПІДТВЕРДИТИ БРОНЮВАННЯ'
                      : 'POTWIERDŹ REZERWACJĘ'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
