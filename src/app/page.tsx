'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { PackagesSection } from '@/components/PackagesSection';
import { BookingCalculator } from '@/components/BookingCalculator';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { MobileMenu } from '@/components/MobileMenu';
import { StickyMobileBar } from '@/components/StickyMobileBar';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string }>({
    name: 'Standard',
    price: '350 zł',
  });

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

  const handleSelectPackage = (name: string, price: string) => {
    setSelectedPackage({ name, price });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedPackage({ name: serviceName, price: 'od 120 zł' });
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-[#eef0f5] font-sans selection:bg-[#2563eb] selection:text-white">
      {/* Quiet top header */}
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
        {/* Hero Section: Asymmetric split with live diagnostic bay preview */}
        <Hero currentLang={currentLang} />

        {/* Services & Capabilities: 6 deliberate mechanical services */}
        <ServicesSection
          currentLang={currentLang}
          onSelectService={handleSelectService}
        />

        {/* Service Packages & Pricing */}
        <PackagesSection
          currentLang={currentLang}
          onSelectPackage={handleSelectPackage}
        />

        {/* Interactive Booking Calculator & Custom Calendar */}
        <BookingCalculator
          currentLang={currentLang}
          selectedPackageName={selectedPackage.name}
          selectedPackagePrice={selectedPackage.price}
        />

        {/* FAQ Accordion */}
        <FaqSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Quiet Sticky Mobile Converter Bar */}
      <StickyMobileBar
        currentLang={currentLang}
        isMenuOpen={isMobileMenuOpen}
      />
    </div>
  );
}
