(() => {
  'use strict';
  const script = document.currentScript;
  const root = script.dataset.root || '';
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* Reading also works without storage. */ } }
  };
  const themeButton = document.querySelector('#theme-toggle');
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const next = theme === 'dark' ? 'light' : 'dark';
    themeButton.textContent = `${next[0].toUpperCase() + next.slice(1)} theme`;
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
  }
  setTheme(storage.get('rag-book-theme') === 'light' ? 'light' : 'dark');
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    storage.set('rag-book-theme', theme);
    setTheme(theme);
  });
  document.querySelector('#print-button').addEventListener('click', () => window.print());
  const menuButton = document.querySelector('#menu-toggle');
  const shade = document.querySelector('#menu-shade');
  function menu(open) {
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    shade.hidden = !open;
    if (open) document.querySelector('#chapter-search').focus();
  }
  menuButton.addEventListener('click', () => menu(!document.body.classList.contains('menu-open')));
  shade.addEventListener('click', () => { menu(false); menuButton.focus(); });
  const search = document.querySelector('#chapter-search');
  const groups = [...document.querySelectorAll('.nav-group')];
  let originalOpen = null;
  search.addEventListener('input', () => {
    const query = search.value.toLowerCase().trim();
    if (query && originalOpen === null) originalOpen = groups.map(group => group.open);
    let count = 0;
    groups.forEach((group, index) => {
      let visible = 0;
      group.querySelectorAll('li').forEach(item => {
        const match = item.textContent.toLowerCase().includes(query);
        item.hidden = !match;
        if (match) visible++;
      });
      group.hidden = visible === 0;
      if (query) group.open = true;
      else if (originalOpen) group.open = originalOpen[index];
      count += visible;
    });
    if (!query) originalOpen = null;
    document.querySelector('#no-results').hidden = count > 0;
    document.querySelector('#search-status').textContent = query ? `${count} chapters found` : '';
  });
  document.addEventListener('keydown', event => {
    const isInput = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if (event.key === '/' && !isInput && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      if (matchMedia('(max-width: 800px)').matches) menu(true);
      search.focus();
    }
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) { menu(false); menuButton.focus(); }
  });
  document.querySelectorAll('.sidebar a').forEach(a => a.addEventListener('click', () => menu(false)));
  const page = document.body.dataset.page;
  if (document.body.dataset.chapter === 'true') {
    storage.set('rag-book-last-page', page);
    storage.set('rag-book-last-title', document.querySelector('h1').textContent);
    const fill = document.querySelector('#reading-progress-fill');
    function progress() {
      const distance = document.documentElement.scrollHeight - innerHeight;
      fill.style.width = `${distance > 0 ? Math.min(100, Math.max(0, scrollY / distance * 100)) : 100}%`;
    }
    addEventListener('scroll', progress, {passive: true});
    addEventListener('resize', progress);
    progress();
  } else if (page === 'index.html') {
    const last = storage.get('rag-book-last-page');
    const link = document.querySelector('#resume-reading');
    if (last && /^chapters\/[A-Za-z0-9_]+\.html$/.test(last)) {
      link.href = last;
      link.textContent = `Continue reading: ${storage.get('rag-book-last-title') || 'your last chapter'} →`;
      link.hidden = false;
    }
  }
  const diagrams = [...document.querySelectorAll('.diagram')];
  if (!diagrams.length) return;
  let library;
  function loadMermaid() {
    if (library) return library;
    library = new Promise((resolve, reject) => {
      const tag = document.createElement('script');
      tag.src = `${root}assets/mermaid.min.js`;
      tag.onload = () => {
        window.mermaid.initialize({startOnLoad: false, securityLevel: 'strict', theme: 'dark', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'});
        resolve(window.mermaid);
      };
      tag.onerror = () => reject(new Error('Diagram renderer unavailable'));
      document.head.appendChild(tag);
    });
    return library;
  }
  let queue = Promise.resolve();
  let nextId = 0;
  function render(figure) {
    if (figure.dataset.queued) return;
    figure.dataset.queued = 'true';
    queue = queue.then(async () => {
      const target = figure.querySelector('.diagram-view');
      try {
        const mermaid = await loadMermaid();
        const result = await mermaid.render(`rag-diagram-${nextId++}`, figure.querySelector('.mermaid-source').textContent);
        target.innerHTML = result.svg;
      } catch {
        target.removeAttribute('role');
        target.classList.add('diagram-error');
        target.textContent = 'Diagram preview is unavailable. The complete source is shown below.';
        figure.querySelector('details').open = true;
      }
    });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { render(entry.target); observer.unobserve(entry.target); }
    }), {rootMargin: '500px'});
    diagrams.forEach(figure => observer.observe(figure));
  } else diagrams.forEach(render);
  addEventListener('beforeprint', () => diagrams.forEach(figure => {
    if (!figure.querySelector('svg')) figure.querySelector('details').open = true;
  }));
})();
