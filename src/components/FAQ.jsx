import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ({ t }) {
  // First item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="blueprint-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="landmark-badge">
          {t.faq.landmark}
        </div>

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="module-code">{t.faq.moduleCode}</span>
              <h2 id="faq-title" className="section-title">
                {t.faq.title}
              </h2>
            </div>
            <span className="module-code" style={{ marginTop: '0.5rem' }}>
              {t.faq.badge}
            </span>
          </div>
        </div>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const itemNumber = String(index + 1).padStart(2, '0');
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-btn-${index}`}
                >
                  <span className="faq-question-text">
                    <span style={{ color: 'var(--accent-cyan)', marginRight: '0.5rem', fontWeight: 700 }}>{itemNumber}.</span> {item.q}
                  </span>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer-body"
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
