import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Trash2, Ban, MessageSquare, Users, Activity, X } from 'lucide-react';
import { ChatSession, ChatMessage, getAllChats, saveAllChats } from './ChatWidget';

function fmt(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function playNotif() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

export default function AdminChat() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [search, setSearch] = useState('');
  const [prevTotal, setPrevTotal] = useState(0);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = () => {
    const all = getAllChats();
    const total = all.reduce((s, c) => s + c.messages.length, 0);
    if (total > prevTotal && prevTotal > 0) playNotif();
    setPrevTotal(total);
    setChats(all);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 1500);
    window.addEventListener('chats_updated', load);
    return () => { clearInterval(t); window.removeEventListener('chats_updated', load); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected, chats]);

  const current = chats.find(c => c.id === selected);

  const sendReply = () => {
    if (!reply.trim() || !selected) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: reply.trim(),
      sender: 'admin',
      timestamp: Date.now(),
      seen: false,
    };
    const all = getAllChats();
    const idx = all.findIndex(c => c.id === selected);
    if (idx !== -1) {
      all[idx].messages.push(msg);
      all[idx].lastMessage = msg.text;
      all[idx].lastTimestamp = msg.timestamp;
      saveAllChats(all);
      setChats([...all]);
    }
    setReply('');
    // Clear typing indicator
    localStorage.removeItem(`admin_typing_${selected}`);
  };

  const handleTyping = (v: string) => {
    setReply(v);
    if (selected) {
      localStorage.setItem(`admin_typing_${selected}`, v.length > 0 ? 'true' : 'false');
    }
  };

  const deleteChat = (id: string) => {
    const all = getAllChats().filter(c => c.id !== id);
    saveAllChats(all);
    setChats(all);
    if (selected === id) setSelected(null);
  };

  const toggleBlock = (id: string) => {
    const all = getAllChats();
    const idx = all.findIndex(c => c.id === id);
    if (idx !== -1) { all[idx].blocked = !all[idx].blocked; saveAllChats(all); setChats([...all]); }
  };

  const markRead = (id: string) => {
    const all = getAllChats();
    const idx = all.findIndex(c => c.id === id);
    if (idx !== -1) {
      all[idx].messages = all[idx].messages.map(m => ({ ...m, seen: true }));
      all[idx].unread = 0;
      saveAllChats(all);
      setChats([...all]);
    }
  };

  const filtered = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = chats.reduce((s, c) => s + (c.unread || 0), 0);
  const totalMsgs = chats.reduce((s, c) => s + c.messages.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live Chat</h2>
        {totalUnread > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{totalUnread} unread</span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: <Users size={18} />, label: 'Total Users', value: chats.length, color: 'text-purple-400' },
          { icon: <MessageSquare size={18} />, label: 'Total Messages', value: totalMsgs, color: 'text-cyan-400' },
          { icon: <Activity size={18} />, label: 'Unread', value: totalUnread, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className={`${s.color}`}>{s.icon}</div>
            <div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat UI */}
      <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden flex" style={{ height: '560px', background: 'rgba(255,255,255,0.02)' }}>

        {/* Sidebar */}
        <div className="w-72 border-r border-white/10 flex flex-col shrink-0">
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white outline-none focus:border-purple-500/50 transition-all" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No chats yet</div>
            ) : filtered.map(chat => (
              <button key={chat.id} onClick={() => { setSelected(chat.id); markRead(chat.id); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-white/5 ${selected === chat.id ? 'bg-purple-600/20' : 'hover:bg-white/5'} ${chat.blocked ? 'opacity-50' : ''}`}>
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {chat.name[0].toUpperCase()}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0f0f1a] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white truncate">{chat.name}</span>
                    <span className="text-[10px] text-gray-500 shrink-0 ml-1">{fmt(chat.lastTimestamp)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-400 truncate">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span className="ml-1 shrink-0 w-4 h-4 bg-emerald-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {current ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {current.name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">{current.name}</div>
                <div className="text-xs text-gray-400">{current.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleBlock(current.id)} title={current.blocked ? 'Unblock' : 'Block'}
                  className={`p-2 rounded-lg transition-all ${current.blocked ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/5 text-gray-400 hover:text-amber-400'}`}>
                  <Ban size={15} />
                </button>
                <button onClick={() => deleteChat(current.id)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {current.blocked && (
                <div className="text-center py-2 px-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold">User is blocked</div>
              )}
              {current.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender === 'admin'
                      ? 'text-white rounded-br-sm'
                      : 'bg-white/10 text-gray-200 rounded-bl-sm'
                  }`} style={msg.sender === 'admin' ? { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' } : {}}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] opacity-60">{fmt(msg.timestamp)}</span>
                      {msg.sender === 'admin' && <span className="text-[10px] opacity-60">{msg.seen ? '✓✓' : '✓'}</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Reply input */}
            <div className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                value={reply}
                onChange={e => handleTyping(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendReply())}
                placeholder={current.blocked ? 'User is blocked' : 'Type a reply...'}
                disabled={current.blocked}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-all disabled:opacity-40"
              />
              <button onClick={sendReply} disabled={!reply.trim() || current.blocked}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-40 transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center space-y-3">
              <MessageSquare size={48} className="mx-auto opacity-20" />
              <p className="text-sm">Select a conversation to start replying</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
