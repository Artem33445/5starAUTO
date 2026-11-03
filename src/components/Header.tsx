'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, Zap } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-150 border-b-[3px] border-black ${
        isScrolled
          ? 'bg-[#F7F4EB] py-2.5 shadow-[0_4px_0px_#000]'
          : 'bg-[#F7F4EB] py-3.5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
        {/* Brand Logo - Neo-Brutalist Badge */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 mr-2 lg:mr-6"
          aria-label="WARSZTAT SAMOCHODOWY 5STARAUTO Poznań"
        >
          <div className="p-1 sm:p-1.5 bg-white border-[2.5px] border-black rounded-lg shadow-[3px_3px_0px_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#000] transition-all">
            <img
              src="/logo-5star.webp"
              alt="5STARAUTO"
              width={42}
              height={32}
              className="w-8 h-7 sm:w-10 sm:h-8 object-contain"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-heading font-extrabold tracking-tight text-lg sm:text-xl text-black">
                5STAR<span className="bg-[#FFE600] px-1 ml-0.5 border-[2px] border-black rounded shadow-[2px_2px_0px_#000]">AUTO</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#23E28B] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
                4.9 ★
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-black/80 font-bold mt-1">
              POZNAŃ • UL. JAROCHOWSKIEGO 105
            </span>
          </div>
        </a>

        {/* Desktop Navigation - Chunky Brutalist Links */}
        <nav
          className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 font-heading font-bold text-xs uppercase tracking-wider"
          aria-label="Main Navigation"
        >
          <a
            href="#services"
            className="px-2.5 py-1.5 rounded-lg border-[2px] border-transparent hover:border-black hover:bg-[#FFE600] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            {t.nav.services}
          </a>
          <a
            href="#calculator"
            className="px-2.5 py-1.5 rounded-lg border-[2px] border-black bg-white shadow-[3px_3px_0px_#000] hover:bg-[#5CE1E6] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF5E5E] border border-black" />
            <span>{t.nav.calculator}</span>
          </a>
          <a
            href="#wymiana-opon"
            className="px-2.5 py-1.5 rounded-lg border-[2px] border-transparent hover:border-black hover:bg-[#23E28B] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            {t.nav.tires}
          </a>
          <a
            href="#process"
            className="px-2.5 py-1.5 rounded-lg border-[2px] border-transparent hover:border-black hover:bg-[#B886FF] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            {t.nav.process}
          </a>
          <a
            href="#reviews"
            className="px-2.5 py-1.5 rounded-lg border-[2px] border-transparent hover:border-black hover:bg-[#FFE600] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            {t.nav.reviews}
          </a>
          <a
            href="#contact"
            className="px-2.5 py-1.5 rounded-lg border-[2px] border-transparent hover:border-black hover:bg-[#5CE1E6] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            {t.nav.contacts}
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
          {/* Direct Messengers */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <a
              href="https://wa.me/48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[#23E28B] hover:bg-[#1bc678] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] flex items-center justify-center transition-all"
              aria-label="WhatsApp: +48 512 145 314"
              title="WhatsApp: +48 512 145 314"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 text-black fill-current" />
            </a>

            <a
              href="https://t.me/+48512145314"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[#5CE1E6] hover:bg-[#4bc7cc] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] flex items-center justify-center transition-all"
              aria-label="Telegram: +48 512 145 314"
              title="Telegram: +48 512 145 314"
            >
              <TelegramIcon className="w-4 h-4 shrink-0 text-black fill-current" />
            </a>
          </div>

          {/* Phone Button */}
          <a
            href="tel:+48512145314"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border-[2.5px] border-black text-black font-mono text-xs font-bold shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all whitespace-nowrap shrink-0"
            aria-label="Zadzwoń +48 512 145 314"
          >
            <Phone className="w-3.5 h-3.5 text-black shrink-0" />
            <span>+48 512 145 314</span>
          </a>

          {/* Language Switcher (UA / PL) - Physical Push Buttons */}
          <div className="flex items-center bg-white border-[2.5px] border-black rounded-lg p-0.5 shadow-[3px_3px_0px_#000] shrink-0">
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2 py-1 text-xs font-mono font-bold rounded transition-all whitespace-nowrap ${
                currentLang === 'uk'
                  ? 'bg-[#FFE600] text-black border-[2px] border-black shadow-[1px_1px_0px_#000]'
                  : 'text-black/70 hover:text-black border-[2px] border-transparent'
              }`}
              title="Українська"
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2 py-1 text-xs font-mono font-bold rounded transition-all whitespace-nowrap ${
                currentLang === 'pl'
                  ? 'bg-[#FFE600] text-black border-[2px] border-black shadow-[1px_1px_0px_#000]'
                  : 'text-black/70 hover:text-black border-[2px] border-transparent'
              }`}
              title="Polski"
            >
              PL
            </button>
          </div>

          {/* CTA Button */}
          <a
            href="#calculator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-lg bg-[#FF5E5E] text-black border-[2.5px] border-black text-xs font-heading font-black uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all whitespace-nowrap shrink-0"
          >
            <span>{t.nav.bookSlot}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] text-black focus:outline-none shrink-0"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};
