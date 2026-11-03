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
  Clock,
  Sparkles,
  Check,
  Info,
  AlertCircle,
  Droplet,
  Phone,
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
  const [selectedServiceId, setSelectedServiceId] = useState<string>(REDBOX_SERVICES[0].id);

  // Wheel size selector for tire section
  const [selectedWheelSize, setSelectedWheelSize] = useState<string>('16″');

  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.services.allCategories, color: '#FFE600' },
    { id: 'diagnostics', label: t.services.catDiagnostics, color: '#23E28B' },
    { id: 'chassis', label: t.services.catChassis, color: '#5CE1E6' },
    { id: 'maintenance', label: t.services.catMaintenance, color: '#B886FF' },
    { id: 'ac', label: t.services.catAc, color: '#FF5E5E' },
    { id: 'tires', label: t.services.catTowing, color: '#FFE600' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? REDBOX_SERVICES
      : REDBOX_SERVICES.filter((s) => s.category === activeCategory);

  const activeService =
    REDBOX_SERVICES.find((s) => s.id === selectedServiceId) || REDBOX_SERVICES[0];

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

  const tirePricingMap: { [key: string]: { steel: number; alu: number } } = {
    '12-15″': { steel: 150, alu: 170 },
    '16″': { steel: 160, alu: 190 },
    '17″': { steel: 170, alu: 210 },
    '18″': { steel: 180, alu: 210 },
    '19″': { steel: 200, alu: 250 },
    'BUS (15-17″)': { steel: 240, alu: 270 },
    '4X4 (15-18″)': { steel: 200, alu: 240 },
  };

  const currentTirePrice = tirePricingMap[selectedWheelSize] || { steel: 160, alu: 190 };

  return (
    <section id="services" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Unboxed, Massive Editorial) */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23E28B] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-1.5deg] font-mono font-bold text-xs text-black mb-3 spring-bounce">
            <Droplet className="w-3.5 h-3.5 fill-current" />
            <span>{t.services.pill}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-tight">
            {t.services.title}
          </h2>
          <p className="font-sans text-black/80 font-medium text-base sm:text-lg max-w-3xl mt-3">
            {t.services.subtitle}
          </p>
        </div>

        {/* Category Switcher with Bouncy Liquid Droplet Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? REDBOX_SERVICES.length
                : REDBOX_SERVICES.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  const firstOfCat =
                    cat.id === 'all'
                      ? REDBOX_SERVICES[0].id
                      : REDBOX_SERVICES.find((s) => s.category === cat.id)?.id;
                  if (firstOfCat) setSelectedServiceId(firstOfCat);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-heading font-black text-xs sm:text-sm border-[2.5px] border-black transition-all flex items-center gap-2 spring-bounce cursor-pointer ${
                  isSelected
                    ? 'shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-1'
                    : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#F7F4EB]'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.color : undefined,
                }}
              >
                <span>{cat.label}</span>
                <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.2 rounded font-bold">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RADICAL SPLIT STUDIO CANVAS (NOT 6 CLONED BOXES)
            Left: Interactive Service Stack | Right: Live Morphing Diagnostic Canvas
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left: Interactive Service List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredServices.map((service) => {
              const isSelected = service.id === selectedServiceId;
              const name = currentLang === 'uk' ? service.nameUk : service.namePl;

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-4 rounded-xl border-[2.5px] border-black cursor-pointer transition-all flex items-center justify-between select-none spring-bounce ${
                    isSelected
                      ? 'bg-[#FFE600] text-black shadow-[5px_5px_0px_#000] -translate-x-1 -translate-y-0.5'
                      : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#F7F4EB]'
                  }`}
                >
                  <div className="flex items-center gap-3 pr-2">
                    <div className="w-10 h-10 rounded-lg bg-white border-[2px] border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="font-heading font-black text-sm text-black leading-snug">
                        {name}
                      </div>
                      <div className="font-mono text-[11px] text-black/70 font-bold mt-0.5">
                        {service.durationApprox}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-heading font-black text-lg text-black">
                      {service.basePricePln}{' '}
                      <span className="font-mono text-xs">zł</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Morphing Diagnostic Canvas */}
          <div className="lg:col-span-7 rounded-2xl bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] overflow-hidden sticky top-24 spring-bounce">
            {/* Top Retro Header Bar */}
            <div className="bg-black text-white px-5 py-3 flex items-center justify-between border-b-[3px] border-black font-mono text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
                <span className="ml-2 uppercase tracking-wide">
                  SPECYFIKACJA_USŁUGI_{activeService.id.toUpperCase().replace('-', '_')}
                </span>
              </div>
              <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
                {activeService.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 bg-[#FFFDF8]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#23E28B] border-[2px] border-black font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000] mb-2 rotate-[-1deg]">
                    <Droplet className="w-3.5 h-3.5 fill-current" />
                    <span>CERTYFIKOWANY SERWIS</span>
                  </div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-black">
                    {currentLang === 'uk' ? activeService.nameUk : activeService.namePl}
                  </h3>
                </div>

                {/* Big Price Display */}
                <div className="bg-[#FFE600] border-[2.5px] border-black px-4 py-2.5 rounded-xl shadow-[4px_4px_0px_#000] shrink-0 text-left sm:text-right">
                  <span className="font-mono text-[10px] text-black/70 font-black uppercase block">
                    CENA OD
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-black">
                      {activeService.basePricePln}
                    </span>
                    <span className="font-mono font-black text-lg text-black">PLN</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-black/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                {currentLang === 'uk' ? activeService.descUk : activeService.descPl}
              </p>

              {/* Breakdown Checklist */}
              <div className="space-y-2.5 p-4 sm:p-5 rounded-xl bg-[#F7F4EB] border-[2.5px] border-black mb-8">
                <div className="font-mono text-xs font-black text-black uppercase tracking-wider mb-2">
                  CO WCHODZI W SKŁAD PROCEDURY:
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-black">
                  <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                  <span>Kompleksowa weryfikacja na podnośniku oraz diagnostyka komputerowa</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-black">
                  <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                  <span>Dobór części renomowanych marek (Brembo, Bosch, Lemförder, Motul)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-black">
                  <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                  <span>Pisemna gwarancja na wykonaną robociznę i zamontowane elementy</span>
                </div>
              </div>

              {/* Action Buttons with Spring Bounce */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onSelectServiceToQuote(activeService.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#FF5E5E] hover:bg-[#FFE600] text-black font-heading font-black text-sm uppercase tracking-wider border-[3px] border-black shadow-[5px_5px_0px_#000] spring-bounce cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>{t.services.bookThis}</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>

                <a
                  href="tel:+48512145314"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white hover:bg-[#5CE1E6] text-black font-mono font-bold text-xs sm:text-sm border-[2.5px] border-black shadow-[4px_4px_0px_#000] spring-bounce"
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  <span>Zapytaj majstra</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE TIRE MATRIX (WYMIANA OPON)
            Click any rim size -> see instant animated cost breakdown!
            ───────────────────────────────────────────────────────────── */}
        <div
          id="wymiana-opon"
          className="rounded-2xl bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="bg-black text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-black font-mono text-xs font-bold">
            <div className="flex items-center gap-2">
              <Disc className="w-4 h-4 text-[#FFE600]" />
              <span className="uppercase tracking-wide">
                WULKANIZACJA & PRZEZBROJENIE 4 KÓŁ • KALKULATOR ROZMIARU
              </span>
            </div>
            <span className="bg-[#23E28B] text-black px-2 py-0.5 rounded text-[10px] font-black">
              SEZON 2026
            </span>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 bg-[#FFFDF8]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="font-heading font-black text-2xl sm:text-4xl text-black">
                  {t.services.tiresSection.title}
                </h3>
                <p className="font-sans text-black/80 font-medium text-sm sm:text-base mt-2 max-w-2xl">
                  {t.services.tiresSection.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectServiceToQuote('tires-service')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFE600] hover:bg-[#23E28B] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-[2.5px] border-black shadow-[4px_4px_0px_#000] spring-bounce shrink-0"
              >
                <Disc className="w-4 h-4" />
                <span>{t.services.tiresSection.bookBtn}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Interactive Wheel Diameter Switcher */}
            <div className="mb-8">
              <div className="font-mono text-xs font-black uppercase text-black mb-3">
                WYBIERZ ROZMIAR FELGI:
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {Object.keys(tirePricingMap).map((size) => {
                  const isSelected = selectedWheelSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedWheelSize(size)}
                      className={`px-4 sm:px-5 py-3 rounded-xl font-heading font-black text-sm border-[2.5px] border-black transition-all spring-bounce ${
                        isSelected
                          ? 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-1 scale-105'
                          : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#F7F4EB]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Cards for Selected Rim Size */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Steel Rim */}
              <div className="p-6 rounded-xl bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col justify-between spring-bounce">
                <div>
                  <span className="font-mono text-xs font-bold text-black/60 uppercase block">
                    KOMPLET 4 KOŁA
                  </span>
                  <div className="font-heading font-black text-xl text-black mt-1">
                    Felgi Stalowe ({selectedWheelSize})
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t-[2px] border-black/10 flex items-baseline gap-1.5">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-black">
                    {currentTirePrice.steel}
                  </span>
                  <span className="font-mono font-bold text-base text-black">zł brutto</span>
                </div>
              </div>

              {/* Alloy Rim (Highlighted) */}
              <div className="p-6 rounded-xl bg-[#23E28B] border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between spring-bounce">
                <div>
                  <span className="font-mono text-xs font-black text-black/80 uppercase block">
                    NAJCZĘŚCIEJ WYBIERANE
                  </span>
                  <div className="font-heading font-black text-xl text-black mt-1">
                    Felgi Aluminiowe Alu ({selectedWheelSize})
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t-[2px] border-black flex items-baseline gap-1.5">
                  <span className="font-heading font-black text-4xl sm:text-5xl text-black">
                    {currentTirePrice.alu}
                  </span>
                  <span className="font-mono font-black text-lg text-black">zł brutto</span>
                </div>
              </div>

              {/* Package Inclusions */}
              <div className="p-6 rounded-xl bg-[#5CE1E6] border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col justify-between font-mono text-xs font-bold">
                <div>
                  <div className="font-heading font-black text-base text-black mb-3 uppercase">
                    W CENIE ZAWSZE:
                  </div>
                  <ul className="space-y-1.5 text-black">
                    <li>✓ Przekładka 4 kół z wyważeniem</li>
                    <li>✓ Nowe zawory gumowe</li>
                    <li>✓ Dokręcenie kluczem dynamometrycznym</li>
                    <li>✓ Pomiar i kalibracja ciśnienia</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t-[2px] border-black text-[11px] text-black/80">
                  {t.services.tiresSection.runFlatNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
