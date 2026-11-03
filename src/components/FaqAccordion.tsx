'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
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
    <section id="faq" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-1.5deg] font-mono font-bold text-xs text-black mb-3">
            <span>✱ {t.faq.pill}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-black tracking-tight">
            {t.faq.title}
          </h2>
        </div>

        {/* Neo-Brutalist Accordion Cards */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-black text-base sm:text-lg text-black transition-colors ${
                    isOpen ? 'bg-[#FFE600]' : 'bg-white hover:bg-[#F7F4EB]'
                  }`}
                >
                  <span className="pr-2 leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded border-[2px] border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] transition-transform ${
                      isOpen
                        ? 'bg-black text-[#FFE600]'
                        : 'bg-white text-black'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 bg-[#FFFDF8] border-t-[2.5px] border-black font-sans text-sm sm:text-base text-black/90 font-medium leading-relaxed">
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
