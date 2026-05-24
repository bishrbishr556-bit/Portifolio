/**
 * Portfolio CMS Store
 * All portfolio content is stored here and synced between admin panel and portfolio.
 */

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    description: string;
    availableForWork: boolean;
    resumeUrl: string;
    profileImage: string;
    tags: string[];
    socials: { github: string; linkedin: string; instagram: string; twitter: string };
  };
  about: {
    bio1: string;
    bio2: string;
    location: string;
    experience: string;
    projectsCount: string;
    clientsCount: string;
    skills: string[];
    profileImage: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    whatsapp: string;
  };
  projects: {
    id: number;
    title: string;
    desc: string;
    tags: string[];
    img: string;
    liveDemo: string;
  }[];
  services: {
    title: string;
    desc: string;
  }[];
  blog: {
    id: number;
    category: string;
    date: string;
    readTime: string;
    title: string;
    desc: string;
    img: string;
    tags: string[];
  }[];
  workItems: {
    title: string;
    category: string;
    tags: string[];
    desc: string;
    img: string;
  }[];
  designs: {
    img: string;
    title: string;
    category: string;
  }[];
  siteSettings: {
    siteTitle: string;
    favicon: string;
    metaDescription: string;
    primaryColor: string;
    footerText: string;
  };
}

const STORAGE_KEY = 'portfolio_cms_data';

export const defaultData: PortfolioData = {
  hero: {
    name: 'Bishr',
    title: 'Web Designer & Developer',
    subtitle: 'Available for freelance work',
    description: 'Expert in creating stunning digital experiences through E-Commerce solutions, SEO optimization, and digital marketing strategies. Transforming ideas into powerful, results-driven websites.',
    availableForWork: true,
    resumeUrl: '#',
    profileImage: '/profile.jpg',
    tags: ['Web Development', 'Graphic Design', 'Digital Marketing'],
    socials: { github: 'https://github.com/bishrbishr556-bit', linkedin: 'https://www.linkedin.com/in/bishr-mhd-62a422411/', instagram: 'https://www.instagram.com/', pinterest: 'https://in.pinterest.com/PixeloraX/' },
  },
  about: {
    bio1: "I'm Bishr, expert Web Designer & Developer in Malappuram, Kerala with over 1 year of experience in creating digital experiences that drive business results.",
    bio2: 'I believe in creating websites that not only look stunning but also convert visitors into customers.',
    location: 'Malappuram, Kerala',
    experience: '1',
    projectsCount: '20+',
    clientsCount: '30+',
    skills: ['Web Design', 'Web Development', 'E-Commerce Development', 'SEO Optimization', 'Digital Marketing', 'Mobile App Dev'],
    profileImage: '/profile.jpg',
  },
  contact: {
    email: 'hello@bishr.me',
    phone: '+91 8129489071',
    location: 'Kerala, India',
    whatsapp: '918129489071',
  },
  projects: [
    { id: 1, title: 'Ai Islam', desc: 'An intelligent AI-powered platform built for the Muslim community, offering Islamic knowledge, Quran tafsir, Hadith search, prayer guidance, and personalized spiritual assistance.', tags: ['React Native', 'Next.js', 'Node.js', 'OpenAI', 'MongoDB', 'Cross-Platform'], img: '/aiislam.jpg', liveDemo: 'https://aiislam.vercel.app/' },
    { id: 2, title: 'Ai Usthad', desc: 'Your Islamic AI Teacher — Knowledge, Guidance, and Wisdom powered by advanced AI models.', tags: ['E-Commerce', 'Razorpay', 'Online Shopping', 'Wordpress'], img: '/aiusthad.jpg', liveDemo: 'https://aiusthad.vercel.app/' },
  ],
  services: [
    { title: 'Web Development', desc: 'I build fast, responsive and modern websites using the latest technologies.' },
    { title: 'E-Commerce Solutions', desc: 'I create powerful e-commerce stores that are secure, scalable and user-friendly.' },
    { title: 'SEO Optimization', desc: 'Improve your search rankings and drive organic traffic with proven SEO strategies.' },
    { title: 'Digital Marketing', desc: 'Strategic marketing campaigns to grow your online presence and business reach.' },
    { title: 'Graphic Design', desc: 'Creative visual solutions including branding, logos, and marketing materials.' },
    { title: 'Server Management', desc: 'Hosting and server management with dedicated hosting solutions for optimal performance.' },
    { title: 'Mobile Friendly Design', desc: 'I design fully responsive websites that look perfect on all devices and screen sizes.' },
    { title: 'UI/UX Design', desc: 'I design clean, user-friendly interfaces that deliver great experiences.' },
    { title: 'Performance Optimization', desc: 'I optimize websites for speed, SEO and performance to ensure the best results.' },
    { title: 'Support & Maintenance', desc: 'I provide ongoing support and maintenance to keep your website running smoothly.' },
  ],
  blog: [
    { id: 1, category: 'Development', date: 'May 18, 2026', readTime: '5 min read', title: 'My Developer Workflow in 2026', desc: 'Software development in 2026 is no longer just about writing code. This blog explores my modern engineering workflow.', img: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2670&auto=format&fit=crop', tags: ['React', 'Workflow', 'AI Tools'] },
    { id: 2, category: 'Design', date: 'May 10, 2026', readTime: '4 min read', title: 'Why UI Design Still Matters in the AI Era', desc: "With AI generating interfaces on demand, the role of a human designer has shifted. Here's why thoughtful UI design is more important than ever.", img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664&auto=format&fit=crop', tags: ['UI/UX', 'Design', 'Trends'] },
    { id: 3, category: 'SEO', date: 'Apr 28, 2026', readTime: '6 min read', title: 'SEO Strategies That Actually Work in 2026', desc: 'Discover the proven SEO techniques I use to rank client websites on the first page.', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop', tags: ['SEO', 'Marketing', 'Growth'] },
    { id: 4, category: 'E-Commerce', date: 'Apr 15, 2026', readTime: '7 min read', title: 'Building High-Converting E-Commerce Stores', desc: 'A deep dive into the psychology of online shopping and the technical decisions that turn visitors into buyers.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop', tags: ['E-Commerce', 'Conversion', 'UX'] },
  ],
  workItems: [],
  designs: [
    { img: '/design1.jpg', title: 'Porsche 911 GT3 RS', category: 'Automotive Design' },
    { img: '/design2.jpg', title: 'Design Work 2', category: 'Graphic Design' },
    { img: '/design3.jpg', title: 'Design Work 3', category: 'Branding' },
    { img: '/design4.jpg', title: 'Design Work 4', category: 'Poster Design' },
    { img: '/design5.jpg', title: 'Design Work 5', category: 'Digital Art' },
    { img: '/design6.jpg', title: 'Design Work 6', category: 'UI Design' },
    { img: '/design7.jpg', title: 'Design Work 7', category: 'Graphic Design' },
    { img: '/design8.jpg', title: 'Design Work 8', category: 'Poster Design' },
    { img: '/design9.jpg', title: 'Design Work 9', category: 'Branding' },
    { img: '/design10.jpg', title: 'Design Work 10', category: 'Digital Art' },
  ],
  siteSettings: {
    siteTitle: 'Bishr — Web Designer & Developer',
    favicon: '',
    metaDescription: 'Expert Web Designer & Developer in Malappuram, Kerala.',
    primaryColor: '#7c3aed',
    footerText: '© 2026 Bishr Portfolio. All rights reserved.',
  },
};

export function getPortfolioData(): PortfolioData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    // Deep merge to ensure new default fields are always present
    const parsed = JSON.parse(stored);
    return {
      ...defaultData,
      ...parsed,
      hero: { ...defaultData.hero, ...parsed.hero },
      about: { ...defaultData.about, ...parsed.about },
      contact: { ...defaultData.contact, ...parsed.contact },
      siteSettings: { ...defaultData.siteSettings, ...parsed.siteSettings },
    };
  } catch {
    return defaultData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('portfolio_updated', { detail: data }));
}
