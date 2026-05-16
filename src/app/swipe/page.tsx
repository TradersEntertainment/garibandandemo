'use client';

import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useCallback } from 'react';
import { mockProfiles, Profile } from '@/data/profiles';
import { garibanTitles } from '@/data/questions';
import { Heart, X, Soup, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';

function SwipeCard({
  profile,
  onSwipe,
  isTop,
}: {
  profile: Profile;
  onSwipe: (dir: 'left' | 'right' | 'super') => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const leftOpacity = useTransform(x, [-150, 0], [1, 0]);
  const rightOpacity = useTransform(x, [0, 150], [0, 1]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 120) {
      onSwipe('right');
    } else if (info.offset.x < -120) {
      onSwipe('left');
    }
  };

  const titleInfo = garibanTitles[profile.titleKey] || { title: profile.titleKey, emoji: '🫠' };

  return (
    <motion.div
      className="absolute inset-0 swipe-card"
      style={{ x, rotate, zIndex: isTop ? 10 : 5 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.5 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      exit={{
        x: 300,
        opacity: 0,
        rotate: 20,
        transition: { duration: 0.3 },
      }}
    >
      <div className="glass-card h-full p-6 flex flex-col overflow-hidden relative">
        {/* Swipe Overlays */}
        <motion.div
          style={{ opacity: leftOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-warm-neon-red/10 rounded-[20px] pointer-events-none"
        >
          <div className="px-8 py-4 border-4 border-warm-neon-red rounded-2xl rotate-[-20deg]">
            <span className="text-3xl font-bold text-warm-neon-red">Eyvallah</span>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: rightOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-dirty-gold/10 rounded-[20px] pointer-events-none"
        >
          <div className="px-8 py-4 border-4 border-dirty-gold rounded-2xl rotate-[20deg]">
            <span className="text-3xl font-bold text-dirty-gold">Kaderimizdir</span>
          </div>
        </motion.div>

        {/* Avatar / Visual */}
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-charcoal to-bg-dark border-2 border-dirty-gold/20 flex items-center justify-center text-6xl mb-6 shadow-lg">
            {profile.avatar}
          </div>

          <h2 className="text-2xl font-[var(--font-heading)] font-bold text-text-primary mb-1">
            {profile.name}, {profile.age}
          </h2>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{titleInfo.emoji}</span>
            <span className="text-sm font-medium text-dirty-gold">{titleInfo.title}</span>
            <span className="text-xs text-text-muted">• {profile.score}/100</span>
          </div>

          <div className="text-xs text-text-secondary mb-4 italic">&ldquo;{profile.vibe}&rdquo;</div>

          {/* Aura Tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {profile.auraTags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[10px] font-medium bg-dirty-gold/10 text-dirty-gold/80 border border-dirty-gold/15 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Emotional Battery */}
          <div className="w-full max-w-xs mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-text-muted uppercase tracking-wider">Duygusal Batarya</span>
              <span className="text-[10px] text-warm-neon-red font-mono">{profile.emotionalBattery}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-warm-neon-red to-faded-orange"
                style={{ width: `${profile.emotionalBattery}%` }}
              />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
            <div className="text-center">
              <div className="text-xs text-dirty-gold font-bold">{profile.heartbreakLevel}%</div>
              <div className="text-[9px] text-text-muted">Kalp Kırıklığı</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-tea-brown font-bold">{profile.teaAddiction}%</div>
              <div className="text-[9px] text-text-muted">Çay Bağımlılığı</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-blue font-bold">{profile.score}</div>
              <div className="text-[9px] text-text-muted">Gariban Skoru</div>
            </div>
          </div>
        </div>

        {/* AI Compatibility Line */}
        <div className="glass p-3 flex items-center gap-2">
          <Sparkles size={14} className="text-dirty-gold shrink-0" />
          <p className="text-xs text-text-secondary italic">{profile.compatibilityLine}</p>
        </div>
      </div>
    </motion.div>
  );
}

function MatchOverlay({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/90 backdrop-blur-xl p-6"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="text-center max-w-sm"
      >
        {/* Celebration particles */}
        <div className="relative">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-dirty-gold"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 30 * Math.PI) / 180) * 120,
                y: Math.sin((i * 30 * Math.PI) / 180) * 120,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-6xl mb-6"
        >
          ✨
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl font-[var(--font-heading)] font-bold text-gradient-gold mb-3"
        >
          Kader Ağlarını Ördü
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-text-secondary text-sm mb-8"
        >
          İki gariban bir araya geldi.
          <br />
          <span className="text-dirty-gold">{profile.name}</span> ile eşleştin!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-3"
        >
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Mesaj Gönder
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 glass text-text-secondary text-sm hover:text-text-primary transition-colors"
          >
            Devam Et
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);

  const handleSwipe = useCallback((dir: 'left' | 'right' | 'super') => {
    const profile = mockProfiles[currentIndex];

    if (dir === 'right' || dir === 'super') {
      // 30% chance of match
      if (Math.random() > 0.7) {
        setMatchProfile(profile);
      }
    }

    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex]);

  const hasMoreProfiles = currentIndex < mockProfiles.length;

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden flex flex-col">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-dirty-gold/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-muted-blue/4 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-20 p-6 flex items-center justify-between">
        <Link href="/feed" className="text-text-muted hover:text-text-primary transition-colors">
          <span className="text-sm">Akış</span>
        </Link>
        <h1 className="text-lg font-[var(--font-heading)] font-bold text-gradient-gold">Eşleş</h1>
        <Link href="/profile" className="text-text-muted hover:text-text-primary transition-colors">
          <span className="text-sm">Profil</span>
        </Link>
      </div>

      {/* Card Stack */}
      <div className="relative z-10 flex-1 px-6 pb-32">
        <div className="relative w-full max-w-sm mx-auto h-full" style={{ minHeight: '500px' }}>
          {!hasMoreProfiles ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div className="text-5xl mb-4">🫠</div>
              <h2 className="text-xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                Şimdilik bu kadar
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Yeni garibanlar geldiğinde bildirim alacaksın
              </p>
              <Link href="/feed">
                <button className="glass px-6 py-3 text-dirty-gold text-sm font-medium hover:bg-white/[0.06] transition-all">
                  Akışa Git →
                </button>
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence>
              {mockProfiles.slice(currentIndex, currentIndex + 2).reverse().map((profile, i) => (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  onSwipe={handleSwipe}
                  isTop={i === (Math.min(2, mockProfiles.length - currentIndex) - 1)}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {hasMoreProfiles && (
        <div className="fixed bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full glass flex items-center justify-center text-warm-neon-red hover:bg-warm-neon-red/10 transition-all"
          >
            <X size={28} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('super')}
            className="w-14 h-14 rounded-full glass flex items-center justify-center text-faded-orange hover:bg-faded-orange/10 transition-all"
          >
            <Soup size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 rounded-full glass flex items-center justify-center text-dirty-gold hover:bg-dirty-gold/10 transition-all glow-gold"
          >
            <Heart size={28} />
          </motion.button>
        </div>
      )}

      {/* Button Labels */}
      {hasMoreProfiles && (
        <div className="fixed bottom-2 left-0 right-0 z-30 flex items-center justify-center gap-12 text-[9px] text-text-muted">
          <span>Eyvallah</span>
          <span>Çorba Ismarla</span>
          <span>Kaderimizdir</span>
        </div>
      )}

      {/* Match Overlay */}
      <AnimatePresence>
        {matchProfile && (
          <MatchOverlay
            profile={matchProfile}
            onClose={() => setMatchProfile(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
