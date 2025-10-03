const CACHE_NAME = "cafino-pwa-v1";
const urlsToCache = [
  "/",
  "/menu",
  "/about-us",
  "/contact-us",
  "/profile",
  "/dashboard",
  "/manifest.json",
  "/Main-logo-192x192.webp",
  "/Main-logo-512x512.webp",
];

// Install event - cache resources
self.addEventListener("install", function (event) {
  event
    .waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
    )
    .then(() => {
      self.skipWaiting();
    });
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
