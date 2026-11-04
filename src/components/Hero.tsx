'use client';

import React from 'react';
import { ArrowRight, Check, Gauge, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '@/types';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[rgba(238,240,245,0.08)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, subhead, actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Signature status tag */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-[#11141c] border border-[rgba(238,240,245,0.08)] text-xs font-mono text-[#a3a9b8] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>
                {currentLang === 'uk'
                  ? 'Познань · Робочі години сьогодні до 19:00'
                  : 'Poznań · Przyjmujemy dziś do 19:00'}
              </span>
            </div>

            {/* Deliberate headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-medium tracking-tight text-[#eef0f5] leading-[1.08] mb-6">
              {currentLang === 'uk'
                ? 'Точний сервіс та діагностика автомобілів у Познані'
                : 'Precyzyjny serwis samochodowy i stacja diagnostyczna w Poznaniu'}
            </h1>

            {/* Clean subhead */}
            <p className="text-base sm:text-lg text-[#a3a9b8] leading-relaxed max-w-xl mb-8">
              {currentLang === 'uk'
                ? 'Комп’ютерна діагностика OBD2, заміна мастил та фільтрів OEM, ремонт гальмівної системи та підвіски. Офіційна гарантія 24 місяці на кожну роботу.'
                : 'Diagnostyka komputerowa OBD2, obsługa olejowa według norm producentów, naprawa hamulców, zawieszenia i klimatyzacji. Gwarancja 24 miesiące na części i robociznę.'}
            </p>

            {/* Actions: exactly 1 primary, 1 secondary */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a href="#calculator" className="unslop-btn-primary">
                <span>{currentLang === 'uk' ? 'Записатися онлайн' : 'Umów termin online'}</span>
                <ArrowRight className="w-4 h-4 text-[#0b0d14]" />
              </a>

              <a href="#packages" className="unslop-btn-secondary">
                <span>{currentLang === 'uk' ? 'Переглянути ціни' : 'Sprawdź cennik'}</span>
              </a>
            </div>

            {/* Quiet trust parameters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[rgba(238,240,245,0.08)] w-full max-w-lg text-xs font-mono text-[#7a8296]">
              <div>
                <span className="block text-[#eef0f5] font-semibold text-sm mb-0.5">24 mies.</span>
                <span>Gwarancja rękojmi</span>
              </div>
              <div>
                <span className="block text-[#eef0f5] font-semibold text-sm mb-0.5">Od 45 min</span>
                <span>Czas standardowego ТО</span>
              </div>
              <div>
                <span className="block text-[#10b981] font-semibold text-sm mb-0.5">4.9 / 5.0</span>
                <span>240+ opinii w Google</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real product preview (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-card bg-[#11141c] border border-[rgba(238,240,245,0.08)] p-6 shadow-sm">
              {/* Card top row */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(238,240,245,0.08)] mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-xs font-mono font-medium text-[#eef0f5]">
                    Stanowisko 02 · Aktywne
                  </span>
                </div>
                <span className="text-xs font-mono text-[#7a8296]">Protokół #5S-841</span>
              </div>

              {/* Vehicle identification */}
              <div className="mb-5">
                <div className="text-xs font-mono text-[#7a8296] mb-1">Pojazd klienta</div>
                <div className="text-base font-medium text-[#eef0f5]">Audi A6 2.0 TDI Avant</div>
                <div className="text-xs font-mono text-[#a3a9b8]">Przebieg: 142 850 km · VIN: WAUZZZ4G...</div>
              </div>

              {/* Diagnostic checklist */}
              <div className="space-y-2.5 mb-6 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#1a1e28]/70 border border-[rgba(238,240,245,0.06)]">
                  <span className="text-[#a3a9b8]">Skaner OBD2 silnik & skrzynia</span>
                  <span className="text-[#10b981] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Brak błędów
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#1a1e28]/70 border border-[rgba(238,240,245,0.06)]">
                  <span className="text-[#a3a9b8]">Punkt wrzenia płynu hamulcowego</span>
                  <span className="text-[#eef0f5] font-medium tabular-nums">215°C (Norma &gt;180°)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#1a1e28]/70 border border-[rgba(238,240,245,0.06)]">
                  <span className="text-[#a3a9b8]">Grubość klocków przód / tył</span>
                  <span className="text-[#eef0f5] font-medium tabular-nums">8.2 mm / 6.8 mm</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-[6px] bg-[#1a1e28]/70 border border-[rgba(238,240,245,0.06)]">
                  <span className="text-[#a3a9b8]">Geometria zawieszenia 3D</span>
                  <span className="text-[#10b981] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Kąty prawidłowe
                  </span>
                </div>
              </div>

              {/* Summary item */}
              <div className="pt-4 border-t border-[rgba(238,240,245,0.08)] flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-mono text-[#7a8296]">Szacowany koszt</span>
                  <span className="text-xl font-medium text-[#eef0f5] tabular-nums">350 zł</span>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] font-mono text-[#7a8296]">Gotowość do odbioru</span>
                  <span className="text-xs font-mono text-[#10b981] font-medium">Dziś o 16:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
