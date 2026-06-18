# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

This is a personal portfolio website hosted on **Vercel** (Next.js), with a private **Admin Panel** for content management used only by the owner.

The DC-Runtime static site (`Admin.dc.html`) is the editing interface. Changes are exported as JSON (`text.txt`) and synced into the Next.js data layer via `scripts/sync-portfolio.js`. The Next.js app (`src/data/portfolio.ts`) is the source of truth for the Vercel deployment.

## Current Architecture

### DC-Runtime Framework
`support.js` is a pre-built, generated runtime — do **not** edit it directly. It bootstraps React 18 (loaded from CDN via `unpkg.com`) and compiles `.dc.html` files into live components. Each `.dc.html` file contains an HTML template section and a `<script type="text/dc">` block with a `Component extends DCLogic` class.

There is no build step, no `package.json`, and no bundler. Files run directly in the browser.

### File Roles
- `Landing Page.dc.html` — Primary portfolio entry point; contains full light/dark theme CSS variables, the hero section, stats, games, projects, skills, experience, research, about, and contact sections. Also includes a playable arcade mini-game using the Web Audio API.
- `Admin.dc.html` — Full content editor. Reads/writes all portfolio data through `PortfolioStore` (localStorage). Covers every editable section: hero, stats, games, projects, skills, experience, education, research, about, contact, footer.
- `Games.dc.html` / `Projects.dc.html` — Dedicated listing pages for games and projects.
- `portfolio-data.js` — Single source of truth for content structure. Exposes `window.PortfolioStore` with `load()` / `save()` methods. All `.dc.html` files import this.
- `Canvas.dc.html` — Design system documentation; describes the color system, component library, and framework assumptions.
- `Featured Games Themes.dc.html` — Theme/cover-art showcase page.
- `support.js` — DC-Runtime engine (GENERATED; rebuild with `cd dc-runtime && bun run build` if source is available).

### Data Model (`portfolio-data.js`)
The store shape: brand, hero, stats (4 items), games (array with id/title/genre/coverGradient/role/engine/year/repo/description/tech/slides), projects (same + tag), skills (4 categories), experience, education, research (papers with venue links), about, contact (email/resume/socials), footer.

Twelve named gradients are defined (`violet`, `indigo`, `lavender`, `aqua`, `pink`, `amber`, `orange`, `green`, `purple`, `teal`, `coral`, `dark`) each with `light`/`dark` variants containing `ink` and `dot` color pairs.

### Themes
Two themes defined as CSS variables inside `Landing Page.dc.html`: default light (`coral`) and dark (`midnight`). Theme switching uses `data-theme` on the root element.

## Content Update Workflow

1. Edit content in `Admin.dc.html` (opens in browser, saves to `localStorage`)
2. Export from Admin → saves to `text.txt`
3. Run `node scripts/sync-portfolio.js` → rewrites `src/data/portfolio.ts`
4. `git add src/data/portfolio.ts && git commit -m "..." && git push` → Vercel auto-deploys

## Development (Current Static Version)

Open any `.dc.html` file directly in a browser, or serve the folder with any static file server:
```
npx serve .
# or
python -m http.server 8080
```

The `Admin.dc.html` page writes to `localStorage` under the key used by `PortfolioStore`; open `Landing Page.dc.html` in the same browser to see edits reflected.
