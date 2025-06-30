import { FavoriteDB } from '../scripts/idb.js';

export class FavoriteView {
  async getHtml() {
    const stories = await FavoriteDB.getAll();
    if (stories.length === 0) {
      return `<p>Tidak ada cerita favorit.</p>`;
    }

    return `
      <h2>Cerita Favorit</h2>
      <ul>
        ${stories.map((story) => `
          <li>
            <strong>${story.name}</strong><br />
            ${story.description}<br />
            <button data-id="${story.id}" class="hapusBtn">Hapus</button>
          </li>
        `).join('')}
      </ul>
    `;
  }

  async afterRender() {
    document.querySelectorAll('.hapusBtn').forEach(btn => {
      btn.addEventListener('click', async () => {
        await FavoriteDB.delete(btn.dataset.id);
        location.reload();
      });
    });
  }
}
