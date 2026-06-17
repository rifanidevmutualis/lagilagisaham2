'use client';
import { useState, useEffect } from 'react';
import { Trash2, ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';

export default function UsersAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      setUsers(await res.json());
    }
    setLoading(false);
  };

  const toggleRole = async (id: number, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    });
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  if (loading) return <div className="p-8 flex items-center gap-2"><Loader2 className="animate-spin" /> Loading users...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>
      
      <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0F1523] border-b border-slate-800">
            <tr>
              <th className="p-4 font-semibold text-slate-400">Name</th>
              <th className="p-4 font-semibold text-slate-400">Email</th>
              <th className="p-4 font-semibold text-slate-400">WhatsApp</th>
              <th className="p-4 font-semibold text-slate-400">Role</th>
              <th className="p-4 font-semibold text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-slate-400">{user.email}</td>
                <td className="p-4 text-slate-400">{user.whatsapp || '-'}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-500/10 text-slate-400'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <button onClick={() => toggleRole(user.id, user.role)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Toggle Role">
                    {user.role === 'ADMIN' ? <ShieldAlert size={16} className="text-amber-400" /> : <ShieldCheck size={16} className="text-lime-400" />}
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 rounded-lg text-rose-400 hover:text-white transition-colors" title="Delete User">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
