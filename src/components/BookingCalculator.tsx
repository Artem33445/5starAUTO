'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, ArrowRight, ShieldCheck, Phone, Send } from 'lucide-react';
import { Language } from '@/types';
import { CustomCalendar } from '@/components/CustomCalendar';

interface BookingCalculatorProps {
  currentLang: Language;
  selectedPackageName?: string;
  selectedPackagePrice?: string;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  currentLang,
  selectedPackageName = 'Standard',
  selectedPackagePrice = '350 zł',
}) => {
  const [vehicleType, setVehicleType] = useState<'osobowe' | 'suv' | 'dostawcze'>('osobowe');
  const [selectedPlan, setSelectedPlan] = useState<string>(selectedPackageName);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('09:00');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [carModel, setCarModel] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Price calculations based on vehicle type and package
  const basePrices: Record<string, number> = {
    Podstawowy: 150,
    Standard: 350,
    Kompleksowy: 750,
    'Flota / VIP': 500,
  };

  const vehicleMultipliers: Record<string, number> = {
    osobowe: 1.0,
    suv: 1.15,
    dostawcze: 1.25,
  };

  const calculatedPrice = Math.round(
    (basePrices[selectedPlan] || 350) * (vehicleMultipliers[vehicleType] || 1.0)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length < 9) {
      alert(currentLang === 'uk' ? 'Будь ласка, введіть коректне ім’я та номер телефону' : 'Proszę podać imię oraz poprawny numer telefonu');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          date: bookingDate || 'Do ustalenia telefonicznie',
          time: bookingTime,
          vehicleType,
          carModel: carModel || 'Nie podano',
          plan: selectedPlan,
          totalPrice: `${calculatedPrice} zł`,
          lang: currentLang,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        // Fallback to WhatsApp
        const msg = encodeURIComponent(
          `Cześć 5STAR AUTO! Chcę umówić wizytę: ${selectedPlan} (${vehicleType}). Data: ${bookingDate || 'najbliższy termin'}, ${bookingTime}. Imię: ${name}, Telefon: ${phone}. Auto: ${carModel}`
        );
        window.open(`https://wa.me/48512145314?text=${msg}`, '_blank');
        setIsSuccess(true);
      }
    } catch {
      const msg = encodeURIComponent(
        `Cześć 5STAR AUTO! Rezerwacja: ${selectedPlan}. Imię: ${name}, Tel: ${phone}. Auto: ${carModel}`
      );
      window.open(`https://wa.me/48512145314?text=${msg}`, '_blank');
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 lg:py-24 border-b border-[rgba(238,240,245,0.08)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-2">
            {currentLang === 'uk' ? 'Онлайн бронювання' : 'Rezerwacja stanowiska'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#eef0f5] mb-3">
            {currentLang === 'uk' ? 'Калькулятор та вибір дати візиту' : 'Wycena i rezerwacja terminu online'}
          </h2>
          <p className="text-sm sm:text-base text-[#a3a9b8] leading-relaxed">
            Wybierz kategorię samochodu, dogodny termin i potwierdź wizytę bez zaliczki. Płatność na miejscu po wykonaniu prac.
          </p>
        </div>

        <div className="rounded-card bg-[#11141c] border border-[rgba(238,240,245,0.08)] p-6 sm:p-8 lg:p-10">
          {isSuccess ? (
            <div className="py-14 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981] mx-auto mb-4">
                <Check className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-2xl font-medium text-[#eef0f5] mb-2">
                {currentLang === 'uk' ? 'Заявку успішно прийнято' : 'Rezerwacja została przyjęta'}
              </h3>
              <p className="text-sm text-[#a3a9b8] mb-6 leading-relaxed">
                Doradca techniczny skontaktuje się z Tobą telefonicznie w ciągu 15 minut w celu potwierdzenia szczegółów stanowiska.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="unslop-btn-secondary"
              >
                Złóż nową rezerwację
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1: Vehicle type selector */}
              <div>
                <label className="block text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-3">
                  1. Rodzaj pojazdu
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setVehicleType('osobowe')}
                    className={`h-11 px-4 rounded-control text-xs sm:text-sm font-medium transition-colors text-left flex items-center justify-between border ${
                      vehicleType === 'osobowe'
                        ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)]'
                        : 'bg-[#0b0d14] text-[#a3a9b8] border-[rgba(238,240,245,0.06)] hover:border-[rgba(238,240,245,0.12)]'
                    }`}
                  >
                    <span>Samochód osobowy</span>
                    <span className="text-xs font-mono text-[#7a8296]">3.5T</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleType('suv')}
                    className={`h-11 px-4 rounded-control text-xs sm:text-sm font-medium transition-colors text-left flex items-center justify-between border ${
                      vehicleType === 'suv'
                        ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)]'
                        : 'bg-[#0b0d14] text-[#a3a9b8] border-[rgba(238,240,245,0.06)] hover:border-[rgba(238,240,245,0.12)]'
                    }`}
                  >
                    <span>SUV & 4x4 / Crossover</span>
                    <span className="text-xs font-mono text-[#7a8296]">4.2T</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleType('dostawcze')}
                    className={`h-11 px-4 rounded-control text-xs sm:text-sm font-medium transition-colors text-left flex items-center justify-between border ${
                      vehicleType === 'dostawcze'
                        ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)]'
                        : 'bg-[#0b0d14] text-[#a3a9b8] border-[rgba(238,240,245,0.06)] hover:border-[rgba(238,240,245,0.12)]'
                    }`}
                  >
                    <span>Dostawczy & BUS</span>
                    <span className="text-xs font-mono text-[#7a8296]">4.5T</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Package selector */}
              <div>
                <label className="block text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-3">
                  2. Wybrany pakiet lub usługa
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Podstawowy', 'Standard', 'Kompleksowy', 'Flota / VIP'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPlan(p)}
                      className={`h-11 px-3 rounded-control text-xs font-medium transition-colors text-center border ${
                        selectedPlan === p
                          ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)]'
                          : 'bg-[#0b0d14] text-[#a3a9b8] border-[rgba(238,240,245,0.06)] hover:border-[rgba(238,240,245,0.12)]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Calendar and contact details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-[rgba(238,240,245,0.08)]">
                {/* Date and time picker */}
                <div>
                  <label className="block text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-3">
                    3. Wybierz termin wizyty
                  </label>
                  <CustomCalendar
                    value={bookingDate}
                    onChange={(d) => setBookingDate(d)}
                    currentLang={currentLang}
                  />

                  <div className="mt-4">
                    <label className="block text-xs font-mono text-[#7a8296] mb-2">
                      Godzina przyjęcia pojazdu:
                    </label>
                    <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                      {['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:00'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setBookingTime(time)}
                          className={`h-9 rounded-control border transition-colors ${
                            bookingTime === time
                              ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)] font-medium'
                              : 'bg-[#0b0d14] text-[#7a8296] border-[rgba(238,240,245,0.06)] hover:text-[#a3a9b8]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact fields & summary */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#7a8296] mb-1.5">
                        Imię i Nazwisko
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="np. Jan Kowalski"
                        className="w-full h-11 px-3 rounded-control bg-[#0b0d14] border border-[rgba(238,240,245,0.08)] text-sm text-[#eef0f5] placeholder-[#7a8296]/60 focus:outline-none focus:border-[rgba(238,240,245,0.25)] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#7a8296] mb-1.5">
                        Numer telefonu
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+48 500 000 000"
                        className="w-full h-11 px-3 rounded-control bg-[#0b0d14] border border-[rgba(238,240,245,0.08)] text-sm text-[#eef0f5] placeholder-[#7a8296]/60 focus:outline-none focus:border-[rgba(238,240,245,0.25)] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#7a8296] mb-1.5">
                        Marka, model lub nr rejestracyjny (opcjonalnie)
                      </label>
                      <input
                        type="text"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        placeholder="np. Audi A6 2019"
                        className="w-full h-11 px-3 rounded-control bg-[#0b0d14] border border-[rgba(238,240,245,0.08)] text-sm text-[#eef0f5] placeholder-[#7a8296]/60 focus:outline-none focus:border-[rgba(238,240,245,0.25)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Summary bar */}
                  <div className="mt-8 pt-6 border-t border-[rgba(238,240,245,0.08)] flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-mono text-[#7a8296]">Szacowany koszt</span>
                      <span className="text-2xl font-semibold text-[#eef0f5] tabular-nums">
                        {calculatedPrice} zł
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="unslop-btn-primary h-11 px-6 text-sm"
                    >
                      <span>{isSubmitting ? 'Wysyłanie...' : 'Potwierdź rezerwację'}</span>
                      <ArrowRight className="w-4 h-4 text-[#0b0d14]" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
