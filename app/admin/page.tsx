'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  ExternalLink, 
  Film, 
  Users, 
  Settings as SettingsIcon,
  LayoutDashboard,
  Loader2
} from 'lucide-react';
import { AddMovieModal } from '@/components/AddMovieModal';

export default function AdminPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/movies');
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الفيلم؟')) return;
    
    try {
      const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMovies(movies.filter(m => m.id !== id));
      }
    } catch (error) {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.originalTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07070f] flex text-[#f0ece0]" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0e0e1e] border-l border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-[#c9a84c] font-black text-xl font-[Cairo]">استراحة المدير</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#c9a84c] text-[#07070f] font-bold">
            <LayoutDashboard size={20} />
            لوحة التحكم
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#a09880] transition-colors">
            <Film size={20} />
            الأفلام
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#a09880] transition-colors">
            <Users size={20} />
            المستخدمين
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[#a09880] transition-colors">
            <SettingsIcon size={20} />
            الإعدادات
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold font-[Cairo]">إدارة الأفلام</h2>
            <p className="text-[#a09880]">تحكم في محتوى استراحة السينما الخاصة بك</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#c9a84c] text-[#07070f] px-6 py-3 rounded-xl font-bold hover:bg-[#e4c06e] transition-all"
          >
            <Plus size={20} />
            إضافة فيلم
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 border-[#c9a84c]/10">
            <p className="text-[#a09880] text-sm">إجمالي الأفلام</p>
            <h3 className="text-3xl font-black text-[#c9a84c]">{movies.length}</h3>
          </div>
          <div className="glass-card p-6 border-[#c9a84c]/10">
            <p className="text-[#a09880] text-sm">الأفلام النشطة</p>
            <h3 className="text-3xl font-black text-[#c9a84c]">{movies.filter(m => m.isActive).length}</h3>
          </div>
          <div className="glass-card p-6 border-[#c9a84c]/10">
            <p className="text-[#a09880] text-sm">تم جلبها بالذكاء الاصطناعي</p>
            <h3 className="text-3xl font-black text-[#c9a84c]">{movies.filter(m => m.plotAi).length}</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="ابحث في الأفلام المضافة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0e0e1e] border border-white/5 rounded-xl py-4 px-6 pr-12 text-[#f0ece0] focus:border-[#c9a84c]/50 outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5a6e]" size={20} />
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-white/5 text-[#a09880] text-sm">
                <th className="p-4 font-bold">الفيلم</th>
                <th className="p-4 font-bold">السنة</th>
                <th className="p-4 font-bold">التقييم</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <Loader2 className="animate-spin inline-block text-[#c9a84c] mb-2" size={32} />
                    <p>جاري تحميل الأفلام...</p>
                  </td>
                </tr>
              ) : filteredMovies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#5a5a6e]">
                    لا توجد أفلام مضافة حالياً.
                  </td>
                </tr>
              ) : (
                filteredMovies.map((movie) => (
                  <tr key={movie.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img src={movie.posterUrl} className="w-10 h-14 object-cover rounded-md bg-white/5" alt="" />
                        <div>
                          <p className="font-bold text-[#f0ece0]">{movie.title}</p>
                          <p className="text-xs text-[#5a5a6e]">{movie.originalTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#a09880]">{movie.year}</td>
                    <td className="p-4">
                      <span className="text-[#c9a84c] font-bold">★ {movie.rating?.toFixed(1)}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${movie.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {movie.isActive ? 'نشط' : 'مخفي'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-start">
                        <button className="p-2 hover:bg-blue-500/10 text-[#5a5a6e] hover:text-blue-400 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteMovie(movie.id)}
                          className="p-2 hover:bg-red-500/10 text-[#5a5a6e] hover:text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 hover:bg-white/10 text-[#5a5a6e] hover:text-[#f0ece0] rounded-lg transition-colors">
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Movie Modal */}
      <AddMovieModal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          fetchMovies(); // Refresh list after adding
        }} 
      />
    </div>
  );
}
