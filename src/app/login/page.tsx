'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Lock, Mail, User, ArrowRight, Loader2, Phone, CheckCircle2 } from 'lucide-react';

export default function LoginDashboard() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        // Redirect to Home after login
        router.push('/');
        router.refresh();
      } else {
        // After register, switch to login
        setIsLogin(true);
        setErrorMsg('');
        setShowSuccessPopup(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans selection:bg-lime-500/30 overflow-hidden relative flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-lime-400 rounded-2xl mb-6 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
            <TrendingUp size={32} strokeWidth={3} className="text-[#0B0F19]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Lagi Lagi <span className="text-lime-400">Saham</span>
          </h1>
          <p className="text-slate-400">
            {isLogin ? 'Masuk ke Dashboard Radar Saham' : 'Daftar untuk akses Radar Saham'}
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#0F1523] border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Subtle gradient border effect on top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-400"></div>

          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 text-sm p-3 rounded-xl mb-6 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 pl-1">Nama Lengkap</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-500" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all placeholder:text-slate-600"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 pl-1">Nomor WhatsApp</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-slate-500" />
                    </div>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all placeholder:text-slate-600"
                      placeholder="08123456789"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400 pl-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all placeholder:text-slate-600"
                  placeholder="anda@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400 pl-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-[#0B0F19] px-6 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
                <>
                  {isLogin ? 'Masuk' : 'Daftar Sekarang'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg('');
              }}
              className="text-lime-400 font-semibold hover:underline"
            >
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F19]/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0F1523] border border-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-lime-500/10 mb-6 border border-lime-500/20 shadow-[0_0_30px_rgba(163,230,53,0.2)]">
              <CheckCircle2 size={40} className="text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Registrasi Berhasil!</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Selamat bergabung di Lagi Lagi Saham. Akun Anda telah aktif, silakan masuk untuk mulai menikmati fitur radar saham.
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-lime-400 hover:bg-lime-500 text-[#0B0F19] px-6 py-3.5 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] hover:-translate-y-1"
            >
              Lanjutkan Masuk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
