'use client';

import React from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
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
    },
    {
      name: t.reviews.rev2Name,
      car: t.reviews.rev2Car,
      text: t.reviews.rev2Text,
      rating: 5,
      date: '1 mies. temu',
    },
    {
      name: t.reviews.rev3Name,
      car: t.reviews.rev3Car,
      text: t.reviews.rev3Text,
      rating: 5,
      date: '3 tyg. temu',
    },
    {
      name: t.reviews.rev4Name,
      car: t.reviews.rev4Car,
      text: t.reviews.rev4Text,
      rating: 5,
      date: '2 mies. temu',
    },
  ];

  return (
    <section id="reviews" className="py-20 lg:py-32 bg-[#06060E] border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#FFB800] mb-3">
              <Star className="w-3.5 h-3.5 fill-[#FFB800] stroke-[#FFB800]" />
              <span>4.9 ★ GOOGLE MAPS (250+ OPINII)</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {t.reviews.title}
            </h2>
            <p className="font-sans text-white/70 text-base mt-2 max-w-xl">
              {t.reviews.ratingNote}
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=5STARAUTO+ul.+Kazimierza+Jarochowskiego+105+60-129+Poznan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs transition-all shrink-0"
          >
            <span>{t.reviews.readAllGoogle}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
          </a>
        </div>

        {/* 4 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl hermes-glass hermes-glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#FFB800]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-white/50">Google Maps</span>
                </div>

                <p className="font-sans text-white/80 text-sm leading-relaxed mb-6 font-normal italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#00FF85]" />
                  </div>
                  <div className="text-[11px] text-white/50">{rev.car}</div>
                </div>
                <span className="text-[10px] text-white/40">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
