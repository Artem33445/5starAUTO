'use client';

import React from 'react';
import { ArrowUpRight, Phone, Calendar, Clock, Wrench } from 'lucide-react';
import { Language } from '@/types';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
  currentLang: Language;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const categories =
    currentLang === 'uk'
      ? [
          // Column 1
          [
            {
              title: 'Діагностика & Електроніка',
              links: [
                { label: 'Комп’ютерне сканування ECU / OBD2', href: '#services' },
                { label: 'Скидання помилок & сервісних інтервалів', href: '#services' },
                { label: 'Адаптація дросельної заслінки', href: '#services' },
                { label: 'Калібрування датчиків & ADAS', href: '#services' },
                { label: 'Всі види діагностики', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Сервіс мастил & Фільтри',
              links: [
                { label: 'Заміна моторного мастила OEM', href: '#services' },
                { label: 'Мастило в АКПП / DSG / МКПП', href: '#services' },
                { label: 'Комплекти фільтрів (масляний, салон, повітря)', href: '#services' },
                { label: 'Промивка масляної системи Liqui Moly', href: '#services' },
                { label: 'Всі пакети ТО', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Гальмівна система',
              links: [
                { label: 'Заміна гальмівних дисків Brembo / ATE', href: '#services' },
                { label: 'Заміна гальмівних колодок', href: '#services' },
                { label: 'Заміна та прокачування рідини DOT4', href: '#services' },
                { label: 'Регенерація та очищення супортів', href: '#services' },
                { label: 'Всі послуги гальм', href: '#services', highlight: true },
              ],
            },
          ],
          // Column 2
          [
            {
              title: 'Підвіска & 3D Сходження',
              links: [
                { label: 'Регулювання сходження 3D Hunter', href: '#services' },
                { label: 'Заміна амортизаторів та пружин', href: '#services' },
                { label: 'Важелі, сайлентблоки та шарові опори', href: '#services' },
                { label: 'Діагностика підвіски на люфт-детекторі', href: '#services' },
                { label: 'Всі роботи по ходовій', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Кондиціонер & Клімат',
              links: [
                { label: 'Заправка холодоагентом R134a / R1234yf', href: '#services' },
                { label: 'Озонування та дезінфекція випарника', href: '#services' },
                { label: 'Перевірка герметичності азотом під тиском', href: '#services' },
                { label: 'Заміна радіатора та компресора', href: '#services' },
                { label: 'Всі послуги кондиціювання', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Двигун & ГРМ',
              links: [
                { label: 'Заміна комплекту ременя / ланцюга ГРМ', href: '#services' },
                { label: 'Заміна водяної помпи та антифризу', href: '#services' },
                { label: 'Регенерація та заміна турбін', href: '#services' },
                { label: 'Заміна прокладок клапанної кришки', href: '#services' },
                { label: 'Всі роботи по двигуну', href: '#services', highlight: true },
              ],
            },
          ],
          // Column 3
          [
            {
              title: 'Вихлопна система & DPF',
              links: [
                { label: 'Очищення та регенерація фільтрів DPF / FAP', href: '#services' },
                { label: 'Регенерація каталізаторів', href: '#services' },
                { label: 'Заміна гофр та глушників', href: '#services' },
                { label: 'Діагностика лямбда-зонда', href: '#services' },
                { label: 'Всі послуги вихлопу', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Шиномонтаж & Колеса',
              links: [
                { label: 'Сезонна заміна шин та балансування', href: '#services' },
                { label: 'Клонування та прописка датчиків TPMS', href: '#services' },
                { label: 'Ремонт безкамерних проколів', href: '#services' },
                { label: 'Сезонне зберігання коліс (готель шин)', href: '#services' },
                { label: 'Всі послуги шиномонтажу', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Комплексні огляди & Спецпослуги',
              links: [
                { label: 'Огляд авто перед покупкою (120 пунктів)', href: '#services' },
                { label: 'Вимірювання товщини фарби товщиноміром', href: '#services' },
                { label: 'Підготовка до техогляду SKP', href: '#services' },
                { label: 'Сезонна перевірка (Зима / Літо)', href: '#services' },
                { label: 'Всі пакети оглядів', href: '#services', highlight: true },
              ],
            },
          ],
        ]
      : [
          // Column 1 (PL)
          [
            {
              title: 'Narożniki i zawieszenie',
              titleAlt: 'Diagnostyka & Elektronika',
              links: [
                { label: 'Skanowanie sterowników ECU / OBD2', href: '#services' },
                { label: 'Kasowanie błędów i inspekcji', href: '#services' },
                { label: 'Adaptacja przepustnicy i EGR', href: '#services' },
                { label: 'Kalibracja radarów i systemów ADAS', href: '#services' },
                { label: 'Wszystkie w diagnostyce', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Serwis olejowy & Filtry',
              links: [
                { label: 'Wymiana oleju silnikowego OEM', href: '#services' },
                { label: 'Olej w automatycznej / manualnej skrzyni', href: '#services' },
                { label: 'Komplety filtrów (powietrza, kabinowy, paliwa)', href: '#services' },
                { label: 'Płukanie silnika preparatami Liqui Moly', href: '#services' },
                { label: 'Wszystkie pakiety olejowe', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Układ hamulcowy',
              links: [
                { label: 'Wymiana tarcz i klocków Brembo / ATE', href: '#services' },
                { label: 'Wymiana i pomiar higroskopijności płynu DOT4', href: '#services' },
                { label: 'Regeneracja i czyszczenie zacisków', href: '#services' },
                { label: 'Pomiar bicia tarcz mikrometrem zegarowym', href: '#services' },
                { label: 'Wszystkie naprawy hamulców', href: '#services', highlight: true },
              ],
            },
          ],
          // Column 2 (PL)
          [
            {
              title: 'Zawieszenie & Geometria 3D',
              links: [
                { label: 'Geometria kół i zbieżność 3D Hunter', href: '#services' },
                { label: 'Wymiana amortyzatorów i sprężyn', href: '#services' },
                { label: 'Wahacze, sworznie i tuleje poliuretanowe', href: '#services' },
                { label: 'Test luzów zawieszenia na szarpakach', href: '#services' },
                { label: 'Wszystkie usługi zawieszenia', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Klimatyzacja & Wentylacja',
              links: [
                { label: 'Nabijanie czynnikiem R134a / R1234yf', href: '#services' },
                { label: 'Ozonowanie i odgrzybianie parownika', href: '#services' },
                { label: 'Próba szczelności układu azotem pod ciśnieniem', href: '#services' },
                { label: 'Wymiana skraplacza i kompresora', href: '#services' },
                { label: 'Wszystkie usługi klimatyzacji', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Silnik & Rozrząd',
              links: [
                { label: 'Wymiana paska lub łańcucha rozrządu', href: '#services' },
                { label: 'Wymiana pompy wody i płynu chłodniczego', href: '#services' },
                { label: 'Regeneracja i diagnostyka turbosprężarek', href: '#services' },
                { label: 'Uszczelnienie silnika i miski olejowej', href: '#services' },
                { label: 'Wszystkie naprawy silnika', href: '#services', highlight: true },
              ],
            },
          ],
          // Column 3 (PL)
          [
            {
              title: 'Układ wydechowy & DPF',
              links: [
                { label: 'Hydrodynamiczne czyszczenie DPF / FAP', href: '#services' },
                { label: 'Regeneracja i wymiana katalizatorów', href: '#services' },
                { label: 'Wymiana tłumików i złącz elastycznych', href: '#services' },
                { label: 'Diagnostyka i wymiana sondy lambda', href: '#services' },
                { label: 'Wszystkie usługi wydechowe', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Wulkanizacja & Koła',
              links: [
                { label: 'Wymiana opon i precyzyjne wyważenie kół', href: '#services' },
                { label: 'Programowanie i klonowanie czujników TPMS', href: '#services' },
                { label: 'Naprawa opon po przebiciu (kołkowanie)', href: '#services' },
                { label: 'Hotel opon (sezonowe przechowywanie)', href: '#services' },
                { label: 'Wszystkie usługi kół', href: '#services', highlight: true },
              ],
            },
            {
              title: 'Przeglądy & Kontrola stanu',
              links: [
                { label: 'Kompleksowy przegląd przed zakupem (120 pkt)', href: '#services' },
                { label: 'Precyzyjny pomiar grubości lakieru miernikiem', href: '#services' },
                { label: 'Przygotowanie do badania technicznego SKP', href: '#services' },
                { label: 'Sezonowy audyt bezpieczeństwa pojazdu', href: '#services' },
                { label: 'Wszystkie pakiety inspekcji', href: '#services', highlight: true },
              ],
            },
          ],
        ];

  return (
    <>
      {/* Background dimmer overlay (almost full screen backdrop) */}
      <div
        className="fixed inset-0 top-14 sm:top-16 bg-black/60 backdrop-blur-[3px] z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mega Menu panel */}
      <div
        className="absolute top-full left-0 w-full z-50 bg-[#090b12] border-b border-[rgba(238,240,245,0.12)] shadow-[0_30px_70px_rgba(0,0,0,0.85)] sofini-mega-menu is-entering"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="region"
        aria-label="Menu usług"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-14 min-h-[520px] flex flex-col justify-between">
          {/* 3 Columns matching sofini grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 xl:gap-20">
            {categories.map((column, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-col gap-9 sofini-col-item"
                style={{
                  animation: `sofini-col-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${colIdx * 0.08}s both`,
                }}
              >
                {column.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-3">
                    {/* Category Title */}
                    <h3 className="text-[17px] font-semibold text-[#eef0f5] tracking-tight hover:text-[#3b82f6] transition-colors cursor-pointer flex items-center gap-1.5 group">
                      <span>{group.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#7a8296] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    {/* Sublinks */}
                    <ul className="space-y-2">
                      {group.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a
                            href={link.href}
                            onClick={onClose}
                            className={`text-[14px] leading-relaxed transition-colors block py-0.5 ${
                              link.highlight
                                ? 'text-[#eef0f5] font-medium hover:text-[#3b82f6] pt-1'
                                : 'text-[#8e96aa] hover:text-[#eef0f5]'
                            }`}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom helper bar inside mega menu */}
          <div className="mt-12 pt-6 border-t border-[rgba(238,240,245,0.08)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#7a8296]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#eef0f5]">Stanowisko 02 wolne dzisiaj</span>
              </span>
              <span>·</span>
              <span className="hidden sm:inline">Średni czas realizacji: 45 min</span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="tel:+48512145314"
                className="flex items-center gap-1.5 text-[#a3a9b8] hover:text-[#eef0f5] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#10b981]" />
                <span>+48 512 145 314</span>
              </a>
              <a
                href="#calculator"
                onClick={onClose}
                className="unslop-btn-primary h-8 px-4 text-xs font-sans font-medium"
              >
                <span>{currentLang === 'uk' ? 'Розрахувати вартість' : 'Oblicz koszt online'} →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
