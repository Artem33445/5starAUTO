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
      num: t.process.step1Num,
      title: t.process.step1Title,
      desc: t.process.step1Desc,
      icon: FileSearch,
    },
    {
      num: t.process.step2Num,
      title: t.process.step2Title,
      desc: t.process.step2Desc,
      icon: Calculator,
    },
    {
      num: t.process.step3Num,
      title: t.process.step3Title,
      desc: t.process.step3Desc,
      icon: Wrench,
    },
    {
      num: t.process.step4Num,
      title: t.process.step4Title,
      desc: t.process.step4Desc,
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="process" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-sm mb-3">
            <span>{t.process.pill}</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            {t.process.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-red/50 transition-all flex flex-col justify-between shadow-card hover:shadow-card-hover relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-black text-3xl text-brand-red/30 group-hover:text-brand-red transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-red">
                      <Icon className="w-5 h-5 text-brand-red" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  <span>5STARAUTO Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
