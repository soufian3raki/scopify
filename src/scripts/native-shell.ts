import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';

/** Android WebView often fails on directory URLs like /home/; point them at index.html. */
function fixDirectoryLinks() {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        return;
      }

      // "/home/" or "/home" → "/home/index.html"
      const path = href.split('?')[0].split('#')[0];
      if (!path || path.includes('.')) return;

      event.preventDefault();
      const normalized = path.endsWith('/') ? `${path}index.html` : `${path}/index.html`;
      const suffix = href.slice(path.length);
      window.location.assign(normalized + suffix);
    },
    true,
  );
}

async function initNativeShell() {
  if (Capacitor.isNativePlatform()) {
    // Native Capacitor shell
  } else if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  if (!Capacitor.isNativePlatform()) return;

  fixDirectoryLinks();

  try {
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#591727' });
  } catch {
    // StatusBar may be unavailable on some platforms
  }

  try {
    await SplashScreen.hide();
  } catch {
    // SplashScreen may already be hidden
  }

  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
}

initNativeShell();
