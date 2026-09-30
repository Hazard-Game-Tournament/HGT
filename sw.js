const CACHE = 'hgt-shell-auto-v3';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/hgt-192.png',
  './assets/icons/hgt-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('hgt-shell-') && key !== CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isLiveAsset =
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/css/styles.css') ||
    url.pathname.endsWith('/js/app.js') ||
    url.pathname === new URL('./', self.location.href).pathname;

  if (isLiveAsset) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => response)
        .catch(async () => {
          const cached = await caches.match(event.request, { ignoreSearch: true });
          if (cached) return cached;
          if (event.request.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
