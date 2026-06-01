/* Told Works — site behaviour */

// Hero fade: as the user scrolls, hero content and photo fade proportionally.
// The dark background stays, so the intro section rises up seamlessly beneath.
(function heroFade() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const bg      = hero.querySelector('.hero-bg');
  const content = hero.querySelector('.hero-content');
  const foot    = hero.querySelector('.hero-foot');
  const update = () => {
    const opacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.55));
    if (bg)      bg.style.opacity      = opacity;
    if (content) content.style.opacity = opacity;
    if (foot)    foot.style.opacity    = opacity;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Hero entrance: dark open, title fades in, then photograph rises behind it.
(function heroEntrance() {
  const el = document.querySelector('.hero-image');
  if (!el) return;
  const hero = el.closest('.hero');

  requestAnimationFrame(() => { if (hero) hero.classList.add('hero-loaded'); });

  const TEXT_SETTLE_MS   = 2000;
  const IMAGE_FADE_MS    = 4000;
  const SETTLE_BUFFER_MS = 800;

  const start = Date.now();
  let imageRevealed = false;
  const showImage = () => {
    if (imageRevealed) return;
    imageRevealed = true;
    el.classList.add('is-loaded');
    setTimeout(() => { if (hero) hero.classList.add('hero-settled'); }, IMAGE_FADE_MS + SETTLE_BUFFER_MS);
  };
  const reveal = () => {
    const wait = Math.max(0, TEXT_SETTLE_MS - (Date.now() - start));
    setTimeout(showImage, wait);
  };
  const src = el.dataset.heroSrc;
  if (!src) { reveal(); return; }
  const img = new Image();
  img.onload = reveal;
  img.onerror = reveal;
  img.src = src;
  if (img.complete) reveal();
  setTimeout(showImage, 5000);
})();

// Hero parallax: photo drifts slower than the page as user scrolls away.
(function heroParallax() {
  const bg = document.querySelector('.hero .hero-bg');
  if (!bg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  bg.style.willChange = 'transform';
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if (y > window.innerHeight) return;
    bg.style.transform = 'translate3d(0, ' + (y * 0.25).toFixed(1) + 'px, 0)';
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

// Nav: hidden on hero, fades in once user scrolls away.
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const hero = document.querySelector('.hero');
  if (!hero) { nav.classList.add('scrolled'); return; }
  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > Math.max(120, window.innerHeight * 0.5));
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

// Reveal-on-scroll
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// Lightbox
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
      previousFocus.focus(); previousFocus = null;
    }
  };
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      open(el.getAttribute('data-lightbox'), el.getAttribute('data-lightbox-sub'));
    });
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

// Mobile menu
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
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
})();
