'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '@/types';

interface FaqSectionProps {
  currentLang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: currentLang === 'uk'
        ? 'Скільки часу триває стандартне ТО та заміна мастила?'
        : 'Ile trwa standardowy serwis olejowy i przegląd eksploatacyjny?',
      a: currentLang === 'uk'
        ? 'Стандартна заміна мастила та комплекту фільтрів займає від 40 до 60 хвилин. Ви можете зачекати в клієнтській зоні з кавою та Wi-Fi або залишити авто та повернутися за ним пізніше.'
        : 'Standardowa wymiana oleju oraz kompletu filtrów trwa od 45 do 60 minut. Na czas serwisu możesz zrelaksować się w naszej poczekalni z darmową kawą i Wi-Fi lub odebrać auto o ustalonej porze.',
    },
    {
      q: currentLang === 'uk'
        ? 'Чи потрібно купувати власні запчастини, чи ви замовляєте самі?'
        : 'Czy muszę kupować własne części, czy zamawiacie je na miejscu?',
      a: currentLang === 'uk'
        ? 'Ми співпрацюємо безпосередньо з найбільшими оптовими постачальниками (Inter Cars, Moto-Profil). Запчастини доставляються на сервіс протягом 1-2 годин за оптовими цінами з офіційною гарантією 24 місяці. Ви також можете надати власні деталі.'
        : 'Współpracujemy bezpośrednio z największymi hurtowniami motoryzacyjnymi (Inter Cars, Moto-Profil). Części dostarczane są w ciągu 1-2 godzin w cenach hurtowych z 24-miesięczną gwarancją. Oczywiście możesz również dostarczyć własne podzespoły.',
    },
    {
      q: currentLang === 'uk'
        ? 'Яку гарантію ви надаєте на виконані роботи та запчастини?'
        : 'Jakie gwarancje otrzymuję na wykonane naprawy i montowane części?',
      a: currentLang === 'uk'
        ? 'На всі слюсарні та механічні роботи ми надаємо повну гарантію 24 місяці (або 20 000 км пробігу). До кожної послуги видається фіскальний чек або фактура VAT 23% з детальним переліком робіт.'
        : 'Na wszystkie wykonane usługi mechaniczne udzielamy pełnej 24-miesięcznej rękojmi. Każda naprawa kończy się wpisem do rejestru oraz wydaniem faktury VAT 23% lub paragonu z wyszczególnionymi pozycjami.',
    },
    {
      q: currentLang === 'uk'
        ? 'Що робити, якщо під час ремонту ви виявите додаткові несправності?'
        : 'Co jeśli podczas naprawy mechanicy wykryją dodatkowe usterki?',
      a: currentLang === 'uk'
        ? 'Ми суворо дотримуємося правила прозорості: жодна додаткова робота не виконується без вашого попереднього узгодження. Майстер зв’язується з вами, надсилає фото або відео несправності та погоджує точну вартість.'
        : 'Stosujemy żelazną zasadę zerowych niespodzianek cenowych. W przypadku wykrycia dodatkowych uszkodzeń doradca natychmiast kontaktuje się telefonicznie, przesyła zdjęcia wideo na WhatsApp i pyta o zgodę przed wykonaniem prac.',
    },
    {
      q: currentLang === 'uk'
        ? 'Чи надаєте ви підмінний автомобіль на час тривалого ремонту?'
        : 'Czy serwis 5STAR AUTO udostępnia samochód zastępczy?',
      a: currentLang === 'uk'
        ? 'Так, для наших клієнтів доступні підмінні автомобілі (механіка та автомат). При комплексному пакеті обслуговування авто надається безкоштовно за попереднім запитом.'
        : 'Tak, posiadamy flotę aut zastępczych (skrzynie manualne oraz automatyczne). Przy pakiecie Kompleksowym samochód zastępczy na czas serwisu udostępniany jest bezpłatnie.',
    },
  ];

  return (
    <section id="faqs" className="py-20 lg:py-24 border-b border-[rgba(238,240,245,0.08)]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-2">
            Pytania i odpowiedzi
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-[#eef0f5]">
            {currentLang === 'uk' ? 'Часті питання' : 'Najczęściej zadawane pytania'}
          </h2>
        </div>

        <div className="border-t border-[rgba(238,240,245,0.08)]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-[rgba(238,240,245,0.08)] py-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                >
                  <span className="text-base font-medium text-[#eef0f5] group-hover:text-[#ffffff] transition-colors">
                    {faq.q}
                  </span>
                  <span className="text-[#7a8296] group-hover:text-[#eef0f5] transition-colors shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-sm text-[#a3a9b8] leading-relaxed max-w-3xl">
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
