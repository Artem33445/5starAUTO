'use client';

import React from 'react';
import { Droplet } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface TrustTickerProps {
  currentLang: Language;
}

export const TrustTicker: React.FC<TrustTickerProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const itemsTop = [
    { text: t.ticker.item1, icon: '✦', badge: 'DIAGNOSTYKA' },
    { text: t.ticker.item2, icon: '✱', badge: 'KLIMATYZACJA' },
    { text: t.ticker.item3, icon: '✸', badge: 'WULKANIZACJA' },
    { text: t.ticker.item4, icon: '✦', badge: 'ROZRZĄD & SPRZĘGŁO' },
  ];

  const itemsBottom = [
    { text: t.ticker.item5, icon: '✱', badge: 'SPRAWDZENIE AUTA' },
    { text: t.ticker.item6, icon: '✸', badge: 'ZAWIESZENIE & HAMULCE' },
    { text: t.ticker.item7, icon: '✦', badge: 'POZNAŃ GRUNWALD' },
    { text: 'CZĘŚCI ORYGINALNE I SPRAWDZONE ZAMIENNIKI', icon: '✱', badge: '100% GWARANCJI' },
  ];

  return (
    <div className="relative w-full overflow-hidden select-none border-y-[3px] border-black">
      {/* Top Tape: Black Background */}
      <div className="bg-black text-white py-3 border-b-[2px] border-black font-mono uppercase text-xs sm:text-sm tracking-widest flex w-max animate-marquee">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {itemsTop.map((item, idx) => (
              <div key={idx} className="flex items-center mx-6 gap-3">
                <span className="text-[#FFE600] text-lg font-black">{item.icon}</span>
                <span className="font-mono font-black text-xs sm:text-sm text-white tracking-wider whitespace-nowrap">
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

      {/* Bottom Tape: Acid Yellow Background, Opposite Direction */}
      <div className="bg-[#FFE600] text-black py-2.5 font-mono uppercase text-[11px] sm:text-xs tracking-widest font-black flex w-max animate-marquee-reverse">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {itemsBottom.map((item, idx) => (
              <div key={idx} className="flex items-center mx-6 gap-3">
                <span className="text-black text-base">✸</span>
                <span className="whitespace-nowrap">{item.text}</span>
                <span className="px-2 py-0.5 bg-black text-[#FFE600] font-mono text-[9px] rounded font-extrabold">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
