console.log("✅ story-view.js aktif");

import { FavoriteDB } from '../scripts/idb.js';

export class HomePageView {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2>Daftar Cerita</h2>
      <div id="story-list" aria-live="polite">Memuat cerita...</div>
    `;
  }

  showLoading() {
    const container = document.getElementById('story-list');
    container.innerHTML = '<p>⏳ Sedang memuat cerita...</p>';
  }

  showStories(stories) {
  const container = document.getElementById('story-list');
  container.innerHTML = '';

  stories.forEach((story) => {
    const item = document.createElement('div');
    item.style.marginBottom = '30px';

    const photoUrl = story.photoUrl || 'https://via.placeholder.com/100?text=No+Image';

    item.innerHTML = `
      <img src="${photoUrl}" alt="Foto cerita dari ${story.name}" width="100" />
      <h4>${story.name}</h4>
      <p>${story.description}</p>
      <button class="favBtn" data-id="${story.id}">❤️ Simpan ke Favorit</button>
      <div id="map-${story.id}" style="height:200px;margin-top:10px;" aria-label="Peta lokasi cerita"></div>
      <small>Lat: ${story.lat ?? 'N/A'}, Lon: ${story.lon ?? 'N/A'}</small>
    `;

    container.appendChild(item);

    if (story.lat && story.lon) {
      const map = L.map(`map-${story.id}`).setView([story.lat, story.lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      L.marker([story.lat, story.lon]).addTo(map);
    }

    // ✅ Event listener untuk tombol favorit
    item.querySelector('.favBtn').addEventListener('click', async () => {
      await FavoriteDB.add({
        id: story.id,
        name: story.name,
        description: story.description,
        photoUrl: story.photoUrl,
      });
      alert('✅ Cerita ditambahkan ke Favorit!');
    });
  });
}


  showError(message = 'Gagal memuat data.') {
    const container = document.getElementById('story-list');
    container.innerHTML = `<p>${message}</p>`;
  }
}
