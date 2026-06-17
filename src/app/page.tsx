'use client';
import React, { useState, useEffect } from 'react';
import { TrendingUp, Send, Download, Lock, CheckCircle, ShieldAlert, BookOpen, BarChart2, Target, User, LogOut } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('mingguan');
  const [unlockedStocks, setUnlockedStocks] = useState<string[]>([]);
  const [stocksData, setStocksData] = useState<any[]>([]);
  const [modulesData, setModulesData] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('auth_token'));
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => setStocksData(data))
      .catch(err => console.error(err));
    fetch('/api/modules')
      .then(res => res.json())
      .then(data => setModulesData(data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleUnlock = (ticker: string) => {
    const isLoggedIn = document.cookie.includes('auth_token');
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    if (!unlockedStocks.includes(ticker)) {
      setUnlockedStocks(prev => [...prev, ticker]);
    }
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isLoggedIn = document.cookie.includes('auth_token');
    if (!isLoggedIn) {
      e.preventDefault();
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans selection:bg-lime-500/30 overflow-x-hidden">
      {/* CSS Animasi untuk Chart & Pulse */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes drawLine {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 2.5s ease-out forwards;
        }
        .primary-btn:hover {
          box-shadow: 0 0 25px rgba(163, 230, 53, 0.4);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}} />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-lime-400 text-[#0B0F19] p-1.5 rounded-lg">
              <TrendingUp size={20} strokeWidth={3} />
            </div>
            Lagi Lagi <span className="text-lime-400">Saham</span>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/lagilagisaham"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-full transition-colors border border-slate-700/50 hover:border-lime-400/50"
            >
              Masuk Grup <Send size={16} className="text-lime-400" />
            </a>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-full transition-colors border border-rose-500/20"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold bg-lime-400/10 text-lime-400 hover:bg-lime-400 hover:text-[#0B0F19] px-4 py-2 rounded-full transition-colors border border-lime-400/20"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </header>

      {/* --- EPIK 1: HERO SECTION & ANIMASI CHART --- */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 px-4 sm:px-6 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-400/10 text-lime-400 font-medium text-sm mb-6 border border-lime-400/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
            </span>
            Komunitas Saham Berkembang di Indonesia
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Belajar Saham Simpel, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-lime-400">
              Cuan Konsisten.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Dapatkan analisa teknikal harian, edukasi market, dan bocoran saham potensial secara <strong className="text-white">GRATIS</strong> langsung di smartphone Anda.
          </p>

          {/* Animasi Chart */}
          <div className="w-full max-w-lg mx-auto mb-10 h-32 sm:h-40 relative">
            <svg viewBox="0 0 400 150" className="w-full h-full drop-shadow-2xl overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="400" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* Trend Line (Bullish) - Neon Theme */}
              <path
                d="M 0 130 C 40 130, 60 90, 100 110 C 140 130, 160 60, 200 80 C 240 100, 260 30, 300 50 C 340 70, 360 10, 400 20"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw drop-shadow-[0_0_12px_rgba(163,230,53,0.6)]"
              />

              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bef264" /> {/* lime-300 */}
                  <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
                </linearGradient>
              </defs>
            </svg>
          </div>

          <a
            href="#telegram"
            className="group primary-btn relative inline-flex items-center justify-center gap-3 bg-lime-400 hover:bg-lime-500 text-[#0B0F19] px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <Send size={24} className="group-hover:animate-bounce" />
            Gabung Komunitas Telegram
            {/* Efek pulse halus di belakang tombol */}
            <span className="absolute -inset-1 bg-lime-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></span>
          </a>
          <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-1">
            <ShieldAlert size={14} /> 100% Gratis. Tanpa biaya langganan.
          </p>
        </div>
      </section>

      {/* --- EPIK 2: WATCHLIST (TEASER) --- */}
      <section className="py-20 bg-[#0F1523] border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Radar Saham Pilihan</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Intip sedikit analisa dari tim Lagi Lagi Saham. Bergabung ke grup untuk melihat Target Price (TP) dan Stop Loss (SL) secara lengkap.
            </p>
          </div>

          {/* TABS */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-12">
            <button
              onClick={() => setActiveTab('mingguan')}
              className={`px-5 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${activeTab === 'mingguan' ? 'bg-lime-400 text-[#0B0F19] shadow-[0_0_15px_rgba(163,230,53,0.4)]' : 'bg-[#0B0F19] text-slate-400 border border-slate-800 hover:border-lime-400/50 hover:text-white'}`}
            >
              Mingguan (Fast/Scalp)
            </button>
            <button
              onClick={() => setActiveTab('bulanan')}
              className={`px-5 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${activeTab === 'bulanan' ? 'bg-lime-400 text-[#0B0F19] shadow-[0_0_15px_rgba(163,230,53,0.4)]' : 'bg-[#0B0F19] text-slate-400 border border-slate-800 hover:border-lime-400/50 hover:text-white'}`}
            >
              Bulanan (Swing)
            </button>
          </div>

          {/* KONTEN TAB: DINAMIS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in">
            {stocksData.filter(s => s.type === activeTab).map((stock) => (
              <div key={stock.id} className="bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 hover:border-lime-500/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-wider">{stock.ticker}</h3>
                    <span className="text-xs text-slate-400">{stock.name}</span>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full flex items-center gap-1 border ${stock.trendColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                    <TrendingUp size={12} className={stock.trend === 'Sideways' || stock.trend === 'Konsolidasi' ? 'rotate-90' : ''} /> {stock.trend}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-6 border-b border-slate-800 pb-4">
                  "{stock.analysis}"
                </p>
                <div className="space-y-3 relative group select-none">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Entry Area</span>
                    <span className="font-semibold text-white">{stock.entryArea}</span>
                  </div>
                  <div className={`flex justify-between text-sm transition-all duration-500 ${unlockedStocks.includes(stock.ticker) ? '' : 'blur-sm opacity-60'}`}>
                    <span className="text-slate-500">Target Price (TP)</span>
                    <span className="font-semibold text-lime-400">{stock.targetPrice}</span>
                  </div>
                  <div className={`flex justify-between text-sm transition-all duration-500 ${unlockedStocks.includes(stock.ticker) ? '' : 'blur-sm opacity-60'}`}>
                    <span className="text-slate-500">Stop Loss (SL)</span>
                    <span className="font-semibold text-rose-400">{stock.stopLoss}</span>
                  </div>
                  {!unlockedStocks.includes(stock.ticker) && (
                    <div
                      onClick={() => handleUnlock(stock.ticker)}
                      className="absolute inset-0 top-6 flex items-center justify-center bg-[#0B0F19]/60 backdrop-blur-[1px] rounded-lg cursor-pointer hover:bg-[#0B0F19]/20 transition-all z-10"
                    >
                      <div className="flex items-center gap-2 bg-[#0F1523] px-3 py-1.5 rounded-full border border-slate-700 group-hover:border-lime-400 transition-colors shadow-lg">
                        <Lock size={14} className="text-lime-400" />
                        <span className="text-xs font-semibold text-lime-400">Buka Info</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://t.me/lagilagisaham"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-all border border-slate-700 hover:border-lime-400"
            >
              <Lock size={18} className="text-lime-400" />
              Buka Semua Watchlist di Telegram
            </a>
          </div>
        </div>
      </section>

      {/* --- EPIK 3: DOWNLOAD MODUL / BOXES E-BOOK --- */}
      <section className="py-24 relative overflow-hidden bg-[#0B0F19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-lime-400/10 text-lime-400 text-sm font-semibold rounded-full mb-4 border border-lime-400/20">
              🎁 Akses Terbuka
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Download Modul Belajar</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Unduh materi PDF gratis di bawah ini yang telah disusun secara sistematis agar Anda bisa mandiri mencari cuan di pasar modal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modulesData.map((mod) => {
              const IconComponent = mod.iconName === 'BarChart2' ? BarChart2 : mod.iconName === 'Target' ? Target : BookOpen;
              return (
                <div key={mod.id} className="bg-[#0F1523] p-8 rounded-3xl border border-slate-800 hover:border-lime-400/50 transition-all duration-300 group flex flex-col h-full hover:-translate-y-1 shadow-lg shadow-black/50">
                  <div className="w-14 h-14 bg-[#0B0F19] rounded-2xl flex items-center justify-center border border-slate-700 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <IconComponent size={28} className="text-lime-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors">{mod.title}</h3>
                  <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                    {mod.description}
                  </p>
                  <a
                    href={mod.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#0B0F19] border border-slate-700 group-hover:bg-lime-400 group-hover:text-[#0B0F19] group-hover:border-lime-400 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <Download size={18} />
                    Akses Modul
                  </a>
                </div>
              );
            })}
            {modulesData.length === 0 && <div className="col-span-3 text-center text-slate-500 py-10">Belum ada modul yang ditambahkan.</div>}
          </div>
        </div>
      </section>

      {/* --- EPIK 4: FOOTER & FINAL CTA --- */}
      <footer id="telegram" className="bg-[#0B0F19] pt-20 pb-10 border-t border-slate-800/80 relative">
        <div className="absolute inset-0 bg-lime-900/5 mix-blend-screen pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Jangan Trading Sendirian di Pasar yang Ganas.</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan trader lainnya. Diskusikan arah market hari ini, saling berbagi analisa, dan raih profit bersama.
          </p>

          <a
            href="https://t.me/lagilagisaham"
            target="_blank"
            rel="noopener noreferrer"
            className="group primary-btn relative inline-flex items-center justify-center gap-3 bg-lime-400 hover:bg-lime-500 text-[#0B0F19] px-10 py-5 rounded-full text-xl font-extrabold transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_-10px_rgba(163,230,53,0.5)] w-full sm:w-auto mb-16"
          >
            <Send size={28} className="group-hover:animate-bounce" />
            Gabung Grup Telegram — GRATIS!
          </a>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-500">
              <TrendingUp size={18} /> Lagi Lagi Saham
            </div>
            <p className="text-slate-600 text-sm">
              &copy; 2026 Lagi Lagi Saham. Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}