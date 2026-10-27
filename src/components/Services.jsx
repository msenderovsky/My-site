import React from 'react';

export default function Services({ t, onSelectService }) {
  return (
    <section id="services" className="blueprint-section" aria-labelledby="services-title">
      <div className="container">
        <div className="landmark-badge">
          {t.services.landmark}
        </div>

        <div className="section-header">
          <span className="module-code">{t.services.moduleCode}</span>
          <h2 id="services-title" className="section-title">
            {t.services.title}
          </h2>
          <p className="section-lead">
            {t.services.lead}
          </p>
        </div>

        <div className="services-grid">
          {t.services.items.map((svc) => {
            const isPrimary = svc.id === '01';
            return (
              <article
                key={svc.id}
                className={`service-card ${isPrimary ? 'primary-focus' : ''}`}
                aria-labelledby={`service-${svc.id}-title`}
              >
                {isPrimary && (
                  <span className="primary-focus-ribbon">
                    {t.services.cardPrimaryTag}
                  </span>
                )}
                <div className="service-card-top">
                  <div className="service-id">{svc.id}</div>
                  <div className="service-code">{svc.code}</div>
                  <h3 id={`service-${svc.id}-title`} className="service-title">
                    {svc.title}
                  </h3>
                  <p className="service-desc">{svc.description}</p>
                </div>

                <div className="service-card-bottom">
                  <span className="service-tech">{svc.tech}</span>
                  <a
                    href="#contact"
                    className="service-action-link"
                    onClick={() => onSelectService && onSelectService(svc.serviceKey)}
                  >
                    {svc.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
