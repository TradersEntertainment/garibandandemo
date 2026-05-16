'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/storage';
import { garibanTitles, vibes } from '@/data/questions';
import RadarChart from '@/components/RadarChart';
import BottomNav from '@/components/BottomNav';
import { Settings, Edit3, Sparkles, Music, Coffee, Heart, Zap, Moon, BookOpen, Plus, Trash2, Crown } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editVibe, setEditVibe] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'veresiye'>('profile');
  const [veresiyeEntries, setVeresiyeEntries] = useState([
    { id: 1, to: 'Evrene', debt: '1 adet mutlu son', emoji: '🌌' },
    { id: 2, to: 'Bakkal Mehmet Amca', debt: '250 TL', emoji: '🏪' },
    { id: 3, to: 'Eski sevgiliye', debt: '3 yıllık gençliğim', emoji: '💔' },
    { id: 4, to: 'Kendime', debt: 'Bir tatil', emoji: '🏖️' },
  ]);
  const [isVeresiyeModalOpen, setIsVeresiyeModalOpen] = useState(false);
  const [newVeresiyeTo, setNewVeresiyeTo] = useState('');
  const [newVeresiyeDebt, setNewVeresiyeDebt] = useState('');
  const [newVeresiyeEmoji, setNewVeresiyeEmoji] = useState('📝');

  useEffect(() => {
    const userData = getUser();
    if (!userData.completedTest || !userData.score) {
      router.push('/onboarding');
      return;
    }
    setUser(userData);
    setEditName(userData.name || '');
    setEditVibe(userData.vibe || '');
  }, [router]);

  const handleSaveProfile = () => {
    if (!user) return;
    // We would normally save this to storage, but for the demo we'll just update local state
    setUser({ ...user, name: editName, vibe: editVibe });
    setIsEditModalOpen(false);
  };

  const handleAddVeresiye = () => {
    if (!newVeresiyeTo.trim() || !newVeresiyeDebt.trim()) return;
    setVeresiyeEntries(prev => [...prev, {
      id: Date.now(),
      to: newVeresiyeTo,
      debt: newVeresiyeDebt,
      emoji: newVeresiyeEmoji
    }]);
    setNewVeresiyeTo('');
    setNewVeresiyeDebt('');
    setNewVeresiyeEmoji('📝');
    setIsVeresiyeModalOpen(false);
  };

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
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="glass w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-dirty-gold transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-dirty-gold transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-lg mx-auto">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'profile' ? 'bg-dirty-gold text-bg-dark' : 'glass text-text-muted hover:text-text-primary'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('veresiye')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'veresiye' ? 'bg-dirty-gold text-bg-dark' : 'glass text-text-muted hover:text-text-primary'
            }`}
          >
            <BookOpen size={14} /> Veresiye Defteri
          </button>
        </div>

        <AnimatePresence mode="wait">
        {activeTab === 'profile' ? (
        <motion.div key="profile-tab" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
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

        </motion.div>
        ) : (
        <motion.div key="veresiye-tab" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
          {/* VERESIYE DEFTERI */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">📖</div>
            <h2 className="text-xl font-[var(--font-heading)] font-bold text-gradient-gold mb-2">Veresiye Defteri</h2>
            <p className="text-text-secondary text-xs">Manevi ve maddi borçlarını burada tut</p>
          </div>

          <div className="space-y-3 mb-6">
            {veresiyeEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                    {entry.emoji}
                  </div>
                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wider">{entry.to}</div>
                    <div className="text-sm font-bold text-text-primary">{entry.debt}</div>
                  </div>
                </div>
                <button
                  onClick={() => setVeresiyeEntries(prev => prev.filter(e => e.id !== entry.id))}
                  className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-warm-neon-red transition-all p-2"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVeresiyeModalOpen(true)}
            className="w-full py-4 glass flex items-center justify-center gap-2 text-dirty-gold font-bold text-sm rounded-2xl hover:bg-white/[0.04] transition-all mb-8"
          >
            <Plus size={18} /> Borç Ekle
          </motion.button>
        </motion.div>
        )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-bg-dark sm:rounded-[32px] rounded-t-[32px] border border-white/10 overflow-hidden shadow-2xl pb-safe"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-text-muted hover:text-white transition-colors text-sm">
                  İptal
                </button>
                <h3 className="font-bold text-text-primary">Profili Düzenle</h3>
                <button 
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 bg-dirty-gold text-bg-dark rounded-full font-bold text-sm"
                >
                  Kaydet
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Gariban İsmi</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-dirty-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Vibrasyon</label>
                  <div className="grid grid-cols-2 gap-2">
                    {vibes.slice(0, 4).map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setEditVibe(v.id)}
                        className={`p-3 rounded-xl border text-left transition-colors flex items-center gap-2 ${
                          editVibe === v.id ? 'border-dirty-gold bg-dirty-gold/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xl">{v.emoji}</span>
                        <span className="text-xs font-bold truncate">{v.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Veresiye Modal */}
      <AnimatePresence>
        {isVeresiyeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-bg-dark sm:rounded-[32px] rounded-t-[32px] border border-white/10 overflow-hidden shadow-2xl pb-safe"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <button onClick={() => setIsVeresiyeModalOpen(false)} className="px-4 py-2 text-text-muted text-sm">İptal</button>
                <h3 className="font-bold text-text-primary">Borç Ekle</h3>
                <button onClick={handleAddVeresiye} disabled={!newVeresiyeTo.trim() || !newVeresiyeDebt.trim()} className="px-4 py-1.5 bg-dirty-gold text-bg-dark rounded-full font-bold text-sm disabled:opacity-50">Ekle</button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Kime Borçlusun?</label>
                  <input type="text" value={newVeresiyeTo} onChange={(e) => setNewVeresiyeTo(e.target.value)} placeholder="Ör: Evrene, Bakkal Amca..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-dirty-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Ne Borçlusun?</label>
                  <input type="text" value={newVeresiyeDebt} onChange={(e) => setNewVeresiyeDebt(e.target.value)} placeholder="Ör: 3 yıllık gençlik, 250 TL..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-dirty-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Emoji</label>
                  <div className="flex gap-2 flex-wrap">
                    {['📝', '💔', '🏪', '🌌', '🏖️', '💸', '🎓', '🚬', '🍵', '😭'].map(e => (
                      <button key={e} onClick={() => setNewVeresiyeEmoji(e)} className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${newVeresiyeEmoji === e ? 'bg-dirty-gold/20 border border-dirty-gold/40 scale-110' : 'bg-white/5 border border-white/10'}`}>{e}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <BottomNav active="profile" />
    </main>
  );
}
