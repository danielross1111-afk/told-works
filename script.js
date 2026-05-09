/* Told Works — site behaviour
 * Sections added: nav scroll state, reveal-on-scroll, lightbox, mobile menu.
 */

// Nav: add .scrolled class once user has scrolled past the hero apex
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Reveal-on-scroll using IntersectionObserver
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();

// Lightbox: click anything with data-lightbox to open overlay
(function lightbox() {
  const lb = document.getElementById('lightbox');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbSub = document.getElementById('lightboxSub');
  const lbClose = document.getElementById('lightboxClose');
  if (!lb) return;

  let previousFocus = null;

  const open = (title, sub) => {
    previousFocus = document.activeElement;
    lbTitle.textContent = title;
    lbSub.textContent = sub || '';
    lb.classList.add('on');
    lb.setAttribute('aria-hidden', 'false');
    lbClose.focus();
  };
  const close = () => {
    lb.classList.remove('on');
    lb.setAttribute('aria-hidden', 'true');
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
      previousFocus = null;
    }
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      // Allow modifier-click to follow the link as normal
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      open(el.getAttribute('data-lightbox'), el.getAttribute('data-lightbox-sub'));
    });
  });

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(el.getAttribute('data-lightbox'), el.getAttribute('data-lightbox-sub'));
      }
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// Mobile menu toggle
(function menu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  const setOpen = (isOpen) => {
    links.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });
})();
