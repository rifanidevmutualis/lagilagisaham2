import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  try {
    const res = await prisma.user.updateMany({ data: { role: 'ADMIN' } });
    console.log('Semua user yang ada saat ini telah di-set menjadi ADMIN:', res.count);
  } catch (e) {
    console.error(e);
  }
}
run();
