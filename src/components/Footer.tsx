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
    <footer className="bg-black text-white pt-16 pb-28 lg:pb-16 border-t-[3px] border-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info with Official Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-white border-[2.5px] border-black rounded-lg shadow-[3px_3px_0px_#FFE600]">
                <img
                  src="/logo-5star.webp"
                  alt="WARSZTAT SAMOCHODOWY 5STARAUTO"
                  className="w-10 h-8 object-contain shrink-0"
                />
              </div>
              <span className="font-heading font-black text-2xl text-white">
                5STAR<span className="bg-[#FFE600] text-black px-1.5 ml-1 rounded border border-black">AUTO</span>
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6 font-medium">
              {currentLang === 'uk'
                ? "Професійний автосервіс у Познані на Грюнвальді. Чесний ремонт ходової частини, заміна мастила, гальма, кондиціонери та шиномонтаж з офіційною гарантією."
                : "Nowoczesny warsztat samochodowy w Poznaniu (Grunwald / Łazarz). Rzetelna mechanika pojazdowa, diagnostyka komputerowa, klimatyzacja i wulkanizacja."}
            </p>

            {/* Social Icons with Neo Tactile Boxes */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/5starauto.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#FFE600] text-black border-[2px] border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label="Instagram @5starauto.pl"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 stroke-[2.5]" />
              </a>
              <a
                href="https://www.facebook.com/5STARAUTOPL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#5CE1E6] text-black border-[2px] border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label="Facebook 5STARAUTOPL"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 stroke-[2.5]" />
              </a>
              <a
                href="https://wa.me/48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#23E28B] text-black border-[2px] border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label="WhatsApp +48 512 145 314"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-black fill-current" />
              </a>
              <a
                href="https://t.me/+48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#5CE1E6] text-black border-[2px] border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label="Telegram +48 512 145 314"
                title="Telegram"
              >
                <TelegramIcon className="w-4 h-4 text-black fill-current" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=5STARAUTO+ul.+Kazimierza+Jarochowskiego+105+60-129+Poznan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#FF5E5E] text-black border-[2px] border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                aria-label="Google Maps"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-black text-sm text-[#FFE600] mb-4 uppercase tracking-wider">
              {t.nav.services}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-white/80">
              <li>
                <a href="#services" className="hover:text-[#FFE600] transition-colors">
                  &gt; {currentLang === 'uk' ? "Комп'ютерна діагностика" : 'Diagnostyka komputerowa'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FFE600] transition-colors">
                  &gt; {currentLang === 'uk' ? 'Ремонт підвіски' : 'Serwis zawieszenia'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FFE600] transition-colors">
                  &gt; {currentLang === 'uk' ? 'Заміна мастила та фільтрів' : 'Serwis olejowy i filtry'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FFE600] transition-colors">
                  &gt; {currentLang === 'uk' ? 'Кліматизація (R134A)' : 'Serwis klimatyzacji'}
                </a>
              </li>
              <li>
                <a href="#wymiana-opon" className="hover:text-[#FFE600] transition-colors">
                  &gt; {currentLang === 'uk' ? 'Шиномонтаж та балансування' : 'Wymiana opon i wulkanizacja'}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-black text-sm text-[#5CE1E6] mb-4 uppercase tracking-wider">
              {currentLang === 'uk' ? 'Навігація' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-white/80">
              <li>
                <a href="#calculator" className="hover:text-[#5CE1E6] transition-colors">
                  &gt; {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#5CE1E6] transition-colors">
                  &gt; {t.nav.process}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#5CE1E6] transition-colors">
                  &gt; {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#5CE1E6] transition-colors">
                  &gt; {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#5CE1E6] transition-colors">
                  &gt; {t.nav.contacts}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-black text-sm text-[#23E28B] mb-4 uppercase tracking-wider">
              {t.nav.contacts}
            </h4>
            <div className="space-y-3 font-mono text-xs text-white/90">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF5E5E] shrink-0 mt-0.5" />
                <span>ul. Kazimierza Jarochowskiego 105, 60-129 Poznań</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#23E28B] shrink-0" />
                <a href="tel:+48512145314" className="hover:text-[#23E28B] font-bold text-white">
                  +48 512 145 314
                </a>
              </p>
              <div className="pt-3 border-t border-white/20">
                <span className="text-[11px] text-white/60 block mb-2 font-mono">
                  {currentLang === 'uk' ? 'Мова інтерфейсу:' : 'Język interfejsu:'}
                </span>
                <div className="inline-flex bg-white/10 border-[2px] border-white rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('uk')}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded transition-colors ${
                      currentLang === 'uk' ? 'bg-[#FFE600] text-black' : 'text-white hover:text-[#FFE600]'
                    }`}
                  >
                    Українська
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('pl')}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded transition-colors ${
                      currentLang === 'pl' ? 'bg-[#FFE600] text-black' : 'text-white hover:text-[#FFE600]'
                    }`}
                  >
                    Polski
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t-[2px] border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/70 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} WARSZTAT SAMOCHODOWY 5STARAUTO POZNAŃ. {t.footer.rights}
            <div className="text-[10px] text-white/50 mt-1">
              {t.footer.legalNote}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-[#FFE600] transition-colors">
              {t.footer.gdpr}
            </a>
            <span>✦</span>
            <a href="#contact" className="hover:text-[#FFE600] transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
