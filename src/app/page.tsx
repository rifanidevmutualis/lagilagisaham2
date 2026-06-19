'use client';
import React, { useState, useEffect } from 'react';
import { TrendingUp, Send, Download, Lock, CheckCircle, ShieldAlert, BookOpen, BarChart2, Target, User, LogOut, Calculator, X, Percent, Star } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('mingguan');
  const [unlockedStocks, setUnlockedStocks] = useState<string[]>([]);
  const [stocksData, setStocksData] = useState<any[]>([]);
  const [modulesData, setModulesData] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingStocks, setIsLoadingStocks] = useState(true);
  const [isLoadingModules, setIsLoadingModules] = useState(true);
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [newsData, setNewsData] = useState<any[]>([]);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('auth_token'));
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStocksData(data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoadingStocks(false));
      
      fetch('/api/modules')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setModulesData(data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoadingModules(false));
      
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNewsData(data);
      })
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
          0% { stroke-dashoffset: 1000; opacity: 0; }
          10% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          opacity: 0;
          animation: drawLine 2.5s ease-out forwards;
        }
        @keyframes drawCandle {
          0% { stroke-dashoffset: 300; opacity: 0; }
          10% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-candle {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          opacity: 0;
          animation: drawCandle 0.8s ease-out forwards;
        }
        .candle-bull { stroke: #10b981; }
        .candle-bear { stroke: #f43f5e; }
        .glow-bull { filter: drop-shadow(0 0 8px rgba(16,185,129,0.7)); }
        .glow-bear { filter: drop-shadow(0 0 8px rgba(244,63,94,0.7)); }
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* --- NEWS TICKER --- */}
      {newsData.length > 0 && (
        <div className="bg-lime-400 text-[#0B0F19] overflow-hidden whitespace-nowrap py-2.5 border-b border-lime-500 relative z-50 flex">
          <div className="flex animate-marquee w-max">
            {/* Double the content for seamless loop */}
            {[...newsData, ...newsData].map((news, i) => (
              <span key={i} className="inline-flex items-center mx-6 font-bold text-sm tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#0B0F19] mr-4 opacity-70"></span>
                <a href={news.link} target="_blank" rel="noreferrer" className="hover:underline">
                  {news.title}
                </a>
              </span>
            ))}
          </div>
        </div>
      )}

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
            <button
              onClick={() => setShowCalcModal(true)}
              className="flex items-center gap-2 text-sm font-semibold bg-slate-800/50 hover:bg-slate-800 px-3 sm:px-4 py-2 rounded-full transition-colors border border-slate-700/50 hover:border-lime-400/50"
            >
              <Calculator size={16} className="text-lime-400" /> <span className="hidden sm:inline">Kalkulator</span>
            </button>
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

          {/* Animasi Chart Candlestick */}
          <div className="w-full max-w-4xl mx-auto mb-12 h-48 sm:h-72 md:h-80 relative">
            <svg viewBox="0 -80 800 330" className="w-full h-full drop-shadow-2xl overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="800" y2="0" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* Candlesticks */}
              {[
                { x: 20, type: 'bull', open: 220, close: 180, high: 160, low: 230 },
                { x: 60, type: 'bear', open: 180, close: 195, high: 170, low: 205 },
                { x: 100, type: 'bull', open: 195, close: 150, high: 140, low: 210 },
                { x: 140, type: 'bull', open: 150, close: 110, high: 90, low: 160 },
                { x: 180, type: 'bear', open: 110, close: 140, high: 100, low: 150 },
                { x: 220, type: 'bear', open: 140, close: 155, high: 130, low: 165 },
                { x: 260, type: 'bull', open: 155, close: 120, high: 100, low: 165 },
                { x: 300, type: 'bull', open: 120, close: 80, high: 60, low: 130 },
                { x: 340, type: 'bear', open: 80, close: 105, high: 70, low: 115 },
                { x: 380, type: 'bear', open: 105, close: 115, high: 95, low: 125 },
                { x: 420, type: 'bull', open: 115, close: 90, high: 80, low: 130 },
                { x: 460, type: 'bear', open: 90, close: 105, high: 80, low: 120 },
                { x: 500, type: 'bull', open: 105, close: 60, high: 40, low: 115 },
                { x: 540, type: 'bull', open: 60, close: 30, high: 10, low: 80 },
                { x: 580, type: 'bear', open: 30, close: 50, high: 20, low: 65 },
                { x: 620, type: 'bull', open: 50, close: 10, high: -10, low: 60 },
                { x: 660, type: 'bull', open: 10, close: -20, high: -40, low: 20 },
                { x: 700, type: 'bear', open: -20, close: 0, high: -30, low: 15 },
                { x: 740, type: 'bull', open: 0, close: -40, high: -60, low: 10 },
                { x: 780, type: 'bull', open: -40, close: -90, high: -110, low: -20 },
              ].map((c, i) => {
                const isBull = c.type === 'bull';
                const colorClass = isBull ? 'candle-bull glow-bull' : 'candle-bear glow-bear';
                const delay = `${i * 0.1}s`;
                return (
                  <g key={i}>
                    {/* Wick */}
                    <line x1={c.x} y1={isBull ? c.low : c.high} x2={c.x} y2={isBull ? c.high : c.low} className={`animate-candle ${colorClass}`} strokeWidth="3" strokeLinecap="round" style={{ animationDelay: delay }} />
                    {/* Body */}
                    <line x1={c.x} y1={c.open} x2={c.x} y2={c.close} className={`animate-candle ${colorClass}`} strokeWidth="16" strokeLinecap="round" style={{ animationDelay: delay }} />
                  </g>
                );
              })}

              {/* Moving Average Line */}
              <path
                d="M 0 220 Q 80 180, 160 140 T 320 100 T 480 100 T 640 20 T 800 -80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-draw drop-shadow-[0_0_12px_rgba(163,230,53,0.8)]"
                style={{ animationDelay: '1.5s' }}
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
            {isLoadingStocks ? (
              // Skeleton Loaders
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="h-8 w-24 bg-slate-800 rounded-lg mb-2"></div>
                      <div className="h-4 w-32 bg-slate-800 rounded-md"></div>
                    </div>
                    <div className="h-6 w-20 bg-slate-800 rounded-full"></div>
                  </div>
                  <div className="h-16 w-full bg-slate-800 rounded-lg mb-6"></div>
                  <div className="space-y-3">
                    <div className="flex justify-between"><div className="h-4 w-20 bg-slate-800 rounded"></div><div className="h-4 w-16 bg-slate-800 rounded"></div></div>
                    <div className="flex justify-between"><div className="h-4 w-24 bg-slate-800 rounded"></div><div className="h-4 w-16 bg-slate-800 rounded"></div></div>
                    <div className="flex justify-between"><div className="h-4 w-20 bg-slate-800 rounded"></div><div className="h-4 w-16 bg-slate-800 rounded"></div></div>
                  </div>
                </div>
              ))
            ) : stocksData.filter(s => s.type === activeTab).length > 0 ? (
              stocksData.filter(s => s.type === activeTab).map((stock) => (
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
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center text-slate-500 py-10 bg-[#0B0F19] rounded-2xl border border-slate-800 border-dashed">
                Belum ada saham di radar {activeTab}.
              </div>
            )}
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
            {isLoadingModules ? (
              // Skeleton Loaders for Modules
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-[#0F1523] p-8 rounded-3xl border border-slate-800 animate-pulse flex flex-col h-full">
                  <div className="w-14 h-14 bg-slate-800 rounded-2xl mb-6"></div>
                  <div className="h-6 w-3/4 bg-slate-800 rounded-lg mb-4"></div>
                  <div className="space-y-2 mb-8 flex-grow">
                    <div className="h-4 w-full bg-slate-800 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                    <div className="h-4 w-4/6 bg-slate-800 rounded"></div>
                  </div>
                  <div className="h-12 w-full bg-slate-800 rounded-xl mt-auto"></div>
                </div>
              ))
            ) : modulesData.length > 0 ? (
              modulesData.map((mod) => {
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
              })
            ) : (
              <div className="col-span-1 md:col-span-3 text-center text-slate-500 py-10 bg-[#0F1523] rounded-3xl border border-slate-800 border-dashed">
                Belum ada modul yang ditambahkan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- EPIK 3.5: TESTIMONI CUAN --- */}
      <section className="py-24 relative overflow-hidden bg-[#0F1523]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-lime-400/10 text-lime-400 text-sm font-semibold rounded-full mb-4 border border-lime-400/20">
              💬 Testimoni Member
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Bukti Nyata Profit Bersama</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Lihat bagaimana ratusan member kami telah membuktikan sendiri hasil dari analisa dan modul eksklusif grup kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimoni 1 */}
            <div className="bg-[#0B0F19] rounded-3xl overflow-hidden border border-slate-800 hover:border-lime-400/50 transition-all duration-300 group shadow-lg">
              <div className="aspect-[4/3] bg-slate-800 relative">
                <img src="/testi-1.jpg" alt="Testimoni 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/1e293b/a3e635?text=Upload+Foto+testi-1.jpg" }} />
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-lime-400 fill-lime-400" />)}
                </div>
                <p className="text-slate-300 italic mb-4">"Berkat sinyal BBCA kemarin, saya bisa cuan 15% dalam 2 hari. Mantap banget analisanya!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">A</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Andi Setiawan</h4>
                    <p className="text-xs text-lime-400">Member VIP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimoni 2 */}
            <div className="bg-[#0B0F19] rounded-3xl overflow-hidden border border-slate-800 hover:border-lime-400/50 transition-all duration-300 group shadow-lg md:-translate-y-4">
              <div className="aspect-[4/3] bg-slate-800 relative">
                <img src="/testi-2.jpg" alt="Testimoni 2" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/1e293b/a3e635?text=Upload+Foto+testi-2.jpg" }} />
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-lime-400 fill-lime-400" />)}
                </div>
                <p className="text-slate-300 italic mb-4">"Awalnya ragu, tapi setelah ikut arahan cut loss dan entry ulang di BRPT, portofolio saya akhirnya hijau lagi."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">B</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Budi Santoso</h4>
                    <p className="text-xs text-lime-400">Trader Pemula</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimoni 3 */}
            <div className="bg-[#0B0F19] rounded-3xl overflow-hidden border border-slate-800 hover:border-lime-400/50 transition-all duration-300 group shadow-lg">
              <div className="aspect-[4/3] bg-slate-800 relative">
                <img src="/testi-3.jpg" alt="Testimoni 3" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/1e293b/a3e635?text=Upload+Foto+testi-3.jpg" }} />
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-lime-400 fill-lime-400" />)}
                </div>
                <p className="text-slate-300 italic mb-4">"Modul belajarnya sangat mudah dipahami. Sekarang saya sudah berani trading mandiri tanpa nunggu sinyal terus."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">C</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Citra Kirana</h4>
                    <p className="text-xs text-lime-400">Member Alumni</p>
                  </div>
                </div>
              </div>
            </div>
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

      {/* CALCULATOR HUB MODAL */}
      {showCalcModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F19]/80 backdrop-blur-sm px-4">
          <div className="bg-[#0F1523] w-full max-w-2xl border border-slate-800 rounded-3xl p-6 relative shadow-2xl animate-fade-in">
            <button 
              onClick={() => setShowCalcModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                <Calculator className="text-lime-400" /> Calculator Hub
              </h3>
              <p className="text-slate-400 text-sm">Pilih alat bantu hitung untuk memaksimalkan cuan dan meminimalkan risiko Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/calculator/dividend" className="group bg-[#0B0F19] border border-slate-800 hover:border-lime-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1 block">
                <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Percent size={24} className="text-lime-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">Kalkulator Dividen</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hitung secara instan berapa banyak potensi dividen yang akan Anda dapatkan dari total lot yang Anda punya.
                </p>
              </a>

              <a href="/calculator/risk" className="group bg-[#0B0F19] border border-slate-800 hover:border-rose-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1 block">
                <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={24} className="text-rose-500" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">Risk Calculator</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hitung batas Stop Loss aman Anda dan Position Sizing yang ideal agar akun trading Anda tidak hancur berantakan.
                </p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}