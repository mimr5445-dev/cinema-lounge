'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Calendar, Clock, Edit2, Trash2, Upload, Link, Bot } from 'lucide-react';

export function MovieDetailClient({ movie }: { movie: any }) {
  const [editMode, setEditMode] = useState(false);
  const [watchUrl, setWatchUrl] = useState(movie.watchUrl || '');
  const [title, setTitle] = useState(movie.title);
  const isAdmin = true; // Replace with actual auth check

  const handleWatch = () => {
    if (watchUrl) window.open(watchUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07070f]" dir="rtl">
      {/* Backdrop */}
      {movie.backdropUrl && (
        <div className="absolute inset-0 h-[60vh] overflow-hidden">
          <img
            src={movie.backdropUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070f]/50 via-[#07070f]/70 to-[#07070f]" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="w-48 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 relative">
              <img
                src={movie.posterUrl || '/placeholder.jpg'}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {isAdmin && (
                <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Upload size={32} className="text-[#c9a84c]" />
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            {editMode ? (
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="text-3xl font-black text-[#f0ece0] bg-white/10 border border-[#c9a84c]/50 rounded-lg px-3 py-1 w-full outline-none"
              />
            ) : (
              <h1 className="text-3xl md:text-4xl font-black text-[#f0ece0] font-[Cairo]">
                {title}
              </h1>
            )}

            {movie.originalTitle && (
              <p className="text-[#a09880] text-lg">{movie.originalTitle}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {movie.year && (
                <span className="flex items-center gap-1 text-[#a09880]">
                  <Calendar size={14} /> {movie.year}
                </span>
              )}
              {movie.duration && (
                <span className="flex items-center gap-1 text-[#a09880]">
                  <Clock size={14} /> {movie.duration} دقيقة
                </span>
              )}
              {movie.rating && (
                <span className="flex items-center gap-1 text-[#c9a84c]">
                  <Star size={14} fill="currentColor" /> {movie.rating.toFixed(1)} / 10
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genre && movie.genre.map((g: string) => (
                <span key={g} className="px-3 py-1 bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#c9a84c] rounded-full text-xs font-bold">
                  {g}
                </span>
              ))}
            </div>

            <div className="bg-[#0e0e1e] rounded-xl p-4 border border-white/5">
              <p className="text-[#a09880] text-sm leading-loose">
                {movie.plot || movie.plotAi || 'لا يوجد قصة متاحة لهذا الفيلم.'}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              {isAdmin && (
                <input
                  value={watchUrl}
                  onChange={e => setWatchUrl(e.target.value)}
                  placeholder="أضف رابط المشاهدة..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f0ece0] placeholder-[#5a5a6e] outline-none focus:border-[#c9a84c]/50"
                />
              )}
              {watchUrl && (
                <button
                  onClick={handleWatch}
                  className="flex items-center gap-2 bg-[#c9a84c] text-[#07070f] px-6 py-2.5 rounded-xl font-bold hover:bg-[#e4c06e] transition-colors"
                >
                  <Play size={18} fill="currentColor" />
                  شاهد الآن
                </button>
              )}
            </div>

            {isAdmin && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-sm hover:bg-blue-500/30"
                >
                  <Edit2 size={14} />
                  {editMode ? 'حفظ التعديلات' : 'تعديل'}
                </button>
                <button className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-500/30">
                  <Trash2 size={14} />
                  حذف
                </button>
                <button className="flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-[#c9a84c] px-4 py-2 rounded-xl text-sm hover:bg-[#c9a84c]/30">
                  <Bot size={14} />
                  جلب البيانات بالذكاء الاصطناعي
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
