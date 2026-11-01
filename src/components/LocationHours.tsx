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
    <section id="contact" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-3 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            <span>{t.location.pill}</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            {t.location.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4">
            <div className="space-y-6">
              {/* Address with direct Google Maps link */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
                    {t.location.addressLabel}
                  </span>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-red transition-colors mt-0.5 block group"
                  >
                    {t.location.addressValue}
                    <ExternalLink className="w-3.5 h-3.5 inline-block ml-1.5 text-slate-400 group-hover:text-brand-red" />
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
                    {t.location.hoursLabel}
                  </span>
                  <div className="text-xs sm:text-sm text-slate-700 mt-1 space-y-1">
                    <p className="font-semibold text-slate-900">{t.location.hoursWeekdays}</p>
                    <p className="text-slate-500">{t.location.hoursSaturday}</p>
                    <p className="text-slate-500">{t.location.hoursSunday}</p>
                  </div>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
                    {t.location.phoneLabel}
                  </span>
                  <a
                    href="tel:+48512145314"
                    className="text-base sm:text-lg font-heading font-black text-slate-900 hover:text-brand-red transition-colors mt-0.5 block"
                  >
                    +48 512 145 314
                  </a>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-slate-200 mt-8">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs transition-all shadow-red-subtle active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.location.openInGoogleMaps}</span>
              </a>

              <a
                href="tel:+48512145314"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span>{t.location.callNow}</span>
              </a>
            </div>
          </div>

          {/* Map Embed Card */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 min-h-[380px] relative shadow-sm flex flex-col">
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
            {/* Direct Open in Google Maps strip */}
            <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium truncate">
                5STARAUTO • Jarochowskiego 105, Poznań
              </span>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-red hover:underline inline-flex items-center gap-1 shrink-0 ml-2"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
