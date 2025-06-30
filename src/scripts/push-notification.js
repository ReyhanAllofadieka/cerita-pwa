const pushButton = document.getElementById('pushButton');

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js');
    console.log('✅ Service Worker terdaftar');
  }
}

async function askPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Izin notifikasi tidak diberikan');
  }
}

async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BO4VNQOZ3CIkaVTaTZe-vnH9gghzMFqI6oFyY3D9dOuE9wD1kWDw8mTb3LaY8MZ9wDAItE0f6FqFVdKzBS2nAH8' // dummy VAPID key
    ),
  });

  console.log('Berhasil subscribe:', JSON.stringify(subscription));
  alert("🎉 Berhasil Subscribe Notifikasi!");
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

pushButton?.addEventListener('click', async () => {
  try {
    await registerServiceWorker();
    await askPermission();
    await subscribeUserToPush();
  } catch (error) {
    console.error('❌ Gagal subscribe:', error);
    alert("Gagal subscribe notifikasi. Lihat console untuk detail.");
  }
});
