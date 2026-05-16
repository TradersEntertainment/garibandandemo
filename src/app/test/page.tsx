'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import { calculateScore } from '@/utils/scoring';
import { saveUser } from '@/utils/storage';

const categoryColors: Record<string, string> = {
  financial: '#C4A35A',
  emotional: '#E84040',
  social: '#4A6B8A',
};

const categoryEmojis: Record<string, string> = {
  financial: '💸',
  emotional: '💔',
  social: '🫠',
};

const categoryLabels: Record<string, string> = {
  financial: 'Finansal Gariban',
  emotional: 'Duygusal Gariban',
  social: 'Sosyal Gariban',
};

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; score: number; category: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = useCallback((score: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        score,
        category: currentQuestion.category,
      },
    ];
    setAnswers(newAnswers);
    setDirection(1);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 400);
    } else {
      // Calculate and save score
      const result = calculateScore(newAnswers);
      saveUser({ score: result, completedTest: true });
      setTimeout(() => {
        router.push('/result');
      }, 500);
    }
  }, [currentIndex, answers, isTransitioning, currentQuestion, router]);

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-hidden flex flex-col">
      {/* Ambient background based on category */}
      <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000">
        <div
          className="absolute top-1/3 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-[80px] md:blur-[150px] animate-pulse-glow transition-colors duration-1000"
          style={{ backgroundColor: `${categoryColors[currentQuestion.category]}10` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-36 h-36 md:w-72 md:h-72 rounded-full blur-[60px] md:blur-[120px] animate-pulse-glow transition-colors duration-1000"
          style={{ backgroundColor: `${categoryColors[currentQuestion.category]}08`, animationDelay: '1.5s' }}
        />
      </div>

      {/* ===== TOP BAR ===== */}
      <div className="relative z-20 px-4 sm:p-6 pt-4 safe-top">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{categoryEmojis[currentQuestion.category]}</span>
            <span
              className="text-xs font-medium tracking-wider uppercase"
              style={{ color: categoryColors[currentQuestion.category] }}
            >
              {categoryLabels[currentQuestion.category]}
            </span>
          </div>
          <span className="text-sm text-text-muted font-mono">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: categoryColors[currentQuestion.category] }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ===== QUESTION AREA ===== */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-4 sm:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: direction * 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -80, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full max-w-lg"
          >
            {/* Question */}
            <div className="glass-card p-5 sm:p-8 mb-5 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-text-primary leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answers */}
            <div className="space-y-2.5 sm:space-y-3">
              {currentQuestion.answers.map((answer, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: `${categoryColors[currentQuestion.category]}40`,
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(answer.score)}
                  disabled={isTransitioning}
                  className="w-full glass p-4 sm:p-5 text-left transition-all duration-300 flex items-center gap-3 sm:gap-4 group disabled:pointer-events-none active:scale-[0.98]"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: `${categoryColors[currentQuestion.category]}15`,
                      color: categoryColors[currentQuestion.category],
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-text-primary text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                    {answer.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== BOTTOM INFO ===== */}
      <div className="relative z-10 p-6 text-center">
        <p className="text-text-muted text-xs">
          {currentIndex < 5
            ? '💸 Finansal gariban seviyeni ölçüyoruz...'
            : currentIndex < 10
            ? '💔 Duygusal hasar seviyeni ölçüyoruz...'
            : '🫠 Sosyal gariban seviyeni ölçüyoruz...'}
        </p>
      </div>
    </main>
  );
}
