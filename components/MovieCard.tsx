'use client';

import React from 'react';
import { Star } from 'lucide-react';

export const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.posterUrl || '/placeholder-poster.jpg'}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="card-overlay">
        <h3 className="text-[#f0ece0] font-bold text-lg leading-tight mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-0.5 text-[#c9a84c]">
            <Star size={12} fill="currentColor" />
            {movie.rating?.toFixed(1)}
          </span>
          <span className="text-[#a09880]">{movie.year}</span>
        </div>
      </div>
    </div>
  );
};
