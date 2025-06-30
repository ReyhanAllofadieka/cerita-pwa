self.addEventListener('push', function (event) {
  const data = event.data ? event.data.text() : "Push message no payload";

  const options = {
    body: data,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
  };

  event.waitUntil(
    self.registration.showNotification('Notifikasi Baru!', options)
  );
});
