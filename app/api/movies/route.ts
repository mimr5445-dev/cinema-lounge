import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const movie = await prisma.movie.create({
      data: {
        number: data.number || Math.floor(Math.random() * 1000000),
        title: data.title,
        originalTitle: data.originalTitle,
        year: data.year,
        duration: data.duration,
        genre: data.genre || [],
        posterUrl: data.posterUrl,
        backdropUrl: data.backdropUrl,
        watchUrl: data.watchUrl,
        plot: data.plot,
        plotAi: data.plotAi,
        rating: data.rating,
        tmdbId: data.tmdbId?.toString(),
        trailerUrl: data.trailerUrl,
      },
    });
    
    return NextResponse.json(movie);
  } catch (error) {
    console.error('Create Movie Error:', error);
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
