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
    { text: t.ticker.item1, icon: '✦', badge: 'DIAGNOSTYKA' },
    { text: t.ticker.item2, icon: '✱', badge: 'KLIMATYZACJA' },
    { text: t.ticker.item3, icon: '✸', badge: 'WULKANIZACJA' },
    { text: t.ticker.item4, icon: '✦', badge: 'ROZRZĄD & SPRZĘGŁO' },
    { text: t.ticker.item5, icon: '✱', badge: 'SPRAWDZENIE AUTA' },
    { text: t.ticker.item6, icon: '✸', badge: 'ZAWIESZENIE & HAMULCE' },
    { text: t.ticker.item7, icon: '✦', badge: 'POZNAŃ GRUNWALD' },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black text-white py-3.5 border-y-[3px] border-black font-mono uppercase text-sm tracking-widest select-none">
      <div className="flex w-max animate-marquee">
        {/* Render 2 sets for seamless marquee loop */}
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center mx-6 gap-3">
                <span className="text-[#FFE600] text-base font-black">
                  {item.icon}
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm text-white tracking-wider whitespace-nowrap">
                  {item.text}
                </span>
                <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono font-black text-[10px] rounded border border-black shadow-[2px_2px_0px_#fff]">
                  {item.badge}
                </span>
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
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
