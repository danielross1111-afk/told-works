# Told Works Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Told Works static website per [the design spec](../specs/2026-05-10-told-works-design.md) — a long-scroll homepage plus four dedicated commission pages, dark editorial aesthetic, no framework.

**Architecture:** Plain HTML, CSS, and vanilla JS. No build step. Shared `styles.css` and `script.js`. Each commission page is a standalone HTML file under `/work/<slug>/index.html`. Image library is referenced via `images/` paths but uses placeholder treatment in v1 (real images dropped in later).

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS (IntersectionObserver), Google Fonts (Cormorant Garamond + Inter). No bundler, no preprocessor, no framework.

**Working directory:** `C:\claude-cowork\told-works\`

**Verification model:** This is a static site with no test framework. Each task ends with opening the page in a browser at `http://localhost:8000/` (run `python -m http.server 8000` from the project root) and visually confirming the acceptance criteria. Commits are made after each verified task.

---

## File Structure

```
told-works/
├── index.html                       # Homepage
├── styles.css                       # All shared styles
├── script.js                        # Nav scroll, reveal animations, lightbox, mobile menu
├── work/
│   ├── the-cellar/index.html        # /work/the-cellar
│   ├── the-sixteen/index.html       # /work/the-sixteen
│   ├── the-threshold/index.html     # /work/the-threshold
│   └── workshop/index.html          # /work/workshop
└── images/
    └── README.md                    # List of expected image filenames
```

`styles.css` is the single source of styling. Subpages reuse it. `script.js` is the single source of behaviour.

---

## Task 1: Project foundation

**Files:**
- Modify (replace): `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `images/README.md`

- [ ] **Step 1: Initialise git and clean the old draft**

Run from `C:\claude-cowork\told-works\`:

```bash
git init
git add -A
git commit -m "chore: snapshot pre-rebuild draft" --allow-empty
```

Then delete the existing `index.html` content — it will be replaced in Step 3.

- [ ] **Step 2: Create the file tree**

Run from `C:\claude-cowork\told-works\`:

```bash
mkdir -p work/the-cellar work/the-sixteen work/the-threshold work/workshop images
```

- [ ] **Step 3: Write the base `index.html` skeleton**

Replace the entire contents of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Told Works — Dan Ross · Bespoke Architectural Commissions, Queenstown NZ</title>
  <meta name="description" content="Pieces that tell the story the place is already telling. Bespoke architectural commissions, installations and objects from Dan Ross's Queenstown workshop.">
  <meta name="author" content="Dan Ross">
  <meta name="theme-color" content="#0E0D0B">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- Sections inserted in subsequent tasks -->

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 4: Write the base `styles.css`**

Create `styles.css` with reset, custom properties, body base, and grain overlay:

```css
/* ─── RESET ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

/* ─── DESIGN TOKENS ─── */
:root {
  --ink:           #0E0D0B;
  --ink-2:         #15130F;
  --ink-3:         #1C1A16;
  --bone:          #E8E2D4;
  --bone-dim:      #B8B1A1;
  --bone-mute:     #6F6A5E;
  --pounamu:       #4A6B54;
  --pounamu-light: #7A9482;
  --ember:         #B8784A;
  --line:          rgba(232, 226, 212, 0.08);
  --line-strong:   rgba(232, 226, 212, 0.18);

  --max-w: 1200px;
  --gutter: 3rem;
  --section-y: 8rem;
}

/* ─── BODY ─── */
body {
  background: var(--ink);
  color: var(--bone);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 300;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

/* Grain overlay — 4% noise across the body */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9000;
  mix-blend-mode: overlay;
}

.serif { font-family: 'Cormorant Garamond', Georgia, serif; }

.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

section { padding: var(--section-y) 0; position: relative; }
```

- [ ] **Step 5: Write the empty `script.js`**

Create `script.js` with a single comment header:

```javascript
/* Told Works — site behaviour
 * Sections added: nav scroll state, reveal-on-scroll, lightbox, mobile menu.
 */
```

- [ ] **Step 6: Write `images/README.md`**

```markdown
# Image library

Image files are reused from the soulcraft-v24 portfolio. Until they are dropped in, the site renders placeholder gradients via CSS.

## Expected files (homepage)
- guardian-heroes.jpeg            — hero atmosphere image (The Sixteen)
- cellar-completed.jpeg           — Selected Work card 1
- sixteen-installed.jpg           — Selected Work card 2
- threshold-complete-evening.jpeg — Selected Work card 3
- the-finished-goblet.jpg         — Selected Work card 4 (workshop)

## Expected files (per work page)
The full sequence per piece — under construction → build progress → completed — as listed in `soulcraft-v24.html`.
```

- [ ] **Step 7: Verify and commit**

Start a local server from the project root and open the page:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` in a browser.

Expected: a near-black page (#0E0D0B), the cream body colour confirms when text appears later, no console errors, no layout. Window title reads "Told Works — Dan Ross · Bespoke Architectural Commissions, Queenstown NZ".

```bash
git add index.html styles.css script.js images/README.md
git commit -m "chore: project foundation — tokens, fonts, file tree"
```

---

## Task 2: Navigation

**Files:**
- Modify: `index.html` (insert `<nav>` block before any other body content)
- Modify: `styles.css` (append nav styles)
- Modify: `script.js` (append scroll-state behaviour)

- [ ] **Step 1: Add nav markup to `index.html`**

Insert immediately after `<body>`:

```html
  <nav id="nav">
    <a href="#" class="brand serif">TOLD<span>·</span>WORKS</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Open menu">≡</button>
    <ul class="nav-links" id="navLinks">
      <li><a href="#practice">Practice</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#standard">Standard</a></li>
      <li><a class="nav-enquire" href="#commission">Enquire</a></li>
    </ul>
  </nav>
```

- [ ] **Step 2: Append nav styles to `styles.css`**

```css
/* ─── NAV ─── */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(14, 13, 11, 0.6);
  border-bottom: 1px solid transparent;
  transition: padding 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}
nav.scrolled {
  padding: 1rem 3rem;
  background: rgba(14, 13, 11, 0.92);
  border-bottom-color: var(--line);
}

.brand {
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--bone);
  text-decoration: none;
  font-weight: 400;
}
.brand span { color: var(--pounamu-light); }

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  align-items: center;
}
.nav-links a {
  color: var(--bone-dim);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transition: color 0.3s;
  position: relative;
  padding-bottom: 4px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--pounamu-light);
  transition: width 0.4s ease;
}
.nav-links a:hover { color: var(--bone); }
.nav-links a:hover::after { width: 100%; }

.nav-enquire {
  border: 1px solid var(--ember);
  color: var(--bone) !important;
  padding: 0.65rem 1.4rem;
  letter-spacing: 0.25em;
  transition: background 0.4s, color 0.4s, letter-spacing 0.3s;
}
.nav-enquire::after { display: none; }
.nav-enquire:hover {
  background: var(--ember);
  color: var(--ink) !important;
  letter-spacing: 0.32em;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--bone);
  font-size: 1.6rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
}
```

- [ ] **Step 3: Append nav scroll behaviour to `script.js`**

```javascript
// Nav: add .scrolled class once user has scrolled past the hero apex
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
```

- [ ] **Step 4: Verify in browser**

Reload `http://localhost:8000/`.

Expected:
- Nav fixed at top, wordmark `TOLD·WORKS` left (the · in pounamu green).
- Four right-side items: Practice, Work, Standard, and the outlined Enquire button.
- Background semi-transparent on initial load.
- Scroll a little: nav background becomes opaque, padding tightens, hairline border appears.
- Hover any link: the underline animates from left to right.
- Hover Enquire: fills with ember, letter-spacing expands.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat(nav): fixed nav with blurred backdrop and scroll state"
```

---

## Task 3: Hero section

**Files:**
- Modify: `index.html` (insert `<header class="hero">` after `</nav>`)
- Modify: `styles.css` (append hero styles)

- [ ] **Step 1: Add hero markup to `index.html`**

Insert after `</nav>`:

```html
  <!-- ───────── HERO ───────── -->
  <header class="hero">
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-glow"></div>
    </div>

    <div class="hero-content">
      <div class="eyebrow eyebrow-center">Dan Ross · Selected Works</div>
      <h1 class="hero-h1 serif">
        Pieces that tell<br>
        the story <em>the place</em><br>
        is already telling.
      </h1>
      <p class="hero-sub">Bespoke architectural pieces, installations and objects from a Queenstown workshop. The work amplifies what is already there — the design, the material, the lives that will unfold around it.</p>

      <div class="hero-meta">
        <span>By invitation</span>
        <span class="dot">·</span>
        <span class="ember">Late 2026 availability</span>
        <span class="dot">·</span>
        <span>Queenstown, Aotearoa</span>
      </div>
    </div>

    <div class="scroll-cue">Enter</div>
  </header>
```

- [ ] **Step 2: Append hero styles to `styles.css`**

```css
/* ─── HERO ─── */
.hero {
  height: 100vh;
  min-height: 720px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6rem 2rem 0;
  background: radial-gradient(ellipse at center, var(--ink-2) 0%, var(--ink) 70%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(74, 107, 84, 0.18) 0%, transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(184, 120, 74, 0.10) 0%, transparent 55%);
  opacity: 0.85;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 920px;
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--pounamu-light);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 400;
  margin-bottom: 2.2rem;
}
.eyebrow::before {
  content: '';
  width: 30px;
  height: 1px;
  background: var(--pounamu-light);
}
.eyebrow-center { justify-content: center; }
.eyebrow-center::after {
  content: '';
  width: 30px;
  height: 1px;
  background: var(--pounamu-light);
}

.hero-h1 {
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin-bottom: 2rem;
  color: var(--bone);
}
.hero-h1 em {
  font-style: italic;
  color: var(--pounamu-light);
}

.hero-sub {
  font-size: 1.05rem;
  color: var(--bone-dim);
  max-width: 580px;
  margin: 0 auto 3rem;
  line-height: 1.75;
}

.hero-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1.4rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bone-dim);
}
.hero-meta .dot { color: var(--bone-mute); }
.hero-meta .ember { color: var(--ember); }

.scroll-cue {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--bone-mute);
  z-index: 2;
}
.scroll-cue::after {
  content: '';
  display: block;
  width: 1px;
  height: 44px;
  background: var(--bone-mute);
  margin: 1rem auto 0;
  animation: scrollPulse 2s ease-in-out infinite;
  transform-origin: top;
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(1); opacity: 0.4; }
  50%      { transform: scaleY(0.3); opacity: 1; }
}
```

- [ ] **Step 3: Verify in browser**

Reload. Expected:
- Hero fills viewport. Eyebrow centred with hairline rules either side.
- Big italic display headline ("the place" italicised in pounamu green).
- Sub paragraph in dim cream below, max ~580px wide.
- Meta strip at bottom of content with three items, the middle one ("Late 2026 availability") in ember.
- "Enter" cue at the very bottom with a vertical line that pulses.
- Subtle pounamu/ember glow behind the content (low opacity).

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(hero): centred editorial hero with glow and selectivity meta"
```

---

## Task 4: Press strip

**Files:**
- Modify: `index.html` (insert after `</header>`)
- Modify: `styles.css` (append press styles)

- [ ] **Step 1: Add press markup**

Insert after `</header>`:

```html
  <!-- ───────── PRESS STRIP ───────── -->
  <aside class="press" aria-label="Selected credentials">
    <div class="container">
      <div class="press-eye">Built by Ross Brothers · Recognised by NZIA</div>
      <div class="press-row">
        <span class="press-item">Mason &amp; Wales Architects</span>
        <span class="press-sep" aria-hidden="true"></span>
        <span class="press-item">Anna-Marie Chin Architects</span>
        <span class="press-sep" aria-hidden="true"></span>
        <a class="press-item press-link" href="https://www.nzia.co.nz/awards/new-zealand-architecture-awards/lake-hayes-cottage/9307/" target="_blank" rel="noopener">Lake Hayes Cottage — NZIA National 2020</a>
        <span class="press-sep" aria-hidden="true"></span>
        <a class="press-item press-link" href="https://www.nzia.co.nz/awards/local-architecture-awards/maunga-ora/11027/" target="_blank" rel="noopener">Maunga Ora — Southern 2023</a>
      </div>
    </div>
  </aside>
```

- [ ] **Step 2: Append press styles to `styles.css`**

```css
/* ─── PRESS STRIP ─── */
.press {
  padding: 1.6rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--ink-2);
}
.press-eye {
  text-align: center;
  font-size: 0.62rem;
  letter-spacing: 0.45em;
  color: var(--pounamu-light);
  text-transform: uppercase;
  margin-bottom: 0.9rem;
}
.press-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
  font-family: 'Cormorant Garamond', serif;
}
.press-item {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  color: var(--bone-dim);
  text-decoration: none;
  transition: color 0.3s;
}
.press-link { color: var(--bone); border-bottom: 1px solid var(--line-strong); padding-bottom: 2px; }
.press-link:hover { color: var(--pounamu-light); border-bottom-color: var(--pounamu-light); }
.press-sep {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--bone-mute);
  opacity: 0.5;
}
```

- [ ] **Step 3: Verify**

Reload, scroll past the hero. Expected: a thin strip in slightly lighter ink with a centred small-caps eyebrow above a single horizontal line of credentials separated by tiny dots. The two NZIA links are underlined and shift to pounamu green on hover.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(press): credentials strip below hero"
```

---

## Task 5: Practice section

**Files:**
- Modify: `index.html` (insert after press strip)
- Modify: `styles.css` (append practice styles)

- [ ] **Step 1: Add practice markup**

Insert after `</aside>`:

```html
  <!-- ───────── PRACTICE ───────── -->
  <section id="practice" class="practice">
    <div class="container">
      <div class="eyebrow reveal">The Practice</div>
      <h2 class="section-title serif reveal">He builds the feeling first.</h2>

      <div class="practice-grid">
        <div class="practice-text reveal">
          <p>For more than twenty-five years, Dan Ross has built some of the most demanding residential architecture in New Zealand. Through Trinity QT Construction he ran three successive Mason &amp; Wales residences. Through his own company, Ross Brothers, he then built two NZIA-recognised homes — the 2020 National Award–winning Lake Hayes Cottage with Anna-Marie Chin Architects, and Maunga Ora with Mason &amp; Wales.</p>
          <p>He no longer builds houses. Now he works alone, on a small number of commissions each year — architectural pieces, installations and objects made for the people and places that are worth the time it takes.</p>
          <p>Each one begins the same way: a conversation about what the space is already saying, and what the work needs to do to amplify it. Three to four commissions a year. <em>He visits the site before he agrees to anything.</em></p>
        </div>

        <aside class="pull-quote reveal">
          <p>"Timber passes through many hands. By the time it reaches us, it has already lived a long life. You have to honour that tree — give it justice, let its beauty be seen.</p>
          <p>When timber, stone and concrete are brought together with care, you reunite elements that once lived together in nature. Done well, they resonate as one."</p>
          <cite>— Dan Ross</cite>
        </aside>
      </div>

      <div class="practice-facts reveal">
        <div class="fact"><div class="fact-n serif">25+ Years</div><div class="fact-l">Building &amp; Making</div></div>
        <div class="fact"><div class="fact-n serif">5 Builds</div><div class="fact-l">Mason &amp; Wales Architect</div></div>
        <div class="fact"><div class="fact-n serif">2 NZIA</div><div class="fact-l">Ross Brothers Residences</div></div>
        <div class="fact"><div class="fact-n serif">National Award</div><div class="fact-l">Lake Hayes Cottage · 2020</div></div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append practice + shared section-title styles to `styles.css`**

```css
/* ─── SECTION TITLE (shared) ─── */
.section-title {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.005em;
  margin: 1.4rem 0 3rem;
  max-width: 820px;
  color: var(--bone);
}
.section-title em { font-style: italic; color: var(--pounamu-light); }

/* ─── PRACTICE ─── */
.practice { background: var(--ink); border-bottom: 1px solid var(--line); }

.practice-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: start;
  margin-bottom: 4rem;
}
.practice-text p {
  color: var(--bone-dim);
  font-size: 1.05rem;
  line-height: 1.85;
  margin-bottom: 1.5rem;
}
.practice-text p:last-child { margin-bottom: 0; }
.practice-text em { font-style: italic; color: var(--bone); }

.pull-quote {
  padding: 0.4rem 0 0.4rem 2rem;
  border-left: 1px solid var(--pounamu-light);
}
.pull-quote p {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.65;
  color: var(--bone);
  margin-bottom: 1rem;
}
.pull-quote p:last-of-type { margin-bottom: 1.4rem; }
.pull-quote cite {
  display: block;
  font-style: normal;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--pounamu-light);
  text-transform: uppercase;
}

.practice-facts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--line);
}
.fact {
  padding: 1.6rem 1.8rem;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.fact:last-child { border-right: none; }
.fact-n {
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--bone);
  font-style: italic;
}
.fact-l {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bone-mute);
}
```

- [ ] **Step 3: Verify**

Reload, scroll past the press strip. Expected:
- Eyebrow "The Practice" with pounamu rule.
- Italic headline "He builds the feeling first." with `the feeling` in italic pounamu green.
- Two-column grid: bio on the left, an italic pull-quote with a left pounamu rule on the right.
- A four-cell facts strip below with hairline borders between cells.

(Reveal classes have no effect yet — they activate in Task 11.)

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(practice): bio, pull-quote, and practice facts grid"
```

---

## Task 6: Selected Work section

**Files:**
- Modify: `index.html` (insert after practice)
- Modify: `styles.css` (append work-card styles)

- [ ] **Step 1: Add Selected Work markup**

Insert after the practice `</section>`:

```html
  <!-- ───────── SELECTED WORK ───────── -->
  <section id="work" class="work-section">
    <div class="container">
      <div class="eyebrow reveal">Selected Work</div>
      <h2 class="section-title serif reveal">Four pieces, told <em>through their making.</em></h2>

      <div class="work-list">
        <article class="work-card reveal">
          <a class="work-img placeholder" href="work/the-cellar/" aria-label="View The Cellar &amp; The Racks">
            <span class="work-img-tag">N° 01</span>
            <span class="placeholder-label">The Cellar — completed</span>
          </a>
          <div class="work-body">
            <div class="work-meta">Commission · Wine cellar</div>
            <h3 class="serif">The Cellar &amp; <em>The Racks.</em></h3>
            <p>When budget pressure threatened the brief, the constraint became the brief. Cellar walls in salvaged timber and hessian, driveway-bank roots set into the walls. Wine racks built from reclaimed stock, conceived as architecture rather than furniture.</p>
            <a class="work-link" href="work/the-cellar/">View the full piece →</a>
          </div>
        </article>

        <article class="work-card reverse reveal">
          <a class="work-img placeholder" href="work/the-sixteen/" aria-label="View The Sixteen">
            <span class="work-img-tag">N° 02 · Legacy</span>
            <span class="placeholder-label">The Sixteen — installed</span>
          </a>
          <div class="work-body">
            <div class="work-meta">Private legacy commission · Lake Hayes</div>
            <h3 class="serif">The <em>Sixteen.</em></h3>
            <p>Sixteen ironbark figures reclaimed from a roadside ditch — 300-year-old Western Australian timber. Stripped to heartwood, refined by fire, crowned with hand-carved serpentine and Aotea stone. Set back into the ground as permanent guardians.</p>
            <a class="work-link" href="work/the-sixteen/">View the full piece →</a>
          </div>
        </article>

        <article class="work-card reveal">
          <a class="work-img placeholder" href="work/the-threshold/" aria-label="View The Threshold">
            <span class="work-img-tag">N° 03</span>
            <span class="placeholder-label">The Threshold — completed</span>
          </a>
          <div class="work-body">
            <div class="work-meta">Commission · Entrance gate</div>
            <h3 class="serif">The <em>Threshold.</em></h3>
            <p>The original gates were expensive, automated, and wrong — they announced when they should have concealed. Re-clad over the existing structure with aged timber palings at varied heights. The mountain and lake are now revealed only once you pass through.</p>
            <a class="work-link" href="work/the-threshold/">View the full piece →</a>
          </div>
        </article>

        <article class="work-card reverse reveal">
          <a class="work-img placeholder" href="work/workshop/" aria-label="View Workshop pieces">
            <span class="work-img-tag">N° 04 · Workshop</span>
            <span class="placeholder-label">The stone goblet</span>
          </a>
          <div class="work-body">
            <div class="work-meta">Workshop · Made outside obligation</div>
            <h3 class="serif">From <em>the workshop.</em></h3>
            <p>A stone goblet carved from local quarry stone, gifted on completion. A two-storey dollshouse built with mortise-and-tenon joints at miniature scale, made for his daughter. Nobody asked for either; both exist at the same standard as everything else.</p>
            <a class="work-link" href="work/workshop/">View the full piece →</a>
          </div>
        </article>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append work-card styles**

```css
/* ─── SELECTED WORK ─── */
.work-section { background: var(--ink-2); border-bottom: 1px solid var(--line); }

.work-list {
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.work-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.work-card.reverse .work-img { order: 2; }

.work-img {
  display: block;
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--line);
  transition: transform 0.6s ease;
}
.work-img:hover { transform: translateY(-4px); }

.placeholder {
  background: linear-gradient(135deg, #1f1611 0%, #0a0604 100%);
  display: flex;
  align-items: flex-end;
  padding: 1.6rem;
}
.placeholder-label {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--bone-dim);
}

.work-img-tag {
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  font-size: 0.6rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--pounamu-light);
  border: 1px solid var(--line-strong);
  padding: 0.35rem 0.7rem;
  background: rgba(14, 13, 11, 0.4);
}

.work-meta {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--pounamu-light);
  margin-bottom: 1.4rem;
}

.work-body h3 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 1.4rem;
  color: var(--bone);
}
.work-body h3 em { font-style: italic; color: var(--pounamu-light); }

.work-body p {
  color: var(--bone-dim);
  font-size: 1rem;
  line-height: 1.85;
  margin-bottom: 1.8rem;
}

.work-link {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--bone);
  text-decoration: none;
  border-bottom: 1px solid var(--pounamu-light);
  padding-bottom: 4px;
  transition: color 0.3s, letter-spacing 0.3s;
}
.work-link:hover { color: var(--pounamu-light); letter-spacing: 0.34em; }
```

- [ ] **Step 3: Verify**

Reload, scroll to Selected Work. Expected:
- Eyebrow + section title.
- Four cards stacked vertically with 7rem gap. Cards alternate image-left, image-right, image-left, image-right.
- Each card: a 4:5 dark gradient placeholder with a small tag `N° 01` (etc.) top-left and an italic placeholder label bottom-left, and a body block with meta, italic title, paragraph, and "View the full piece →" link.
- Hover an image: it lifts 4px. Hover the link: letter-spacing expands and colour shifts to pounamu.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(work): four selected-work cards with alternating layout"
```

---

## Task 7: Work of Record section

**Files:**
- Modify: `index.html` (insert after Selected Work)
- Modify: `styles.css` (append record styles)

- [ ] **Step 1: Add markup**

Insert after the Selected Work `</section>`:

```html
  <!-- ───────── WORK OF RECORD ───────── -->
  <section class="record">
    <div class="container">
      <div class="eyebrow reveal">Work of Record</div>
      <h2 class="section-title serif reveal">Built — at <em>that standard.</em></h2>

      <div class="record-grid">
        <article class="record-item reveal">
          <div class="record-name serif">Pinnacle Place</div>
          <p>1,400m² Mason &amp; Wales residence on Queenstown Hill. Site managed by Dan from foundation to handover. Featured by Sotheby's and Robb Report.</p>
          <div class="record-meta">Mason &amp; Wales · $23.5M Sotheby's listing</div>
        </article>

        <article class="record-item reveal">
          <div class="record-name serif">Lake Hayes Cottage</div>
          <p>Anna-Marie Chin Architects. Built by Ross Brothers Construction. Architecture awards go to architects — but the building has to exist, at that standard, for the award to mean anything. That part was Dan's.</p>
          <div class="record-meta">2020 NZIA National Award</div>
        </article>

        <article class="record-item reveal">
          <div class="record-name serif">Belfast Terrace</div>
          <p>685m² Mason &amp; Wales residence. Site managed by Dan for Trinity QT — one of three award-winning Mason &amp; Wales builds run in succession.</p>
          <div class="record-meta">House of the Year — Regional Supreme &amp; Gold</div>
        </article>

        <article class="record-item reveal">
          <div class="record-name serif">Faceted Cedar Ceiling</div>
          <p>Multi-directional cedar cladding installed throughout the main living volume of a private residence. Each panel hand-fitted; the directions shift across the ceiling planes to catch light differently at every hour.</p>
          <div class="record-meta">Lake Hayes Residence — Olive Lane</div>
        </article>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append record styles**

```css
/* ─── WORK OF RECORD ─── */
.record { background: var(--ink); border-bottom: 1px solid var(--line); }

.record-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
.record-item {
  padding: 2.4rem 2.4rem 2.6rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.record-name {
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: var(--bone);
  font-style: italic;
}
.record-item p {
  font-size: 0.95rem;
  color: var(--bone-dim);
  line-height: 1.85;
  margin-bottom: 1.4rem;
}
.record-meta {
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--pounamu-light);
}
```

- [ ] **Step 3: Verify**

Reload. Expected: a 2×2 grid of supporting projects with hairline rules between cells. Each cell has an italic Cormorant title, a paragraph in dim cream, and a small-caps meta line in pounamu.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(record): work-of-record sub-grid for supporting projects"
```

---

## Task 8: The Standard section

**Files:**
- Modify: `index.html` (insert after Work of Record)
- Modify: `styles.css` (append standard styles)

- [ ] **Step 1: Add markup**

Insert after the record `</section>`:

```html
  <!-- ───────── THE STANDARD ───────── -->
  <section id="standard" class="standard">
    <div class="container standard-inner">
      <div class="eyebrow reveal">The Standard</div>
      <h2 class="section-title serif reveal">Reputation <em>observed,</em><br>not claimed.</h2>

      <div class="standard-text reveal">
        <p>There is a pattern across Dan's career that no single project illustrates — only the full body of work makes it visible.</p>
        <p>When projects have hit pressure — and they have — Dan has not walked away, renegotiated downward, or settled for less. He has absorbed the cost, found the material, and finished what he committed to finish. Not because anyone was watching, but because the work does not lie about the person who made it.</p>
        <p>It runs the other way too. He chooses the people he works for as carefully as he chooses the timber he works with. Three to four commissions a year. The first conversation is a site visit. If the brief, the place and the person are not aligned — for both of us — the conversation ends there, with respect and without obligation.</p>
        <p class="standard-close">Twenty-five years of those choices, made consistently, is not a portfolio. It is a practice.</p>
      </div>

      <ul class="standard-facts reveal">
        <li>Every current commission sourced through direct referral or firsthand experience.</li>
        <li>Zero advertising in twenty-five years — the work is the only marketing.</li>
        <li>Repeat clients across multiple commissions spanning years.</li>
        <li>Standard maintained through budget pressure, scope change and difficult timelines.</li>
      </ul>
    </div>
  </section>
```

- [ ] **Step 2: Append standard styles**

```css
/* ─── THE STANDARD ─── */
.standard { background: var(--ink-2); border-bottom: 1px solid var(--line); }
.standard-inner { max-width: 820px; }

.standard-text p {
  font-size: 1.05rem;
  color: var(--bone-dim);
  line-height: 1.9;
  margin-bottom: 1.5rem;
}
.standard-close {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.4rem !important;
  color: var(--bone) !important;
  line-height: 1.55 !important;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  margin-top: 0.6rem !important;
}

.standard-facts {
  list-style: none;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.standard-facts li {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  font-size: 0.95rem;
  color: var(--bone-dim);
  line-height: 1.65;
}
.standard-facts li::before {
  content: '◈';
  color: var(--pounamu-light);
  font-size: 0.6rem;
  flex-shrink: 0;
}
```

- [ ] **Step 3: Verify**

Reload. Expected: a centred-narrow column with eyebrow, italic two-line title, four paragraphs (the last italicised in Cormorant), then a four-item list with diamond bullets in pounamu.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(standard): integrity section reframed around mutual fit"
```

---

## Task 9: Commission section

**Files:**
- Modify: `index.html` (insert after Standard)
- Modify: `styles.css` (append commission styles)

- [ ] **Step 1: Add markup**

Insert after the standard `</section>`:

```html
  <!-- ───────── COMMISSION ───────── -->
  <section id="commission" class="commission">
    <div class="container commission-inner">
      <div class="eyebrow eyebrow-center reveal">Commission</div>
      <h2 class="commission-h serif reveal">Begin a <em>conversation.</em></h2>
      <p class="commission-sub reveal">Told Works accepts a small number of commissions each year. If you have a project in mind — a piece, an installation, a room that wants to be reshaped — we'd be glad to hear from you.</p>

      <ol class="commission-process reveal">
        <li>
          <span class="step-n serif">i.</span>
          <div class="step-body">
            <div class="step-t">A first email</div>
            <div class="step-d">Tell us about the place, the people, and what the work needs to do. As detailed or as brief as you'd like.</div>
          </div>
        </li>
        <li>
          <span class="step-n serif">ii.</span>
          <div class="step-body">
            <div class="step-t">A site visit</div>
            <div class="step-d">Dan visits in person. He listens to the place. No commitment in either direction at this point.</div>
          </div>
        </li>
        <li>
          <span class="step-n serif">iii.</span>
          <div class="step-body">
            <div class="step-t">A clear answer</div>
            <div class="step-d">Within a week of the visit, you'll have a yes or a no — and either way, an honest read on the brief.</div>
          </div>
        </li>
      </ol>

      <a class="cta reveal" href="mailto:dan@toldworks.nz">Begin the conversation</a>

      <p class="commission-note reveal">
        Dan Ross · Queenstown, Aotearoa New Zealand<br>
        <a href="mailto:dan@toldworks.nz">dan@toldworks.nz</a>
      </p>
    </div>
  </section>
```

- [ ] **Step 2: Append commission styles**

```css
/* ─── COMMISSION ─── */
.commission {
  background: var(--ink);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.commission::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184, 120, 74, 0.06), transparent 70%);
  pointer-events: none;
}
.commission-inner { max-width: 720px; position: relative; }

.commission-h {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 1.4rem 0 2rem;
  color: var(--bone);
}
.commission-h em { font-style: italic; color: var(--pounamu-light); }

.commission-sub {
  font-size: 1.05rem;
  color: var(--bone-dim);
  max-width: 560px;
  margin: 0 auto 4rem;
  line-height: 1.8;
}

.commission-process {
  list-style: none;
  text-align: left;
  margin: 0 auto 4rem;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--line);
}
.commission-process li {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1.5rem;
  padding: 1.6rem 0;
  border-bottom: 1px solid var(--line);
  align-items: baseline;
}
.step-n {
  font-size: 1.4rem;
  font-style: italic;
  color: var(--pounamu-light);
}
.step-t {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: var(--bone);
  margin-bottom: 0.4rem;
}
.step-d {
  font-size: 0.95rem;
  color: var(--bone-dim);
  line-height: 1.7;
}

.cta {
  display: inline-block;
  padding: 1.15rem 3rem;
  border: 1px solid var(--ember);
  color: var(--bone);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  transition: background 0.4s ease, color 0.4s ease, letter-spacing 0.3s ease;
}
.cta:hover {
  background: var(--ember);
  color: var(--ink);
  letter-spacing: 0.4em;
}

.commission-note {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--line);
  color: var(--bone-mute);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  line-height: 1.9;
}
.commission-note a { color: var(--bone-dim); text-decoration: none; transition: color 0.3s; }
.commission-note a:hover { color: var(--bone); }
```

- [ ] **Step 3: Verify**

Reload. Expected:
- Centred eyebrow with rules either side.
- Big italic "Begin a *conversation*." headline.
- A short sub paragraph centred.
- Three numbered steps (i. ii. iii.) in italic Cormorant pounamu, each with a title and description.
- An outlined "Begin the conversation" CTA in ember.
- A small-text contact block at the bottom.
- Subtle ember radial glow behind the section.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(commission): three-step process and ember CTA"
```

---

## Task 10: Footer

**Files:**
- Modify: `index.html` (insert before `<script>`)
- Modify: `styles.css` (append footer styles)

- [ ] **Step 1: Add markup**

Insert immediately before `<script src="script.js"></script>`:

```html
  <!-- ───────── FOOTER ───────── -->
  <footer>
    <div class="container footer-inner">
      <a class="brand serif" href="#">TOLD<span>·</span>WORKS</a>
      <div class="footer-tagline serif">The work, told.</div>
      <div class="footer-copy">© 2026 Dan Ross · All rights reserved.</div>
    </div>
  </footer>
```

- [ ] **Step 2: Append footer styles**

```css
/* ─── FOOTER ─── */
footer {
  border-top: 1px solid var(--line);
  padding: 2.6rem 0;
  background: var(--ink);
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.footer-tagline {
  font-style: italic;
  font-size: 1.1rem;
  color: var(--bone-dim);
}
.footer-copy {
  font-size: 0.72rem;
  color: var(--bone-mute);
  letter-spacing: 0.15em;
}
```

- [ ] **Step 3: Verify**

Reload, scroll to bottom. Expected: a quiet footer with three items in a row — wordmark left, italic tagline center, copyright right.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat(footer): wordmark, tagline, copyright"
```

---

## Task 11: Reveal-on-scroll animations

**Files:**
- Modify: `script.js` (append reveal behaviour)
- Modify: `styles.css` (append reveal styles)

- [ ] **Step 1: Append reveal styles to `styles.css`**

```css
/* ─── REVEAL ON SCROLL ─── */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.reveal.in { opacity: 1; transform: translateY(0); }

/* Stagger children 80ms apart inside containers we mark with .stagger */
.stagger > .reveal:nth-child(1) { transition-delay: 0ms; }
.stagger > .reveal:nth-child(2) { transition-delay: 80ms; }
.stagger > .reveal:nth-child(3) { transition-delay: 160ms; }
.stagger > .reveal:nth-child(4) { transition-delay: 240ms; }
.stagger > .reveal:nth-child(5) { transition-delay: 320ms; }
```

- [ ] **Step 2: Append reveal behaviour to `script.js`**

```javascript
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
```

- [ ] **Step 3: Verify**

Reload. Scroll from top to bottom. Expected: every element with `.reveal` (eyebrows, section titles, paragraphs, work cards, etc.) starts invisible and fades up 40px when it enters the viewport. The hero is unaffected (no reveal classes there). With JS disabled, content still appears (the JS adds `.in` to all elements as a fallback).

- [ ] **Step 4: Commit**

```bash
git add styles.css script.js
git commit -m "feat(motion): reveal-on-scroll fade-up via IntersectionObserver"
```

---

## Task 12: Lightbox

**Files:**
- Modify: `index.html` (insert lightbox markup before `<script>`)
- Modify: `styles.css` (append lightbox styles)
- Modify: `script.js` (append lightbox behaviour)

The lightbox is wired up so any element with `data-lightbox="<title>"` opens an overlay when clicked. In v1 with placeholder images, the lightbox shows the title in italic Cormorant — once real images are added, the same `data-lightbox` mechanism will display them.

- [ ] **Step 1: Add lightbox markup to `index.html`**

Insert immediately before `<script src="script.js"></script>`:

```html
  <!-- ───────── LIGHTBOX ───────── -->
  <div class="lightbox" id="lightbox" role="dialog" aria-hidden="true">
    <button class="lightbox-close" id="lightboxClose" aria-label="Close">Close ✕</button>
    <div class="lightbox-content">
      <p class="lightbox-title serif" id="lightboxTitle"></p>
      <p class="lightbox-sub" id="lightboxSub"></p>
    </div>
  </div>
```

- [ ] **Step 2: Make the four work-card image links also lightbox triggers**

In each of the four `<a class="work-img placeholder" href="work/.../" ...>` tags, add a `data-lightbox` attribute matching the image label, but **keep the href**. The lightbox handler will respect modifier-clicks and let the link work as a fallback for users without JS.

For Task-6 cards 1-4 respectively, change:
```html
<a class="work-img placeholder" href="work/the-cellar/" aria-label="View The Cellar &amp; The Racks">
```
to
```html
<a class="work-img placeholder" href="work/the-cellar/" data-lightbox="The Cellar — completed" data-lightbox-sub="Reclaimed timber · stone sculpture · bespoke joinery" aria-label="View The Cellar &amp; The Racks">
```
And likewise for the other three (titles: `The Sixteen — installed` / `Private grounds · Ironbark sentinels · Serpentine & Aotea stone`, `The Threshold — completed` / `Aged timber palings · Mountain &amp; lake views revealed`, `The stone goblet` / `NZ schist · Carved · Gifted · Lives in the cellar`).

- [ ] **Step 3: Append lightbox styles**

```css
/* ─── LIGHTBOX ─── */
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(8, 7, 5, 0.97);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
}
.lightbox.on { display: flex; }
.lightbox-content { max-width: 720px; }
.lightbox-title {
  font-style: italic;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  color: var(--bone);
  line-height: 1.4;
  margin-bottom: 1rem;
}
.lightbox-sub {
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--pounamu-light);
}
.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: 1px solid var(--line-strong);
  color: var(--bone-dim);
  font-family: inherit;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
}
.lightbox-close:hover { color: var(--bone); border-color: var(--pounamu-light); }
```

- [ ] **Step 4: Append lightbox behaviour to `script.js`**

```javascript
// Lightbox: click anything with data-lightbox to open overlay
(function lightbox() {
  const lb = document.getElementById('lightbox');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbSub = document.getElementById('lightboxSub');
  const lbClose = document.getElementById('lightboxClose');
  if (!lb) return;

  const open = (title, sub) => {
    lbTitle.textContent = title;
    lbSub.textContent = sub || '';
    lb.classList.add('on');
    lb.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    lb.classList.remove('on');
    lb.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      // Allow modifier-click to follow the link as normal
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      open(el.getAttribute('data-lightbox'), el.getAttribute('data-lightbox-sub'));
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();
```

- [ ] **Step 5: Verify**

Reload. Click any work card image. Expected: a near-black overlay covers the screen with the italic title and small-caps subtitle centered. ESC, the close button, or a click on the overlay background closes it. Cmd/Ctrl-click still navigates to the dedicated work page (link fallback preserved).

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat(lightbox): overlay triggered by data-lightbox attribute"
```

---

## Task 13: Mobile responsive + menu

**Files:**
- Modify: `styles.css` (append mobile styles + sticky mobile CTA)
- Modify: `script.js` (append mobile menu toggle)
- Modify: `index.html` (add sticky mobile CTA)

- [ ] **Step 1: Add the sticky mobile CTA to `index.html`**

Insert immediately after `<body>` (before the nav):

```html
  <a class="mobile-cta" href="#commission">Commission a Work</a>
```

- [ ] **Step 2: Append mobile styles to `styles.css`**

```css
/* ─── STICKY MOBILE CTA ─── */
.mobile-cta {
  display: none;
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 200;
  background: var(--ember);
  color: var(--ink);
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  padding: 1rem 1.4rem;
  font-weight: 500;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.4);
}

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  :root { --gutter: 1.5rem; --section-y: 5rem; }

  nav { padding: 1.1rem 1.5rem; }
  nav.scrolled { padding: 0.8rem 1.5rem; }

  .menu-toggle { display: block; }
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background: rgba(14, 13, 11, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
    border-bottom: 1px solid var(--line);
    display: none;
    align-items: stretch;
  }
  .nav-links.open { display: flex; }
  .nav-links a { padding: 0.4rem 0; }
  .nav-enquire { text-align: center; }

  .hero { padding: 5rem 1.5rem 0; min-height: 600px; }
  .hero-h1 { font-size: clamp(2.2rem, 9vw, 3.6rem); }
  .hero-meta { flex-wrap: wrap; justify-content: center; gap: 0.6rem; padding: 0.8rem 1rem; }
  .hero-meta .dot { display: none; }

  .practice-grid { grid-template-columns: 1fr; gap: 3rem; }
  .practice-facts { grid-template-columns: 1fr 1fr; }
  .fact:nth-child(2) { border-right: none; }
  .fact:nth-child(3), .fact:nth-child(4) { border-top: 1px solid var(--line); }

  .work-list { gap: 4rem; }
  .work-card,
  .work-card.reverse { grid-template-columns: 1fr; gap: 2rem; }
  .work-card.reverse .work-img { order: 0; }

  .record-grid { grid-template-columns: 1fr; }
  .record-item { border-right: 1px solid var(--line); }

  .commission-process li { grid-template-columns: 3rem 1fr; gap: 1rem; }

  .footer-inner { flex-direction: column; gap: 1rem; text-align: center; }

  .mobile-cta { display: block; }
  body { padding-bottom: 3.4rem; }
}
```

- [ ] **Step 3: Append mobile menu toggle to `script.js`**

```javascript
// Mobile menu toggle
(function menu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();
```

- [ ] **Step 4: Verify on mobile width**

In the browser, open DevTools and switch to a mobile viewport (e.g. iPhone 14 — 390px wide).

Expected:
- Nav: only the wordmark and the `≡` toggle visible. Tap the toggle: the four links slide down as a column.
- Hero: full-bleed but reduced padding and headline scaled down. Meta items wrap to two lines and dots disappear.
- Sections stack to single columns. Work cards always show the image first, then the body, regardless of `.reverse`.
- Practice facts grid drops to 2×2 with hairlines.
- Sticky ember "Commission a Work" bar pinned to the bottom of the screen, above the system bar.

Switch back to desktop and verify nothing regressed.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat(responsive): mobile breakpoint, menu toggle, sticky CTA"
```

---

## Task 14: Subpage shared template & The Cellar page

**Files:**
- Create: `work/the-cellar/index.html`
- Modify: `styles.css` (append subpage styles)

The subpages share the same `styles.css` and `script.js` from the homepage. Each subpage imports them with the relative path `../../styles.css` and `../../script.js`. Layout pattern: subpage hero (eyebrow + title + intro), then a sequence of image plates with captions, then a "Back to Selected Work" footer.

- [ ] **Step 1: Append subpage styles to `styles.css`**

```css
/* ─── SUBPAGE ─── */
.subpage-hero {
  padding: 11rem 0 5rem;
  border-bottom: 1px solid var(--line);
  background: radial-gradient(ellipse at center, var(--ink-2) 0%, var(--ink) 70%);
  text-align: center;
}
.subpage-hero .eyebrow { justify-content: center; }
.subpage-hero .eyebrow::after { content: ''; width: 30px; height: 1px; background: var(--pounamu-light); }
.subpage-h {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 1.4rem auto 1.8rem;
  max-width: 920px;
  color: var(--bone);
}
.subpage-h em { font-style: italic; color: var(--pounamu-light); }
.subpage-intro {
  font-size: 1.05rem;
  color: var(--bone-dim);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.85;
}

.plates { padding: 6rem 0; background: var(--ink); }
.plate {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
}
.plate:last-child { margin-bottom: 0; }
.plate.reverse .plate-img { order: 2; }

.plate-img {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid var(--line);
  background: linear-gradient(135deg, #1f1611 0%, #0a0604 100%);
  display: flex;
  align-items: flex-end;
  padding: 1.6rem;
}
.plate-img-tag {
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  font-size: 0.6rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--pounamu-light);
  border: 1px solid var(--line-strong);
  padding: 0.35rem 0.7rem;
  background: rgba(14, 13, 11, 0.4);
}
.plate-img-label {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--bone-dim);
}

.plate-body { max-width: 460px; }
.plate-meta {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--pounamu-light);
  margin-bottom: 1rem;
}
.plate-h {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--bone);
}
.plate-h em { font-style: italic; color: var(--pounamu-light); }
.plate-body p {
  color: var(--bone-dim);
  font-size: 1rem;
  line-height: 1.85;
}

.subpage-footer {
  padding: 5rem 0;
  border-top: 1px solid var(--line);
  background: var(--ink-2);
  text-align: center;
}
.subpage-footer .back-link {
  display: inline-block;
  font-size: 0.78rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--bone);
  text-decoration: none;
  border-bottom: 1px solid var(--pounamu-light);
  padding-bottom: 4px;
  transition: color 0.3s, letter-spacing 0.3s;
}
.subpage-footer .back-link:hover { color: var(--pounamu-light); letter-spacing: 0.4em; }

@media (max-width: 900px) {
  .subpage-hero { padding: 8rem 0 4rem; }
  .plates { padding: 4rem 0; }
  .plate, .plate.reverse { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 4rem; }
  .plate.reverse .plate-img { order: 0; }
}
```

- [ ] **Step 2: Create `work/the-cellar/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Cellar &amp; The Racks — Told Works</title>
  <meta name="description" content="Cellar walls in salvaged timber, driveway-bank roots set into the walls. Wine racks built as architecture, not furniture.">
  <meta name="theme-color" content="#0E0D0B">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../styles.css">
</head>
<body>

  <a class="mobile-cta" href="../../#commission">Commission a Work</a>

  <nav id="nav">
    <a href="../../" class="brand serif">TOLD<span>·</span>WORKS</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Open menu">≡</button>
    <ul class="nav-links" id="navLinks">
      <li><a href="../../#practice">Practice</a></li>
      <li><a href="../../#work">Work</a></li>
      <li><a href="../../#standard">Standard</a></li>
      <li><a class="nav-enquire" href="../../#commission">Enquire</a></li>
    </ul>
  </nav>

  <header class="subpage-hero">
    <div class="container">
      <div class="eyebrow eyebrow-center">N° 01 · Commissioned Work</div>
      <h1 class="subpage-h serif">The Cellar &amp; <em>The Racks.</em></h1>
      <p class="subpage-intro">When budget pressure threatened the brief, the constraint became the brief. Cellar walls clad in salvaged timber and hessian, driveway-bank roots collected at midnight and set into the walls. Wine racks built from reclaimed stock, conceived as architecture rather than furniture. Total material cost to Dan: effectively zero.</p>
    </div>
  </header>

  <section class="plates">
    <div class="container">

      <div class="plate reveal">
        <div class="plate-img" data-lightbox="The cellar — under construction" data-lightbox-sub="Salvaged timber · Hessian cloth · Storytelling in place">
          <span class="plate-img-tag">01 · Construction</span>
          <span class="plate-img-label">The cellar — under construction</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">The brief inverted</div>
          <h2 class="plate-h">A constraint <em>becomes</em> the brief.</h2>
          <p>When the project hit budget pressure, the easy path was to cut the standard or scale back the scope. Dan went the other way: what if the constraint became the brief? Salvaged timber, hessian cloth, and walls that would feel like the cellar had been there for fifty years.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="The cellar — build progress" data-lightbox-sub="Driveway-bank roots · Collected at midnight · Set into the walls">
          <span class="plate-img-tag">02 · Build progress</span>
          <span class="plate-img-label">Build progress — roots set into the walls</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Material from the site itself</div>
          <h2 class="plate-h">Roots from <em>the driveway bank.</em></h2>
          <p>Collected at midnight from the bank above the property, set into the cellar walls so the room would carry something of the place it sat under. Local stone for the goblet, gifted on completion. Nothing imported that didn't have to be.</p>
        </div>
      </div>

      <div class="plate reveal">
        <div class="plate-img" data-lightbox="The Cellar — completed" data-lightbox-sub="Reclaimed timber · Stone sculpture · Bespoke joinery">
          <span class="plate-img-tag">03 · Completed</span>
          <span class="plate-img-label">The Cellar — completed</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Delivered as committed</div>
          <h2 class="plate-h">A room that <em>holds</em> a lineage.</h2>
          <p>The clients returned. Not for the craftsmanship alone, but for the certainty that the standard would hold — regardless of what happened between the handshake and the handover. The cellar has since hosted dinners, ceremonies, and the kind of long, slow evenings the work was made for.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="The Wine Racks — installed" data-lightbox-sub="Bentwood lattice · Charred timber posts · Jute-bound joinery">
          <span class="plate-img-tag">04 · The Racks</span>
          <span class="plate-img-label">Wine racks — bentwood lattice, charred posts</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Architecture, not furniture</div>
          <h2 class="plate-h">Racks anchored to <em>the room.</em></h2>
          <p>Bentwood lattice woven by hand, forming the face of each rack. Charred timber posts in shou sugi ban. Jute-bound joinery — natural, repairable, honest. Made to stand, to serve, and to last as long as the cellar around them.</p>
        </div>
      </div>

    </div>
  </section>

  <footer class="subpage-footer">
    <div class="container">
      <a class="back-link" href="../../#work">← Back to Selected Work</a>
    </div>
  </footer>

  <div class="lightbox" id="lightbox" role="dialog" aria-hidden="true">
    <button class="lightbox-close" id="lightboxClose" aria-label="Close">Close ✕</button>
    <div class="lightbox-content">
      <p class="lightbox-title serif" id="lightboxTitle"></p>
      <p class="lightbox-sub" id="lightboxSub"></p>
    </div>
  </div>

  <script src="../../script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify**

From `http://localhost:8000/`, click the first work card image. (You'll get the lightbox first because the homepage card has `data-lightbox`.) Close it, then Cmd/Ctrl-click the same card image — it should open `/work/the-cellar/`.

Or navigate directly: `http://localhost:8000/work/the-cellar/`.

Expected:
- Subpage hero centred: eyebrow `N° 01 · Commissioned Work`, italic Cormorant title, intro paragraph.
- Four alternating plate sections (image-left, image-right, image-left, image-right). Each placeholder has a tag + label, plus a body with meta, italic title, and paragraph.
- Footer with a "← Back to Selected Work" link that returns to the homepage's #work anchor.
- Nav, lightbox, and reveal animations all work.

- [ ] **Step 4: Commit**

```bash
git add styles.css work/the-cellar/index.html
git commit -m "feat(work): subpage template and The Cellar page"
```

---

## Task 15: Remaining work pages

**Files:**
- Create: `work/the-sixteen/index.html`
- Create: `work/the-threshold/index.html`
- Create: `work/workshop/index.html`

Each page follows the exact pattern of `work/the-cellar/index.html`. Only the hero copy and the four plate blocks change.

- [ ] **Step 1: Create `work/the-sixteen/index.html`**

Copy the entirety of `work/the-cellar/index.html`, then change:

- `<title>` to `The Sixteen — Told Works`
- meta description to `Sixteen 300-year-old ironbark figures — reclaimed, refined by fire, set back into the ground as guardians.`
- Subpage hero eyebrow text to `N° 02 · Legacy Commission`
- Subpage h1 to `The <em>Sixteen.</em>`
- Subpage intro to: `Sixteen ironbark figures, reclaimed from a roadside ditch near Queenstown — 300-year-old Western Australian ironbark, among the hardest timber on earth. Stripped to heartwood, refined by fire, crowned with hand-carved NZ serpentine and Aotea stone heads matching the homestead walls. Set back into the ground as permanent guardians.`

Replace the four `<div class="plate ...">` blocks with these four (the plate frame stays — `plate-img-tag`, `plate-img-label`, `plate-body`, `plate-meta`, `plate-h`, paragraph):

```html
      <div class="plate reveal">
        <div class="plate-img" data-lightbox="Found — sixteen rotten power poles" data-lightbox-sub="Roadside ditch · Three hundred years old · Invisible to everyone who passed">
          <span class="plate-img-tag">01 · Found</span>
          <span class="plate-img-label">Found — in a roadside ditch</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">What everyone else saw</div>
          <h2 class="plate-h">Sixteen rotten poles. <em>Three hundred years</em> old.</h2>
          <p>Reclaimed power poles, abandoned in a ditch near Queenstown. Western Australian ironbark, planted as saplings in the 1700s, that once held the copper veins carrying the first spark of light to the Wakatipu. Invisible to everyone who passed them.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="Hand-carving in progress" data-lightbox-sub="Scale texture cut into the timber face · Stone being fitted">
          <span class="plate-img-tag">02 · Carving</span>
          <span class="plate-img-label">Hand-carving in progress</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Refined by hand and fire</div>
          <h2 class="plate-h">Stripped to heartwood. <em>Refined by fire.</em></h2>
          <p>Each pole stripped with axe and tomahawk. Scale texture hand-cut into every face — no two figures alike. Charred to bring out the grain and bind the timber against rot for generations to come. Then crowned with serpentine and Aotea stone matching the homestead walls.</p>
        </div>
      </div>

      <div class="plate reveal">
        <div class="plate-img" data-lightbox="The Sixteen — installed" data-lightbox-sub="Private grounds · Lake Hayes · Shoulder to shoulder">
          <span class="plate-img-tag">03 · Installed</span>
          <span class="plate-img-label">The Sixteen — installed</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Set back into the ground</div>
          <h2 class="plate-h">Shoulder to shoulder. <em>Watching over.</em></h2>
          <p>Set into the ground in a quiet ring, the figures form a presence rather than a feature. Material returned to the land, not imposed on it. Part of an ongoing private commission — a legacy in stone, timber and fire.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="The Guardians Within — entrance" data-lightbox-sub="Lake Hayes Residence · The first presence the family meets on return">
          <span class="plate-img-tag">04 · The Guardians Within</span>
          <span class="plate-img-label">Entrance installation — Lake Hayes</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Guardians without and within</div>
          <h2 class="plate-h">A welcome that <em>holds.</em></h2>
          <p>The Sixteen stand outside, watching over the homestead. These stand at the entrance, welcoming the family back. Same ironbark, same stone, same hands. The first presence the family meets on return.</p>
        </div>
      </div>
```

Update the back-link href to remain `../../#work` (already correct from the copy).

- [ ] **Step 2: Create `work/the-threshold/index.html`**

Copy `work/the-cellar/index.html` again. Change:

- Title: `The Threshold — Told Works`
- Meta description: `Aged timber palings, varied heights, re-clad over an existing automated gate. Suspense at the entrance — the lake and mountains revealed only once you pass through.`
- Eyebrow: `N° 03 · Commissioned Work`
- h1: `The <em>Threshold.</em>`
- Intro: `The original gates were built by another contractor — expensive, automated, and wrong. The client wanted suspense, an arrival that withheld the property until the moment you passed through it. No demolition, no argument. The existing structure was retained and re-clad with timber palings at varied heights, aged on site.`

Replace the four plate blocks with:

```html
      <div class="plate reveal">
        <div class="plate-img" data-lightbox="The original gates" data-lightbox-sub="Built by another contractor — expensive, automated, wrong">
          <span class="plate-img-tag">01 · Before</span>
          <span class="plate-img-label">The original gates</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">The brief that was missed</div>
          <h2 class="plate-h">A gate that <em>announced.</em></h2>
          <p>The clients wanted concealment. The previous installer gave them performance. Expensive, automated, wrong — a gate that displayed the property when it should have withheld it.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="In progress" data-lightbox-sub="New palings fitted over the existing structure">
          <span class="plate-img-tag">02 · In progress</span>
          <span class="plate-img-label">In progress — palings fitted over the structure</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">No demolition. No argument.</div>
          <h2 class="plate-h">Re-clad over <em>what was there.</em></h2>
          <p>Aged timber palings fitted over the existing automated structure. Heights varied with intention — a screen, not a fence. Rhythm without repetition. The mechanism stays, the announcement disappears.</p>
        </div>
      </div>

      <div class="plate reveal">
        <div class="plate-img" data-lightbox="Completed — daylight" data-lightbox-sub="Aged timber · Varied heights · Finally right">
          <span class="plate-img-tag">03 · Daylight</span>
          <span class="plate-img-label">Completed — daylight</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Concealment, restored</div>
          <h2 class="plate-h">A threshold that <em>withholds.</em></h2>
          <p>Daylight on aged timber. The driveway becomes deliberate passage. The lake and mountain views are no longer offered — they are earned, only once you pass through.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="Completed — evening" data-lightbox-sub="Mountain &amp; lake views revealed at the moment of arrival">
          <span class="plate-img-tag">04 · Evening</span>
          <span class="plate-img-label">Completed — evening</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Four images. One gate.</div>
          <h2 class="plate-h">What it became when someone <em>asked the right question.</em></h2>
          <p>The same site. The same mechanism. A new presence at the entrance. The work didn't add anything to the property — it removed something that was getting in the way of what was already there.</p>
        </div>
      </div>
```

- [ ] **Step 3: Create `work/workshop/index.html`**

Copy `work/the-cellar/index.html`. Change:

- Title: `From the Workshop — Told Works`
- Meta description: `A stone goblet carved from local quarry stone. A two-storey dollshouse built with mortise-and-tenon at miniature scale. The work outside obligation.`
- Eyebrow: `N° 04 · Workshop`
- h1: `From <em>the workshop.</em>`
- Intro: `These were not commissioned. Nobody asked for a stone goblet carved from local stone, or a two-storey dollshouse built with mortise-and-tenon joints at miniature scale. Yet both exist — at the same standard as everything else. To understand what someone will do when the stakes are real, look at what they do when nobody is asking.`

Replace the four plate blocks with:

```html
      <div class="plate reveal">
        <div class="plate-img" data-lightbox="Stone carving begins" data-lightbox-sub="Local stone · Form taking shape · Self-taught">
          <span class="plate-img-tag">01 · The Stone Goblet</span>
          <span class="plate-img-label">Stone carving begins</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Begun without a vision</div>
          <h2 class="plate-h">He started cutting and kept going <em>until it told him.</em></h2>
          <p>NZ stone from a local quarry, intended for landscaping. No plan, no prior experience, a grinder and whatever tools were in the shed. The material decided the form. A few weeks later, a goblet existed.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="The finished goblet" data-lightbox-sub="NZ schist · Carved · Gifted · Lives in the cellar">
          <span class="plate-img-tag">02 · Gifted</span>
          <span class="plate-img-label">The finished goblet — gifted</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">Made to be given away</div>
          <h2 class="plate-h">A goblet for <em>the cellar</em> it would live in.</h2>
          <p>Gifted to the clients on completion of the cellar — unprompted, unrequested. It now lives there permanently, the only object in the room not built into a wall or a rack. "What is possible expands the moment you stop expecting to fail."</p>
        </div>
      </div>

      <div class="plate reveal">
        <div class="plate-img" data-lightbox="The dollshouse — finished" data-lightbox-sub="Cedar · Two storeys · Built for his daughter">
          <span class="plate-img-tag">03 · The Dollshouse</span>
          <span class="plate-img-label">The dollshouse — finished</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">For his daughter</div>
          <h2 class="plate-h">Built the way <em>a house should be built.</em></h2>
          <p>"I was going through a difficult time — the dollshouse was my way of practising traditional techniques on a small scale, so I could take them into a bigger scale." Cedar. Two storeys. Mortise and tenon at miniature scale. The scale changed; the standard did not.</p>
        </div>
      </div>

      <div class="plate reverse reveal">
        <div class="plate-img" data-lightbox="Joinery — detail" data-lightbox-sub="Mortise &amp; tenon at miniature scale">
          <span class="plate-img-tag">04 · Detail</span>
          <span class="plate-img-label">Joinery — detail</span>
        </div>
        <div class="plate-body">
          <div class="plate-meta">What care looks like at small scale</div>
          <h2 class="plate-h">Joinery — at <em>any size.</em></h2>
          <p>The detail nobody would have noticed if it had been wrong. The kind of work made when nobody is asking, which is the only honest measure of what someone will do when everyone is.</p>
        </div>
      </div>
```

- [ ] **Step 4: Verify all three pages**

Visit in order:
- `http://localhost:8000/work/the-sixteen/`
- `http://localhost:8000/work/the-threshold/`
- `http://localhost:8000/work/workshop/`

Expected for each: a fully styled subpage with the correct title in the browser tab, the right hero copy, four plate blocks alternating image-left/image-right, the back link returning to the homepage Selected Work anchor. Every plate placeholder is clickable and opens the lightbox with the correct title and subtitle.

Then verify the homepage links navigate correctly: from `http://localhost:8000/`, scroll to Selected Work and Cmd/Ctrl-click each card image. Each should land on the matching subpage.

- [ ] **Step 5: Commit**

```bash
git add work/the-sixteen/index.html work/the-threshold/index.html work/workshop/index.html
git commit -m "feat(work): The Sixteen, The Threshold, and Workshop pages"
```

---

## Task 16: Polish & QA

**Files:**
- Possibly modify any of the above based on findings.

- [ ] **Step 1: Cross-page nav check**

From the homepage, click each of the four work card "View the full piece" links — confirm each lands on the right subpage. From each subpage, click the wordmark and the "← Back to Selected Work" link — both should return to the homepage (the back link to `#work`).

- [ ] **Step 2: Mobile sweep**

Open DevTools, set viewport to 390×844 (iPhone). Walk every page top to bottom. Confirm:
- No horizontal scroll on any page.
- Sticky ember "Commission a Work" CTA visible at the bottom on every page.
- Mobile menu toggles open/closed cleanly.
- All sections collapse to single-column layouts.
- Type sizes remain readable.

- [ ] **Step 3: Lightbox sweep**

On the homepage and on each subpage, click every placeholder image. Each should open the lightbox with the correct title and subtitle. ESC, the close button, and clicking the overlay background all dismiss it.

- [ ] **Step 4: Lighthouse audit**

In Chrome DevTools, open the Lighthouse panel and run an audit on `http://localhost:8000/` (Mobile, Performance + Accessibility + Best Practices + SEO).

Expected: Performance ≥ 90, Accessibility ≥ 95.

If anything falls below, fix the most impactful issues:
- Missing `alt` text on any image — add it.
- Insufficient colour contrast — adjust the offending token.
- Render-blocking resources — already minimised; verify the font preconnect hints are present.
- Layout shift — confirm aspect-ratio is set on every placeholder image.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: QA pass — cross-page nav, mobile sweep, lightbox check, Lighthouse"
```

---

## Self-review

**Spec coverage:**
- §1 Positioning — encoded in copy across hero, practice, standard, commission (Tasks 3, 5, 8, 9). ✓
- §2 Site structure — hybrid implemented: homepage long-scroll (Tasks 1-10) + four subpages (Tasks 14-15). No `/work` index, no separate `/practice` or `/enquire` routes — matches spec. ✓
- §3 Voice & key copy — tagline in footer (Task 10), hero headline (Task 3), selectivity language in hero meta, practice, commission (Tasks 3, 5, 9). ✓
- §4 Aesthetic — palette tokens set in Task 1, Cormorant + Inter imported in Task 1, layout system enforced via tokens, components built across Tasks 2-9, motion in Task 11. ✓
- §5 Imagery — placeholder treatment used throughout, `data-lightbox` mechanism in Task 12, captions in Task 6+14, lazy loading not strictly required since v1 has no real images, but `aspect-ratio` on every placeholder prevents reflow. *(Note: when real images are added, add `loading="lazy"` and `content-visibility: auto` per spec — captured in `images/README.md` for the future image swap.)* ✓
- §6 Content sections — all 8 sections built (Tasks 3, 4, 5, 6, 7, 8, 9, 10). ✓
- §7 Out of scope — Journal nav item is not built; no analytics, no CMS, no e-commerce. ✓
- §8 Success criteria — single confident read, every commission has a card + dedicated page, mobile experience composed, Lighthouse target verified in Task 16. ✓

**Placeholder scan:** No "TBD", "TODO", or "implement later" in any task. Every step has either complete code or a concrete command. ✓

**Type consistency:** CSS class names used consistently across tasks (`.eyebrow`, `.section-title`, `.work-card`, `.plate`, `.reveal`, etc.). The `data-lightbox` attribute is used the same way on the homepage (Task 12) and subpages (Task 14). ✓

**Add-on for the future image swap (not a v1 task):** When real images are dropped into `images/`, replace each `<div class="placeholder">` (homepage) and `<div class="plate-img">` (subpages) with a `<div>` whose CSS `background-image` is set to the image URL, retaining the same dimensions and labels. Add `loading="lazy"` and `content-visibility: auto` styles to those containers at the same time. Captured in `images/README.md`.
