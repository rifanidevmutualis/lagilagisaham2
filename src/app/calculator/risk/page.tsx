'use client';
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowLeft, ShieldAlert, DollarSign, Target, Activity } from 'lucide-react';

export default function RiskCalculator() {
  const [modalTrading, setModalTrading] = useState<number | ''>('');
  const [risikoPersen, setRisikoPersen] = useState<number | ''>('');
  const [hargaBeli, setHargaBeli] = useState<number | ''>('');
  const [hargaSL, setHargaSL] = useState<number | ''>('');

  const [maksKerugian, setMaksKerugian] = useState<number>(0);
  const [jarakSL, setJarakSL] = useState<number>(0);
  const [maksLot, setMaksLot] = useState<number>(0);
  const [danaTerpakai, setDanaTerpakai] = useState<number>(0);

  useEffect(() => {
    const modal = Number(modalTrading) || 0;
    const risiko = Number(risikoPersen) || 0;
    const beli = Number(hargaBeli) || 0;
    const sl = Number(hargaSL) || 0;

    // Maksimal kerugian dalam Rupiah
    const maxLoss = modal * (risiko / 100);
    setMaksKerugian(maxLoss);

    // Jarak SL dalam persentase
    let distanceSL = 0;
    if (beli > 0 && beli > sl) {
      distanceSL = ((beli - sl) / beli) * 100;
    }
    setJarakSL(distanceSL);

    // Maksimal Lot
    let maxLotCalc = 0;
    let danaCalc = 0;
    if (beli > 0 && sl > 0 && beli > sl) {
      const kerugianPerLembar = beli - sl;
      const maksLembar = Math.floor(maxLoss / kerugianPerLembar);
      maxLotCalc = Math.floor(maksLembar / 100);
      danaCalc = (maxLotCalc * 100) * beli;
      
      // Jika dana terpakai melebihi modal, sesuaikan lot
      if (danaCalc > modal) {
        maxLotCalc = Math.floor(modal / (beli * 100));
        danaCalc = (maxLotCalc * 100) * beli;
      }
    }
    setMaksLot(maxLotCalc);
    setDanaTerpakai(danaCalc);

  }, [modalTrading, risikoPersen, hargaBeli, hargaSL]);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans selection:bg-rose-500/30 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium">
            <ArrowLeft size={20} /> Kembali
          </a>
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="bg-rose-500 text-white p-1.5 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.5)]">
              <ShieldAlert size={18} strokeWidth={3} />
            </div>
            Risk <span className="text-rose-500">Calculator</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Lindungi Modal, <span className="text-rose-500">Amankan Profit.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Hitung batas risiko (Stop Loss) dan ukuran porsi ideal (*Position Sizing*) agar akun Anda tetap bertumbuh secara konsisten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          
          {/* Input Section */}
          <div className="bg-[#0F1523] border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-amber-500"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="text-rose-500" /> Parameter Trading
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Total Modal Trading (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input
                    type="number"
                    min="1"
                    value={modalTrading}
                    onChange={(e) => setModalTrading(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-semibold text-lg"
                    placeholder="Contoh: 10000000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Batas Risiko Kerugian (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={risikoPersen}
                    onChange={(e) => setRisikoPersen(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-semibold text-lg"
                    placeholder="Contoh: 1 atau 2"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Harga Beli / Entry (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input
                    type="number"
                    min="1"
                    value={hargaBeli}
                    onChange={(e) => setHargaBeli(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-semibold text-lg"
                    placeholder="Contoh: 1500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Harga Stop Loss (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input
                    type="number"
                    min="1"
                    value={hargaSL}
                    onChange={(e) => setHargaSL(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-semibold text-lg"
                    placeholder="Contoh: 1400"
                  />
                </div>
                {Number(hargaSL) >= Number(hargaBeli) && Number(hargaBeli) > 0 && (
                  <p className="text-rose-500 text-xs mt-2 italic">Harga Stop Loss harus lebih rendah dari Harga Beli.</p>
                )}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-[#0B0F19] border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-8 text-slate-300 border-b border-slate-800 pb-4">Panduan Position Sizing</h2>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                  <ShieldAlert size={16} /> Maksimal Kerugian Uang (Risiko)
                </p>
                <p className="text-2xl font-bold text-rose-500">
                  {formatRupiah(maksKerugian)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                  <Target size={16} /> Maksimal Lot yang Boleh Dibeli
                </p>
                <p className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {maksLot} <span className="text-2xl text-slate-400 font-medium">Lot</span>
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Total Dana Terpakai: <span className="font-semibold text-white">{formatRupiah(danaTerpakai)}</span>
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                  <Activity size={16} /> Jarak Stop Loss (%)
                </p>
                <p className="text-2xl font-bold text-amber-500">
                  {jarakSL.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="mt-10 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm text-rose-100/70 italic">
              *Kesimpulan: Belilah <strong className="text-white">{maksLot} Lot</strong> di harga {formatRupiah(Number(hargaBeli)||0)}. Jika harga turun ke {formatRupiah(Number(hargaSL)||0)} dan Anda *Cut Loss*, uang Anda yang hilang hanya sebesar {formatRupiah(maksKerugian)}.
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
