'use client';

import React, { useEffect } from 'react';
import { X, Phone, ArrowRight, MapPin, Clock, Disc, Terminal } from 'lucide-react';
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
      className="fixed inset-0 z-50 bg-[#090915]/95 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto font-sans"
      style={{ height: '100dvh' }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0000F2] flex items-center justify-center font-mono font-bold text-sm text-white">
            5★
          </div>
          <span className="font-heading font-black text-lg text-white">
            5STAR<span className="text-[#00F0FF]">AUTO</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2.5 py-1 rounded-full ${
                currentLang === 'uk' ? 'bg-[#0000F2] text-white font-bold' : 'text-white/60'
              }`}
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2.5 py-1 rounded-full ${
                currentLang === 'pl' ? 'bg-[#0000F2] text-white font-bold' : 'text-white/60'
              }`}
            >
              PL
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2.5 my-auto py-6 font-mono text-sm uppercase tracking-wider" aria-label="Mobile Navigation">
        <a
          href="#services"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <span>{t.nav.services}</span>
          <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
        </a>

        <a
          href="#calculator"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-4 rounded-xl bg-[#0000F2]/25 border border-[#0000F2] text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
            <span>{t.nav.calculator}</span>
          </div>
          <span className="text-xs font-bold text-[#00F0FF] bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
            PLN
          </span>
        </a>

        <a
          href="#wymiana-opon"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Disc className="w-4 h-4 text-[#00FF85]" />
            <span>{t.nav.tires}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-white/40" />
        </a>

        <a
          href="#process"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <span>{t.nav.process}</span>
          <ArrowRight className="w-4 h-4 text-white/40" />
        </a>

        <a
          href="#reviews"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <span>{t.nav.reviews}</span>
          <ArrowRight className="w-4 h-4 text-white/40" />
        </a>

        <a
          href="#contact"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <span>{t.nav.contacts}</span>
          <ArrowRight className="w-4 h-4 text-white/40" />
        </a>
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
        <div className="text-white/60 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>ul. Kazimierza Jarochowskiego 105, Poznań</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <a
            href="tel:+48512145314"
            className="flex items-center justify-center gap-2 py-3 rounded-full bg-white/10 border border-white/15 text-white font-bold"
          >
            <Phone className="w-4 h-4 text-[#00FF85]" />
            <span>{t.nav.callUs}</span>
          </a>

          <a
            href="#calculator"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 py-3 rounded-full hermes-btn-primary text-black font-bold"
          >
            <span>Kalkulator</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
