import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

export default function Projects({ t }) {
  return (
    <section id="projects" className="blueprint-section" aria-labelledby="projects-title">
      <div className="container">
        <div className="landmark-badge">
          {t.projects.landmark}
        </div>

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="module-code">{t.projects.moduleCode}</span>
              <h2 id="projects-title" className="section-title">
                {t.projects.title}
              </h2>
            </div>
            <span className="module-code" style={{ marginTop: '0.5rem' }}>
              {t.projects.statusDeployed}
            </span>
          </div>
        </div>

        <div className="projects-list">
          {t.projects.items.map((proj) => (
            <article
              key={proj.id}
              className={`project-card ${proj.isSmall ? 'small-card' : ''}`}
              aria-labelledby={`project-${proj.id}-title`}
            >
              {/* Project Info */}
              <div className="project-info">
                <div className="project-meta-row">
                  <span className="project-id-label">{proj.label}</span>
                  <span className={`project-badge ${
                    proj.badge.includes('BACKEND')
                      ? 'badge-backend'
                      : proj.badge.includes('WEB')
                      ? 'badge-webapp'
                      : proj.badge.includes('E-COM') || proj.badge.includes('COMMERCE')
                      ? 'badge-ecommerce'
                      : 'badge-education'
                  }`}>
                    {proj.badge}
                  </span>
                </div>

                <h3 id={`project-${proj.id}-title`} className="project-title">
                  {proj.title}
                </h3>

                <p className="project-description">
                  {proj.description}
                </p>

                <div className="project-tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-links-row">
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-blueprint-code"
                      aria-label={`${t.projects.codeButton}: ${proj.title}`}
                    >
                      <Code size={14} aria-hidden="true" />
                      <span>{t.projects.codeButton}</span>
                    </a>
                  )}

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-blueprint-code"
                      aria-label={`${t.projects.demoButton}: ${proj.title}`}
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      <span>{t.projects.demoButton}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="projects-footer-cta">
            <a
              href="https://github.com/msenderovsky"
              target="_blank"
              rel="noopener noreferrer"
              className="all-repos-link"
            >
              {t.projects.viewAllGithub}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
