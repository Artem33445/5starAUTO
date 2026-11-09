'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  RefreshCw,
  LogOut,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Car,
  Wrench,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  ExternalLink,
  Activity,
  Layers,
  Check,
  Send,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { WhatsAppIcon, TelegramIcon } from '@/components/SocialIcons';

interface Booking {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  email: string;
  lang?: string;
  car: string | null;
  date: string;
  timeSlot: string;
  services: string;
  totalPrice: number;
  notes: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'REJECTED' | 'DONE';
  adminComment: string | null;
  suggestedDate: string | null;
  suggestedSlot: string | null;
}

const STATUS_CONFIG: Record<
  Booking['status'],
  { label: string; bg: string; text: string; dot: string }
> = {
  PENDING: {
    label: 'В обробці',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
  },
  CONFIRMED: {
    label: 'Підтверджено',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
  },
  RESCHEDULED: {
    label: 'Запропоновано інший час',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    dot: 'bg-blue-500',
  },
  REJECTED: {
    label: 'Відхилено',
    bg: 'bg-red-500/15',
    text: 'text-red-400',
    dot: 'bg-red-500',
  },
  DONE: {
    label: 'Виконано',
    bg: 'bg-teal-500/15',
    text: 'text-teal-400',
    dot: 'bg-teal-500',
  },
};

type StatusFilter = 'ALL' | 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'REJECTED' | 'DONE';

const STATUS_TAB_STYLES: Record<
  StatusFilter,
  {
    active: string;
    inactive: string;
    badgeActive: string;
    badgeInactive: string;
  }
> = {
  ALL: {
    active: 'bg-white/15 text-white border border-white/20 shadow-sm font-semibold',
    inactive: 'bg-[#12141A] text-gray-400 hover:text-white hover:bg-[#1A1D26]',
    badgeActive: 'bg-white/20 text-white',
    badgeInactive: 'bg-black/40 text-gray-400',
  },
  PENDING: {
    active: 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-semibold',
    inactive: 'bg-[#12141A] text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10',
    badgeActive: 'bg-amber-500/30 text-amber-200',
    badgeInactive: 'bg-black/40 text-amber-400/70',
  },
  CONFIRMED: {
    active: 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-semibold',
    inactive: 'bg-[#12141A] text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10',
    badgeActive: 'bg-emerald-500/30 text-emerald-200',
    badgeInactive: 'bg-black/40 text-emerald-400/70',
  },
  RESCHEDULED: {
    active: 'bg-blue-500/25 text-blue-300 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.25)] font-semibold',
    inactive: 'bg-[#12141A] text-blue-400/80 hover:text-blue-300 hover:bg-blue-500/10',
    badgeActive: 'bg-blue-500/30 text-blue-200',
    badgeInactive: 'bg-black/40 text-blue-400/70',
  },
  DONE: {
    active: 'bg-teal-500/25 text-teal-300 border border-teal-500/50 shadow-[0_0_12px_rgba(20,184,166,0.25)] font-semibold',
    inactive: 'bg-[#12141A] text-teal-400/80 hover:text-teal-300 hover:bg-teal-500/10',
    badgeActive: 'bg-teal-500/30 text-teal-200',
    badgeInactive: 'bg-black/40 text-teal-400/70',
  },
  REJECTED: {
    active: 'bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.25)] font-semibold',
    inactive: 'bg-[#12141A] text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10',
    badgeActive: 'bg-rose-500/30 text-rose-200',
    badgeInactive: 'bg-black/40 text-rose-400/70',
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Reschedule Modal State
  const [rescheduleModalBooking, setRescheduleModalBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('11:00');
  const [rescheduleComment, setRescheduleComment] = useState('');
  const [submittingReschedule, setSubmittingReschedule] = useState(false);

  // Reject Modal State
  const [rejectModalBooking, setRejectModalBooking] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [submittingReject, setSubmittingReject] = useState(false);

  // Fetch bookings
  const fetchBookings = useCallback(async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const res = await fetch('/api/manage-rb94x/bookings');
      if (res.status === 401) {
        router.push('/manage-rb94x/login');
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        const normalized: Booking[] = data.bookings.map((b: any) => ({
          ...b,
          status:
            b.status === 'CONFIRMED'
              ? 'CONFIRMED'
              : b.status === 'RESCHEDULED'
              ? 'RESCHEDULED'
              : b.status === 'REJECTED'
              ? 'REJECTED'
              : b.status === 'DONE'
              ? 'DONE'
              : 'PENDING',
        }));
        setBookings(normalized);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(() => {
      fetchBookings(true);
    }, 20000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/manage-rb94x/logout', { method: 'POST' });
      router.push('/manage-rb94x/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Action 1: Confirm Booking
  const handleConfirm = async (id: string) => {
    setUpdatingId(id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'CONFIRMED' } : b))
    );

    try {
      const res = await fetch(`/api/manage-rb94x/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CONFIRM' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        fetchBookings(true);
        alert(data.error || 'Помилка при підтвердженні');
      } else if (data.emailResult?.redirectedTo) {
        alert(`Підтверджено! Увага: оскільки домен ще не підключено в resend.com/domains, Resend надіслав лист на вашу пошту акаунту: ${data.emailResult.redirectedTo}`);
      } else if (data.emailResult?.error) {
        alert(`Заявку підтверджено в базі, але Resend повернув помилку: ${data.emailResult.error.message}`);
      } else {
        alert('Заявку успішно підтверджено! Лист надіслано клієнту.');
      }
    } catch (err) {
      console.error('Confirm error:', err);
      fetchBookings(true);
    } finally {
      setUpdatingId(null);
    }
  };

  // Action 2: Open Reschedule Modal
  const openRescheduleModal = (b: Booking) => {
    setRescheduleModalBooking(b);
    setNewDate(b.suggestedDate || b.date);
    setNewSlot(b.suggestedSlot || b.timeSlot);
    setRescheduleComment(b.adminComment || '');
  };

  // Action 2: Submit Reschedule
  const submitReschedule = async () => {
    if (!rescheduleModalBooking) return;
    setSubmittingReschedule(true);

    try {
      const res = await fetch(`/api/manage-rb94x/bookings/${rescheduleModalBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'RESCHEDULE',
          suggestedDate: newDate,
          suggestedSlot: newSlot,
          adminComment: rescheduleComment.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === rescheduleModalBooking.id
              ? {
                  ...b,
                  status: 'RESCHEDULED',
                  suggestedDate: newDate,
                  suggestedSlot: newSlot,
                  adminComment: rescheduleComment.trim() || null,
                }
              : b
          )
        );
        setRescheduleModalBooking(null);
        if (data.emailResult?.redirectedTo) {
          alert(`Пропозицію збережено! Увага: у тестовому режимі Resend лист надіслано на вашу пошту акаунту: ${data.emailResult.redirectedTo}`);
        } else {
          alert('Пропозицію нового часу успішно надіслано клієнту на Email!');
        }
      } else {
        alert('Помилка при збереженні переносу');
      }
    } catch (err) {
      console.error('Reschedule error:', err);
      alert('Помилка зʼєднання');
    } finally {
      setSubmittingReschedule(false);
    }
  };

  // Action 3: Open Reject Modal
  const openRejectModal = (b: Booking) => {
    setRejectModalBooking(b);
    setRejectReason(b.adminComment || '');
  };

  // Action 3: Submit Rejection
  const submitReject = async () => {
    if (!rejectModalBooking) return;
    setSubmittingReject(true);

    try {
      const res = await fetch(`/api/manage-rb94x/bookings/${rejectModalBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'REJECT',
          adminComment: rejectReason.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === rejectModalBooking.id
              ? {
                  ...b,
                  status: 'REJECTED',
                  adminComment: rejectReason.trim() || null,
                }
              : b
          )
        );
        setRejectModalBooking(null);
        if (data.emailResult?.redirectedTo) {
          alert(`Заявку відхилено! Лист надіслано на пошту акаунту Resend: ${data.emailResult.redirectedTo}`);
        } else {
          alert('Заявку відхилено, клієнту надіслано повідомлення на Email.');
        }
      } else {
        alert('Помилка при відхиленні заявки');
      }
    } catch (err) {
      console.error('Reject error:', err);
      alert('Помилка зʼєднання');
    } finally {
      setSubmittingReject(false);
    }
  };

  // Mark as Done
  const handleMarkDone = async (id: string) => {
    setUpdatingId(id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'DONE' } : b))
    );

    try {
      await fetch(`/api/manage-rb94x/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DONE' }),
      });
    } catch (err) {
      console.error('Mark done error:', err);
      fetchBookings(true);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Ви дійсно бажаєте видалити цю заявку?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/manage-rb94x/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert('Помилка при видаленні заявки');
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
      alert('Помилка підключення');
    } finally {
      setDeletingId(null);
    }
  };

  const cleanPhoneForWhatsApp = (rawPhone: string) => {
    let clean = rawPhone.replace(/\D/g, '');
    if (!clean.startsWith('48') && clean.length === 9) {
      clean = '48' + clean;
    }
    return clean;
  };

  const formatDateTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;
    const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
    const rescheduledCount = bookings.filter((b) => b.status === 'RESCHEDULED').length;
    const doneCount = bookings.filter((b) => b.status === 'DONE').length;
    const totalRevenue = bookings
      .filter((b) => b.status !== 'REJECTED')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    return { total, pendingCount, confirmedCount, rescheduledCount, doneCount, totalRevenue };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (activeFilter !== 'ALL') {
        if (b.status !== activeFilter) return false;
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.email && b.email.toLowerCase().includes(q)) ||
        (b.car && b.car.toLowerCase().includes(q)) ||
        b.date.includes(q) ||
        b.timeSlot.includes(q) ||
        b.services.toLowerCase().includes(q) ||
        (b.notes && b.notes.toLowerCase().includes(q)) ||
        (b.adminComment && b.adminComment.toLowerCase().includes(q))
      );
    });
  }, [bookings, activeFilter, searchQuery]);

  const hoursList = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col font-sans ">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#08090C]/95 backdrop-blur-xl border-b border-white/[0.04] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <Image
                src="/logo-5star.webp"
                alt="5STARAUTO"
                width={36}
                height={36}
                className="object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-wider text-white">5STAR</span>
                <span className="text-lg font-black tracking-wider text-brand-red">AUTO</span>
                <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-brand-red/20 text-brand-red">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider hidden sm:block">
                Модерація записів та Email-підтвердження
              </p>
            </div>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => fetchBookings()}
            disabled={refreshing}
            title="Оновити список"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-xs text-gray-300 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-brand-red' : ''}`} />
            <span className="hidden sm:inline">Оновити</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-xs text-gray-300 hover:text-white transition-all"
          >
            <span className="hidden sm:inline">Сайт</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 hover:text-red-300 transition-all ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Вийти</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-5">
        {/* Top 4 Stats Cards — Neutral Dark with Colored Text, No Top Stripes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Pending (В обробці) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1015] border border-white/[0.04] shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                {stats.pendingCount > 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                )}
                В обробці (Pending)
              </span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{stats.pendingCount}</div>
            <p className="text-[11px] text-gray-400 mt-1">Потребують відповіді майстра</p>
          </div>

          {/* Card 2: Confirmed (Підтверджені) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1015] border border-white/[0.04] shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-semibold tracking-wide">Підтверджені</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {stats.confirmedCount}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Лист з підтвердженням відправлено</p>
          </div>

          {/* Card 3: Rescheduled (Перенесені) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1015] border border-white/[0.04] shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs font-semibold tracking-wide">Перенесені</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">
              {stats.rescheduledCount}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Очікують відповіді на пропозицію</p>
          </div>

          {/* Card 4: Done (Виконано) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1015] border border-white/[0.04] shadow-lg relative overflow-hidden group">
            <div className="flex items-center justify-between text-teal-400 mb-2">
              <span className="text-xs font-semibold tracking-wide">Виконані авто</span>
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-teal-400">
              {stats.doneCount}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Всього заявок: <span className="text-white font-mono">{stats.total}</span>
            </p>
          </div>
        </div>

        {/* Filter and Search Bar — BORDERLESS */}
        <div className="bg-[#0E1015] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук за клієнтом, телефоном, email, авто чи послугою..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#08090C] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-red/50 select-text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-gray-400 font-mono flex items-center gap-1.5 self-end md:self-center">
              <span>Знайдено:</span>
              <span className="text-white font-bold">{filteredBookings.length}</span>
              <span className="text-gray-600">|</span>
              <span className="text-[11px] text-gray-500">
                Оновлено: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {(
              [
                { id: 'ALL', label: 'Всі', count: stats.total },
                { id: 'PENDING', label: 'В обробці', count: stats.pendingCount },
                { id: 'CONFIRMED', label: 'Підтверджені', count: stats.confirmedCount },
                { id: 'RESCHEDULED', label: 'Перенесені', count: stats.rescheduledCount },
                { id: 'DONE', label: 'Виконано', count: stats.doneCount },
                {
                  id: 'REJECTED',
                  label: 'Відхилені',
                  count: bookings.filter((b) => b.status === 'REJECTED').length,
                },
              ] as const
            ).map((tab) => {
              const isActive = activeFilter === tab.id;
              const tabStyle = STATUS_TAB_STYLES[tab.id as StatusFilter] || STATUS_TAB_STYLES.ALL;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as StatusFilter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive ? tabStyle.active : tabStyle.inactive
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? tabStyle.badgeActive : tabStyle.badgeInactive
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bookings List — BORDERLESS */}
        {loading ? (
          <div className="p-16 text-center rounded-2xl bg-[#0E1015]">
            <div className="w-8 h-8 border-2 border-brand-red/30 border-t-brand-red rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-400">Завантаження бази заявок 5STARAUTO...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-[#0E1015]">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center text-gray-500 mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">Заявок не знайдено</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? 'За вашим пошуковим запитом нічого не знайдено. Спробуйте змінити критерії пошуку.'
                : 'Поки що немає заявок у цій категорії.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const statusCfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.PENDING;
              const cleanWhatsAppPhone = cleanPhoneForWhatsApp(b.phone);

              return (
                <div
                  key={b.id}
                  className="p-5 sm:p-6 rounded-2xl shadow-xl transition-all relative overflow-hidden bg-[#0E1015] border border-white/[0.04]"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Column: Details */}
                    <div className="space-y-3 flex-1 min-w-0">
                      {/* Top Row: Date, Status, Created */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Visit Date Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.07] text-white font-bold text-xs tracking-wide">
                          <Calendar className="w-3.5 h-3.5 text-brand-red" />
                          <span>{b.date}</span>
                          <span className="text-gray-500 font-mono">•</span>
                          <Clock className="w-3.5 h-3.5 text-brand-red" />
                          <span>{b.timeSlot}</span>
                        </div>

                        {/* Status badge */}
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                          <span>{statusCfg.label}</span>
                        </div>

                        {/* Language Badge */}
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-0.8 rounded-full text-xs font-bold border ${
                            (b.lang || 'pl') === 'uk'
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                              : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          }`}
                          title={(b.lang || 'pl') === 'uk' ? 'Мова клієнта: Українська (UK)' : 'Język klienta: Polski (PL)'}
                        >
                          <span>{(b.lang || 'pl') === 'uk' ? '🇺🇦 UK' : '🇵🇱 PL'}</span>
                        </div>

                        {/* Created timestamp */}
                        <span className="text-[11px] text-gray-500 font-mono ml-auto lg:ml-0">
                          Створено: {formatDateTime(b.createdAt)}
                        </span>
                      </div>

                      {/* Client Row & Contact Links */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-gray-300 shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white select-text">
                              {b.name}
                            </div>
                            {b.car ? (
                              <div className="text-xs text-gray-400 flex items-center gap-1 select-text">
                                <Car className="w-3 h-3 text-brand-red" />
                                <span>{b.car}</span>
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500 italic">Авто не вказано</div>
                            )}
                          </div>
                        </div>

                        {/* Contacts: Phone, WhatsApp, Telegram, Email */}
                        <div className="flex flex-wrap items-center gap-2 pl-0 sm:pl-3 sm:border-l sm:border-white/10">
                          <a
                            href={`tel:${b.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-gray-200 hover:text-white transition-all select-text"
                          >
                            <Phone className="w-3.5 h-3.5 text-brand-red" />
                            <span>{b.phone}</span>
                          </a>

                          {b.email && (
                            <a
                              href={`mailto:${b.email}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-gray-200 hover:text-white transition-all select-text"
                              title="Надіслати Email клієнту"
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-400" />
                              <span>{b.email}</span>
                            </a>
                          )}

                          <a
                            href={`https://wa.me/${cleanWhatsAppPhone}?text=${encodeURIComponent(
                              `Доброго дня, ${b.name}! СТО 5STARAUTO щодо Вашого запису на ${b.date} о ${b.timeSlot}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Написати у WhatsApp"
                            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all flex items-center justify-center"
                          >
                            <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                          </a>

                          <a
                            href={`https://t.me/+${cleanWhatsAppPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Відкрити в Telegram"
                            className="p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 transition-all flex items-center justify-center"
                          >
                            <TelegramIcon className="w-4 h-4 text-sky-400" />
                          </a>
                        </div>
                      </div>

                      {/* Rescheduled / Rejected Info Callout */}
                      {b.status === 'RESCHEDULED' && (
                        <div className="p-3 rounded-xl bg-blue-500/10 text-xs text-blue-300 space-y-1">
                          <div className="font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              Запропоновано новий час: {b.suggestedDate} о {b.suggestedSlot}
                            </span>
                          </div>
                          {b.adminComment && (
                            <p className="text-gray-300 italic">"{b.adminComment}"</p>
                          )}
                        </div>
                      )}

                      {b.status === 'REJECTED' && b.adminComment && (
                        <div className="p-3 rounded-xl bg-red-500/10 text-xs text-red-300 space-y-1">
                          <span className="font-semibold">Причина відхилення:</span>
                          <p className="text-gray-300 italic">"{b.adminComment}"</p>
                        </div>
                      )}

                      {/* Services & Price */}
                      <div className="bg-[#08090C]/80 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                            <Wrench className="w-3.5 h-3.5 text-brand-red" />
                            <span>Послуги:</span>
                          </div>
                          <div className="text-xs font-bold text-brand-red font-mono bg-brand-red/15 px-2.5 py-0.5 rounded-lg">
                            {b.totalPrice} PLN
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed select-text">
                          {b.services}
                        </p>

                        {/* Customer Symptoms */}
                        {b.notes && (
                          <div className="pt-2 border-t border-white/[0.04] text-xs text-gray-400 select-text">
                            <span className="text-gray-500 font-medium">Симптоми:</span> {b.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Moderation Actions (CONFIRM / RESCHEDULE / REJECT / DONE) */}
                    <div className="flex flex-col gap-2 lg:w-56 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-5 shrink-0">
                      {/* [✅ Підтвердити] */}
                      {b.status !== 'CONFIRMED' && b.status !== 'DONE' && (
                        <button
                          onClick={() => handleConfirm(b.id)}
                          disabled={updatingId === b.id}
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                          <span>Підтвердити (Email)</span>
                        </button>
                      )}

                      {/* [🕒 Запропонувати інший час] */}
                      {b.status !== 'DONE' && (
                        <button
                          onClick={() => openRescheduleModal(b)}
                          disabled={updatingId === b.id}
                          className="w-full py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Інший час (Email)</span>
                        </button>
                      )}

                      {/* [❌ Відхилити] */}
                      {b.status !== 'REJECTED' && b.status !== 'DONE' && (
                        <button
                          onClick={() => openRejectModal(b)}
                          disabled={updatingId === b.id}
                          className="w-full py-2 px-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 hover:text-red-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Відхилити (Email)</span>
                        </button>
                      )}

                      {/* [✅ Позначити як Виконано] */}
                      {b.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleMarkDone(b.id)}
                          disabled={updatingId === b.id}
                          className="w-full py-2 px-3 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Позначити «Виконано»</span>
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        disabled={deletingId === b.id}
                        className="w-full py-1.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-500 hover:text-red-400 text-[11px] flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 mt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Видалити</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal: Reschedule (Запропонувати інший час) */}
      {rescheduleModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1015] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Запропонувати новий час візиту</h3>
              </div>
              <button
                onClick={() => setRescheduleModalBooking(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p>
                Клієнт: <span className="text-white font-bold">{rescheduleModalBooking.name}</span>{' '}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border border-white/10 bg-white/5 ml-1">
                  {(rescheduleModalBooking.lang || 'pl') === 'uk' ? '🇺🇦 UK (Українська)' : '🇵🇱 PL (Polski)'}
                </span>
              </p>
              <p>
                Email для листа:{' '}
                <span className="text-blue-400 font-mono">{rescheduleModalBooking.email}</span>
              </p>
              <p>
                Початковий час:{' '}
                <span className="text-gray-300">
                  {rescheduleModalBooking.date} о {rescheduleModalBooking.timeSlot}
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Нова дата візиту
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Новий час візиту
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {hoursList.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewSlot(slot)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                        newSlot === slot
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-[#161922] text-gray-400 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Коментар майстра до листа клієнту
                </label>
                <textarea
                  rows={3}
                  value={rescheduleComment}
                  onChange={(e) => setRescheduleComment(e.target.value)}
                  placeholder="Наприклад: На 10:00 зайнятий підйомник діагностики, пропонуємо 11:30 або після 14:00..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setRescheduleModalBooking(null)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-gray-300"
              >
                Скасувати
              </button>
              <button
                type="button"
                disabled={submittingReschedule || !newDate}
                onClick={submitReschedule}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                {submittingReschedule ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Надіслати пропозицію на Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reject (Відхилити заявку) */}
      {rejectModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E1015] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Відхилити заявку</h3>
              </div>
              <button
                onClick={() => setRejectModalBooking(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Клієнт: <span className="text-white font-bold">{rejectModalBooking.name}</span>{' '}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border border-white/10 bg-white/5 ml-1">
                {(rejectModalBooking.lang || 'pl') === 'uk' ? '🇺🇦 UK (Українська)' : '🇵🇱 PL (Polski)'}
              </span>{' '}
              ({rejectModalBooking.email})
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Причина або коментар для клієнта (буде надіслано в листі)
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Наприклад: На жаль, у ці дні сервіс перевантажений, або ми тимчасово не обслуговуємо дану модель авто..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setRejectModalBooking(null)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-gray-300"
              >
                Скасувати
              </button>
              <button
                type="button"
                disabled={submittingReject}
                onClick={submitReject}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                {submittingReject ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <X className="w-3.5 h-3.5" />
                )}
                <span>Підтвердити відхилення (Email)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
