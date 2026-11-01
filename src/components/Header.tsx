'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenMobileMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2.5 sm:py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3 sm:py-4'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
        {/* Brand Logo with Official 5STARAUTO Emblem */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 mr-3 lg:mr-6"
          aria-label="WARSZTAT SAMOCHODOWY 5STARAUTO Poznań"
        >
          <img
            src="/logo-5star.webp"
            alt="WARSZTAT SAMOCHODOWY 5STARAUTO"
            width={48}
            height={38}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            className="w-10 h-8 sm:w-12 sm:h-9 object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-sm"
          />

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-heading font-black tracking-wider text-lg sm:text-xl text-slate-900 whitespace-nowrap">
                5STAR<span className="text-brand-red">AUTO</span>
              </span>
              <span className="inline-flex text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-300 text-amber-700 whitespace-nowrap">
                4.9 ★
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1 whitespace-nowrap">
              Warsztat • Poznań
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0"
          aria-label="Main Navigation"
        >
          <a
            href="#services"
            className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {t.nav.services}
          </a>
          <a
            href="#calculator"
            className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
            <span>{t.nav.calculator}</span>
          </a>
          <a
            href="#wymiana-opon"
            className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {t.nav.tires}
          </a>
          <a
            href="#process"
            className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {t.nav.process}
          </a>
          <a
            href="#reviews"
            className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {t.nav.reviews}
          </a>
          <a
            href="#contact"
            className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            {t.nav.contacts}
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
          {/* Direct Messengers (WhatsApp & Telegram) */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <a
              href="https://wa.me/48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
              aria-label="WhatsApp: +48 512 145 314"
              title="WhatsApp: +48 512 145 314"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="https://t.me/+48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#229ED9] hover:bg-[#1fa1dc] text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
              aria-label="Telegram: +48 512 145 314"
              title="Telegram: +48 512 145 314"
            >
              <TelegramIcon className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Phone Button */}
          <a
            href="tel:+48512145314"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-brand-red/50 text-slate-900 text-xs font-semibold transition-all hover:bg-slate-200 whitespace-nowrap shrink-0"
            aria-label="Zadzwoń +48 512 145 314"
          >
            <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="whitespace-nowrap font-bold">+48 512 145 314</span>
          </a>

          {/* Language Switcher (UA / PL) */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2 py-1 text-xs font-bold rounded transition-all whitespace-nowrap ${
                currentLang === 'uk'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Українська"
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2 py-1 text-xs font-bold rounded transition-all whitespace-nowrap ${
                currentLang === 'pl'
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Polski"
            >
              PL
            </button>
          </div>

          {/* CTA Button */}
          <a
            href="#calculator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-lg bg-brand-red hover:bg-red-700 text-white text-xs font-bold transition-all shadow-red-subtle active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">{t.nav.bookSlot}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </a>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none shrink-0"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
