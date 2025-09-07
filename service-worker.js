const CACHE_NAME = 'cantadas-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/cantadas-infinitas.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
  'https://www.fesliyanstudios.com/download/60.mp3',
  '/romantica.mp3',
  '/engracada.mp3',
  '/nerd.mp3',
  '/pesada.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
