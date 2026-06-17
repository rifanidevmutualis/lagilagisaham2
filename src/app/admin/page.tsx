import { PrismaClient } from '@prisma/client';
import { Users, Target, BookOpen } from 'lucide-react';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const usersCount = await prisma.user.count();
  const stocksCount = await prisma.stock.count();
  const modulesCount = await prisma.module.count();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl">
            <Users size={32} />
          </div>
          <div>
            <p className="text-slate-400 font-medium">Total Users</p>
            <h2 className="text-3xl font-bold text-white">{usersCount}</h2>
          </div>
        </div>

        <div className="bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-4 bg-lime-500/10 text-lime-400 rounded-xl">
            <Target size={32} />
          </div>
          <div>
            <p className="text-slate-400 font-medium">Watchlist Stocks</p>
            <h2 className="text-3xl font-bold text-white">{stocksCount}</h2>
          </div>
        </div>

        <div className="bg-[#0B0F19] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-4 bg-purple-500/10 text-purple-400 rounded-xl">
            <BookOpen size={32} />
          </div>
          <div>
            <p className="text-slate-400 font-medium">E-Book Modules</p>
            <h2 className="text-3xl font-bold text-white">{modulesCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
