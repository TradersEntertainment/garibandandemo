'use client';

import { motion } from 'framer-motion';

interface RadarChartProps {
  dimensions: {
    financial: number;
    emotional: number;
    social: number;
    humor: number;
    survival: number;
  };
  size?: number;
}

const labels = [
  { key: 'financial', label: 'Finansal', angle: -90 },
  { key: 'emotional', label: 'Duygusal', angle: -18 },
  { key: 'social', label: 'Sosyal', angle: 54 },
  { key: 'humor', label: 'Mizah', angle: 126 },
  { key: 'survival', label: 'Hayatta Kalma', angle: 198 },
];

export default function RadarChart({ dimensions, size = 200 }: RadarChartProps) {
  const center = size / 2;
  const maxRadius = (size / 2) - 30;

  const getPoint = (angle: number, value: number) => {
    const rad = (angle * Math.PI) / 180;
    const r = (value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const getLabelPoint = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const r = maxRadius + 20;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  // Grid rings
  const rings = [25, 50, 75, 100];

  // Data points
  const points = labels.map((l) => {
    const value = dimensions[l.key as keyof typeof dimensions];
    return getPoint(l.angle, value);
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    >
      {/* Grid rings */}
      {rings.map((ring) => {
        const ringPoints = labels.map((l) => getPoint(l.angle, ring));
        const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return (
          <path
            key={ring}
            d={ringPath}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {labels.map((l, i) => {
        const end = getPoint(l.angle, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data fill */}
      <motion.path
        d={pathData}
        fill="rgba(196, 163, 90, 0.15)"
        stroke="#C4A35A"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#C4A35A"
          stroke="#0D0D0D"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.15 }}
        />
      ))}

      {/* Labels */}
      {labels.map((l, i) => {
        const pos = getLabelPoint(l.angle);
        const value = dimensions[l.key as keyof typeof dimensions];
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9A9A9A"
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            <tspan x={pos.x} dy="-0.5em" fill="#F5F0E8" fontSize="10" fontWeight="600">
              {value}
            </tspan>
            <tspan x={pos.x} dy="1.3em" fontSize="8">
              {l.label}
            </tspan>
          </text>
        );
      })}
    </motion.svg>
  );
}
