'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { Header } from '@/components/Header';
import { MobileMenu } from '@/components/MobileMenu';
import { Hero } from '@/components/Hero';
import { TrustTicker } from '@/components/TrustTicker';
import { ServicesBento } from '@/components/ServicesBento';
import { QuoteLockCalculator } from '@/components/QuoteLockCalculator';
import { WorkflowProcess } from '@/components/WorkflowProcess';
import { ReviewsShowcase } from '@/components/ReviewsShowcase';
import { FaqAccordion } from '@/components/FaqAccordion';
import { LocationHours } from '@/components/LocationHours';
import { Footer } from '@/components/Footer';
import { StickyMobileBar } from '@/components/StickyMobileBar';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Initialize language from localStorage or browser preferences
  useEffect(() => {
    // 1. Check if user previously selected language manually
    const savedLang = localStorage.getItem('5star_lang') as Language;
    if (savedLang === 'pl' || savedLang === 'uk') {
      setCurrentLang(savedLang);
      return;
    }

    // 2. Auto-detect browser/system language
    const browser = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (browser.startsWith('pl')) {
      setCurrentLang('pl');
    } else if (
      browser.startsWith('uk') ||
      browser.startsWith('ru') ||
      browser.startsWith('be')
    ) {
      setCurrentLang('uk');
    } else {
      // Default for Poland
      setCurrentLang('pl');
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('5star_lang', lang);
    }
  };

  const handleSelectServiceToQuote = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setTimeout(() => {
      const step2 = document.getElementById('calculator-step2');
      const nameInput = document.getElementById('calc-input-name') as HTMLInputElement | null;
      if (step2) {
        step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => nameInput?.focus(), 400);
      } else {
        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-brand-red selection:text-white">
      {/* Sticky Light Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* 100dvh Fullscreen Light Mobile Menu with scroll-lock */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <main>
        {/* Hero Section */}
        <Hero currentLang={currentLang} />

        {/* Live Trust & Services Ticker */}
        <TrustTicker currentLang={currentLang} />

        {/* Services Bento Grid */}
        <ServicesBento
          currentLang={currentLang}
          onSelectServiceToQuote={handleSelectServiceToQuote}
        />

        {/* QuoteLock Interactive Calculator (Real-time PLN tally) */}
        <QuoteLockCalculator
          currentLang={currentLang}
          preselectedServiceId={preselectedServiceId}
        />

        {/* 4-Step Repair Protocol */}
        <WorkflowProcess currentLang={currentLang} />

        {/* 4.9 Google Reviews Showcase */}
        <ReviewsShowcase currentLang={currentLang} />

        {/* FAQ Accordion */}
        <FaqAccordion currentLang={currentLang} />

        {/* Location & Map & Working Hours */}
        <LocationHours currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Fixed Sticky Mobile Converter Bar (Phone + Calculator) */}
      <StickyMobileBar
        currentLang={currentLang}
        isMenuOpen={isMobileMenuOpen}
      />
    </div>
  );
}
