import React from 'react';

export default function Experience({ t }) {
  return (
    <section id="experience" className="blueprint-section" aria-labelledby="experience-title">
      <div className="container">
        <div className="landmark-badge">
          {t.experience.landmark}
        </div>

        <div className="section-header">
          <span className="module-code">{t.experience.moduleCode}</span>
          <h2 id="experience-title" className="section-title">
            {t.experience.title}
          </h2>
        </div>

        <div className="timeline-list">
          {t.experience.items.map((item) => (
            <article
              key={`${item.org}-${item.year}`}
              className="timeline-item"
              aria-labelledby={`exp-${item.org.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <div className="timeline-item-header">
                <div className="timeline-org-group">
                  <h3
                    id={`exp-${item.org.replace(/\s+/g, '-').toLowerCase()}`}
                    className="timeline-org"
                  >
                    {item.org}
                  </h3>
                  <span className="timeline-role-tag">{item.roleTag}</span>
                </div>
                <span className="timeline-year">{item.year}</span>
              </div>

              <p className="timeline-description">
                {item.description}
              </p>

              <div className="timeline-stack">
                Stack: {item.stack}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
