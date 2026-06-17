'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Target, LogOut } from 'lucide-react';

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Watchlist', path: '/admin/watchlist', icon: Target },
    { name: 'Modules', path: '/admin/modules', icon: BookOpen },
  ];

  const handleLogout = () => {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-slate-800 fixed h-full flex flex-col z-50">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-lime-400">Admin Panel</h2>
        <p className="text-xs text-slate-400 mt-1">Lagi Lagi Saham</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-lime-500/10 text-lime-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="mb-4 px-2">
          <p className="text-xs text-slate-500">Logged in as</p>
          <p className="text-sm font-semibold truncate text-white">{userName}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-medium">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
