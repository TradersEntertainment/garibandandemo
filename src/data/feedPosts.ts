export interface FeedPost {
  id: string;
  userName: string;
  userScore: number;
  userTitle: string;
  userAvatar: string;
  category: 'dram' | 'meme' | 'itiraf' | 'cay';
  content: string;
  aiComment: string;
  reactions: {
    aciAmaGercek: number;
    cayKoy: number;
    bittiIis: number;
    bendeDeVar: number;
  };
  timeAgo: string;
}

export const feedPosts: FeedPost[] = [
  {
    id: '1',
    userName: 'Kaan',
    userScore: 85,
    userTitle: 'Sefil Bilo',
    userAvatar: '🧠',
    category: 'dram',
    content: 'Bugün markette hesap yaparken arkamda kuyruk oluştu. "Biraz daha düşüneyim" deyip sepeti bırakıp çıktım. Bu hayat bana çok.',
    aiComment: 'Klasik Türk melankolisi tespit edildi.',
    reactions: { aciAmaGercek: 342, cayKoy: 128, bittiIis: 89, bendeDeVar: 567 },
    timeAgo: '2 saat önce',
  },
  {
    id: '2',
    userName: 'Elif',
    userScore: 72,
    userTitle: 'Mahalle Protagonisti',
    userAvatar: '🌧️',
    category: 'itiraf',
    content: 'Gece 3\'te eski sevgilimin Spotify playlistini stalklıyorum. Yeni şarkı eklemiş. Acaba benim için mi yoksa yeni biri için mi?',
    aiComment: 'Duygusal olarak tehlikeli içerik.',
    reactions: { aciAmaGercek: 891, cayKoy: 234, bittiIis: 456, bendeDeVar: 1203 },
    timeAgo: '4 saat önce',
  },
  {
    id: '3',
    userName: 'Burak',
    userScore: 67,
    userTitle: 'Mahalle Protagonisti',
    userAvatar: '📉',
    category: 'meme',
    content: '"Yatırım yapmak geleceğini güvence altına almaktır" diyenlere:\n\nBenim gelecek: 📉📉📉\nBenim güvence: Annemin evinde yaşıyorum',
    aiComment: 'Ana karakter enerjisi tespit edildi.',
    reactions: { aciAmaGercek: 1567, cayKoy: 345, bittiIis: 892, bendeDeVar: 2341 },
    timeAgo: '6 saat önce',
  },
  {
    id: '4',
    userName: 'Zeynep',
    userScore: 58,
    userTitle: 'Çay & Dram Uzmanı',
    userAvatar: '🍵',
    category: 'cay',
    content: 'Yağmurlu bir İstanbul akşamı. Elimde çay. Pencerede buğu. İçimde hüzün. Ama çay sıcak, hayat idare eder.',
    aiComment: 'Elit gariban aurası içerir.',
    reactions: { aciAmaGercek: 234, cayKoy: 891, bittiIis: 56, bendeDeVar: 445 },
    timeAgo: '8 saat önce',
  },
  {
    id: '5',
    userName: 'Emre',
    userScore: 91,
    userTitle: 'Sefil Bilo',
    userAvatar: '🎸',
    category: 'dram',
    content: 'Otobüste kulaklığımdan arabesk çalarken yanımdaki teyze "geçmiş olsun evladım" dedi. Teyze bir şey biliyordu.',
    aiComment: 'Arabesk sponsorlu hayat hikayesi.',
    reactions: { aciAmaGercek: 2103, cayKoy: 567, bittiIis: 1234, bendeDeVar: 3456 },
    timeAgo: '12 saat önce',
  },
  {
    id: '6',
    userName: 'Selin',
    userScore: 38,
    userTitle: 'Orta Direk',
    userAvatar: '🏔️',
    category: 'itiraf',
    content: 'İş görüşmesinde "5 yıl sonra kendinizi nerede görüyorsunuz?" dediler. "Hayatta" dedim. Almadılar.',
    aiComment: 'Potansiyel viral içerik.',
    reactions: { aciAmaGercek: 4521, cayKoy: 678, bittiIis: 2345, bendeDeVar: 5678 },
    timeAgo: '1 gün önce',
  },
  {
    id: '7',
    userName: 'Mert',
    userScore: 76,
    userTitle: 'Mahalle Protagonisti',
    userAvatar: '💔',
    category: 'meme',
    content: 'Tinder: Eşleşme yok\nBumble: Eşleşme yok\nGaribandan: "Kader ağlarını ördü"\n\nSonunda beni anlayan bir platform 🥲',
    aiComment: 'Meta gariban bilinci tespit edildi.',
    reactions: { aciAmaGercek: 3456, cayKoy: 890, bittiIis: 1567, bendeDeVar: 4567 },
    timeAgo: '1 gün önce',
  },
  {
    id: '8',
    userName: 'Deniz',
    userScore: 52,
    userTitle: 'Çay & Dram Uzmanı',
    userAvatar: '🌧️',
    category: 'cay',
    content: 'Çay bardağının kırığından içmek bir tercih değil, bir yaşam felsefesi. Tam oturmayan kapak gibi, hayat da tam oturmuyor.',
    aiComment: 'Filozofik gariban enerjisi.',
    reactions: { aciAmaGercek: 567, cayKoy: 1234, bittiIis: 234, bendeDeVar: 890 },
    timeAgo: '2 gün önce',
  },
  {
    id: '9',
    userName: 'Arda',
    userScore: 64,
    userTitle: 'Mahalle Protagonisti',
    userAvatar: '🧠',
    category: 'dram',
    content: 'Banka "Kredi limitiniz artırıldı" mesajı attı. Sevinecektim ama borçlarımı hatırladım. Bu mesaj aslında bir tehdit.',
    aiComment: 'Finansal dram ustası.',
    reactions: { aciAmaGercek: 7890, cayKoy: 1234, bittiIis: 3456, bendeDeVar: 8901 },
    timeAgo: '2 gün önce',
  },
  {
    id: '10',
    userName: 'Ayşe',
    userScore: 43,
    userTitle: 'Çay & Dram Uzmanı',
    userAvatar: '💼',
    category: 'itiraf',
    content: 'Patronum "Bu şirketi bir aile gibi görüyoruz" dedi. Evet, benim de ailemdeki gibi maaş günü kavga ediyoruz.',
    aiComment: 'Plaza hayatta kalma belgelendi.',
    reactions: { aciAmaGercek: 5678, cayKoy: 890, bittiIis: 2345, bendeDeVar: 6789 },
    timeAgo: '3 gün önce',
  },
  {
    id: '11',
    userName: 'Kaan',
    userScore: 85,
    userTitle: 'Sefil Bilo',
    userAvatar: '🧠',
    category: 'meme',
    content: 'Zenginlerin derdi: "Hangi restoranda yiyelim?"\nBenim derdim: "Dün akşamdan kalan makarnayı ısıtsam mı?"\n\nAma ikimiz de aç. Eşitlik sağlandı.',
    aiComment: 'Toplumsal eleştiri + gariban mizah.',
    reactions: { aciAmaGercek: 12345, cayKoy: 2345, bittiIis: 5678, bendeDeVar: 15678 },
    timeAgo: '3 gün önce',
  },
  {
    id: '12',
    userName: 'Elif',
    userScore: 72,
    userTitle: 'Mahalle Protagonisti',
    userAvatar: '🌧️',
    category: 'cay',
    content: 'Üç bardak çay içtim. Hayat hâlâ anlamsız ama en azından sıcak bir anlamsızlık.',
    aiComment: 'Minimal gariban şiiri.',
    reactions: { aciAmaGercek: 890, cayKoy: 3456, bittiIis: 345, bendeDeVar: 1234 },
    timeAgo: '4 gün önce',
  },
];
