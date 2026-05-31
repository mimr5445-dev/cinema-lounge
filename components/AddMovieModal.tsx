'use client';

import React, { useState } from 'react';
import { X, Search, Loader2 } from 'lucide-react';

export const AddMovieModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const searchTmdb = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/tmdb/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (tmdbMovie: any) => {
    setLoading(true);
    try {
      // Get full details and AI plot
      const detailRes = await fetch(`/api/tmdb/details?id=${tmdbMovie.id}`);
      const fullDetails = await detailRes.json();

      // Save to database
      const saveRes = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fullDetails,
          number: Math.floor(Math.random() * 10000) // Temporary random number
        }),
      });

      if (saveRes.ok) {
        alert('تمت إضافة الفيلم بنجاح!');
        onClose();
      }
    } catch (error) {
      console.error("Add error:", error);
      alert('حدث خطأ أثناء إضافة الفيلم');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl glass-card flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#c9a84c] font-[Cairo]">إضافة فيلم جديد</h2>
          <button onClick={onClose} className="text-[#a09880] hover:text-[#f0ece0]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن الفيلم في TMDB..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-12 text-[#f0ece0] focus:border-[#c9a84c]/50 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a6e]" size={20} />
            </div>
            <button 
              onClick={searchTmdb}
              disabled={loading}
              className="bg-[#c9a84c] text-[#07070f] px-6 py-3 rounded-xl font-bold hover:bg-[#e4c06e] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'بحث'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => addMovie(movie)}
                className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-center hover:border-[#c9a84c]/30 cursor-pointer group transition-all"
              >
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} className="w-16 h-24 object-cover rounded-lg" />
                ) : (
                  <div className="w-16 h-24 bg-white/10 rounded-lg flex items-center justify-center text-xs text-[#5a5a6e]">لا يوجد ملصق</div>
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-[#f0ece0] group-hover:text-[#c9a84c] transition-colors">{movie.title}</h4>
                  <p className="text-sm text-[#5a5a6e]">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
