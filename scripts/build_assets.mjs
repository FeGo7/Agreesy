import { execSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';

const JS_FILES = [
  'js/theme.js',
  'js/i18n.js',
  'js/fluent_map.js',
  'js/decks.js',
  'js/media_picks.js',
  'js/logos.js',
  'js/app.js',
];

const INLINE_RE = /<!-- TW_INLINE_START -->[\s\S]*?<!-- TW_INLINE_END -->/;

console.log('1. Resetting inline style placeholder in index.html...');
const htmlInitial = readFileSync('index.html', 'utf8');
if (!INLINE_RE.test(htmlInitial)) {
  throw new Error('Missing TW_INLINE_START/TW_INLINE_END markers in index.html');
}
const htmlClean = htmlInitial.replace(
  INLINE_RE,
  '<!-- TW_INLINE_START --><style id="tw-inline"></style><!-- TW_INLINE_END -->'
);
writeFileSync('index.html', htmlClean, 'utf8');

console.log('2. Building Tailwind CSS -> css/style.min.css ...');
execSync('npx --yes tailwindcss@3 -i css/input.css -o css/style.min.css --minify', { stdio: 'inherit' });

console.log('3. Inlining compiled CSS into index.html ...');
const compiledCss = readFileSync('css/style.min.css', 'utf8').trim();
const htmlInlined = htmlClean.replace(
  INLINE_RE,
  () => `<!-- TW_INLINE_START --><style id="tw-inline">${compiledCss}</style><!-- TW_INLINE_END -->`
);
writeFileSync('index.html', htmlInlined, 'utf8');

console.log('4. Concatenating & minifying JS -> js/bundle.min.js (+ sourcemap) ...');
const combined = JS_FILES.map((f) => `/* === ${f} === */\n` + readFileSync(f, 'utf8')).join('\n;\n');
writeFileSync('js/_combined.tmp.js', combined, 'utf8');
try {
  execSync(
    'npx --yes esbuild js/_combined.tmp.js --minify --sourcemap --outfile=js/bundle.min.js --target=es2020',
    { stdio: 'inherit' }
  );
} finally {
  if (existsSync('js/_combined.tmp.js')) unlinkSync('js/_combined.tmp.js');
}

console.log('5. Checking syntax of js/bundle.min.js ...');
execSync('node --check js/bundle.min.js', { stdio: 'inherit' });
console.log('Build complete.');
