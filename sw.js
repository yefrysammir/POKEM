const CACHE_NAME = 'monster-go-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/components.css',
  '/css/map.css',
  '/css/battle.css',
  '/css/animations.css',
  '/js/app.js',
  '/manifest.json'
];

// Instalación: Cachear recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activación: Limpiar caches antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Estrategia Cache First, luego Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            // No cachear imágenes de Pokémon dinámicas
            if (event.request.url.includes('pokemonshowdown.com')) {
              return networkResponse;
            }
            
            const clonedResponse = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
            return networkResponse;
          })
          .catch(() => {
            // Fallback para imágenes
            if (event.request.destination === 'image') {
              return new Response('Imagen no disponible offline');
            }
          });
      })
  );
});
