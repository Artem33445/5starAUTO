'use client';

import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles, Activity, ShieldCheck, Gauge } from 'lucide-react';
import { Language } from '@/types';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'osobowe' | 'suv' | 'dostawcze'>('osobowe');
  const [copied, setCopied] = useState(false);

  const commands = {
    osobowe: '5star service --book --type=osobowe --city=poznan --fast-diag',
    suv: '5star service --book --type=suv-4x4 --quattro --lift=4.5t',
    dostawcze: '5star service --book --type=bus-fleet --high-roof --vat23',
  };

  const currentCommand = commands[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section aria-label="5STAR Auto Hero" className="bg-[#0000F2] text-white overflow-hidden">
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16 pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy, Buttons, Terminal */}
          <div className="flex flex-col items-start gap-8 z-10 max-w-xl">
            {/* Giant 3-Line Gothic Headline */}
            <h1
              className="font-heading font-extralight text-5xl sm:text-7xl lg:text-[84px] leading-[0.92] tracking-tight uppercase text-white"
              style={{ fontWeight: 200 }}
            >
              <span className="block">
                {currentLang === 'uk' ? 'Сервіс' : 'Serwis'}
              </span>
              <span className="block">
                {currentLang === 'uk' ? 'Який Дбає' : 'Który Dba'}
              </span>
              <span className="block">
                {currentLang === 'uk' ? 'Про Твій Час' : 'O Twój Czas'}
              </span>
            </h1>

            {/* Action Buttons (Download desktop app + Deploy to the cloud parallel) */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="hermes-button hermes-button-secondary px-5 py-3 text-xs font-semibold gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <span>{currentLang === 'uk' ? 'Забронювати візит' : 'Zarezerwuj termin'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              <a
                href="#portal"
                className="hermes-button hermes-button-ghost px-5 py-3 text-xs font-medium gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentLang === 'uk' ? 'Пакети і ціни' : 'Pakiety i Cennik'}</span>
              </a>
            </div>

            {/* Terminal Box (.hw-install-terminal) */}
            <div className="w-full max-w-[460px] pt-2 font-mono">
              <p className="text-[11px] uppercase tracking-wider text-white/80 mb-2">
                {currentLang === 'uk' ? 'Швидкий запис через термінал :' : 'Szybka rezerwacja przez terminal :'}
              </p>

              <div className="bg-[#000030] rounded-none p-1.5 border border-white/10 shadow-2xl">
                {/* Terminal Tabs */}
                <div className="grid grid-cols-3 gap-1 mb-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('osobowe')}
                    className={`py-1.5 px-2 text-center transition-colors ${
                      activeTab === 'osobowe'
                        ? 'text-white bg-white/10 underline underline-offset-2'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    : Osobowe :
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('suv')}
                    className={`py-1.5 px-2 text-center transition-colors ${
                      activeTab === 'suv'
                        ? 'text-white bg-white/10 underline underline-offset-2'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    : SUV & 4x4 :
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dostawcze')}
                    className={`py-1.5 px-2 text-center transition-colors ${
                      activeTab === 'dostawcze'
                        ? 'text-white bg-white/10 underline underline-offset-2'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    : Dostawcze :
                  </button>
                </div>

                {/* Terminal Code Panel */}
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 bg-black/40 text-xs text-white/90">
                  <code className="text-[#00F0FF] truncate">
                    {currentCommand}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1 hover:text-white text-white/70 transition-colors shrink-0"
                    title="Kopiuj polecenie"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1 text-[10px] text-[#00FF85]">
                        <Check className="w-3.5 h-3.5" /> OK
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Art / Mechanical Telemetry Preview */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-square flex flex-col justify-between p-6 sm:p-8 bg-[#000030]/60 border border-white/15 shadow-2xl backdrop-blur-sm">
              {/* Top spec badges */}
              <div className="flex items-center justify-between font-mono text-[11px] text-white/70 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00FF85] animate-ping" />
                  <span className="text-white font-bold">5STAR STATION POZNAŃ</span>
                </div>
                <span>BAY #04 // LIVE</span>
              </div>

              {/* Center graphic: Precision Automotive Diagnostics Visual */}
              <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 rounded-full border-t-2 border-[#00F0FF] animate-spin" />
                  <Gauge className="w-9 h-9 text-white" />
                </div>
                <p className="font-heading font-medium text-lg text-white mb-1 uppercase tracking-wider">
                  OBD2 Real-Time Telemetry
                </p>
                <p className="font-mono text-xs text-white/60 max-w-xs">
                  Bosch & Launch OEM diagnostics ready for Audi, BMW, Mercedes, VAG & all brands.
                </p>
              </div>

              {/* Bottom stats matrix */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-mono text-[11px]">
                <div>
                  <span className="block text-white/50 text-[9px] uppercase">Gwarancja</span>
                  <span className="text-white font-bold">24 MIESIĄCE</span>
                </div>
                <div>
                  <span className="block text-white/50 text-[9px] uppercase">Czas serwisu</span>
                  <span className="text-white font-bold">OD 45 MIN</span>
                </div>
                <div>
                  <span className="block text-white/50 text-[9px] uppercase">Ocena Google</span>
                  <span className="text-[#00FF85] font-bold">4.9 ★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
