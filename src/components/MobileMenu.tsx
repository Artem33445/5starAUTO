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
      className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto"
      style={{ height: '100dvh' }}
    >
      {/* Top Bar inside Menu */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo-5star.webp"
            alt="5STARAUTO"
            className="w-10 h-8 object-contain shrink-0"
          />
          <div>
            <div className="font-heading font-black text-lg text-slate-900">
              5STAR<span className="text-brand-red">AUTO</span>
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Poznań • 4.9 ★
            </div>
          </div>
        </div>

        {/* Language switch + Close */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                currentLang === 'uk'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                currentLang === 'pl'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              PL
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            aria-label="Zamknij menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 my-auto py-6" aria-label="Mobile Navigation">
        <a
          href="#services"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-semibold text-slate-900 hover:border-brand-red/40 transition-all shadow-sm"
        >
          <span>{t.nav.services}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="#calculator"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-xl bg-red-50/70 border border-red-200 text-lg font-semibold text-slate-900 transition-all shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span>{t.nav.calculator}</span>
          </div>
          <span className="text-xs font-bold text-brand-red bg-red-100 px-2 py-0.5 rounded">
            PLN
          </span>
        </a>

        <a
          href="#wymiana-opon"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-semibold text-slate-900 hover:border-brand-red/40 transition-all shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <Disc className="w-5 h-5 text-brand-red" />
            <span>{t.nav.tires}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="#process"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-semibold text-slate-900 hover:border-brand-red/40 transition-all shadow-sm"
        >
          <span>{t.nav.process}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="#reviews"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-semibold text-slate-900 hover:border-brand-red/40 transition-all shadow-sm"
        >
          <span>{t.nav.reviews}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="#contact"
          onClick={handleLinkClick}
          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-semibold text-slate-900 hover:border-brand-red/40 transition-all shadow-sm"
        >
          <span>{t.nav.contacts}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </a>
      </nav>

      {/* Bottom Info & Fast Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
          <span>ul. Kazimierza Jarochowskiego 105, Poznań</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" />
          <span>Pn-Pt: 09:00 - 19:00 (Sob-Nd: nieczynne)</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <a
            href="tel:+48512145314"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold text-sm hover:border-brand-red transition-all shadow-sm"
          >
            <Phone className="w-4 h-4 text-brand-red" />
            <span>{t.nav.callUs}</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all active:scale-95 shadow-sm"
              aria-label="Direct WhatsApp: +48 512 145 314"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
            </a>

            <a
              href="https://t.me/+48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3.5 rounded-xl bg-[#229ED9] hover:bg-[#1fa1dc] text-white transition-all active:scale-95 shadow-sm"
              aria-label="Direct Telegram: +48 512 145 314"
              title="Telegram"
            >
              <TelegramIcon className="w-5 h-5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
