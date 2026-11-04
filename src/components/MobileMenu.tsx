'use client';

import React, { useEffect } from 'react';
import { X, Phone, ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLanguageChange,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#07080d] text-[#eef0f5] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
      style={{ height: '100dvh' }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(238,240,245,0.08)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="font-sans text-base font-semibold text-[#eef0f5] tracking-tight">
            5STAR AUTO
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-[#a3a9b8] hover:text-[#eef0f5] rounded-[6px]"
          aria-label="Zamknij"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="my-auto py-8 flex flex-col gap-6 text-xl text-[#eef0f5]">
        <a
          href="#services"
          onClick={onClose}
          className="hover:text-[#ffffff] transition-colors"
        >
          {currentLang === 'uk' ? 'Послуги' : 'Zakres usług'}
        </a>
        <a
          href="#packages"
          onClick={onClose}
          className="hover:text-[#ffffff] transition-colors"
        >
          {currentLang === 'uk' ? 'Пакети' : 'Pakiety serwisowe'}
        </a>
        <a
          href="#calculator"
          onClick={onClose}
          className="hover:text-[#ffffff] transition-colors"
        >
          {currentLang === 'uk' ? 'Калькулятор' : 'Wycena i rezerwacja'}
        </a>
        <a
          href="#faqs"
          onClick={onClose}
          className="hover:text-[#ffffff] transition-colors"
        >
          FAQ
        </a>
        <a
          href="#contact"
          onClick={onClose}
          className="hover:text-[#ffffff] transition-colors"
        >
          {currentLang === 'uk' ? 'Контакти' : 'Kontakt'}
        </a>
      </nav>

      {/* Bottom controls */}
      <div className="pt-6 border-t border-[rgba(238,240,245,0.08)] space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#7a8296]">Język / Мова</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-3 py-1 rounded-[4px] border ${
                currentLang === 'pl'
                  ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)] font-medium'
                  : 'text-[#7a8296] border-[rgba(238,240,245,0.06)]'
              }`}
            >
              Polski
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-3 py-1 rounded-[4px] border ${
                currentLang === 'uk'
                  ? 'bg-[#1a1e28] text-[#eef0f5] border-[rgba(238,240,245,0.2)] font-medium'
                  : 'text-[#7a8296] border-[rgba(238,240,245,0.06)]'
              }`}
            >
              Українська
            </button>
          </div>
        </div>

        <a
          href="tel:+48512145314"
          className="unslop-btn-primary w-full h-11 text-sm font-medium"
        >
          <Phone className="w-4 h-4 text-[#0b0d14]" />
          <span>+48 512 145 314</span>
        </a>
      </div>
    </div>
  );
};
