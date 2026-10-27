import React from 'react';

export default function Footer({ t, lang, onLangChange }) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Location */}
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">
              {t.footer.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.footer.tagline}</span>
            </h3>
            <p className="footer-bio">
              {t.footer.bio}
            </p>
            <div className="footer-location">
              {t.footer.location}
            </div>
          </div>

          {/* Networks & Direct Comm */}
          <div>
            <div className="footer-section-title">
              {t.footer.networksTitle}
            </div>
            <ul className="footer-links-list">
              <li>
                <a href={`mailto:${t.footer.email}`}>
                  ✉ {t.footer.email}
                </a>
              </li>
              <li>
                <a href="https://github.com/msenderovsky" target="_blank" rel="noopener noreferrer">
                  GitHub: {t.footer.github}
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/msenderovsky" target="_blank" rel="noopener noreferrer">
                  LinkedIn: {t.footer.linkedin}
                </a>
              </li>
            </ul>
          </div>

          {/* Locale Config */}
          <div>
            <div className="footer-section-title">
              {t.footer.localeConfigTitle}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <button
                type="button"
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.6rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: lang === 'es' ? 'var(--btn-primary-bg)' : 'transparent',
                  color: lang === 'es' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                }}
                onClick={() => onLangChange('es')}
                aria-pressed={lang === 'es'}
                lang="es"
              >
                ES
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.6rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: lang === 'en' ? 'var(--btn-primary-bg)' : 'transparent',
                  color: lang === 'en' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                }}
                onClick={() => onLangChange('en')}
                aria-pressed={lang === 'en'}
                lang="en"
              >
                EN
              </button>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {t.footer.schemaSync}
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            {t.footer.rights}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent-green)' }}>●</span> STACK: REACT + JS + SCSS
          </div>
        </div>
      </div>
    </footer>
  );
}
