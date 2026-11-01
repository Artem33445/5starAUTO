import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5STARAUTO Admin | Панель управління автосервісом',
  description: 'Панель записів та клієнтів СТО 5STARAUTO Poznań',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-red selection:text-white">
      {children}
    </div>
  );
}
