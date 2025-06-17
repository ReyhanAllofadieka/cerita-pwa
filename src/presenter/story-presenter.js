export class StoryPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async loadStories() {
    const token = sessionStorage.getItem('token'); // ⬅️ pakai sessionStorage
    if (!token) {
      this.view.showError('Token tidak ditemukan. Silakan login.');
      return;
    }

    this.view.showLoading?.();

    try {
      const result = await this.model.getStories(token);
      if (!result || result.error) throw new Error(result.message);
      this.view.showStories(result.listStory);
    } catch (error) {
      this.view.showError('Gagal memuat data.');
      console.error(error);
    }
  }
}
