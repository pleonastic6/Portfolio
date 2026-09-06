import { useEffect, useRef } from 'react'

/**
 * Blendet ein Element beim ersten Sichtbarwerden ein.
 * Nutzung: <div className="reveal" ref={useReveal<HTMLDivElement>()}>
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
