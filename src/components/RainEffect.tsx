'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Raindrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function RainEffect() {
  const [drops, setDrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const newDrops: Raindrop[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 1 + Math.random() * 2,
      opacity: 0.05 + Math.random() * 0.1,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-px bg-gradient-to-b from-transparent via-dirty-gold/20 to-transparent"
          style={{
            left: `${drop.x}%`,
            height: '60px',
            opacity: drop.opacity,
          }}
          initial={{ top: '-60px' }}
          animate={{ top: '110%' }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
