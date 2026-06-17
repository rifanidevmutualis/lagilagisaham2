import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return false;
  const user = await prisma.user.findUnique({ where: { id: parseInt(token) } });
  return user?.role === 'ADMIN';
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const modules = await prisma.module.findMany({ orderBy: { id: 'asc' } });
    return NextResponse.json(modules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  
  try {
    const body = await req.json();
    const newModule = await prisma.module.create({ data: body });
    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }
}
