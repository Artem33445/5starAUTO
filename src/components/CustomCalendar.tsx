'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Language } from '@/types';

interface CustomCalendarProps {
  value: string; // 'YYYY-MM-DD'
  onChange: (dateStr: string) => void;
  currentLang: Language;
  minDate?: string;
  hasError?: boolean;
}

const MONTH_NAMES = {
  uk: [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
  ],
  pl: [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
  ],
};

const WEEKDAY_NAMES = {
  uk: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
  pl: ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'],
};

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  value,
  onChange,
  currentLang,
  hasError,
}) => {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const todayStr = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  const initialView = useMemo(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m] = value.split('-').map(Number);
      return { year: y, month: m - 1 };
    }
    return { year: today.getFullYear(), month: today.getMonth() };
  }, [value, today]);

  const [viewYear, setViewYear] = useState<number>(initialView.year);
  const [viewMonth, setViewMonth] = useState<number>(initialView.month);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const setToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange(todayStr);
  };

  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const cells: Array<{
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
      isClosed: boolean;
    }> = [];

    // Previous month trailing days
    for (let i = offset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: true,
        isClosed: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cellDate = new Date(viewYear, viewMonth, d);
      const isPast = cellDate < today;
      const dayOfWeek = cellDate.getDay();
      const isClosed = dayOfWeek === 0 || dayOfWeek === 6;

      cells.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: isPast || isClosed,
        isClosed,
      });
    }

    // Next month leading days
    const remaining = (7 - (cells.length % 7)) % 7;
    const totalNeeded = cells.length + remaining < 35 ? 35 - cells.length : remaining;
    for (let d = 1; d <= totalNeeded; d++) {
      const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: true,
        isClosed: false,
      });
    }

    return cells;
  }, [viewYear, viewMonth, value, today, todayStr]);

  const monthLabel = MONTH_NAMES[currentLang][viewMonth];
  const weekdays = WEEKDAY_NAMES[currentLang];

  const formattedSelected = useMemo(() => {
    if (!value) return '';
    try {
      const [y, m, d] = value.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      const dayName = WEEKDAY_NAMES[currentLang][dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1];
      const mName = MONTH_NAMES[currentLang][m - 1];
      return `${d} ${mName} ${y} (${dayName})`;
    } catch {
      return value;
    }
  }, [value, currentLang]);

  return (
    <div
      className={`rounded-xl bg-[#090915] border p-3.5 sm:p-4 text-white transition-all font-mono ${
        hasError ? 'border-[#FF3B30] shadow-[0_0_15px_rgba(255,59,48,0.3)]' : 'border-white/10'
      }`}
    >
      {/* Calendar Header: Month + Year & Nav Arrows */}
      <div className="flex items-center justify-between mb-3 px-1 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#00F0FF]" />
          <span className="font-heading font-bold text-sm sm:text-base text-white">
            {monthLabel} {viewYear}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels (Mon - Sun) */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5 border-b border-white/5 pb-1.5">
        {weekdays.map((w, idx) => (
          <div
            key={w}
            className={`text-[10px] font-bold tracking-wider ${
              idx >= 5 ? 'text-[#FF3B30]' : 'text-white/40'
            }`}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarCells.map((cell, idx) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={`dim-${idx}`}
                className="h-8 sm:h-9 flex items-center justify-center text-xs text-white/20 select-none cursor-default"
              >
                {cell.dayNumber}
              </div>
            );
          }

          if (cell.isDisabled) {
            return (
              <div
                key={`dis-${idx}`}
                title={cell.isClosed ? (currentLang === 'uk' ? 'Вихідний' : 'Nieczynne') : undefined}
                className="h-8 sm:h-9 flex items-center justify-center text-xs text-white/25 select-none cursor-not-allowed line-through"
              >
                {cell.dayNumber}
              </div>
            );
          }

          return (
            <button
              key={`act-${idx}`}
              type="button"
              onClick={() => onChange(cell.dateStr)}
              className={`h-8 sm:h-9 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center relative ${
                cell.isSelected
                  ? 'bg-[#0000F2] text-white shadow-[0_0_15px_rgba(0,0,242,0.8)] border border-white/40 font-black'
                  : cell.isToday
                  ? 'border border-[#00F0FF] text-[#00F0FF] bg-white/5'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cell.dayNumber}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
        <button
          type="button"
          onClick={setToday}
          className="text-[11px] text-[#00F0FF] hover:underline"
        >
          {currentLang === 'uk' ? 'Сьогодні' : 'Dzisiaj'}
        </button>

        {formattedSelected && (
          <span className="text-[11px] text-[#00FF85] font-bold truncate max-w-[200px]">
            {formattedSelected}
          </span>
        )}
      </div>
    </div>
  );
};
