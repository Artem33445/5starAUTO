'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface FaqAccordionProps {
  currentLang: Language;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-brand-red" />
            <span>{t.faq.pill}</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            {t.faq.title}
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-all">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-slate-900 hover:text-brand-red transition-colors group"
                >
                  <span className="group-hover:text-brand-red transition-colors pr-2">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-brand-red text-white rotate-180 shadow-sm'
                        : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 pr-8 sm:pr-12 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
