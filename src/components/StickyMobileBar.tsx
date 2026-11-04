'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { Language } from '@/types';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface StickyMobileBarProps {
  currentLang: Language;
  isMenuOpen: boolean;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  currentLang,
  isMenuOpen,
}) => {
  if (isMenuOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#07080d]/95 backdrop-blur-md border-t border-[rgba(238,240,245,0.08)] px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+48512145314"
          className="w-10 h-10 rounded-control bg-[#11141c] border border-[rgba(238,240,245,0.08)] text-[#eef0f5] flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="Zadzwoń"
          title="Zadzwoń"
        >
          <Phone className="w-4 h-4 text-[#a3a9b8]" />
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-control bg-[#11141c] border border-[rgba(238,240,245,0.08)] text-[#a3a9b8] flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current text-[#10b981]" />
        </a>

        {/* Direct Telegram Button */}
        <a
          href="https://t.me/+48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-control bg-[#11141c] border border-[rgba(238,240,245,0.08)] text-[#a3a9b8] flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="Telegram"
          title="Telegram"
        >
          <TelegramIcon className="w-4 h-4 fill-current text-[#60a5fa]" />
        </a>

        {/* Book appointment button */}
        <button
          type="button"
          onClick={() => {
            const calc = document.getElementById('calculator');
            if (calc) {
              calc.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="unslop-btn-primary flex-1 h-10 text-xs font-medium"
        >
          <Calendar className="w-3.5 h-3.5 text-[#0b0d14]" />
          <span>{currentLang === 'uk' ? 'Записатися' : 'Umów wizytę'}</span>
        </button>
      </div>
    </div>
  );
};
