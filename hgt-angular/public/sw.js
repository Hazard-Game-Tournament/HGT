// Ancien service worker de la version app.js remplacé par un "nettoyeur".
// Il vide les anciens caches et se désinstalle, sans recharger la page
// (pour éviter une boucle si l'ancienne page le réinstalle).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.registration.unregister();
  })());
});
