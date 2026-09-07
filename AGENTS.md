# AGENTS.md — Portfolio

Context for AI coding agents working in this repository, especially Hermes and Claude Code.

## Project

Collective portfolio/site for ADDD — Artur, David, David and Dominik.

- Stack: Vite + React 18 + TypeScript
- Styling: CSS Modules plus global `src/styles/tokens.css` and `src/styles/base.css`
- Routing: custom hash routing, no React Router
- Backend: none; static build only
- Deployment: GitHub Pages via `.github/workflows/deploy.yml`
- Live URL: https://pleonastic6.github.io/Portfolio/
- Current positioning: young developer collective; focus still open, but centered on careful software work.

## Commands

Use npm, not pnpm/yarn, because this repo has `package-lock.json`.

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run typecheck  # TypeScript only
npm run build      # production build to dist/
npm run preview    # preview built dist/
```

Before claiming a code change is done, run at least:

```bash
npm run typecheck
npm run build
```

## Architecture map

- `src/App.tsx` — page composition and hash route switch
- `src/data/site.ts` — name, email, social links, legal placeholders, feature toggles
- `src/data/projects.ts` — project metadata and localized descriptions
- `src/data/skills.ts` — skill groups
- `src/i18n/types.ts` — required shape for all UI copy
- `src/i18n/de.ts` / `src/i18n/en.ts` — localized UI text
- `src/components/` — reusable UI pieces, each with its own CSS module
- `src/sections/` — homepage sections
- `src/pages/` — legal pages and case study view
- `src/styles/tokens.css` — design-token source of truth
- `src/styles/base.css` — reset and global primitives
- `public/` — copied as-is into `dist/`

## Content rules

- Keep user-facing copy bilingual: update German and English together.
- If adding a new translated field, update `src/i18n/types.ts` first, then satisfy TypeScript in both languages.
- Avoid hardcoded UI copy inside components unless it is genuinely non-user-facing.
- Project images should live in `src/assets/` when imported by components, or `public/` when referenced by URL.
- Do not invent collective contact/legal data. Leave placeholders or ask Artur / the collective.

## Design direction

The ADDD site should feel editorial, dark, technical, and slightly organic:

- Serif/editorial feel: Instrument Serif / Newsreader
- Technical mono/dot accents: Space Mono / Silkscreen / optional Nothing-like fonts
- Warm near-black palette with restrained gold accent
- Clean but not sterile; avoid generic SaaS-card soup
- Motion should stay calm and respect `prefers-reduced-motion`

Use `src/styles/tokens.css` as the main design-control surface. Prefer changing tokens over sprinkling one-off values through components.

## CSS conventions

- Components own their CSS via `Name.module.css`.
- Global CSS belongs only in `src/styles/tokens.css` or `src/styles/base.css`.
- Prefer existing tokens: colors, spacing, typography, motion, z-index.
- Keep focus states visible and keyboard navigation intact.
- Avoid introducing a UI framework unless Artur explicitly asks; this project is intentionally custom and lightweight.

## Accessibility and UX invariants

- Preserve semantic landmarks and heading order.
- Preserve skip link behavior.
- Keep `aria-current`, `aria-pressed`, and language handling correct.
- Do not trap keyboard focus in the mobile menu.
- Custom cursor must remain optional via `site.customCursor` and absent on touch devices.

## Deployment notes

GitHub Pages deploys on pushes to `main` using Node 20, `npm ci`, and `npm run build`.

The site uses relative asset paths (`base: './'`) so it works under `/Portfolio/` on GitHub Pages and in subfolders on normal hosting.

Do not force-push, rebase shared branches, or deploy manually without explicit confirmation.

## Hermes ↔ Claude Code workflow

Recommended collaboration model:

1. Hermes coordinates the task, checks repository state, and defines the scope.
2. Claude Code may be used as a focused worker for implementation, review, or debugging.
3. Shared repo facts should go here in `AGENTS.md`; Claude-specific interactive habits can go in `CLAUDE.md` only if needed.
4. After Claude Code changes files, Hermes should verify with git diff plus `npm run typecheck` and `npm run build` before reporting success.
5. Do not treat either agent's self-report as proof. Verify through real files, real diffs, and real command output.

For Claude Code one-shot tasks, prefer print mode from the repo root, e.g.:

```bash
claude -p "Review the current diff for bugs, accessibility regressions, and build issues." --allowedTools "Read,Bash" --max-turns 5
```

For iterative work, use a tmux-backed Claude Code session and clean it up afterwards.
