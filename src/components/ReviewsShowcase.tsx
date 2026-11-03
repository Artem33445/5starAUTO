'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, Quote, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface ReviewsShowcaseProps {
  currentLang: Language;
}

export const ReviewsShowcase: React.FC<ReviewsShowcaseProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const reviews = [
    {
      name: t.reviews.rev1Name,
      car: t.reviews.rev1Car,
      text: t.reviews.rev1Text,
      rating: 5,
      date: '2 tyg. temu',
      color: '#FFE600', // Acid Yellow
      tilt: '-2deg',
    },
    {
      name: t.reviews.rev2Name,
      car: t.reviews.rev2Car,
      text: t.reviews.rev2Text,
      rating: 5,
      date: '1 mies. temu',
      color: '#23E28B', // Electric Mint
      tilt: '1.5deg',
    },
    {
      name: t.reviews.rev3Name,
      car: t.reviews.rev3Car,
      text: t.reviews.rev3Text,
      rating: 5,
      date: '3 tyg. temu',
      color: '#5CE1E6', // Sky Cyan
      tilt: '-1deg',
    },
    {
      name: t.reviews.rev4Name,
      car: t.reviews.rev4Car,
      text: t.reviews.rev4Text,
      rating: 5,
      date: '2 mies. temu',
      color: '#B886FF', // Lilac
      tilt: '2deg',
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Unboxed) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] font-mono font-bold text-xs text-black mb-3 spring-bounce">
              <Star className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>{t.reviews.pill}</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-tight">
              {t.reviews.title}
            </h2>
            <p className="font-sans text-black/80 font-medium text-base sm:text-lg max-w-xl mt-2">
              {t.reviews.ratingNote}
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=5STARAUTO+ul.+Kazimierza+Jarochowskiego+105+60-129+Poznan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#FFE600] border-[2.5px] border-black font-mono text-xs font-black text-black shadow-[4px_4px_0px_#000] spring-bounce self-start md:self-auto shrink-0"
          >
            <span>{t.reviews.readAllGoogle}</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            KINETIC SPEECH CLOUD (DYNAMIC TILT & SPRING BOUNCE)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: isHovered ? 'rotate(0deg) translateY(-8px)' : `rotate(${rev.tilt})`,
                }}
                className="p-6 sm:p-7 rounded-2xl bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all duration-300 flex flex-col justify-between cursor-default"
              >
                <div>
                  {/* Top Rating Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg border-[2px] border-black shadow-[2px_2px_0px_#000]"
                      style={{ backgroundColor: rev.color }}
                    >
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 rounded font-black">
                      MAPS ↗
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-black/90 text-sm leading-relaxed mb-6 font-medium">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                {/* Customer Details & Stamp */}
                <div className="pt-4 border-t-[2px] border-black/10 flex items-center justify-between">
                  <div>
                    <div className="font-heading font-black text-base text-black flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle className="w-4 h-4 text-[#23E28B] fill-black stroke-white" />
                    </div>
                    <div className="font-mono text-xs text-black/70 font-bold">{rev.car}</div>
                  </div>
                  <span className="font-mono text-[10px] text-black/50 font-bold">{rev.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
