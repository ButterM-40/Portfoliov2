# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

This is a personal portfolio website being migrated toward a production stack: **Vercel** for hosting, **Supabase** as backend (image storage + database), and a full **Admin Panel** for content management.

The current codebase is a flat-file, browser-only portfolio built on a custom **DC-Runtime** framework (see `support.js`). All data is persisted to browser `localStorage` via `portfolio-data.js`. The migration target is a proper Next.js app with Supabase replacing localStorage.

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

## Planned Migration (Vercel + Supabase)

When migrating to Next.js + Supabase:
- Replace `localStorage` / `PortfolioStore` with Supabase tables and storage buckets
- Game/project cover images → Supabase Storage bucket
- Admin Panel (`Admin.dc.html` logic) → Next.js `/admin` route with Supabase auth protecting it
- Deploy via Vercel (connect GitHub repo; env vars go in Vercel dashboard and `.env.local`)

Key Supabase env vars to wire up:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # admin-only operations only
```

## Development (Current Static Version)

Open any `.dc.html` file directly in a browser, or serve the folder with any static file server:
```
npx serve .
# or
python -m http.server 8080
```

The `Admin.dc.html` page writes to `localStorage` under the key used by `PortfolioStore`; open `Landing Page.dc.html` in the same browser to see edits reflected.
