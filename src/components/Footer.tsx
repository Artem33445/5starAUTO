'use client';

import React from 'react';
import { Phone, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';
import { Language } from '@/types';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  return (
    <footer className="bg-white text-[#000030] pt-16 pb-12 border-t border-black/10 relative overflow-hidden select-none" id="contact">
      {/* Colossal Ghost Watermark matching Hermes exact styling */}
      <div
        aria-hidden="true"
        className="pointer-events-none w-full text-center select-none overflow-hidden leading-none mb-6 opacity-[0.04]"
      >
        <span className="font-heading font-black text-[18vw] uppercase tracking-tighter text-[#0000F2] block">
          5STAR AUTO
        </span>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-black/10">
          {/* Column 1: Identity & Copyright */}
          <div>
            <span className="font-heading font-black text-2xl uppercase tracking-tight text-[#000030] block mb-2">
              5STAR<span className="text-[#0000F2]">AUTO</span>
            </span>
            <p className="font-sans text-xs text-[#000030]/70 mb-4 leading-relaxed">
              Certyfikowany warsztat samochodowy i stacja diagnostyczna w Poznaniu. Naprawy mechaniczne, elektronika OBD2 oraz wulkanizacja 3D.
            </p>
            <p className="font-mono text-[11px] text-[#000030]/50 uppercase">
              © 2026, 5STAR AUTO Sp. z o.o.<br />
              NIP: 123-456-78-90 • REGON: 987654321
            </p>
          </div>

          {/* Column 2: Standards & Badges */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#0000F2] font-semibold mb-3">
              Standardy & Certyfikaty
            </p>
            <ul className="space-y-2 font-mono text-xs text-[#000030]/80">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0000F2]" />
                <span>Gwarancja 24 Miesiące</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#0000F2]" />
                <span>Certyfikacja Bosch & OEM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#0000F2]" />
                <span>Ekspresowa diagnoza w 30 min</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0000F2]" />
                <span>Poznań, ul. Przykładowa 12</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#0000F2] font-semibold mb-3">
              Pakiety & Usługi
            </p>
            <ul className="space-y-2 font-mono text-xs text-[#000030]/80">
              <li>
                <a href="#downloads" className="hover:text-[#0000F2] transition-colors underline-offset-2 hover:underline">
                  Kategorie Pojazdów
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#0000F2] transition-colors underline-offset-2 hover:underline">
                  6 Filarów Serwisu
                </a>
              </li>
              <li>
                <a href="#portal" className="hover:text-[#0000F2] transition-colors underline-offset-2 hover:underline">
                  Pakiety & Cennik
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#0000F2] transition-colors underline-offset-2 hover:underline">
                  Rezerwacja Terminu
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#0000F2] transition-colors underline-offset-2 hover:underline">
                  Częste Pytania (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div id="location">
            <p className="font-mono text-xs uppercase tracking-wider text-[#0000F2] font-semibold mb-3">
              Kontakt & Wizyta
            </p>
            <p className="font-sans text-xs text-[#000030]/70 mb-3">
              Poniedziałek – Piątek: 08:00 – 19:00<br />
              Sobota: 09:00 – 15:00
            </p>
            <a
              href="tel:+48512145314"
              className="font-mono text-sm font-bold text-[#0000F2] block mb-3 hover:underline"
            >
              +48 512 145 314
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-black/15 flex items-center justify-center text-[#000030] hover:text-[#0000F2] hover:border-[#0000F2] transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://t.me/+48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-black/15 flex items-center justify-center text-[#000030] hover:text-[#0000F2] hover:border-[#0000F2] transition-colors"
                title="Telegram"
              >
                <TelegramIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none border border-black/15 flex items-center justify-center text-[#000030] hover:text-[#0000F2] hover:border-[#0000F2] transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#000030]/60">
          <p>
            Poznań, Polska • Wszystkie prawa zastrzeżone
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Polityka Prywatności</a>
            <span>•</span>
            <a href="#" className="hover:underline">Regulamin</a>
            <span>•</span>
            <button
              type="button"
              onClick={() => onLanguageChange(currentLang === 'pl' ? 'uk' : 'pl')}
              className="text-[#0000F2] font-semibold hover:underline uppercase"
            >
              {currentLang === 'pl' ? 'Змінити мову на Українську' : 'Zmień na Polski'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
