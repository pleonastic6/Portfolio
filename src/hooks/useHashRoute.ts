import { useEffect, useState } from 'react'

/**
 * Winziges Hash-Routing.
 * Nur Hashes mit fuehrendem Slash gelten als Route (#/impressum, #/projekt/x) —
 * normale Sprungmarken wie #work bleiben davon unberuehrt.
 *
 * Hash statt History-API, weil die Seite als statischer Build laeuft: so
 * braucht kein Server eine Rewrite-Regel, weder GitHub Pages noch Webspace.
 */
export type Route =
  | { name: 'home' }
  | { name: 'imprint' }
  | { name: 'privacy' }
  | { name: 'case'; slug: string }

const HOME: Route = { name: 'home' }

function parse(hash: string): Route {
  if (!hash.startsWith('#/')) return HOME

  const path = hash.slice(2).replace(/\/$/, '')
  if (path === 'impressum' || path === 'imprint') return { name: 'imprint' }
  if (path === 'datenschutz' || path === 'privacy') return { name: 'privacy' }

  const match = /^(?:projekt|project)\/([\w-]+)$/.exec(path)
  if (match) return { name: 'case', slug: match[1] }

  return HOME
}

function currentRoute(): Route {
  if (typeof window === 'undefined') return HOME
  return parse(window.location.hash)
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(currentRoute)

  useEffect(() => {
    const onChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
