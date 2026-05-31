import { NextResponse } from 'next/server';
import { getMovieDetailsFromTmdb } from '@/lib/tmdb';
import { generateMoviePlotAi } from '@/lib/ai';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const movieDetails = await getMovieDetailsFromTmdb(id);
    
    if (!movieDetails) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    // Use Gemini to enhance the plot
    const enhancedPlot = await generateMoviePlotAi(movieDetails.title, movieDetails.plot);
    
    return NextResponse.json({ 
      ...movieDetails, 
      plotAi: enhancedPlot 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
