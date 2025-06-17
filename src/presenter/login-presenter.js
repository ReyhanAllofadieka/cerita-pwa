import { Api } from '../api/api.js';

export class LoginPresenter {
  constructor(view) {
    this.view = view;

    this.view._onSubmit = async ({ email, password }) => {
      try {
        const result = await Api.login(email, password);
        if (result.error) throw new Error(result.message);

        sessionStorage.setItem('token', result.loginResult.token); // ⬅️ pakai sessionStorage
        alert('Login berhasil!');
        window.location.hash = '/';
      } catch (error) {
        alert('Login gagal: ' + error.message);
      }
    };
  }
}
