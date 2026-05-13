import { NAVIGATION } from './app-routes.js';
import '../pages/transfer-dashboard.js';

const routeMap = new Map(NAVIGATION.map(({ path, page }) => [path, page]));

const renderRoute = () => {
  const appRoot = document.getElementById('app');

  if (!appRoot) {
    return;
  }

  const pathname = window.location.pathname || '/';
  const elementName = routeMap.get(pathname) || routeMap.get('/');

  if (!elementName) {
    return;
  }

  const view = document.createElement(elementName);
  appRoot.replaceChildren(view);
};

window.addEventListener('popstate', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);