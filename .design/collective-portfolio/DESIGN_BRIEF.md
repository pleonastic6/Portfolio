# Design Brief — ADDD Collective Portfolio

## Feature / surface

The public portfolio site for **ADDD** — Artur, David, David, Dominik — as a young developer collective. The site should present the group and their work without turning Artur into the visible solo founder.

## Primary job

Convince a visitor that ADDD is a careful, technically capable developer collective worth talking to for software projects, prototypes, and web/application work — even while the collective's exact market focus is still forming.

## Audience

- Potential collaborators, clients, teachers, and peers who want to understand what ADDD can build.
- Technical visitors checking whether the work feels real rather than template-generated.
- Non-technical visitors who need quick orientation: who this is, what they make, how to contact them.

## Positioning

ADDD should feel like a small collective with taste and technical discipline, not like a generic agency template. The page should foreground the collective identity and public work. Older/personal themes can stay archived in the repo, but public presentation should center the current collective direction.

## Visual direction

Use the existing direction as the base:

- **Dark organic editorial** foundation.
- **Noir et Or** ADDD pixel/wordmark stays unless explicitly changed later.
- **Nothing-like mono/dot accents**: technical, restrained, not a pasted gadget aesthetic.
- **Editorial serif + technical mono**: Newsreader / Instrument-like editorial feel with Space Mono / Silkscreen / optional Nothing-like details.
- **Warm near-black + restrained gold**: gold is signal, not decoration.
- **Clean but not sterile**: add analog/organic warmth through texture, spacing, and image integration.

## Anti-goals / things to avoid

- Generic SaaS-card soup: identical rounded cards, soft grey shadows, decorative gradient washes.
- Smooth startup-template perfection: especially Space-Grotesk-ish generic portfolio polish.
- Warm amber glow everywhere.
- AI aesthetic assets pasted in as isolated decoration. Any generated/abstract asset must be integrated into layout and hierarchy.
- Visible theme switcher or older design-switcher UI unless explicitly requested.
- Personal-founder framing where Artur is the product. ADDD is the product.
- Fake process numbering or `01 / 02 / 03` markers unless the content really is sequential.
- All-caps eyebrow labels above every heading just because the model likes them.

## Existing codebase constraints

- Stack: Vite + React 18 + TypeScript.
- Styling: CSS Modules plus global tokens in `src/styles/tokens.css` and primitives in `src/styles/base.css`.
- Routing: custom hash routing, no React Router.
- Backend: none; static build only.
- Existing bilingual content must stay synchronized in `src/i18n/de.ts` and `src/i18n/en.ts`.
- Prefer token changes over one-off component values.
- Keep accessibility invariants from `AGENTS.md`: semantic landmarks, heading order, skip link, focus states, aria-current/aria-pressed, touch-safe cursor behavior.

## Content principles

- Plain, concrete language. No agency vapor like “we craft digital experiences”.
- Show actual work and working repos where possible.
- If something is still undecided, frame it honestly: a young collective building careful software, not a fake mature studio.
- Calls to action should say exactly what happens: “Projekt anfragen”, “GitHub ansehen”, “Kontakt aufnehmen”.
- Empty/legal/contact placeholders must not invent shared email, domain, address, or client claims.

## Design system guidance

The existing `src/styles/tokens.css` remains the main control surface. If future design passes need changes:

- Extend existing semantic tokens first.
- Keep `--c-accent` restrained.
- Preserve readable contrast in both default and alternate themes.
- Keep motion calm and respect `prefers-reduced-motion`.
- Use `--font-dot` only as an accent, never as body text.

## First implementation priorities

1. Confirm that public navigation and section order foreground the collective and current work.
2. Remove or hide any visible legacy design switcher unless Arturo asks for it.
3. Review hero framing: it should communicate ADDD as collective, not Artur as solo portfolio.
4. Tighten project presentation so screenshots remain normal/legible while aesthetic assets support the layout.
5. Run a design review with screenshots after any visual change.

## Recommended Claude Code skill path

For small polish tasks, use the project-local `anthropic-frontend-design` skill.

For larger redesign or new section work, use the project-local Julian workflow:

1. `grill-me`
2. `design-brief`
3. `information-architecture`
4. `design-tokens` only if token changes are needed
5. `brief-to-tasks`
6. `frontend-design`
7. `design-review`

This brief is the seed artifact for that flow.
