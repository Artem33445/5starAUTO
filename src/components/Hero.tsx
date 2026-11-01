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
      className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 border-b border-slate-200/80"
    >
      {/* Light subtle background decorative glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-10 w-[550px] h-[550px] bg-red-100/60 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-amber-100/50 rounded-full blur-3xl opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Left Column (Text & CTAs) */}
          <div className="lg:col-span-7">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12] mb-6">
              {t.hero.titleStart}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-600 to-rose-600">
                {t.hero.titleAccent}
              </span>
              {t.hero.titleEnd ? ` ${t.hero.titleEnd}` : ''}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-sm sm:text-base transition-all shadow-red-subtle active:scale-95"
              >
                <span>{t.hero.ctaCalc}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+48512145314"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-brand-red text-slate-800 font-bold text-sm sm:text-base transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span>{t.hero.ctaCall}</span>
              </a>

              {/* WhatsApp + Telegram Messenger Pair */}
              <div className="inline-flex items-center gap-2">
                <a
                  href="https://wa.me/48512145314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all active:scale-95 shadow-sm shrink-0"
                  aria-label="Direct WhatsApp: +48 512 145 314"
                  title="WhatsApp: +48 512 145 314"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                </a>

                <a
                  href="https://t.me/+48512145314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-[#229ED9] hover:bg-[#1fa1dc] text-white transition-all active:scale-95 shadow-sm shrink-0"
                  aria-label="Direct Telegram: +48 512 145 314"
                  title="Telegram: +48 512 145 314"
                >
                  <TelegramIcon className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Hero 5STARAUTO Branding Card) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group">
              <div className="relative w-64 sm:w-80 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo-5star.png"
                  alt="WARSZTAT SAMOCHODOWY 5STARAUTO"
                  width={340}
                  height={270}
                  style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>

              <div className="space-y-3 w-full">
                <a
                  href="https://www.google.com/maps/place/Warsztat+Samochodowy+5starauto.pl/@52.3852144,16.8826007,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 font-semibold shadow-inner transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>ul. Jarochowskiego 105, Poznań (Grunwald) ↗</span>
                </a>

                <div className="flex items-center justify-center gap-1 text-amber-500 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-slate-900 text-xs font-black ml-1">4.9 / 5.0</span>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  {t.hero.ratingSub}
                </p>

                {/* Partner Brands Mini Pill Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                  <img src="/partner_0.png" alt="Motul" className="h-4 object-contain" />
                  <img src="/partner_1.png" alt="Shell" className="h-4 object-contain" />
                  <img src="/partner_2.png" alt="Mobil" className="h-4 object-contain" />
                  <img src="/partner_3.png" alt="Castrol" className="h-4 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Trust Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Google 4.9 */}
          <a
            href="https://www.google.com/maps/place/Warsztat+Samochodowy+5starauto.pl/@52.3852144,16.8826007,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border border-red-200/80 pulse-red-glow hover:border-brand-red transition-all group flex flex-col justify-between shadow-card hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-bold group-hover:text-brand-red transition-colors">
                Maps ↗
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-lg text-slate-900">
                {t.hero.trustGoogle}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {t.hero.trustReviews}
              </div>
            </div>
          </a>

          {/* Orły Motoryzacji */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all">
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-black text-lg text-slate-900">
                {t.hero.trustAward}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {t.hero.trustAwardSub}
              </div>
            </div>
          </div>

          {/* 100% Gwarancja */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-black text-lg text-slate-900">
                {t.hero.trustWarranty}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {t.hero.trustWarrantySub}
              </div>
            </div>
          </div>

          {/* Obsługiwane marki */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all">
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-brand-red mb-2">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-black text-lg text-slate-900">
                {t.hero.trustFast}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {t.hero.trustFastSub}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
