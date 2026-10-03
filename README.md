# SELENE — Private cislunar briefing

Cinematic **scroll-driven lunar briefing site** inspired by [Scrolltide SELENE](https://www.scrolltide.co/#t-selene): earthrise parallax, a trajectory that completes to **384,400 km**, NASA public-domain heritage, and an interest-list CTA.

Portfolio **project 3** (after product-reveal + spatial-brand).

**Live (after Pages enable):** [https://achrafbennanizia.github.io/selene/](https://achrafbennanizia.github.io/selene/)

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Motion (`motion/react`) for scroll parallax + reveals
- Lenis on desktop (native scroll on mobile)
- Static export → GitHub Pages

## Design
- Ground `#0A0A0B`, accent ice-blue `#9EC4FF`
- Display: Space Grotesk · Body: Manrope
- Mobile: bottom dock, full-width CTAs, safe-area padding, native touch scroll

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run build:pages   # basePath /selene
npm run typecheck
```

## CI/CD
| Workflow | Trigger | Steps |
|---|---|---|
| **CI** (`.github/workflows/ci.yml`) | PR + push `main` | `npm ci` → lint → `tsc` → Pages build → verify `out/` |
| **Deploy** (`.github/workflows/deploy.yml`) | push `main` + manual | lint → typecheck → static build → GitHub Pages |

Enable once: **Settings → Pages → Source: GitHub Actions**.

## Research
See `docs/marketing.md` — NASA distances, Apollo 11 coords, honest commercial timeline (Starship cargo NE 2028; dearMoon cancelled).
# selene
