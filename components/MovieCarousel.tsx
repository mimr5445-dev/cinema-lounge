'use client';

import React from 'react';
import { MovieCard } from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MovieCarousel = ({ movies }: { movies: any[] }) => {
  // Mock data if movies is empty for preview purposes
  const displayMovies = movies.length > 0 ? movies : Array(6).fill({
    title: "اسم الفيلم",
    posterUrl: "https://image.tmdb.org/t/p/w500/8cdcl39U9shp5mAn96B9vY6Y90p.jpg",
    rating: 8.5,
    year: 2024
  });

  return (
    <div className="relative group">
      <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {displayMovies.map((movie, index) => (
          <div key={index} className="flex-shrink-0 w-40 md:w-56 snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons (Visual only for now) */}
      <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft className="text-[#c9a84c]" />
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="text-[#c9a84c]" />
      </button>
    </div>
  );
};
