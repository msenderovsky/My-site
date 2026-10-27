import { es } from '../src/i18n/es.js';
import { en } from '../src/i18n/en.js';

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const esKeys = new Set(getKeys(es));
const enKeys = new Set(getKeys(en));

const missingInEn = [...esKeys].filter((k) => !enKeys.has(k));
const missingInEs = [...enKeys].filter((k) => !esKeys.has(k));

let hasErrors = false;

if (missingInEn.length > 0) {
  console.error('❌ Keys in ES but missing in EN:');
  missingInEn.forEach((k) => console.error(`  - ${k}`));
  hasErrors = true;
}

if (missingInEs.length > 0) {
  console.error('❌ Keys in EN but missing in ES:');
  missingInEs.forEach((k) => console.error(`  - ${k}`));
  hasErrors = true;
}

if (hasErrors) {
  console.error('\nBuild check failed: i18n key parity mismatch.');
  process.exit(1);
} else {
  console.log(`✅ i18n key parity verified: ${esKeys.size} matching keys between ES and EN.`);
}
