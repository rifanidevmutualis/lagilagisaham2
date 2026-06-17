import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import AdminSidebar from './AdminSidebar';

const prisma = new PrismaClient();

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(token) },
  });

  if (user?.role !== 'ADMIN') {
    redirect('/'); // Normal users can't access admin
  }

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white">
      <AdminSidebar userName={user.name} />
      <main className="flex-1 ml-64 min-h-screen bg-[#0F1523]">
        {children}
      </main>
    </div>
  );
}
