'use client';

import React from 'react';
import { Sparkles, Cpu, Wrench, ShieldCheck, Gauge, Snowflake, Disc } from 'lucide-react';
import { Language } from '@/types';

interface FeaturesSectionProps {
  currentLang: Language;
  onSelectFeature?: (featureId: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  currentLang,
  onSelectFeature,
}) => {
  const features = [
    {
      num: '#1 Diagnostyka',
      title: currentLang === 'uk' ? "Комп'ютерна Діагностика OBD2" : 'Diagnostyka Komputerowa OBD2',
      desc: currentLang === 'uk'
        ? 'Повне сканування блоків керування ECU, стирання помилок, адаптація дроселя, АКПП та калібрування радарів ADAS.'
        : 'Pełny skan sterowników ECU silnika i skrzyni, kasowanie błędów, kodowanie wtryskiwaczy oraz kalibracja systemów ADAS.',
      icon: Cpu,
      meta: 'Bosch & Launch OEM // 30 min',
      price: 'od 100 zł',
      tag: 'diagnostic',
    },
    {
      num: '#2 Eksploatacja',
      title: currentLang === 'uk' ? 'Сервіс Мастил & Фільтрів OEM' : 'Serwis Olejowy & Filtry OEM',
      desc: currentLang === 'uk'
        ? 'Заміна мастила за допусками виробників (Motul, Castrol, Liqui Moly), заміна паливних, повітряних та салонних фільтрів.'
        : 'Wymiana oleju z normami producentów (Motul, Castrol, Valvoline), wymiana filtrów, inspekcja płynów i wpis do rejestru.',
      icon: Wrench,
      meta: 'Certyfikat OEM // 45 min',
      price: 'od 150 zł',
      tag: 'oil',
    },
    {
      num: '#3 Bezpieczeństwo',
      title: currentLang === 'uk' ? 'Гальмівна Система & Підвіска' : 'Układ Hamulcowy & Zawieszenie',
      desc: currentLang === 'uk'
        ? 'Лазерний вимір биття дисків, заміна колодок, перевірка точки кипіння гальмівної рідини, діагностика амортизаторів.'
        : 'Wymiana klocków i tarcz, test higroskopijności płynu hamulcowego, regeneracja zacisków oraz ścieżka zawieszenia.',
      icon: ShieldCheck,
      meta: 'Laser Brembo // 60 min',
      price: 'od 120 zł',
      tag: 'brakes',
    },
    {
      num: '#4 Mechanika',
      title: currentLang === 'uk' ? 'Двигун, ГРМ & Зчеплення' : 'Silnik, Rozrząd & Sprzęgła',
      desc: currentLang === 'uk'
        ? 'Заміна комплектів ременів та ланцюгів ГРМ, діагностика турбін, заміна зчеплення, двохмасових маховиків та помп.'
        : 'Kompleksowa wymiana rozrządów, diagnostyka turbosprężarek, wymiana dwumasu, uszczelnianie silników i regeneracja głowic.',
      icon: Gauge,
      meta: 'Gwarancja 24M // Wycena',
      price: 'od 350 zł',
      tag: 'engine',
    },
    {
      num: '#5 Komfort',
      title: currentLang === 'uk' ? 'Кліматизація R134a & R1234yf' : 'Klimatyzacja R134a & R1234yf',
      desc: currentLang === 'uk'
        ? 'Заправка холодоагентом старого та нового покоління, ультрафіолетовий тест витоків, антибактеріальне озонування салону.'
        : 'Obsługa czynników R134a oraz nowoczesnego R1234yf, próba szczelności azotem, uzupełnienie oleju PAG i ozonowanie wnętrza.',
      icon: Snowflake,
      meta: 'Stacja Texa // 45 min',
      price: 'od 180 zł',
      tag: 'ac',
    },
    {
      num: '#6 Koła',
      title: currentLang === 'uk' ? 'Вулканізація & Геометрія 3D' : 'Wulkanizacja & Geometria 3D',
      desc: currentLang === 'uk'
        ? 'Монтаж та балансування коліс від R15 до R22+, лазерний 3D стенд сходження, сезонне зберігання гуми у готелі шин.'
        : 'Wymiana opon od R15 do R22+ z testem drogowym, wyważanie dynamiczne, komputerowa geometria podwozia 3D Hunter.',
      icon: Disc,
      meta: 'Hunter 3D // 40 min',
      price: 'od 120 zł',
      tag: 'tires',
    },
  ];

  return (
    <section
      aria-label="Features"
      className="bg-white text-[#000030] py-20 lg:py-28"
      id="features"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16">
        {/* Section Heading matching Hermes exact style */}
        <div className="flex items-center gap-3 mb-16 pb-6 border-b border-black/10">
          <h2
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#000030] uppercase tracking-tight"
            style={{ fontWeight: 300 }}
          >
            Features
          </h2>
          <span className="w-4 h-4 rounded-full bg-[#0000F2]" />
          <span className="font-mono text-xs uppercase text-[#0000F2] tracking-widest ml-auto">
            6 Kluczowych Filarów Serwisu
          </span>
        </div>

        {/* 6-Card Numbered Grid matching landing-feature-grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <article
                key={feat.num}
                className="flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  const calc = document.getElementById('calculator');
                  if (calc) {
                    calc.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#0000F2] font-semibold">
                      {feat.num}
                    </p>
                    <span className="font-mono text-xs text-black/40 font-medium">
                      {feat.price}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-semibold text-[#000030] mb-3 group-hover:text-[#0000F2] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#000030]/75 leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>

                {/* Visual Plate (hw-teams-plate parallel) */}
                <div className="w-full h-36 bg-[#F5F5FA] border border-black/10 p-5 flex flex-col justify-between group-hover:border-[#0000F2] transition-all">
                  <div className="flex items-center justify-between text-black/60">
                    <Icon className="w-6 h-6 text-[#0000F2]" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/50">
                      {feat.meta}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 font-mono text-xs">
                    <span className="text-[#0000F2] font-semibold underline underline-offset-4">
                      {currentLang === 'uk' ? 'Обрати послугу' : 'Wybierz usługę'}
                    </span>
                    <span className="text-black/40">→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
