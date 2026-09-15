import { TextLink } from '@/components/Button'
import type { Program, ProgramId } from '@/data/programs'

const accents: Record<Program['accent'], string> = {
  lavender: 'bg-lavender/60 text-ink',
  sky: 'bg-sky-deep text-brand',
  sand: 'bg-sand text-ink',
  brand: 'bg-brand text-white',
}

type Props = {
  program: Program
  index: number
  /** Called before the link jumps to the enquiry form. */
  onSelect: (id: ProgramId) => void
}

/**
 * Compact program card: one tagline, four focus areas, one action. Built to
 * sit four across from 1280px (icon above the name there, so names never
 * wrap) and two across on tablets.
 * Hover (mouse only): the card lifts a few pixels, its shadow deepens, the
 * outline warms to brand blue and the arrow nudges on. The scroll reveal
 * lives on the wrapping list item, so the two never fight over a transition.
 */
export function ProgramCard({ program, index, onSelect }: Props) {
  const Icon = program.icon
  const headingId = `program-${program.id}`

  return (
    <article
      aria-labelledby={headingId}
      className="hover-card group/card flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift hover:ring-brand-soft sm:p-7 xl:p-6"
    >
      <header className="flex items-center gap-4 xl:flex-col xl:items-start">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-[scale] duration-500 ease-soft group-hover/card:scale-105 ${accents[program.accent]}`}
          aria-hidden="true"
        >
          <Icon size={22} />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {String(index + 1).padStart(2, '0')} · {program.audience}
          </p>
          <h3 id={headingId} className="mt-1 text-h3 text-ink xl:text-2xl">
            {program.name}
          </h3>
        </div>
      </header>

      <p className="mt-4 font-serif text-lg leading-snug text-ink italic">{program.tagline}</p>

      <p className="mt-5 border-t border-line pt-4 text-xs font-semibold tracking-[0.14em] text-ink uppercase">
        What we work on
      </p>
      <ul className="mt-3 space-y-2 text-[15px] leading-snug">
        {program.workOn.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-muted before:absolute before:top-[0.65em] before:left-0 before:h-px before:w-2.5 before:bg-brand-accent"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <TextLink href="#booking-form" onClick={() => onSelect(program.id)} className="xl:text-sm">
          Ask about {program.name}
        </TextLink>
      </div>
    </article>
  )
}
