/**
 * Buchstabenformen der ADDD-Wortmarke (siehe components/Wordmark.tsx),
 * einzeln abrufbar — fuer Konturen im Footer und auf den Teamtafeln.
 */
export const LETTERS = [
  'M15.0 8 L30.0 38.0 L22.75 38.0 L19.875 32.0 L10.125 32.0 L7.25 38.0 L0 38.0 Z M12.625 26.875 L17.375 26.875 L15.0 21.25 Z',
  'M37 8 L49.5 8 A15.0 15.0 0 0 1 49.5 38.0 L37 38.0 Z M43.75 14.75 L43.75 31.25 L49.0 31.25 A8.25 8.25 0 0 0 49.0 14.75 Z',
  'M74 8 L86.5 8 A15.0 15.0 0 0 1 86.5 38.0 L74 38.0 Z M80.75 14.75 L80.75 31.25 L86.0 31.25 A8.25 8.25 0 0 0 86.0 14.75 Z',
  'M111 8 L123.5 8 A15.0 15.0 0 0 1 123.5 38.0 L111 38.0 Z M117.75 14.75 L117.75 31.25 L123.0 31.25 A8.25 8.25 0 0 0 123.0 14.75 Z',
] as const

/** viewBox, der genau einen Buchstaben umschliesst */
export const LETTER_BOX = ['-1 7 32 32', '36 7 32 32', '73 7 32 32', '110 7 32 32'] as const
