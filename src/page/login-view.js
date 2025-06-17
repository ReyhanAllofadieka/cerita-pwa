export class LoginPageView {
  constructor() {
    this._onSubmit = null;
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2>Login</h2>
      <form id="loginForm">
        <label for="emailInput">Email</label>
        <input type="email" id="emailInput" placeholder="Email" required />

        <label for="passwordInput">Password</label>
        <input type="password" id="passwordInput" placeholder="Password" required />

        <button type="submit" aria-label="Masuk ke aplikasi">Login</button>
      </form>
      <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      this._onSubmit?.({ email, password });
    });
  }
}
