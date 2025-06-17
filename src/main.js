import { routes } from './router.js';
import { StoryModel } from './model/story-model.js';
import { StoryPresenter } from './presenter/story-presenter.js';
import { AddPageView } from './page/add-view.js';
import { AddStoryPresenter } from './presenter/add-story-presenter.js';
import { LoginPageView } from './page/login-view.js';
import { LoginPresenter } from './presenter/login-presenter.js';
import { RegisterPageView } from './page/register-view.js';
import { RegisterPresenter } from './presenter/register-presenter.js';

// ✅ Render navigasi dinamis (pakai sessionStorage)
function renderNavigation() {
  const nav = document.getElementById('nav');
  const token = sessionStorage.getItem('token');

  nav.innerHTML = `
    <a href="#/">Home</a>
    ${token ? '<a href="#/add">Tambah Cerita</a>' : ''}
    ${token ? '<a href="#" id="logoutLink">Logout</a>' : '<a href="#/login">Login</a>'}
  `;

  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('token');
      alert('Berhasil logout');
      window.location.hash = '/login';
      renderNavigation();
    });
  }
}

let currentHash = '';

function router() {
  const hash = location.hash.slice(1) || '/';
  if (hash === currentHash) return;
  currentHash = hash;

  const content = document.getElementById('app');
  renderNavigation();

  const token = sessionStorage.getItem('token'); // ✅ validasi di awal
  if (!token && hash !== '/login' && hash !== '/register') {
    window.location.hash = '/login';
    return;
  }

  const renderPage = () => {
    content.innerHTML = '';
    const PageView = routes[hash];
    if (PageView) {
      const view = new PageView();
      view.render();

      if (typeof view.afterRender === 'function') {
        view.afterRender();
      }

      if (hash === '/') {
        const model = new StoryModel();
        const presenter = new StoryPresenter(model, view);
        presenter.loadStories();
      }

      if (hash === '/add') {
        const presenter = new AddStoryPresenter(view);
      }

      if (hash === '/login') {
        const presenter = new LoginPresenter(view);
      }

      if (hash === '/register') {
        const presenter = new RegisterPresenter(view);
      }
    } else {
      content.innerHTML = '<h2>404 - Halaman Tidak Ditemukan</h2>';
    }
  };

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      renderPage();
    });
  } else {
    renderPage();
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);

      // Dummy VAPID key
      const vapidKey = "BLSF..._dummy_key"; // pakai public VAPID key dummy
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey
      });

      console.log("Push subscribed:", subscription);
    } catch (err) {
      console.error("SW registration failed", err);
    }
  });
}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);
