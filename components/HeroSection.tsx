'use client';

import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection = ({ movie }: { movie: any }) => {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-[#07070f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070f] via-transparent to-transparent rtl:bg-gradient-to-l" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-[#f0ece0] mb-4 font-[Cairo] drop-shadow-2xl">
            {movie.title}
          </h1>
          <p className="text-[#a09880] text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
            {movie.plot}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-[#c9a84c] text-[#07070f] px-8 py-3 rounded-xl font-bold hover:bg-[#e4c06e] transition-all scale-100 hover:scale-105">
              <Play size={20} fill="currentColor" />
              شاهد الآن
            </button>
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#f0ece0] px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all">
              <Info size={20} />
              التفاصيل
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
