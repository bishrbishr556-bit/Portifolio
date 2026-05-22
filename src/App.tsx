/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Twitter, MessageCircle, ArrowRight, Download, Menu, X, Mail, Phone, MapPin, Globe, CheckCircle2, ChevronRight, Palette, Search, Megaphone, Terminal, Server, LayoutGrid } from 'lucide-react';
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
      const sections = ['home', 'about', 'services', 'skills', 'experience', 'featured', 'projects', 'work', 'design', 'articles', 'blog', 'contact'];
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
    { name: 'Experience', id: 'experience' },
    { name: 'Featured', id: 'featured' },
    { name: 'Projects', id: 'projects' },
    { name: 'Work', id: 'work' },
    { name: 'Design', id: 'design' },
    { name: 'Articles', id: 'articles' },
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
        { icon: <Terminal />, title: 'Web Development', desc: 'I build fast, responsive and modern websites using the latest technologies.' },
        { icon: <Globe />, title: 'E-Commerce Solutions', desc: 'I create powerful e-commerce stores that are secure, scalable and user-friendly.' },
        { icon: <Search />, title: 'SEO Optimization', desc: 'Improve your search rankings and drive organic traffic to your website effectively with proven SEO strategies.' },
        { icon: <Megaphone />, title: 'Digital Marketing', desc: 'Strategic marketing campaigns to grow your online presence and business reach through targeted digital channels.' },
        { icon: <Palette />, title: 'Graphic Design', desc: 'Creative visual solutions including branding, logos, and marketing materials for businesses.' },
        { icon: <Server />, title: 'Server Management', desc: 'Hosting and server management with dedicated hosting solutions for optimal performance.' },
        { icon: <LayoutGrid />, title: 'Mobile Friendly Design', desc: 'I design fully responsive websites that look perfect on all devices and screen sizes.' },
        { icon: <Palette />, title: 'UI/UX Design', desc: 'I design clean, user-friendly interfaces that deliver great experiences.' },
        { icon: <Globe />, title: 'Performance Optimization', desc: 'I optimize websites for speed, SEO and performance to ensure the best results.' },
        { icon: <MessageCircle />, title: 'Support & Maintenance', desc: 'I provide ongoing support and maintenance to keep your website running smoothly.' }
      ].map((service, idx) => (
        <div key={idx} className="glass-card p-10 group hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
              {service.icon}
            </div>
            <span className="text-3xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-4">{service.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
          <button className="flex items-center gap-2 text-xs font-bold group-hover:text-purple-400 transition-colors">
            Learn more <ChevronRight size={14} />
          </button>
        </div>
      ))}
    </div>

    <div className="mt-12 glass-card p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <CheckCircle2 size={20} className="text-purple-400" />, title: 'High Quality', desc: 'Top-notch quality with attention to detail.' },
          { icon: <ChevronRight size={20} className="text-purple-400" />, title: 'Fast Delivery', desc: 'On-time delivery without compromising quality.' },
          { icon: <Globe size={20} className="text-purple-400" />, title: 'Reliable Support', desc: '24/7 support to help you whenever you need.' },
          { icon: <CheckCircle2 size={20} className="text-purple-400" />, title: 'Client Satisfaction', desc: 'Your satisfaction is my top priority.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">{item.icon}</div>
            <div>
              <div className="font-bold text-sm text-white">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
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
const SkillsSection = () => {
  const professionalSkills = [
    {
      name: 'HTML', percent: 95,
      gradient: 'linear-gradient(90deg, #7c3aed, #f97316, #ef4444)',
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7"><path d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30z" fill="#e44d26"/><path d="M16 27.858l8.17-2.265 1.922-21.532H16z" fill="#f16529"/><path d="M16 13.407h-4.09l-.282-3.165H16V7.151H8.25l.074.83.759 8.517H16zm0 8.027l-.014.004-3.442-.929-.22-2.465H9.221l.433 4.852 6.332 1.758.014-.004z" fill="#ebebeb"/><path d="M15.989 13.407v3.091h3.806l-.358 4.009-3.448.93v3.216l6.337-1.757.046-.522.726-8.137.076-.83zm0-6.256v3.091h7.466l.062-.694.141-1.567.074-.83z" fill="#fff"/></svg>
      )
    },
    {
      name: 'CSS', percent: 90,
      gradient: 'linear-gradient(90deg, #7c3aed, #3b82f6, #1d4ed8)',
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7"><path d="M5.902 27.201L3.655 2h24.69l-2.25 25.197L15.985 30z" fill="#1572b6"/><path d="M16 27.858l8.17-2.265 1.922-21.532H16z" fill="#33a9dc"/><path d="M16 13.191h4.09l.282-3.165H16V6.935h7.75l-.074.83-.759 8.517H16zm0 8.027l-.014.004-3.442-.929-.22-2.465H9.221l.433 4.852 6.332 1.758.014-.004z" fill="#ebebeb"/><path d="M15.989 13.191v3.091h-3.806l-.358 4.009 3.448.93v3.216l-6.337-1.757-.046-.522-.726-8.137-.076-.83zm0-6.256v3.091H8.523l-.062-.694-.141-1.567-.074-.83z" fill="#fff"/></svg>
      )
    },
    {
      name: 'JavaScript', percent: 85,
      gradient: 'linear-gradient(90deg, #7c3aed, #ca8a04, #eab308)',
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7"><rect width="32" height="32" rx="4" fill="#f7df1e"/><path d="M20.809 23.875a2.866 2.866 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3 0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964 0-1.973 1.5-3.476 3.853-3.476a3.889 3.889 0 0 1 3.742 2.107l-2.048 1.315a1.789 1.789 0 0 0-1.694-1.128 1.149 1.149 0 0 0-1.262 1.128c0 .789.487 1.109 1.615 1.6l.658.282c2.236.959 3.5 1.938 3.5 4.138 0 2.371-1.862 3.668-4.362 3.668a5.059 5.059 0 0 1-4.776-2.686zm-9.295.228c.413.733.789 1.353 1.693 1.353.864 0 1.41-.338 1.41-1.653v-8.947h2.52v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.386z"/></svg>
      )
    },
    {
      name: 'React.js', percent: 80,
      gradient: 'linear-gradient(90deg, #7c3aed, #06b6d4, #0ea5e9)',
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7"><circle cx="16" cy="16" r="3" fill="#61dafb"/><path d="M16 8.5c4.8 0 9.2.9 12.3 2.4 3.6 1.7 5.7 4.1 5.7 5.1s-2.1 3.4-5.7 5.1C25.2 22.6 20.8 23.5 16 23.5s-9.2-.9-12.3-2.4C.1 19.4-2 17 -2 16s2.1-3.4 5.7-5.1C6.8 9.4 11.2 8.5 16 8.5z" fill="none" stroke="#61dafb" strokeWidth="1.5"/><path d="M10.8 12.25c2.4-4.2 5.3-7.3 7.7-8.8 2.8-1.7 5.3-1.7 6.1-.3s-.3 3.8-3.1 6.6c-2.1 2.1-4.9 4.1-8 5.8-3.1 1.7-6.2 2.9-8.8 3.3-3.2.5-5.5-.1-6.3-1.5s.3-3.8 3.1-6.6" fill="none" stroke="#61dafb" strokeWidth="1.5"/><path d="M10.8 19.75c-2.4-4.2-3.7-8.5-3.7-11.75 0-3.2 1.3-5.3 2.9-5.3s3.5 2.1 5.1 5.7c1.2 2.7 2.1 6.1 2.1 9.6s-.9 6.9-2.1 9.6c-1.6 3.6-3.5 5.7-5.1 5.7s-2.9-2.1-2.9-5.3c0-1.1.2-2.4.5-3.7" fill="none" stroke="#61dafb" strokeWidth="1.5"/></svg>
      )
    },
    {
      name: 'Node.js', percent: 75,
      gradient: 'linear-gradient(90deg, #7c3aed, #4ade80, #16a34a)',
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7"><path d="M16 3L3 10.5v15L16 33l13-7.5v-15z" fill="#339933"/><path d="M16 7.5L7 12.75v10.5L16 28.5l9-5.25v-10.5z" fill="#fff" opacity=".1"/><path d="M16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#fff"/></svg>
      )
    },
    {
      name: 'MongoDB', percent: 70,
      gradient: 'linear-gradient(90deg, #7c3aed, #4ade80, #15803d)',
      logo: (
        <svg viewBox="0 0 32 32" className="w-7 h-7"><path d="M16.054 2S9.5 8.103 9.5 16.234c0 3.668 1.458 6.979 3.817 9.4l.906.535v3.831h3.664v-3.831l.906-.535A13.23 13.23 0 0 0 22.5 16.234C22.5 8.103 16.054 2 16.054 2z" fill="#599636"/><path d="M16.054 2v27.999h1.832v-3.831l.906-.535A13.23 13.23 0 0 0 22.5 16.234C22.5 8.103 16.054 2 16.054 2z" fill="#6cac48"/><path d="M16.054 25.5s-.5-2-.5-4.5c0-1.5.5-3 .5-3s.5 1.5.5 3c0 2.5-.5 4.5-.5 4.5z" fill="#c2bfbf"/></svg>
      )
    },
  ];

  const otherSkills = [
    {
      name: 'Git & GitHub',
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      logo: (
        <svg viewBox="0 0 54 33" className="w-8 h-5">
          <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#38BDF8"/>
        </svg>
      )
    },
    {
      name: 'Bootstrap',
      logo: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <rect width="128" height="128" rx="24" fill="#7952B3"/>
          <path d="M46.9 109.3H24.2V18.7h24.4c7.2 0 13.1 1.6 17.7 4.8 4.6 3.2 6.9 7.8 6.9 13.8 0 3.6-.9 6.8-2.8 9.5-1.9 2.7-4.5 4.7-7.9 6.1v.4c4.4.9 7.9 3 10.4 6.2 2.5 3.2 3.8 7.1 3.8 11.7 0 6.6-2.4 11.8-7.3 15.6-4.8 3.7-11.4 5.5-19.5 5.5zm-9.7-52.6h10.4c4.1 0 7.2-.9 9.3-2.6 2.1-1.7 3.2-4.2 3.2-7.5 0-3.1-1-5.4-3-7-2-1.6-5-2.4-9-2.4H37.2v19.5zm0 11.5v22.3h11.8c4.3 0 7.6-1 9.8-2.9 2.2-1.9 3.3-4.7 3.3-8.3 0-3.7-1.1-6.5-3.4-8.4-2.3-1.9-5.7-2.8-10.3-2.8H37.2z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Figma',
      logo: (
        <svg viewBox="0 0 38 57" className="w-6 h-8">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
        </svg>
      )
    },
    {
      name: 'VS Code',
      logo: (
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <mask id="vsc-mask">
            <path fill="white" d="M70.9 3.8L37.1 34.4 15.2 18.1 5 23.5v53l10.2 5.4 22-16.3 33.8 30.6L95 89.6V10.4L70.9 3.8zm.1 66.6L45.7 50l25.3-20.4v40.8z"/>
          </mask>
          <path d="M95 10.4L70.9 3.8 37.1 34.4 15.2 18.1 5 23.5v53l10.2 5.4 22-16.3 33.8 30.6L95 89.6V10.4z" fill="#007ACC" mask="url(#vsc-mask)"/>
          <path d="M95 10.4L70.9 3.8v92.4L95 89.6V10.4z" fill="#007ACC"/>
          <path d="M5 23.5l10.2-5.4v58.8L5 71.5V23.5z" fill="#007ACC" opacity=".5"/>
          <path d="M71 70.4L45.7 50 71 29.6v40.8z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Firebase',
      logo: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <path d="M19.62 11.558l-3.203 2.98-2.972-5.995 1.538-3.448c.4-.7 1.024-.692 1.414 0z" fill="#FFA000"/>
          <path d="M13.445 8.543l2.972 5.995-11.97 11.135z" fill="#F57F17"/>
          <path d="M23.123 7.003c.572-.55 1.164-.362 1.315.417l3.116 18.105-10.328 6.2c-.36.2-1.32.286-1.32.286s-.874-.104-1.207-.3L4.447 25.673z" fill="#FFCA28"/>
          <path d="M13.445 8.543L4.447 25.673 8.868 5.995c.148-.78.592-.855.988-.167z" fill="#FFA000"/>
        </svg>
      )
    },
    {
      name: 'Netlify',
      logo: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <path d="M46.6 55.3l-.2-.1-9.5-9.5 9.7-9.7.2.1 9.3 9.3-9.5 9.9zm-12.1-9.6l9.5 9.5-9.5 9.5-9.5-9.5 9.5-9.5z" fill="#05BDBA"/>
          <path d="M128 64c0 35.3-28.7 64-64 64S0 99.3 0 64 28.7 0 64 0s64 28.7 64 64z" fill="#05BDBA" opacity=".15"/>
          <path d="M91.4 55.3H73.7l-9.5-9.5 9.5-9.5h17.7l9.5 9.5-9.5 9.5zm-55.1 0H18.6l-9.5-9.5 9.5-9.5h17.7l9.5 9.5-9.5 9.5z" fill="#05BDBA"/>
          <path d="M64.2 82.5l-9.5-9.5 9.5-9.5 9.5 9.5-9.5 9.5zm0-36.7l-9.5-9.5 9.5-9.5 9.5 9.5-9.5 9.5z" fill="#05BDBA"/>
        </svg>
      )
    },
    {
      name: 'Postman',
      logo: (
        <svg viewBox="0 0 32 32" className="w-8 h-8">
          <circle cx="16" cy="16" r="16" fill="#FF6C37"/>
          <path d="M22.1 9.9a8.6 8.6 0 0 0-12.2 12.2L22.1 9.9z" fill="white" opacity=".9"/>
          <path d="M9.9 22.1a8.6 8.6 0 0 0 12.2-12.2L9.9 22.1z" fill="white" opacity=".6"/>
          <circle cx="16" cy="16" r="3" fill="white"/>
        </svg>
      )
    },
  ];

  const softSkills = [
    { name: 'Problem Solving', emoji: '💡' },
    { name: 'Communication', emoji: '💬' },
    { name: 'Teamwork', emoji: '🤝' },
    { name: 'Time Management', emoji: '⏰' },
    { name: 'Creativity', emoji: '✏️' },
  ];

  const stats = [
    {
      val: '2+', label: 'Years Experience',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bg: 'bg-amber-500/20'
    },
    {
      val: '20+', label: 'Projects Completed',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
      bg: 'bg-blue-500/20'
    },
    {
      val: '15+', label: 'Happy Clients',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5"/>
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5"/>
        </svg>
      ),
      bg: 'bg-yellow-500/20'
    },
    {
      val: '100%', label: 'Dedication',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#f43f5e" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="#f43f5e"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      bg: 'bg-rose-500/20'
    },
  ];

  return (
  <Section id="skills">
    {/* Header */}
    <div className="text-center space-y-4 mb-16">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-purple-400">
        <Terminal size={14} /> SKILLS
      </div>
      <h2 className="text-5xl font-display font-bold">My Skills & <span className="text-purple-500">Expertise</span></h2>
      <p className="text-gray-400 max-w-xl mx-auto">
        I combine creativity, technical expertise and problem-solving to deliver high-quality digital solutions.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* Professional Skills */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Terminal size={18} />
          </div>
          <div>
            <div className="font-bold text-white">Professional Skills</div>
            <div className="text-xs text-gray-500">Technologies and tools I work with</div>
          </div>
        </div>

        <div className="space-y-5">
          {professionalSkills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center">{skill.logo}</div>
                  <span className="text-sm font-semibold text-white">{skill.name}</span>
                </div>
                <span className="text-sm font-bold text-purple-400">{skill.percent}%</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: skill.gradient }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        {/* Other Skills */}
        <div className="glass-card p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="font-bold text-white">Other Skills</div>
              <div className="text-xs text-gray-500">Tools and technologies I use to bring ideas to life</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {otherSkills.map(s => (
              <div key={s.name} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all cursor-default">
                <div className="flex items-center justify-center w-10 h-10">{s.logo}</div>
                <span className="text-[10px] font-bold text-gray-400 text-center leading-tight">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="glass-card p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Globe size={18} />
            </div>
            <div>
              <div className="font-bold text-white">Soft Skills</div>
              <div className="text-xs text-gray-500">Abilities that help me work effectively</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {softSkills.map(s => (
              <div key={s.name} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-purple-500/30 transition-all">
                <span className="text-base">{s.emoji}</span>
                <span className="text-xs font-semibold text-gray-300">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Stats bar */}
    <div className="glass-card p-8 border-purple-500/20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>{s.icon}</div>
            <div>
              <div className="text-2xl font-bold text-white">{s.val}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
  );
};

// --- Experience Section ---
const ExperienceSection = () => {
  const experiences = [
    {
      period: '2023 – Present',
      role: 'Web Developer',
      company: 'Freelance / Self-Employed',
      desc: 'Working on web development projects and building modern web applications for clients worldwide.',
      active: true,
    },
    {
      period: '2022 – 2023',
      role: 'Frontend Developer',
      company: 'CodeCraft',
      desc: 'Developed responsive websites and improved UI/UX for clients across various industries.',
      active: false,
    },
    {
      period: '2021 – 2022',
      role: 'Junior Developer',
      company: 'Webify',
      desc: 'Assisted in building websites and learning modern technologies including React and Node.js.',
      active: false,
    },
  ];

  return (
    <Section id="experience">
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Experience Timeline Card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/8 p-8"
          style={{ background: 'linear-gradient(135deg, #0d0d1f 0%, #0a0a18 100%)' }}>

          {/* Purple glow orb top-right */}
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
            <div className="absolute top-4 right-4 w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)' }} />
            <div className="absolute top-8 right-8 w-28 h-28 rounded-full border border-purple-500/20"
              style={{ boxShadow: '0 0 40px rgba(139,92,246,0.3), inset 0 0 40px rgba(139,92,246,0.1)' }} />
            <div className="absolute top-12 right-12 w-16 h-16 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.8) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)', boxShadow: '0 0 30px rgba(167,139,250,0.6)' }} />
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-white">My Experience</h2>
          </div>

          {/* Timeline */}
          <div className="relative z-10 space-y-0">
            {experiences.map((exp, idx) => (
              <div key={idx} className="flex gap-5">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${exp.active ? 'bg-purple-500 shadow-lg shadow-purple-500/50' : 'bg-purple-500/40'}`} />
                  {idx < experiences.length - 1 && (
                    <div className="w-px flex-1 bg-purple-500/20 my-1" style={{ minHeight: '60px' }} />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-8 ${idx === experiences.length - 1 ? 'pb-0' : ''}`}>
                  <div className="text-xs text-gray-500 font-medium mb-1">{exp.period}</div>
                  <div className="font-bold text-white text-sm">{exp.role}</div>
                  <div className="text-purple-400 text-xs font-medium mb-1">{exp.company}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">{exp.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 p-8 flex flex-col justify-between"
          style={{ background: 'linear-gradient(135deg, #0d0a1f 0%, #0a0818 100%)', minHeight: '320px' }}>

          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
            ))}
          </div>

          {/* Astronaut illustration (right side) */}
          <div className="absolute right-0 bottom-0 w-48 h-48 pointer-events-none opacity-80">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Simple astronaut silhouette */}
              <circle cx="120" cy="60" r="28" fill="#7c3aed" opacity="0.9"/>
              <circle cx="120" cy="60" r="22" fill="#1e1b4b"/>
              <ellipse cx="120" cy="60" rx="14" ry="12" fill="#312e81" opacity="0.8"/>
              <rect x="96" y="85" width="48" height="55" rx="12" fill="#7c3aed" opacity="0.85"/>
              <rect x="104" y="95" width="32" height="20" rx="4" fill="#4c1d95" opacity="0.9"/>
              <rect x="78" y="90" width="18" height="40" rx="9" fill="#7c3aed" opacity="0.8"/>
              <rect x="144" y="90" width="18" height="40" rx="9" fill="#7c3aed" opacity="0.8"/>
              <rect x="100" y="138" width="16" height="38" rx="8" fill="#6d28d9" opacity="0.85"/>
              <rect x="124" y="138" width="16" height="38" rx="8" fill="#6d28d9" opacity="0.85"/>
              <circle cx="155" cy="165" r="14" fill="#4c1d95" opacity="0.7"/>
              {/* Visor shine */}
              <ellipse cx="115" cy="55" rx="6" ry="5" fill="white" opacity="0.15"/>
              {/* Glow */}
              <circle cx="120" cy="60" r="32" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.3"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 max-w-xs">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
              Let's Build Something Amazing Together!
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              I'm always open to discussing new projects and creative ideas.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-600/30"
            >
              Let's Talk
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

// --- Featured Projects Section ---
const FeaturedSection = () => {
  const featured = [
    {
      title: 'Ai Islam',
      desc: 'An intelligent AI-powered platform for the Muslim community with Quran tafsir, Hadith search, and spiritual guidance.',
      img: '/aiislam.jpg',
      tag: 'AI Platform',
      tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
      link: 'https://aiislam.vercel.app/',
    },
    {
      title: 'Ai Usthad',
      desc: 'Your Islamic AI Teacher — Knowledge, Guidance, and Wisdom powered by advanced AI models.',
      img: '/aiusthad.jpg',
      tag: 'Web App',
      tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
      link: 'https://aiusthad.vercel.app/',
    },
    {
      title: 'Exam Management Portal',
      desc: 'A full-featured exam management system with candidate tracking, timetables, hall tickets, and results.',
      img: '/exam-portal.jpg',
      tag: 'Web Application',
      tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
      link: '#',
    },
    {
      title: 'E-Commerce Platform',
      desc: 'Al Hayba — a modern full-featured e-commerce platform for a clothing brand with secure checkout.',
      img: '/alhayba.jpg',
      tag: 'E-Commerce',
      tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/20',
      link: '#',
    },
    {
      title: 'Stream Now App',
      desc: 'A cross-platform free live TV streaming app with 1000+ channels available on iOS & Android.',
      img: '/streamnow.jpg',
      tag: 'Mobile App',
      tagColor: 'bg-rose-500/20 text-rose-400 border-rose-500/20',
      link: '#',
    },
    {
      title: 'Campus Website',
      desc: 'A responsive and mobile-friendly campus website for Greenfield Institute of Technology.',
      img: '/campus.jpg',
      tag: 'Website',
      tagColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/20',
      link: '#',
    },
  ];

  return (
    <Section id="featured">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Featured Projects</h2>
        </div>
        <button
          onClick={() => scrollToSection('projects')}
          className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/40 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
        >
          View All Projects <ChevronRight size={16} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-1"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={proj.img}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 to-transparent" />
              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${proj.tagColor}`}>
                  {proj.tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{proj.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{proj.desc}</p>
              <a
                href={proj.link}
                target={proj.link !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={proj.link === '#' ? (e) => { e.preventDefault(); scrollToSection('work'); } : undefined}
                className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-sm font-bold transition-colors group/link"
              >
                View Project
                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile view all button */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button
          onClick={() => scrollToSection('projects')}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all"
        >
          View All Projects <ChevronRight size={16} />
        </button>
      </div>
    </Section>
  );
};

// --- Projects Section ---
const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'React Native', 'Next.js', 'Node.js', 'MongoDB', 'OpenAI', 'E-Commerce', 'SEO-Optimized', 'Responsive', 'AI Chat'];

  const projects = [
    {
      title: 'Ai Islam',
      desc: 'An intelligent AI-powered platform built for the Muslim community, offering Islamic knowledge, Quran tafsir, Hadith search, prayer guidance, and personalized spiritual assistance — all powered by advanced AI models.',
      tags: ['React Native', 'Next.js', 'Node.js', 'OpenAI', 'MongoDB', 'Cross-Platform'],
      img: '/aiislam.jpg',
      liveDemo: 'https://aiislam.vercel.app/'
    },
    {
      title: 'Ai Usthad',
      desc: 'PlantBox is a complete e-commerce platform that allows users to buy and sell plants online. It features a user-friendly interface, secure payment integration, and a wide range of plant products.',
      tags: ['E-Commerce', 'Razorpay', 'Online Shopping', 'Wordpress'],
      img: '/aiusthad.jpg',
      liveDemo: 'https://aiusthad.vercel.app/'
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
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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

// --- AI Islam Showcase Section ---
const AiIslamSection = () => (
  <section id="ai-islam" className="relative overflow-hidden py-32 px-6">
    {/* Cinematic background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#020c10] via-[#030d14] to-[#020a0e]" />

    {/* Animated glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px]" />

    {/* Islamic geometric pattern overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='1'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0zm0 40l8.66 5v10L30 60l-8.66-5V45L30 40zM0 20l8.66 5v10L0 40l-8.66-5V25L0 20zm60 0l8.66 5v10L60 40l-8.66-5V25L60 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }} />

    {/* Mosque silhouette at bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5 flex items-end justify-center overflow-hidden">
      <svg viewBox="0 0 1200 200" className="w-full" fill="currentColor">
        <path className="text-cyan-400" d="M0,200 L0,120 L100,120 L100,80 L150,80 L150,40 L175,20 L175,0 L185,0 L185,20 L210,40 L210,80 L260,80 L260,120 L400,120 L400,80 L450,80 L450,40 L500,10 L550,40 L550,80 L600,80 L600,40 L650,10 L700,40 L700,80 L750,80 L750,120 L900,120 L900,80 L950,80 L950,40 L975,20 L975,0 L985,0 L985,20 L1010,40 L1010,80 L1060,80 L1060,120 L1200,120 L1200,200 Z" fill="#06b6d4"/>
      </svg>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 rounded-full">
            <span className="text-lg">☪️</span>
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Technology for Deen</span>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-6xl md:text-7xl font-display font-bold leading-none">
              <span className="shimmer-text">AI Islam</span>
            </h2>
            <p className="text-cyan-400/60 text-lg font-medium tracking-wide">Technology for Deen, Benefit for Ummah</p>
          </div>

          {/* Arabic quote */}
          <div className="border-l-2 border-cyan-500/40 pl-5 space-y-1">
            <p className="text-2xl text-cyan-300/80 font-light" dir="rtl">خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ</p>
            <p className="text-gray-500 text-sm italic">The best of people are those most beneficial to people. (Hadith)</p>
          </div>

          {/* Feature pills */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📖', label: 'Quran Understanding' },
              { icon: '🎓', label: 'Islamic Education' },
              { icon: '🤲', label: 'Dawah & Guidance' },
              { icon: '🌐', label: 'Ummah Connect' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-3 bg-white/5 border border-cyan-500/10 rounded-xl px-4 py-3 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300">
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm font-semibold text-gray-300">{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://aiislam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 glow-cyan"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)' }}
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="text-lg">🚀</span>
              <span>Live Demo</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-cyan-400 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 hover:scale-105">
              <span>Learn More</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-2">
            {[
              { val: '10K+', label: 'Users' },
              { val: '50+', label: 'Features' },
              { val: '4.9★', label: 'Rating' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-cyan-400">{s.val}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual card */}
        <div className="relative float-anim">
          {/* Outer glow ring */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/10 to-cyan-500/20 blur-2xl" />

          {/* Rotating geometric ring */}
          <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full rounded-full border border-cyan-500/10 spin-slow" />
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-[#041a20] to-[#020d10]"
            style={{ boxShadow: '0 0 60px rgba(6,182,212,0.15), inset 0 0 60px rgba(6,182,212,0.05)' }}>

            {/* Image */}
            <img
              src="/aiislam.jpg"
              alt="AI Islam"
              className="w-full object-cover"
              style={{ minHeight: '400px' }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020c10]/80 via-transparent to-transparent" />

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live & Active</span>
                </div>
                <span className="text-xs text-gray-500">aiislam.vercel.app</span>
              </div>
              <a
                href="https://aiislam.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-black transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)', boxShadow: '0 0 20px rgba(6,182,212,0.4)' }}
              >
                🚀 Launch AI Islam
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- AI Usthad Showcase Section ---
const AiUsthadSection = () => (
  <section id="ai-usthad" className="relative overflow-hidden py-32 px-6">
    {/* Cinematic background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#020810] via-[#030a18] to-[#020810]" />

    {/* Animated glow orbs */}
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />

    {/* Islamic geometric pattern overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Cpath d='M40 10 L50 25 L40 40 L30 25 Z M40 70 L50 55 L40 40 L30 55 Z M10 40 L25 30 L40 40 L25 50 Z M70 40 L55 30 L40 40 L55 50 Z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '80px 80px'
    }} />

    {/* Mosque silhouette */}
    <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5 flex items-end justify-center overflow-hidden">
      <svg viewBox="0 0 1200 200" className="w-full" fill="#3b82f6">
        <path d="M0,200 L0,130 L80,130 L80,90 L120,90 L120,50 L140,30 L140,10 L150,0 L160,10 L160,30 L180,50 L180,90 L220,90 L220,130 L350,130 L350,90 L420,90 L420,50 L480,10 L540,50 L540,90 L580,90 L580,50 L600,20 L620,50 L620,90 L660,90 L660,50 L720,10 L780,50 L780,90 L820,90 L820,130 L950,130 L950,90 L990,90 L990,50 L1010,30 L1010,10 L1020,0 L1030,10 L1030,30 L1050,50 L1050,90 L1090,90 L1090,130 L1200,130 L1200,200 Z"/>
      </svg>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — Visual card (reversed order) */}
        <div className="relative float-anim order-2 lg:order-1" style={{ animationDelay: '0.5s' }}>
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-emerald-500/10 to-blue-500/20 blur-2xl" />
          <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full rounded-full border border-blue-500/10 spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-[#040d1a] to-[#020810]"
            style={{ boxShadow: '0 0 60px rgba(59,130,246,0.15), inset 0 0 60px rgba(59,130,246,0.05)' }}>

            <img
              src="/aiusthad.jpg"
              alt="AI Usthad"
              className="w-full object-cover"
              style={{ minHeight: '400px' }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Live & Active</span>
                </div>
                <span className="text-xs text-gray-500">aiusthad.vercel.app</span>
              </div>
              <a
                href="https://aiusthad.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #10b981)', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}
              >
                🚀 Launch AI Usthad
              </a>
            </div>
          </div>
        </div>

        {/* Right — Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-5 py-2 rounded-full">
            <span className="text-lg">🕌</span>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Your Islamic AI Teacher</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-6xl md:text-7xl font-display font-bold leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400">AI Usthad</span>
            </h2>
            <p className="text-blue-400/60 text-lg font-medium tracking-wide">Knowledge. Guidance. Wisdom.</p>
          </div>

          <div className="border-l-2 border-blue-500/40 pl-5 space-y-1">
            <p className="text-2xl text-blue-300/80 font-light" dir="rtl">الْعِلْمُ نُورٌ وَالْهِدَايَةُ رَحْمَةٌ</p>
            <p className="text-gray-500 text-sm italic">Knowledge is light and guidance is mercy.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📚', label: 'Islamic Knowledge' },
              { icon: '🧑‍🏫', label: 'Personal Guidance' },
              { icon: '💬', label: 'Clear Explanations' },
              { icon: '💚', label: 'Spiritual Growth' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-3 bg-white/5 border border-blue-500/10 rounded-xl px-4 py-3 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm font-semibold text-gray-300">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://aiusthad.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #10b981)',
                boxShadow: '0 0 25px rgba(59,130,246,0.4), 0 0 50px rgba(59,130,246,0.2)'
              }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="text-lg">🚀</span>
              <span>Live Demo</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-blue-400 border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/60 transition-all duration-300 hover:scale-105">
              <span>Learn More</span>
            </button>
          </div>

          <div className="flex gap-8 pt-2">
            {[
              { val: '5K+', label: 'Students' },
              { val: '100+', label: 'Topics' },
              { val: '4.8★', label: 'Rating' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-blue-400">{s.val}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);


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
      title: 'My Projects Showcase',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'A responsive projects showcase website featuring analytics dashboard, e-commerce, business website, mobile app, travel guide, and personal portfolio.',
      img: '/myprojects.jpg',
    },
    {
      title: 'Exam Management Portal',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Exam Management Portal | Custom Application Development',
      img: '/exam-portal.jpg',
    },
    {
      title: 'Mileage Calculator Pro | App Available on iOS & Android',
      category: 'Mobile / Cross-Platform Application',
      tags: ['MOBILE / CROSS - PLATFORM APPLICATION'],
      desc: 'Mileage Calculator Pro | App Available on iOS & Android by MyRace',
      img: '/mileage.jpg',
    },
    {
      title: 'Kareemgraphy Wikipedia Profile Page',
      category: 'Wikipedia',
      tags: ['WIKIPEDIA'],
      desc: 'This project documents my contribution to Wikipedia through the creation and structured development of the...',
      img: '/wikipedia.jpg',
    },
    {
      title: 'Branding Kit for Pharmacy | Logo Design',
      category: 'Branding / Logo',
      tags: ['BRANDING / LOGO'],
      desc: 'Branding Kit for the YAS Pharmacy | Logo Design',
      img: '/pharmacy-branding.jpg',
    },
    {
      title: 'Website Design | Modern UI/UX for Laundry Service',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'A beautiful website design for Laundry Day to elevate their digital presence and customer...',
      img: '/laundry.jpg',
    },
    {
      title: 'Stream Now - Free Live TV Streaming App',
      category: 'Mobile / Cross-Platform Application',
      tags: ['MOBILE / CROSS - PLATFORM APPLICATION'],
      desc: 'A cross-platform application built for streaming live TV for unlimited language channels and other...',
      img: '/streamnow.jpg',
    },
    {
      title: 'E-Commerce Platform for Al Hayba Clothing Brand',
      category: 'E-Commerce',
      tags: ['E-COMMERCE'],
      desc: 'A modern, full-featured e-commerce platform built with Laravel 12',
      img: '/alhayba.jpg',
    },
    {
      title: 'Responsive Website Design',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Responsive Website Design for the NID Atelier LLC',
      img: '/responsive-web.jpg',
    },
    {
      title: 'Responsive & Mobile Friendly Campus Website',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Responsive & Mobile Friendly Campus Website',
      img: '/campus.jpg',
    },
    {
      title: 'Social Media Design for College Tour',
      category: 'Graphic Design',
      tags: ['GRAPHIC DESIGN'],
      desc: 'Social Media Design for College Tour',
      img: '/college-tour.jpg',
    },
    {
      title: 'Responsive Website | UI/UX',
      category: 'Web Design & Development',
      tags: ['WEB DESIGN & DEVELOPMENT'],
      desc: 'Responsive Website | UI/UX',
      img: '/responsive-uiux.jpg',
    },
    {
      title: 'Newspaper Ads Design',
      category: 'Brochure / Print Design',
      tags: ['BROCHURE / PRINT DESIGN'],
      desc: 'Newspaper Ads Design',
      img: '/newspaper-ads.jpg',
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

// --- Design Work Section ---
const DesignWorkSection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const designs = [
    { img: '/design1.jpg', title: 'Porsche 911 GT3 RS', category: 'Automotive Design', desc: 'Precision engineered promotional poster for the Porsche 911 GT3 RS Manthey Concept — Track Bred. Limitless.' },
    { img: '/design2.jpg', title: 'Design Work 2', category: 'Graphic Design', desc: 'Creative graphic design work showcasing visual identity and branding.' },
    { img: '/design3.jpg', title: 'Design Work 3', category: 'Branding', desc: 'Brand identity and visual design project.' },
    { img: '/design4.jpg', title: 'Design Work 4', category: 'Poster Design', desc: 'Cinematic poster design with premium visual aesthetics.' },
    { img: '/design5.jpg', title: 'Design Work 5', category: 'Digital Art', desc: 'Digital artwork and creative illustration.' },
    { img: '/design6.jpg', title: 'Design Work 6', category: 'UI Design', desc: 'Modern UI design with clean aesthetics.' },
    { img: '/design7.jpg', title: 'Design Work 7', category: 'Graphic Design', desc: 'Creative visual design with bold typography and composition.' },
    { img: '/design8.jpg', title: 'Design Work 8', category: 'Poster Design', desc: 'Premium poster design with cinematic visual storytelling.' },
    { img: '/design9.jpg', title: 'Design Work 9', category: 'Branding', desc: 'Brand identity design with modern aesthetics and clean visuals.' },
    { img: '/design10.jpg', title: 'Design Work 10', category: 'Digital Art', desc: 'Digital artwork combining creativity and technical precision.' },
  ];

  return (
    <Section id="design">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-purple-400">
            <Palette size={12} /> DESIGN WORK
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Creative <span className="text-purple-500">Designs</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md">A collection of graphic design, branding, and visual art projects crafted with precision and passion.</p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {designs.map((d, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-purple-500/50 transition-all duration-500"
            onClick={() => setSelected(d.img)}
          >
            <img
              src={d.img}
              alt={d.title}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">{d.category}</span>
              <h3 className="text-white font-bold text-sm">{d.title}</h3>
              <p className="text-gray-300 text-xs mt-1 line-clamp-2">{d.desc}</p>
              <div className="mt-3 flex items-center gap-1.5 text-purple-400 text-xs font-bold">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                View Full
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <img src={selected} alt="Design" className="w-full h-full object-contain rounded-2xl" />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </Section>
  );
};

// --- Latest Articles Section ---
const LatestArticlesSection = () => {
  const articles = [
    {
      category: 'Web Development',
      categoryColor: 'text-purple-400',
      title: '10 Tips to Improve Your Web Development Skills',
      date: 'May 10, 2024',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop',
      imgDark: true,
    },
    {
      category: 'UI/UX Design',
      categoryColor: 'text-purple-400',
      title: 'Best UI/UX Design Principles for 2024',
      date: 'Apr 28, 2024',
      readTime: '6 min read',
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
      imgDark: true,
    },
    {
      category: 'Tools',
      categoryColor: 'text-purple-400',
      title: 'Top 5 Tools Every Developer Should Use',
      date: 'Apr 15, 2024',
      readTime: '4 min read',
      img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop',
      imgDark: true,
    },
  ];

  return (
    <Section id="articles">
      {/* Outer container matching design */}
      <div className="bg-white/3 border border-white/8 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Latest Articles</h2>
          </div>
          <button
            onClick={() => scrollToSection('blog')}
            className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/40 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          >
            View All Articles <ChevronRight size={16} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group rounded-xl overflow-hidden border border-white/8 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              onClick={() => scrollToSection('blog')}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '180px' }}>
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1f]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <span className={`text-xs font-bold ${article.categoryColor}`}>{article.category}</span>
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile button */}
        <div className="mt-6 flex justify-center sm:hidden">
          <button
            onClick={() => scrollToSection('blog')}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all"
          >
            View All Articles <ChevronRight size={16} />
          </button>
        </div>
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
const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    messages.unshift({ ...form, id: Date.now(), date: new Date().toLocaleString(), read: false });
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
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
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Full Name</label>
            <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Email Address</label>
            <input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Subject</label>
            <input type="text" placeholder="Project Collaboration" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Message</label>
            <textarea placeholder="Tell me about your project..." rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-purple-500/50 transition-all font-medium resize-none" />
          </div>
          {sent && (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-4 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 size={18} /> Message sent successfully!
            </div>
          )}
          <button type="submit" className="flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white py-5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
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
};

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
        <ExperienceSection />
        <FeaturedSection />
        <ProjectsSection />
        <AiIslamSection />
        <AiUsthadSection />
        <WorkSection />
        <DesignWorkSection />
        <LatestArticlesSection />
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
