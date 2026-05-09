# Told Works — Design Spec

**Date:** 2026-05-10
**Status:** Approved for implementation
**Predecessor:** `soulcraft-v24.html`, `soulcraft-portfolio-fresh.html`

---

## 1. Positioning

Told Works is the rebrand of Dan Ross's craft practice (formerly Soulcraft). Same work — bespoke architectural commissions, installations, objects from a Queenstown workshop — but a sharpened position.

**Old:** *Soulcraft adds soul to spaces.*
**New:** *Told Works tells the story already held in a place.*

The work is the storyteller. Dan reads the design, the material, and the lives that will unfold around it, then makes a piece that amplifies what is already there. The name reads two ways at once: works that have been *told*, and work that does the *telling*.

**Selectivity is core to the brand.** Dan accepts a small number of commissions a year and visits the site before agreeing to anything. The site must signal that he is choosing the client, not the other way around. This shows up in confident phrasing throughout (not in a dedicated section), and in concrete details like *"Late 2026 availability"* and *"By invitation."*

**Audience:** dual and equal — high-end private homeowners and architects/designers who would bring Dan in as a collaborator. All bespoke, all high-end.

## 2. Site structure

**Hybrid: single long-scroll homepage + dedicated pages for each commission.**

Casual visitors get the full story scrolling the homepage. Serious visitors can go deep on any work via its own URL.

```
/                         Homepage (long-scroll)
  ├ Hero
  ├ Press strip (NZIA / Mason & Wales / Anna-Marie Chin / Trinity QT)
  ├ Practice (Dan's bio + pull-quote + practice facts)
  ├ Selected Work — preview of all 4 commissions
  │   each card → "View the full piece"
  ├ Work of Record — supporting projects (Pinnacle Place, etc.)
  ├ The Standard (the "why he can walk away" section, reframed around mutual fit)
  └ Commission (enquire)

/work/the-cellar          The Cellar & The Racks
/work/the-sixteen         The Sixteen (legacy commission)
/work/the-threshold       The Threshold
/work/workshop            Workshop pieces (stone goblet, dollshouse)
```

The homepage's Selected Work section is the index — no separate `/work` route needed. Practice and Commission detail live on the homepage in v1; dedicated `/practice` and `/enquire` pages are not built (homepage sections are deep enough).

**Nav:** Wordmark left. Right side: Practice · Work · Standard · Commission (Enquire button). Anchor links on the homepage; route links on subpages.

## 3. Voice & key copy

**Tagline:** *The work, told.*

**Hero headline:**
> Pieces that **tell the story**
> *the place is already telling.*

**Selectivity language — woven through, not boxed off:**
- Hero meta: *By invitation · Late 2026 availability · Queenstown*
- Practice section: *Three to four commissions a year. He visits the site before he agrees to anything.*
- Commission section: *Begin a conversation. We'll know within a week if it's the right fit — for both of us.*

**Tonal rules:**
- No exclamation marks. No emoji. No "we" unless referring to Dan + client.
- Italic Cormorant only on key nouns (story, place, work, told).
- Past tense and definite articles — language of an established thing, not a pitch.
- Every sentence earns its presence; cut what can be cut.

## 4. Aesthetic spec

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0E0D0B` | Primary background |
| `--ink-2` | `#15130F` | Section bands (alternating) |
| `--ink-3` | `#1C1A16` | Cards, hover states |
| `--bone` | `#E8E2D4` | Primary text |
| `--bone-dim` | `#B8B1A1` | Secondary text |
| `--bone-mute` | `#6F6A5E` | Captions, eyebrows |
| `--pounamu` | `#4A6B54` | Deep accent |
| `--pounamu-light` | `#7A9482` | Bright accent — italics, links, rules |
| `--ember` | `#B8784A` | Reserved for the Enquire CTA and the availability tag only |
| `--line` | `rgba(232,226,212,0.08)` | Hairline rules |

Pounamu does most accent work. Ember is held back so when it appears it carries weight.

### Typography

- **Display:** Cormorant Garamond — light (300) and italic. Headings, pull-quotes, hero, work titles. Italic in pounamu-light is the recurring signature gesture.
- **Body:** Inter — light (300) and regular (400). All paragraph text, navigation, UI.
- **Wordmark:** Cormorant Garamond, uppercase, letter-spaced 0.3em. Format: `TOLD·WORKS` with the `·` in pounamu-light.

### Layout system

- Max content width 1200px. Side gutters 3rem desktop / 1.5rem mobile.
- Section padding 8rem top/bottom desktop, 5rem mobile.
- Eyebrow → title → body is the consistent rhythm for every section.
- Alternating ink / ink-2 backgrounds for section banding.
- Hairline rules between sub-elements; never heavy borders.

### Components

- **Nav:** fixed, blurred backdrop on scroll.
- **Eyebrow:** small caps, 0.4em tracked, pounamu-light, with leading 30px hairline rule.
- **Pull-quote:** italic Cormorant, large, with left border in pounamu-light.
- **Materials/numbered list:** italic Cormorant numeral + small-caps label + body. Hairline divider between rows.
- **CTA button:** outlined, hover fills with bone, letter-spacing expands on hover.
- **Work card on homepage:** image left, copy right, alternating per row. Subtle hover lift.

### Motion

- Reveal-on-scroll: fade-up 40px, staggered 80ms between siblings.
- Hero entrance: eyebrow → headline → sub → cue, each 200ms apart.
- 2s scroll cue pulse at hero bottom.
- No parallax. No gimmicks.

### Texture

- 4% noise grain overlay across the body.
- Hero background: low-opacity radial gradients in pounamu and ember (warmth and shadow).

## 5. Imagery approach

Reuses the asset library from `soulcraft-v24.html` (paths under `images/`).

**Roles:**
1. Hero atmosphere — *The Sixteen* as the defining image, treated dark and used as a backdrop with the headline floating over a gradient. (The Sixteen also has its own work card and dedicated page; the hero treatment is purely atmospheric.)
2. Work cards on homepage — one signature image per commission, 4:5 portrait.
3. Dedicated work pages — full image sequences (under construction → build progress → completed).
4. Lightbox — click any image to enlarge against a near-black overlay.

**Treatment:**
- Images sit on dark backgrounds with a 1px hairline border in `--line`.
- Subtle dark-to-transparent gradient at bottom for caption legibility.
- Captions: small-caps tag (e.g., `LAKE HAYES · LEGACY COMMISSION`) above an italic Cormorant title.
- No filters, no colour grading.

**Placeholder strategy until real images are wired in:**
- `linear-gradient(135deg, #1f1611, #0a0604)` plus a centered `IMAGE` label.
- Correct aspect ratios maintained so swapping in real images doesn't reflow.

**Loading:**
- `loading="lazy"` on all images below the fold.
- `content-visibility: auto` on image containers.
- Hero image preloaded.

## 6. Content sections (homepage)

Final list, in order of appearance:

1. **Hero** — eyebrow `Dan Ross · Selected Works`, headline, sub, hero meta strip (By invitation · Late 2026 · Queenstown), scroll cue.
2. **Press strip** — credentials line linking to NZIA award pages.
3. **Practice** — section title (`He builds the feeling first.`), bio paragraphs, pull-quote from Dan, practice facts grid (25+ years, 2 NZIA, etc.).
4. **Selected Work** — section title, four commission cards each with View the full piece link.
5. **Work of Record** — supporting projects in a denser sub-grid (Pinnacle Place, Lake Hayes Cottage, Belfast Terrace, faceted cedar ceiling).
6. **The Standard** — reframed integrity section. Built around mutual fit: he chooses clients as carefully as he chooses materials.
7. **Commission** — section title (*Begin a conversation.*), three-step process, email link, one-line selectivity statement. Email only — no form.
8. **Footer** — wordmark, tagline (*The work, told.*), copyright.

## 7. Out of scope

- Multi-language support.
- CMS integration (the site is a static handcrafted artifact, like the work it presents).
- E-commerce / product sales.
- Blog/journal — *the Journal nav item is reserved as a future stub but not built in v1.*
- Dark/light mode toggle — the dark palette is the brand.
- Analytics. No tracking, no cookies. If pageview counts become useful later, a privacy-respectful service can be added.

## 8. Success criteria

- Site loads, scrolls, and reads as a single confident read.
- Every commission has a homepage card and a dedicated `/work/...` page.
- Mobile experience is as composed as desktop (single-column flow, mobile CTA bar).
- Page weight under 1MB on initial load (excluding hero image).
- Lighthouse Performance ≥ 90, Accessibility ≥ 95.
- Visitor reaction (gut check): *"This person is serious. I should reach out carefully."*
