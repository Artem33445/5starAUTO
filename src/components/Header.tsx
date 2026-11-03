'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  ArrowRight,
  Menu,
  Wrench,
  Disc,
  Calculator,
  ShieldCheck,
  Star,
  MapPin,
  Sparkles,
  Droplet,
} from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState('hero');
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'wymiana-opon', 'calculator', 'process', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. MOBILE TOP BAR (< lg screens)
          ───────────────────────────────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#F7F4EB] border-b-[3px] border-black py-3 px-4 shadow-[0_4px_0px_#000]">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Droplet Accent */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFE600] border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] spring-bounce">
              <img
                src="/logo-5star.webp"
                alt="5STARAUTO"
                className="w-7 h-6 object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-black text-lg text-black leading-none">
                5STAR<span className="bg-[#FFE600] px-1 ml-0.5 rounded border border-black text-sm">AUTO</span>
              </span>
              <div className="font-mono text-[9px] text-black/70 font-bold">
                POZNAŃ • 4.9 ★
              </div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            {/* Language Switch */}
            <div className="flex items-center bg-white border-[2px] border-black rounded-lg p-0.5 shadow-[2px_2px_0px_#000]">
              <button
                type="button"
                onClick={() => onLanguageChange('uk')}
                className={`px-2 py-0.5 text-xs font-mono font-bold rounded transition-all ${
                  currentLang === 'uk' ? 'bg-[#FFE600] text-black border border-black' : 'text-black/60'
                }`}
              >
                UA
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('pl')}
                className={`px-2 py-0.5 text-xs font-mono font-bold rounded transition-all ${
                  currentLang === 'pl' ? 'bg-[#FFE600] text-black border border-black' : 'text-black/60'
                }`}
              >
                PL
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="p-2 rounded-lg bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] text-black"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. RADICAL DESKTOP VERTICAL SIDEBAR DOCK (>= lg screens)
          ───────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed top-0 bottom-0 left-0 w-72 xl:w-80 z-40 bg-[#F7F4EB] border-r-[3px] border-black flex-col justify-between p-6 shadow-[5px_0px_0px_#000] overflow-y-auto">
        {/* Top: Brand Identity with Liquid Droplet Badge */}
        <div>
          <a
            href="#hero"
            className="group block mb-6 focus:outline-none"
            aria-label="WARSZTAT 5STARAUTO POZNAŃ"
          >
            <div className="flex items-center gap-3">
              {/* Interactive Liquid Droplet Morphing Emblem */}
              <div className="w-14 h-14 bg-[#FFE600] border-[3px] border-black liquid-shape flex items-center justify-center shadow-[4px_4px_0px_#000] group-hover:scale-110 spring-bounce shrink-0">
                <img
                  src="/logo-5star.webp"
                  alt="5STARAUTO"
                  className="w-10 h-8 object-contain"
                />
              </div>

              <div>
                <div className="font-heading font-black text-2xl text-black leading-none tracking-tight">
                  5STAR<span className="bg-[#FF5E5E] text-black px-1.5 ml-1 rounded border-[2px] border-black text-lg">AUTO</span>
                </div>
                <div className="font-mono text-[10px] text-black font-extrabold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                  <span>POZNAŃ</span>
                  <span>✦</span>
                  <span className="bg-[#23E28B] px-1 rounded border border-black">4.9 ★</span>
                </div>
              </div>
            </div>
          </a>

          {/* Live Workshop Status Droplet Card */}
          <div className="mb-6 p-3 bg-white border-[2.5px] border-black rounded-lg shadow-[3px_3px_0px_#000] spring-bounce">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#23E28B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#23E28B] border border-black" />
                </span>
                <span className="font-mono text-xs font-black uppercase text-black">
                  STANOWISKO: WOLNE
                </span>
              </div>
              <Droplet className="w-4 h-4 text-[#23E28B] fill-current animate-drip" />
            </div>
            <p className="font-mono text-[10px] text-black/70 font-bold mt-1">
              Dzisiaj od ręki: diagnostyka, olej, opony
            </p>
          </div>

          {/* Vertical Navigation Pill Stack */}
          <nav className="space-y-2 font-heading font-extrabold text-xs uppercase tracking-wider">
            <a
              href="#services"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border-[2.5px] border-black spring-bounce ${
                activeSection === 'services'
                  ? 'bg-[#23E28B] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5'
                  : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 stroke-[2.5]" />
                <span>{t.nav.services}</span>
              </div>
              <span className="font-mono text-[10px]">01</span>
            </a>

            <a
              href="#wymiana-opon"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border-[2.5px] border-black spring-bounce ${
                activeSection === 'wymiana-opon'
                  ? 'bg-[#5CE1E6] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5'
                  : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#5CE1E6]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Disc className="w-4 h-4 stroke-[2.5]" />
                <span>{t.nav.tires}</span>
              </div>
              <span className="font-mono text-[10px]">02</span>
            </a>

            <a
              href="#calculator"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border-[2.5px] border-black spring-bounce ${
                activeSection === 'calculator'
                  ? 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5'
                  : 'bg-[#FFE600]/80 text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 stroke-[2.5]" />
                <span>{t.nav.calculator}</span>
              </div>
              <span className="font-mono text-[10px] bg-black text-[#FFE600] px-1 rounded">PLN</span>
            </a>

            <a
              href="#process"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border-[2.5px] border-black spring-bounce ${
                activeSection === 'process'
                  ? 'bg-[#B886FF] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5'
                  : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#B886FF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>{t.nav.process}</span>
              </div>
              <span className="font-mono text-[10px]">03</span>
            </a>

            <a
              href="#reviews"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border-[2.5px] border-black spring-bounce ${
                activeSection === 'reviews'
                  ? 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5'
                  : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 fill-black stroke-black" />
                <span>{t.nav.reviews}</span>
              </div>
              <span className="font-mono text-[10px]">04</span>
            </a>

            <a
              href="#contact"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border-[2.5px] border-black spring-bounce ${
                activeSection === 'contact'
                  ? 'bg-[#FF5E5E] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5'
                  : 'bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-[#FF5E5E]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 stroke-[2.5]" />
                <span>{t.nav.contacts}</span>
              </div>
              <span className="font-mono text-[10px]">05</span>
            </a>
          </nav>
        </div>

        {/* Bottom Section: Phone, Language & Messengers */}
        <div className="pt-6 border-t-[3px] border-black space-y-3">
          {/* Direct Phone Call Card */}
          <a
            href="tel:+48512145314"
            className="p-3 bg-white hover:bg-[#23E28B] border-[2.5px] border-black rounded-lg shadow-[3px_3px_0px_#000] flex items-center justify-between spring-bounce group text-black block"
          >
            <div>
              <div className="font-mono text-[10px] text-black/70 font-bold uppercase">
                ZADZWOŃ DO MAJSTRA
              </div>
              <div className="font-mono font-black text-sm text-black">
                +48 512 145 314
              </div>
            </div>
            <div className="w-8 h-8 rounded bg-[#FFE600] border-[2px] border-black flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 stroke-[3]" />
            </div>
          </a>

          {/* Social Messengers & Language Deck */}
          <div className="flex items-center justify-between gap-2">
            {/* WhatsApp + Telegram Droplets */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#23E28B] text-black border-[2px] border-black shadow-[2px_2px_0px_#000] flex items-center justify-center spring-bounce"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-black fill-current" />
              </a>

              <a
                href="https://t.me/+48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#5CE1E6] text-black border-[2px] border-black shadow-[2px_2px_0px_#000] flex items-center justify-center spring-bounce"
                title="Telegram"
              >
                <TelegramIcon className="w-5 h-5 text-black fill-current" />
              </a>
            </div>

            {/* Language Switch */}
            <div className="flex items-center bg-white border-[2.5px] border-black rounded-lg p-0.5 shadow-[2px_2px_0px_#000]">
              <button
                type="button"
                onClick={() => onLanguageChange('uk')}
                className={`px-3 py-1 font-mono text-xs font-black rounded transition-all ${
                  currentLang === 'uk'
                    ? 'bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000]'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                UA
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('pl')}
                className={`px-3 py-1 font-mono text-xs font-black rounded transition-all ${
                  currentLang === 'pl'
                    ? 'bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000]'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                PL
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
