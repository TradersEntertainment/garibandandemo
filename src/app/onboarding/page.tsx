'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { vibes } from '@/data/questions';
import { saveUser } from '@/utils/storage';
import { ArrowRight, Sparkles, Flame, Zap } from 'lucide-react';
import RainEffect from '@/components/RainEffect';

type Step = 'splash' | 'intro' | 'login' | 'vibe';

const splashWords = ['Mükemmellik', 'Sahtelik', 'Ego', 'Flexleme'];
const introLines = [
  { text: 'Bazıları zengin.', delay: 0.5 },
  { text: 'Bazıları güzel.', delay: 1.5 },
  { text: 'Bazıları popüler.', delay: 2.5 },
  { text: '', delay: 3.5 },
  { text: 'Sen?', delay: 4.0 },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('splash');
  const [name, setName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [currentSplashWord, setCurrentSplashWord] = useState(0);
  const router = useRouter();

  // Splash word cycling
  useEffect(() => {
    if (step !== 'splash') return;
    const interval = setInterval(() => {
      setCurrentSplashWord(prev => {
        if (prev >= splashWords.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStep('intro'), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [step]);

  // Auto-advance from intro to login
  useEffect(() => {
    if (step !== 'intro') return;
    const timer = setTimeout(() => setStep('login'), 6500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleLogin = () => {
    if (name.trim().length < 2) return;
    saveUser({ name: name.trim() });
    setStep('vibe');
  };

  const handleVibeSelect = (vibeId: string) => {
    setSelectedVibe(vibeId);
    setTimeout(() => {
      saveUser({ vibe: vibeId, completedOnboarding: true });
      router.push('/test');
    }, 600);
  };

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-hidden">
      <RainEffect />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/3 w-48 h-48 md:w-80 md:h-80 bg-dirty-gold/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 md:w-64 md:h-64 bg-muted-blue/5 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-warm-neon-red/3 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* ===== SPLASH SCREEN ===== */}
        {step === 'splash' && (
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4"
          >
            {/* Pulsing background ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.05, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-[500px] h-[500px] rounded-full border border-dirty-gold/20"
            />

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs tracking-[0.5em] uppercase text-dirty-gold/40 mb-8 font-bold"
              >
                Bunlardan bıktıysan
              </motion.div>

              <div className="h-20 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSplashWord}
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -40, rotateX: 90 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="text-4xl sm:text-6xl font-[var(--font-heading)] font-bold"
                  >
                    <span className="text-warm-neon-red line-through decoration-2 opacity-80">
                      {splashWords[currentSplashWord]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-text-muted text-sm"
              >
                doğru yerdesin.
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ===== INTRO CINEMATIC ===== */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4"
          >
            <div className="text-center max-w-md space-y-6">
              {introLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: line.delay, duration: 0.6 }}
                  className={`${
                    i === 4
                      ? 'text-4xl sm:text-5xl font-[var(--font-heading)] font-bold text-gradient-gold mt-8'
                      : 'text-xl sm:text-2xl text-text-secondary font-[var(--font-heading)]'
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5.0, type: 'spring', stiffness: 200 }}
              >
                <div className="text-6xl sm:text-8xl font-[var(--font-heading)] font-bold text-gradient-gold mt-4 text-glow-gold">
                  Garibansın.
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.8 }}
                className="text-text-muted text-sm mt-6 italic"
              >
                Ve bu bir güç.
              </motion.p>
            </div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setStep('login')}
              className="absolute bottom-12 text-text-muted/40 text-xs hover:text-text-muted transition-colors"
            >
              atla →
            </motion.button>
          </motion.div>
        )}

        {/* ===== LOGIN SCREEN ===== */}
        {step === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6"
          >
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
              <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/4 left-[15%] text-5xl">🍵</motion.div>
              <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute top-1/3 right-[10%] text-5xl">💔</motion.div>
              <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 2 }} className="absolute bottom-1/3 left-[10%] text-5xl">🫠</motion.div>
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 0.5 }} className="absolute bottom-1/4 right-[20%] text-5xl">🚬</motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="w-full max-w-sm"
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                  className="text-6xl mb-5"
                >
                  🫠
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-[var(--font-heading)] font-bold text-text-primary mb-3">
                  Hoş Geldin, <span className="text-gradient-gold">Gariban</span>
                </h1>
                <p className="text-text-secondary text-sm">Macerana başlamak için adını gir</p>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-strong rounded-2xl p-1 border border-dirty-gold/10 focus-within:border-dirty-gold/40 transition-colors shadow-[0_0_20px_rgba(196,163,90,0.05)]"
                >
                  <input
                    type="text"
                    placeholder="Gariban adını gir..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full bg-transparent px-5 py-4 text-text-primary placeholder-text-muted outline-none text-lg font-medium"
                    maxLength={20}
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(196, 163, 90, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  disabled={name.trim().length < 2}
                  className="w-full py-4 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all glow-gold relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Devam Et <ArrowRight size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-faded-orange via-dirty-gold to-ironic-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 my-6"
                >
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-text-muted text-xs">veya</span>
                  <div className="flex-1 h-px bg-white/10" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-3 gap-3"
                >
                  {[
                    { emoji: '📱', label: 'Telefon' },
                    { emoji: '📧', label: 'Google' },
                    { emoji: '🍎', label: 'Apple' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(196,163,90,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="glass p-4 flex flex-col items-center gap-2 text-text-secondary hover:text-dirty-gold transition-all"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-xs">{item.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== VIBE SELECTION ===== */}
        {step === 'vibe' && (
          <motion.div
            key="vibe"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center min-h-[100dvh] px-4 sm:px-6 py-8 sm:py-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 sm:mb-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-dirty-gold/20 to-bg-dark border border-dirty-gold/30 text-dirty-gold mb-4 glow-gold"
              >
                <Flame size={28} />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                <span className="text-gradient-gold">Vibrasyonunu</span> Seç
              </h1>
              <p className="text-text-secondary text-sm">Duygusal kimliğini en iyi hangisi tanımlıyor?</p>
            </motion.div>

            <div className="w-full max-w-lg grid grid-cols-2 gap-2.5 sm:gap-3 pb-24">
              {vibes.map((vibe, i) => (
                <motion.button
                  key={vibe.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleVibeSelect(vibe.id)}
                  className={`relative overflow-hidden p-4 sm:p-5 text-left transition-all duration-300 rounded-2xl border ${
                    selectedVibe === vibe.id
                      ? 'border-2 scale-95 opacity-80'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                  style={{
                    borderColor: selectedVibe === vibe.id ? vibe.color : undefined,
                    boxShadow: selectedVibe === vibe.id ? `0 0 30px ${vibe.color}33` : undefined,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${vibe.color}, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{vibe.emoji}</div>
                    <h3 className="font-bold text-text-primary text-xs sm:text-sm mb-1">{vibe.title}</h3>
                    <p className="text-text-muted text-[10px] sm:text-xs leading-relaxed">{vibe.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedVibe && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-strong px-6 py-3 flex items-center gap-2 text-dirty-gold rounded-full shadow-[0_0_30px_rgba(196,163,90,0.2)] z-30"
              >
                <Sparkles size={16} />
                <span className="text-sm font-medium">Teste yönlendiriliyorsun...</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
