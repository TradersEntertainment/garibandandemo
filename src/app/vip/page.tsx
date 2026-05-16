'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
  CreditCard,
  XCircle,
  AlertTriangle,
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
  { id: 'monthly', name: 'Aylık Çorba', price: '49.99', period: '/ay', corbaPara: '500', popular: false },
  { id: 'quarterly', name: '3 Aylık Çorba', price: '119.99', period: '/3 ay', corbaPara: '1800', popular: true, save: '%20 tasarruf' },
  { id: 'yearly', name: 'Yıllık Çorba', price: '399.99', period: '/yıl', corbaPara: '8000', popular: false, save: '%33 tasarruf' },
];

const rejectMessages = [
  { title: 'BANKA RED: YETERSİZ BAKİYE', subtitle: 'İşlem Reddedildi', emoji: '💳❌' },
  { title: 'SEN KİM VIP OLMAK KİM?', subtitle: 'Gariban kal, güzel kal.', emoji: '👑🚫' },
  { title: 'KREDİ KARTI LİMİTİN: 0 TL', subtitle: 'Sürpriz değil aslında.', emoji: '📉💀' },
  { title: 'BANKA MESAJI: LOL', subtitle: 'Bankan bile gülüyor sana.', emoji: '🏦😂' },
];

type VipState = 'browse' | 'payment' | 'processing' | 'rejected' | 'glitch';

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  const [vipState, setVipState] = useState<VipState>('browse');
  const [cardNumber, setCardNumber] = useState('');
  const [rejectMsg, setRejectMsg] = useState(rejectMessages[0]);

  const handlePurchase = () => {
    setVipState('payment');
  };

  const handlePayment = () => {
    setVipState('processing');
    
    setTimeout(() => {
      setRejectMsg(rejectMessages[Math.floor(Math.random() * rejectMessages.length)]);
      setVipState('glitch');
      
      setTimeout(() => {
        setVipState('rejected');
      }, 1500);
    }, 2500);
  };

  const formatCardNumber = (val: string) => {
    const nums = val.replace(/\D/g, '').slice(0, 16);
    return nums.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden">
      {/* Gold ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-dirty-gold/8 rounded-full blur-[200px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-ironic-gold/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* ===== BROWSE STATE ===== */}
        {vipState === 'browse' && (
          <motion.div key="browse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-6xl mb-4">
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
                <h2 className="text-sm text-text-muted uppercase tracking-wider mb-4 text-center">Premium Gariban Özellikleri</h2>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }} className="glass-card p-4 group hover:border-dirty-gold/20 transition-all">
                      <div className="text-dirty-gold mb-2 group-hover:scale-110 transition-transform">{feature.icon}</div>
                      <h3 className="text-xs font-bold text-text-primary mb-1">{feature.title}</h3>
                      <p className="text-[10px] text-text-muted leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Pricing */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                <h2 className="text-sm text-text-muted uppercase tracking-wider mb-4 text-center">Çorba Parası ile Öde</h2>
                <div className="space-y-3">
                  {plans.map((plan) => (
                    <motion.button key={plan.id} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full p-5 rounded-2xl text-left transition-all relative overflow-hidden ${selectedPlan === plan.id ? 'glass-card border-dirty-gold/40 glow-gold' : 'glass hover:bg-white/[0.04]'}`}
                    >
                      {plan.popular && <div className="absolute top-0 right-0 px-3 py-1 bg-dirty-gold text-bg-dark text-[9px] font-bold rounded-bl-xl">EN POPÜLER</div>}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {selectedPlan === plan.id && <div className="w-5 h-5 rounded-full bg-dirty-gold flex items-center justify-center"><Check size={12} className="text-bg-dark" /></div>}
                            <h3 className="text-sm font-bold text-text-primary">{plan.name}</h3>
                            {plan.save && <span className="px-2 py-0.5 text-[9px] font-medium bg-tv-green/10 text-tv-green rounded-full">{plan.save}</span>}
                          </div>
                          <p className="text-xs text-text-muted">{plan.corbaPara} Çorba Parası dahil</p>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(196, 163, 90, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePurchase}
                  className="w-full py-4 bg-gradient-to-r from-dirty-gold via-ironic-gold to-dirty-gold rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2 glow-gold"
                >
                  <Crown size={20} />
                  VIP Gariban Ol
                </motion.button>
                <p className="text-center text-[10px] text-text-muted mt-3">İstediğin zaman iptal edebilirsin. Gariban kalbin değişmez.</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ===== PAYMENT STATE ===== */}
        {vipState === 'payment' && (
          <motion.div key="payment" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-sm">
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">💳</div>
                <h2 className="text-2xl font-[var(--font-heading)] font-bold text-gradient-gold mb-2">Ödeme Bilgileri</h2>
                <p className="text-text-secondary text-sm">VIP Gariban olmak için kartını gir</p>
              </div>

              <div className="glass-strong rounded-[24px] p-6 space-y-5 border border-dirty-gold/20">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Kart Numarası</label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-text-primary font-mono tracking-wider focus:outline-none focus:border-dirty-gold/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Son Kullanma</label>
                    <input type="text" placeholder="AA/YY" maxLength={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-text-primary font-mono focus:outline-none focus:border-dirty-gold/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">CVV</label>
                    <input type="text" placeholder="•••" maxLength={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-text-primary font-mono focus:outline-none focus:border-dirty-gold/50 transition-colors" />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    className="w-full py-4 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg flex items-center justify-center gap-2"
                  >
                    Ödemeyi Onayla — ₺{plans.find(p => p.id === selectedPlan)?.price}
                  </motion.button>
                  <button onClick={() => setVipState('browse')} className="w-full py-3 text-text-muted text-sm hover:text-white transition-colors">
                    Geri Dön
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-text-muted">
                <Shield size={14} />
                <span className="text-[10px]">256-bit SSL ile korunan güvenli ödeme</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== PROCESSING STATE ===== */}
        {vipState === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="w-16 h-16 border-4 border-dirty-gold/20 border-t-dirty-gold rounded-full mb-8" />
            <h2 className="text-xl font-[var(--font-heading)] font-bold text-text-primary mb-2">İşleniyor...</h2>
            <p className="text-text-secondary text-sm">Banka ile iletişime geçiliyor</p>
          </motion.div>
        )}

        {/* ===== GLITCH STATE ===== */}
        {vipState === 'glitch' && (
          <motion.div key="glitch" className="relative z-10 fixed inset-0 bg-bg-dark">
            <motion.div
              animate={{ x: [0, -5, 5, -3, 3, 0], y: [0, 3, -3, 2, -2, 0], opacity: [1, 0.5, 1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-screen px-6"
            >
              <div className="text-8xl mb-4">💀</div>
              <div className="text-warm-neon-red font-mono text-sm text-center">
                ERROR ERROR ERROR<br/>
                SYSTEM_CRASH<br/>
                BAKIYE_NOT_FOUND<br/>
                GARIBAN_DETECTED
              </div>
            </motion.div>
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)'
            }} />
          </motion.div>
        )}

        {/* ===== REJECTED STATE ===== */}
        {vipState === 'rejected' && (
          <motion.div key="rejected" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              className="w-full max-w-sm text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-7xl mb-6"
              >
                {rejectMsg.emoji}
              </motion.div>

              <div className="glass-strong rounded-[24px] p-8 border-2 border-warm-neon-red/30 shadow-[0_0_40px_rgba(232,64,64,0.2)] mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <XCircle size={24} className="text-warm-neon-red" />
                  <AlertTriangle size={24} className="text-warm-neon-red" />
                </div>
                <h2 className="text-2xl font-[var(--font-heading)] font-bold text-warm-neon-red mb-3">
                  {rejectMsg.title}
                </h2>
                <p className="text-text-secondary text-sm mb-4">{rejectMsg.subtitle}</p>
                <div className="bg-warm-neon-red/10 rounded-xl p-4 border border-warm-neon-red/20">
                  <p className="text-xs text-text-secondary italic leading-relaxed">
                    &ldquo;Bazıları VIP olur. Bazıları Premium alır. Sen sadece garibansın. Ama bu da güzel bir şey.&rdquo;
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setVipState('browse'); setCardNumber(''); }}
                  className="w-full py-4 glass text-text-primary font-bold rounded-2xl hover:bg-white/[0.06] transition-all"
                >
                  😔 Kaderi Kabul Et
                </motion.button>
                <Link href="/feed" className="block">
                  <button className="w-full py-3 text-text-muted text-sm hover:text-dirty-gold transition-colors">
                    Akışa dön, dertlen
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
