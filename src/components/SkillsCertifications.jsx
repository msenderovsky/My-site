import React, { useState } from 'react';

export default function SkillsCertifications({ t }) {
  // First item open by default like in wireframe
  const [openCertId, setOpenCertId] = useState('cert-pydj');

  const toggleCert = (id) => {
    setOpenCertId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="skills" className="blueprint-section" aria-labelledby="skills-title">
      <div className="container">
        <div className="landmark-badge">
          {t.skills.landmark}
        </div>

        <div className="section-header">
          <span className="module-code">{t.skills.moduleCode}</span>
          <h2 id="skills-title" className="section-title">
            {t.skills.title}
          </h2>
        </div>

        <div className="skills-grid">
          {/* Tech Stack by Tiers */}
          <div className="skills-stack-col">
            <div className="tier-block">
              <div className="tier-header">
                <h3 className="tier-name">{t.skills.tier1Title}</h3>
                <span className="tier-tag">{t.skills.tier1Tag}</span>
              </div>
              <div className="tier-tags-list">
                {t.skills.tier1Items.map((item) => (
                  <span key={item} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="tier-block">
              <div className="tier-header">
                <h3 className="tier-name">{t.skills.tier2Title}</h3>
                <span className="tier-tag">{t.skills.tier2Tag}</span>
              </div>
              <div className="tier-tags-list">
                {t.skills.tier2Items.map((item) => (
                  <span key={item} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="tier-block">
              <div className="tier-header">
                <h3 className="tier-name">{t.skills.tier3Title}</h3>
                <span className="tier-tag">{t.skills.tier3Tag}</span>
              </div>
              <div className="tier-tags-list">
                {t.skills.tier3Items.map((item) => (
                  <span key={item} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Accreditations Accordion */}
          <div className="accreditations-col">
            <div className="accreditations-title">
              {t.skills.accreditationsTitle}
            </div>

            <div className="cert-accordion">
              {t.skills.certifications.map((cert) => {
                const isOpen = openCertId === cert.id;
                return (
                  <div key={cert.id} className="cert-item">
                    <button
                      type="button"
                      className="cert-header-btn"
                      onClick={() => toggleCert(cert.id)}
                      aria-expanded={isOpen}
                      aria-controls={`cert-body-${cert.id}`}
                    >
                      <span className="cert-title-group">
                        <span className="cert-provider">{cert.provider}</span>
                        <span className="cert-title">{cert.title}</span>
                      </span>
                      <span className="cert-toggle-indicator" aria-hidden="true">
                        {isOpen ? t.skills.closeLabel : t.skills.expandLabel}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`cert-body-${cert.id}`}
                        className="cert-content"
                      >
                        <p className="cert-coverage">{cert.coverage}</p>
                        <div className="cert-hash">{cert.credentialHash}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
