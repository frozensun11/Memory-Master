/* Memory Master service worker.
 *
 * Bump CACHE_VERSION whenever sw.js or any file in APP_SHELL changes so that
 * installed copies fetch the new files and drop the old cache.
 */
const CACHE_VERSION = 'v2';
const CACHE_NAME = 'memory-master-' + CACHE_VERSION;

// Everything needed to open the site and each game with no network.
const APP_SHELL = [
  './',
  './index.html',
  './presidents/',
  './States/',
  './Supreme%20Court/',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('memory-master-') && k !== CACHE_NAME)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  // Pages: try the network first so updates land quickly, fall back to the
  // cached copy, and finally to the landing page when fully offline.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Same-origin assets and web fonts: serve from cache, refresh in the
  // background. Wikimedia portraits, flags, and maps are left to the
  // browser's normal HTTP cache; they are opaque cross-origin responses and
  // would inflate storage quota if kept here.
  if (sameOrigin || isFont) {
    event.respondWith(
      caches.match(req).then(hit => {
        const refresh = fetch(req).then(res => {
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        }).catch(() => hit);
        return hit || refresh;
      })
    );
  }
});
