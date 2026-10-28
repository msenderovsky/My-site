/**
 * Generates Schema.org compliant JSON-LD graph matching exact visible content.
 * Adheres strictly to:
 * - No telephone
 * - No degree credential / no alumniOf for incomplete degree
 * - 4 verified certifications as EducationalOccupationalCredential
 * - 4 projects as SoftwareSourceCode
 * - ProfessionalService with Argentina areaServed and remote note
 * - Exact FAQPage questions and answers
 * - BreadcrumbList
 * - WebSite & ProfilePage
 */
export function generateJsonLd(lang, t) {
  const isEs = lang === 'es';
  const siteUrl = 'https://msenderovsky.dev';
  const routeUrl = `${siteUrl}/${lang}/`;
  const personId = `${siteUrl}/#person`;

  const credentials = t.skills.certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    name: cert.title,
    credentialCategory: 'Certificate',
    dateCreated: cert.date,
    recognizedBy: {
      '@type': 'Organization',
      name: cert.provider.split('·')[0].trim(),
    },
  }));

  const projects = t.projects.items.map((proj) => {
    const item = {
      '@type': 'SoftwareSourceCode',
      name: proj.title,
      description: proj.description,
      codeRepository: proj.repoUrl,
      programmingLanguage: proj.tags,
      author: {
        '@id': personId,
      },
    };
    if (proj.demoUrl) {
      item.url = proj.demoUrl;
    }
    return item;
  });

  const faqItems = t.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  }));

  const serviceOffers = t.services.items.map((svc) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: svc.title,
      description: svc.description,
    },
  }));

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Marcos Senderovsky',
      description: t.meta.description,
      inLanguage: lang,
    },
    {
      '@type': 'ProfilePage',
      '@id': `${routeUrl}#webpage`,
      url: routeUrl,
      name: t.meta.title,
      description: t.meta.description,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      inLanguage: lang,
      mainEntity: {
        '@id': personId,
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Marcos Senderovsky',
      jobTitle: t.hero.role,
      description: isEs
        ? 'Desarrollador Full Stack con preferencia por el backend, radicado en Bahía Blanca, Buenos Aires, Argentina. Especializado en arquitecturas de servidores, microservicios, bases de datos y APIs REST con Python y Node.js.'
        : 'Full Stack developer who prefers backend work, based in Bahía Blanca, Buenos Aires, Argentina. Specialized in server architectures, microservices, databases, and REST APIs with Python and Node.js.',
      email: 'msenderovsky@gmail.com',
      url: routeUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bahía Blanca',
        addressRegion: 'Buenos Aires',
        addressCountry: 'AR',
      },
      sameAs: [
        'https://github.com/msenderovsky',
        'https://www.linkedin.com/in/msenderovsky',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: isEs ? 'Entrenador de IA' : 'AI Trainer',
        description: isEs
          ? 'Entrenamiento y evaluación de modelos de lenguaje (IA), selección y comparación de respuestas con criterio de verificación de datos (fact-checking) y revisión de prompts y respuestas relacionados con programación en Python.'
          : 'Training and evaluation of AI language models, selecting and comparing model outputs against rigorous fact-checking standards and reviewing prompts and responses related to Python programming.',
      },
      knowsAbout: isEs
        ? [
            'Python',
            'Django',
            'Node.js',
            'MongoDB',
            'JavaScript',
            'React',
            'PHP',
            'MySQL',
            'Java',
            "Ren'Py",
            'Firebase',
            'JWT',
            'HTML',
            'CSS',
            'SASS',
            'REST APIs',
            'Entrenador de IA',
            'Evaluación de modelos de lenguaje',
            'Verificación de datos',
            'Revisión de código Python',
            'Revisión de calidad de traducción',
          ]
        : [
            'Python',
            'Django',
            'Node.js',
            'MongoDB',
            'JavaScript',
            'React',
            'PHP',
            'MySQL',
            'Java',
            "Ren'Py",
            'Firebase',
            'JWT',
            'HTML',
            'CSS',
            'SASS',
            'REST APIs',
            'AI trainer',
            'LLM evaluation',
            'Fact-checking',
            'Python code review',
            'Translation quality review',
          ],
      knowsLanguage: ['es', 'en', 'fr'],
      hasCredential: credentials,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#freelance-service`,
      name: isEs
        ? 'Marcos Senderovsky — Servicios de Ingeniería de Software Backend & Full Stack'
        : 'Marcos Senderovsky — Backend & Full Stack Software Engineering Services',
      description: isEs
        ? 'Servicios profesionales de desarrollo backend, APIs REST distribuidas y aplicaciones full stack para clientes en Argentina y de forma remota para clientes de otros países.'
        : 'Professional backend development, distributed REST APIs, and full-stack web applications for clients in Argentina and available remotely for clients in other countries.',
      url: routeUrl,
      provider: {
        '@id': personId,
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'Argentina',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEs ? 'Servicios Freelance' : 'Freelance Services',
        itemListElement: serviceOffers,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${routeUrl}#faq`,
      mainEntity: faqItems,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${routeUrl}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isEs ? 'Inicio' : 'Home',
          item: `${siteUrl}/${lang}/`,
        },
      ],
    },
    ...projects,
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
