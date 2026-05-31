'use client';

import React from 'react';

const genres = [
  { name: 'أكشن', count: 120, icon: '🎬' },
  { name: 'دراما', count: 85, icon: '🎭' },
  { name: 'كوميديا', count: 64, icon: '😂' },
  { name: 'رعب', count: 42, icon: '👻' },
  { name: 'خيال علمي', count: 38, icon: '🚀' },
  { name: 'وثائقي', count: 25, icon: '🌍' },
];

export const GenreGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {genres.map((genre) => (
        <div
          key={genre.name}
          className="glass-card p-6 flex flex-col items-center text-center cursor-pointer hover:border-[#c9a84c]/50 transition-all group"
        >
          <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{genre.icon}</span>
          <h3 className="font-bold text-[#f0ece0] mb-1">{genre.name}</h3>
          <span className="text-xs text-[#5a5a6e]">{genre.count} فيلم</span>
        </div>
      ))}
    </div>
  );
};
