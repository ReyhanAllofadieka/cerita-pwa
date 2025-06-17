
import { Api } from '../api/api.js';

export class RegisterPresenter {
  constructor(view) {
    this.view = view;

    this.view._onSubmit = async ({ name, email, password }) => {
      try {
        const result = await Api.register(name, email, password);
        if (result.error) throw new Error(result.message);

        alert('Pendaftaran berhasil! Silakan login.');
        window.location.hash = '/login';
      } catch (error) {
        alert('Pendaftaran gagal: ' + error.message);
      }
    };
  }
}
