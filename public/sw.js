self.addEventListener("install", () => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Push Message No Payload";
  self.registration.showNotification("Cerita Baru!", {
    body: data,
    icon: "/icons/icon-192x192.png",
  });
});
