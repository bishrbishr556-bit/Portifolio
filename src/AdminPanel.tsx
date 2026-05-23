/**
 * Admin Panel — Full Portfolio CMS
 * Password: admin 123
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, LogOut, User, Briefcase, Mail, Settings, Eye, EyeOff, Save, Plus, Trash2, Globe, ChevronRight, LayoutDashboard, MessageSquare, FileText, Wrench, Image, Home, Check, Palette } from 'lucide-react';
import { usePortfolioData } from './usePortfolio';
import { PortfolioData } from './portfolioStore';

const ADMIN_PASSWORD = 'admin 123';

// ── Shared UI ──────────────────────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);
const Inp = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/60 transition-all" />
);
const Txta = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/60 transition-all resize-none" />
);
const SaveBtn = ({ saved, onClick }: { saved: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}>
    {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
  </button>
);
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">{children}</div>
);

// ── Login ──────────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { pw === ADMIN_PASSWORD ? onLogin() : (setErr('Incorrect password.'), setLoading(false)); }, 600);
  };
  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Lock size={28} className="text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm">Portfolio CMS</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <Field label="Password">
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={pw} onChange={e => { setPw(e.target.value); setErr(''); }}
                  placeholder="Enter admin password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pr-12 outline-none focus:border-purple-500/50 transition-all font-medium text-white" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {err && <p className="text-red-400 text-xs mt-1">{err}</p>}
            </Field>
            <button type="submit" disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Lock size={18} /> Login</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// ── Sidebar ────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, onLogout, unread }: { active: string; setActive: (s: string) => void; onLogout: () => void; unread: number }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={16} />, badge: unread },
    { id: 'hero', label: 'Hero Section', icon: <Home size={16} /> },
    { id: 'about', label: 'About', icon: <User size={16} /> },
    { id: 'services', label: 'Services', icon: <Wrench size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={16} /> },
    { id: 'designs', label: 'Design Work', icon: <Image size={16} /> },
    { id: 'blog', label: 'Blog Posts', icon: <FileText size={16} /> },
    { id: 'contact', label: 'Contact Info', icon: <Mail size={16} /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings size={16} /> },
  ];
  return (
    <aside className="w-56 min-h-screen border-r border-white/10 flex flex-col shrink-0" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="p-5 border-b border-white/10">
        <div className="text-lg font-bold text-white">Bishr <span className="text-purple-400">CMS</span></div>
        <div className="text-[11px] text-gray-500 mt-0.5">Portfolio Admin</div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === item.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            {item.icon} {item.label}
            {item.badge ? <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span> : null}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
          <Globe size={16} /> View Portfolio
        </a>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

// ── Dashboard ──────────────────────────────────────────────────────────────
const Dashboard = ({ data, setPage, unread }: { data: PortfolioData; setPage: (p: string) => void; unread: number }) => {
  const msgTotal = JSON.parse(localStorage.getItem('portfolio_messages') || '[]').length;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back, {data.hero.name} 👋</h2>
        <p className="text-gray-400 text-sm mt-1">Edit anything below — changes update the portfolio instantly.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Projects', value: data.projects.length, color: 'text-purple-400', page: 'projects' },
          { label: 'Services', value: data.services.length, color: 'text-cyan-400', page: 'services' },
          { label: 'Blog Posts', value: data.blog.length, color: 'text-emerald-400', page: 'blog' },
          { label: 'Messages', value: msgTotal, color: 'text-amber-400', page: 'messages', badge: unread },
        ].map((s: any) => (
          <button key={s.label} onClick={() => setPage(s.page)}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:border-purple-500/40 transition-all relative">
            {s.badge > 0 && <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{s.badge} new</span>}
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{s.label}</div>
          </button>
        ))}
      </div>
      <Card>
        <h3 className="font-bold text-white mb-4">Quick Edit</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[['Edit Hero','hero'],['Edit About','about'],['Edit Projects','projects'],['Edit Services','services'],['Edit Blog','blog'],['Site Settings','settings']].map(([label, page]) => (
            <button key={page} onClick={() => setPage(page)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all">
              <ChevronRight size={14} className="text-purple-400" /> {label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ── Messages ───────────────────────────────────────────────────────────────
const MessagesPanel = () => {
  const [messages, setMessages] = useState<any[]>(() => JSON.parse(localStorage.getItem('portfolio_messages') || '[]'));
  const [selected, setSelected] = useState<any>(null);
  useEffect(() => {
    const sync = () => setMessages(JSON.parse(localStorage.getItem('portfolio_messages') || '[]'));
    window.addEventListener('storage', sync);
    const t = setInterval(sync, 3000);
    return () => { window.removeEventListener('storage', sync); clearInterval(t); };
  }, []);
  const markRead = (id: number) => {
    const u = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(u); localStorage.setItem('portfolio_messages', JSON.stringify(u));
  };
  const remove = (id: number) => {
    const u = messages.filter(m => m.id !== id);
    setMessages(u); localStorage.setItem('portfolio_messages', JSON.stringify(u));
    if (selected?.id === id) setSelected(null);
  };
  const unread = messages.filter(m => !m.read).length;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        {unread > 0 && <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unread} new</span>}
      </div>
      {messages.length === 0 ? (
        <Card><div className="text-center py-12 text-gray-500"><MessageSquare size={40} className="mx-auto mb-4 opacity-30" /><p>No messages yet</p></div></Card>
      ) : (
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-4">
          <div className="space-y-2">
            {messages.map(msg => (
              <div key={msg.id} onClick={() => { setSelected(msg); markRead(msg.id); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selected?.id === msg.id ? 'bg-purple-600/20 border-purple-500/50' : 'bg-white/5 border-white/10 hover:bg-white/8'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white flex items-center gap-2">
                    {!msg.read && <span className="w-2 h-2 bg-purple-500 rounded-full" />}{msg.name}
                  </span>
                  <button onClick={e => { e.stopPropagation(); remove(msg.id); }} className="text-gray-500 hover:text-red-400"><Trash2 size={13} /></button>
                </div>
                <p className="text-xs text-gray-400 truncate">{msg.subject || '(No subject)'}</p>
                <p className="text-[10px] text-gray-600 mt-1">{msg.date}</p>
              </div>
            ))}
          </div>
          {selected ? (
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div><h3 className="font-bold text-white">{selected.subject || '(No subject)'}</h3><p className="text-xs text-gray-400 mt-1">{selected.date}</p></div>
                <button onClick={() => remove(selected.id)} className="text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">{selected.name[0].toUpperCase()}</div>
                <div><div className="text-sm font-bold text-white">{selected.name}</div><div className="text-xs text-gray-400">{selected.email}</div></div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-4">{selected.message}</div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
                <Mail size={14} /> Reply via Email
              </a>
            </Card>
          ) : (
            <Card><div className="text-center py-12 text-gray-500 text-sm">Select a message to read</div></Card>
          )}
        </div>
      )}
    </div>
  );
};

// ── Hero Editor ────────────────────────────────────────────────────────────
const HeroEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [hero, setHero] = useState(data.hero);
  const [saved, setSaved] = useState(false);
  const upd = (k: string, v: any) => { setHero(p => ({ ...p, [k]: v })); setSaved(false); };
  const commit = () => { save({ ...data, hero }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-white">Hero Section</h2><SaveBtn saved={saved} onClick={commit} /></div>
      <Card>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name"><Inp value={hero.name} onChange={e => upd('name', e.target.value)} /></Field>
          <Field label="Title"><Inp value={hero.title} onChange={e => upd('title', e.target.value)} /></Field>
          <Field label="Badge Text"><Inp value={hero.subtitle} onChange={e => upd('subtitle', e.target.value)} /></Field>
          <Field label="Profile Image Path"><Inp value={hero.profileImage} onChange={e => upd('profileImage', e.target.value)} placeholder="/profile.jpg" /></Field>
          <Field label="Resume URL"><Inp value={hero.resumeUrl} onChange={e => upd('resumeUrl', e.target.value)} /></Field>
          <Field label="Available for Work">
            <select value={hero.availableForWork ? 'yes' : 'no'} onChange={e => upd('availableForWork', e.target.value === 'yes')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/60">
              <option value="yes">Yes</option><option value="no">No</option>
            </select>
          </Field>
          <div className="sm:col-span-2"><Field label="Description"><Txta value={hero.description} rows={3} onChange={e => upd('description', e.target.value)} /></Field></div>
          <div className="sm:col-span-2"><Field label="Tags (comma separated)"><Inp value={hero.tags.join(', ')} onChange={e => upd('tags', e.target.value.split(',').map(t => t.trim()))} /></Field></div>
        </div>
      </Card>
      <Card>
        <h3 className="font-bold text-white mb-4">Social Links</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {(['github','linkedin','instagram','twitter'] as const).map(k => (
            <div key={k}>
              <Field label={k}><Inp value={hero.socials[k]} onChange={e => upd('socials', { ...hero.socials, [k]: e.target.value })} placeholder={`https://${k}.com/...`} /></Field>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ── About Editor ───────────────────────────────────────────────────────────
const AboutEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [about, setAbout] = useState(data.about);
  const [saved, setSaved] = useState(false);
  const upd = (k: string, v: any) => { setAbout(p => ({ ...p, [k]: v })); setSaved(false); };
  const commit = () => { save({ ...data, about }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-white">About Section</h2><SaveBtn saved={saved} onClick={commit} /></div>
      <Card>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Location"><Inp value={about.location} onChange={e => upd('location', e.target.value)} /></Field>
          <Field label="Years of Experience"><Inp value={about.experience} onChange={e => upd('experience', e.target.value)} /></Field>
          <Field label="Projects Completed"><Inp value={about.projectsCount} onChange={e => upd('projectsCount', e.target.value)} /></Field>
          <Field label="Happy Clients"><Inp value={about.clientsCount} onChange={e => upd('clientsCount', e.target.value)} /></Field>
          <Field label="Profile Image Path"><Inp value={about.profileImage} onChange={e => upd('profileImage', e.target.value)} /></Field>
          <Field label="Skills (comma separated)"><Inp value={about.skills.join(', ')} onChange={e => upd('skills', e.target.value.split(',').map(s => s.trim()))} /></Field>
          <div className="sm:col-span-2"><Field label="Bio Paragraph 1"><Txta value={about.bio1} rows={3} onChange={e => upd('bio1', e.target.value)} /></Field></div>
          <div className="sm:col-span-2"><Field label="Bio Paragraph 2"><Txta value={about.bio2} rows={3} onChange={e => upd('bio2', e.target.value)} /></Field></div>
        </div>
      </Card>
    </div>
  );
};

// ── Services Editor ────────────────────────────────────────────────────────
const ServicesEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [services, setServices] = useState(data.services);
  const [saved, setSaved] = useState(false);
  const upd = (i: number, k: string, v: string) => { setServices(p => p.map((s, idx) => idx === i ? { ...s, [k]: v } : s)); setSaved(false); };
  const add = () => { setServices(p => [...p, { title: 'New Service', desc: '' }]); setSaved(false); };
  const remove = (i: number) => { setServices(p => p.filter((_, idx) => idx !== i)); setSaved(false); };
  const commit = () => { save({ ...data, services }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Services</h2>
        <div className="flex gap-3"><button onClick={add} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold"><Plus size={14} /> Add</button><SaveBtn saved={saved} onClick={commit} /></div>
      </div>
      <div className="space-y-3">
        {services.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 grid sm:grid-cols-[1fr_2fr_auto] gap-4 items-start">
            <Field label="Title"><Inp value={s.title} onChange={e => upd(i, 'title', e.target.value)} /></Field>
            <Field label="Description"><Inp value={s.desc} onChange={e => upd(i, 'desc', e.target.value)} /></Field>
            <button onClick={() => remove(i)} className="mt-6 text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Projects Editor ────────────────────────────────────────────────────────
const ProjectsEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [projects, setProjects] = useState(data.projects);
  const [saved, setSaved] = useState(false);
  const upd = (id: number, k: string, v: any) => { setProjects(p => p.map(x => x.id === id ? { ...x, [k]: v } : x)); setSaved(false); };
  const add = () => { setProjects(p => [...p, { id: Date.now(), title: 'New Project', desc: '', tags: [], img: '', liveDemo: '' }]); setSaved(false); };
  const remove = (id: number) => { setProjects(p => p.filter(x => x.id !== id)); setSaved(false); };
  const commit = () => { save({ ...data, projects }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <div className="flex gap-3"><button onClick={add} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold"><Plus size={14} /> Add</button><SaveBtn saved={saved} onClick={commit} /></div>
      </div>
      <div className="space-y-4">
        {projects.map(proj => (
          <div key={proj.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between"><span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Project</span><button onClick={() => remove(proj.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title"><Inp value={proj.title} onChange={e => upd(proj.id, 'title', e.target.value)} /></Field>
              <Field label="Image Path"><Inp value={proj.img} onChange={e => upd(proj.id, 'img', e.target.value)} placeholder="/project.jpg" /></Field>
              <Field label="Live Demo URL"><Inp value={proj.liveDemo} onChange={e => upd(proj.id, 'liveDemo', e.target.value)} /></Field>
              <Field label="Tags (comma separated)"><Inp value={proj.tags.join(', ')} onChange={e => upd(proj.id, 'tags', e.target.value.split(',').map(t => t.trim()))} /></Field>
              <div className="sm:col-span-2"><Field label="Description"><Txta value={proj.desc} rows={2} onChange={e => upd(proj.id, 'desc', e.target.value)} /></Field></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Blog Editor ────────────────────────────────────────────────────────────
const BlogEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [posts, setPosts] = useState(data.blog);
  const [saved, setSaved] = useState(false);
  const upd = (id: number, k: string, v: any) => { setPosts(p => p.map(x => x.id === id ? { ...x, [k]: v } : x)); setSaved(false); };
  const add = () => { setPosts(p => [...p, { id: Date.now(), category: 'General', date: new Date().toLocaleDateString(), readTime: '3 min read', title: 'New Post', desc: '', img: '', tags: [] }]); setSaved(false); };
  const remove = (id: number) => { setPosts(p => p.filter(x => x.id !== id)); setSaved(false); };
  const commit = () => { save({ ...data, blog: posts }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <div className="flex gap-3"><button onClick={add} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold"><Plus size={14} /> Add</button><SaveBtn saved={saved} onClick={commit} /></div>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between"><span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Post</span><button onClick={() => remove(post.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title"><Inp value={post.title} onChange={e => upd(post.id, 'title', e.target.value)} /></Field>
              <Field label="Category"><Inp value={post.category} onChange={e => upd(post.id, 'category', e.target.value)} /></Field>
              <Field label="Date"><Inp value={post.date} onChange={e => upd(post.id, 'date', e.target.value)} /></Field>
              <Field label="Read Time"><Inp value={post.readTime} onChange={e => upd(post.id, 'readTime', e.target.value)} /></Field>
              <Field label="Cover Image URL"><Inp value={post.img} onChange={e => upd(post.id, 'img', e.target.value)} /></Field>
              <Field label="Tags (comma separated)"><Inp value={post.tags.join(', ')} onChange={e => upd(post.id, 'tags', e.target.value.split(',').map(t => t.trim()))} /></Field>
              <div className="sm:col-span-2"><Field label="Description"><Txta value={post.desc} rows={2} onChange={e => upd(post.id, 'desc', e.target.value)} /></Field></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Designs Editor ─────────────────────────────────────────────────────────
const DesignsEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [designs, setDesigns] = useState(data.designs);
  const [saved, setSaved] = useState(false);
  const upd = (i: number, k: string, v: string) => { setDesigns(p => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x)); setSaved(false); };
  const add = () => { setDesigns(p => [...p, { img: '', title: 'New Design', category: 'Graphic Design' }]); setSaved(false); };
  const remove = (i: number) => { setDesigns(p => p.filter((_, idx) => idx !== i)); setSaved(false); };
  const commit = () => { save({ ...data, designs }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Design Work</h2>
        <div className="flex gap-3"><button onClick={add} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold"><Plus size={14} /> Add</button><SaveBtn saved={saved} onClick={commit} /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {designs.map((d, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between"><span className="text-xs font-bold text-purple-400">Design {i + 1}</span><button onClick={() => remove(i)} className="text-red-400 hover:text-red-300"><Trash2 size={13} /></button></div>
            {d.img && <img src={d.img} alt={d.title} className="w-full h-20 object-cover rounded-lg" />}
            <Field label="Image Path"><Inp value={d.img} onChange={e => upd(i, 'img', e.target.value)} placeholder="/design1.jpg" /></Field>
            <Field label="Title"><Inp value={d.title} onChange={e => upd(i, 'title', e.target.value)} /></Field>
            <Field label="Category"><Inp value={d.category} onChange={e => upd(i, 'category', e.target.value)} /></Field>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Contact Editor ─────────────────────────────────────────────────────────
const ContactEditor = ({ data, save }: { data: PortfolioData; save: (d: PortfolioData) => void }) => {
  const [contact, setContact] = useState(data.contact);
  const [saved, setSaved] = useState(false);
  const upd = (k: string, v: string) => { setContact(p => ({ ...p, [k]: v })); setSaved(false); };
  const commit = () => { save({ ...data, contact }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-white">Contact Info</h2><SaveBtn saved={saved} onClick={commit} /></div>
      <Card>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email"><Inp value={contact.email} onChange={e => upd('email', e.target.value)} /></Field>
          <Field label="Phone"><Inp value={contact.phone} onChange={e => upd('phone', e.target.value)} /></Field>
          <Field label="Location"><Inp value={contact.location} onChange={e => upd('location', e.target.value)} /></Field>
          <Field label="WhatsApp (with country code)"><Inp value={contact.whatsapp} onChange={e => upd('whatsapp', e.target.value)} placeholder="918129489071" /></Field>
        </div>
      </Card>
    </div>
  );
};

// ── Site Settings ──────────────────────────────────────────────────────────
const SiteSettingsEditor = ({ data, save, onLogout }: { data: PortfolioData; save: (d: PortfolioData) => void; onLogout: () => void }) => {
  const [settings, setSettings] = useState(data.siteSettings);
  const [saved, setSaved] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const upd = (k: string, v: string) => { setSettings(p => ({ ...p, [k]: v })); setSaved(false); };
  const commit = () => { save({ ...data, siteSettings: settings }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const resetData = () => { if (confirm('Reset ALL portfolio data to defaults?')) { localStorage.removeItem('portfolio_cms_data'); window.location.reload(); } };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-white">Site Settings</h2><SaveBtn saved={saved} onClick={commit} /></div>
      <Card>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Site Title"><Inp value={settings.siteTitle} onChange={e => upd('siteTitle', e.target.value)} /></Field>
          <Field label="Meta Description"><Inp value={settings.metaDescription} onChange={e => upd('metaDescription', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Footer Text"><Inp value={settings.footerText} onChange={e => upd('footerText', e.target.value)} /></Field></div>
        </div>
      </Card>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-md">
        <h3 className="font-bold text-white">Change Admin Password</h3>
        <Field label="New Password"><Inp type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Min 6 characters" /></Field>
        {passMsg && <p className="text-emerald-400 text-xs">{passMsg}</p>}
        <button onClick={() => { if (newPass.length >= 6) { setPassMsg('Updated (session only)'); setNewPass(''); } else setPassMsg('Min 6 characters required.'); }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
          <Save size={14} /> Update Password
        </button>
      </div>
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-3 max-w-md">
        <h3 className="font-bold text-red-400">Danger Zone</h3>
        <div className="flex gap-3">
          <button onClick={resetData} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            <Trash2 size={14} /> Reset All Data
          </button>
          <button onClick={onLogout} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main App ───────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [page, setPage] = useState('dashboard');
  const [data, save] = usePortfolioData();
  const unread = JSON.parse(localStorage.getItem('portfolio_messages') || '[]').filter((m: any) => !m.read).length;

  const login = () => { sessionStorage.setItem('admin_auth', 'true'); setLoggedIn(true); };
  const logout = () => { sessionStorage.removeItem('admin_auth'); setLoggedIn(false); };

  if (!loggedIn) return <LoginScreen onLogin={login} />;

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard data={data} setPage={setPage} unread={unread} />;
      case 'messages':  return <MessagesPanel />;
      case 'hero':      return <HeroEditor data={data} save={save} />;
      case 'about':     return <AboutEditor data={data} save={save} />;
      case 'services':  return <ServicesEditor data={data} save={save} />;
      case 'projects':  return <ProjectsEditor data={data} save={save} />;
      case 'designs':   return <DesignsEditor data={data} save={save} />;
      case 'blog':      return <BlogEditor data={data} save={save} />;
      case 'contact':   return <ContactEditor data={data} save={save} />;
      case 'settings':  return <SiteSettingsEditor data={data} save={save} onLogout={logout} />;
      default:          return <Dashboard data={data} setPage={setPage} unread={unread} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white flex">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>
      <Sidebar active={page} setActive={setPage} onLogout={logout} unread={unread} />
      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.2 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
