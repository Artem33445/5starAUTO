'use client';

import React from 'react';
import { Car, Truck, Shield, ArrowRight, CheckCircle2, ChevronRight, Laptop } from 'lucide-react';
import { Language } from '@/types';

interface DownloadsSectionProps {
  currentLang: Language;
  onSelectCategory?: (category: string) => void;
}

export const DownloadsSection: React.FC<DownloadsSectionProps> = ({
  currentLang,
  onSelectCategory,
}) => {
  const handleSelect = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const calc = document.getElementById('calculator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Stanowiska i Kategorie Pojazdów"
      className="bg-[#0000F2] text-white py-14 lg:py-20 border-t border-white/10"
      id="downloads"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16">
        {/* Desktop Preview Card (landing-desktop-preview parallel) */}
        <div className="w-full mb-12 bg-[#000030] p-6 sm:p-8 border border-white/15 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00FF85] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                5STAR Workshop Operating System // Terminal v2.6
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-white/60">
              <span>STANOWISKA: 6/6 AKTYWNE</span>
              <span className="hidden sm:inline">POZNAŃ, UL. PRZYKŁADOWA 12</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-4 bg-white/5 border border-white/10">
              <span className="font-mono text-[10px] text-[#00F0FF] uppercase block mb-1">
                KONTROLA JAKOŚCI OEM
              </span>
              <h4 className="font-heading text-sm font-semibold text-white mb-2">
                Precyzyjna ścieżka diagnostyczna
              </h4>
              <p className="font-sans text-xs text-white/70">
                Każde auto przed wyjazdem przechodzi kontrolę zawieszenia, oświetlenia i układu hamulcowego.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <span className="font-mono text-[10px] text-[#00F0FF] uppercase block mb-1">
                CYFROWY RAPORT
              </span>
              <h4 className="font-heading text-sm font-semibold text-white mb-2">
                Zdjęcia & protokół w PDF
              </h4>
              <p className="font-sans text-xs text-white/70">
                Klient otrzymuje na telefon pełny raport z inspekcji wraz z wyceną przed wykonaniem jakichkolwiek prac.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <span className="font-mono text-[10px] text-[#00F0FF] uppercase block mb-1">
                GWARANCJA BEZPIECZEŃSTWA
              </span>
              <h4 className="font-heading text-sm font-semibold text-white mb-2">
                24 miesiące rękojmi
              </h4>
              <p className="font-sans text-xs text-white/70">
                Stosujemy wyłącznie certyfikowane części oryginalne lub wysokiej klasy zamienniki z gwarancją.
              </p>
            </div>
          </div>
        </div>

        {/* Section Title & Subheading (landing-download-title parallel) */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <div className="flex items-center gap-2">
            <h2
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight uppercase text-white"
              style={{ fontWeight: 300 }}
            >
              {currentLang === 'uk' ? 'Категорії Автомобілів' : 'Kategorie Pojazdów'}
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-2xl">
            {currentLang === 'uk'
              ? 'Спеціалізовані підйомники до 4.5 тонн, високоточні стенди розвалу-сходження 3D у Познані.'
              : 'Dedykowane stanowiska podnośnikowe do 4.5 tony, profesjonalna geometria 3D oraz pełna diagnostyka komputerowa w Poznaniu.'}
          </p>
        </div>

        {/* 3 Platform Cards (landing-platforms parallel) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Platform 1: Samochody Osobowe (Mac OS parallel) */}
          <article className="flex flex-col justify-between p-6 sm:p-7 bg-[#000030]/80 border border-white/15 hover:border-white/40 transition-all">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#00F0FF] mb-1">
                Sedan / Kombi / Hatchback
              </p>
              <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                {currentLang === 'uk' ? 'Легкові авто' : 'Samochody Osobowe'}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                Kompleksowy serwis eksploatacyjny, diagnostyka komputerowa OBD2, układ hamulcowy, klimatyzacja oraz zawieszenie.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="font-mono text-[11px] text-white/60 flex items-center justify-between">
                <span>Podnośnik: Standard 3.5T</span>
                <span className="text-[#00FF85]">Wolne sloty: Dziś</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelect('osobowe')}
                className="hermes-button hermes-button-secondary w-full py-2.5 text-xs font-semibold gap-2"
              >
                <span>{currentLang === 'uk' ? 'Обрати Легковий' : 'Wybierz Osobowy'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* Platform 2: SUV & Crossover 4x4 (Windows parallel) */}
          <article className="flex flex-col justify-between p-6 sm:p-7 bg-[#000030]/80 border border-white/15 hover:border-white/40 transition-all">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#00F0FF] mb-1">
                Quattro / xDrive / 4Motion / AWD
              </p>
              <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                {currentLang === 'uk' ? 'SUV & Повний привід 4x4' : 'SUV & Crossover 4x4'}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                Obsługa napędów na 4 koła, zawieszeń pneumatycznych, wzmocnionych układów hamulcowych oraz opon o profilu SUV.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="font-mono text-[11px] text-white/60 flex items-center justify-between">
                <span>Podnośnik: Wzmocniony 4.2T</span>
                <span className="text-[#00FF85]">Wolne sloty: Dziś</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelect('suv')}
                className="hermes-button hermes-button-secondary w-full py-2.5 text-xs font-semibold gap-2"
              >
                <span>{currentLang === 'uk' ? 'Обрати SUV & 4x4' : 'Wybierz SUV & 4x4'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* Platform 3: Dostawcze & BUS (Linux parallel) */}
          <article className="flex flex-col justify-between p-6 sm:p-7 bg-[#000030]/80 border border-white/15 hover:border-white/40 transition-all">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#00F0FF] mb-1">
                Do 3.5T / Sprinter / Ducato / Boxer
              </p>
              <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                {currentLang === 'uk' ? 'Буси & Комерційні авто' : 'Dostawcze & BUS'}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                Obsługa flot firmowych, wysoki wjazd 3.2m, długie podnośniki czterokolumnowe, priorytetowa ścieżka i faktury VAT 23%.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="font-mono text-[11px] text-white/60 flex items-center justify-between">
                <span>Podnośnik: Long 4.5T</span>
                <span className="text-[#00FF85]">Priorytet Floty</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelect('dostawcze')}
                className="hermes-button hermes-button-secondary w-full py-2.5 text-xs font-semibold gap-2"
              >
                <span>{currentLang === 'uk' ? 'Обрати Доставний' : 'Wybierz Dostawczy'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
