import type { CSSProperties } from 'react'
import { Container } from '@/components/layout'
import { useReveal } from '@/hooks/useReveal'

const facts = [
  { value: '7+ years', label: 'Teaching English' },
  { value: '120-hour', label: 'TESOL / TEFL certified' },
  { value: 'All levels', label: 'Beginner to advanced' },
]

export function TrustStrip() {
  const ref = useReveal<HTMLDListElement>()

  return (
    <section aria-label="At a glance" className="border-y border-line">
      <Container>
        <dl ref={ref} className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className="reveal flex flex-row-reverse items-baseline justify-between gap-4 py-4 sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-1 sm:px-6 sm:py-8 sm:first:pl-0 lg:px-10"
              style={{ '--i': i } as CSSProperties}
            >
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="font-serif text-2xl text-ink sm:text-3xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
