'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Введіть пароль адміністратора');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/manage-rb94x/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/manage-rb94x');
        router.refresh();
      } else {
        setError(data.error || 'Невірний пароль');
      }
    } catch (err: any) {
      setError('Помилка підключення до сервера');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0E1015] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Top brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image
                src="/logo-5star.png"
                alt="5STARAUTO"
                width={48}
                height={48}
                className="object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                priority
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-wider text-white">5STAR</span>
                <span className="text-xl font-extrabold tracking-wider text-brand-red">AUTO</span>
              </div>
              <p className="text-[10px] text-gray-400 tracking-widest font-mono uppercase">
                Autoserwis • Poznań
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/15 text-brand-red text-xs font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Панель керування</span>
          </div>

          <h1 className="text-2xl font-bold mt-4 text-white">Вхід для персоналу</h1>
          <p className="text-xs text-gray-400 mt-1">
            Введіть пароль для доступу до бази заявок 5STARAUTO
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 flex items-center gap-2.5 text-xs text-red-400 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Пароль доступу
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Введіть пароль..."
                autoFocus
                className="w-full pl-10 pr-12 py-3 bg-[#08090C] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-red/50 transition-all select-text"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-red-glow disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Увійти в систему</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <a
            href="/"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1"
          >
            ← Повернутися на головну
          </a>
        </div>
      </div>
    </div>
  );
}
