'use client';

import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface LocationHoursProps {
  currentLang: Language;
}

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/dir//Warsztat+Samochodowy+5starauto.pl+Jarochowskiego+105+60-129+Pozna%C5%84/@52.3852144,16.8826007,17z';

export const LocationHours: React.FC<LocationHoursProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[#06060E] border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00F0FF] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span># STACJA SERWISOWA • POZNAŃ GRUNWALD</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {t.location.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Column */}
          <div className="lg:col-span-5 rounded-2xl hermes-glass p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
                  <span className="text-white font-bold">WARSZTAT OTWARTY</span>
                </div>
                <span className="text-white/40">52.3852° N, 16.8826° E</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-white/50 uppercase block">
                    {t.location.addressLabel}
                  </span>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-bold text-lg text-white hover:text-[#00F0FF] transition-colors mt-0.5 block"
                  >
                    {t.location.addressValue} ↗
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00FF85] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-white/50 uppercase block">
                    {t.location.hoursLabel}
                  </span>
                  <div className="font-mono text-xs sm:text-sm text-white/90 mt-1 space-y-1">
                    <p className="font-bold text-[#00FF85]">{t.location.hoursWeekdays}</p>
                    <p className="text-white/50">{t.location.hoursSaturday}</p>
                    <p className="text-white/50">{t.location.hoursSunday}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-white/50 uppercase block">
                    {t.location.phoneLabel}
                  </span>
                  <a
                    href="tel:+48512145314"
                    className="font-mono font-bold text-lg text-white hover:text-[#00F0FF] transition-colors mt-0.5 block"
                  >
                    +48 512 145 314
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10 mt-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full hermes-btn-primary text-xs uppercase font-bold text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.location.openInGoogleMaps}</span>
              </a>

              <a
                href="tel:+48512145314"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs"
              >
                <Phone className="w-4 h-4 text-[#00F0FF]" />
                <span>{t.location.callNow}</span>
              </a>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden hermes-glass min-h-[380px] flex flex-col border border-white/15">
            <div className="bg-black/60 px-4 py-2.5 flex items-center justify-between border-b border-white/10 font-mono text-xs text-white/60">
              <span>WARSZTAT_GPS_FEED.MAP</span>
              <span className="text-[#00FF85]">● SATELLITE LINK OK</span>
            </div>

            <iframe
              title="5STARAUTO Warsztat Samochodowy Poznan Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4870.966036310496!2d16.8712003!3d52.3797936!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4704458ead3aaebf%3A0x8090cbbf84517146!2sWarsztat%20Samochodowy%205starauto.pl!5e0!3m2!1spl!2spl!4v1698769588559!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', flex: 1, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
