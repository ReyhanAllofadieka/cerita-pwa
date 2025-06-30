import { routes } from './router.js';
import { StoryModel } from './model/story-model.js';
import { StoryPresenter } from './presenter/story-presenter.js';
import { AddPageView } from './page/add-view.js';
import { AddStoryPresenter } from './presenter/add-story-presenter.js';
import { LoginPageView } from './page/login-view.js';
import { LoginPresenter } from './presenter/login-presenter.js';
import { RegisterPageView } from './page/register-view.js';
import { RegisterPresenter } from './presenter/register-presenter.js';
import './scripts/push-notification.js';

// ✅ Render navigasi dinamis
function renderNavigation() {
  const nav = document.getElementById('nav');
  const token = sessionStorage.getItem('token');

  nav.innerHTML = `
    <a href="#/">Home</a>
    ${token ? '<a href="#/add">Tambah Cerita</a>' : ''}
    ${token ? '<a href="#/favorites">Favorit Saya</a>' : ''}
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

  const token = sessionStorage.getItem('token');
  if (!token && hash !== '/login' && hash !== '/register') {
    window.location.hash = '/login';
    return;
  }

  const renderPage = () => {
    content.innerHTML = '';
    const PageView = routes[hash];

    if (PageView) {
      const view = new PageView();

      if (typeof view.getHtml === 'function') {
        // ✅ Untuk FavoriteView (pakai getHtml)
        view.getHtml().then((html) => {
          content.innerHTML = html;
          if (typeof view.afterRender === 'function') view.afterRender();
        });
      } else {
        // ✅ Untuk halaman biasa (pakai render)
        view.render();
        if (typeof view.afterRender === 'function') view.afterRender();

        if (hash === '/') {
          const model = new StoryModel();
          const presenter = new StoryPresenter(model, view);
          presenter.loadStories();
        }

        if (hash === '/add') {
          new AddStoryPresenter(view);
        }

        if (hash === '/login') {
          new LoginPresenter(view);
        }

        if (hash === '/register') {
          new RegisterPresenter(view);
        }
      }
    } else {
      content.innerHTML = '<h2>404 - Halaman Tidak Ditemukan</h2>';
    }
  };

  if (document.startViewTransition) {
    document.startViewTransition(() => renderPage());
  } else {
    renderPage();
  }
}

// ✅ Service Worker & Push Notification
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);

      const vapidKey = "BO4VNQOZ3CIkaVTaTZe-vnH9gghzMFqI6oFyY3D9dOuE9wD1kWDw8mTb3LaY8MZ9wDAItE0f6FqFVdKzBS2nAH8"; // ganti dengan VAPID key dummy kamu
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey
      });

      console.log("Push subscribed!");
    } catch (err) {
      console.error("SW registration or push failed", err);
    }
  });
}

// ✅ Router listener
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
