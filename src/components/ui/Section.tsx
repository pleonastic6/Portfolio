import type { ReactNode } from 'react'
import { Container } from './Container'
import { useReveal } from '../../hooks/useReveal'

type SectionProps = {
  id: string
  title: string
  lead?: string
  eyebrow?: string
  children: ReactNode
}

/** Einheitlicher Rahmen fuer alle Inhaltsabschnitte. */
export function Section({ id, title, lead, eyebrow, children }: SectionProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <Container>
        <div className="reveal" ref={ref}>
          <header className="section__head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={`${id}-title`} className="section__title">
              {title}
            </h2>
            {lead && <p className="section__lead">{lead}</p>}
          </header>
          {children}
        </div>
      </Container>
    </section>
  )
}
