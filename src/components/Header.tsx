'use client';

import React from 'react';
import { Phone, Menu } from 'lucide-react';
import { Language } from '@/types';

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
    <header className="sticky top-0 z-50 bg-[#07080d]/90 backdrop-blur-md border-b border-[rgba(238,240,245,0.08)]">
      <div className="max-w-6xl mx-auto px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo and signature status */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="font-sans text-[15px] font-semibold text-[#eef0f5] tracking-tight">
              5STAR AUTO
            </span>
          </a>

          <span className="hidden md:inline-flex items-center gap-1.5 pl-3 border-l border-[rgba(238,240,245,0.08)] text-xs font-mono text-[#7a8296]">
            <span>Poznań</span>
            <span>·</span>
            <span className="text-[#10b981]">Stanowisko 02 wolne</span>
          </span>
        </div>

        {/* Quiet desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-[#a3a9b8]">
          <a href="#services" className="hover:text-[#eef0f5] transition-colors">
            {currentLang === 'uk' ? 'Послуги' : 'Usługi'}
          </a>
          <a href="#packages" className="hover:text-[#eef0f5] transition-colors">
            {currentLang === 'uk' ? 'Пакети' : 'Pakiety'}
          </a>
          <a href="#calculator" className="hover:text-[#eef0f5] transition-colors">
            {currentLang === 'uk' ? 'Калькулятор' : 'Kalkulator'}
          </a>
          <a href="#faqs" className="hover:text-[#eef0f5] transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-[#eef0f5] transition-colors">
            {currentLang === 'uk' ? 'Контакти' : 'Kontakt'}
          </a>
        </nav>

        {/* Language, phone, and action */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center p-0.5 rounded-[6px] bg-[#11141c] border border-[rgba(238,240,245,0.08)] text-xs font-mono">
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2 py-0.5 rounded-[4px] transition-colors ${
                currentLang === 'pl'
                  ? 'bg-[#1a1e28] text-[#eef0f5] font-medium'
                  : 'text-[#7a8296] hover:text-[#a3a9b8]'
              }`}
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2 py-0.5 rounded-[4px] transition-colors ${
                currentLang === 'uk'
                  ? 'bg-[#1a1e28] text-[#eef0f5] font-medium'
                  : 'text-[#7a8296] hover:text-[#a3a9b8]'
              }`}
            >
              UK
            </button>
          </div>

          {/* Direct phone */}
          <a
            href="tel:+48512145314"
            className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#a3a9b8] hover:text-[#eef0f5] px-2.5 py-1.5 rounded-[6px] hover:bg-[#11141c] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#7a8296]" />
            <span>+48 512 145 314</span>
          </a>

          {/* Primary Action Button */}
          <a
            href="#calculator"
            className="unslop-btn-primary h-8 sm:h-9 text-xs sm:text-sm px-3.5"
          >
            <span>{currentLang === 'uk' ? 'Записатися' : 'Umów wizytę'}</span>
          </a>

          {/* Mobile Menu trigger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 text-[#a3a9b8] hover:text-[#eef0f5] rounded-[6px] hover:bg-[#11141c]"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
