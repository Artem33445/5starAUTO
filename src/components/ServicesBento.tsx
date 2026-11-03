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
  Clock,
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
        return <Cpu className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Cog':
        return <Cog className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-black stroke-[2.5]" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-black stroke-[2.5]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-black stroke-[2.5]" />;
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
    : filteredServices.slice(0, 7);

  // Background accent map for asymmetric bento cards
  const cardAccents = ['#FFE600', '#23E28B', '#5CE1E6', '#B886FF', '#FF5E5E'];

  return (
    <section id="services" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Neo-Brutalist Sticker Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2.5px] border-black shadow-[3px_3px_0px_#000] rotate-[-1.5deg] hover:rotate-0 transition-transform font-mono font-bold text-xs text-black mb-4">
            <span>✱ {t.services.pill}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-tight mb-4">
            {t.services.title}
          </h2>
          <p className="font-sans text-black/80 font-medium text-sm sm:text-base max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Category Filters: Chunky Retro Switch Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? REDBOX_SERVICES.length
                : REDBOX_SERVICES.filter((s) => s.category === cat.id).length;

            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-lg font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border-[2.5px] border-black ${
                  isSelected
                    ? 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                    : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#F7F4EB] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border border-black font-extrabold ${
                    isSelected ? 'bg-black text-[#FFE600]' : 'bg-[#F7F4EB] text-black'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleServices.map((service, index) => {
            const name = currentLang === 'uk' ? service.nameUk : service.namePl;
            const desc = currentLang === 'uk' ? service.descUk : service.descPl;
            const isFeatured = index === 0;
            const accentColor = cardAccents[index % cardAccents.length];

            return (
              <div
                key={service.id}
                className={`group rounded-lg bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all flex flex-col justify-between overflow-hidden ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-[#FFFDF8]' : ''
                }`}
              >
                {/* Vintage OS Dialog Header Bar */}
                <div className="bg-black text-white px-3.5 py-2 border-b-[3px] border-black font-mono text-[11px] font-bold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E5E] inline-block border border-black" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] inline-block border border-black" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#23E28B] inline-block border border-black" />
                    <span className="ml-2 text-white/90 uppercase">
                      ID_{service.id.toUpperCase().replace('-', '_')}
                    </span>
                  </div>
                  <span
                    className="px-1.5 py-0.2 rounded font-mono font-black text-[10px] text-black"
                    style={{ backgroundColor: accentColor }}
                  >
                    ★ {service.category.toUpperCase()}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      {/* Icon Box with Solid Hard Border */}
                      <div
                        className="w-12 h-12 rounded-lg border-[2.5px] border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#000] group-hover:rotate-[-4deg] transition-transform"
                        style={{ backgroundColor: accentColor }}
                      >
                        {getServiceIcon(service.iconName)}
                      </div>

                      {/* Approximate Time Pill */}
                      {service.durationApprox && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F7F4EB] border-[2px] border-black font-mono text-[11px] font-bold text-black shadow-[2px_2px_0px_#000]">
                          <Clock className="w-3 h-3 text-black stroke-[2.5]" />
                          <span>{service.durationApprox}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-heading font-black text-lg sm:text-xl text-black mb-2.5 leading-snug">
                      {name}
                    </h3>

                    <p className="font-sans text-black/80 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-[#FFE600] px-2.5 py-1 rounded border-[2px] border-black shadow-[2px_2px_0px_#000] hover:bg-[#5CE1E6] mb-4 transition-colors"
                      >
                        <Disc className="w-3.5 h-3.5" />
                        <span>
                          {currentLang === 'uk'
                            ? 'Прайс коліс (12-19″, BUS, 4x4) ↓'
                            : 'Cennik opon (12-19″, BUS, 4x4) ↓'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Bottom Price & Booking Controls */}
                  <div className="pt-4 border-t-[2.5px] border-black/10 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-black/60 font-bold block">
                        {t.services.from}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading font-black text-2xl text-black">
                          {service.basePricePln}
                        </span>
                        <span className="font-mono text-xs font-black text-black">PLN</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectServiceToQuote(service.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFE600] hover:bg-[#FF5E5E] text-black font-heading font-extrabold text-xs uppercase tracking-wider border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
                    >
                      <span>{t.services.bookThis}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand / Collapse Button */}
        {filteredServices.length > 7 && (
          <div className="mt-10 sm:mt-12 text-center">
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
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-white hover:bg-[#5CE1E6] text-black border-[3px] border-black font-heading font-black text-sm uppercase tracking-wider shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all"
            >
              <span>
                {isExpanded
                  ? t.services.showLess
                  : `${t.services.showMore} (+${filteredServices.length - 7})`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 stroke-[3]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              )}
            </button>
          </div>
        )}

        {/* Dedicated Tire Services & Pricing Showcase (Neo-Brutalist Spec Sheet) */}
        <div
          id="wymiana-opon"
          className="mt-16 sm:mt-20 bg-white border-[3px] border-black rounded-lg shadow-[8px_8px_0px_#000] overflow-hidden"
        >
          {/* Retro Window Dialog Header Bar */}
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b-[3px] border-black font-mono text-xs font-bold tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
              <span className="ml-2 uppercase">WYMIANA_OPON_SPECYFIKACJA_2026.SYS</span>
            </div>
            <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black">
              CENNIK BRUTTO
            </span>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 bg-[#FFFDF8]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b-[3px] border-black mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFE600] border-[2px] border-black text-xs font-mono font-bold text-black shadow-[2px_2px_0px_#000] mb-3 rotate-[-1deg]">
                  <Disc className="w-3.5 h-3.5" />
                  <span>{t.services.tiresSection.pill}</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight">
                  {t.services.tiresSection.title}
                </h3>
                <p className="font-sans text-black/80 font-medium text-xs sm:text-sm mt-2 max-w-2xl">
                  {t.services.tiresSection.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectServiceToQuote('tires-service')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#23E28B] hover:bg-[#FFE600] text-black text-xs sm:text-sm font-heading font-black uppercase tracking-wider border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all shrink-0"
              >
                <Disc className="w-4 h-4" />
                <span>{t.services.tiresSection.bookBtn}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* 3 Asymmetric Column Spec Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1: Passenger Cars Table */}
              <div className="bg-white border-[3px] border-black rounded-lg p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b-[2px] border-black">
                    <h4 className="font-heading font-black text-sm sm:text-base text-black flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black" />
                      {t.services.tiresSection.passengerTitle}
                    </h4>
                  </div>

                  {/* Table Header */}
                  <div className="grid grid-cols-3 text-[11px] font-mono font-bold text-black uppercase tracking-wider pb-2 border-b-[2px] border-black/20 mb-2">
                    <span>{t.services.tiresSection.diameterCol}</span>
                    <span className="text-center">{t.services.tiresSection.steelCol}</span>
                    <span className="text-right">{t.services.tiresSection.alloyCol}</span>
                  </div>

                  {/* Rows */}
                  <div className="space-y-2 text-xs sm:text-sm">
                    {[
                      { size: '12-15″', steel: 150, alu: 170 },
                      { size: '16″', steel: 160, alu: 190 },
                      { size: '17″', steel: 170, alu: 210 },
                      { size: '18″', steel: 180, alu: 210 },
                      { size: '19″', steel: 200, alu: 250 },
                    ].map((row) => (
                      <div
                        key={row.size}
                        className="grid grid-cols-3 items-center py-2 px-2.5 rounded bg-[#F7F4EB] border-[2px] border-black font-mono font-bold"
                      >
                        <span className="text-black">{row.size}</span>
                        <span className="text-center text-black">
                          {row.steel} zł
                        </span>
                        <span className="text-right text-black bg-[#FFE600] px-1.5 py-0.5 rounded border border-black">
                          {row.alu} zł
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-[2px] border-black/10 font-mono text-[11px] font-bold text-black/70">
                  {currentLang === 'uk'
                    ? 'Ціни вказані за повний комплекс (4 колеса).'
                    : 'Ceny podane za kompleks (4 koła).'}
                </div>
              </div>

              {/* Column 2: BUS & 4X4 + Repair */}
              <div className="bg-white border-[3px] border-black rounded-lg p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-black text-sm sm:text-base text-black flex items-center gap-2 mb-4 pb-2 border-b-[2px] border-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5CE1E6] border border-black" />
                    {t.services.tiresSection.busTitle}
                  </h4>

                  <div className="space-y-3 font-mono text-xs sm:text-sm">
                    {/* BUS */}
                    <div className="p-3.5 rounded bg-[#F7F4EB] border-[2px] border-black">
                      <div className="font-bold text-black text-xs sm:text-sm mb-1.5">
                        {t.services.tiresSection.busService}
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t-[1.5px] border-black/10">
                        <span>{t.services.tiresSection.steelCol}: <strong>240 zł</strong></span>
                        <span className="bg-[#5CE1E6] px-1.5 py-0.5 rounded border border-black font-bold">
                          {t.services.tiresSection.alloyCol}: 270 zł
                        </span>
                      </div>
                    </div>

                    {/* 4X4 */}
                    <div className="p-3.5 rounded bg-[#F7F4EB] border-[2px] border-black">
                      <div className="font-bold text-black text-xs sm:text-sm mb-1.5">
                        {t.services.tiresSection.suvService}
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t-[1.5px] border-black/10">
                        <span>{t.services.tiresSection.steelCol}: <strong>200 zł</strong></span>
                        <span className="bg-[#5CE1E6] px-1.5 py-0.5 rounded border border-black font-bold">
                          {t.services.tiresSection.alloyCol}: 240 zł
                        </span>
                      </div>
                    </div>

                    {/* Naprawa opony */}
                    <div className="p-3 rounded bg-[#FFE600] border-[2px] border-black flex items-center justify-between font-bold">
                      <span>{t.services.tiresSection.repairService}</span>
                      <span className="bg-black text-white px-2 py-0.5 rounded">
                        {t.services.tiresSection.repairFrom}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RUN ON FLAT Warning Badge */}
                <div className="mt-4 p-3 rounded bg-[#FF5E5E] border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-black flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-black stroke-[2.5] shrink-0" />
                  <span className="font-mono text-xs font-black uppercase tracking-tight">
                    {t.services.tiresSection.runFlatNote}
                  </span>
                </div>
              </div>

              {/* Column 3: Package Inclusions & Important Disclaimers */}
              <div className="bg-[#23E28B] border-[3px] border-black rounded-lg p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between text-black">
                <div>
                  <h4 className="font-heading font-black text-sm sm:text-base text-black flex items-center gap-2 mb-4 pb-2 border-b-[2px] border-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-black" />
                    {t.services.tiresSection.includedTitle}
                  </h4>

                  <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
                    {t.services.tiresSection.includedItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/70 p-2 rounded border-[1.5px] border-black">
                        <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                        <span className="leading-snug font-bold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimers */}
                <div className="mt-5 space-y-2 pt-3 border-t-[2px] border-black font-mono text-[11px] font-bold">
                  <div className="flex items-start gap-2 leading-tight">
                    <Info className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span>{t.services.tiresSection.weightsNote}</span>
                  </div>
                  <div className="flex items-start gap-2 leading-tight">
                    <Info className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span>{t.services.tiresSection.tpmsNote}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
