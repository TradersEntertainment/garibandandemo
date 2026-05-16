'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BottomNavProps {
  active: 'feed' | 'swipe' | 'chat' | 'profile' | 'leaderboard';
}

export default function BottomNav({ active }: BottomNavProps) {
  const tabs = [
    { id: 'feed', label: 'Keşfet', emoji: '🔥', href: '/feed' },
    { id: 'swipe', label: 'Eşleş', emoji: '💫', href: '/swipe' },
    { id: 'chat', label: 'Sohbet', emoji: '💬', href: '/chat' },
    { id: 'leaderboard', label: 'Lig', emoji: '🏆', href: '/leaderboard' },
    { id: 'profile', label: 'Profil', emoji: '👤', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around py-3 max-w-lg mx-auto px-2">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 px-1 py-1 rounded-xl transition-all relative ${
                active === tab.id ? 'text-dirty-gold' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <span className="text-xl">{tab.emoji}</span>
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
              {active === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-dirty-gold shadow-[0_0_8px_rgba(196,163,90,0.8)]"
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
