import React from 'react';

export default function SpecSheet({ t }) {
  return (
    <aside className="spec-sheet-section" aria-label={t.specSheet.title}>
      <div className="container">
        <div className="spec-title-row">
          <span className="module-code">{t.specSheet.landmark}</span>
          <h3 className="spec-header-title">{t.specSheet.title}</h3>
          <p className="spec-header-subtitle">{t.specSheet.subtitle}</p>
        </div>

        <div className="spec-grid">
          {/* Button Interaction States */}
          <div className="spec-component-block">
            <span className="spec-comp-label">Estados de Botones</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button type="button" className="btn-blueprint-primary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.75rem' }}>
                Primary Action
              </button>
              <button type="button" className="btn-blueprint-secondary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.75rem' }}>
                Secondary Wireframe
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textDecoration: 'underline' }}>
                {t.specSheet.blueprintLink}
              </span>
            </div>
          </div>

          {/* Input Field States */}
          <div className="spec-component-block">
            <span className="spec-comp-label">Campos de Entrada</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="text"
                readOnly
                placeholder={t.specSheet.inputDefault}
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
              />
              <input
                type="text"
                readOnly
                value={t.specSheet.inputFocused}
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--border-focus)' }}
              />
            </div>
          </div>

          {/* Tags & Indicators */}
          <div className="spec-component-block">
            <span className="spec-comp-label">Etiquetas & Estados</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              <span className="tech-tag">HTML5 Semántico</span>
              <span className="tech-tag">Accesibilidad AA</span>
              <span className="tech-tag" style={{ color: 'var(--accent-green)' }}>● En línea</span>
            </div>
          </div>

          {/* Blueprint Standards */}
          <div className="spec-component-block">
            <span className="spec-comp-label">Estándares de Maquetación</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              <div>Geometría: Bordes rectos (0px)</div>
              <div>Contraste: WCAG AA</div>
              <div>Alineación: Grilla 8pt / 4pt</div>
            </div>
          </div>
        </div>

        <div className="spec-table-row">
          {t.specSheet.specsTable.map((item) => (
            <div key={item.key} className="spec-metric">
              <span className="metric-key">{item.key}</span>
              <span className="metric-val">{item.val}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
