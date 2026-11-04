'use client';

import React, { useState } from 'react';
import { Plus, Minus, FileText } from 'lucide-react';
import { Language } from '@/types';

interface FaqAccordionProps {
  currentLang: Language;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ currentLang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: currentLang === 'uk'
        ? 'Скільки часу триває стандартне ТО та заміна мастила?'
        : 'Ile trwa standardowy serwis olejowy i przegląd eksploatacyjny?',
      a: currentLang === 'uk'
        ? 'Стандартна заміна мастила та комплекту фільтрів займає від 40 до 60 хвилин. Ви можете зачекати в нашій затишній клієнтській зоні з кавою та Wi-Fi або залишити авто та повернутися за ним пізніше.'
        : 'Standardowa wymiana oleju oraz kompletu filtrów trwa od 45 do 60 minut. Na czas naprawy możesz zrelaksować się w naszej strefie klienta z darmową kawą i Wi-Fi lub odebrać auto o umówionej godzinie.',
    },
    {
      q: currentLang === 'uk'
        ? 'Чи потрібно купувати власні запчастини, чи ви замовляєте самі?'
        : 'Czy muszę kupować własne części, czy zamawiacie je na miejscu?',
      a: currentLang === 'uk'
        ? 'Ми маємо прямі контракти з найбільшими європейськими постачальниками (Inter Cars, Moto-Profil, Auto Partner). Запчастини доставляються на сервіс за 1-2 години за оптовими цінами з офіційною гарантією 24 місяці. Ви також можете привезти свої деталі.'
        : 'Współpracujemy bezpośrednio z największymi hurtowniami motoryzacyjnymi (Inter Cars, Moto-Profil, Auto Partner). Części dostarczane są w ciągu 1-2 godzin w cenach hurtowych z 24-miesięczną gwarancją. Oczywiście możesz również dostarczyć własne podzespoły.',
    },
    {
      q: currentLang === 'uk'
        ? 'Яку гарантію ви надаєте на виконані роботи?'
        : 'Jakie gwarancje otrzymuję na wykonane naprawy i montowane części?',
      a: currentLang === 'uk'
        ? 'На всі слюсарні та механічні роботи ми надаємо офіційну гарантію 24 місяці (або 20 000 км пробігу). До кожної послуги видається фіскальний чек або фактура VAT 23% з докладним переліком виконаних робіт.'
        : 'Na wszystkie wykonane usługi mechaniczne udzielamy pełnej 24-miesięcznej rękojmi. Każda naprawa kończy się wpisem do rejestru oraz wydaniem faktury VAT 23% lub paragonu z wyszczególnionymi częściami.',
    },
    {
      q: currentLang === 'uk'
        ? 'Що робити, якщо під час ремонту ви виявите додаткові несправності?'
        : 'Co jeśli podczas naprawy wykryjecie dodatkowe ukryte usterki?',
      a: currentLang === 'uk'
        ? 'Ми суворо дотримуємося правила прозорості: жодна додаткова робота не виконується без вашого попереднього узгодження! Майстер телефонує вам, надсилає фото або відео несправності у WhatsApp/Telegram і погоджує точну вартість.'
        : 'Stosujemy żelazną zasadę zerowych niespodzianek cenowych. W przypadku wykrycia dodatkowych uszkodzeń, doradca natychmiast kontaktuje się telefonicznie, przesyła zdjęcia wideo na WhatsApp i pyta o zgodę przed wykonaniem prac.',
    },
    {
      q: currentLang === 'uk'
        ? 'Чи надаєте ви підмінний автомобіль на час ремонту?'
        : 'Czy serwis 5STAR AUTO udostępnia samochód zastępczy?',
      a: currentLang === 'uk'
        ? 'Так, для наших клієнтів доступні комфортні підмінні автомобілі (механіка та автомат). Для комплексних пакетів обслуговування авто надається безкоштовно за попереднім запитом.'
        : 'Tak, posiadamy flotę aut zastępczych (skrzynie manualne oraz automatyczne). Przy pakiecie Kompleksowym samochód zastępczy na czas serwisu udostępniany jest całkowicie bezpłatnie.',
    },
  ];

  return (
    <section className="bg-white py-20 border-t border-black/10" id="faqs">
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16 flex flex-col gap-8">
        {/* Header matching Hermes exactly */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10">
          <div className="flex items-center gap-3">
            <h2
              className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#000030] uppercase tracking-tight"
              style={{ fontWeight: 300 }}
            >
              FAQs
            </h2>
            <FileText className="w-6 h-6 text-[#0000F2] shrink-0" />
          </div>

          <a
            href="tel:+48512145314"
            className="font-mono text-xs uppercase tracking-wider text-[#000030] underline underline-offset-4 hover:text-[#0000F2] transition-colors"
          >
            {currentLang === 'uk' ? 'Подзвонити майстру' : 'Zadzwoń do doradcy'}
          </a>
        </div>

        {/* Dotted border accordion list matching Hermes */}
        <div className="flex flex-col border-b border-dotted border-[#0000F2]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-t border-dotted border-[#0000F2] py-5 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                >
                  <span className="font-heading text-lg sm:text-xl font-medium text-[#0000F2] underline underline-offset-4 decoration-current/40 group-hover:decoration-current transition-all">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-[#0000F2]">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 pb-2 font-sans text-sm sm:text-base text-[#000030]/80 leading-relaxed max-w-4xl">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
