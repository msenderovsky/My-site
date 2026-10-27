import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { es } from '../src/i18n/es.js';
import { en } from '../src/i18n/en.js';
import { generateJsonLd } from '../src/utils/schemaGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Step 1: Bundle App.jsx for Node.js SSR using esbuild
const tempBundlePath = path.join(rootDir, '.prerender-app.mjs');
esbuild.buildSync({
  entryPoints: [path.join(rootDir, 'src/App.jsx')],
  outfile: tempBundlePath,
  bundle: true,
  format: 'esm',
  platform: 'node',
  packages: 'external',
});

// Import the bundled App component
const { default: App } = await import(tempBundlePath);

function buildHtmlTemplate({ lang, content, t, isRoot = false }) {
  const jsonLd = generateJsonLd(lang, t);
  const jsonLdString = JSON.stringify(jsonLd, null, 2);

  const canonicalUrl = `https://msenderovsky.dev/${lang}/`;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${t.meta.title}</title>
    <meta name="description" content="${t.meta.description}" />
    <meta name="keywords" content="${t.meta.keywords}" />
    <meta name="author" content="${t.meta.author}" />
    <meta name="robots" content="index, follow" />

    <!-- Canonical & Hreflang alternates -->
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="es" href="https://msenderovsky.dev/es/" />
    <link rel="alternate" hreflang="en" href="https://msenderovsky.dev/en/" />
    <link rel="alternate" hreflang="x-default" href="https://msenderovsky.dev/es/" />

    <!-- Open Graph Social Metadata -->
    <meta property="og:title" content="${t.meta.title}" />
    <meta property="og:description" content="${t.meta.description}" />
    <meta property="og:type" content="profile" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="${t.meta.siteName}" />
    <meta property="og:locale" content="${t.meta.locale}" />
    <meta property="og:image" content="https://msenderovsky.dev/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Marcos Senderovsky - Full Stack Developer Blueprint Portfolio" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t.meta.title}" />
    <meta name="twitter:description" content="${t.meta.description}" />
    <meta name="twitter:image" content="https://msenderovsky.dev/og-image.png" />

    <!-- Icons & Manifest -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#181c20" />

    <!-- Typography: System & Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

    <!-- Inline Dark Mode Initializer before First Paint (Zero Flash) -->
    <script>
      (function() {
        try {
          var stored = localStorage.getItem('site_theme');
          var isDark = stored === 'dark' || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
        } catch(e) {}
      })();
    </script>

    ${
      isRoot
        ? `<!-- Root URL Client Router / Redirector -->
    <script>
      (function() {
        try {
          var storedLang = localStorage.getItem('site_lang');
          var browserLang = navigator.language || navigator.userLanguage || '';
          var preferredLang = storedLang || (browserLang.toLowerCase().indexOf('en') === 0 ? 'en' : 'es');
          if (location.pathname === '/' || location.pathname === '') {
            var target = '/' + preferredLang + '/' + location.hash;
            location.replace(target);
          }
        } catch(e) {}
      })();
    </script>`
        : ''
    }

    <!-- Schema.org JSON-LD Graph for Search Engines and AI Crawlers -->
    <script id="schema-jsonld" type="application/ld+json">
${jsonLdString}
    </script>
  </head>
  <body>
    <div id="root">${content}</div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
}

console.log('⚡ Starting pre-rendering for /es/ and /en/ ...');

// Render ES
const esHtmlContent = renderToString(React.createElement(App, { initialLang: 'es' }));
const esFullHtml = buildHtmlTemplate({ lang: 'es', content: esHtmlContent, t: es });

// Render EN
const enHtmlContent = renderToString(React.createElement(App, { initialLang: 'en' }));
const enFullHtml = buildHtmlTemplate({ lang: 'en', content: enHtmlContent, t: en });

// Render Root (Default ES with auto-redirect)
const rootFullHtml = buildHtmlTemplate({ lang: 'es', content: esHtmlContent, t: es, isRoot: true });

// Ensure directories
const esDir = path.join(rootDir, 'es');
const enDir = path.join(rootDir, 'en');
if (!fs.existsSync(esDir)) fs.mkdirSync(esDir, { recursive: true });
if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });

// Write source index files
fs.writeFileSync(path.join(rootDir, 'index.html'), rootFullHtml, 'utf-8');
fs.writeFileSync(path.join(esDir, 'index.html'), esFullHtml, 'utf-8');
fs.writeFileSync(path.join(enDir, 'index.html'), enFullHtml, 'utf-8');

console.log('✅ Generated /index.html');
console.log('✅ Generated /es/index.html (Pre-rendered ES content & JSON-LD)');
console.log('✅ Generated /en/index.html (Pre-rendered EN content & JSON-LD)');

// Also write into dist/ if dist/ exists
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const distEs = path.join(distDir, 'es');
  const distEn = path.join(distDir, 'en');
  if (!fs.existsSync(distEs)) fs.mkdirSync(distEs, { recursive: true });
  if (!fs.existsSync(distEn)) fs.mkdirSync(distEn, { recursive: true });

  const distIndex = path.join(distDir, 'index.html');
  if (fs.existsSync(distIndex)) {
    const rawIndex = fs.readFileSync(distIndex, 'utf-8');
    const scriptMatches = rawIndex.match(/<script type="module" crossorigin src="[^"]+"><\/script>/g) || [];
    const cssMatches = rawIndex.match(/<link rel="stylesheet" crossorigin href="[^"]+">/g) || [];

    const extraTags = [...cssMatches, ...scriptMatches].join('\n    ');

    const injectAssets = (html) => {
      let modified = html.replace('<script type="module" src="/src/main.jsx"></script>', extraTags);
      return modified;
    };

    fs.writeFileSync(path.join(distDir, 'index.html'), injectAssets(rootFullHtml), 'utf-8');
    fs.writeFileSync(path.join(distEs, 'index.html'), injectAssets(esFullHtml), 'utf-8');
    fs.writeFileSync(path.join(distEn, 'index.html'), injectAssets(enFullHtml), 'utf-8');
    console.log('✅ Synchronized pre-rendered static HTML into dist/es and dist/en');
  }
}

// Clean up temporary bundle file
if (fs.existsSync(tempBundlePath)) {
  fs.unlinkSync(tempBundlePath);
}
