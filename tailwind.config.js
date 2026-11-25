module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './js/theme.js',
    './js/i18n.js',
    './js/fluent_map.js',
    './js/decks.js',
    './js/media_picks.js',
    './js/logos.js',
    './js/app.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
};
