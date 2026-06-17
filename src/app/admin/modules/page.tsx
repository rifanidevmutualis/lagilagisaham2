'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function ModulesAdmin() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', linkUrl: '', iconName: 'BookOpen' });

  useEffect(() => { fetchModules(); }, []);

  const fetchModules = async () => {
    const res = await fetch('/api/modules');
    if (res.ok) setModules(await res.json());
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ title: '', description: '', linkUrl: '', iconName: 'BookOpen' });
    fetchModules();
  };

  const deleteModule = async (id: number) => {
    if (!confirm('Hapus modul ini?')) return;
    await fetch(`/api/modules/${id}`, { method: 'DELETE' });
    fetchModules();
  };

  if (loading) return <div className="p-8 flex items-center gap-2"><Loader2 className="animate-spin" /> Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Modules Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 h-fit">
          <h2 className="text-xl font-bold mb-4">Add New Module</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-400">Judul</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-4 py-2 mt-1 focus:border-lime-400 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-400">Deskripsi</label>
              <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-4 py-2 mt-1 focus:border-lime-400 focus:outline-none" rows={3}></textarea>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-400">Link URL (G-Drive / PDF)</label>
              <input required type="url" value={form.linkUrl} onChange={e => setForm({...form, linkUrl: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-4 py-2 mt-1 focus:border-lime-400 focus:outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-400">Nama Icon (Lucide)</label>
              <input required value={form.iconName} onChange={e => setForm({...form, iconName: e.target.value})} className="w-full bg-[#0F1523] border border-slate-700 text-white rounded-xl px-4 py-2 mt-1 focus:border-lime-400 focus:outline-none" placeholder="e.g. BookOpen, Target" />
            </div>
            <button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-[#0B0F19] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Plus size={18} /> Tambah Modul
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {modules.map(mod => (
            <div key={mod.id} className="bg-[#0B0F19] p-5 rounded-2xl border border-slate-800 flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-bold text-lime-400">{mod.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{mod.description}</p>
                <a href={mod.linkUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline mt-2 inline-block truncate max-w-md">{mod.linkUrl}</a>
                <p className="text-xs text-slate-500 mt-1">Icon: {mod.iconName}</p>
              </div>
              <button onClick={() => deleteModule(mod.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 rounded-lg text-rose-400 hover:text-white transition-colors shrink-0">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {modules.length === 0 && <div className="text-slate-500 text-center py-10">Belum ada modul.</div>}
        </div>
      </div>
    </div>
  );
}
