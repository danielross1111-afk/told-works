/* Told Works — site behaviour
 * Sections added: nav scroll state, reveal-on-scroll, lightbox, mobile menu.
 */

// Landing gate: lock the page on load so the user must click Enter to advance.
// Once Enter is clicked we release the lock and smooth-scroll into the site.
(function landingGate() {
  const cue = document.querySelector('.scroll-cue[href="#intro"]');
  const target = document.getElementById('intro');
  if (!cue || !target) return;

  // Arriving with a section anchor (e.g. #work from a subpage Back link)
  // means the user is returning to a specific section, not landing fresh.
  // Skip the gate so the browser can jump them straight to it.
  const hash = window.location.hash;
  if (hash && hash !== '#' && hash !== '#hero') return;

  document.documentElement.classList.add('landing-locked');

  const release = (e) => {
    if (e) e.preventDefault();
    const hero = document.querySelector('.hero');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const goToIntro = () => {
      document.documentElement.classList.remove('landing-locked');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (prefersReduced || !hero) {
      goToIntro();
      return;
    }

    // Cinematic two-beat sequence:
    //   1. Title and cue fade out (0.5s)
    //   2. Walk-through (1.2s) — camera pushes forward into the scene
    //      while it fades to dark, then we scroll into the intro
    hero.classList.add('hero-opening');
    setTimeout(() => hero.classList.add('hero-entering'), 600); // after the content fade
    setTimeout(goToIntro, 1800); // + 1.2s walk-through
  };
  cue.addEventListener('click', release);
})();

// Hero entrance: page opens dark; the title fades in first, then the
// photograph rises behind it, then the Enter cue. Once the image is fully in,
// the title fades back into the atmosphere and the image brightens further to
// take over the foreground (.hero-settled). CSS owns the visuals — we toggle
// classes on the .hero element.
(function heroEntrance() {
  const el = document.querySelector('.hero-image');
  if (!el) return;
  const hero = el.closest('.hero');

  // Title starts revealing on the next frame so the dark state paints first.
  requestAnimationFrame(() => {
    if (hero) hero.classList.add('hero-loaded');
  });

  const TEXT_SETTLE_MS = 2000;     // wait this long before the image rises
  const IMAGE_FADE_MS  = 4000;     // matches the CSS opacity transition
  const SETTLE_BUFFER_MS = 800;    // pause once the image is in, then settle

  const start = Date.now();
  let imageRevealed = false;
  const showImage = () => {
    if (imageRevealed) return;
    imageRevealed = true;
    el.classList.add('is-loaded');
    // After the image has finished fading in, dim the mark and brighten the
    // photograph further so the picture becomes the dominant layer.
    setTimeout(() => {
      if (hero) hero.classList.add('hero-settled');
    }, IMAGE_FADE_MS + SETTLE_BUFFER_MS);
  };
  const reveal = () => {
    const wait = Math.max(0, TEXT_SETTLE_MS - (Date.now() - start));
    setTimeout(showImage, wait);
  };

  // The displayed background lives in CSS (image-set: WebP with a JPEG
  // fallback); the load-gate preloads the same WebP named on the element so
  // the reveal waits for the real photograph, not a guess.
  const src = el.dataset.heroSrc;
  if (!src) { reveal(); return; }
  const img = new Image();
  img.onload = reveal;
  img.onerror = reveal;
  img.src = src;
  if (img.complete) reveal();
  // Safety net: never leave the photograph hidden indefinitely.
  setTimeout(showImage, 5000);
})();

// Hero parallax: the photographic backdrop drifts slower than the page as
// the visitor scrolls off the landing, giving the frame a sense of depth.
// Applied to .hero-bg (not .hero-photo, which owns the pan-out transform)
// so the two motions never fight. Skipped when reduced motion is requested.
(function heroParallax() {
  const bg = document.querySelector('.hero .hero-bg');
  if (!bg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  bg.style.willChange = 'transform';
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    // Only animate while the hero is still on screen.
    if (y > window.innerHeight) return;
    bg.style.transform = 'translate3d(0, ' + (y * 0.25).toFixed(1) + 'px, 0)';
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

// Nav: hidden on the landing hero, fades in once the user starts leaving it.
// On subpages (no .hero) the nav stays visible so navigation is always available.
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const hero = document.querySelector('.hero');
  if (!hero) {
    nav.classList.add('scrolled');
    return;
  }
  const update = () => {
    const trigger = Math.max(120, window.innerHeight * 0.5);
    nav.classList.toggle('scrolled', window.scrollY > trigger);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
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
