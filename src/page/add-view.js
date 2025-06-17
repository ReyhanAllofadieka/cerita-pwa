export class AddPageView {
  constructor() {
    this._onSubmit = null;
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2>Tambah Cerita</h2>
      <form id="addForm">
        <label for="descInput">Deskripsi</label>
        <textarea id="descInput" placeholder="Deskripsi" required></textarea>

        <h4>Ambil Gambar</h4>
        <video id="video" width="300" autoplay aria-label="Video kamera"></video>
        <canvas id="canvas" width="300" height="200" style="display:none;"></canvas>
        <button type="button" id="captureBtn" aria-label="Ambil gambar dari kamera">Ambil Gambar</button>

        <h4>Ambil Lokasi</h4>
        <div id="map" style="height: 300px;" aria-label="Pilih lokasi di peta"></div>
        <input type="hidden" id="latInput" />
        <input type="hidden" id="lngInput" />

        <button type="submit" aria-label="Kirim cerita">Kirim</button>
      </form>
    `;

    document.getElementById('addForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const description = document.getElementById('descInput').value.trim();
      const lat = parseFloat(document.getElementById('latInput').value);
      const lon = parseFloat(document.getElementById('lngInput').value);
      const canvas = document.getElementById('canvas');

      if (!description) return alert('Deskripsi tidak boleh kosong!');
      if (isNaN(lat) || isNaN(lon)) return alert('Lokasi belum dipilih!');
      if (!canvas.toDataURL().includes('data:image')) return alert('Gambar belum diambil!');

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
      this._onSubmit?.({ description, photo: blob, lat, lon });
    });
  }

  async afterRender() {
    this.setupCamera();
    this.setupMap();
  }

  setupCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('captureBtn');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        captureBtn.onclick = () => {
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.style.display = 'block';
          video.style.display = 'none';
        };
      })
      .catch((err) => {
        alert('Gagal mengakses kamera');
        console.error(err);
      });
  }

  setupMap() {
    const map = L.map('map').setView([-7.8, 110.36], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      document.getElementById('latInput').value = lat;
      document.getElementById('lngInput').value = lng;
      L.marker([lat, lng]).addTo(map).bindPopup('Lokasi Anda').openPopup();
    });
  }
}
