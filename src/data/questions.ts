export interface Question {
  id: number;
  category: 'financial' | 'emotional' | 'social';
  question: string;
  answers: {
    text: string;
    score: number;
  }[];
}

export const questions: Question[] = [
  // ========== FINANCIAL QUESTIONS ==========
  {
    id: 1,
    category: 'financial',
    question: 'Şampuanın son damlalarını kullanmak için içine su ekler misin?',
    answers: [
      { text: 'Hiç öyle bir şey yapmadım', score: 5 },
      { text: 'Bir iki kez oldu', score: 15 },
      { text: 'Her şişede yaparım', score: 25 },
      { text: 'Şampuan bitince deterjan kullanıyorum', score: 35 },
    ],
  },
  {
    id: 2,
    category: 'financial',
    question: 'Restorana oturmadan önce menü fiyatlarını kontrol eder misin?',
    answers: [
      { text: 'Hayır, fiyat önemli değil', score: 5 },
      { text: 'Bazen göz atarım', score: 15 },
      { text: 'Mutlaka kontrol ederim', score: 25 },
      { text: 'Google Maps yorumlarından fiyat araştırması yaparım', score: 35 },
    ],
  },
  {
    id: 3,
    category: 'financial',
    question: 'Kredi kartı asgari ödemeyi yatırmak seni mutlu eder mi?',
    answers: [
      { text: 'Kredi kartı borcum hiç olmadı', score: 5 },
      { text: 'Tam ödeme yaparım', score: 10 },
      { text: 'Asgari yatırınca rahatlıyorum', score: 25 },
      { text: 'Asgari bile yatıramadığım aylar oldu', score: 35 },
    ],
  },
  {
    id: 4,
    category: 'financial',
    question: 'Sadece yumurta ve makarna ile ne kadar hayatta kalabilirsin?',
    answers: [
      { text: 'Hiç denemedim', score: 5 },
      { text: 'Birkaç gün', score: 15 },
      { text: 'Bir hafta rahat', score: 25 },
      { text: 'Benim normal beslenme düzenim bu', score: 35 },
    ],
  },
  {
    id: 5,
    category: 'financial',
    question: 'Deodorant almayı ertelediğin oldu mu?',
    answers: [
      { text: 'Asla, hijyen önemli', score: 5 },
      { text: 'Bir iki kez erteledim', score: 15 },
      { text: 'Parfümle idare ettim', score: 25 },
      { text: 'Kış aylarında lüks sayılır', score: 35 },
    ],
  },
  // ========== EMOTIONAL QUESTIONS ==========
  {
    id: 6,
    category: 'emotional',
    question: 'Platonik aşkın hikayeni görüp cevap yazmadı mı?',
    answers: [
      { text: 'Platonik aşkım hiç olmadı', score: 5 },
      { text: 'Oldu ama umursamadım', score: 10 },
      { text: 'Evet, içimden bir parça koptu', score: 25 },
      { text: 'Hikayeyi silip tekrar atıp kontrol ettim', score: 35 },
    ],
  },
  {
    id: 7,
    category: 'emotional',
    question: 'Arkadaşların seni bir yere çağırmayı unuttu mu?',
    answers: [
      { text: 'Hayır, hep davet edilirim', score: 5 },
      { text: 'Bir iki kez oldu', score: 15 },
      { text: 'Sık sık oluyor', score: 25 },
      { text: 'İnstagram\'dan öğreniyorum gittiğilerini', score: 35 },
    ],
  },
  {
    id: 8,
    category: 'emotional',
    question: 'Hayal kırıklığından sonra kaç kez "hayırlısı" dedin?',
    answers: [
      { text: 'Hiç hayal kırıklığı yaşamadım', score: 5 },
      { text: 'Birkaç kez', score: 15 },
      { text: 'Hayatımın mottosu oldu', score: 25 },
      { text: 'Artık otomatik refleks', score: 35 },
    ],
  },
  {
    id: 9,
    category: 'emotional',
    question: 'Gece 2\'de hüzünlü şarkılar dinler misin?',
    answers: [
      { text: 'Hayır, erken yatarım', score: 5 },
      { text: 'Bazen oluyor', score: 15 },
      { text: 'Her gece ritüelim', score: 25 },
      { text: 'Gece 2\'de arabesk çalıştırırım playlist bitmeden uyuyamam', score: 35 },
    ],
  },
  {
    id: 10,
    category: 'emotional',
    question: 'Tavana bakıp hayatı sorguladığın oldu mu?',
    answers: [
      { text: 'Hiç olmadı', score: 5 },
      { text: 'Bir iki kez', score: 15 },
      { text: 'Haftada birkaç kez', score: 25 },
      { text: 'Tavan benim terapistim', score: 35 },
    ],
  },
  // ========== SOCIAL QUESTIONS ==========
  {
    id: 11,
    category: 'social',
    question: '"Geliyorum" derken hâlâ yatakta mıydın?',
    answers: [
      { text: 'Hayır, dakik biriyim', score: 5 },
      { text: 'Bir iki kez oldu', score: 15 },
      { text: 'Klasik benim', score: 25 },
      { text: '"Yoldayım" derken duşa giriyorum', score: 35 },
    ],
  },
  {
    id: 12,
    category: 'social',
    question: 'Duygusal yorgunluktan telefonu açmadığın oldu mu?',
    answers: [
      { text: 'Her zaman açarım', score: 5 },
      { text: 'Nadiren', score: 15 },
      { text: 'Sık sık', score: 25 },
      { text: 'Telefonum sürekli sessizde', score: 35 },
    ],
  },
  {
    id: 13,
    category: 'social',
    question: 'Eski sohbetleri sebepsiz yere tekrar açtığın oldu mu?',
    answers: [
      { text: 'Hayır, geçmişe takılmam', score: 5 },
      { text: 'Bir iki kez merak ettim', score: 15 },
      { text: 'Sık sık yapıyorum', score: 25 },
      { text: 'Sildiğim konuşmaları bile geri yükledim', score: 35 },
    ],
  },
  {
    id: 14,
    category: 'social',
    question: 'Sosyal medyada mutlu insanları görünce nasıl hissedersin?',
    answers: [
      { text: 'Mutlu olurum onlar adına', score: 5 },
      { text: 'Biraz kıskanırım', score: 15 },
      { text: 'İçimden bir sızı gelir', score: 25 },
      { text: 'Telefonu kapatıp karanlıkta otururum', score: 35 },
    ],
  },
  {
    id: 15,
    category: 'social',
    question: 'BİM poşetiyle dışarı çıkmaktan utanır mısın?',
    answers: [
      { text: 'Hiç BİM\'e gitmedim', score: 5 },
      { text: 'Biraz rahatsız olurum', score: 10 },
      { text: 'Hayır, normal bir şey', score: 20 },
      { text: 'BİM poşeti benim Gucci\'m', score: 35 },
    ],
  },
];

export const vibes = [
  {
    id: 'mahalle-filozofu',
    title: 'Mahalle Filozofu',
    emoji: '🧠',
    description: 'Çay içerken hayatın anlamını sorgular',
    color: '#C4A35A',
  },
  {
    id: 'sessiz-dram',
    title: 'Sessiz Dram',
    emoji: '🌧️',
    description: 'İçinden fırtınalar kopar ama dışarıdan sakin',
    color: '#4A6B8A',
  },
  {
    id: 'cayci-romantik',
    title: 'Çaycı Romantik',
    emoji: '🍵',
    description: 'Aşkı çay bardağının buğusunda arar',
    color: '#8B6914',
  },
  {
    id: 'plaza-magduru',
    title: 'Plaza Mağduru',
    emoji: '💼',
    description: 'Beyaz yakalı ama ruhu mavi',
    color: '#D4845A',
  },
  {
    id: 'anadolu-rock',
    title: 'Anadolu Rock Protagonisti',
    emoji: '🎸',
    description: 'Barış Manço\'nun ruhunu taşır',
    color: '#E84040',
  },
  {
    id: 'kripto-carpilmis',
    title: 'Kriptoyla Çarpılmış',
    emoji: '📉',
    description: 'Coin\'de kaybetti ama umudunu kaybetmedi',
    color: '#5A9A5A',
  },
  {
    id: 'terkedilmis',
    title: 'Terkedilmiş Ama Ayakta',
    emoji: '💔',
    description: 'Kırık kalpli ama ayakta duran savaşçı',
    color: '#E84040',
  },
  {
    id: 'ic-anadolu',
    title: 'İç Anadolu Melankolisi',
    emoji: '🏔️',
    description: 'Bozkırın sessizliğinde hüzün bulur',
    color: '#D4C36A',
  },
];

export const garibanTitles: Record<string, { title: string; emoji: string; description: string }> = {
  'holding-on': {
    title: 'Holding On',
    emoji: '🤏',
    description: 'Henüz tam gariban değilsin ama yoldasın',
  },
  'orta-direk': {
    title: 'Orta Direk',
    emoji: '⚖️',
    description: 'Ne zengin ne fakir, klasik Türk orta sınıfı',
  },
  'cay-dram': {
    title: 'Çay & Dram Uzmanı',
    emoji: '🍵',
    description: 'Çay ve drama hayatının iki direği',
  },
  'mahalle-protagonisti': {
    title: 'Mahalle Protagonisti',
    emoji: '🎬',
    description: 'Mahallenin ana karakteri sensin',
  },
  'sefil-bilo': {
    title: 'Sefil Bilo',
    emoji: '👑',
    description: 'Garibanların kralı, mücadelenin şampiyonu',
  },
};

export function getGaribanTitle(score: number): string {
  if (score <= 20) return 'holding-on';
  if (score <= 40) return 'orta-direk';
  if (score <= 60) return 'cay-dram';
  if (score <= 80) return 'mahalle-protagonisti';
  return 'sefil-bilo';
}
