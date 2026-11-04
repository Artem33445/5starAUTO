'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface PackagesSectionProps {
  currentLang: Language;
  onSelectPackage?: (planName: string, price: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  currentLang,
  onSelectPackage,
}) => {
  const plans = [
    {
      id: 'basic',
      name: currentLang === 'uk' ? 'Базовий' : 'Podstawowy',
      price: '150 zł',
      sub: currentLang === 'uk' ? 'Регулярне ТО та заміна мастила' : 'Okresowy przegląd i serwis olejowy',
      features: [
        'Wymiana oleju silnikowego i filtra oleju',
        'Kasowanie inspekcji serwisowej w komputerze OBD2',
        'Kontrola poziomu płynów eksploatacyjnych',
        'Sprawdzenie ciśnienia i stanu opon',
        'Protokół serwisowy z 24-miesięczną rękojmią',
      ],
      popular: false,
    },
    {
      id: 'standard',
      name: currentLang === 'uk' ? 'Стандарт' : 'Standard',
      price: '350 zł',
      sub: currentLang === 'uk' ? 'Повний річний сервіс' : 'Najczęściej wybierany przez kierowców',
      features: [
        'Wszystkie czynności z pakietu Podstawowego',
        'Wymiana kompletu filtrów (powietrza, kabiny, paliwa)',
        'Kontrola grubości tarcz i klocków hamulcowych',
        'Sprawdzenie luzów zawieszenia na szarpakach',
        'Pełny skan diagnostyczny modułów ECU',
        'Mycie karoserii gratis',
      ],
      popular: true,
    },
    {
      id: 'complex',
      name: currentLang === 'uk' ? 'Комплексний' : 'Kompleksowy',
      price: '750 zł',
      sub: currentLang === 'uk' ? 'Повна підготовка перед сезоном' : 'Kompleksowe przygotowanie przedsezonowe',
      features: [
        'Wszystkie czynności z pakietu Standard',
        'Serwis klimatyzacji z uzupełnieniem czynnika i ozonowaniem',
        'Komputerowa geometria zawieszenia 3D Hunter',
        'Test sprawności akumulatora i alternatora',
        'Samochód zastępczy na czas prac gratis',
      ],
      popular: false,
    },
    {
      id: 'fleet',
      name: currentLang === 'uk' ? 'Флота / VIP' : 'Flota / VIP',
      price: currentLang === 'uk' ? 'Wycena' : 'Wycena',
      sub: currentLang === 'uk' ? 'Для компаній та комерційних авто' : 'Dla firm, busów i stałych klientów',
      features: [
        'Dedykowany opiekun techniczny floty',
        'Priorytetowe przyjęcie na stanowisko',
        'Obsługa door-to-door (odbiór i zwrot auta)',
        'Faktury zbiorcze VAT 23% z odroczonym terminem',
        'Dostęp do aut zastępczych klasy premium',
      ],
      popular: false,
    },
  ];

  const handlePlanClick = (name: string, price: string) => {
    if (onSelectPackage) {
      onSelectPackage(name, price);
    }
    const calc = document.getElementById('calculator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-20 lg:py-24 border-b border-[rgba(238,240,245,0.08)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-2">
            {currentLang === 'uk' ? 'Фіксовані ціни' : 'Przejrzysty cennik'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#eef0f5] mb-3">
            {currentLang === 'uk' ? 'Пакети сервісного обслуговування' : 'Pakiety serwisowe bez ukrytych kosztów'}
          </h2>
          <p className="text-sm sm:text-base text-[#a3a9b8] leading-relaxed">
            {currentLang === 'uk'
              ? 'Фіксована вартість робіт, узгодження будь-яких додаткових дій перед їх початком.'
              : 'Wszystkie pakiety obejmują 24 miesiące gwarancji na części i robociznę oraz szczegółowy protokół odbioru.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-card p-6 flex flex-col justify-between transition-colors ${
                p.popular
                  ? 'bg-[#141824] border border-[rgba(37,99,235,0.4)]'
                  : 'bg-[#11141c] border border-[rgba(238,240,245,0.08)] hover:border-[rgba(238,240,245,0.16)]'
              }`}
            >
              <div>
                {/* Popular tag */}
                <div className="h-6 mb-2">
                  {p.popular && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#2563eb]/20 text-[#60a5fa] text-[11px] font-mono font-medium">
                      Najczęściej wybierany
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-medium text-[#eef0f5] mb-1">{p.name}</h3>
                <div className="text-2xl font-semibold text-[#eef0f5] tabular-nums mb-2">
                  {p.price}
                </div>
                <p className="text-xs text-[#a3a9b8] leading-relaxed mb-6 pb-4 border-b border-[rgba(238,240,245,0.06)]">
                  {p.sub}
                </p>

                <ul className="space-y-2.5 mb-8 text-xs text-[#a3a9b8]">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5 stroke-[2]" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handlePlanClick(p.name, p.price)}
                className={`w-full ${
                  p.popular ? 'unslop-btn-primary' : 'unslop-btn-secondary'
                }`}
              >
                <span>Wybierz pakiet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
