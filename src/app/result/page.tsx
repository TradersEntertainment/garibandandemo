'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/storage';
import { garibanTitles } from '@/data/questions';
import RadarChart from '@/components/RadarChart';
import { Share2, ArrowRight, Download, Sparkles } from 'lucide-react';
import Link from 'next/link';

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function ResultPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const userData = getUser();
    if (!userData.completedTest || !userData.score) {
      router.push('/onboarding');
      return;
    }
    setUser(userData);
    setTimeout(() => setShowDetails(true), 2500);
  }, [router]);

  if (!user || !user.score) return null;

  const { score } = user;
  const titleInfo = garibanTitles[score.titleKey];

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-x-hidden">
      {/* Celebration ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 md:w-96 md:h-96 bg-dirty-gold/8 rounded-full blur-[80px] md:blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-faded-orange/5 rounded-full blur-[60px] md:blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-warm-neon-red/3 rounded-full blur-[50px] md:blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 min-h-[100dvh]">
        {/* ===== SCORE REVEAL ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm tracking-[0.3em] uppercase text-dirty-gold/60 mb-4"
          >
            Garibanometre Sonucu
          </motion.div>

          {/* Score Ring */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-4 sm:mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#C4A35A"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - score.total / 100) }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-5xl font-bold text-gradient-gold font-[var(--font-heading)]">
                <AnimatedCounter target={score.total} />
              </div>
              <div className="text-xs text-text-muted mt-1">/ 100</div>
            </div>
          </div>

          {/* Title Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="text-5xl mb-3">{titleInfo.emoji}</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-gradient-gold mb-2">
              {titleInfo.title}
            </h1>
            <p className="text-text-secondary text-sm max-w-xs mx-auto">{titleInfo.description}</p>
          </motion.div>
        </motion.div>

        {/* ===== DETAILS ===== */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm space-y-4 sm:space-y-6"
          >
            {/* Radar Chart */}
            <div className="glass-card p-4 sm:p-6 flex flex-col items-center">
              <h3 className="text-xs sm:text-sm font-medium text-text-secondary mb-3 sm:mb-4 tracking-wider uppercase">Gariban Profili</h3>
              <RadarChart dimensions={score.dimensions} size={200} />
            </div>

            {/* Aura Tags */}
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4 tracking-wider uppercase flex items-center gap-2">
                <Sparkles size={14} className="text-dirty-gold" />
                Aura Etiketleri
              </h3>
              <div className="flex flex-wrap gap-2">
                {score.auraTags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="px-3 py-1.5 text-xs font-medium bg-dirty-gold/10 text-dirty-gold border border-dirty-gold/20 rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Dimension Bars */}
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4 tracking-wider uppercase">Gariban Boyutları</h3>
              <div className="space-y-4">
                {[
                  { label: 'Finansal Mücadele', value: score.dimensions.financial, color: '#C4A35A', emoji: '💸' },
                  { label: 'Duygusal Hasar', value: score.dimensions.emotional, color: '#E84040', emoji: '💔' },
                  { label: 'Sosyal Gariban', value: score.dimensions.social, color: '#4A6B8A', emoji: '🫠' },
                  { label: 'Mizah Seviyesi', value: score.dimensions.humor, color: '#5A9A5A', emoji: '😂' },
                  { label: 'Hayatta Kalma', value: score.dimensions.survival, color: '#D4845A', emoji: '🔥' },
                ].map((dim, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-text-secondary flex items-center gap-1.5">
                        <span>{dim.emoji}</span>
                        {dim.label}
                      </span>
                      <span className="text-xs font-bold" style={{ color: dim.color }}>{dim.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: dim.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${dim.value}%` }}
                        transition={{ duration: 1.5, delay: 0.2 * i, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 pb-8">
              <Link href="/swipe" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2"
                >
                  Eşleşmeye Başla <ArrowRight size={20} />
                </motion.button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass py-3 flex items-center justify-center gap-2 text-text-secondary text-sm hover:text-dirty-gold transition-colors"
                >
                  <Share2 size={16} />
                  Paylaş
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass py-3 flex items-center justify-center gap-2 text-text-secondary text-sm hover:text-dirty-gold transition-colors"
                >
                  <Download size={16} />
                  Kaydet
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
