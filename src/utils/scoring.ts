export interface GaribanScore {
  total: number;
  dimensions: {
    financial: number;
    emotional: number;
    social: number;
    humor: number;
    survival: number;
  };
  titleKey: string;
  auraTags: string[];
}

export function calculateScore(answers: { questionId: number; score: number; category: string }[]): GaribanScore {
  const totalPossible = answers.length * 35;
  const rawTotal = answers.reduce((sum, a) => sum + a.score, 0);
  const total = Math.round((rawTotal / totalPossible) * 100);

  const financial = answers
    .filter(a => a.category === 'financial')
    .reduce((sum, a) => sum + a.score, 0);
  const emotional = answers
    .filter(a => a.category === 'emotional')
    .reduce((sum, a) => sum + a.score, 0);
  const social = answers
    .filter(a => a.category === 'social')
    .reduce((sum, a) => sum + a.score, 0);

  const maxPerCategory = 5 * 35;
  const financialPct = Math.round((financial / maxPerCategory) * 100);
  const emotionalPct = Math.round((emotional / maxPerCategory) * 100);
  const socialPct = Math.round((social / maxPerCategory) * 100);
  const humor = Math.min(100, Math.round((total * 0.7 + Math.random() * 30)));
  const survival = Math.min(100, Math.round((total * 0.8 + Math.random() * 20)));

  const titleKey = getTitleKey(total);
  const auraTags = generateAuraTags(total, financialPct, emotionalPct, socialPct);

  return {
    total,
    dimensions: {
      financial: financialPct,
      emotional: emotionalPct,
      social: socialPct,
      humor,
      survival,
    },
    titleKey,
    auraTags,
  };
}

function getTitleKey(score: number): string {
  if (score <= 20) return 'holding-on';
  if (score <= 40) return 'orta-direk';
  if (score <= 60) return 'cay-dram';
  if (score <= 80) return 'mahalle-protagonisti';
  return 'sefil-bilo';
}

function generateAuraTags(total: number, fin: number, emo: number, soc: number): string[] {
  const tags: string[] = [];

  if (total >= 80) tags.push('Ağır Protagonist Enerjisi');
  if (total >= 60) tags.push('Elit Mahalle Filozofu');
  if (emo >= 70) tags.push('Arabesk Sponsorlu Ruh');
  if (fin >= 70) tags.push('Plaza Survivor');
  if (soc >= 70) tags.push('Gece 2 Çay Enerjisi');
  if (total >= 40 && total < 60) tags.push('Anadolu Rock Aurası');
  if (emo >= 50) tags.push('Duygusal Hasar Uzmanı');
  if (total >= 70) tags.push('Gece Simidi Potansiyeli');
  if (fin >= 50 && emo >= 50) tags.push('Çorba Enerjisi');
  if (soc >= 60) tags.push('Sessiz Dram Aracısı');

  if (tags.length === 0) {
    tags.push('Uyanmakta Olan Gariban');
    tags.push('Potansiyel Direk');
  }

  return tags.slice(0, 5);
}
