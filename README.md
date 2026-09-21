# aura-website[README.md](https://github.com/user-attachments/files/32457959/README.md)
<div align="center">

# AURA

### A Study in Modern Wardrobe

A cinematic, editorial fashion storefront for the fictional house **AURA** — built to feel like
scrolling through a fashion film, not an online store.

[**Live demo**](https://curated-glide.lovable.app) ·
[Keyboard shortcuts](#keyboard--screen-reader) ·
[Running locally](#running-locally) ·
[Editing content](#editing-content) ·
[Contributing](#contributing)

[![License: MIT](https://img.shields.io/badge/License-MIT-1A1A1A.svg)](LICENSE)
![React 19](https://img.shields.io/badge/React-19-F7F5F2?color=1A1A1A&labelColor=D4D2CE)
![TanStack Start](https://img.shields.io/badge/TanStack%20Start-1.x-F7F5F2?color=1A1A1A&labelColor=D4D2CE)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-F7F5F2?color=E30613&labelColor=D4D2CE)
![Bun](https://img.shields.io/badge/Bun-1.x-F7F5F2?color=1A1A1A&labelColor=D4D2CE)

</div>

![AURA — the edit page](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/45e33f2c-9cec-4624-947f-b9ff53c0558f/id-preview-5208cb95--592f8efd-1952-4363-b420-78e817c7acd9.lovable.app-1784715306122.png)

---

## Contents

- [The idea](#the-idea)
- [What's inside](#whats-inside)
  - [Page sections](#page-sections)
  - [Interactive systems](#interactive-systems)
- [Keyboard & screen reader](#keyboard--screen-reader)
- [Motion preferences](#motion-preferences)
- [Tech stack](#tech-stack)
- [Running locally](#running-locally)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Scripts](#scripts)
  - [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Design tokens](#design-tokens)
- [Editing content](#editing-content)
- [State & data model](#state--data-model)
- [Known limitations](#known-limitations)
- [Roadmap ideas](#roadmap-ideas)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License & credits](#license--credits)

---

## The idea

Most fashion sites either bury everything behind an unlabeled hamburger or drown the photography
in UI chrome. AURA takes the opposite bet: keep the imagery enormous and the interface almost
silent, but never hide the wayfinding. Primary categories stay visible, the accent red appears
only where something is interactive, and every transition is slow on purpose.

It is a front-end only project — no database, no accounts, no payments. The point is the
interaction design and the accessibility work, not the checkout.

**Live demo:** https://curated-glide.lovable.app

---

## What's inside

### Page sections

| # | Section | Behaviour |
| --- | --- | --- |
| — | **Hero** | Full-viewport image with a slow Ken Burns zoom and a scroll-driven parallax layer. The headline *"A study in stillness."* fades in line by line. |
| — | **Marquee bar** | Infinite horizontal ticker — *"Complimentary shipping over €200 · New arrivals every Thursday · Studio open by appointment · Chapter Nº01"*. |
| Nº 01 | **The Intention** | Editorial 50/50 split: a parallax image against a large serif statement, both revealed on scroll. |
| — | **Dark statement** | Full-width `#121212` band with off-white type, breaking the rhythm of the page. |
| Nº 02 | **The Edit** | Product grid. Cards cross-fade to an alternate image on hover, expose **Quick view**, and add to the bag with the `+` control. |
| Nº 03 | **Categories** | Horizontal snap-scroll row for Woman / Man / Accessories / Children with prev & next controls and keyboard support. |
| — | **Footer** | Underline-only newsletter field plus an oversized outlined AURA wordmark. |

### Interactive systems

| Component | File | What it does |
| --- | --- | --- |
| **Header** | `src/components/site-header.tsx` | Transparent at the top, frosted with a hairline border once you scroll. Centred serif wordmark, left menu trigger, right utility cluster (Search, Login, Bag with a live count). Full-screen menu overlay on small viewports. |
| **Search overlay** | `src/components/search-overlay.tsx` | Full-screen search over a 12-item catalogue with live relevance scoring, match highlighting, image previews, a suggestions rail, and full arrow-key navigation. Opens with `⌘K`, `Ctrl+K` or `/`. |
| **Quick view** | `src/components/quick-view.tsx` | Product modal: two images auto cross-fade every 3.2s (or step them manually), size picker `XS`–`XL`, quantity stepper capped at 9, save toggle, and an add-to-bag button that confirms in place. |
| **Bag drawer** | `src/components/bag-drawer.tsx` | Right-side drawer with item previews, quantity steppers, remove, a running subtotal, and a checkout CTA. Empty state points back to the edit. |
| **Motion toggle** | `src/components/motion-toggle.tsx` | Accessible `Auto / Reduced / Full` radiogroup in the header and in the menu overlay. |

All five are hand-rolled on top of plain React — the Radix/shadcn primitives in `src/components/ui`
are present from the starter but the featured flows don't depend on them.

---

## Keyboard & screen reader

| Action | Keys |
| --- | --- |
| Open search | `⌘K` / `Ctrl+K`, or `/` |
| Move through results | `↑` `↓` (the list auto-scrolls, the active row inverts to black) |
| Open a result | `Enter` |
| Close search / modal / drawer / overlay | `Esc` |
| Move between options in a group (sizes, motion mode, image frames) | `←` `→` `Home` `End` |
| Cycle focus | `Tab` / `Shift+Tab` — trapped inside open dialogs |

What that means in practice:

- **Quick View** is a real `role="dialog"` with `aria-modal`. Focus moves in on open, is trapped
  while it's open, and returns to the card that launched it on close.
- Image frame indicators are a `role="tablist"`; sizes are a `role="radiogroup"`; the quantity
  count is an `aria-live="polite"` region.
- Every icon-only control carries a descriptive `aria-label`, and focus rings are a visible red
  outline that reads against the off-white background.

---

## Motion preferences

The toggle in the header (and in the menu overlay) cycles **Auto → Reduced → Full**.

- **Auto** follows the operating system's `prefers-reduced-motion`.
- **Reduced** and **Full** override it in either direction by adding `.motion-reduce` or
  `.motion-allow` to `<html>`, which take precedence over the media query.
- Reduced collapses animation and transition durations to near-zero — Ken Burns, the marquee
  loop, card cross-fades and hover zooms all stop — and it also disables Quick View's automatic
  3.2s image swap so the primary image stays put.
- The choice persists to `localStorage` under `aura.motion-mode` and is restored on load.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **TanStack Start** v1 — React 19, file-based routing under `src/routes`, SSR |
| Build | **Vite 8** + **Nitro** (Cloudflare target), configured in `vite.config.ts` |
| Styling | **Tailwind CSS v4** — native `@theme` variables in `src/styles.css`, no `tailwind.config.js` |
| Primitives | Radix UI + shadcn-style components in `src/components/ui` |
| Icons | `lucide-react` |
| Data fetching | `@tanstack/react-query` (wired in `__root.tsx`, unused by the demo flows) |
| State | Two tiny `useSyncExternalStore` modules — no external state library |
| Type checking | TypeScript 5.8, strict |
| Quality | ESLint 9 (flat config) + Prettier 3 |
| Fonts | **Playfair Display** (display serif) and **Inter** (UI sans) via Google Fonts |

---

## Running locally

### Prerequisites

- [Bun](https://bun.sh) 1.x — the repo ships `bun.lock`, so this is the recommended path
- Node.js 20+ if you'd rather use npm (`npm install` works too; there's simply no npm lockfile)

### Setup

```sh
git clone https://github.com/<your-username>/aura.git
cd aura

bun install        # or: npm install
bun run dev        # or: npm run dev
```

Open **http://localhost:8080**.

### Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Dev server with hot reload at `localhost:8080` |
| `bun run build` | Production build |
| `bun run build:dev` | Production-style build in development mode (faster, unminified) |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | ESLint across the project |
| `bun run format` | Prettier write |

Before opening a pull request, run `bun run lint` and `bun run build` — those are the two checks
that catch almost everything.

### Environment variables

**None.** The project needs no keys, no database URL, and no account to run. There is nothing to
copy into `.env`.

---

## Project structure

```text
.
├── public/                  static files served as-is
├── src/
│   ├── assets/              photography — hero, edit1–4, women, men, kids, newin, sale
│   ├── components/
│   │   ├── site-header.tsx      header, menu overlay, ⌘K listener, bag count
│   │   ├── search-overlay.tsx   catalogue + scoring + full-screen results UI
│   │   ├── quick-view.tsx       product modal, focus trap, frame tablist
│   │   ├── bag-drawer.tsx       cart drawer, subtotal, remove/quantity
│   │   ├── motion-toggle.tsx    Auto / Reduced / Full radiogroup
│   │   └── ui/                  shadcn primitives (from the starter)
│   ├── lib/
│   │   ├── cart-store.ts        the bag + drawer state (in memory)
│   │   ├── motion-store.ts      motion mode, persisted to localStorage
│   │   └── utils.ts             cn()
│   ├── routes/
│   │   ├── __root.tsx           app shell, fonts, metadata, 404 + error boundaries
│   │   └── index.tsx            the whole AURA page
│   └── styles.css               Tailwind v4 @theme tokens + motion overrides
├── vite.config.ts
├── eslint.config.js
├── .prettierrc
└── package.json
```

`src/routeTree.gen.ts` is generated by the router plugin — never edit it by hand.

---

## Design tokens

Defined in the `@theme` block at the top of `src/styles.css`, and consumed as Tailwind utilities
(`bg-aura-bg`, `text-aura-ink`, `border-aura-line`, …).

| Token | Value | Role |
| --- | --- | --- |
| `--color-aura-bg` | `#F7F5F2` | Warm off-white page background |
| `--color-aura-ink` | `#1A1A1A` | Primary text |
| `--color-aura-accent` | `#E30613` | Red — interactive states only, never decoration |
| `--color-aura-muted` | `#8C8C8C` | Secondary text, captions |
| `--color-aura-line` | `#D4D2CE` | Hairline dividers |
| `--color-aura-dark` | `#121212` | Dark contrast sections |
| `--font-display` | Playfair Display → Cormorant Garamond → Georgia | Headlines |
| `--font-sans` | Inter → Helvetica Neue → system-ui | Nav, body, labels |

Type is set with fluid `clamp()` sizes and tight leading (`0.96`) at display scale; spacing runs
on generous vertical rhythm (`py-32` → `py-40` → `py-[160px]`).

---

## Editing content

Everything on the page is driven by small literal arrays — no CMS.

| What | Where |
| --- | --- |
| Product cards (name, price, image, hover image, category tag, sale flag) | `PRODUCTS` in `src/routes/index.tsx` |
| Category slides | `CATEGORIES` in `src/routes/index.tsx` |
| Marquee announcements | `words` inside `MarqueeBar()` in `src/routes/index.tsx` |
| Search results | `CATALOG` and `SUGGESTIONS` in `src/components/search-overlay.tsx` |
| Available sizes | `SIZES` in `src/components/quick-view.tsx` |
| Headline & section copy | `Hero`, `EditorialSplit`, `DarkStatement`, `ProductGrid` in `src/routes/index.tsx` |
| Colours, fonts, motion rules | `@theme` and the motion blocks in `src/styles.css` |
| Page title, description, Open Graph | `head()` in `src/routes/index.tsx` and `src/routes/__root.tsx` |

Two things worth knowing:

1. **The catalogue is duplicated.** `PRODUCTS` drives the grid, `CATALOG` drives search. They are
   separate literal arrays that intentionally overlap — change one and change the other, or
   search will quietly go stale.
2. **Prices are strings.** `"€ 1,240"` is the display value; `parsePrice()` strips it down to a
   number for the subtotal. Keep the currency symbol in the string and the digits parseable.

Swap the photography by dropping files into `src/assets/` and updating the imports at the top of
the file that uses them.

---

## State & data model

Both stores are plain modules with a listener set, read through React's
[`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore). No provider
wrappers, no context, no external dependency.

### `cart-store.ts`

```ts
type CartItem = {
  id: string;          // `${name}::${size}` unless an id is passed
  name: string;
  price: string;       // display string, e.g. "€ 680"
  priceValue: number;  // parsed for the subtotal
  img: string;
  tag: string;
  size?: string;
  qty: number;         // clamped to 1–9
};
```

| API | Behaviour |
| --- | --- |
| `cart.add(item)` | Merges into an existing line by `id`, otherwise appends. Opens the drawer. |
| `cart.remove(id)` | Drops the line and emits. |
| `cart.setQty(id, qty)` | Clamps at 9; `qty <= 0` removes the line. |
| `cart.openDrawer()` / `cart.closeDrawer()` | Toggle the drawer without touching items. |
| `useCart()` | `{ items, open }` — subscribe from any component. |

### `motion-store.ts`

| API | Behaviour |
| --- | --- |
| `motion.get()` / `motion.set(mode)` | `"system" \| "reduce" \| "full"`, persisted to `localStorage` as `aura.motion-mode` |
| `motion.cycle()` | Steps system → reduce → full → system |
| `useMotionMode()` | Reactive current mode (server snapshot is `"system"`) |
| `prefersReducedMotion()` | Effective answer once the override and the OS query are combined |

Setting the mode swaps `.motion-reduce` / `.motion-allow` on `<html>`, which is how the CSS
override wins over the media query.

---

## Known limitations

Honest notes so you don't waste time hunting for backend code that isn't there.

- **No persistence.** The bag lives in memory — a refresh empties it. Only the motion preference
  is stored.
- **No checkout.** "Proceed to Checkout" and the newsletter field are presentational; neither
  submits anything.
- **One route.** The site is a single page. The hero buttons scroll to `#products` and
  `#editorial`; menu items and several footer links are still `#` placeholders waiting for real
  pages.
- **Duplicated catalogue data.** Grid products and search items are two arrays that must be kept
  in step by hand.
- **Stock photography is generated.** The images in `src/assets/` are AI-generated stand-ins for
  a fictional house — replace them before shipping anything real, and check the licence of
  whatever you put in their place.
- **`src/components/ui/` carries dead weight.** 46 shadcn primitives ship with the starter and
  most are unused here. Deleting the ones you don't need trims the bundle.

---

## Roadmap ideas

Good places to start if you want to make it yours:

- [ ] Persist the bag to `localStorage` (a dozen lines in `cart-store.ts`)
- [ ] Unify `PRODUCTS` and `CATALOG` into one source in `src/lib/catalog.ts`
- [ ] Add real routes — `/shop`, `/product/$slug`, `/journal/$id` — with loaders
- [ ] Wire the newsletter field to a provider and show inline success/error state
- [ ] Add a checkout flow with a payment provider
- [ ] Introduce a CMS or JSON-backed catalogue
- [ ] Add Playwright coverage for search, quick view, and the bag drawer
- [ ] Add `prefers-contrast` and forced-colours handling

---

## Deployment

The build targets Cloudflare through Nitro, which is what `bun run build` produces.

```sh
bun run build
bun run preview   # sanity-check the production build locally
```

Deploy the resulting output to Cloudflare Workers or Pages, or point any Node-capable host at the
Nitro output. Because everything is static-plus-SSR with no secrets, most static hosts work too —
if you move off Nitro, build the client and serve `index.html` from your own server entry.

There is nothing to configure first: no environment variables, no database, no auth provider.

---

## Contributing

Contributions are welcome — the project is small enough that a good pull request lands quickly.

1. Fork the repo and branch from `main` (`feat/…`, `fix/…`, `chore/…`).
2. Keep changes focused. One behaviour per PR.
3. Run `bun run lint`, `bun run format`, and `bun run build` before pushing.
4. If you touch an interactive control, check it with the keyboard only and confirm its
   `aria-label` still describes it.
5. Open a PR describing the *why* — screenshots or a short clip for visual changes.

A few conventions this codebase follows:

- Design values come from the tokens above; don't hardcode hex colours in components.
- Red is reserved for interactive and focus states.
- Motion must respect `prefersReducedMotion()` — anything new that animates needs to opt out.
- Accessibility isn't a cleanup pass: new dialogs trap focus and new icon buttons get labels.

---

## License & credits

Released under the **MIT License** — see [LICENSE](LICENSE).

- Fonts: **Playfair Display** and **Inter**, both under the SIL Open Font License, served by
  Google Fonts.
- Photography: AI-generated imagery created for this demo. AURA is a fictional house and is not
  affiliated with any real brand.

Built with [Lovable](https://lovable.dev).
