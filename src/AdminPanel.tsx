/**
 * Admin Panel - Portfolio CMS
 * Password: Admin123
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, LogOut, User, Briefcase, Mail, Settings, Eye, EyeOff, Save, Plus, Trash2, Globe, ChevronRight, LayoutDashboard, MessageSquare } from 'lucide-react';

const ADMIN_PASSWORD = 'admin 123';

// ---- Login Screen ----
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Incorrect password. Try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Lock size={28} className="text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 outline-none focus:border-purple-500/50 transition-all font-medium text-white"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Lock size={18} /> Login</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// ---- Sidebar ----
const Sidebar = ({ active, setActive, onLogout }: { active: string; setActive: (s: string) => void; onLogout: () => void }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white/3 border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="text-xl font-bold text-white">Bishr <span className="text-purple-400">Admin</span></div>
        <div className="text-xs text-gray-500 mt-1">Portfolio CMS</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              active === item.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

// ---- Dashboard ----
const Dashboard = () => {
  const stats = [
    { label: 'Projects', value: '2', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Work Items', value: '12', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Blog Posts', value: '4', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Services', value: '6', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back, Bishr 👋</h2>
        <p className="text-gray-400 text-sm mt-1">Here's an overview of your portfolio.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2`}>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white">Quick Actions</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'View Portfolio', icon: <Globe size={16} />, href: '/' },
            { label: 'Edit Projects', icon: <Briefcase size={16} />, action: true },
            { label: 'Update Contact', icon: <Mail size={16} />, action: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 cursor-pointer transition-all">
              {item.icon} {item.label} <ChevronRight size={14} className="ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---- Projects Manager ----
const ProjectsManager = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Infinite Heroes', tags: 'Graphic Design, Branding', liveDemo: 'https://heroseen.vercel.app/', img: '/heroes.jpg' },
    { id: 2, title: 'E-Commerce Platform', tags: 'E-Commerce, Razorpay', liveDemo: '', img: '' },
  ]);
  const [saved, setSaved] = useState(false);

  const update = (id: number, field: string, value: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    setSaved(false);
  };

  const remove = (id: number) => setProjects(prev => prev.filter(p => p.id !== id));

  const add = () => setProjects(prev => [...prev, { id: Date.now(), title: 'New Project', tags: '', liveDemo: '', img: '' }]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <div className="flex gap-3">
          <button onClick={add} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
            <Plus size={16} /> Add Project
          </button>
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
            <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map(proj => (
          <div key={proj.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Project</span>
              <button onClick={() => remove(proj.id)} className="text-red-400 hover:text-red-300 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold">Title</label>
                <input value={proj.title} onChange={e => update(proj.id, 'title', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold">Tags (comma separated)</label>
                <input value={proj.tags} onChange={e => update(proj.id, 'tags', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold">Live Demo URL</label>
                <input value={proj.liveDemo} onChange={e => update(proj.id, 'liveDemo', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold">Image Path</label>
                <input value={proj.img} onChange={e => update(proj.id, 'img', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- About Editor ----
const AboutEditor = () => {
  const [form, setForm] = useState({
    name: 'Bishr',
    title: 'Web Designer & Developer',
    location: 'Malappuram, Kerala',
    experience: '1',
    bio1: "I'm Bishr, expert Web Designer & Developer in Malappuram, Kerala with over 1 year of experience in creating digital experiences that drive business results.",
    bio2: 'I believe in creating websites that not only look stunning but also convert visitors into customers.',
    projects: '20+',
    clients: '30+',
  });
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => { setForm(p => ({ ...p, [field]: value })); setSaved(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">About</h2>
        <button onClick={() => setSaved(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid sm:grid-cols-2 gap-4">
        {[
          { label: 'Name', field: 'name' },
          { label: 'Title', field: 'title' },
          { label: 'Location', field: 'location' },
          { label: 'Years of Experience', field: 'experience' },
          { label: 'Projects Completed', field: 'projects' },
          { label: 'Happy Clients', field: 'clients' },
        ].map(item => (
          <div key={item.field} className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">{item.label}</label>
            <input value={form[item.field as keyof typeof form]} onChange={e => update(item.field, e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
          </div>
        ))}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs text-gray-400 font-semibold">Bio Paragraph 1</label>
          <textarea value={form.bio1} onChange={e => update('bio1', e.target.value)} rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all resize-none" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs text-gray-400 font-semibold">Bio Paragraph 2</label>
          <textarea value={form.bio2} onChange={e => update('bio2', e.target.value)} rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all resize-none" />
        </div>
      </div>
    </div>
  );
};

// ---- Contact Editor ----
const ContactEditor = () => {
  const [form, setForm] = useState({
    email: 'hello@razi.me',
    phone: '+91 8129489071',
    location: 'Kerala, India',
    whatsapp: '918129489071',
  });
  const [saved, setSaved] = useState(false);
  const update = (field: string, value: string) => { setForm(p => ({ ...p, [field]: value })); setSaved(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Info</h2>
        <button onClick={() => setSaved(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid sm:grid-cols-2 gap-4">
        {[
          { label: 'Email', field: 'email' },
          { label: 'Phone', field: 'phone' },
          { label: 'Location', field: 'location' },
          { label: 'WhatsApp Number (with country code)', field: 'whatsapp' },
        ].map(item => (
          <div key={item.field} className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">{item.label}</label>
            <input value={form[item.field as keyof typeof form]} onChange={e => update(item.field, e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- Messages Panel ----
const MessagesPanel = () => {
  const [messages, setMessages] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem('portfolio_messages') || '[]')
  );
  const [selected, setSelected] = useState<any>(null);

  const markRead = (id: number) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  const remove = (id: number) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        {unread > 0 && (
          <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unread} new</span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-500">
          <Mail size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-medium">No messages yet</p>
          <p className="text-sm mt-1">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-4">
          {/* List */}
          <div className="space-y-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); markRead(msg.id); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selected?.id === msg.id
                    ? 'bg-purple-600/20 border-purple-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white flex items-center gap-2">
                    {!msg.read && <span className="w-2 h-2 bg-purple-500 rounded-full inline-block" />}
                    {msg.name}
                  </span>
                  <button onClick={e => { e.stopPropagation(); remove(msg.id); }} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 truncate">{msg.subject || '(No subject)'}</p>
                <p className="text-[10px] text-gray-600 mt-1">{msg.date}</p>
              </div>
            ))}
          </div>

          {/* Detail */}
          {selected ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">{selected.subject || '(No subject)'}</h3>
                  <p className="text-xs text-gray-400 mt-1">{selected.date}</p>
                </div>
                <button onClick={() => remove(selected.id)} className="text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                  {selected.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{selected.name}</div>
                  <div className="text-xs text-gray-400">{selected.email}</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                <Mail size={15} /> Reply via Email
              </a>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-500">
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---- Settings ----
const SettingsPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirm) { setMsg('Passwords do not match.'); return; }
    if (newPass.length < 6) { setMsg('Password must be at least 6 characters.'); return; }
    setMsg('Password updated! (Note: resets on page refresh in demo mode)');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-md">
        <h3 className="font-bold text-white">Change Password</h3>
        <form onSubmit={handleChange} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">New Password</label>
            <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold">Confirm Password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all" />
          </div>
          {msg && <p className="text-xs text-emerald-400 font-medium">{msg}</p>}
          <button type="submit" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all">
            <Save size={16} /> Update Password
          </button>
        </form>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-3 max-w-md">
        <h3 className="font-bold text-red-400">Danger Zone</h3>
        <p className="text-xs text-gray-400">Log out of the admin panel.</p>
        <button onClick={onLogout} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-3 rounded-xl text-sm font-bold transition-all">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

// ---- Main Admin Panel ----
export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [page, setPage] = useState('dashboard');

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setLoggedIn(false);
  };

  if (!loggedIn) return <LoginScreen onLogin={handleLogin} />;

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'messages': return <MessagesPanel />;
      case 'projects': return <ProjectsManager />;
      case 'about': return <AboutEditor />;
      case 'contact': return <ContactEditor />;
      case 'settings': return <SettingsPanel onLogout={handleLogout} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white flex">
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />
      </div>

      <Sidebar active={page} setActive={setPage} onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
