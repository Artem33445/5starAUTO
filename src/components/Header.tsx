'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, Zap, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
          isScrolled
            ? 'bg-[#090915]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,242,0.18)]'
            : 'bg-[#101026]/75 backdrop-blur-md border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Left: Brand Identity (Hermes Agent Style) */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#0000F2] flex items-center justify-center text-white font-mono font-black text-sm shadow-[0_0_15px_rgba(0,0,242,0.8)] border border-white/30 group-hover:scale-105 transition-transform">
            5★
          </div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold tracking-tight text-base sm:text-lg text-white">
              5STAR<span className="text-[#00F0FF] ml-0.5">AUTO</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse" />
              <span>AGENT v2.6</span>
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links (Hermes style) */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-wider text-white/70"
          aria-label="Main Navigation"
        >
          <a
            href="#services"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>{t.nav.services}</span>
          </a>
          <a
            href="#calculator"
            className="hover:text-white transition-colors flex items-center gap-1.5 text-white/90"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span>{t.nav.calculator}</span>
          </a>
          <a
            href="#wymiana-opon"
            className="hover:text-white transition-colors"
          >
            <span>{t.nav.tires}</span>
          </a>
          <a
            href="#process"
            className="hover:text-white transition-colors"
          >
            <span>{t.nav.process}</span>
          </a>
          <a
            href="#reviews"
            className="hover:text-white transition-colors"
          >
            <span>{t.nav.reviews}</span>
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors"
          >
            <span>{t.nav.contacts}</span>
          </a>
        </nav>

        {/* Right Actions: Phone + Language + Primary CTA Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Direct Phone */}
          <a
            href="tel:+48512145314"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>+48 512 145 314</span>
          </a>

          {/* Language Switcher */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('uk')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                currentLang === 'uk'
                  ? 'bg-[#0000F2] text-white font-bold shadow-[0_0_10px_rgba(0,0,242,0.6)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('pl')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                currentLang === 'pl'
                  ? 'bg-[#0000F2] text-white font-bold shadow-[0_0_10px_rgba(0,0,242,0.6)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              PL
            </button>
          </div>

          {/* Hermes Style Primary White CTA Button */}
          <a
            href="#calculator"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full hermes-btn-primary text-xs uppercase tracking-wider font-bold shrink-0"
          >
            <span>{t.nav.bookSlot}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Hamburger (Mobile) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
            aria-label="Open mobile menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
