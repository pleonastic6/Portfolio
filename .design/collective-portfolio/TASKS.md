# Tasks — ADDD Collective Portfolio Design Flow

- [x] **Audit current public framing**: Check hero, nav, about, work, and contact sections for solo-portfolio language vs collective positioning.
- [x] **Hide legacy theme affordances if visible**: Ensure older themes/design switcher are not public UI unless explicitly requested.
- [x] **Hero specificity pass**: Make the first viewport unmistakably ADDD: collective identity, current public work, restrained Noir et Or / dot-mono signature.
- [x] **Project presentation pass**: Keep screenshots normal and readable; integrate aesthetic/AI assets as layout texture or atmosphere, not pasted decoration.
- [x] **Token sanity check**: Prefer edits in `src/styles/tokens.css`; preserve dark editorial base, restrained gold accent, readable contrast, reduced motion.
- [x] **Bilingual copy check**: If any user-facing copy changes, update `src/i18n/de.ts`, `src/i18n/en.ts`, and `src/i18n/types.ts` together.
- [x] **Accessibility/build verification**: Run `npm run typecheck` and `npm run build`; manually check focus/keyboard paths for changed UI.
- [ ] **Design review**: Use screenshots plus `design-review` after visual implementation.
