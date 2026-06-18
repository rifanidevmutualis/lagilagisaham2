import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 60; // Cache for 60 seconds (ISR)

export async function GET() {
  try {
    const stocks = await prisma.stock.findMany({
      orderBy: { id: 'asc' }
    });
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { cookies } from 'next/headers';

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return false;
  const user = await prisma.user.findUnique({ where: { id: parseInt(token) } });
  return user?.role === 'ADMIN';
}

export async function POST(req: Request) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  
  try {
    const body = await req.json();
    const newStock = await prisma.stock.create({ data: body });
    return NextResponse.json(newStock, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create stock' }, { status: 500 });
  }
}
