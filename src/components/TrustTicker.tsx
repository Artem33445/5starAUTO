'use client';

import React from 'react';
import { Shield, Star, CheckCircle, Zap } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface TrustTickerProps {
  currentLang: Language;
}

export const TrustTicker: React.FC<TrustTickerProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const items = [
    { text: 'DIAGNOSTYKA OBD-II / CAN', badge: 'ACTIVE' },
    { text: 'ORŁY MOTORYZACJI LAUREAT', badge: 'AWARD' },
    { text: 'SERWIS KLIMATYZACJI R134A', badge: 'AUTO' },
    { text: 'WYMIANA OPON & WYWAŻANIE', badge: '12-19″' },
    { text: 'PISEMNA GWARANCJA NA CZĘŚCI', badge: '100%' },
    { text: 'GOOGLE MAPS 4.9 ★ (250+ OPINII)', badge: 'VERIFIED' },
    { text: 'POZNAŃ GRUNWALD • UL. JAROCHOWSKIEGO 105', badge: 'HQ' },
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#070712] py-3.5 font-mono text-xs select-none">
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center mx-6 gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0000F2] shadow-[0_0_8px_#0000F2]" />
                <span className="text-white/80 font-bold uppercase tracking-wider whitespace-nowrap">
                  {item.text}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-[#00F0FF] text-[10px] font-bold">
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
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
