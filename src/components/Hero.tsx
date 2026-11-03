'use client';

import React from 'react';
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
} from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden bg-neo-bg border-b-[3px] border-black bg-neo-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Floating Stickers Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] hover:rotate-0 transition-transform font-mono font-bold text-xs text-black">
            <span className="w-2.5 h-2.5 bg-[#FF2E2E] rounded-full border border-black animate-pulse" />
            <span>POZNAŃ GRUNWALD ✦ UL. JAROCHOWSKIEGO 105</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23E28B] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[2deg] hover:rotate-0 transition-transform font-mono font-bold text-xs text-black">
            <span>✸ DZISIAJ WOLNE STANOWISKA</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B886FF] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[-1deg] hover:rotate-0 transition-transform font-mono font-bold text-xs text-black">
            <span>✱ 100% GWARANCJA NA NAPRAWĘ</span>
          </div>
        </div>

        {/* Main Hero Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-10 sm:mb-14">
          {/* Left Column: Bold Typography & Action Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Massive Neo-Brutalist Heading */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-[68px] text-black tracking-tight leading-[1.04] mb-6">
                {t.hero.titleStart}{' '}
                <span className="inline-block bg-[#FFE600] px-2 py-0.5 border-[3px] border-black shadow-[5px_5px_0px_#000] rotate-[-1deg] hover:rotate-0 transition-transform mt-1">
                  {t.hero.titleAccent}
                </span>{' '}
                {t.hero.titleEnd ? (
                  <span className="inline-block mt-1">{t.hero.titleEnd}</span>
                ) : null}
              </h1>

              {/* Punchy Subtitle with attitude */}
              <div className="p-4 sm:p-5 rounded-lg bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] mb-7">
                <p className="font-sans text-base sm:text-lg text-black font-medium leading-relaxed">
                  {t.hero.subtitle}
                </p>
                <div className="mt-3 pt-3 border-t-[2px] border-black/10 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-black/80">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#23E28B] fill-black stroke-white" />
                    Bez naciągania na koszty
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#23E28B] fill-black stroke-white" />
                    Wycena przed naprawą
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#23E28B] fill-black stroke-white" />
                    Części OEM i zamienniki
                  </span>
                </div>
              </div>
            </div>

            {/* Tactile Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#calculator"
                onClick={(e) => {
                  const nameInput = document.getElementById('calc-input-name') as HTMLInputElement | null;
                  const step2 = document.getElementById('calculator-step2');
                  if (window.scrollY > 400 && step2 && nameInput && !nameInput.value.trim()) {
                    e.preventDefault();
                    nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => nameInput.focus(), 350);
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-4 rounded-lg bg-[#FFE600] text-black border-[3px] border-black font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all"
              >
                <span>{t.hero.ctaCalc}</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </a>

              <a
                href="tel:+48512145314"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-4 rounded-lg bg-white hover:bg-[#5CE1E6] text-black border-[3px] border-black font-mono font-bold text-sm sm:text-base shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>{t.hero.ctaCall}</span>
              </a>

              {/* Direct Messengers */}
              <div className="inline-flex items-center gap-2">
                <a
                  href="https://wa.me/48512145314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 inline-flex items-center justify-center rounded-lg bg-[#23E28B] hover:bg-[#1ac777] text-black border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all shrink-0"
                  aria-label="Direct WhatsApp: +48 512 145 314"
                  title="WhatsApp: +48 512 145 314"
                >
                  <WhatsAppIcon className="w-6 h-6 text-black fill-current" />
                </a>

                <a
                  href="https://t.me/+48512145314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 inline-flex items-center justify-center rounded-lg bg-[#5CE1E6] hover:bg-[#4bc7cc] text-black border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all shrink-0"
                  aria-label="Direct Telegram: +48 512 145 314"
                  title="Telegram: +48 512 145 314"
                >
                  <TelegramIcon className="w-6 h-6 text-black fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Retro OS Terminal Card (Asymmetric Featured Card) */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-lg bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col justify-between overflow-hidden">
              {/* Retro OS Window Title Bar */}
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between border-b-[3px] border-black font-mono text-xs font-bold tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
                  <span className="ml-2 text-white/90">5STARAUTO_INSPECTION_TERMINAL.EXE</span>
                </div>
                <span className="bg-[#23E28B] text-black px-1.5 py-0.2 rounded text-[10px] font-black">
                  ONLINE
                </span>
              </div>

              {/* Window Body */}
              <div className="p-6 sm:p-7 flex flex-col items-center text-center">
                {/* Official 5STAR Emblem in Neo Frame */}
                <div className="relative w-52 sm:w-64 p-4 bg-[#F7F4EB] border-[2.5px] border-black rounded-lg shadow-[4px_4px_0px_#000] mb-6 transform -rotate-1 hover:rotate-0 transition-transform">
                  <img
                    src="/logo-5star.webp"
                    alt="WARSZTAT SAMOCHODOWY 5STARAUTO"
                    width={280}
                    height={220}
                    className="w-full h-auto object-contain mx-auto"
                  />
                  <div className="absolute -top-3 -right-3 bg-[#FF5E5E] text-black font-mono font-black text-[10px] px-2 py-0.5 rounded border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-6">
                    ★ OFICJALNY WARSZTAT
                  </div>
                </div>

                {/* Rating Card with Stars */}
                <div className="w-full space-y-3">
                  <div className="p-3 bg-[#FFE600] border-[2.5px] border-black rounded-lg shadow-[4px_4px_0px_#000]">
                    <div className="flex items-center justify-center gap-1 text-black mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-black stroke-black" />
                      ))}
                      <span className="font-heading font-black text-lg ml-1.5">4.9 / 5.0</span>
                    </div>
                    <p className="font-mono text-xs text-black font-bold uppercase tracking-wider">
                      {t.hero.ratingSub}
                    </p>
                  </div>

                  {/* Address Badge with Retro Pin */}
                  <a
                    href="https://www.google.com/maps/place/Warsztat+Samochodowy+5starauto.pl/@52.3852144,16.8826007,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#5CE1E6] border-[2.5px] border-black rounded-lg shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] transition-all font-mono font-bold text-xs text-black"
                  >
                    <MapPin className="w-4 h-4 text-[#FF2E2E]" />
                    <span>ul. Kazimierza Jarochowskiego 105, Poznań ↗</span>
                  </a>

                  {/* Partner Brands Mini Ticker Bar */}
                  <div className="p-3 bg-[#F7F4EB] border-[2px] border-black rounded-lg">
                    <div className="text-[10px] font-mono font-bold uppercase text-black/70 mb-2 text-left">
                      AUTORYZOWANE PŁYNY & CZĘŚCI:
                    </div>
                    <div className="flex items-center justify-between gap-3 px-1">
                      <img src="/partner_0.webp" alt="Motul" className="h-4 object-contain filter grayscale contrast-200" />
                      <img src="/partner_1.webp" alt="Shell" className="h-4 object-contain filter grayscale contrast-200" />
                      <img src="/partner_2.webp" alt="Mobil" className="h-4 object-contain filter grayscale contrast-200" />
                      <img src="/partner_3.webp" alt="Castrol" className="h-4 object-contain filter grayscale contrast-200" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Retro Footer Window Stamp */}
              <div className="bg-black text-white/90 px-4 py-2 border-t-[3px] border-black font-mono text-[11px] flex items-center justify-between">
                <span>LICENCJA SERWISOWA: #5STAR-POZ-2026</span>
                <span className="text-[#FFE600] font-bold">STATUS: AKTYWNY</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Asymmetric Neo-Brutalist Trust Bento Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Google Maps (Acid Yellow) */}
          <a
            href="https://www.google.com/maps/place/Warsztat+Samochodowy+5starauto.pl/@52.3852144,16.8826007,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg bg-[#FFE600] border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black stroke-black" />
                ))}
              </div>
              <span className="px-2 py-0.5 bg-black text-white font-mono text-[10px] font-bold rounded border border-black">
                MAPS ↗
              </span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-black leading-tight mb-1">
                {t.hero.trustGoogle}
              </div>
              <div className="font-mono text-xs text-black/90 font-bold">
                {t.hero.trustReviews}
              </div>
            </div>
          </a>

          {/* Card 2: Orły Motoryzacji (Electric Mint) */}
          <div className="p-5 rounded-lg bg-[#23E28B] border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-black text-[#FFE600] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <Award className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 bg-white text-black font-mono text-[10px] font-bold rounded border-[2px] border-black">
                LAUR 2026
              </span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-black leading-tight mb-1">
                {t.hero.trustAward}
              </div>
              <div className="font-mono text-xs text-black/90 font-bold">
                {t.hero.trustAwardSub}
              </div>
            </div>
          </div>

          {/* Card 3: 100% Gwarancja (Sky Cyan) */}
          <div className="p-5 rounded-lg bg-[#5CE1E6] border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-black text-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <ShieldCheck className="w-5 h-5 text-[#23E28B]" />
              </div>
              <span className="px-2 py-0.5 bg-black text-white font-mono text-[10px] font-bold rounded">
                PISEMNA
              </span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-black leading-tight mb-1">
                {t.hero.trustWarranty}
              </div>
              <div className="font-mono text-xs text-black/90 font-bold">
                {t.hero.trustWarrantySub}
              </div>
            </div>
          </div>

          {/* Card 4: Obsługiwane Marki (Lilac) */}
          <div className="p-5 rounded-lg bg-[#B886FF] border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-black text-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <Car className="w-5 h-5 text-[#FFE600]" />
              </div>
              <span className="px-2 py-0.5 bg-white text-black font-mono text-[10px] font-bold rounded border-[2px] border-black">
                40+ MAREK
              </span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-black leading-tight mb-1">
                {t.hero.trustFast}
              </div>
              <div className="font-mono text-xs text-black/90 font-bold">
                {t.hero.trustFastSub}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
