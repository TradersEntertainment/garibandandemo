'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  Sparkles,
  Eye,
  Heart,
  MessageCircle,
  Palette,
  Shield,
  Zap,
  Star,
  Check,
  ArrowLeft,
} from 'lucide-react';

const features = [
  { icon: <Zap size={20} />, title: 'Artırılmış Görünürlük', desc: 'Proflin daha çok kişiye gösterilir' },
  { icon: <Sparkles size={20} />, title: 'Gelişmiş Aura Analizi', desc: 'AI destekli derinlemesine aura raporu' },
  { icon: <Heart size={20} />, title: 'Duygusal Uyum Raporu', desc: 'Her eşleşme için detaylı uyum analizi' },
  { icon: <MessageCircle size={20} />, title: 'Sınırsız Mesajlaşma', desc: 'Günlük 3 mesaj sınırı kalkar' },
  { icon: <Palette size={20} />, title: 'Profil Glow Efektleri', desc: 'Profiline sinematik parıltı ekle' },
  { icon: <Eye size={20} />, title: 'Gizli Hayranlar', desc: 'Seni beğenenleri gör' },
  { icon: <Shield size={20} />, title: 'Sinematik Profil Temaları', desc: 'Özel profil arka planları ve temalar' },
  { icon: <Star size={20} />, title: 'VIP Gariban Rozeti', desc: 'Profilinde ironic lüks altın rozet' },
];

const plans = [
  {
    id: 'monthly',
    name: 'Aylık Çorba',
    price: '49.99',
    period: '/ay',
    corbaPara: '500',
    popular: false,
  },
  {
    id: 'quarterly',
    name: '3 Aylık Çorba',
    price: '119.99',
    period: '/3 ay',
    corbaPara: '1800',
    popular: true,
    save: '%20 tasarruf',
  },
  {
    id: 'yearly',
    name: 'Yıllık Çorba',
    price: '399.99',
    period: '/yıl',
    corbaPara: '8000',
    popular: false,
    save: '%33 tasarruf',
  },
];

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState('quarterly');

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden">
      {/* Gold ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-dirty-gold/8 rounded-full blur-[200px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-ironic-gold/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-20 p-6 flex items-center justify-between">
        <Link href="/profile" className="text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <Crown size={20} className="text-ironic-gold" />
          <span className="font-[var(--font-heading)] font-bold text-gradient-gold">VIP Gariban</span>
        </div>
        <div className="w-5" />
      </div>

      <div className="relative z-10 px-6 max-w-lg mx-auto pb-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            👑
          </motion.div>
          <h1 className="text-3xl font-[var(--font-heading)] font-bold mb-3">
            <span className="text-gradient-gold">VIP Gariban</span>
          </h1>
          <p className="text-text-secondary text-sm italic max-w-xs mx-auto">
            &ldquo;Zengin değilsin ama ruhun VIP. <br/>Bu da bir şey.&rdquo;
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-sm text-text-muted uppercase tracking-wider mb-4 text-center">
            Premium Gariban Özellikleri
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="glass-card p-4 group hover:border-dirty-gold/20 transition-all"
              >
                <div className="text-dirty-gold mb-2 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xs font-bold text-text-primary mb-1">{feature.title}</h3>
                <p className="text-[10px] text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-sm text-text-muted uppercase tracking-wider mb-4 text-center">
            Çorba Parası ile Öde
          </h2>

          <div className="space-y-3">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full p-5 rounded-2xl text-left transition-all relative overflow-hidden ${
                  selectedPlan === plan.id
                    ? 'glass-card border-dirty-gold/40 glow-gold'
                    : 'glass hover:bg-white/[0.04]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-dirty-gold text-bg-dark text-[9px] font-bold rounded-bl-xl">
                    EN POPÜLER
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {selectedPlan === plan.id && (
                        <div className="w-5 h-5 rounded-full bg-dirty-gold flex items-center justify-center">
                          <Check size={12} className="text-bg-dark" />
                        </div>
                      )}
                      <h3 className="text-sm font-bold text-text-primary">{plan.name}</h3>
                      {plan.save && (
                        <span className="px-2 py-0.5 text-[9px] font-medium bg-tv-green/10 text-tv-green rounded-full">
                          {plan.save}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">
                      {plan.corbaPara} Çorba Parası dahil
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gradient-gold">₺{plan.price}</div>
                    <div className="text-[10px] text-text-muted">{plan.period}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(196, 163, 90, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-dirty-gold via-ironic-gold to-dirty-gold rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2 glow-gold"
          >
            <Crown size={20} />
            VIP Gariban Ol
          </motion.button>

          <p className="text-center text-[10px] text-text-muted mt-3">
            İstediğin zaman iptal edebilirsin. Gariban kalbin değişmez.
          </p>
        </motion.div>

        {/* Currency Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 glass-card p-5"
        >
          <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
            🍲 Çorba Parası Nedir?
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            Çorba Parası, Garibandan&apos;ın uygulama içi para birimidir. Aşağıdaki işlemler için kullanılır:
          </p>
          <div className="space-y-2">
            {[
              'Ekstra mesaj gönderme',
              'Profil boost (artırılmış görünürlük)',
              'Duygusal reaksiyon gönderme',
              'Aura okuma kilidi açma',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                <div className="w-1 h-1 rounded-full bg-dirty-gold" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-white/[0.02] rounded-xl">
            <p className="text-[10px] text-text-muted">
              💡 Ücretsiz kullanıcılar günde 3 mesaj gönderebilir. VIP ile sınırsız mesajlaşma hakkı kazanırsın.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
