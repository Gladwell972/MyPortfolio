(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = [...document.querySelectorAll('.nav-link')];

  // Theme preference is kept for the current browser session.
  const savedTheme = (() => { try { return localStorage.getItem('gs-theme'); } catch { return null; } })();
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;


  function updateThemeControl() {
      const dark = root.dataset.theme === 'dark';

      themeIcon.textContent = dark ? '☀️' : '🌙';

      themeToggle.setAttribute(
          'aria-label',
          dark ? 'Switch to light mode' : 'Switch to dark mode'
      );

      themeToggle.setAttribute(
          'title',
          dark ? 'Switch to light mode' : 'Switch to dark mode'
      );

      document.querySelector('meta[name="theme-color"]')
          ?.setAttribute('content', dark ? '#080b12' : '#ffffff');
  }


  updateThemeControl();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('gs-theme', root.dataset.theme); } catch {}
    updateThemeControl();
  });

  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  navItems.forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));
  }
  document.getElementById('year').textContent = new Date().getFullYear();

  
})();