/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Twitter, MessageCircle, ArrowRight, Download, Menu, X, Mail, Phone, MapPin, Globe, CheckCircle2, ChevronRight, Palette, Search, Megaphone, Terminal, Server } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

// --- Smooth scroll helper ---
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// --- Section fade-in wrapper ---
const Section = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="pt-28 pb-20 px-6 max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'work', 'blog', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Work', id: 'work' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030014]/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => scrollToSection('home')} className="text-2xl font-display font-bold flex items-center gap-1 group">
          <span className="text-white">Bishr</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${active === link.id ? 'text-purple-500' : 'text-gray-400'}`}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://wa.me/918129489071"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-[#030014] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollToSection(link.id); setIsOpen(false); }}
              className={`text-lg font-medium transition-colors text-left ${active === link.id ? 'text-purple-500' : 'text-gray-400'}`}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://wa.me/918129489071"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#10b981] text-white py-3 rounded-xl font-semibold"
          >
            <MessageCircle size={20} />
            <span>Contact via WhatsApp</span>
          </a>
        </motion.div>
      )}
    </nav>
  );
};

// --- Home Section ---
const HomeSection = () => (
  <Section id="home">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-1.5 rounded-full text-purple-400 text-sm font-medium"
        >
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          Available for freelance work
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800">
            Bishr
          </h1>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white">
            Web Designer & <span className="text-gray-400">Developer</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { icon: <Terminal size={14} />, label: 'Web Development' },
            { icon: <Palette size={14} />, label: 'Graphic Design' },
            { icon: <Megaphone size={14} />, label: 'Digital Marketing' }
          ].map((tag) => (
            <span key={tag.label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-gray-300">
              {tag.icon} {tag.label}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
          Expert in creating stunning digital experiences through <span className="text-cyan-400">E-Commerce solutions</span>, <span className="text-purple-400">SEO optimization</span>, and <span className="text-emerald-400">digital marketing strategies</span>. Transforming ideas into powerful, results-driven websites.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => scrollToSection('projects')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
          >
            View My Work <ArrowRight size={20} />
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
            View Resume <Download size={20} />
          </button>
        </div>

        <div className="flex gap-4 pt-8">
          {[Github, Linkedin, Instagram, Twitter].map((Icon, idx) => (
            <a key={idx} href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-400/50 transition-all">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 px-10 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative glass-card overflow-hidden">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-10 left-10 py-1.5 px-3 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2">
            <Terminal size={14} className="text-purple-400" /> React Dev
          </div>
          <div className="absolute top-20 right-10 py-1.5 px-3 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2">
            <span className="text-emerald-400">&#8599;</span> SEO Expert
          </div>
          <div className="absolute bottom-40 left-5 py-1.5 px-3 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2">
            <Palette size={14} className="text-cyan-400" /> UI Designer
          </div>
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Available for work
            </div>
            <div className="text-gray-400">2026</div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// --- About Section ---
const AboutSection = () => (
  <Section id="about">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative order-2 md:order-1">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative mx-auto w-full max-w-md aspect-square">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 p-2" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-[#030014] border border-white/10 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl">
            1 Year <span className="text-purple-400 font-normal">Exp.</span>
          </div>
          <img
            src="/profile.jpg"
            alt="About Razi"
            className="w-full h-full object-cover rounded-full p-4 border border-white/10"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <CheckCircle2 size={24} />
            </div>
            <div className="text-3xl font-bold">20+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Projects Completed</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Globe size={24} />
            </div>
            <div className="text-3xl font-bold">30+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Happy Clients</div>
          </div>
        </div>
      </div>

      <div className="space-y-8 order-1 md:order-2">
        <div className="space-y-4">
          <h2 className="text-5xl font-display font-bold">About Me</h2>
          <p className="text-gray-400 leading-relaxed">
            I'm <span className="text-white font-semibold">Bishr</span>, expert Web Designer & Developer in Malappuram, Kerala with over 1 year of experience in creating digital experiences that drive business results. My expertise spans across E-Commerce development, SEO optimization, digital marketing, and graphic design.
          </p>
          <p className="text-gray-400 leading-relaxed">
            I believe in creating websites that not only look stunning but also convert visitors into customers. Every project I undertake is designed with user experience, search engine optimization, and business growth in mind.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">What I Do</h3>
          <div className="flex flex-wrap gap-2">
            {['Web Design', 'Web Development', 'E-Commerce Development', 'SEO Optimization', 'Digital Marketing', 'Mobile App Dev'].map(tag => (
              <span key={tag} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-purple-500/20 hover:border-purple-500/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// --- Services Section ---
const ServicesSection = () => (
  <Section id="services">
    <div className="text-center space-y-4 mb-20">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-purple-400">
        <Terminal size={14} /> What I Offer
      </div>
      <h2 className="text-5xl font-display font-bold">Services & <span className="text-purple-500">Expertise</span></h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Comprehensive digital solutions to help your business thrive online. From concept to launch, I deliver exceptional results that exceed expectations.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        { icon: <Terminal />, title: 'Web Development', desc: 'Custom websites and web applications built with modern technologies and best practices.' },
        { icon: <Globe />, title: 'E-Commerce Solutions', desc: 'Complete online stores with payment integration and inventory management systems.' },
        { icon: <Search />, title: 'SEO Optimization', desc: 'Improve your search rankings and drive organic traffic to your website effectively with proven SEO strategies.' },
        { icon: <Megaphone />, title: 'Digital Marketing', desc: 'Strategic marketing campaigns to grow your online presence and business reach through targeted digital channels.' },
        { icon: <Palette />, title: 'Graphic Design', desc: 'Creative visual solutions including branding, logos, and marketing materials for businesses.' },
        { icon: <Server />, title: 'Server Management', desc: 'Hosting and server management with dedicated hosting solutions for optimal performance.' }
      ].map((service, idx) => (
        <div key={idx} className="glass-card p-10 group hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 mb-8">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold mb-4">{service.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
          <button className="flex items-center gap-2 text-xs font-bold group-hover:text-purple-400 transition-colors">
            Learn more <ChevronRight size={14} />
          </button>
        </div>
      ))}
    </div>

    <div className="mt-20 glass-card p-12 text-center overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Globe size={180} />
      </div>
      <div className="relative z-10 space-y-6">
        <h2 className="text-3xl font-display font-bold">Achievements & Milestones</h2>
        <div className="flex flex-wrap justify-center gap-12 pt-8">
          {[
            { val: '20+', label: 'Projects Completed' },
            { val: '30+', label: 'Happy Clients' },
            { val: '7+', label: 'Years Experience' },
            { val: '100%', label: 'Client Satisfaction' }
          ].map(stat => (
            <div key={stat.label} className="space-y-1">
              <div className="text-4xl font-bold gradient-text">{stat.val}</div>
              <div className="text-xs uppercase tracking-tighter text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

// --- Skills Section ---
const SkillsSection = () => (
  <Section id="skills">
    <div className="text-center space-y-4 mb-20">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-purple-400">
        <Terminal size={14} /> Professional Skills & Expertise
      </div>
      <h2 className="text-5xl font-display font-bold">Skills & <span className="text-purple-500">Expertise</span></h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        I am a versatile digital professional with expertise spanning web development, digital marketing, graphic design, and media production.
      </p>
    </div>

    <div className="space-y-12">
      {[
        {
          category: 'Frontend Development',
          desc: 'Building responsive, modern and app-friendly web interfaces with cutting-edge technologies.',
          skills: ['React.js & Next.js', 'Typescript & JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS & Bootstrap', 'Responsive Web Design', 'Vite & Modern Build Tools']
        },
        {
          category: 'Backend & API Development',
          desc: 'Robust server-side solutions and API development to power scalable web applications.',
          skills: ['Node.js & Express.js', 'PHP & Laravel Framework', 'RESTful & GraphQL APIs', 'API Testing with Postman', 'TypeScript for Backend', 'Microservices Architecture'],
          comingSoon: true
        },
        {
          category: 'Mobile App Development',
          desc: 'Cross-platform mobile application development using React Native for iOS and Android.',
          skills: ['React Native & Expo', 'Cross-Platform Development', 'iOS & Android Deployment', 'Native Device APIs', 'Mobile UI/UX Design', 'App Store & Play Store Publishing'],
          comingSoon: true
        }
      ].map((cat, idx) => (
        <div key={idx} className={`glass-card p-10 relative overflow-hidden group transition-all duration-500 ${cat.comingSoon ? 'opacity-50' : 'hover:border-purple-500/30'}`}>
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold">0{idx + 1}</div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Terminal size={20} /></div>
              </div>
              <h3 className="text-2xl font-bold">{cat.category}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{cat.desc}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {cat.skills.map(s => (
                <div key={s} className="bg-white/5 border border-white/10 px-5 py-4 rounded-xl flex items-center gap-3 group-hover:border-white/20 transition-all">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
          {cat.comingSoon && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-amber-500 text-black px-6 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2">
                <span className="animate-pulse w-2 h-2 bg-black rounded-full" /> Coming Soon
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  </Section>
);

// --- Projects Section ---
const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'React Native', 'Next.js', 'Node.js', 'MongoDB', 'OpenAI', 'E-Commerce', 'SEO-Optimized', 'Responsive', 'AI Chat'];

  const projects = [
    {
      title: 'Infinite Heroes',
      desc: 'A bold fantasy-themed branding and game design project featuring epic visual identity, logo design, and promotional artwork for an action RPG gaming experience.',
      tags: ['Graphic Design', 'Branding', 'Game Design', 'Illustration'],
      img: '/heroes.jpg',
      liveDemo: 'https://heroseen.vercel.app/'
    },
    {
      title: 'E-Commerce Platform',
      desc: 'PlantBox is a complete e-commerce platform that allows users to buy and sell plants online. It features a user-friendly interface, secure payment integration, and a wide range of plant products.',
      tags: ['E-Commerce', 'Razorpay', 'Online Shopping', 'Wordpress'],
      img: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2670&auto=format&fit=crop',
      comingSoon: true,
      liveDemo: ''
    }
  ];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <Section id="projects">
      <div className="text-center space-y-4 mb-20">
        <h2 className="text-6xl font-display font-bold">Featured <span className="text-purple-500 underline decoration-cyan-400/30">Work</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for creating exceptional digital experiences.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filter === f ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-32">
        {filtered.map((proj, idx) => (
          <div key={idx} className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`relative group ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <img
                  referrerPolicy="no-referrer"
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {proj.comingSoon && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-amber-500 text-black px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full animate-pulse" /> Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-4xl font-display font-bold">{proj.title}</h3>
              <p className="text-gray-400 leading-relaxed">{proj.desc}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map(t => (
                  <span key={t} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t}</span>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-600/20">View Details</button>
                {proj.liveDemo ? (
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                  >
                    <Globe size={18} /> Live Demo
                  </a>
                ) : (
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                    <Globe size={18} /> Live Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// --- Work Section ---
const WorkSection = () => {
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    'Web Design & Development',
    'Mobile / Cross-Platform Application',
    'Wikipedia',
    'Branding / Logo',
    'E-Commerce',
    'Graphic Design',
    'Brochure / Print Design',
    'Search Engine Optimization',
    'Content Creation / Meta Making',
  ];

  const works = [
    {
      title: 'Exam Management Portal',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Exam Management Portal | Custom Application Development',
      img: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2670&auto=format&fit=crop',
    },
    {
      title: 'Mileage Calculator Pro | App Available on iOS & Android',
      category: 'Mobile / Cross-Platform Application',
      tags: ['MOBILE / CROSS - PLATFORM APPLICATION'],
      desc: 'Mileage Calculator Pro | App Available on iOS & Android by MyRace',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop',
    },
    {
      title: 'Kareemgraphy Wikipedia Profile Page',
      category: 'Wikipedia',
      tags: ['WIKIPEDIA'],
      desc: 'This project documents my contribution to Wikipedia through the creation and structured development of the...',
      img: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2670&auto=format&fit=crop',
    },
    {
      title: 'Branding Kit for Pharmacy | Logo Design',
      category: 'Branding / Logo',
      tags: ['BRANDING / LOGO'],
      desc: 'Branding Kit for the YAS Pharmacy | Logo Design',
      img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2669&auto=format&fit=crop',
    },
    {
      title: 'Website Design | Modern UI/UX for Laundry Service',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'A beautiful website design for Laundry Day to elevate their digital presence and customer...',
      img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2671&auto=format&fit=crop',
    },
    {
      title: 'Stream Now - Free Live TV Streaming App',
      category: 'Mobile / Cross-Platform Application',
      tags: ['MOBILE / CROSS - PLATFORM APPLICATION'],
      desc: 'A cross-platform application built for streaming live TV for unlimited language channels and other...',
      img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2670&auto=format&fit=crop',
    },
    {
      title: 'E-Commerce Platform for Al Hayba Clothing Brand',
      category: 'E-Commerce',
      tags: ['E-COMMERCE'],
      desc: 'A modern, full-featured e-commerce platform built with Laravel 12',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop',
    },
    {
      title: 'Responsive Website Design',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Responsive Website Design for the NID Atelier LLC',
      img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop',
    },
    {
      title: 'Responsive & Mobile Friendly Campus Website',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Responsive & Mobile Friendly Campus Website',
      img: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2666&auto=format&fit=crop',
    },
    {
      title: 'Social Media Design for College Tour',
      category: 'Graphic Design',
      tags: ['GRAPHIC DESIGN'],
      desc: 'Social Media Design for College Tour',
      img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2674&auto=format&fit=crop',
    },
    {
      title: 'Responsive Website | UI/UX',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Responsive Website | UI/UX',
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2655&auto=format&fit=crop',
    },
    {
      title: 'Newspaper Ads Design',
      category: 'Brochure / Print Design',
      tags: ['BROCHURE / PRINT DESIGN'],
      desc: 'Newspaper Ads Design',
      img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop',
    },
  ];

  const filtered = filter === 'All' ? works : works.filter(w => w.category === filter);

  return (
    <Section id="work">
      {/* Hero */}
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
          Showcasing <span className="text-emerald-400">excellence</span><br />through every pixel
        </h2>
        <p className="text-gray-400 max-w-md leading-relaxed">
          A curated selection of my professional work, ranging from complex web applications to unique branding experiences. Each project is built with precision and passion.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === cat
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((work, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="break-inside-avoid glass-card overflow-hidden group cursor-pointer hover:border-white/20 transition-all duration-500"
          >
            <div className="relative overflow-hidden">
              <img
                src={work.img}
                alt={work.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <ChevronRight size={20} className="text-white ml-auto" />
              </div>
            </div>
            <div className="p-5 space-y-2">
              {work.tags.map(tag => (
                <span key={tag} className="inline-block text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{tag}</span>
              ))}
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-purple-400 transition-colors">{work.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{work.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// --- Blog Section ---
const BlogSection = () => {
  const posts = [
    {
      category: 'Development',
      date: 'May 18, 2026',
      readTime: '5 min read',
      title: 'My Developer Workflow in 2026',
      desc: 'Software development in 2026 is no longer just about writing code. This blog explores my modern engineering workflow — combining AI-assisted coding, automated testing, and streamlined deployment pipelines.',
      img: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2670&auto=format&fit=crop',
      tags: ['React', 'Workflow', 'AI Tools']
    },
    {
      category: 'Design',
      date: 'May 10, 2026',
      readTime: '4 min read',
      title: 'Why UI Design Still Matters in the AI Era',
      desc: 'With AI generating interfaces on demand, the role of a human designer has shifted. Here\'s why thoughtful UI design is more important than ever for creating meaningful user experiences.',
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664&auto=format&fit=crop',
      tags: ['UI/UX', 'Design', 'Trends']
    },
    {
      category: 'SEO',
      date: 'Apr 28, 2026',
      readTime: '6 min read',
      title: 'SEO Strategies That Actually Work in 2026',
      desc: 'Search engine algorithms have evolved dramatically. Discover the proven SEO techniques I use to rank client websites on the first page — from core web vitals to AI-driven content strategies.',
      img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop',
      tags: ['SEO', 'Marketing', 'Growth']
    },
    {
      category: 'E-Commerce',
      date: 'Apr 15, 2026',
      readTime: '7 min read',
      title: 'Building High-Converting E-Commerce Stores',
      desc: 'A deep dive into the psychology of online shopping and the technical decisions that turn visitors into buyers — from page speed to checkout flow optimization.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop',
      tags: ['E-Commerce', 'Conversion', 'UX']
    }
  ];

  return (
    <Section id="blog">
      {/* Hero */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-400 mb-6">
          BLOG & INSIGHTS
        </div>
        <h2 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">Knowledge</h2>
        <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
          Exploring the intersection of design, technology, and business growth in local and global markets.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card overflow-hidden group hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-video">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {post.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-purple-400 text-sm font-bold pt-2 group-hover:gap-3 transition-all">
                Read More <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// --- Contact Section ---
const ContactSection = () => (
  <Section id="contact">
    <div className="text-center space-y-4 mb-20">
      <h2 className="text-6xl font-display font-bold">Let's Work Together</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Have a project in mind or just want to chat? I'd love to hear from you. Drop me a message and let's create something amazing together.
      </p>
    </div>

    <div className="grid md:grid-cols-[1.5fr_1fr] gap-12">
      <div className="glass-card p-10 space-y-8">
        <h3 className="text-2xl font-bold">Send me a message</h3>
        <form className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Email Address</label>
            <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Subject</label>
            <input type="text" placeholder="Project Collaboration" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Message</label>
            <textarea placeholder="Tell me about your project..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium resize-none" />
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white py-5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
            <span className="rotate-[-45deg]"><ArrowRight size={20} /></span> Send Message
          </button>
        </form>

        <div className="p-8 bg-white/5 rounded-2xl space-y-4 border border-white/10">
          <h4 className="font-bold">Let's create something amazing together!</h4>
          <p className="text-sm text-gray-400 leading-relaxed">Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.</p>
          <div className="space-y-3 pt-2">
            {[
              'Usually responds within 24 hours',
              'Available for remote collaboration',
              'Open to freelance and full-time opportunities',
              'Building high-performing websites & SEO strategies'
            ].map(benefit => (
              <div key={benefit} className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 size={16} className="text-emerald-500" /> {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 flex flex-col gap-6">
          <h3 className="text-xl font-bold">Get in touch</h3>
          {[
            { icon: <Mail />, label: 'Email', val: 'hello@razi.me' },
            { icon: <Phone />, label: 'Phone', val: '+91 8129489071' },
            { icon: <MapPin />, label: 'Location', val: 'Kerala, India' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                {item.icon}
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                <div className="font-bold text-sm">{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card overflow-hidden" style={{ borderColor: 'rgba(16,185,129,0.3)' }}>
          <div className="p-8 bg-[#10b981]/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center text-white">
                <MessageCircle size={28} />
              </div>
              <div>
                <h4 className="font-bold">WhatsApp Chat</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Online now</span>
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-md text-[10px] font-bold border border-amber-500/20">PREMIUM</div>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-3 gap-2">
              {['Instant Response', 'Secure Chat', '24/7 Available'].map(text => (
                <div key={text} className="flex items-center gap-1.5 text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">
                  <CheckCircle2 size={10} /> {text}
                </div>
              ))}
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
              <div className="absolute -left-1 top-4 w-2 h-2 bg-white/5 border-l border-t border-white/10 rotate-[-45deg]" />
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold">S</div>
                <div>
                  <div className="text-[10px] font-bold text-white mb-1">Bishr: <span className="font-normal text-gray-400">Hi! 👋 Thanks for reaching out. I'm excited to hear about your project and how I can help bring your ideas to life!</span></div>
                  <div className="text-[8px] text-gray-500 font-medium">Usually replies instantly</div>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/918129489071"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle size={20} /> Start WhatsApp Chat <ChevronRight size={18} />
            </a>
            <div className="flex justify-center gap-4 text-[8px] font-bold text-gray-500 uppercase">
              <span className="flex items-center gap-1"><MessageCircle size={10} /> Get instant replies</span>
              <span className="flex items-center gap-1"><MessageCircle size={10} /> Quick project quotes</span>
              <span className="flex items-center gap-1"><MessageCircle size={10} /> Free consultation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-6 text-center space-y-1">
            <div className="text-2xl font-bold">5 <span className="text-purple-500">★</span></div>
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Rating</div>
          </div>
          <div className="glass-card p-6 text-center space-y-1">
            <div className="text-2xl font-bold text-purple-400">24h</div>
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Response</div>
          </div>
        </div>

        <div className="glass-card p-4 flex justify-between items-center text-[10px] px-6">
          <div className="flex items-center gap-2 font-bold text-gray-400 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Available for new projects
          </div>
          <div className="text-gray-500 font-bold">2026</div>
        </div>
      </div>
    </div>
  </Section>
);

// --- App ---
export default function App() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Navbar />

      <main>
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <WorkSection />
        <BlogSection />
        <ContactSection />
      </main>

      <footer className="py-12 px-6 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-display font-bold">
            Bishr
          </div>
          <div className="text-gray-500 text-sm font-medium">
            © 2026 Bishr Portfolio. All rights reserved.
          </div>
          <div className="flex gap-6">
            <button onClick={() => scrollToSection('about')} className="text-gray-500 hover:text-white transition-colors text-sm">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-40 flex items-center gap-4">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-xs font-bold text-white shadow-2xl hidden sm:flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Need help? Let's Discuss!
        </div>
        <a
          href="https://wa.me/918129489071"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#10b981] hover:bg-[#059669] rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-110 active:scale-95 relative"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-[#030014] rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
          <MessageCircle size={28} />
        </a>
      </div>
    </div>
  );
}
