import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const JS_FILES = [
  'js/theme.js',
  'js/i18n.js',
  'js/fluent_map.js',
  'js/decks.js',
  'js/media_picks.js',
  'js/logos.js',
  'js/app.js',
];

console.log('1. Building Tailwind CSS -> css/style.min.css ...');
execSync('npx --yes tailwindcss@3 -i css/input.css -o css/style.min.css --minify', { stdio: 'inherit' });

console.log('2. Concatenating & minifying JS -> js/bundle.min.js ...');
const combined = JS_FILES.map((f) => `/* === ${f} === */\n` + readFileSync(f, 'utf8')).join('\n;\n');
writeFileSync('js/_combined.tmp.js', combined, 'utf8');
try {
  execSync('npx --yes esbuild js/_combined.tmp.js --minify --outfile=js/bundle.min.js --target=es2020', { stdio: 'inherit' });
} finally {
  execSync('node -e "const fs=require(\'fs\'); if(fs.existsSync(\'js/_combined.tmp.js\')) fs.unlinkSync(\'js/_combined.tmp.js\');"');
}

console.log('3. Checking syntax of js/bundle.min.js ...');
execSync('node --check js/bundle.min.js', { stdio: 'inherit' });
console.log('Build complete.');
