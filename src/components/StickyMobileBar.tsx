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
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#F7F4EB] border-t-[3px] border-black px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_0px_#000]"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+48512145314"
          className="w-11 h-11 rounded-lg bg-white border-[2.5px] border-black text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          aria-label="Zadzwoń +48 512 145 314"
          title="Zadzwoń +48 512 145 314"
        >
          <Phone className="w-5 h-5 text-black stroke-[2.5]" />
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-lg bg-[#23E28B] text-black border-[2.5px] border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          aria-label="WhatsApp +48 512 145 314"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0 text-black fill-current" />
        </a>

        {/* Direct Telegram Button */}
        <a
          href="https://t.me/+48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-lg bg-[#5CE1E6] text-black border-[2.5px] border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          aria-label="Telegram +48 512 145 314"
          title="Telegram"
        >
          <TelegramIcon className="w-5 h-5 shrink-0 text-black fill-current" />
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
          className="flex-1 h-11 px-3 rounded-lg bg-[#FFE600] hover:bg-[#FF5E5E] text-black font-heading font-black text-xs uppercase tracking-wider border-[2.5px] border-black flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all truncate"
        >
          <Calculator className="w-4 h-4 shrink-0 stroke-[2.5]" />
          <span className="truncate">
            {currentLang === 'uk' ? 'Розрахунок у PLN' : 'Kalkulator PLN'}
          </span>
        </button>
      </div>
    </div>
  );
};
