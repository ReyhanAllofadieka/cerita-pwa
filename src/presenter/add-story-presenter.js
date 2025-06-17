import { StoryModel } from '../model/story-model.js';

export class AddStoryPresenter {
  constructor(view) {
    this.view = view;
    this.model = new StoryModel();

    this.view._onSubmit = async ({ description, photo, lat, lon }) => {
      const token = sessionStorage.getItem('token'); // ⬅️ pakai sessionStorage
      if (!token) {
        alert('Token tidak ditemukan. Silakan login terlebih dahulu.');
        return;
      }

      const formData = new FormData();
      formData.append('description', description);
      formData.append('lat', lat);
      formData.append('lon', lon);
      formData.append('photo', photo, 'photo.jpg');

      try {
        const result = await this.model.postStory(formData, token);
        if (result.error) throw new Error(result.message);

        alert('Cerita berhasil ditambahkan!');
        window.location.hash = '/';
      } catch (err) {
        alert('Gagal menambahkan cerita: ' + err.message);
        console.error(err);
      }
    };
  }
}
