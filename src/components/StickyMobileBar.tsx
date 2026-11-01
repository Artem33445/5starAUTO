'use client';

import React from 'react';
import { Phone, Calculator } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface StickyMobileBarProps {
  currentLang: Language;
  isMenuOpen: boolean;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  currentLang,
  isMenuOpen,
}) => {
  const t = translations[currentLang];

  if (isMenuOpen) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] shadow-metal"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+48512145314"
          className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 hover:border-brand-red/50 text-slate-800 flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm"
          aria-label="Zadzwoń +48 512 145 314"
          title="Zadzwoń +48 512 145 314"
        >
          <Phone className="w-4 h-4 text-brand-red shrink-0" />
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm"
          aria-label="WhatsApp +48 512 145 314"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
        </a>

        {/* Direct Telegram Button */}
        <a
          href="https://t.me/+48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-xl bg-[#229ED9] hover:bg-[#1fa1dc] text-white flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-sm"
          aria-label="Telegram +48 512 145 314"
          title="Telegram"
        >
          <TelegramIcon className="w-4 h-4 shrink-0" />
        </a>

        {/* Calculate in PLN Button */}
        <button
          type="button"
          onClick={() => {
            const nameInput = document.getElementById('calc-input-name') as HTMLInputElement | null;
            const phoneInput = document.getElementById('calc-input-phone') as HTMLInputElement | null;
            const step2 = document.getElementById('calculator-step2');

            if (nameInput && !nameInput.value.trim()) {
              nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => nameInput.focus(), 350);
            } else if (phoneInput && phoneInput.value.replace(/\D/g, '').length < 9) {
              phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => phoneInput.focus(), 350);
            } else if (step2) {
              step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex-1 h-11 px-3 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-red-subtle active:scale-95 transition-all truncate"
        >
          <Calculator className="w-4 h-4 shrink-0" />
          <span className="truncate">
            {currentLang === 'uk' ? 'Розрахунок у PLN' : 'Kalkulator PLN'}
          </span>
        </button>
      </div>
    </div>
  );
};
