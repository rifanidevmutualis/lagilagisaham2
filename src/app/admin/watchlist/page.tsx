'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function WatchlistAdmin() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    ticker: '', name: '', trend: 'Bullish', trendColor: 'emerald',
    analysis: '', entryArea: '', targetPrice: '', stopLoss: '', type: 'mingguan'
  });

  useEffect(() => { fetchStocks(); }, []);

  const fetchStocks = async () => {
    const res = await fetch('/api/stocks');
    if (res.ok) setStocks(await res.json());
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ ticker: '', name: '', trend: 'Bullish', trendColor: 'emerald', analysis: '', entryArea: '', targetPrice: '', stopLoss: '', type: 'mingguan' });
    fetchStocks();
  };

  const deleteStock = async (id: number) => {
    if (!confirm('Hapus saham ini?')) return;
    await fetch(`/api/stocks/${id}`, { method: 'DELETE' });
    fetchStocks();
  };

  if (loading) return <div className="p-8 flex items-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Watchlist Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 h-fit">
          <h2 className="text-xl font-bold mb-4">Add New Stock</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Ticker</label>
                <input required value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-3 py-2 mt-1" placeholder="e.g. BBCA" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Nama Perusahaan</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-3 py-2 mt-1" placeholder="BCA" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Trend</label>
                <input required value={form.trend} onChange={e => setForm({...form, trend: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-3 py-2 mt-1" placeholder="Bullish" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Color (emerald/amber)</label>
                <select value={form.trendColor} onChange={e => setForm({...form, trendColor: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-3 py-2 mt-1">
                  <option value="emerald">Emerald (Hijau)</option>
                  <option value="amber">Amber (Kuning/Sideways)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Analisa</label>
              <textarea required value={form.analysis} onChange={e => setForm({...form, analysis: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-3 py-2 mt-1" rows={2}></textarea>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-400">Entry</label>
                <input required value={form.entryArea} onChange={e => setForm({...form, entryArea: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-2 py-2 mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">TP</label>
                <input required value={form.targetPrice} onChange={e => setForm({...form, targetPrice: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-2 py-2 mt-1 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">SL</label>
                <input required value={form.stopLoss} onChange={e => setForm({...form, stopLoss: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-2 py-2 mt-1 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Tipe</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-3 py-2 mt-1">
                <option value="mingguan">Mingguan</option>
                <option value="bulanan">Bulanan</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-[#0B0F19] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Plus size={18} /> Tambah Saham
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {stocks.map(stock => (
            <div key={stock.id} className="bg-[#0B0F19] p-5 rounded-2xl border border-slate-800 flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-lime-400">{stock.ticker}</h3>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-md">{stock.type}</span>
                </div>
                <p className="text-sm text-slate-400 italic mb-2">"{stock.analysis}"</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-slate-300">Entry: <b className="text-white">{stock.entryArea}</b></span>
                  <span className="text-slate-300">TP: <b className="text-lime-400">{stock.targetPrice}</b></span>
                  <span className="text-slate-300">SL: <b className="text-rose-400">{stock.stopLoss}</b></span>
                </div>
              </div>
              <button onClick={() => deleteStock(stock.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 rounded-lg text-rose-400 hover:text-white transition-colors shrink-0">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {stocks.length === 0 && <div className="text-slate-500 text-center py-10">Belum ada saham.</div>}
        </div>
      </div>
    </div>
  );
}
