'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/storage';
import { garibanTitles } from '@/data/questions';
import RadarChart from '@/components/RadarChart';
import { Share2, ArrowRight, Download, Sparkles, X } from 'lucide-react';
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

// Confetti particle
function ConfettiParticle({ delay }: { delay: number }) {
  const colors = ['#C4A35A', '#E84040', '#4A6B8A', '#5A9A5A', '#D4845A', '#8B6914'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const startX = Math.random() * 100;
  const endX = startX + (Math.random() - 0.5) * 40;
  const size = 4 + Math.random() * 6;
  const rotEnd = Math.random() * 720 - 360;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${startX}%`,
        top: '-2%',
        width: size,
        height: size * 1.5,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
      animate={{
        y: '110vh',
        x: `${(endX - startX) * 2}vw`,
        opacity: [1, 1, 0.8, 0],
        rotate: rotEnd,
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        ease: 'easeIn',
      }}
    />
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    const userData = getUser();
    if (!userData.completedTest || !userData.score) {
      router.push('/onboarding');
      return;
    }
    setUser(userData);
    setTimeout(() => setShowDetails(true), 2500);
    setTimeout(() => setShowConfetti(false), 6000);
  }, [router]);

  if (!user || !user.score) return null;

  const { score } = user;
  const titleInfo = garibanTitles[score.titleKey];

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-x-hidden">
      {/* Confetti */}
      {showConfetti && (
        <>
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiParticle key={i} delay={0.5 + i * 0.08} />
          ))}
        </>
      )}

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

            {/* ===== GARIBAN SERTIFIKASI ===== */}
            <div className="glass-card p-6 sm:p-8 text-center relative overflow-hidden border-dirty-gold/20">
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-dirty-gold/40 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-dirty-gold/40 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-dirty-gold/40 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-dirty-gold/40 rounded-br-lg" />

              <div className="text-xs tracking-[0.3em] uppercase text-dirty-gold/50 mb-3">Sertifika</div>
              <div className="text-4xl mb-3">📜</div>
              <h3 className="text-lg font-[var(--font-heading)] font-bold text-gradient-gold mb-1">Gariban Sertifikası</h3>
              <p className="text-text-muted text-xs mb-4">Bu belge ile tasdik olunur ki,</p>
              <div className="text-xl font-bold text-text-primary mb-1">{user.name || 'Gariban'}</div>
              <div className="text-sm text-dirty-gold mb-3">{titleInfo.title} — {score.total}/100</div>
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {score.auraTags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-[9px] bg-dirty-gold/10 text-dirty-gold/80 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="text-[10px] text-text-muted">
                garibandan.com • {new Date().toLocaleDateString('tr-TR')}
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
                  onClick={() => setShowShareCard(true)}
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

      {/* ===== SHARE CARD OVERLAY ===== */}
      <AnimatePresence>
        {showShareCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-xs"
            >
              <button
                onClick={() => setShowShareCard(false)}
                className="absolute top-6 right-6 text-text-muted hover:text-white z-50"
              >
                <X size={24} />
              </button>

              {/* Instagram Story Style Card */}
              <div className="aspect-[9/16] rounded-[32px] overflow-hidden relative bg-gradient-to-b from-[#1a1510] via-bg-dark to-[#0a0a0a] border-2 border-dirty-gold/30 shadow-[0_0_60px_rgba(196,163,90,0.2)]">
                {/* Gold grain overlay */}
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(196,163,90,0.3) 0%, transparent 70%)' }} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-xs tracking-[0.4em] uppercase text-dirty-gold/50 mb-6 font-bold">Garibanometre</div>
                  
                  {/* Score */}
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(196,163,90,0.1)" strokeWidth="6" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#C4A35A" strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * (1 - score.total / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-dirty-gold font-[var(--font-heading)]">{score.total}</div>
                      <div className="text-[8px] text-text-muted">/100</div>
                    </div>
                  </div>

                  <div className="text-4xl mb-3">{titleInfo.emoji}</div>
                  <h2 className="text-2xl font-[var(--font-heading)] font-bold text-gradient-gold mb-2">{titleInfo.title}</h2>
                  <p className="text-text-secondary text-xs mb-6 max-w-[180px]">{titleInfo.description}</p>

                  {/* Mini Aura Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                    {score.auraTags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-[8px] font-medium bg-dirty-gold/10 text-dirty-gold border border-dirty-gold/15 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Watermark */}
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <div className="text-sm font-[var(--font-heading)] font-bold text-gradient-gold mb-1">garibandan.com</div>
                    <div className="text-[8px] text-text-muted tracking-wider">SEN DE GARIBAN MISIN? TESTE GİR</div>
                  </div>
                </div>
              </div>

              <p className="text-center text-text-muted text-xs mt-4">Ekran görüntüsü alıp Story&apos;ne at!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
