'use client';

import React, { useState } from 'react';
import { FileSearch, Calculator, Wrench, ShieldCheck, ArrowRight, Check, Droplet } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface WorkflowProcessProps {
  currentLang: Language;
}

export const WorkflowProcess: React.FC<WorkflowProcessProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: t.process.step1Title,
      desc: t.process.step1Desc,
      icon: FileSearch,
      color: '#FFE600', // Acid Yellow
      tag: 'KROK 1 • PRZEGLĄD',
      sub: 'Weryfikacja na podnośniku, odczyt błędów z komputera, ustalenie przyczyny usterki.',
    },
    {
      num: '02',
      title: t.process.step2Title,
      desc: t.process.step2Desc,
      icon: Calculator,
      color: '#23E28B', // Electric Mint
      tag: 'KROK 2 • KOSZTORYS',
      sub: 'Prezentujemy cenę części i robocizny przed ruszeniem jakiejkolwiek śruby.',
    },
    {
      num: '03',
      title: t.process.step3Title,
      desc: t.process.step3Desc,
      icon: Wrench,
      color: '#5CE1E6', // Sky Cyan
      tag: 'KROK 3 • REALIZACJA',
      sub: 'Montaż sprawdzonych części, dokręcanie kluczem dynamometrycznym, test drogowy.',
    },
    {
      num: '04',
      title: t.process.step4Title,
      desc: t.process.step4Desc,
      icon: ShieldCheck,
      color: '#B886FF', // Lilac
      tag: 'KROK 4 • ODBIÓR',
      sub: 'Wydanie pojazdu z fakturą i pisemną gwarancją na wykonaną usługę.',
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Unboxed, Bold) */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B886FF] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] font-mono font-bold text-xs text-black mb-3 spring-bounce">
            <Droplet className="w-3.5 h-3.5 fill-current" />
            <span>{t.process.pill}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-tight">
            {t.process.title}
          </h2>
          <p className="font-sans text-black/80 font-medium text-base sm:text-lg max-w-2xl mt-3">
            {t.process.subtitle}
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE CONNECTED PIPELINE HIGHWAY (NOT 4 BOXES)
            Horizontal liquid track with clickable spring-loaded nodes
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border-[3px] border-black cursor-pointer transition-all flex flex-col justify-between select-none spring-bounce ${
                  isSelected
                    ? 'shadow-[6px_6px_0px_#000] -translate-x-1 -translate-y-2'
                    : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#F7F4EB]'
                }`}
                style={{
                  backgroundColor: isSelected ? step.color : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-black text-4xl text-black">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border-[2.5px] border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-black stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded font-mono font-extrabold text-[10px] text-black bg-white border border-black shadow-[1px_1px_0px_#000] mb-2.5">
                    {step.tag}
                  </div>

                  <h3 className="font-heading font-black text-lg sm:text-xl text-black mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-black/85 text-xs sm:text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t-[2px] border-black/20 flex items-center justify-between font-mono text-[11px] font-bold">
                  <span>0% NIESPODZIANEK</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Detailed Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black text-white border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4 spring-bounce">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl border-[2.5px] border-white flex items-center justify-center font-mono font-black text-2xl text-black shrink-0 shadow-[2px_2px_0px_#FFE600]"
              style={{ backgroundColor: steps[activeStep].color }}
            >
              {steps[activeStep].num}
            </div>
            <div>
              <div className="font-heading font-black text-xl text-white">
                {steps[activeStep].title}
              </div>
              <p className="font-sans text-sm text-white/80 mt-0.5">
                {steps[activeStep].sub}
              </p>
            </div>
          </div>

          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFE600] text-black font-heading font-black text-xs uppercase tracking-wider border-[2px] border-black shadow-[3px_3px_0px_#fff] spring-bounce shrink-0"
          >
            <span>Zapisz się online</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>
      </div>
    </section>
  );
};
