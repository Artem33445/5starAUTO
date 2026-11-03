'use client';

import React from 'react';
import { Star, CheckCircle, ExternalLink, Quote } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface ReviewsShowcaseProps {
  currentLang: Language;
}

export const ReviewsShowcase: React.FC<ReviewsShowcaseProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const reviews = [
    {
      name: t.reviews.rev1Name,
      car: t.reviews.rev1Car,
      text: t.reviews.rev1Text,
      rating: 5,
      date: '2 tyg. temu',
      accent: '#FFE600',
    },
    {
      name: t.reviews.rev2Name,
      car: t.reviews.rev2Car,
      text: t.reviews.rev2Text,
      rating: 5,
      date: '1 mies. temu',
      accent: '#23E28B',
    },
    {
      name: t.reviews.rev3Name,
      car: t.reviews.rev3Car,
      text: t.reviews.rev3Text,
      rating: 5,
      date: '3 tyg. temu',
      accent: '#5CE1E6',
    },
    {
      name: t.reviews.rev4Name,
      car: t.reviews.rev4Car,
      text: t.reviews.rev4Text,
      rating: 5,
      date: '2 mies. temu',
      accent: '#B886FF',
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] font-mono font-bold text-xs text-black mb-3">
              <span>✦ {t.reviews.pill}</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-black tracking-tight mb-2">
              {t.reviews.title}
            </h2>
            <p className="font-sans text-black/80 font-medium text-sm sm:text-base">
              {t.reviews.ratingNote}
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=5STARAUTO+ul.+Kazimierza+Jarochowskiego+105+60-129+Poznan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#FFE600] border-[2.5px] border-black font-mono text-xs font-bold text-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all self-start md:self-auto shrink-0"
          >
            <span>{t.reviews.readAllGoogle}</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Reviews Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating Badge */}
                  <div className="flex items-center gap-1 bg-[#FFE600] px-2 py-1 rounded border-[1.5px] border-black shadow-[2px_2px_0px_#000]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold">
                    GOOGLE MAPS
                  </span>
                </div>

                <p className="font-sans text-black/90 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t-[2px] border-black/10 flex items-center justify-between">
                <div>
                  <div className="font-heading font-black text-sm text-black flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-4 h-4 text-[#23E28B] fill-black stroke-white" />
                  </div>
                  <div className="font-mono text-[11px] text-black/70 font-bold">{rev.car}</div>
                </div>
                <span className="font-mono text-[10px] text-black/60 font-bold">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
