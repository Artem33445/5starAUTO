'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Terminal,
  ArrowRight,
  Phone,
  ShieldCheck,
  Star,
  Sparkles,
  Zap,
  Car,
  Layers,
  CheckCircle2,
  Cpu,
  Wrench,
} from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'diagnostics' | 'platform'>('terminal');
  const [selectedVehicleType, setSelectedVehicleType] = useState<'passenger' | 'suv' | 'bus'>('passenger');

  const cliCommand =
    '5star service --book "Diagnostyka + Olej" --city "Poznan" --guarantee "100%"';

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vehicleData = {
    passenger: {
      namePl: 'Samochody Osobowe',
      nameUk: 'Легкові автомобілі',
      subPl: 'Sedan, Kombi, Hatchback, Coupé',
      subUk: 'Седани, універсали, хетчбеки',
      oilPl: 'Serwis olejowy od 120 PLN',
      diagPl: 'Diagnostyka OBD od 100 PLN',
      tiresPl: 'Wymiana opon od 150 PLN',
      color: '#00F0FF',
    },
    suv: {
      namePl: 'SUV & Napęd 4x4',
      nameUk: 'SUV та повний привід 4x4',
      subPl: 'Crossover, Napędy AWD/4WD, Geometria',
      subUk: 'Кросовери, AWD/4WD, геометрія',
      oilPl: 'Serwis olejowy od 140 PLN',
      diagPl: 'Diagnostyka napędów od 120 PLN',
      tiresPl: 'Wymiana opon 4x4 od 200 PLN',
      color: '#00FF85',
    },
    bus: {
      namePl: 'Dostawcze & BUS',
      nameUk: 'Мікроавтобуси & BUS',
      subPl: 'Pojazdy użytkowe, L1-L4, do 3.5t',
      subUk: 'Комерційні авто, фургони до 3.5т',
      oilPl: 'Serwis olejowy od 160 PLN',
      diagPl: 'Diagnostyka układu od 130 PLN',
      tiresPl: 'Wymiana opon BUS od 240 PLN',
      color: '#FFB800',
    },
  };

  const currentVehicle = vehicleData[selectedVehicleType];

  return (
    <section
      id="hero"
      className="relative pt-32 sm:pt-36 lg:pt-44 pb-20 lg:pb-32 overflow-hidden bg-hermes-dark bg-hermes-radial bg-hermes-grid"
    >
      {/* Background Electric Klein Blue Atmosphere Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#0000F2]/25 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Release Pill Badge (Hermes Agent Style) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/90 font-mono text-xs mb-8 shadow-[0_0_20px_rgba(0,0,242,0.3)] hover:border-[#00F0FF]/50 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
          <span>5STAR AUTO AGENT</span>
          <span className="text-white/40">•</span>
          <span className="text-[#00F0FF]">POZNAŃ GRUNWALD</span>
          <span className="text-white/40">•</span>
          <span className="text-white/60">ul. Jarochowskiego 105</span>
        </div>

        {/* Massive 3-Line Stark Headline (Hermes Signature Typography) */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[84px] text-white tracking-tight leading-[0.98] mb-6 max-w-5xl mx-auto">
          {currentLang === 'uk' ? (
            <>
              Автосервіс майбутнього.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                Ремонт авто в Познані.
              </span>
              <br />
              <span className="text-[#00F0FF]">Чесно та надійно.</span>
            </>
          ) : (
            <>
              Twój Warsztat.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                Który Dba O Wszystko.
              </span>
              <br />
              <span className="text-[#00F0FF]">Bez Ściemy.</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
          {t.hero.subtitle}
        </p>

        {/* Action Button Deck (Hermes Style) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full hermes-btn-primary text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(255,255,255,0.35)]"
          >
            <span>{t.hero.ctaCalc}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="tel:+48512145314"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-sm transition-all"
          >
            <Phone className="w-4 h-4 text-[#00F0FF]" />
            <span>{t.hero.ctaCall}</span>
          </a>

          {/* Direct Messengers */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#0000F2]/30 hover:bg-[#0000F2] border border-white/20 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,242,0.4)]"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
            </a>
            <a
              href="https://t.me/+48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#0000F2]/30 hover:bg-[#0000F2] border border-white/20 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,242,0.4)]"
              title="Telegram"
            >
              <TelegramIcon className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERMES SIGNATURE INTERACTIVE TERMINAL BOX (CLI & PLATFORMS)
            Exact architectural recreation of Hermes Agent's Install/Tab Box
            ───────────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto rounded-2xl hermes-glass p-1.5 shadow-[0_20px_60px_rgba(0,0,242,0.25)] text-left">
          {/* Top Interactive Mode Tabs (like Hermes' Desktop App / Cloud / Terminal) */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-xs">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-[#0000F2] text-white font-bold shadow-[0_0_12px_rgba(0,0,242,0.6)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Auto Terminal CLI</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('platform')}
                className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all ${
                  activeTab === 'platform'
                    ? 'bg-[#0000F2] text-white font-bold shadow-[0_0_12px_rgba(0,0,242,0.6)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#00FF85]" />
                <span>Klasy Pojazdów</span>
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF85]" />
              <span>Gwarancja 100%</span>
            </span>
          </div>

          {/* Tab 1: Terminal CLI Command Copy Bar (Direct Hermes Recreation) */}
          {activeTab === 'terminal' && (
            <div className="p-5 sm:p-6 bg-black/60 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#090915] border border-white/10 rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-white/90 overflow-x-auto">
                  <span className="text-[#00F0FF] select-none">$</span>
                  <code className="text-white font-medium select-all">
                    {cliCommand}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all shrink-0 border border-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00FF85]" />
                      <span className="text-[#00FF85]">Skopiowano</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/70" />
                      <span>Kopiuj</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Quick Capability Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-white/50 block text-[10px]">STANOWISKO</span>
                  <span className="text-[#00FF85] font-bold">● Wolne od ręki</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-white/50 block text-[10px]">CZAS PRZEGLĄDU</span>
                  <span className="text-white font-bold">30-45 minut</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-white/50 block text-[10px]">RATING GOOGLE</span>
                  <span className="text-[#FFB800] font-bold">4.9 ★ (250+ opinii)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-white/50 block text-[10px]">CZĘŚCI</span>
                  <span className="text-[#00F0FF] font-bold">OEM + Atestowane</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vehicle Platform Selector (Hermes macOS/Linux/Windows recreation) */}
          {activeTab === 'platform' && (
            <div className="p-5 sm:p-6 bg-black/60 rounded-xl space-y-5">
              {/* Vehicle Type Switchers */}
              <div className="flex flex-wrap gap-2">
                {(['passenger', 'suv', 'bus'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedVehicleType(type)}
                    className={`px-4 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 border ${
                      selectedVehicleType === type
                        ? 'bg-[#0000F2] text-white font-bold border-white/40 shadow-[0_0_15px_rgba(0,0,242,0.6)]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>{vehicleData[type].namePl}</span>
                  </button>
                ))}
              </div>

              {/* Vehicle Spec Card */}
              <div className="p-5 rounded-xl bg-[#090915] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-heading font-bold text-lg text-white">
                    {currentVehicle.namePl}
                  </div>
                  <div className="font-mono text-xs text-white/60 mt-0.5">
                    {currentVehicle.subPl}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 font-mono text-xs">
                    <span className="px-2 py-1 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                      {currentVehicle.oilPl}
                    </span>
                    <span className="px-2 py-1 rounded bg-white/5 text-[#00FF85] border border-white/10">
                      {currentVehicle.diagPl}
                    </span>
                    <span className="px-2 py-1 rounded bg-white/5 text-[#FFB800] border border-white/10">
                      {currentVehicle.tiresPl}
                    </span>
                  </div>
                </div>

                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl hermes-btn-blue text-xs uppercase font-bold shrink-0"
                >
                  <span>Dobierz termin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
