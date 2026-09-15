import type { ComponentType } from 'react'
import { AwardIcon, ClockIcon, GlobeIcon, UsersIcon } from '@/components/Icons'
import { Container } from '@/components/layout'
import { useReveal } from '@/hooks/useReveal'
import { siteConfig } from '@/site.config'

const countries = siteConfig.studiedIn
const studiedIn =
  countries.length > 1 ? `${countries.slice(0, -1).join(', ')} and ${countries.at(-1)}` : countries.join('')

/*
 * The one place the page states its credentials as headline facts. Elsewhere
 * they only appear where the context needs them (the certificate itself, the
 * experience timeline), never as a repeated badge.
 */
const facts: { value: string; label: string; Icon: ComponentType<{ size?: number }> }[] = [
  { value: '7+ years', label: 'Teaching English', Icon: ClockIcon },
  { value: 'TESOL / TEFL', label: '120-hour certified teacher', Icon: AwardIcon },
  { value: 'International', label: `Studied in ${studiedIn}`, Icon: GlobeIcon },
  { value: 'Kids to adults', label: 'Every level, beginner to advanced', Icon: UsersIcon },
]

/**
 * Sits on the seam between the hero and Programs: the band's top half matches
 * the hero, its bottom half the Programs section, and the card spans both.
 * Hairline dividers come from a 1px grid gap over the line colour, so they
 * stay correct in the 2-column (phone) and 4-column (desktop) layouts.
 */
export function TrustStrip() {
  const ref = useReveal<HTMLUListElement>()

  return (
    <section aria-label="At a glance" className="bg-linear-to-b from-canvas from-50% to-sky to-50%">
      <Container>
        <ul
          ref={ref}
          className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line shadow-card ring-1 ring-line [--distance:16px] lg:grid-cols-4"
        >
          {facts.map(({ value, label, Icon }) => (
            // Icon beside the text where a cell is wide (2 columns, or 4 from 1280px); stacked above it otherwise.
            <li
              key={value}
              className="flex flex-col gap-3 bg-surface p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-6 lg:flex-col lg:items-start lg:gap-3 xl:flex-row xl:items-center xl:gap-4 xl:p-7"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky text-brand sm:h-11 sm:w-11"
                aria-hidden="true"
              >
                <Icon size={20} />
              </span>
              <p>
                <strong className="block font-serif text-xl leading-tight font-normal text-ink sm:text-2xl">{value}</strong>
                <span className="mt-0.5 block text-sm leading-snug text-muted">{label}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
