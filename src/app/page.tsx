'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { DownloadsSection } from '@/components/DownloadsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { PortalSection } from '@/components/PortalSection';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Footer } from '@/components/Footer';
import { MobileMenu } from '@/components/MobileMenu';
import { StickyMobileBar } from '@/components/StickyMobileBar';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('5star_lang') as Language;
    if (savedLang === 'pl' || savedLang === 'uk') {
      setCurrentLang(savedLang);
      return;
    }

    const browser = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (browser.startsWith('uk') || browser.startsWith('ru') || browser.startsWith('be')) {
      setCurrentLang('uk');
    } else {
      setCurrentLang('pl');
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('5star_lang', lang);
    }
  };

  return (
    <div className="min-h-screen bg-[#0000F2] text-white font-sans selection:bg-[#0000F2] selection:text-white">
      {/* 1:1 Replica of Hermes Marketing Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <main className="w-full">
        {/* Section 1: Hero (.landing-hero) in Hermes Electric Blue */}
        <Hero currentLang={currentLang} />

        {/* Section 2: Platforms / Vehicle Categories (.landing-downloads) in Hermes Electric Blue */}
        <DownloadsSection currentLang={currentLang} />

        {/* Section 3: 6 Features Grid (.landing-features) in Hermes White Paper */}
        <FeaturesSection currentLang={currentLang} />

        {/* Section 4: Portal & Service Packages (.landing-portal) in Hermes White Paper */}
        <PortalSection currentLang={currentLang} />

        {/* Section 5: FAQs with dotted blue borders (#faqs) in Hermes White Paper */}
        <FaqAccordion currentLang={currentLang} />
      </main>

      {/* Section 6: Footer with giant ghost watermark in Hermes White Paper */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Sticky Mobile Converter Bar */}
      <StickyMobileBar
        currentLang={currentLang}
        isMenuOpen={isMobileMenuOpen}
      />
    </div>
  );
}
