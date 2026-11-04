'use client';

import React, { useEffect } from 'react';
import { X, Phone, ArrowRight, MapPin } from 'lucide-react';
import { Language } from '@/types';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

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
      className="fixed inset-0 z-[100] bg-[#0000F2] text-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto select-none"
      style={{ height: '100dvh' }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/20 pb-4">
        <div className="flex flex-col">
          <span className="font-heading font-black text-2xl uppercase tracking-tight text-white leading-none">
            5STAR
          </span>
          <span className="font-heading font-black text-2xl uppercase tracking-tight text-white leading-none">
            AUTO
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-white hover:opacity-75 transition-opacity"
          aria-label="Zamknij menu"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="my-auto py-8 flex flex-col gap-6 font-mono text-xl uppercase tracking-wider">
        <a
          href="#downloads"
          onClick={onClose}
          className="hover:underline underline-offset-8"
        >
          : {currentLang === 'uk' ? 'Категорії Авто' : 'Kategorie Pojazdów'} :
        </a>
        <a
          href="#features"
          onClick={onClose}
          className="hover:underline underline-offset-8"
        >
          : {currentLang === 'uk' ? '6 Філярів Сервісу' : '6 Filarów Serwisu'} :
        </a>
        <a
          href="#portal"
          onClick={onClose}
          className="hover:underline underline-offset-8"
        >
          : {currentLang === 'uk' ? 'Пакети & Портал' : 'Pakiety & Portal'} :
        </a>
        <a
          href="#calculator"
          onClick={onClose}
          className="hover:underline underline-offset-8"
        >
          : {currentLang === 'uk' ? 'Онлайн Запис' : 'Rezerwacja Terminu'} :
        </a>
        <a
          href="#faqs"
          onClick={onClose}
          className="hover:underline underline-offset-8"
        >
          : FAQs :
        </a>
      </nav>

      {/* Bottom Info & Language */}
      <div className="border-t border-white/20 pt-6 flex flex-col gap-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span>Język / Мова:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-3 py-1 border transition-all ${
                currentLang === 'pl'
                  ? 'bg-white text-[#0000F2] font-bold border-white'
                  : 'text-white border-white/40'
              }`}
            >
              POLSKI
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-3 py-1 border transition-all ${
                currentLang === 'uk'
                  ? 'bg-white text-[#0000F2] font-bold border-white'
                  : 'text-white border-white/40'
              }`}
            >
              УКРАЇНСЬКА
            </button>
          </div>
        </div>

        <a
          href="tel:+48512145314"
          className="hermes-button hermes-button-secondary w-full py-3 text-xs font-bold gap-2 text-center"
        >
          <Phone className="w-4 h-4" />
          <span>+48 512 145 314</span>
        </a>
      </div>
    </div>
  );
};
