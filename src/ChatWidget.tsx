import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'portfolio_chats';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: number;
  seen: boolean;
}

export interface ChatSession {
  id: string;
  name: string;
  email: string;
  messages: ChatMessage[];
  lastMessage: string;
  lastTimestamp: number;
  unread: number;
  blocked: boolean;
  online: boolean;
}

export function getAllChats(): ChatSession[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export function saveAllChats(chats: ChatSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  window.dispatchEvent(new CustomEvent('chats_updated'));
}

function getOrCreateSession(name: string, email: string): ChatSession {
  const key = `chat_session_${email}`;
  const existing = localStorage.getItem(key);
  if (existing) {
    const session = JSON.parse(existing) as ChatSession;
    // Sync with main store
    const all = getAllChats();
    const found = all.find(c => c.id === session.id);
    return found || session;
  }
  const session: ChatSession = {
    id: `chat_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    name, email,
    messages: [{
      id: `msg_${Date.now()}`,
      text: `👋 Hi ${name}! I'm Bishr. How can I help you today?`,
      sender: 'admin',
      timestamp: Date.now(),
      seen: false,
    }],
    lastMessage: `Hi ${name}! How can I help?`,
    lastTimestamp: Date.now(),
    unread: 0,
    blocked: false,
    online: true,
  };
  localStorage.setItem(key, JSON.stringify(session));
  const all = getAllChats();
  all.unshift(session);
  saveAllChats(all);
  return session;
}

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'chat'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [session, setSession] = useState<ChatSession | null>(null);
  const [adminTyping, setAdminTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem('chat_user_info');
    if (saved) {
      const { name: n, email: e } = JSON.parse(saved);
      setName(n); setEmail(e);
      const s = getOrCreateSession(n, e);
      setSession(s); setStep('chat');
    }
  }, []);

  // Poll for updates every 2s
  useEffect(() => {
    if (!session) return;
    const poll = setInterval(() => {
      const all = getAllChats();
      const updated = all.find(c => c.id === session.id);
      if (updated) {
        setSession({ ...updated });
        if (!open) {
          const newUnread = updated.messages.filter(m => m.sender === 'admin' && !m.seen).length;
          setUnread(newUnread);
        }
        // Check admin typing flag
        const typingKey = `admin_typing_${session.id}`;
        setAdminTyping(localStorage.getItem(typingKey) === 'true');
      }
    }, 1500);
    return () => clearInterval(poll);
  }, [session, open]);

  // Mark messages seen when open
  useEffect(() => {
    if (open && session) {
      setUnread(0);
      const all = getAllChats();
      const idx = all.findIndex(c => c.id === session.id);
      if (idx !== -1) {
        all[idx].messages = all[idx].messages.map(m =>
          m.sender === 'admin' ? { ...m, seen: true } : m
        );
        all[idx].unread = 0;
        saveAllChats(all);
        setSession({ ...all[idx] });
      }
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages, adminTyping]);

  const startChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    localStorage.setItem('chat_user_info', JSON.stringify({ name, email }));
    const s = getOrCreateSession(name, email);
    setSession(s); setStep('chat');
  };

  const sendMessage = () => {
    if (!text.trim() || !session) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now(),
      seen: false,
    };
    const all = getAllChats();
    const idx = all.findIndex(c => c.id === session.id);
    if (idx !== -1) {
      all[idx].messages.push(msg);
      all[idx].lastMessage = msg.text;
      all[idx].lastTimestamp = msg.timestamp;
      all[idx].unread = (all[idx].unread || 0) + 1;
      saveAllChats(all);
      setSession({ ...all[idx] });
      // Update session key
      localStorage.setItem(`chat_session_${email}`, JSON.stringify(all[idx]));
    }
    setText('');
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {unread} new message{unread > 1 ? 's' : ''}
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 relative"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}>
          {unread > 0 && !open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-[#030014] rounded-full flex items-center justify-center text-[10px] font-bold">{unread}</span>
          )}
          {open ? <X size={24} /> : <MessageCircle size={26} />}
        </button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-28 right-8 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">B</div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">Bishr</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-white/80 text-[11px]">Online — usually replies instantly</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            {step === 'form' ? (
              /* Info form */
              <form onSubmit={startChat} className="p-5 space-y-4">
                <p className="text-gray-400 text-sm">Enter your details to start chatting 👋</p>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50 transition-all" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" type="email" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50 transition-all" />
                <button type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  Start Chat →
                </button>
              </form>
            ) : (
              /* Chat */
              <div className="flex flex-col" style={{ height: '420px' }}>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
                  {session?.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.sender === 'user'
                          ? 'text-white rounded-br-sm'
                          : 'bg-white/10 text-gray-200 rounded-bl-sm'
                      }`} style={msg.sender === 'user' ? { background: 'linear-gradient(135deg, #10b981, #059669)' } : {}}>
                        <p className="leading-relaxed">{msg.text}</p>
                        <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[10px] opacity-60">{fmt(msg.timestamp)}</span>
                          {msg.sender === 'user' && (
                            <span className="text-[10px] opacity-60">{msg.seen ? '✓✓' : '✓'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {adminTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                        {[0,1,2].map(i => (
                          <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/10 flex items-center gap-2">
                  <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition-all"
                  />
                  <button onClick={sendMessage} disabled={!text.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
