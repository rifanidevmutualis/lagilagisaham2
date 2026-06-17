import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const stocks = [
    {
      ticker: 'BBCA',
      name: 'Bank Central Asia Tbk',
      trend: 'Bullish',
      trendColor: 'emerald',
      analysis: 'Akumulasi asing yang konsisten di area support minor, potensi breakout resistance.',
      entryArea: '9.800 - 9.950',
      targetPrice: '10.500',
      stopLoss: '9.600',
      type: 'mingguan',
    },
    {
      ticker: 'BRPT',
      name: 'Barito Pacific Tbk',
      trend: 'Bullish',
      trendColor: 'emerald',
      analysis: 'Breakout dari fase konsolidasi dengan volume yang sangat signifikan (Ledakan Volume).',
      entryArea: '1.050 - 1.080',
      targetPrice: '1.250',
      stopLoss: '980',
      type: 'mingguan',
    },
    {
      ticker: 'AMMN',
      name: 'Amman Mineral Tbk',
      trend: 'Sideways',
      trendColor: 'amber',
      analysis: 'Menunggu konfirmasi pantulan dari area demand harian. Cocok untuk scalping cepat.',
      entryArea: '8.200 - 8.350',
      targetPrice: '8.800',
      stopLoss: '8.000',
      type: 'mingguan',
    },
    {
      ticker: 'ASII',
      name: 'Astra International Tbk',
      trend: 'Swing Long',
      trendColor: 'emerald',
      analysis: 'Fase akumulasi panjang di area support kuat bulanan. Risiko penurunan (downside) sangat terbatas.',
      entryArea: '4.900 - 5.050',
      targetPrice: '5.600',
      stopLoss: '4.750',
      type: 'bulanan',
    },
    {
      ticker: 'TLKM',
      name: 'Telkom Indonesia Tbk',
      trend: 'Reversal',
      trendColor: 'emerald',
      analysis: 'Valuasi historis sangat murah (undervalued) dengan momentum RSI oversold di time-frame Weekly.',
      entryArea: '2.850 - 2.950',
      targetPrice: '3.400',
      stopLoss: '2.700',
      type: 'bulanan',
    },
    {
      ticker: 'BREN',
      name: 'Barito Renewables Tbk',
      trend: 'Konsolidasi',
      trendColor: 'amber',
      analysis: 'Uptrend solid secara jangka menengah, sedang membentuk pijakan (higher low) baru untuk melanjutkan kenaikan.',
      entryArea: '8.100 - 8.350',
      targetPrice: '9.500',
      stopLoss: '7.600',
      type: 'bulanan',
    },
  ];

  for (const stock of stocks) {
    await prisma.stock.upsert({
      where: { ticker: stock.ticker },
      update: {},
      create: stock,
    });
  }
  console.log('Database berhasil di-seed dengan data saham awal.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
