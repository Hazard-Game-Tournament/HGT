// Ancien service worker de la version app.js remplacé par un "nettoyeur".
// Les téléphones qui avaient installé l'ancien site gardaient en cache
// l'ancienne page : ce fichier vide les caches et se désinstalle.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(client => client.navigate(client.url));
  })());
});
self.addEventListener('fetch', () => {});
