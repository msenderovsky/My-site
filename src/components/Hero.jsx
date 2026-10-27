import React from 'react';

export default function Hero({ t }) {
  return (
    <section id="hero" className="blueprint-section hero-section" aria-labelledby="hero-title">
      <div className="container">
        <div className="landmark-badge">
          {t.hero.landmark}
        </div>

        <div className="status-badge-row">
          <div className="status-location-badge">
            {t.hero.statusLocation}
          </div>
        </div>

        <div className="hero-h1-group">
          <span className="module-code">{t.hero.h1Badge}</span>
          <h1 id="hero-title" className="hero-h1">
            {t.hero.name}
          </h1>
          <p className="hero-role">
            {t.hero.role}
          </p>
          <p className="hero-description">
            {t.hero.description}
          </p>
        </div>

        <div className="hero-actions-row">
          <a href="#contact" className="btn-blueprint-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#projects" className="btn-blueprint-secondary">
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div className="hero-core-stack">
          <span className="module-code">{t.hero.stackBadge}</span>
          <div className="stack-tags-list">
            {t.hero.stackTags.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
