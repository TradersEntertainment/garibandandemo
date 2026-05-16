'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RainEffect from '@/components/RainEffect';
import { Sparkles, ChevronDown, Flame, Heart, Zap, Star } from 'lucide-react';

const titles = [
  { text: 'Holding On', emoji: '🤏' },
  { text: 'Orta Direk', emoji: '⚖️' },
  { text: 'Çay & Dram Uzmanı', emoji: '🍵' },
  { text: 'Mahalle Protagonisti', emoji: '🎬' },
  { text: 'Sefil Bilo', emoji: '👑' },
];

const stats = [
  { value: '847K', label: 'Gariban Test Çözdü' },
  { value: '2.3M', label: 'Çay İçildi' },
  { value: '156K', label: 'Kader Eşleşti' },
  { value: '∞', label: 'Duygusal Hasar' },
];

export default function LandingPage() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden">
      <RainEffect />

      {/* ===== AMBIENT LIGHT ORBS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-dirty-gold/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-muted-blue/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-2/3 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-warm-neon-red/3 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-dirty-gold/60 font-medium">
            Anti-Dating Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-[var(--font-heading)] font-bold tracking-tight mb-6 sm:mb-8"
        >
          <span className="text-gradient-gold">garibandan</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-[var(--font-heading)] italic text-text-primary/80 leading-relaxed">
            &ldquo;Bazıları zengin.
            <br />
            Bazıları güzel.
            <br />
            <span className="text-dirty-gold text-glow-gold">Bazıları sadece gariban.&rdquo;</span>
          </p>
        </motion.div>

        {/* Rotating Title Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="h-16 flex items-center justify-center mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="glass px-6 py-3 flex items-center gap-3"
            >
              <span className="text-2xl">{titles[currentTitle].emoji}</span>
              <span className="text-lg font-medium text-dirty-gold">{titles[currentTitle].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
        >
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196, 163, 90, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-base sm:text-lg tracking-wide overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={20} />
                Garibanometreye Gir
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-faded-orange to-dirty-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-text-muted"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-center mb-10 sm:mb-16"
        >
          <span className="text-text-primary">Nasıl </span>
          <span className="text-gradient-gold">Çalışır?</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: <Flame />, title: 'Vibrasyonunu Seç', desc: 'Duygusal kimliğini belirle. 8 farklı gariban vibrasyonundan birini seç.', step: '01' },
            { icon: <Zap />, title: 'Garibanometre\'yi Çöz', desc: 'Finansal, duygusal ve sosyal gariban seviyeni ölç. 0-100 arası puan al.', step: '02' },
            { icon: <Heart />, title: 'Kaderini Bul', desc: 'Duygusal uyum, mizah senkronizasyonu ve hayatta kalma enerjisiyle eşleş.', step: '03' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-6 sm:p-8 text-center group hover:border-dirty-gold/30 transition-all duration-500"
            >
              <div className="text-sm text-dirty-gold/40 font-mono mb-4">{item.step}</div>
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-dirty-gold/10 flex items-center justify-center text-dirty-gold group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== GARIBAN TITLES SHOWCASE ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-charcoal/30 to-transparent">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-center mb-4"
        >
          <span className="text-gradient-emotional">Gariban Unvanları</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-text-secondary text-center mb-16 text-lg"
        >
          Hangi seviyedesin?
        </motion.p>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { range: '0-20', title: 'Holding On', emoji: '🤏', desc: 'Henüz tam gariban değilsin ama yoldasın', color: 'from-muted-blue/20 to-transparent' },
            { range: '20-40', title: 'Orta Direk', emoji: '⚖️', desc: 'Klasik Türk orta sınıfı mücadelesi', color: 'from-tv-green/20 to-transparent' },
            { range: '40-60', title: 'Çay & Dram Uzmanı', emoji: '🍵', desc: 'Çay ve drama hayatının iki direği', color: 'from-tea-brown/20 to-transparent' },
            { range: '60-80', title: 'Mahalle Protagonisti', emoji: '🎬', desc: 'Mahallenin ana karakteri sensin', color: 'from-faded-orange/20 to-transparent' },
            { range: '80-100', title: 'Sefil Bilo', emoji: '👑', desc: 'Garibanların kralı, mücadelenin şampiyonu', color: 'from-dirty-gold/20 to-transparent' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 flex items-center gap-5 bg-gradient-to-r ${item.color} hover:border-dirty-gold/20 transition-all duration-500 group`}
            >
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {item.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-dirty-gold/50 bg-dirty-gold/10 px-2 py-0.5 rounded">{item.range}</span>
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                </div>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== VIRAL STATS ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES PREVIEW ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-charcoal/20 to-transparent">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-center mb-10 sm:mb-16"
        >
          <span className="text-text-primary">Neden </span>
          <span className="text-gradient-gold">Garibandan?</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { icon: '🎭', title: 'Anti-Fake Kültür', desc: 'Sahte lüks kültürüne karşı, duygusal gerçeklik ödüllendirilir.' },
            { icon: '🤖', title: 'AI Aura Analizi', desc: 'Yapay zeka duygusal auranı analiz eder ve eşleşme önerileri sunar.' },
            { icon: '💕', title: 'Duygu Bazlı Eşleşme', desc: 'Görünüş değil, duygusal uyum, mizah ve hayatta kalma enerjisi.' },
            { icon: '📱', title: 'Meme-Powered Feed', desc: 'TikTok tarzı sonsuz akış, duygusal itiraflar ve gariban meme\'ler.' },
            { icon: '🏙️', title: 'Şehir Ligleri', desc: 'İstanbul, Ankara, İzmir... Şehrinin gariban liginde yarış.' },
            { icon: '👑', title: 'VIP Gariban', desc: 'İronik lüks. Zengin değilsin ama ruhun VIP.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 flex items-start gap-4 group hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl mb-6">🫠</div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold mb-6">
            <span className="text-text-primary">Sen de </span>
            <span className="text-gradient-gold">gariban mısın?</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto">
            Garibanometre testini çöz, duygusal kimliğini keşfet, kaderini bul.
          </p>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg sm:text-xl tracking-wide glow-gold"
            >
              <span className="flex items-center gap-2">
                <Star size={22} />
                Hadi Başlayalım
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-muted">
            © 2025 Garibandan. Tüm hakları gariban.
          </div>
          <div className="flex gap-6 text-sm text-text-muted">
            <span className="hover:text-dirty-gold transition-colors cursor-pointer">Hakkında</span>
            <span className="hover:text-dirty-gold transition-colors cursor-pointer">Gizlilik</span>
            <span className="hover:text-dirty-gold transition-colors cursor-pointer">İletişim</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
