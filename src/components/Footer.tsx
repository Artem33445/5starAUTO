'use client';

import React from 'react';
import { Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange }) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#05050C] text-white pt-16 pb-24 lg:pb-16 border-t border-white/10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#0000F2] flex items-center justify-center font-mono font-bold text-sm text-white shadow-[0_0_12px_rgba(0,0,242,0.8)] border border-white/20">
                5★
              </div>
              <span className="font-heading font-black text-xl text-white">
                5STAR<span className="text-[#00F0FF]">AUTO</span>
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
              {currentLang === 'uk'
                ? "Професійний автосервіс у Познані на Грюнвальді. Чесний ремонт ходової частини, заміна мастила, гальма, кондиціонери та шиномонтаж з офіційною гарантією."
                : "Nowoczesny warsztat samochodowy w Poznaniu (Grunwald / Łazarz). Rzetelna mechanika pojazdowa, diagnostyka komputerowa, klimatyzacja i wulkanizacja."}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/5starauto.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/5STARAUTOPL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://t.me/+48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#00F0FF] mb-4 uppercase tracking-wider">
              {t.nav.services}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-white/60">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  &gt; Diagnostyka OBD-II
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  &gt; Serwis olejowy i filtry
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  &gt; Serwis zawieszenia i hamulce
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  &gt; Serwis klimatyzacji R134A
                </a>
              </li>
              <li>
                <a href="#wymiana-opon" className="hover:text-white transition-colors">
                  &gt; Wymiana opon 12-19″
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#00FF85] mb-4 uppercase tracking-wider">
              {currentLang === 'uk' ? 'Навігація' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-white/60">
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  &gt; {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  &gt; {t.nav.process}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  &gt; {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  &gt; {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  &gt; {t.nav.contacts}
                </a>
              </li>
            </ul>
          </div>

          {/* Station Details */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white mb-4 uppercase tracking-wider">
              {t.nav.contacts}
            </h4>
            <div className="space-y-3 font-mono text-xs text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <span>ul. Kazimierza Jarochowskiego 105, 60-129 Poznań</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00FF85] shrink-0" />
                <a href="tel:+48512145314" className="hover:text-white font-bold text-white">
                  +48 512 145 314
                </a>
              </p>

              {/* Language Switch */}
              <div className="pt-2">
                <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('uk')}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                      currentLang === 'uk' ? 'bg-[#0000F2] text-white font-bold' : 'text-white/60'
                    }`}
                  >
                    Українська
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('pl')}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                      currentLang === 'pl' ? 'bg-[#0000F2] text-white font-bold' : 'text-white/60'
                    }`}
                  >
                    Polski
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} 5STARAUTO Poznań. All service systems operational.
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-white transition-colors">
              {t.footer.gdpr}
            </a>
            <span>•</span>
            <a href="#contact" className="hover:text-white transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
