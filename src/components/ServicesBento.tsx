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
  Check,
  Info,
  AlertCircle,
  ChevronDown,
  ChevronUp,
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
  const [selectedWheelSize, setSelectedWheelSize] = useState<string>('16″');

  const t = translations[currentLang];

  // 6 Technical Architecture Pillars (Exact Hermes #1-#6 Structure)
  const technicalPillars = [
    {
      number: '#1 Diagnostic',
      titlePl: 'Live-Data & Parametry Silnika',
      titleUk: "Live-Data та комп'ютерний аналіз",
      descPl: 'Odczyt i kasowanie kodów błędów, analiza parametrów pracy silnika, wtrysków i turbodoładowania w czasie rzeczywistym.',
      descUk: "Зчитування кодів помилок, діагностика датчиків, аналіз паливної системи та тиску турбіни в реальному часі.",
      tag: 'OBD-II / CAN',
    },
    {
      number: '#2 Maintenance',
      titlePl: 'Precyzyjne ТО i Płyny',
      titleUk: 'Регламентне ТО та мастила',
      descPl: 'Wymiana oleju silnikowego, filtrów paliwa/powietrza/kabiny oraz kontrola wycieków z kasowaniem inspekcji serwisowej.',
      descUk: 'Заміна моторного масла, фільтрів, свічок запалювання та технічних рідин згідно регламенту виробника.',
      tag: 'OEM SPEC',
    },
    {
      number: '#3 Mechanics',
      titlePl: 'Rozrządy, Sprzęgła i Skrzynie',
      titleUk: 'ГРМ, Зчеплення та КПП',
      descPl: 'Wymiana kompletnych zestawów rozrządu z pompą wody, kół dwumasowych, sprzęgieł oraz uszczelnianie silnika.',
      descUk: 'Заміна комплектів ременя/ланцюга ГРМ, помпи, зчеплення та діагностика двомасового маховика.',
      tag: '100% GWARANCJI',
    },
    {
      number: '#4 Chassis',
      titlePl: 'Zawieszenie & Układ Hamulcowy',
      titleUk: 'Ходова частина та гальма',
      descPl: 'Wymiana wahaczy, amortyzatorów, sprężyn, klocków i tarcz. Dokręcanie kół kluczem dynamometrycznym.',
      descUk: 'Ремонт підвіски, заміна важелів, амортизаторів, сайлентблоків, гальмівних дисків та колодок.',
      tag: 'BEZPIECZEŃSTWO',
    },
    {
      number: '#5 Climate',
      titlePl: 'Klimatyzacja & Ozonowanie',
      titleUk: 'Кліматизація та дезінфекція',
      descPl: 'Szczelność próżniowa, uzupełnienie czynnika R134A, dodanie oleju PAG i barwnika UV oraz sterylizacja ozonem.',
      descUk: 'Вакуумування системи, заправка холодоагентом R134A, масло PAG, УФ-барвник та озонування салону.',
      tag: 'R134A / OZON',
    },
    {
      number: '#6 Tires',
      titlePl: 'Wulkanizacja & Wyważanie',
      titleUk: 'Шиномонтаж та балансування',
      descPl: 'Sezonowa wymiana opon dla aut osobowych, SUV oraz BUS (12-19″) z dynamicznym wyważeniem i wymianą zaworów.',
      descUk: 'Комплексне перевзування 4 коліс, комп’ютерне балансування, герметизація бортів та новий вентиль.',
      tag: '12-19″ / BUS',
    },
  ];

  const categories = [
    { id: 'all', label: t.services.allCategories },
    { id: 'diagnostics', label: t.services.catDiagnostics },
    { id: 'chassis', label: t.services.catChassis },
    { id: 'maintenance', label: t.services.catMaintenance },
    { id: 'ac', label: t.services.catAc },
    { id: 'tires', label: t.services.catTowing },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? REDBOX_SERVICES
      : REDBOX_SERVICES.filter((s) => s.category === activeCategory);

  const visibleServices = isExpanded ? filteredServices : filteredServices.slice(0, 8);

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
    <section id="services" className="py-20 lg:py-32 bg-[#090915] border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Hermes Agent Style) */}
        <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00F0FF] mb-4">
            <span># ARCHITEKTURA USŁUG</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Kompletny Serwis.
            <br />
            <span className="text-white/60">Od diagnostyki po remont.</span>
          </h2>
          <p className="font-sans text-white/70 text-base sm:text-lg mt-4">
            {t.services.subtitle}
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERMES #1 to #6 NUMBERED FEATURE GRID (Exact Replica Pattern)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {technicalPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl hermes-glass hermes-glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#00F0FF] tracking-wider uppercase">
                    {pillar.number}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-2.5">
                  {currentLang === 'uk' ? pillar.titleUk : pillar.titlePl}
                </h3>

                <p className="font-sans text-sm text-white/70 leading-relaxed font-normal">
                  {currentLang === 'uk' ? pillar.descUk : pillar.descPl}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/50">
                <span>Warsztat Poznań</span>
                <span className="text-[#00FF85]">● Gotowe do realizacji</span>
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE CATALOG & PRICING TABLE (Hermes Table Style)
            ───────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl hermes-glass p-6 sm:p-8 lg:p-10 mb-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <div className="font-mono text-xs text-[#00F0FF] uppercase mb-1">
                SZCZEGÓŁOWY PRZELICZNIK
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                Katalog Robocizny 5STARAUTO
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#0000F2] text-white font-bold shadow-[0_0_12px_rgba(0,0,242,0.6)]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Items Table */}
          <div className="divide-y divide-white/10">
            {visibleServices.map((service) => {
              const name = currentLang === 'uk' ? service.nameUk : service.namePl;
              const desc = currentLang === 'uk' ? service.descUk : service.descPl;

              return (
                <div
                  key={service.id}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors rounded-xl px-2"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-base sm:text-lg text-white">
                        {name}
                      </span>
                      {service.durationApprox && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                          {service.durationApprox}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-white/60 max-w-2xl">
                      {desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right font-mono">
                      <span className="text-[10px] text-white/40 block">CENA OD</span>
                      <span className="font-heading font-black text-xl text-white">
                        {service.basePricePln}{' '}
                        <span className="text-xs text-[#00F0FF] font-bold">PLN</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectServiceToQuote(service.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full hermes-btn-blue text-xs uppercase font-bold shrink-0"
                    >
                      <span>{t.services.bookThis}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expand Toggle */}
          {filteredServices.length > 8 && (
            <div className="pt-6 mt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs transition-all"
              >
                <span>{isExpanded ? 'Zwiń listę' : `Pokaż wszystkie (${filteredServices.length})`}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERMES TIRE SPECIFICATION MODULE (WYMIANA OPON)
            ───────────────────────────────────────────────────────────── */}
        <div
          id="wymiana-opon"
          className="rounded-2xl hermes-glass p-6 sm:p-8 lg:p-10 border border-white/15 shadow-[0_20px_50px_rgba(0,0,242,0.15)]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00FF85] mb-2">
                <Disc className="w-3.5 h-3.5" />
                <span>SEZONOWA WYMIANA OPON POZNAŃ</span>
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                {t.services.tiresSection.title}
              </h3>
              <p className="font-sans text-white/70 text-sm mt-1 max-w-xl">
                {t.services.tiresSection.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectServiceToQuote('tires-service')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full hermes-btn-primary text-xs uppercase font-bold shrink-0"
            >
              <Disc className="w-4 h-4" />
              <span>{t.services.tiresSection.bookBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Wheel Diameter Selector */}
          <div className="mb-8">
            <span className="font-mono text-xs text-white/50 block mb-3 uppercase tracking-wider">
              ŚREDNICA FELGI:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(tirePricingMap).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedWheelSize(size)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs transition-all border ${
                    selectedWheelSize === size
                      ? 'bg-[#0000F2] text-white font-bold border-white/40 shadow-[0_0_15px_rgba(0,0,242,0.6)]'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-white/50 uppercase block">KOMPLET 4 KOŁA</span>
                <div className="font-heading font-bold text-lg text-white mt-1">
                  Felgi Stalowe ({selectedWheelSize})
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 font-mono">
                <span className="font-heading font-black text-3xl text-white">
                  {currentTirePrice.steel}
                </span>
                <span className="text-white/60 text-xs ml-1">PLN brutto</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0000F2]/30 border border-[#0000F2] shadow-[0_0_25px_rgba(0,0,242,0.3)] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#00F0FF] uppercase font-bold block">
                  ALU • NAJPOPULARNIEJSZE
                </span>
                <div className="font-heading font-bold text-lg text-white mt-1">
                  Felgi Aluminiowe ({selectedWheelSize})
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 font-mono">
                <span className="font-heading font-black text-3xl text-white">
                  {currentTirePrice.alu}
                </span>
                <span className="text-[#00F0FF] text-xs ml-1 font-bold">PLN brutto</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="text-white font-bold mb-2 uppercase tracking-wider text-[11px]">
                  PAKIET ZAWIERA:
                </div>
                <ul className="space-y-1.5 text-white/70">
                  <li>✓ Przekładka 4 kół z wyważeniem</li>
                  <li>✓ Nowe zawory gumowe</li>
                  <li>✓ Klucz dynamometryczny</li>
                  <li>✓ Kontrola ciśnienia w kołach</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 text-[10px] text-white/40">
                {t.services.tiresSection.runFlatNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
