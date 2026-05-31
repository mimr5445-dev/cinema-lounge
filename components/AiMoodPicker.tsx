'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const moods = [
  { id: 'happy', label: 'سعيد', emoji: '😊', color: 'hover:bg-yellow-500/20' },
  { id: 'sad', label: 'حزين', emoji: '😢', color: 'hover:bg-blue-500/20' },
  { id: 'scary', label: 'رعب', emoji: '😱', color: 'hover:bg-red-600/20' },
  { id: 'action', label: 'حماس', emoji: '🔥', color: 'hover:bg-orange-500/20' },
  { id: 'mystery', label: 'غموض', emoji: '🕵️‍♂️', color: 'hover:bg-purple-500/20' },
  { id: 'romantic', label: 'رومانسي', emoji: '💖', color: 'hover:bg-pink-500/20' },
];

export const AiMoodPicker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => setSelectedMood(mood.id)}
          className={`
            flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
            ${selectedMood === mood.id 
              ? 'bg-[#c9a84c] border-[#c9a84c] text-[#07070f] scale-105' 
              : `bg-white/5 border-white/10 text-[#a09880] ${mood.color} hover:border-[#c9a84c]/50`
            }
          `}
        >
          <span className="text-3xl mb-2">{mood.emoji}</span>
          <span className="font-bold text-sm">{mood.label}</span>
          {selectedMood === mood.id && (
            <Sparkles size={14} className="mt-2 animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
};
