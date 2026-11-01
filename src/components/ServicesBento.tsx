'use client';

import React, { useState } from 'react';
import {
  Cpu,
  SearchCheck,
  Compass,
  Droplets,
  ShieldAlert,
  Cog,
  Wrench,
  Wind,
  Flame,
  Sliders,
  Disc,
  Zap,
  Truck,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Info,
  AlertCircle,
} from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { REDBOX_SERVICES } from '@/data/services';

interface ServicesBentoProps {
  currentLang: Language;
  onSelectServiceToQuote: (serviceId: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  currentLang,
  onSelectServiceToQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const t = translations[currentLang];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-brand-red" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-brand-red" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-brand-red" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-brand-red" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-brand-red" />;
      case 'Cog':
        return <Cog className="w-5 h-5 text-brand-red" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-brand-red" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-brand-red" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-brand-red" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-brand-red" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-brand-red" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-brand-red" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-brand-red" />;
      default:
        return <CheckCircle className="w-5 h-5 text-brand-red" />;
    }
  };

  const categories = [
    { id: 'all', label: t.services.allCategories },
    { id: 'diagnostics', label: t.services.catDiagnostics },
    { id: 'chassis', label: t.services.catChassis },
    { id: 'maintenance', label: t.services.catMaintenance },
    { id: 'ac', label: t.services.catAc },
    { id: 'tires', label: t.services.catTowing },
  ];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setIsExpanded(false);
  };

  const filteredServices =
    activeCategory === 'all'
      ? REDBOX_SERVICES
      : REDBOX_SERVICES.filter((s) => s.category === activeCategory);

  const visibleServices = isExpanded
    ? filteredServices
    : filteredServices.slice(0, 6);

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm mb-3">
            <span>{t.services.pill}</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.services.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? REDBOX_SERVICES.length
                : REDBOX_SERVICES.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-red-subtle'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === cat.id
                      ? 'bg-black/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid (Shows first 6, expands on click) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleServices.map((service) => {
            const name = currentLang === 'uk' ? service.nameUk : service.namePl;
            const desc = currentLang === 'uk' ? service.descUk : service.descPl;

            return (
              <div
                key={service.id}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-brand-red/50 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between shadow-card"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50/80 border border-red-100 flex items-center justify-center shrink-0 transition-colors group-hover:bg-red-100">
                      {getServiceIcon(service.iconName)}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-brand-red transition-colors">
                    {name}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* Quick link for tire service card */}
                  {service.id === 'tires-service' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('wymiana-opon')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-red hover:underline mb-3"
                    >
                      <Disc className="w-3.5 h-3.5" />
                      <span>
                        {currentLang === 'uk'
                          ? 'Детальний прайс коліс (12-19″, BUS, 4x4) ↓'
                          : 'Szczegółowy cennik opon (12-19″, BUS, 4x4) ↓'}
                      </span>
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                      {t.services.from}
                    </span>
                    <span className="font-heading font-black text-xl text-slate-900">
                      {service.basePricePln}{' '}
                      <span className="text-xs text-brand-red font-bold">PLN</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServiceToQuote(service.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-brand-red text-xs font-bold text-slate-800 hover:text-white transition-all border border-slate-200 hover:border-transparent active:scale-95 shadow-sm"
                  >
                    <span>{t.services.bookThis}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand / Collapse Button (Shown if filteredServices.length > 6) */}
        {filteredServices.length > 6 && (
          <div className="mt-8 sm:mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false);
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setIsExpanded(true);
                }
              }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-brand-red text-slate-800 hover:text-brand-red font-bold text-sm shadow-sm hover:shadow transition-all group active:scale-95 cursor-pointer"
            >
              <span>
                {isExpanded
                  ? t.services.showLess
                  : `${t.services.showMore} (+${filteredServices.length - 6})`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-brand-red transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Dedicated Tire Services & Pricing Showcase (5STARAUTO Official Wymiana Opon) */}
        <div
          id="wymiana-opon"
          className="mt-16 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Subtle decorative background accent */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-bold text-brand-red mb-2.5">
                <Disc className="w-3.5 h-3.5" />
                <span>{t.services.tiresSection.pill}</span>
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight">
                {t.services.tiresSection.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                {t.services.tiresSection.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectServiceToQuote('tires-service')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-red/20 transition-all active:scale-95 shrink-0"
            >
              <Disc className="w-4 h-4" />
              <span>{t.services.tiresSection.bookBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Column 1: Passenger Cars Table */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    {t.services.tiresSection.passengerTitle}
                  </h4>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-200/80 mb-2">
                  <span>{t.services.tiresSection.diameterCol}</span>
                  <span className="text-center">{t.services.tiresSection.steelCol}</span>
                  <span className="text-right">{t.services.tiresSection.alloyCol}</span>
                </div>

                {/* Rows */}
                <div className="space-y-1.5 text-xs sm:text-sm">
                  {[
                    { size: '12-15″', steel: 150, alu: 170 },
                    { size: '16″', steel: 160, alu: 190 },
                    { size: '17″', steel: 170, alu: 210 },
                    { size: '18″', steel: 180, alu: 210 },
                    { size: '19″', steel: 200, alu: 250 },
                  ].map((row) => (
                    <div
                      key={row.size}
                      className="grid grid-cols-3 items-center py-2 px-2.5 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <span className="font-bold text-slate-900">{row.size}</span>
                      <span className="text-center font-bold text-slate-700">
                        {row.steel} <span className="text-[10px] text-slate-400 font-normal">zł</span>
                      </span>
                      <span className="text-right font-black text-brand-red">
                        {row.alu} <span className="text-[10px] text-slate-400 font-normal">zł</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] text-slate-500">
                {currentLang === 'uk'
                  ? 'Ціни вказані за повний комплекс (4 колеса).'
                  : 'Ceny podane za kompleks (4 koła).'}
              </div>
            </div>

            {/* Column 2: BUS & 4X4 + Repair */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-brand-red" />
                  {t.services.tiresSection.busTitle}
                </h4>

                <div className="space-y-3 text-xs sm:text-sm">
                  {/* BUS */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center justify-between">
                      <span>{t.services.tiresSection.busService}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                      <span className="text-slate-600 font-medium">
                        {t.services.tiresSection.steelCol}: <strong className="text-slate-900">240 zł</strong>
                      </span>
                      <span className="text-slate-600 font-medium">
                        {t.services.tiresSection.alloyCol}: <strong className="text-brand-red font-black">270 zł</strong>
                      </span>
                    </div>
                  </div>

                  {/* 4X4 */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center justify-between">
                      <span>{t.services.tiresSection.suvService}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                      <span className="text-slate-600 font-medium">
                        {t.services.tiresSection.steelCol}: <strong className="text-slate-900">200 zł</strong>
                      </span>
                      <span className="text-slate-600 font-medium">
                        {t.services.tiresSection.alloyCol}: <strong className="text-brand-red font-black">240 zł</strong>
                      </span>
                    </div>
                  </div>

                  {/* Naprawa opony */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900">{t.services.tiresSection.repairService}</span>
                    <span className="font-black text-slate-900 text-sm">
                      {t.services.tiresSection.repairFrom}
                    </span>
                  </div>
                </div>
              </div>

              {/* RUN ON FLAT Warning Badge */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold tracking-tight">
                  {t.services.tiresSection.runFlatNote}
                </span>
              </div>
            </div>

            {/* Column 3: Package Inclusions & Important Disclaimers */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t.services.tiresSection.includedTitle}
                </h4>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {t.services.tiresSection.includedItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimers */}
              <div className="mt-5 space-y-2 pt-3 border-t border-slate-200/80">
                <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{t.services.tiresSection.weightsNote}</span>
                </div>
                <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{t.services.tiresSection.tpmsNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
