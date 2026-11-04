import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://5starauto.pl';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '5STARAUTO | Warsztat Samochodowy Poznań Grunwald | Mechanika, Serwis, Wulkanizacja',
  description:
    'Profesjonalny warsztat samochodowy 5STARAUTO w Poznaniu (ul. Kazimierza Jarochowskiego 105). Precyzyjna diagnostyka komputerowa, mechanika pojazdowa, klimatyzacja, wulkanizacja, rozrządy, sprzęgła. Tel: +48 512 145 314',
  keywords: [
    'warsztat samochodowy Poznań',
    'mechanik Poznań Grunwald',
    'autoserwis Poznań Jarochowskiego',
    '5STARAUTO Poznań',
    'wymiana oleju Poznań',
    'serwis klimatyzacji Poznań',
    'wulkanizacja Poznań',
    'sprawdzenie auta przed zakupem Poznań',
    'diagnostyka komputerowa Poznań',
  ],
  authors: [{ name: '5STARAUTO Poznań' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-5star.webp', type: 'image/png' },
    ],
    apple: [{ url: '/logo-5star.webp', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: '5STARAUTO | Warsztat Samochodowy Poznań Grunwald',
    description:
      "WARSZTAT SAMOCHODOWY 5STARAUTO. Obsługa samochodów osobowych wszystkich marek w uczciwych cenach. Poznań, ul. Jarochowskiego 105. Tel: +48 512 145 314",
    url: siteUrl,
    siteName: '5STARAUTO Warsztat Samochodowy',
    locale: 'pl_PL',
    alternateLocale: ['uk_UA'],
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'WARSZTAT SAMOCHODOWY 5STARAUTO Poznań - ul. Jarochowskiego 105',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5STARAUTO | Warsztat Samochodowy Poznań',
    description:
      "Zajmujemy się obsługą samochodów osobowych wszystkich marek. Poznań, ul. Kazimierza Jarochowskiego 105. Tel: +48 512 145 314",
    images: ['/opengraph-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#090915',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: '5STARAUTO Warsztat Samochodowy',
    description: 'Niezależny warsztat samochodowy w Poznaniu (Grunwald / Łazarz). Diagnostyka, zawieszenie, klimatyzacja, rozrządy, wulkanizacja, mechanika.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Kazimierza Jarochowskiego 105',
      addressLocality: 'Poznań',
      postalCode: '60-129',
      addressRegion: 'Wielkopolskie',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3920,
      longitude: 16.8926,
    },
    telephone: '+48 512 145 314',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '250',
    },
  };

  return (
    <html lang="pl" className="light">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo-5star.webp" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-brand-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
