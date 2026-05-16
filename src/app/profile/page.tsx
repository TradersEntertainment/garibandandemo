'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/storage';
import { garibanTitles, vibes } from '@/data/questions';
import RadarChart from '@/components/RadarChart';
import { Settings, Edit3, Sparkles, Music, Coffee, Heart, Zap, Moon } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);

  useEffect(() => {
    const userData = getUser();
    if (!userData.completedTest || !userData.score) {
      router.push('/onboarding');
      return;
    }
    setUser(userData);
  }, [router]);

  if (!user || !user.score) return null;

  const { score } = user;
  const titleInfo = garibanTitles[score.titleKey] || { title: 'Gariban', emoji: '🫠', description: '' };
  const userVibe = vibes.find((v) => v.id === user.vibe);

  const profileStats = [
    { icon: <Coffee size={14} />, label: 'Çay Bağımlılığı', value: `${Math.min(100, score.dimensions.survival + 20)}%`, color: '#8B6914' },
    { icon: <Moon size={14} />, label: 'Gece 2 Melankolisi', value: `${score.dimensions.emotional}%`, color: '#4A6B8A' },
    { icon: <Zap size={14} />, label: 'Hayatta Kalma Enerjisi', value: `${score.dimensions.survival}%`, color: '#D4845A' },
    { icon: <Heart size={14} />, label: 'Kalp Kırıklığı Seviyesi', value: `${Math.min(100, score.dimensions.emotional + 10)}%`, color: '#E84040' },
  ];

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark pb-safe">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-dirty-gold/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-20 px-4 sm:p-6 pt-4 flex items-center justify-between safe-top">
        <h1 className="text-xl font-[var(--font-heading)] font-bold text-gradient-gold">Profil</h1>
        <div className="flex gap-3">
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-dirty-gold transition-colors">
            <Edit3 size={16} />
          </button>
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-dirty-gold transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-lg mx-auto">
        {/* Avatar & Identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          {/* Score Ring Avatar */}
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#C4A35A"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - score.total / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-charcoal to-bg-dark border border-dirty-gold/20 flex items-center justify-center text-3xl">
                {userVibe?.emoji || '🫠'}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-[var(--font-heading)] font-bold text-text-primary mb-1">
            {user.name || 'Gariban'}
          </h2>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">{titleInfo.emoji}</span>
            <span className="text-sm font-medium text-dirty-gold">{titleInfo.title}</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
            <span>Gariban Skoru: <span className="text-dirty-gold font-bold">{score.total}</span>/100</span>
            {userVibe && <span>Vibe: <span className="text-text-secondary">{userVibe.title}</span></span>}
          </div>
        </motion.div>

        {/* Emotional Battery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-muted uppercase tracking-wider flex items-center gap-2">
              🔋 Duygusal Batarya
            </span>
            <span className="text-xs font-mono text-warm-neon-red">{Math.max(5, 100 - score.dimensions.emotional)}%</span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-warm-neon-red via-faded-orange to-dirty-gold"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(5, 100 - score.dimensions.emotional)}%` }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[10px] text-text-muted mt-2 italic">
            {score.dimensions.emotional > 70
              ? '"Düşük batarya. Şarj cihazı olarak çay önerilir."'
              : score.dimensions.emotional > 40
              ? '"Orta seviye. Bir arabesk dinlersen tamamen biter."'
              : '"İdare eder. Henüz tamamen tükenmedin."'}
          </p>
        </motion.div>

        {/* Aura Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5 mb-4"
        >
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles size={12} className="text-dirty-gold" />
            Aura Etiketleri
          </h3>
          <div className="flex flex-wrap gap-2">
            {score.auraTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs font-medium bg-dirty-gold/10 text-dirty-gold border border-dirty-gold/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          {profileStats.map((stat, i) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2" style={{ color: stat.color }}>
                {stat.icon}
                <span className="text-[10px] uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-xl font-bold text-text-primary">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5 mb-4 flex flex-col items-center"
        >
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">Gariban Profil Haritası</h3>
          <RadarChart dimensions={score.dimensions} size={220} />
        </motion.div>

        {/* Emotional Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5 mb-4 space-y-4"
        >
          <h3 className="text-xs text-text-muted uppercase tracking-wider flex items-center gap-2">
            <Music size={12} className="text-muted-blue" />
            Duygusal Detaylar
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">🎵</span>
              <div>
                <div className="text-[10px] text-text-muted uppercase">En Sevdiğin Hüzünlü Şarkı</div>
                <div className="text-sm text-text-primary">Müslüm Gürses - İtirazım Var</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">🌙</span>
              <div>
                <div className="text-[10px] text-text-muted uppercase">Gece Düşüncesi</div>
                <div className="text-sm text-text-primary italic">&ldquo;Acaba bu şehirde beni gerçekten anlayan biri var mı?&rdquo;</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">🔥</span>
              <div>
                <div className="text-[10px] text-text-muted uppercase">Şu Anki Durum</div>
                <div className="text-sm text-text-primary">Hayatta kalıyorum, idare eder</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">💭</span>
              <div>
                <div className="text-[10px] text-text-muted uppercase">Hayat Felsefesi</div>
                <div className="text-sm text-text-primary italic">&ldquo;Çay varsa hayat güzeldir, yoksa da idare ederiz&rdquo;</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dimension Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-5 mb-4"
        >
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-4">Duygusal Hasar Grafiği</h3>
          <div className="space-y-3">
            {[
              { label: 'Finansal Mücadele', value: score.dimensions.financial, color: '#C4A35A' },
              { label: 'Duygusal Hasar', value: score.dimensions.emotional, color: '#E84040' },
              { label: 'Sosyal Gariban', value: score.dimensions.social, color: '#4A6B8A' },
              { label: 'Mizah Kalkanı', value: score.dimensions.humor, color: '#5A9A5A' },
              { label: 'Hayatta Kalma', value: score.dimensions.survival, color: '#D4845A' },
            ].map((dim, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-text-secondary">{dim.label}</span>
                  <span className="text-xs font-bold" style={{ color: dim.color }}>{dim.value}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: dim.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.value}%` }}
                    transition={{ duration: 1.5, delay: 0.1 * i, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* VIP CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Link href="/vip">
            <div className="glass-card p-5 border-glow-gold bg-gradient-to-r from-dirty-gold/5 to-transparent cursor-pointer hover:from-dirty-gold/10 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👑</span>
                <div>
                  <h3 className="text-sm font-bold text-dirty-gold">VIP Gariban Ol</h3>
                  <p className="text-[11px] text-text-muted">Zengin değilsin ama ruhun VIP olsun</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/5">
        <div className="flex items-center justify-around py-3 max-w-lg mx-auto">
          {[
            { id: 'feed', label: 'Keşfet', emoji: '🔥', href: '/feed' },
            { id: 'swipe', label: 'Eşleş', emoji: '💫', href: '/swipe' },
            { id: 'chat', label: 'Sohbet', emoji: '💬', href: '/feed' },
            { id: 'profile', label: 'Profil', emoji: '👤', href: '/profile', active: true },
            { id: 'vip', label: 'VIP', emoji: '👑', href: '/vip' },
          ].map((tab) => (
            <Link key={tab.id} href={tab.href}>
              <div className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${
                tab.active ? 'text-dirty-gold' : 'text-text-muted'
              }`}>
                <span className="text-lg">{tab.emoji}</span>
                <span className="text-[10px] font-medium">{tab.label}</span>
                {tab.active && <div className="w-1 h-1 rounded-full bg-dirty-gold" />}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
