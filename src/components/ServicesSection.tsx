'use client';

import React from 'react';
import { Cpu, Wrench, Shield, Gauge, Snowflake, Disc, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onSelectService,
}) => {
  const services = [
    {
      id: 'diagnostic',
      title: currentLang === 'uk' ? "Комп'ютерна діагностика OBD2" : 'Diagnostyka komputerowa OBD2',
      desc: currentLang === 'uk'
        ? 'Повне сканування блоків керування ECU, стирання помилок, адаптація дросельної заслінки, калібрування датчиків.'
        : 'Skanowanie sterowników ECU silnika i skrzyni biegów, kasowanie błędów, adaptacje przepustnicy oraz kodowanie podzespołów.',
      price: 'od 100 zł',
      time: '30 min',
      icon: Cpu,
    },
    {
      id: 'oil',
      title: currentLang === 'uk' ? 'Сервіс мастил & фільтрів OEM' : 'Serwis olejowy i filtry OEM',
      desc: currentLang === 'uk'
        ? 'Заміна мастила за допусками виробників (Motul, Castrol, Liqui Moly), масляний, повітряний та салонний фільтри.'
        : 'Wymiana oleju według specyfikacji producentów (Motul, Castrol, Valvoline), wymiana kompletu filtrów oraz wpis do rejestru.',
      price: 'od 150 zł',
      time: '45 min',
      icon: Wrench,
    },
    {
      id: 'brakes',
      title: currentLang === 'uk' ? 'Гальмівна система & рідина' : 'Układ hamulcowy i tarcze',
      desc: currentLang === 'uk'
        ? 'Заміна колодок і дисків Brembo/ATE, перевірка точки кипіння гальмівної рідини, профілактика супортів.'
        : 'Wymiana klocków i tarcz hamulcowych, test higroskopijności płynu hamulcowego, regeneracja zacisków oraz pomiar bicia tarcz.',
      price: 'od 120 zł',
      time: '60 min',
      icon: Shield,
    },
    {
      id: 'suspension',
      title: currentLang === 'uk' ? 'Підвіска & 3D сходження' : 'Zawieszenie i geometria 3D',
      desc: currentLang === 'uk'
        ? 'Діагностика важелів, сайлентблоків та амортизаторів. Комп’ютерне регулювання кутів розвалу-сходження на стенді 3D.'
        : 'Kontrola luzów wahaczy, tulei i amortyzatorów. Komputerowa geometria zawieszenia na czterogłowicowym стенdzie 3D Hunter.',
      price: 'od 140 zł',
      time: '50 min',
      icon: Gauge,
    },
    {
      id: 'ac',
      title: currentLang === 'uk' ? 'Кліматизація R134a & R1234yf' : 'Klimatyzacja R134a i R1234yf',
      desc: currentLang === 'uk'
        ? 'Заправка холодоагентом, вакуумний тест герметичності, додавання компресорного мастила PAG та озонування салону.'
        : 'Napełnianie czynnikiem chłodniczym, próba szczelności azotem, wymiana oleju w kompresorze oraz antybakteryjne ozonowanie.',
      price: 'od 180 zł',
      time: '45 min',
      icon: Snowflake,
    },
    {
      id: 'tires',
      title: currentLang === 'uk' ? 'Шиномонтаж & балансування' : 'Wulkanizacja i wyważanie kół',
      desc: currentLang === 'uk'
        ? 'Монтаж та балансування шин R15–R22+ з тестовим навантаженням. Сезонне зберігання коліс у сухому приміщенні.'
        : 'Wymiana i precyzyjne wyważanie kół w rozmiarach R15–R22+. Sprawdzenie bicia radialnego oraz sezonowa przechowalnia opon.',
      price: 'od 120 zł',
      time: '40 min',
      icon: Disc,
    },
  ];

  const handleServiceClick = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const calc = document.getElementById('calculator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-24 border-b border-[rgba(238,240,245,0.08)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-2">
            {currentLang === 'uk' ? 'Напрями робіт' : 'Zakres usług'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#eef0f5] mb-3">
            {currentLang === 'uk' ? 'Професійне обслуговування авто' : 'Profesjonalna obsługa mechaniczna'}
          </h2>
          <p className="text-sm sm:text-base text-[#a3a9b8] leading-relaxed">
            {currentLang === 'uk'
              ? 'Роботи виконуються кваліфікованими механіками з дотриманням технологічних карт виробників.'
              : 'Wszystkie naprawy wykonujemy na certyfikowanych podnośnikach i urządzeniach diagnostycznych zgodnie z procedurami OEM.'}
          </p>
        </div>

        {/* 6 deliberate service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => handleServiceClick(svc.title)}
                className="rounded-card bg-[#11141c] border border-[rgba(238,240,245,0.08)] hover:border-[rgba(238,240,245,0.18)] p-6 flex flex-col justify-between transition-colors cursor-pointer group"
              >
                <div>
                  {/* Top row: Icon and pricing */}
                  <div className="flex items-center justify-between pb-4 border-b border-[rgba(238,240,245,0.06)] mb-4">
                    <div className="w-8 h-8 rounded-[6px] bg-[#1a1e28] border border-[rgba(238,240,245,0.08)] flex items-center justify-center text-[#a3a9b8] group-hover:text-[#eef0f5] transition-colors">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-[#eef0f5] font-semibold">{svc.price}</span>
                      <span className="text-[#7a8296] ml-1.5">· {svc.time}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-medium text-[#eef0f5] mb-2 group-hover:text-[#ffffff] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#a3a9b8] leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(238,240,245,0.06)] flex items-center justify-between text-xs font-mono text-[#7a8296] group-hover:text-[#a3a9b8] transition-colors">
                  <span>Wybierz do wyceny</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7a8296] group-hover:text-[#eef0f5] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
