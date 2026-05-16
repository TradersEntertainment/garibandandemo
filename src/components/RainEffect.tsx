'use client';

import { useEffect, useRef } from 'react';

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const drops: Raindrop[] = [];
    const DROPS_COUNT = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDrop = (): Raindrop => ({
      x: Math.random() * (canvas?.width || window.innerWidth),
      y: Math.random() * -100,
      speed: 2 + Math.random() * 4,
      length: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.2,
    });

    const init = () => {
      resize();
      for (let i = 0; i < DROPS_COUNT; i++) {
        const drop = createDrop();
        drop.y = Math.random() * canvas.height;
        drops.push(drop);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
        ctx.strokeStyle = `rgba(180, 200, 220, ${drop.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drops[i] = createDrop();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
