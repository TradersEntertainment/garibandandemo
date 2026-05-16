'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { vibes } from '@/data/questions';
import { saveUser } from '@/utils/storage';
import { Phone, Mail, Apple, ArrowRight, Sparkles } from 'lucide-react';

type Step = 'login' | 'vibe';

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('login');
  const [name, setName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const router = useRouter();

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
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/3 w-48 h-48 md:w-80 md:h-80 bg-dirty-gold/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 md:w-64 md:h-64 bg-muted-blue/5 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-sm"
            >
              <div className="text-center mb-10">
                <div className="text-5xl mb-4">🫠</div>
                <h1 className="text-2xl sm:text-3xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                  Hoş Geldin, <span className="text-gradient-gold">Gariban</span>
                </h1>
                <p className="text-text-secondary text-sm">Macerana başlamak için adını gir</p>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-1">
                  <input
                    type="text"
                    placeholder="Adını gir..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full bg-transparent px-5 py-4 text-text-primary placeholder-text-muted outline-none text-lg font-medium"
                    maxLength={20}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  disabled={name.trim().length < 2}
                  className="w-full py-4 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Devam Et <ArrowRight size={20} />
                </motion.button>

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-text-muted text-xs">veya</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <Phone size={20} />, label: 'Telefon' },
                    { icon: <Mail size={20} />, label: 'Google' },
                    { icon: <Apple size={20} />, label: 'Apple' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass p-4 flex flex-col items-center gap-2 text-text-secondary hover:text-dirty-gold hover:border-dirty-gold/20 transition-all"
                    >
                      {item.icon}
                      <span className="text-xs">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

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
              className="text-center mb-6 sm:mb-10"
            >
              <div className="text-4xl mb-3">✨</div>
              <h1 className="text-2xl sm:text-3xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                <span className="text-gradient-gold">Vibrasyonunu</span> Seç
              </h1>
              <p className="text-text-secondary text-sm">Duygusal kimliğini en iyi hangisi tanımlıyor?</p>
            </motion.div>

            <div className="w-full max-w-lg grid grid-cols-2 gap-2.5 sm:gap-3">
              {vibes.map((vibe, i) => (
                <motion.button
                  key={vibe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{ scale: 1.03, borderColor: vibe.color + '60' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleVibeSelect(vibe.id)}
                  className={`glass-card p-4 sm:p-5 text-left transition-all duration-300 ${
                    selectedVibe === vibe.id
                      ? 'border-2 scale-95 opacity-80'
                      : 'hover:bg-white/[0.04]'
                  }`}
                  style={{
                    borderColor: selectedVibe === vibe.id ? vibe.color : undefined,
                    boxShadow: selectedVibe === vibe.id ? `0 0 30px ${vibe.color}33` : undefined,
                  }}
                >
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{vibe.emoji}</div>
                  <h3 className="font-bold text-text-primary text-xs sm:text-sm mb-1">{vibe.title}</h3>
                  <p className="text-text-muted text-[10px] sm:text-xs leading-relaxed">{vibe.description}</p>
                </motion.button>
              ))}
            </div>

            {selectedVibe && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 glass px-6 py-3 flex items-center gap-2 text-dirty-gold"
              >
                <Sparkles size={16} />
                <span className="text-sm font-medium">Vibrasyonun seçildi, teste yönlendiriliyorsun...</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
