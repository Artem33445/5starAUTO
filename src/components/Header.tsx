'use client';

import React from 'react';
import { Phone, MapPin, Menu } from 'lucide-react';
import { Language } from '@/types';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenMobileMenu,
}) => {
  return (
    <header className="relative z-[90] bg-[#0000F2] text-white select-none">
      <nav
        aria-label="5STAR Auto Service"
        className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-6 pt-8 pb-5"
      >
        {/* Left Column: Subnav Triggers (Nous / Hermes parallel) */}
        <div className="flex items-center gap-x-8 max-md:hidden font-mono text-xs uppercase tracking-wider">
          <a
            href="#about"
            className="opacity-80 hover:opacity-100 transition-opacity hover:underline underline-offset-4"
          >
            5STAR
          </a>
          <a
            href="#services"
            className="opacity-80 hover:opacity-100 transition-opacity hover:underline underline-offset-4"
          >
            {currentLang === 'uk' ? 'Сервіс' : 'Serwis'}
          </a>
        </div>

        {/* Center Column: Big 2-line Gothic Wordmark + Micro Icons (Hermes Agent parallel) */}
        <div className="flex shrink-0 flex-col items-center text-center">
          <a href="#" className="flex flex-col items-center group">
            <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl leading-[0.88] tracking-tight uppercase text-white">
              5STAR
            </span>
            <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl leading-[0.88] tracking-tight uppercase text-white">
              AUTO
            </span>
          </a>

          {/* Micro-icons row */}
          <div className="mt-2.5 flex items-center gap-3 text-white/90">
            <a
              href="tel:+48512145314"
              className="hover:opacity-60 transition-opacity"
              aria-label="Zadzwoń do nas"
              title="+48 512 145 314"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            </a>
            <a
              href="https://t.me/+48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
              aria-label="Telegram"
              title="Telegram"
            >
              <TelegramIcon className="w-3.5 h-3.5 fill-current" />
            </a>
            <a
              href="#location"
              className="hover:opacity-60 transition-opacity"
              aria-label="Lokalizacja Poznań"
              title="Poznań, ul. Przykładowa 12"
            >
              <MapPin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Links + Language Switcher + "UMÓW WIZYTĘ" Button (Install Hermes parallel) */}
        <div className="flex items-center justify-end gap-x-4 sm:gap-x-6">
          <div className="hidden md:flex items-center gap-x-6 font-mono text-xs uppercase tracking-wider">
            <a
              href="#portal"
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline underline-offset-4"
            >
              {currentLang === 'uk' ? 'Ціни' : 'Cennik'}
            </a>
            <a
              href="#calculator"
              className="opacity-80 hover:opacity-100 transition-opacity hover:underline underline-offset-4"
            >
              Portal
            </a>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-black/20 rounded-none border border-white/20 p-0.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-1.5 py-0.5 uppercase transition-colors ${
                currentLang === 'pl'
                  ? 'bg-white text-[#0000F2] font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-1.5 py-0.5 uppercase transition-colors ${
                currentLang === 'uk'
                  ? 'bg-white text-[#0000F2] font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              UK
            </button>
          </div>

          {/* Primary Action Button (Replica of "Install Hermes") */}
          <a
            href="#calculator"
            className="hermes-button hermes-button-secondary px-3.5 py-2 text-xs font-semibold shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <span>{currentLang === 'uk' ? 'Запис на СТО' : 'Umów Wizytę'}</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden text-white p-1 hover:opacity-80 transition-opacity"
            aria-label="Otwórz menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};
