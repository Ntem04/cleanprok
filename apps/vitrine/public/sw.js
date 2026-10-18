const CACHE_NAME = "cleanpro-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/icon.webp",
];

// 1. Installation du Service Worker et mise en cache immédiate
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // En cas d'échec sur une ressource optionnelle, continuer
      });
    })
  );
});

// 2. Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Stratégie Stale-While-Revalidate pour contrer la latence ngrok
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Uniquement pour les requêtes GET sur notre propre domaine
  if (req.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Ne pas cacher les requêtes API dynamiques
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Pour les assets (JS, CSS, images, polices) : Servir directement depuis le cache (0ms)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      // Si présent dans le cache, retour instantané sans attendre ngrok !
      return cachedResponse || fetchPromise;
    })
  );
});

