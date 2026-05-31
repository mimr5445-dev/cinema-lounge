const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export async function searchMoviesOnTmdb(query: string) {
  if (!TMDB_API_KEY || TMDB_API_KEY === '...') {
    console.error("TMDB API Key is missing");
    return [];
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=ar`
    );
    const data = await response.json();
    
    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null,
      backdropUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
      plot: movie.overview,
      rating: movie.vote_average,
    }));
  } catch (error) {
    console.error("TMDB Search Error:", error);
    return [];
  }
}

export async function getMovieDetailsFromTmdb(tmdbId: string) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=ar&append_to_response=credits,videos`
    );
    const movie = await response.json();
    
    return {
      tmdbId: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      year: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : null,
      duration: movie.runtime,
      genre: movie.genres.map((g: any) => g.name),
      posterUrl: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : null,
      backdropUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
      plot: movie.overview,
      rating: movie.vote_average,
      trailerUrl: movie.videos?.results?.find((v: any) => v.type === 'Trailer')?.key 
        ? `https://www.youtube.com/watch?v=${movie.videos.results.find((v: any) => v.type === 'Trailer').key}`
        : null
    };
  } catch (error) {
    console.error("TMDB Detail Error:", error);
    return null;
  }
}
