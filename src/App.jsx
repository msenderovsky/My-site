import React, { useState, useEffect } from 'react';
import { es } from './i18n/es.js';
import { en } from './i18n/en.js';
import { generateJsonLd } from './utils/schemaGenerator.js';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import SkillsCertifications from './components/SkillsCertifications.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App({ initialLang }) {
  // Determine initial language matching the server-rendered HTML exactly to prevent hydration mismatch
  const getInitialLang = () => {
    if (initialLang) return initialLang;
    if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) {
      const docLang = document.documentElement.lang.toLowerCase();
      if (docLang.startsWith('en')) return 'en';
      if (docLang.startsWith('es')) return 'es';
    }
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/en')) return 'en';
      if (path.startsWith('/es')) return 'es';
    }
    return 'es';
  };

  const [lang, setLang] = useState(getInitialLang);
  const [selectedService, setSelectedService] = useState('');

  // Initial theme state matches server-rendered 'light' markup to prevent hydration mismatch
  const [theme, setTheme] = useState('light');

  // Post-hydration: synchronize client theme preferences and root route redirects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('site_theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const clientTheme = storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light';
      if (clientTheme !== 'light') {
        setTheme(clientTheme);
      }

      // If user landed on root '/', redirect to preferred language route
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        const storedLang = localStorage.getItem('site_lang');
        const browserLang = navigator.language || '';
        const preferred = storedLang || (browserLang.toLowerCase().startsWith('en') ? 'en' : 'es');
        if (preferred !== lang) {
          setLang(preferred);
          window.history.replaceState({}, '', `/${preferred}/${window.location.hash || ''}`);
        }
      }
    }
  }, []);

  // Sync theme with HTML document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('site_theme', theme);
    }
  }, [theme]);

  // Sync lang with HTML document and JSON-LD script
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      localStorage.setItem('site_lang', lang);

      // Update or create JSON-LD in head
      const jsonLdData = generateJsonLd(lang, lang === 'es' ? es : en);
      let script = document.getElementById('schema-jsonld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'schema-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLdData, null, 2);

      // Update title and meta description dynamically
      const t = lang === 'es' ? es : en;
      document.title = t.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', t.meta.description);
    }
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLangChange = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_lang', newLang);
      const hash = window.location.hash || '';
      const targetUrl = `/${newLang}/${hash}`;
      window.history.pushState({}, '', targetUrl);
    }
  };

  const t = lang === 'es' ? es : en;

  return (
    <div className="portfolio-app-root">
      <Header
        t={t}
        lang={lang}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main id="main-content" role="main">
        <Hero t={t} />
        <Services t={t} onSelectService={setSelectedService} />
        <Projects t={t} />
        <About t={t} />
        <Experience t={t} />
        <SkillsCertifications t={t} />
        <FAQ t={t} />
        <Contact t={t} selectedService={selectedService} />
              </main>

      <Footer
        t={t}
        lang={lang}
        onLangChange={handleLangChange}
      />
    </div>
  );
}
