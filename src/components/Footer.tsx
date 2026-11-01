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
    <footer className="bg-slate-100 text-slate-600 pt-16 pb-28 lg:pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info with Official Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-5star.png"
                alt="WARSZTAT SAMOCHODOWY 5STARAUTO"
                className="w-10 h-8 object-contain shrink-0"
              />
              <span className="font-heading font-black text-xl text-slate-900">
                5STAR<span className="text-brand-red">AUTO</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {currentLang === 'uk'
                ? "Професійний автосервіс у Познані на Грюнвальді. Чесний ремонт ходової частини, заміна мастила, гальма, кондиціонери та шиномонтаж з гарантією."
                : "Nowoczesny warsztat samochodowy w Poznaniu (Grunwald / Łazarz). Rzetelna mechanika pojazdowa, diagnostyka komputerowa, klimatyzacja i wulkanizacja."}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/5starauto.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-brand-red/50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                aria-label="Instagram @5starauto.pl"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/5STARAUTOPL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-blue-500/50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                aria-label="Facebook 5STARAUTOPL"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-emerald-500/50 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-colors shadow-sm"
                aria-label="WhatsApp +48 512 145 314"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/+48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-[#229ED9]/50 flex items-center justify-center text-slate-600 hover:text-[#229ED9] transition-colors shadow-sm"
                aria-label="Telegram +48 512 145 314"
                title="Telegram"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=5STARAUTO+ul.+Kazimierza+Jarochowskiego+105+60-129+Poznan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-brand-red/50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                aria-label="Google Maps"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4 text-brand-red" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">
              {t.nav.services}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-slate-900 transition-colors">
                  {currentLang === 'uk' ? "Комп'ютерна діагностика" : 'Diagnostyka komputerowa'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-900 transition-colors">
                  {currentLang === 'uk' ? 'Ремонт підвіски' : 'Serwis zawieszenia'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-900 transition-colors">
                  {currentLang === 'uk' ? 'Заміна мастила та фільтрів' : 'Serwis olejowy i filtry'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-900 transition-colors">
                  {currentLang === 'uk' ? 'Кліматизація (R134A)' : 'Serwis klimatyzacji'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-900 transition-colors">
                  {currentLang === 'uk' ? 'Шиномонтаж (комплекс)' : 'Wymiana opon (wulkanizacja)'}
                </a>
              </li>
              <li>
                <a href="#wymiana-opon" className="hover:text-slate-900 transition-colors">
                    {currentLang === 'uk' ? 'Шиномонтаж та балансування' : 'Wymiana opon i wulkanizacja'}
                  </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">
              {currentLang === 'uk' ? 'Навігація' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#calculator" className="hover:text-slate-900 transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-slate-900 transition-colors">
                  {t.nav.process}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-slate-900 transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-slate-900 transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">
                  {t.nav.contacts}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">
              {t.nav.contacts}
            </h4>
            <div className="space-y-3 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>ul. Kazimierza Jarochowskiego 105, 60-129 Poznań</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a href="tel:+48512145314" className="hover:text-brand-red font-bold text-slate-900">
                  +48 512 145 314
                </a>
              </p>
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-1">
                  {currentLang === 'uk' ? 'Мова сайту:' : 'Język strony:'}
                </span>
                <div className="inline-flex bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('uk')}
                    className={`px-2.5 py-1 text-xs font-bold rounded ${
                      currentLang === 'uk' ? 'bg-brand-red text-white' : 'text-slate-600'
                    }`}
                  >
                    Українська
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('pl')}
                    className={`px-2.5 py-1 text-xs font-bold rounded ${
                      currentLang === 'pl' ? 'bg-brand-red text-white' : 'text-slate-600'
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
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} WARSZTAT SAMOCHODOWY 5STARAUTO. {t.footer.rights}
            <div className="text-[10px] text-slate-400 mt-0.5">
              {t.footer.legalNote}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-slate-800 transition-colors">
              {t.footer.gdpr}
            </a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-800 transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
