import { NextResponse } from 'next/server';
import { searchMoviesOnTmdb } from '@/lib/tmdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const results = await searchMoviesOnTmdb(query);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
