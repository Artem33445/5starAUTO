'use client';

import React from 'react';
import { FileSearch, Calculator, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface WorkflowProcessProps {
  currentLang: Language;
}

export const WorkflowProcess: React.FC<WorkflowProcessProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const steps = [
    {
      num: '01',
      title: t.process.step1Title,
      desc: t.process.step1Desc,
      icon: FileSearch,
      tag: 'DIAGNOSTIC PROTOCOL',
    },
    {
      num: '02',
      title: t.process.step2Title,
      desc: t.process.step2Desc,
      icon: Calculator,
      tag: 'QUOTE LOCK',
    },
    {
      num: '03',
      title: t.process.step3Title,
      desc: t.process.step3Desc,
      icon: Wrench,
      tag: 'PRECISION REPAIR',
    },
    {
      num: '04',
      title: t.process.step4Title,
      desc: t.process.step4Desc,
      icon: ShieldCheck,
      tag: 'WARRANTY ISSUE',
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-32 bg-[#090915] border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00FF85] mb-4">
            <span># PROTOKÓŁ NAPRAWCZY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Standard 4 Kroków.
            <br />
            <span className="text-white/60">Pełna przejrzystość.</span>
          </h2>
          <p className="font-sans text-white/70 text-base sm:text-lg mt-4">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4 Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl hermes-glass hermes-glass-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-[#00F0FF] font-bold">
                      {step.tag}
                    </span>
                    <span className="font-mono text-3xl font-black text-white/20">
                      {step.num}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm text-white/70 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 font-mono text-xs text-white/40 flex items-center justify-between">
                  <span>KROK {idx + 1} Z 4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
