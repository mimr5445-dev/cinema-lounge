'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MovieCarousel } from '@/components/MovieCarousel';
import { AiMoodPicker } from '@/components/AiMoodPicker';
import { GenreGrid } from '@/components/GenreGrid';
import { ChatWidget } from '@/components/ChatWidget';

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const featuredMovie = movies.find(m => m.isFeatured) || movies[0] || {
    title: "مرحبًا بك في استراحة السينما",
    backdropUrl: "https://image.tmdb.org/t/p/original/bOGkgBujMD917UnBUZ6v17Z919W.jpg",
    plot: "استكشف عالم السينما بذكاء اصطناعي وأناقة ذهبية."
  };

  const recentMovies = movies.slice(0, 10);
  const popularMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);

  return (
    <main className="min-h-screen bg-[#07070f]">
      {/* Hero Section */}
      <HeroSection movie={featuredMovie} />
      
      {/* AI Mood Picker */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#c9a84c] mb-6 font-[Cairo]">
          ما هو مزاجك اليوم؟
        </h2>
        <AiMoodPicker />
      </section>

      {/* Recently Added */}
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#f0ece0] mb-6">
          أضيف مؤخرًا ✨
        </h2>
        <MovieCarousel movies={recentMovies} />
      </section>

      {/* Popular */}
      <section className="px-6 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#f0ece0] mb-6">
          الأكثر شعبية 🏆
        </h2>
        <MovieCarousel movies={popularMovies} />
      </section>

      {/* Genre Grid */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#f0ece0] mb-6">
          تصفح حسب النوع 🎬
        </h2>
        <GenreGrid />
      </section>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </main>
  );
}
