/* Trustbread SW — PWA installability without stale HTML/asset mismatches */
const CACHE = 'trustbread-v2';
const PRECACHE = ['/manifest.webmanifest', '/favicon.png', '/apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache HTML navigations — Astro hashes change every deploy
  const isHtmlNav =
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  if (isHtmlNav) {
    event.respondWith(fetch(request));
    return;
  }

  // Hashed /_astro/* assets are immutable — cache after first fetch
  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      }),
    );
    return;
  }

  // Other same-origin GETs: network first, cache fallback only for known static files
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && PRECACHE.includes(url.pathname)) {
          caches.open(CACHE).then((cache) => cache.put(request, response.clone())).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || Response.error())),
  );
});
