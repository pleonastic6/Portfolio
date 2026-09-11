/**
 * ADDD-Marke als Inline-SVG.
 *
 * Verwendet den gewählten Quadrant-Golden-A-Entwurf: vier Felder für
 * Artur, David, David und Dominik; das A trägt den warmen Akzent.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="ADDD"
      focusable="false"
    >
      <rect width="64" height="64" fill="transparent" />
      <path
        fill="var(--c-accent)"
        fillRule="evenodd"
        d="M18 6 30 30h-5.8l-2.3-4.8h-7.8L11.8 30H6L18 6Zm-1.9 15.1h3.8L18 16.6l-1.9 4.5Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M34 6h10a12 12 0 0 1 0 24H34V6Zm5.4 5.4v13.2h4.2a6.6 6.6 0 0 0 0-13.2h-4.2Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 34h10a12 12 0 0 1 0 24H6V34Zm5.4 5.4v13.2h4.2a6.6 6.6 0 0 0 0-13.2h-4.2Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M34 34h10a12 12 0 0 1 0 24H34V34Zm5.4 5.4v13.2h4.2a6.6 6.6 0 0 0 0-13.2h-4.2Z"
      />
    </svg>
  )
}
