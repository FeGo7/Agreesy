// Agreesy Service Worker (Network-First for 100% instant UI updates, Cache for offline)
const CACHE_NAME = 'agreesy-v66';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-64.webp',
  './icon-192.png',
  './js/bundle.min.js?v=66',
  './options_gallery/gouache/pasta.webp',
  './options_gallery/gouache/pizza.webp',
  './options_gallery/gouache/sushi.webp',
  './options_gallery/gouache/movies.webp',
  './options_gallery/gouache/chores.webp',
  './options_gallery/gouache/cocktails.webp',
  './options_gallery/gouache/vacation.webp',
  './options_gallery/gouache/gifts.webp',
  './options_gallery/gouache/cheese.webp',
  './options_gallery/gouache/ramen.webp',
  './options_gallery/gouache/salad.webp',
  './options_gallery/gouache/coffee.webp',
  './options_gallery/gouache/burger.webp',
  './options_gallery/gouache/boardgames.webp'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            console.log('[SW] Purging old cache:', k);
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First for same-origin resources; safe offline fallback for navigation only
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const isSameOrigin = req.url.startsWith(self.location.origin);
  event.respondWith(
    fetch(req)
      .then((networkRes) => {
        if (isSameOrigin && networkRes && networkRes.status === 200 && req.method === 'GET') {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkRes;
      })
      .catch(() => {
        return caches.match(req, { ignoreSearch: true }).then((cached) => {
          if (cached) return cached;
          if (req.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 504, statusText: 'Offline' });
        });
      })
  );
});
