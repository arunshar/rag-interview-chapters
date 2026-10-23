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

  // Decide which theme a page opens in. Return 'light' or 'dark'.
  // storedTheme() is the reader's last click on the theme button, or null if they never clicked it.
  // systemPrefersLight() reports the operating system's appearance setting.
  function initialTheme() {
    // TODO(Arun): choose the precedence between the stored choice, the system setting, and a default.
    return storedTheme() === 'light' ? 'light' : 'dark';
  }

  document.documentElement.dataset.theme = initialTheme();
  window.ragTheme = { KEY };
})();
