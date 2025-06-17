import { HomePageView } from './page/story-view.js';
import { AddPageView } from './page/add-view.js';
import { LoginPageView } from './page/login-view.js';
import { RegisterPageView } from './page/register-view.js';

export const routes = {
  '/': HomePageView,
  '/add': AddPageView,
  '/login': LoginPageView,
  '/register': RegisterPageView,
};
