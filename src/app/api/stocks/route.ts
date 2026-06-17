import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
