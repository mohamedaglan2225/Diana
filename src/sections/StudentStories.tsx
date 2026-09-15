import type { CSSProperties } from 'react'
import { Container, Section } from '@/components/layout'
import { SectionHeading } from '@/components/SectionHeading'
import { testimonials } from '@/data/testimonials'
import { useReveal } from '@/hooks/useReveal'

/**
 * Real student and parent reviews. Renders nothing until
 * `src/data/testimonials.ts` contains genuine, permission-given quotes.
 */
export function StudentStories() {
  const ref = useReveal<HTMLUListElement>()
  if (testimonials.length === 0) return null

  return (
    <Section id="stories" labelledBy="stories-title" tone="sand">
      <Container>
        <SectionHeading id="stories-title" eyebrow="Student stories" title="In their own words" />
        <ul ref={ref} className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.quote} className="reveal" style={{ '--i': i } as CSSProperties}>
              <figure className="flex h-full flex-col rounded-card bg-surface p-8 shadow-card">
                <blockquote className="font-serif text-xl leading-snug text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-6 text-sm text-muted">
                  <span className="font-medium text-ink">{t.name}</span>
                  {t.context && <span> · {t.context}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
