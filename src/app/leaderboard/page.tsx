'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa'];

const mockLeaderboards: Record<string, { id: number; name: string; avatar: string; score: number; trend: 'up' | 'down' | 'same'; title: string }[]> = {
  'İstanbul': [
    { id: 1, name: 'Sefil Bilo', avatar: '👑', score: 98, trend: 'same', title: 'Sefil Bilo' },
    { id: 2, name: 'Kırık Kalp', avatar: '💔', score: 92, trend: 'up', title: 'Mahalle Protagonisti' },
    { id: 3, name: 'Çaykolik', avatar: '☕', score: 88, trend: 'up', title: 'Çay & Dram Uzmanı' },
    { id: 4, name: 'Metrobüs Yolcusu', avatar: '🚌', score: 85, trend: 'down', title: 'Orta Direk' },
    { id: 5, name: 'Yalnız Kurt', avatar: '🐺', score: 81, trend: 'same', title: 'Holding On' },
    { id: 6, name: 'Umutsuz Vaka', avatar: '🫠', score: 76, trend: 'up', title: 'Holding On' },
  ],
  'Ankara': [
    { id: 11, name: 'Gri Şehir', avatar: '🏢', score: 95, trend: 'up', title: 'Sefil Bilo' },
    { id: 12, name: 'Ayaz Yiyen', avatar: '🥶', score: 89, trend: 'same', title: 'Mahalle Protagonisti' },
    { id: 13, name: 'Memur Çocuğu', avatar: '👔', score: 84, trend: 'down', title: 'Orta Direk' },
    { id: 14, name: 'Kızılay Aşçısı', avatar: '🍳', score: 80, trend: 'up', title: 'Çay & Dram Uzmanı' },
  ],
  'İzmir': [
    { id: 21, name: 'Boyoz Yiyemeyen', avatar: '🥐', score: 82, trend: 'same', title: 'Mahalle Protagonisti' },
    { id: 22, name: 'Güneş Çarpan', avatar: '☀️', score: 78, trend: 'down', title: 'Orta Direk' },
    { id: 23, name: 'Kordonda Yalnız', avatar: '🌊', score: 75, trend: 'up', title: 'Holding On' },
  ],
  'Bursa': [
    { id: 31, name: 'İskender Bekleyen', avatar: '🍽️', score: 86, trend: 'up', title: 'Mahalle Protagonisti' },
    { id: 32, name: 'Teleferik Fobisi', avatar: '🚠', score: 81, trend: 'same', title: 'Çay & Dram Uzmanı' },
  ]
};

export default function LeaderboardPage() {
  const [activeCity, setActiveCity] = useState(cities[0]);

  const currentBoard = mockLeaderboards[activeCity] || [];

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark pb-safe">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-dirty-gold/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-20 pt-8 sm:pt-12 px-4 sm:px-6 safe-top mb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-dirty-gold/20 to-bg-dark border border-dirty-gold/30 text-dirty-gold mb-3 glow-gold">
            <Trophy size={24} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-[var(--font-heading)] font-bold text-gradient-gold mb-2">Şehir Ligleri</h1>
          <p className="text-text-secondary text-sm max-w-xs mx-auto">
            Hangi şehrin aurası daha gariban? Kendi bölgende kaçıncı sıradasın?
          </p>
        </div>
      </div>

      {/* City Tabs */}
      <div className="relative z-20 px-4 sm:px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {cities.map(city => (
            <motion.button
              key={city}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCity(city)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeCity === city
                  ? 'bg-dirty-gold text-bg-dark font-bold shadow-[0_0_15px_rgba(196,163,90,0.4)]'
                  : 'glass text-text-muted hover:text-text-primary'
              }`}
            >
              {city}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="relative z-10 px-4 sm:px-6 max-w-lg mx-auto pb-24">
        <div className="glass-strong rounded-[24px] overflow-hidden border border-white/5">
          {/* List Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5 text-xs font-bold text-text-muted uppercase tracking-wider">
            <div className="flex gap-8">
              <span>Sıra</span>
              <span>Gariban</span>
            </div>
            <span>Skor</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentBoard.map((user, i) => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                    i === 0 ? 'bg-dirty-gold/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="w-6 flex justify-center text-lg font-bold">
                      {i === 0 ? <Crown size={20} className="text-dirty-gold" /> : 
                       i === 1 ? <Medal size={20} className="text-slate-300" /> : 
                       i === 2 ? <Medal size={20} className="text-amber-700" /> : 
                       <span className="text-text-muted text-sm">{i + 1}</span>}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                        i === 0 ? 'bg-gradient-to-br from-dirty-gold/40 to-dirty-gold/10 border border-dirty-gold/50 shadow-[0_0_10px_rgba(196,163,90,0.3)]' : 'bg-charcoal border border-white/10'
                      }`}>
                        {user.avatar}
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${i === 0 ? 'text-dirty-gold' : 'text-text-primary'}`}>
                          {user.name}
                        </div>
                        <div className="text-[10px] text-text-muted">{user.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Score & Trend */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-lg text-text-primary">
                      {user.score}
                    </span>
                    <div className="w-4 flex justify-center">
                      {user.trend === 'up' && <TrendingUp size={14} className="text-tv-green" />}
                      {user.trend === 'down' && <TrendingDown size={14} className="text-warm-neon-red" />}
                      {user.trend === 'same' && <Minus size={14} className="text-text-muted" />}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BottomNav active="leaderboard" />
    </main>
  );
}
