'use client';

import React from 'react';
import { FileSearch, Calculator, Wrench, ShieldCheck } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface WorkflowProcessProps {
  currentLang: Language;
}

export const WorkflowProcess: React.FC<WorkflowProcessProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const steps = [
    {
      num: t.process.step1Num || '#01',
      title: t.process.step1Title,
      desc: t.process.step1Desc,
      icon: FileSearch,
      accent: '#FFE600', // Acid Yellow
      tag: 'KROK 1 • PRZEGLĄD',
    },
    {
      num: t.process.step2Num || '#02',
      title: t.process.step2Title,
      desc: t.process.step2Desc,
      icon: Calculator,
      accent: '#23E28B', // Electric Mint
      tag: 'KROK 2 • WYCENA',
    },
    {
      num: t.process.step3Num || '#03',
      title: t.process.step3Title,
      desc: t.process.step3Desc,
      icon: Wrench,
      accent: '#5CE1E6', // Sky Cyan
      tag: 'KROK 3 • NAPRAWA',
    },
    {
      num: t.process.step4Num || '#04',
      title: t.process.step4Title,
      desc: t.process.step4Desc,
      icon: ShieldCheck,
      accent: '#B886FF', // Lilac
      tag: 'KROK 4 • ODBIÓR',
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] font-mono font-bold text-xs text-black mb-3">
            <span>✸ {t.process.pill}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-black tracking-tight mb-3">
            {t.process.title}
          </h2>
          <p className="font-sans text-black/80 font-medium text-sm sm:text-base">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4 Asymmetric Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-lg bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Vintage OS Header */}
                <div className="bg-black text-white px-3.5 py-2 border-b-[3px] border-black font-mono text-[10px] font-bold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5E5E] inline-block" />
                    <span className="w-2 h-2 rounded-full bg-[#FFE600] inline-block" />
                    <span className="w-2 h-2 rounded-full bg-[#23E28B] inline-block" />
                    <span className="ml-1 uppercase">PROCEDURA_{idx + 1}.SYS</span>
                  </div>
                  <span
                    className="px-1.5 py-0.2 rounded font-mono font-black text-[9px] text-black"
                    style={{ backgroundColor: step.accent }}
                  >
                    STEP
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono font-black text-4xl sm:text-5xl text-black">
                        {step.num}
                      </span>
                      <div
                        className="w-12 h-12 rounded-lg border-[2.5px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-black"
                        style={{ backgroundColor: step.accent }}
                      >
                        <Icon className="w-6 h-6 stroke-[2.5]" />
                      </div>
                    </div>

                    <div className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] text-black bg-[#F7F4EB] border border-black mb-2.5">
                      {step.tag}
                    </div>

                    <h3 className="font-heading font-black text-lg text-black mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="font-sans text-black/80 text-xs sm:text-sm leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t-[2px] border-black/10 flex items-center gap-2 font-mono text-[10px] text-black/70 font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-black" />
                    <span>ZERO UKRYTYCH KOSZTÓW</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
