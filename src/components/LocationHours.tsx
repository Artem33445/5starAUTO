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
    <section id="contact" className="py-16 sm:py-24 bg-neo-bg border-b-[3px] border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] font-mono font-bold text-xs text-black mb-3">
            <span>✱ {t.location.pill}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-black tracking-tight">
            {t.location.title}
          </h2>
        </div>

        {/* Retro Window Dialog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 rounded-lg bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between pb-4 border-b-[2px] border-black">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#23E28B] border-[2px] border-black font-mono font-black text-xs text-black shadow-[2px_2px_0px_#000]">
                  <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                  <span>WARSZTAT CZYNNY PN-PT</span>
                </div>
                <span className="font-mono text-xs font-bold text-black/70">GRUNWALD</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#FFE600] border-[2.5px] border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-black/60 uppercase font-bold block">
                    {t.location.addressLabel}
                  </span>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-black text-base sm:text-lg text-black hover:text-[#FF5E5E] transition-colors mt-0.5 block"
                  >
                    {t.location.addressValue} ↗
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#5CE1E6] border-[2.5px] border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
                  <Clock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-black/60 uppercase font-bold block">
                    {t.location.hoursLabel}
                  </span>
                  <div className="font-mono text-xs sm:text-sm text-black mt-1 space-y-1">
                    <p className="font-black bg-[#FFE600] px-2 py-0.5 rounded border border-black inline-block">
                      {t.location.hoursWeekdays}
                    </p>
                    <p className="text-black/80 font-bold">{t.location.hoursSaturday}</p>
                    <p className="text-black/80 font-bold">{t.location.hoursSunday}</p>
                  </div>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-[#23E28B] border-[2.5px] border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000]">
                  <Phone className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-mono text-[11px] text-black/60 uppercase font-bold block">
                    {t.location.phoneLabel}
                  </span>
                  <a
                    href="tel:+48512145314"
                    className="font-mono font-black text-lg sm:text-xl text-black hover:text-[#FF5E5E] transition-colors mt-0.5 block"
                  >
                    +48 512 145 314
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-[2.5px] border-black/10 mt-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#FFE600] hover:bg-[#FF5E5E] text-black font-heading font-black text-xs uppercase tracking-wider border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
              >
                <Navigation className="w-4 h-4 stroke-[3]" />
                <span>{t.location.openInGoogleMaps}</span>
              </a>

              <a
                href="tel:+48512145314"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-[#F7F4EB] text-black font-mono font-bold text-xs border-[2.5px] border-black shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>{t.location.callNow}</span>
              </a>
            </div>
          </div>

          {/* Map Embed Card with Retro Window Header */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden bg-white border-[3px] border-black min-h-[380px] shadow-[6px_6px_0px_#000] flex flex-col">
            <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between border-b-[3px] border-black font-mono text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5E5E] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#23E28B] border border-black inline-block" />
                <span className="ml-2 uppercase">GOOGLE_MAPS_EMBED_GPS.SYS</span>
              </div>
              <span className="bg-[#23E28B] text-black px-1.5 py-0.2 rounded text-[10px] font-bold">
                52.3852° N
              </span>
            </div>

            <iframe
              title="5STARAUTO Warsztat Samochodowy Poznan Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4870.966036310496!2d16.8712003!3d52.3797936!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4704458ead3aaebf%3A0x8090cbbf84517146!2sWarsztat%20Samochodowy%205starauto.pl!5e0!3m2!1spl!2spl!4v1698769588559!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', flex: 1 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bottom Address Strip */}
            <div className="bg-[#F7F4EB] border-t-[3px] border-black px-4 py-2.5 flex items-center justify-between font-mono text-xs">
              <span className="text-black font-bold truncate">
                5STARAUTO • Jarochowskiego 105, Poznań
              </span>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-black hover:text-[#FF5E5E] inline-flex items-center gap-1 shrink-0 ml-2 underline"
              >
                <span>Nawiguj do celu ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
