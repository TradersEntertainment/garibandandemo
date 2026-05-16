'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { feedPosts, FeedPost } from '@/data/feedPosts';
import { garibanTitles } from '@/data/questions';
import { Sparkles, MessageCircle, Share2, Plus, PenSquare } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

const categories = [
  { id: 'all', label: 'Tümü', emoji: '🔥' },
  { id: 'dram', label: 'Dram', emoji: '🎭' },
  { id: 'meme', label: 'Meme', emoji: '🤡' },
  { id: 'itiraf', label: 'İtiraf', emoji: '🤫' },
  { id: 'cay', label: 'Çay Vakti', emoji: '🍵' },
];

const reactionEmojis = {
  aciAmaGercek: { emoji: '🫠', label: 'Acı Ama Gerçek' },
  cayKoy: { emoji: '🍵', label: 'Çay Koy' },
  bittiIis: { emoji: '💀', label: 'Bitti Bu İş' },
  bendeDeVar: { emoji: '❤️‍🩹', label: 'Bende De Var' },
};

function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function FeedPostCard({ post, index }: { post: FeedPost; index: number }) {
  const [reacted, setReacted] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-5 mb-4"
    >
      {/* User Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-charcoal to-bg-dark border border-dirty-gold/20 flex items-center justify-center text-lg">
          {post.userAvatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-text-primary">{post.userName}</span>
            <span className="px-1.5 py-0.5 text-[9px] font-medium bg-dirty-gold/10 text-dirty-gold rounded-full">
              {post.userTitle}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-muted">
            <span>Gariban: {post.userScore}/100</span>
            <span>•</span>
            <span>{post.timeAgo}</span>
          </div>
        </div>
        <div
          className={`px-2 py-1 text-[9px] font-medium rounded-full ${
            post.category === 'dram'
              ? 'bg-warm-neon-red/10 text-warm-neon-red'
              : post.category === 'meme'
              ? 'bg-melancholy-yellow/10 text-melancholy-yellow'
              : post.category === 'itiraf'
              ? 'bg-muted-blue/10 text-muted-blue'
              : 'bg-tea-brown/10 text-tea-brown'
          }`}
        >
          {post.category === 'dram' ? '🎭 Dram' : post.category === 'meme' ? '🤡 Meme' : post.category === 'itiraf' ? '🤫 İtiraf' : '🍵 Çay'}
        </div>
      </div>

      {/* Content */}
      <p className="text-text-primary text-sm leading-relaxed mb-4 whitespace-pre-line">
        {post.content}
      </p>

      {/* AI Comment */}
      <div className="glass px-3 py-2 mb-4 flex items-center gap-2">
        <Sparkles size={12} className="text-dirty-gold shrink-0" />
        <span className="text-[11px] text-dirty-gold/80 italic">{post.aiComment}</span>
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.entries(reactionEmojis) as [keyof typeof reactionEmojis, typeof reactionEmojis[keyof typeof reactionEmojis]][]).map(([key, { emoji, label }]) => (
          <motion.button
            key={key}
            whileTap={{ scale: 0.9 }}
            onClick={() => setReacted(reacted === key ? null : key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
              reacted === key
                ? 'bg-dirty-gold/20 text-dirty-gold border border-dirty-gold/30'
                : 'bg-white/[0.03] text-text-muted hover:bg-white/[0.06] border border-transparent'
            }`}
          >
            <span>{emoji}</span>
            <span>{formatNumber(post.reactions[key] + (reacted === key ? 1 : 0))}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState(feedPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: FeedPost = {
      id: Date.now().toString(),
      userName: 'Sen',
      userAvatar: '🫠',
      userScore: 99,
      userTitle: 'Gariban',
      timeAgo: 'Şimdi',
      category: 'itiraf',
      content: newPostContent,
      aiComment: 'Buna ne desem bilemedim, haklısın...',
      reactions: {
        aciAmaGercek: 0,
        cayKoy: 0,
        bittiIis: 0,
        bendeDeVar: 0,
      }
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsModalOpen(false);
    setActiveCategory('all');
  };

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark pb-safe">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-dirty-gold/3 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-30 glass-strong p-3 sm:p-4 pt-4 sm:pt-6 safe-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-[var(--font-heading)] font-bold text-gradient-gold">Akış</h1>
          <div className="flex items-center gap-3">
            <Link href="/swipe" className="text-text-muted hover:text-dirty-gold transition-colors text-sm">
              Eşleş
            </Link>
            <Link href="/profile" className="text-text-muted hover:text-dirty-gold transition-colors text-sm">
              Profil
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-dirty-gold/20 text-dirty-gold border border-dirty-gold/30'
                  : 'bg-white/[0.03] text-text-muted hover:bg-white/[0.06] border border-transparent'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="relative z-10 px-3 sm:px-4 py-3 sm:py-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPosts.map((post, i) => (
              <FeedPostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-dirty-gold to-faded-orange flex items-center justify-center text-bg-dark shadow-lg glow-gold"
      >
        <PenSquare size={22} />
      </motion.button>

      {/* CREATE POST MODAL */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="w-full max-w-lg bg-bg-dark sm:rounded-[32px] rounded-t-[32px] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-text-muted hover:text-white transition-colors">
                  İptal
                </button>
                <h3 className="font-bold text-text-primary">İtiraf Paylaş</h3>
                <button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="px-4 py-1.5 bg-dirty-gold text-bg-dark rounded-full font-bold text-sm disabled:opacity-50"
                >
                  Paylaş
                </button>
              </div>
              <div className="p-6 pb-safe">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-xl shrink-0">
                    🫠
                  </div>
                  <textarea
                    autoFocus
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="İçini dök, buradayız..."
                    className="w-full bg-transparent text-text-primary text-lg resize-none outline-none min-h-[150px] placeholder:text-text-muted"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <BottomNav active="feed" />
    </main>
  );
}


