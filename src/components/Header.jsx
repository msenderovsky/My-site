import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header({ t, lang, onLangChange, theme, onThemeToggle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#about', label: t.header.nav.about },
    { href: '#services', label: t.header.nav.services },
    { href: '#projects', label: t.header.nav.projects },
    { href: '#experience', label: t.header.nav.experience },
    { href: '#skills', label: t.header.nav.skills },
    { href: '#faq', label: t.header.nav.faq },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const currentThemeAria = t.header.themeToggleAria.replace('{theme}', theme);

  return (
    <header className="site-header" role="banner">
      <a href="#main-content" className="skip-to-content">
        {t.header.skipToContent}
      </a>
      <div className="container">
        <div className="header-inner">
          <div className="brand-group">
            <a href={`/${lang}/`} className="brand-title" aria-label={`${t.header.name} — Home`}>
              {t.header.name}
            </a>
            </div>

          <nav className="nav-desktop" aria-label={t.header.navAria}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            {/* Bilingual Switcher */}
            <div className="lang-switcher" role="group" aria-label="Language selector">
              <button
                type="button"
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                onClick={() => onLangChange('es')}
                aria-pressed={lang === 'es'}
                lang="es"
              >
                ES
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => onLangChange('en')}
                aria-pressed={lang === 'en'}
                lang="en"
              >
                EN
              </button>
            </div>

            {/* Dark mode toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onThemeToggle}
              aria-label={currentThemeAria}
              aria-pressed={theme === 'dark'}
              title={currentThemeAria}
            >
              {theme === 'dark' ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </button>

            {/* CTA */}
            <a href="#contact" className="header-cta-btn">
              {t.header.cta}
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <div className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <ul className="nav-mobile-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-mobile-link"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="nav-mobile-link"
              onClick={handleNavClick}
              style={{ fontWeight: 'bold' }}
            >
              {t.header.cta}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
