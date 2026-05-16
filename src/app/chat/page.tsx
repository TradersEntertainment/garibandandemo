'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, Send, Sparkles, MoreVertical, Phone, Video } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { mockProfiles, Profile } from '@/data/profiles';

// Dummy initial messages
const initialMessages = [
  { id: 1, text: 'Selam, aura testin baya yüksek çıkmış.', sender: 'them', time: '14:20' },
  { id: 2, text: 'Eyvallah, hayat yordu bizi.', sender: 'me', time: '14:25' },
  { id: 3, text: 'Çay içer miyiz?', sender: 'them', time: '14:26' },
];

const botReplies = [
  "Şu an çok fena Müslüm dinliyorum, sonra yazsam?",
  "Aynen kardeşim aynen...",
  "Düştük yine bir derde.",
  "Senin garibanlık seviyen bana yetmez.",
  "Nasipte varsa...",
  "Bana çorba ısmarlarsan düşünürüm.",
  "Kader ağlarını örüyor gibi hissettim."
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<Profile | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom of messages
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

    // Simulate bot reply
    setTimeout(() => {
      const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomReply,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);
  };

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
              <p className="text-text-secondary text-sm">Dertleştiğin Garibanlar ({mockProfiles.length})</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24">
              {mockProfiles.map((profile, i) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveChat(profile)}
                  className="flex items-center gap-4 p-4 glass-card mb-3 cursor-pointer hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-charcoal border border-dirty-gold/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    {profile.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-text-primary truncate pr-2">{profile.name}</span>
                      <span className="text-[10px] text-text-muted shrink-0">14:26</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary truncate pr-4">
                        {i === 0 ? "Çay içer miyiz?" : "Senin garibanlık seviyen bana yetmez."}
                      </p>
                      {i === 0 && (
                        <div className="w-2 h-2 rounded-full bg-warm-neon-red shrink-0" />
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
            <div className="glass-strong p-3 sm:p-4 pt-4 sm:pt-6 safe-top flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="p-2 -ml-2 text-text-muted hover:text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-charcoal border border-dirty-gold/20 flex items-center justify-center text-xl">
                    {activeChat.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                      {activeChat.name}
                      <Sparkles size={12} className="text-dirty-gold" />
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
                  Bugün
                </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'me' 
                      ? 'bg-dirty-gold/20 text-dirty-gold rounded-tr-sm border border-dirty-gold/10' 
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
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex items-center gap-1">
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
                  placeholder="Bir şeyler yaz..."
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
