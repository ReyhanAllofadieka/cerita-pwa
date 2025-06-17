export class RegisterPageView {
  constructor() {
    this._onSubmit = null;
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2>Daftar</h2>
      <form id="registerForm">
        <label for="nameInput">Nama</label>
        <input type="text" id="nameInput" placeholder="Nama lengkap" required />

        <label for="emailInput">Email</label>
        <input type="email" id="emailInput" placeholder="Email" required />

        <label for="passwordInput">Password</label>
        <input type="password" id="passwordInput" placeholder="Password" required />

        <button type="submit" aria-label="Buat akun baru">Daftar</button>
      </form>
    `;

    document.getElementById('registerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      this._onSubmit?.({ name, email, password });
    });
  }
}
