import React from 'react';

export default function About({ t }) {
  return (
    <section id="about" className="blueprint-section" aria-labelledby="about-title">
      <div className="container">
        <div className="landmark-badge">
          {t.about.landmark}
        </div>

        <div className="section-header">
          <span className="module-code">{t.about.moduleCode}</span>
          <h2 id="about-title" className="section-title">
            {t.about.title}
          </h2>
        </div>

        <div className="about-grid">
          {/* Bio & Languages */}
          <div className="about-bio-col">
            <p className="about-lead-p">
              {t.about.p1}
            </p>
            <p className="about-secondary-p">
              {t.about.p2}
            </p>

            <div className="matrix-box">
              <div className="matrix-title">
                {t.about.matrixTitle}
              </div>
              <div className="languages-list">
                {t.about.languages.map((langItem, idx) => (
                  <div key={langItem.name} className={`lang-card tier-${idx}`}>
                    <div className="lang-tier">{langItem.tier}</div>
                    <div className="lang-name">{langItem.name}</div>
                    <div className="lang-level">{langItem.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic & Engineering Pillars */}
          <div className="about-details-col">
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-meta-tag">{t.about.academicTitle}</span>
                <span className="detail-year-badge">{t.about.academicYears}</span>
              </div>
              <h3 className="detail-title">{t.about.academicInstitution}</h3>
              <p className="detail-degree">{t.about.academicDegree}</p>
              <p className="detail-status">{t.about.academicStatus}</p>
              <p className="detail-curriculum">{t.about.academicCurriculum}</p>
            </div>

            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-meta-tag">{t.about.pillarsTitle}</span>
              </div>
              <ul className="pillars-list">
                {t.about.pillars.map((pillar) => (
                  <li key={pillar}>{pillar}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
