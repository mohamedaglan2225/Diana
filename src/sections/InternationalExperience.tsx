import type { CSSProperties } from 'react'
import { Container, Section } from '@/components/layout'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { useReveal } from '@/hooks/useReveal'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/*
 * "Studied in" comes from the site owner. "Taught" is only listed where the
 * existing experience timeline supports it (International House Voronezh;
 * teaching in Vietnam). No institutions or dates are added for study.
 */
const countries = [
  {
    name: 'Russia',
    native: 'Россия',
    lang: 'ru',
    notes: ['Studied', 'Taught at International House Voronezh'],
  },
  {
    name: 'Vietnam',
    native: 'Việt Nam',
    lang: 'vi',
    notes: ['Studied', 'Taught ESL classes and Business English'],
  },
  {
    name: 'Egypt',
    native: 'مصر',
    lang: 'ar',
    notes: ['Studied'],
  },
]

/*
 * Motion: a hairline draws across the three columns, then Russia, Vietnam
 * and Egypt arrive in turn. In each, the name rises first, the native word
 * fades in just after, then the notes.
 */
export function InternationalExperience() {
  const textRef = useReveal()

  return (
    <Section id="international" labelledBy="international-title" tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            id="international-title"
            eyebrow="An international perspective"
            title="Learning across cultures"
          />
          <div ref={textRef} className="reveal space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:pt-12">
            <p>
              I&rsquo;ve studied in Russia, Vietnam and Egypt. Learning in such different places gave
              me an international perspective on language, communication and learning itself.
            </p>
            <p>
              It shapes how I teach every day. Every learner communicates, thinks and builds
              confidence differently, and a good lesson makes room for that.
            </p>
          </div>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <Reveal className="draw-x absolute inset-x-0 top-0 h-px bg-line [transition-duration:1.4s]" aria-hidden="true" />
          <ul className="grid [--order-step:200ms] sm:grid-cols-3">
            {countries.map((c) => (
              <Reveal
                as="li"
                key={c.name}
                className="border-b border-line py-8 sm:border-b-0 sm:py-10 sm:pr-8 sm:not-first:border-l sm:not-first:pl-8 lg:pr-12 lg:not-first:pl-12"
              >
                <span
                  lang={c.lang}
                  className="reveal reveal-fade block text-sm text-subtle"
                  style={delay(160)}
                  aria-hidden="true"
                >
                  {c.native}
                </span>
                <h3 className="reveal mt-2 text-[2.5rem] leading-none text-ink [--distance:16px] lg:text-5xl">
                  {c.name}
                </h3>
                <ul className="reveal mt-6 space-y-2 text-[15px] text-muted [--distance:8px]" style={delay(280)}>
                  {c.notes.map((n) => (
                    <li key={n} className="flex items-baseline gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 translate-y-[-0.1em] rounded-full bg-brand-accent" aria-hidden="true" />
                      {n}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
