'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
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
    <section id="faq" className="py-20 lg:py-32 bg-[#090915] border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00F0FF] mb-3">
            <span># CZĘSTE PYTANIA</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {t.faq.title}
          </h2>
        </div>

        {/* Minimal Hermes Accordion Lines */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-white/90 hover:text-white transition-colors"
                >
                  <span className="pr-4">{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-white/10 transition-all ${
                      isOpen ? 'bg-[#0000F2] text-white rotate-180 border-transparent shadow-[0_0_10px_rgba(0,0,242,0.8)]' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-6 pr-6 text-sm sm:text-base text-white/70 leading-relaxed font-sans">
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
