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
        // التأكد من أن البيانات مصفوفة لتجنب تعطل العميل
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error("Data received is not an array:", data);
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // تأمين الوصول للبيانات مع قيم افتراضية قوية
  const safeMovies = Array.isArray(movies) ? movies : [];
  
  const featuredMovie = safeMovies.find(m => m?.isFeatured) || safeMovies[0] || {
    title: "مرحبًا بك في استراحة السينما",
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    plot: "استكشف عالم السينما بذكاء اصطناعي وأناقة ذهبية. ابدأ بإضافة أفلامك المفضلة من لوحة التحكم."
  };

  const recentMovies = safeMovies.slice(0, 10);
  const popularMovies = [...safeMovies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10);

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
