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
    <section id="reviews" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-3 shadow-sm">
              <span>{t.reviews.pill}</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-2">
              {t.reviews.title}
            </h2>
            <p className="text-slate-600 text-sm">
              {t.reviews.ratingNote}
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=5STARAUTO+ul.+Kazimierza+Jarochowskiego+105+60-129+Poznan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-brand-red text-xs font-bold text-slate-800 transition-all self-start md:self-auto shadow-sm"
          >
            <span>{t.reviews.readAllGoogle}</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-red" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-card transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Google Maps
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-500">{rev.car}</div>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
