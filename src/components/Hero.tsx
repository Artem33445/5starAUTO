'use client';

import React, { useState } from 'react';
import {
  Star,
  Award,
  ShieldCheck,
  ArrowRight,
  Phone,
  MapPin,
  Car,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Droplet,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Clock,
} from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  // Interactive Live Symptom Stethoscope / Diagnostic Simulator
  const [selectedSymptom, setSelectedSymptom] = useState<number>(0);

  const symptoms = [
    {
      titlePl: 'Stuki w zawieszeniu / luz',
      titleUk: 'Стукіт у підвісці / люфт',
      servicePl: 'Przegląd zawieszenia + weryfikacja luzów',
      serviceUk: 'Діагностика підвіски + огляд люфтів',
      price: 80,
      time: '30 min',
      color: '#FFE600',
    },
    {
      titlePl: 'Świeci Check Engine / błąd',
      titleUk: 'Світиться Check Engine / помилка',
      servicePl: 'Diagnostyka komputerowa silnika i sensorów',
      serviceUk: "Комп'ютерна діагностика двигуна та систем",
      price: 100,
      time: '35 min',
      color: '#23E28B',
    },
    {
      titlePl: 'Klimatyzacja słabo chłodzi',
      titleUk: 'Кондиціонер слабко охолоджує',
      servicePl: 'Napełnienie czynnikiem R134A + odgrzybianie',
      serviceUk: 'Заправка фреоном R134A + озонування',
      price: 180,
      time: '45 min',
      color: '#5CE1E6',
    },
    {
      titlePl: 'Wymiana oleju i filtrów',
      titleUk: 'Заміна мастила та фільтрів',
      servicePl: 'Wymiana oleju silnikowego + kasowanie inspekcji',
      serviceUk: 'Заміна масла + фільтр + скидання інтервалу',
      price: 120,
      time: '40 min',
      color: '#B886FF',
    },
    {
      titlePl: 'Piski przy hamowaniu',
      titleUk: 'Свист / скрегіт при гальмуванні',
      servicePl: 'Wymiana klocków hamulcowych i czyszczenie zacisków',
      serviceUk: 'Заміна гальмівних колодок + чищення супортів',
      price: 150,
      time: '50 min',
      color: '#FF5E5E',
    },
  ];

  const currentSymptom = symptoms[selectedSymptom];

  return (
    <section
      id="hero"
      className="relative pt-20 lg:pt-14 pb-16 lg:pb-24 overflow-hidden bg-neo-bg bg-neo-grid"
    >
      {/* Background Decorative Liquid Floating Droplets */}
      <div className="absolute top-12 right-12 w-32 h-32 bg-[#FFE600]/30 border-[3px] border-black/10 liquid-shape pointer-events-none animate-float hidden xl:block" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#5CE1E6]/30 border-[3px] border-black/10 liquid-shape pointer-events-none animate-float-delayed hidden xl:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Sticker Badges with Organic Bounce */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE600] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] hover:rotate-0 spring-bounce font-mono font-bold text-xs text-black cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E2E] border border-black animate-ping" />
            <span>POZNAŃ GRUNWALD ✦ JAROCHOWSKIEGO 105</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#23E28B] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[1.5deg] hover:rotate-0 spring-bounce font-mono font-bold text-xs text-black cursor-default">
            <Droplet className="w-3.5 h-3.5 fill-current animate-drip" />
            <span>MAMY WOLNE STANOWISKO DZISIAJ</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#B886FF] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[-1deg] hover:rotate-0 spring-bounce font-mono font-bold text-xs text-black cursor-default">
            <span>✱ 100% GWARANCJA NA ROBOCIZNĘ</span>
          </div>
        </div>

        {/* Radical Wide Editorial Headline (Free of Boxing) */}
        <div className="max-w-6xl mb-8 sm:mb-10">
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-black tracking-tight leading-[1.02]">
            {t.hero.titleStart}{' '}
            <span className="inline-block bg-[#FFE600] px-3 py-1 border-[3.5px] border-black shadow-[6px_6px_0px_#000] rotate-[-1.5deg] hover:rotate-0 spring-bounce my-1">
              {t.hero.titleAccent}
            </span>{' '}
            <span className="inline-block">{t.hero.titleEnd}</span>
          </h1>

          <p className="font-sans text-base sm:text-xl text-black/85 font-medium leading-relaxed max-w-3xl mt-5">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Action Controls & Big Spring Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-14">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#FFE600] hover:bg-[#FF5E5E] text-black border-[3px] border-black font-heading font-black text-base sm:text-lg uppercase tracking-wider shadow-[6px_6px_0px_#000] spring-bounce cursor-pointer group"
          >
            <span>{t.hero.ctaCalc}</span>
            <ArrowRight className="w-6 h-6 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
          </a>

          <a
            href="tel:+48512145314"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-white hover:bg-[#5CE1E6] text-black border-[3px] border-black font-mono font-bold text-sm sm:text-base shadow-[5px_5px_0px_#000] spring-bounce"
          >
            <Phone className="w-5 h-5 stroke-[2.5]" />
            <span>{t.hero.ctaCall}</span>
          </a>

          {/* Quick Direct Trust Google Stamp */}
          <a
            href="https://www.google.com/maps/place/Warsztat+Samochodowy+5starauto.pl/@52.3852144,16.8826007,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-white border-[2.5px] border-black shadow-[4px_4px_0px_#000] spring-bounce text-xs font-mono font-bold"
          >
            <div className="flex items-center text-black">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
              ))}
            </div>
            <span className="font-black text-sm">4.9 / 5.0</span>
            <span className="text-black/60 hidden sm:inline">(250+ opinii)</span>
          </a>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE SYMPTOM STETHOSCOPE / LIVE DIAGNOSTIC SIMULATOR
            Radical interactive brutalist feature: click a symptom, see instant estimate!
            ───────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] overflow-hidden">
          {/* Diagnostic Console Bar */}
          <div className="bg-black text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-black font-mono text-xs font-bold">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block animate-pulse" />
              <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
              <span className="ml-2 uppercase tracking-wider text-white">
                STETOSKOP_WARSZTATOWY_V2.5 • SZYBKI WYBÓR OBJAWU
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black">
                KLIKNIJ OBJAW SWOJEGO AUTA:
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 bg-[#FFFDF8]">
            {/* Symptom Selection Interactive Droplet Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8">
              {symptoms.map((s, idx) => {
                const isSelected = selectedSymptom === idx;
                const title = currentLang === 'uk' ? s.titleUk : s.titlePl;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSymptom(idx)}
                    className={`px-4 sm:px-5 py-3 rounded-xl border-[2.5px] border-black font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-1 scale-105'
                        : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#F7F4EB] hover:-translate-y-0.5'
                    }`}
                    style={{
                      backgroundColor: isSelected ? s.color : undefined,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                    <span>{title}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Reactive Diagnosis Result Card */}
            <div className="rounded-xl border-[3px] border-black p-6 sm:p-8 bg-[#F7F4EB] shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-6 spring-bounce">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-[#FFE600] font-mono text-xs font-bold uppercase">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>ZALECANA PROCEDURA NAPRAWCZA:</span>
                </div>
                <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-black">
                  {currentLang === 'uk' ? currentSymptom.serviceUk : currentSymptom.servicePl}
                </h3>
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-black/80 font-bold pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-black" />
                    Szacowany czas: {currentSymptom.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#23E28B] fill-black stroke-white" />
                    Cena z gwarancją bez niespodzianek
                  </span>
                </div>
              </div>

              {/* Price & Action Deck */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-4 shrink-0 pt-4 md:pt-0 border-t-[2px] md:border-t-0 border-black/10">
                <div className="text-left md:text-right">
                  <span className="font-mono text-xs text-black/60 font-bold uppercase block">
                    OD RĘKI OD:
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-black text-4xl sm:text-5xl text-black">
                      {currentSymptom.price}
                    </span>
                    <span className="font-mono font-black text-lg text-black">PLN</span>
                  </div>
                </div>

                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF5E5E] hover:bg-[#FFE600] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-[2.5px] border-black shadow-[4px_4px_0px_#000] spring-bounce active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>Zablokuj termin</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
