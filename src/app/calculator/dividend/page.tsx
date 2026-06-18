'use client';
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowLeft, TrendingUp, DollarSign, PieChart, Percent } from 'lucide-react';

export default function DividendCalculator() {
  const [hargaSaham, setHargaSaham] = useState<number | ''>('');
  const [jumlahLot, setJumlahLot] = useState<number | ''>('');
  const [dividenPerLembar, setDividenPerLembar] = useState<number | ''>('');

  const [uangInvestasi, setUangInvestasi] = useState<number>(0);
  const [perkiraanDividen, setPerkiraanDividen] = useState<number>(0);
  const [dividendYield, setDividendYield] = useState<number>(0);

  useEffect(() => {
    const harga = Number(hargaSaham) || 0;
    const lot = Number(jumlahLot) || 0;
    const dividen = Number(dividenPerLembar) || 0;

    const totalLembar = lot * 100;
    const investasi = harga * totalLembar;
    const totalDividen = dividen * totalLembar;
    const yieldPercentage = harga > 0 ? (dividen / harga) * 100 : 0;

    setUangInvestasi(investasi);
    setPerkiraanDividen(totalDividen);
    setDividendYield(yieldPercentage);
  }, [hargaSaham, jumlahLot, dividenPerLembar]);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  const formatNumberInput = (num: number | '') => {
    if (num === '') return '';
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const handleNumberChange = (value: string, setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    const rawValue = value.replace(/\D/g, '');
    setter(rawValue === '' ? '' : Number(rawValue));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans selection:bg-lime-500/30 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium">
            <ArrowLeft size={20} /> Kembali
          </a>
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="bg-lime-400 text-[#0B0F19] p-1.5 rounded-lg">
              <Calculator size={18} strokeWidth={3} />
            </div>
            Kalkulator <span className="text-lime-400">Dividen</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simulasikan <span className="text-lime-400">Passive Income</span> Anda.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Hitung secara instan berapa modal yang dibutuhkan dan potensi dividen yang akan Anda terima dari saham pilihan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          
          {/* Input Section */}
          <div className="bg-[#0F1523] border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-400"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-lime-400" /> Parameter Saham
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Harga Saham Saat Ini (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberInput(hargaSaham)}
                    onChange={(e) => handleNumberChange(e.target.value, setHargaSaham)}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-semibold text-lg"
                    placeholder="Contoh: 5.000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Jumlah Lot (1 Lot = 100 Lembar)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <PieChart size={20} />
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberInput(jumlahLot)}
                    onChange={(e) => handleNumberChange(e.target.value, setJumlahLot)}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-semibold text-lg"
                    placeholder="Contoh: 10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Dividen Per Lembar Saham (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberInput(dividenPerLembar)}
                    onChange={(e) => handleNumberChange(e.target.value, setDividenPerLembar)}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-semibold text-lg"
                    placeholder="Contoh: 250"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-[#0B0F19] border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-8 text-slate-300 border-b border-slate-800 pb-4">Hasil Kalkulasi Otomatis</h2>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                  <DollarSign size={16} /> Total Modal (Uang Diinvestasikan)
                </p>
                <p className="text-3xl font-bold text-white tracking-tight">
                  {formatRupiah(uangInvestasi)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                  <Calculator size={16} /> Perkiraan Dividen yang Didapat
                </p>
                <p className="text-4xl sm:text-5xl font-extrabold text-lime-400 tracking-tight drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                  {formatRupiah(perkiraanDividen)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2">
                  <Percent size={16} /> Dividend Yield (Imbal Hasil)
                </p>
                <p className="text-2xl font-bold text-emerald-400">
                  {dividendYield.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="mt-10 p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-sm text-lime-100/70 italic">
              *Catatan: Kalkulator ini hanya alat bantu simulasi. Angka dividen yang dibagikan perusahaan dapat berubah sesuai keputusan RUPS. Harga saham juga dapat berfluktuasi.
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
