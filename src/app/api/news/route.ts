import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://www.cnbcindonesia.com/market/rss');
    
    // Get the top 10 news items
    const news = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
