# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Keep this file current.** Update CLAUDE.md whenever changes make it stale (new commands, structure, conventions, or deployment details). The user also edits this repo manually outside of Claude and may ask you to run `git status` (and inspect the diff) to catch up on those changes and reflect them here.

## Overview

Personal portfolio for Ayush Kumar, deployed as a static site at https://kumarayush.me/. Hosting is on **Vercel** (auto-deploys on push); the `kumarayush.me` domain is registered/managed on **Hostinger** (DNS points to Vercel). Built with **Astro 7** and **Tailwind CSS 4**. There is no backend, database, or test suite — it's a content-driven marketing/portfolio page.

## Commands

- `npm run dev` — start the dev server (`astro dev --host`, exposed on the LAN)
- `npm run build` — build the static site to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm start` — build then preview with `--host`
- `npm run fw` — format all `.ts/.tsx/.md/.astro` files with Prettier (run before committing)

## Architecture

The site is a single page composed from data + presentational components. To change what the site shows, you almost always edit a file in `src/data/`, not markup.

- **`src/data/*.ts`** — the content source of truth. `project.ts` exports `highlightedProjects[]` (rich `HighlightedProject` shape: tech grouped by layer via a `TechStack` object of `frontend`/`backend`/`database`/`ai`/`mobile`/`infra`/`tools`, and `liveLink` that is either a string or a `{ web, app }` object) and `archivedProjects[]` (flatter `Project` with a `techStack: Skill[]`); `skill.ts` is the single source of truth for tech skills (see below); `book-and-screen.ts` exports `books`/`screens` lists; `link.ts` exports `contact` (nested socials) plus standalone `figma`/`blog`/`resume` URLs. Components import these arrays and `.map()` over them.
- **`src/data/skill.ts`** — central skills registry. `skills` is an `as const` object keyed by short slugs (e.g. `ts`, `react`, `pg`) → display names; `type Skill` is the union of those display names. Every `techStack` entry across `project.ts` must reference `skills.*` (no loose strings). Also exports `confidentSkills` (a curated `SkillCategory[]` grouped by heading) and `workedSkills` (all skills, derived via `Object.values(skills)`). Not rendered on the site yet — data only.
- **`src/pages/`** — two routes. `index.astro` wraps the home sections (`Hero`, `Project`, `BooksAndScreen`) in `Layout`; `archive.astro` renders `archivedProjects` (sorted newest-first) as a text list with tech-stack chips and Live/GitHub/Design links.
- **`src/layout/Layout.astro`** — the HTML shell: takes `title`/`description` props and owns all `<head>` SEO/OG/Twitter meta, favicons, canonical URL, the Google Analytics snippet, and Vercel Analytics (`@vercel/analytics/astro`). Renders `Header`, a `<slot />`, and `Footer` inside `<body>`.
- **`src/components/`** — `Header`/`Footer` plus `home/` sections. Section components live in `home/`.

**Interactivity uses no framework runtime.** Astro ships zero JS by default here. Client-side behavior (e.g. the auto-cycling project carousel in `home/Project.astro`) is written as a plain vanilla `<script>` block at the bottom of the `.astro` component that queries the DOM directly. Add interactivity the same way rather than pulling in React/etc.

**Images** are imported ES-module style from `src/assets/images/project/` and rendered via Astro's `<Picture>`/`astro:assets` for optimization (avif/webp with png fallback). New project images go there and get imported in `project.ts`.

## Styling

- Tailwind CSS 4 is wired in through the Vite plugin (`@tailwindcss/vite` in `astro.config.mjs`) — there is **no `tailwind.config.js`**.
- Design tokens live in `src/assets/styles/global.css` under `@theme` (custom colors, `--color-white`, `--color-black`; fonts `--font-sans` = self-hosted "Shone/Söhne", `--font-mono` = "Source Code Pro"). Fonts are `@font-face`'d from `public/fonts/`.
- Reusable class helpers (`.wrapper`, `.custom-cursor`) are also defined in `global.css`. `global.css` is imported once in `Layout.astro`.

## Conventions

- Prettier config (`.prettierrc`): **no semicolons, single quotes, no trailing commas, `arrowParens: avoid`, 2-space tabs, `bracketSameLine: true`**. Match this style; run `npm run fw` before committing.
- TypeScript is `astro/tsconfigs/strict`.
- The `site` URL in `astro.config.mjs` drives canonical URLs and the sitemap (`@astrojs/sitemap`) — keep it accurate when the domain changes.
