'use client';

import React from 'react';
import { Phone, Calculator, Sparkles } from 'lucide-react';
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
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#090915]/90 backdrop-blur-xl border-t border-white/10 px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] shadow-[0_-10px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+48512145314"
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="Zadzwoń +48 512 145 314"
          title="Zadzwoń +48 512 145 314"
        >
          <Phone className="w-5 h-5 text-white" />
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="WhatsApp +48 512 145 314"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0 fill-current text-[#25D366]" />
        </a>

        {/* Direct Telegram Button */}
        <a
          href="https://t.me/+48512145314"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shrink-0 active:scale-95 transition-all"
          aria-label="Telegram +48 512 145 314"
          title="Telegram"
        >
          <TelegramIcon className="w-5 h-5 shrink-0 fill-current text-[#00F0FF]" />
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
          className="flex-1 h-11 px-4 rounded-full bg-[#0000F2] hover:bg-[#0000d6] text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/20 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,242,0.4)] active:scale-95 transition-all truncate"
        >
          <Sparkles className="w-4 h-4 shrink-0 text-[#00F0FF]" />
          <span className="truncate">
            {currentLang === 'uk' ? 'Розрахунок у PLN' : 'Kalkulator PLN'}
          </span>
        </button>
      </div>
    </div>
  );
};
