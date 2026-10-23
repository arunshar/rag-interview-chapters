// Loaded without defer in <head>, so the theme is set before the first paint and a light-theme reader never sees a dark flash.
(() => {
  'use strict';
  const KEY = 'rag-book-theme';
  function storedTheme() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function systemPrefersLight() {
    try { return matchMedia('(prefers-color-scheme: light)').matches; } catch { return false; }
  }

  // A reader's own click on the theme button wins. A first-time reader follows the operating
  // system's appearance setting, and dark is the fallback when the browser reports none.
  function initialTheme() {
    const stored = storedTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    return systemPrefersLight() ? 'light' : 'dark';
  }

  document.documentElement.dataset.theme = initialTheme();
  window.ragTheme = { KEY };
})();
