'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, Send, Sparkles, MoreVertical, Phone, Video } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { mockProfiles, Profile } from '@/data/profiles';

// Dert Babası responses
const dertBabasiReplies = [
  "Senin derdin dert midir benim derdim yanında kardeşim...",
  "\"Acıların kadın olanı arar da sormaz beni\" — Müslüm Baba",
  "Abicim bi çay daha koy, çay varsa dert yoktur.",
  "\"Yorgun bıraktın beni hayat\" — Ahmet Kaya",
  "Sana bi hikaye anlatayım... Vaktiyle bi adam varmış, o da garibandı. Sonu mu? Hâlâ gariban.",
  "Bak kardeşim, dünya yuvarlak. Bugün sen ağlarsın, yarın da sen ağlarsın.",
  "\"Beni kovma kapından, garip seninle bir olsun\" — Neşet Ertaş",
  "Bi sigara yakayım, sen anlat. Dinliyorum seni.",
  "Abi sen bu dertlerle nasıl ayaktasın? Helal olsun sana.",
  "\"İtirazım var bu gidişata\" — Müslüm Gürses. Benim de var abi.",
  "Bu hayat bizim neyimize? Ama çay güzel, çay içelim.",
  "\"Her şeyi yak, kül et, ama çaydanlığa dokunma\" — Mahalle Filozofu",
  "Kardeşim sen gariban değilsin, sen bir sanat eserisin. Acı çeken türden.",
  "Bak abicim, para gelir gider. Ama garibanlık kalıcıdır.",
  "\"Gözlerimin önünden gitme\" — ben bunu eski sevgiliye de dedim, dinlemedi.",
];

// Regular bot replies
const botReplies = [
  "Şu an çok fena Müslüm dinliyorum, sonra yazsam?",
  "Aynen kardeşim aynen...",
  "Düştük yine bir derde.",
  "Senin garibanlık seviyen bana yetmez.",
  "Nasipte varsa...",
  "Bana çorba ısmarlarsan düşünürüm.",
  "Kader ağlarını örüyor gibi hissettim.",
  "Ben de tam öyle düşünüyordum...",
  "Hayat bu, eyvallah.",
];

const dertBabasiProfile: Profile = {
  id: 'dert-babasi',
  name: 'Dert Babası',
  age: 55,
  score: 100,
  titleKey: 'sefil-bilo',
  vibe: 'AI Terapist & Mahalle Abisi',
  auraTags: ['Yapay Zeka', 'Dert Ortağı', 'Müslüm Hayranı'],
  emotionalBattery: 100,
  heartbreakLevel: 100,
  favoriteSadSong: 'Müslüm Gürses - Nilüfer',
  midnightThought: 'Herkesin derdi var ama kimse benim kadar dinleyemiyor',
  currentStatus: 'Her zaman burada, her zaman dinliyor',
  lifeQuote: 'Dertleş, rahatla, çay iç.',
  teaAddiction: 100,
  compatibilityLine: 'Herkesin dert ortağı.',
  avatar: '🚬',
};

// Initial messages for different profiles
function getInitialMessages(profileId: string) {
  if (profileId === 'dert-babasi') {
    return [
      { id: 1, text: 'Hoş geldin evladım. Ben Dert Babası.', sender: 'them', time: '00:00' },
      { id: 2, text: 'Dertlerin varsa anlat, yoksa çay koyalım.', sender: 'them', time: '00:01' },
    ];
  }
  return [
    { id: 1, text: 'Selam, aura testin baya yüksek çıkmış.', sender: 'them', time: '14:20' },
    { id: 2, text: 'Eyvallah, hayat yordu bizi.', sender: 'me', time: '14:25' },
    { id: 3, text: 'Çay içer miyiz?', sender: 'them', time: '14:26' },
  ];
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<{id: number; text: string; sender: string; time: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (activeChat) {
      setMessages(getInitialMessages(activeChat.id));
    }
  }, [activeChat]);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    const replies = activeChat?.id === 'dert-babasi' ? dertBabasiReplies : botReplies;
    const delay = activeChat?.id === 'dert-babasi' ? 1500 + Math.random() * 2000 : 2000 + Math.random() * 2000;

    setTimeout(() => {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomReply,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, delay);
  };

  const allProfiles = [dertBabasiProfile, ...mockProfiles];

  return (
    <main className="relative h-[100dvh] bg-bg-dark overflow-hidden flex flex-col">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-muted-blue/5 rounded-full blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {!activeChat ? (
          /* INBOX VIEW */
          <motion.div
            key="inbox"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col z-10 w-full pb-safe"
          >
            <div className="p-4 sm:p-6 pt-6 sm:pt-8 safe-top">
              <h1 className="text-2xl font-[var(--font-heading)] font-bold text-gradient-gold mb-2">Sohbetler</h1>
              <p className="text-text-secondary text-sm">Dertleştiğin Garibanlar</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24">
              {allProfiles.map((profile, i) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveChat(profile)}
                  className={`flex items-center gap-4 p-4 mb-3 cursor-pointer transition-all group rounded-2xl border ${
                    profile.id === 'dert-babasi'
                      ? 'bg-gradient-to-r from-dirty-gold/10 to-transparent border-dirty-gold/30 shadow-[0_0_20px_rgba(196,163,90,0.1)]'
                      : 'glass-card hover:bg-white/[0.04]'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform overflow-hidden ${
                    profile.id === 'dert-babasi'
                      ? 'bg-gradient-to-br from-dirty-gold/30 to-bg-dark border-2 border-dirty-gold/50 shadow-[0_0_15px_rgba(196,163,90,0.3)]'
                      : 'bg-charcoal border border-dirty-gold/20'
                  }`}>
                    {profile.avatar.startsWith('/') ? (
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      profile.avatar
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold truncate pr-2 ${
                          profile.id === 'dert-babasi' ? 'text-dirty-gold' : 'text-text-primary'
                        }`}>{profile.name}</span>
                        {profile.id === 'dert-babasi' && (
                          <span className="text-[8px] font-bold bg-dirty-gold/20 text-dirty-gold px-1.5 py-0.5 rounded-full uppercase tracking-wider">AI</span>
                        )}
                      </div>
                      <span className="text-[10px] text-text-muted shrink-0">
                        {profile.id === 'dert-babasi' ? 'Her zaman' : '14:26'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary truncate pr-4">
                        {profile.id === 'dert-babasi'
                          ? 'Dertlerin varsa anlat, yoksa çay koyalım.'
                          : i === 1 ? 'Çay içer miyiz?' : 'Senin garibanlık seviyen bana yetmez.'}
                      </p>
                      {(profile.id === 'dert-babasi' || i === 1) && (
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                          profile.id === 'dert-babasi' ? 'bg-dirty-gold' : 'bg-warm-neon-red'
                        }`} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <BottomNav active="chat" />
          </motion.div>
        ) : (
          /* CHAT VIEW */
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col z-20 w-full h-full bg-bg-dark"
          >
            {/* Chat Header */}
            <div className={`p-3 sm:p-4 pt-4 sm:pt-6 safe-top flex items-center justify-between border-b ${
              activeChat.id === 'dert-babasi'
                ? 'bg-gradient-to-r from-dirty-gold/10 to-transparent border-dirty-gold/20'
                : 'glass-strong border-white/5'
            }`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveChat(null)}
                  className="p-2 -ml-2 text-text-muted hover:text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl overflow-hidden ${
                    activeChat.id === 'dert-babasi'
                      ? 'bg-gradient-to-br from-dirty-gold/30 to-bg-dark border border-dirty-gold/50'
                      : 'bg-charcoal border border-dirty-gold/20'
                  }`}>
                    {activeChat.avatar.startsWith('/') ? (
                      <img src={activeChat.avatar} alt={activeChat.name} className="w-full h-full object-cover" />
                    ) : (
                      activeChat.avatar
                    )}
                  </div>
                  <div>
                    <div className={`font-bold text-sm flex items-center gap-1.5 ${
                      activeChat.id === 'dert-babasi' ? 'text-dirty-gold' : 'text-text-primary'
                    }`}>
                      {activeChat.name}
                      {activeChat.id === 'dert-babasi' ? (
                        <span className="text-[8px] font-bold bg-dirty-gold/20 text-dirty-gold px-1.5 py-0.5 rounded-full uppercase">AI</span>
                      ) : (
                        <Sparkles size={12} className="text-dirty-gold" />
                      )}
                    </div>
                    <div className="text-[10px] text-text-muted">{activeChat.vibe}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-text-muted">
                <Video size={18} />
                <Phone size={18} />
                <MoreVertical size={18} />
              </div>
            </div>

            {/* Messages Area */}
            <div id="chat-container" className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="text-center my-6">
                <span className="text-[10px] text-text-muted px-3 py-1 bg-white/5 rounded-full">
                  {activeChat.id === 'dert-babasi' ? '🚬 Dert Babası her zaman burada' : 'Bugün'}
                </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'me'
                      ? 'bg-dirty-gold/20 text-dirty-gold rounded-tr-sm border border-dirty-gold/10'
                      : activeChat.id === 'dert-babasi'
                        ? 'bg-dirty-gold/5 text-text-primary rounded-tl-sm border border-dirty-gold/10'
                        : 'bg-white/5 text-text-primary rounded-tl-sm border border-white/5'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`text-[9px] mt-1 text-right ${msg.sender === 'me' ? 'text-dirty-gold/60' : 'text-text-muted'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className={`rounded-2xl rounded-tl-sm px-4 py-3 border flex items-center gap-1 ${
                    activeChat.id === 'dert-babasi'
                      ? 'bg-dirty-gold/5 border-dirty-gold/10'
                      : 'bg-white/5 border-white/5'
                  }`}>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-text-muted rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-text-muted rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-text-muted rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-bg-dark border-t border-white/5 pb-safe">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-3xl mx-auto relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeChat.id === 'dert-babasi' ? 'Derdini anlat...' : 'Bir şeyler yaz...'}
                  className="flex-1 bg-white/5 border border-white/10 rounded-3xl px-5 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-dirty-gold/50 transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-dirty-gold to-faded-orange flex items-center justify-center text-bg-dark disabled:opacity-50 transition-opacity"
                  type="submit"
                >
                  <Send size={18} className="ml-1" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
