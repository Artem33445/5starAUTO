'use client';

import React from 'react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface TrustTickerProps {
  currentLang: Language;
}

export const TrustTicker: React.FC<TrustTickerProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const items = [
    t.ticker.item1,
    t.ticker.item2,
    t.ticker.item3,
    t.ticker.item4,
    t.ticker.item5,
    t.ticker.item6,
    t.ticker.item7,
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white border-y border-slate-200 py-3.5 shadow-sm">
      {/* Subtle fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {/* Render 2 sets for seamless loop */}
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {items.map((text, idx) => (
              <div key={idx} className="flex items-center mx-5">
                <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-700 uppercase">
                  {text}
                </span>
                <span className="ml-10 w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
