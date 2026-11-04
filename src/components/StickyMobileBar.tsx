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
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#000030] border-t border-white/20 px-3 py-2.5 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+48512145314"
          className="w-10 h-10 bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="Zadzwoń +48 512 145 314"
          title="Zadzwoń"
        >
          <Phone className="w-4 h-4 text-white" />
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
        </a>

        {/* Direct Telegram Button */}
        <a
          href="https://t.me/+48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="Telegram"
          title="Telegram"
        >
          <TelegramIcon className="w-4 h-4 fill-current text-[#00F0FF]" />
        </a>

        {/* Book Now Button */}
        <button
          type="button"
          onClick={() => {
            const calc = document.getElementById('calculator');
            if (calc) {
              calc.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex-1 h-10 px-3 bg-white hover:bg-white/90 text-[#0000F2] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all truncate"
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {currentLang === 'uk' ? 'Запис онлайн' : 'Umów Wizytę'}
          </span>
        </button>
      </div>
    </div>
  );
};
