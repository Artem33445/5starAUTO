'use client';

import React, { useEffect } from 'react';
import { X, Phone, ArrowRight, MapPin, Clock, Disc } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
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
  const t = translations[currentLang];

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#F7F4EB] flex flex-col justify-between p-4 sm:p-6 overflow-y-auto font-sans"
      style={{ height: '100dvh' }}
    >
      {/* Top Bar inside Menu */}
      <div className="flex items-center justify-between border-b-[3px] border-black pb-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-white border-[2px] border-black rounded shadow-[2px_2px_0px_#000]">
            <img
              src="/logo-5star.webp"
              alt="5STARAUTO"
              className="w-8 h-7 object-contain shrink-0"
            />
          </div>
          <div>
            <div className="font-heading font-black text-lg text-black">
              5STAR<span className="bg-[#FFE600] px-1 ml-0.5 rounded border border-black">AUTO</span>
            </div>
            <div className="font-mono text-[10px] text-black/80 uppercase font-bold">
              POZNAŃ • 4.9 ★
            </div>
          </div>
        </div>

        {/* Language switch + Close */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border-[2px] border-black rounded-lg p-0.5 shadow-[2px_2px_0px_#000]">
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                currentLang === 'uk'
                  ? 'bg-[#FFE600] text-black border border-black'
                  : 'text-black/70'
              }`}
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                currentLang === 'pl'
                  ? 'bg-[#FFE600] text-black border border-black'
                  : 'text-black/70'
              }`}
            >
              PL
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#FF5E5E] border-[2px] border-black shadow-[2px_2px_0px_#000] text-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Zamknij menu"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Navigation Links - Chunky Brutalist Blocks */}
      <nav className="flex flex-col gap-2.5 my-auto py-4" aria-label="Mobile Navigation">
        <a
          href="#services"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-lg bg-white border-[2.5px] border-black text-base font-heading font-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
        >
          <span>{t.nav.services}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </a>

        <a
          href="#calculator"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-lg bg-[#FFE600] border-[2.5px] border-black text-base font-heading font-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E5E] border border-black animate-pulse" />
            <span>{t.nav.calculator}</span>
          </div>
          <span className="text-xs font-mono font-black text-black bg-white px-2 py-0.5 rounded border border-black">
            PLN
          </span>
        </a>

        <a
          href="#wymiana-opon"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-lg bg-white border-[2.5px] border-black text-base font-heading font-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
        >
          <div className="flex items-center gap-2">
            <Disc className="w-4 h-4 text-black stroke-[2.5]" />
            <span>{t.nav.tires}</span>
          </div>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </a>

        <a
          href="#process"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-lg bg-white border-[2.5px] border-black text-base font-heading font-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
        >
          <span>{t.nav.process}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </a>

        <a
          href="#reviews"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-lg bg-white border-[2.5px] border-black text-base font-heading font-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
        >
          <span>{t.nav.reviews}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </a>

        <a
          href="#contact"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-lg bg-white border-[2.5px] border-black text-base font-heading font-black text-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
        >
          <span>{t.nav.contacts}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </a>
      </nav>

      {/* Bottom Info & Fast Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-4 border-t-[3px] border-black">
        <div className="font-mono text-xs text-black font-bold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FF5E5E] shrink-0" />
          <span>ul. Jarochowskiego 105, Poznań</span>
        </div>
        <div className="font-mono text-xs text-black font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#23E28B] shrink-0" />
          <span>Pn-Pt: 09:00 - 19:00 (Sob-Nd: nieczynne)</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <a
            href="tel:+48512145314"
            className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white border-[2.5px] border-black text-black font-mono font-black text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
          >
            <Phone className="w-4 h-4 stroke-[2.5]" />
            <span>{t.nav.callUs}</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 rounded-lg bg-[#23E28B] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
              aria-label="Direct WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0 text-black fill-current" />
            </a>

            <a
              href="https://t.me/+48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 rounded-lg bg-[#5CE1E6] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
              aria-label="Direct Telegram"
            >
              <TelegramIcon className="w-5 h-5 shrink-0 text-black fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
