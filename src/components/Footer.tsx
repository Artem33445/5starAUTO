'use client';

import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
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
    <footer id="contact" className="bg-[#07080d] text-[#eef0f5] pt-16 pb-12 border-t border-[rgba(238,240,245,0.08)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[rgba(238,240,245,0.08)]">
          {/* Column 1: Product info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="text-base font-semibold text-[#eef0f5] tracking-tight">
                5STAR AUTO
              </span>
            </div>
            <p className="text-xs text-[#a3a9b8] leading-relaxed mb-4">
              Certyfikowany serwis mechaniczny i stacja diagnostyczna samochodów osobowych, SUV oraz dostawczych w Poznaniu.
            </p>
            <p className="text-[11px] font-mono text-[#7a8296]">
              © 2026 5STAR AUTO Sp. z o.o.<br />
              NIP: 123-456-78-90 · REGON: 987654321
            </p>
          </div>

          {/* Column 2: Location and hours */}
          <div>
            <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-3">
              Lokalizacja & Godziny
            </div>
            <div className="space-y-2 text-xs text-[#a3a9b8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7a8296] shrink-0 mt-0.5" />
                <span>Poznań, ul. Przykładowa 12</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#7a8296] shrink-0 mt-0.5" />
                <div>
                  <span>Pn – Pt: 08:00 – 19:00</span><br />
                  <span>Sobota: 09:00 – 15:00</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span className="text-[#eef0f5]">Gwarancja 24 miesiące</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-3">
              Nawigacja
            </div>
            <ul className="space-y-2 text-xs text-[#a3a9b8]">
              <li>
                <a href="#services" className="hover:text-[#eef0f5] transition-colors">
                  Zakres usług
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#eef0f5] transition-colors">
                  Cennik pakietów
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#eef0f5] transition-colors">
                  Rezerwacja terminu
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#eef0f5] transition-colors">
                  Pytania i odpowiedzi
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact channels */}
          <div>
            <div className="text-xs font-mono text-[#7a8296] uppercase tracking-wider mb-3">
              Kontakt bezpośredni
            </div>
            <a
              href="tel:+48512145314"
              className="text-base font-medium font-mono text-[#eef0f5] hover:text-[#ffffff] block mb-3"
            >
              +48 512 145 314
            </a>
            <div className="flex items-center gap-2.5">
              <a
                href="https://wa.me/48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] bg-[#11141c] border border-[rgba(238,240,245,0.08)] hover:border-[rgba(238,240,245,0.2)] flex items-center justify-center text-[#a3a9b8] hover:text-[#eef0f5] transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://t.me/+48512145314"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] bg-[#11141c] border border-[rgba(238,240,245,0.08)] hover:border-[rgba(238,240,245,0.2)] flex items-center justify-center text-[#a3a9b8] hover:text-[#eef0f5] transition-colors"
                title="Telegram"
              >
                <TelegramIcon className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] bg-[#11141c] border border-[rgba(238,240,245,0.08)] hover:border-[rgba(238,240,245,0.2)] flex items-center justify-center text-[#a3a9b8] hover:text-[#eef0f5] transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7a8296]">
          <span>Wszelkie prawa zastrzeżone</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onLanguageChange(currentLang === 'pl' ? 'uk' : 'pl')}
              className="text-[#a3a9b8] hover:text-[#eef0f5] transition-colors"
            >
              {currentLang === 'pl' ? 'Змінити на Українську' : 'Przełącz na Polski'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
