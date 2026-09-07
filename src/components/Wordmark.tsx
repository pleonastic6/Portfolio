/**
 * ADDD-Wortmarke als Inline-SVG.
 *
 * Bewusst keine Bilddatei: nur inline erben die drei D die Textfarbe
 * (currentColor) und reagieren damit auf Hover und Fokus. Das A steht als
 * einziger Buchstabe im Akzentton — ein fester Punkt in der Marke.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 141 38"
      role="img"
      aria-label="ADDD"
      focusable="false"
    >
      <path fill="var(--c-accent)" fillRule="evenodd" d="M15.0 8 L30.0 38.0 L22.75 38.0 L19.875 32.0 L10.125 32.0 L7.25 38.0 L0 38.0 Z M12.625 26.875 L17.375 26.875 L15.0 21.25 Z" />
      <g fill="currentColor">
        <path fillRule="evenodd" d="M37 8 L49.5 8 A15.0 15.0 0 0 1 49.5 38.0 L37 38.0 Z M43.75 14.75 L43.75 31.25 L49.0 31.25 A8.25 8.25 0 0 0 49.0 14.75 Z" />
        <path fillRule="evenodd" d="M74 8 L86.5 8 A15.0 15.0 0 0 1 86.5 38.0 L74 38.0 Z M80.75 14.75 L80.75 31.25 L86.0 31.25 A8.25 8.25 0 0 0 86.0 14.75 Z" />
        <path fillRule="evenodd" d="M111 8 L123.5 8 A15.0 15.0 0 0 1 123.5 38.0 L111 38.0 Z M117.75 14.75 L117.75 31.25 L123.0 31.25 A8.25 8.25 0 0 0 123.0 14.75 Z" />
      </g>
    </svg>
  )
}
