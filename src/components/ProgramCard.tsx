import { TextLink } from '@/components/Button'
import type { Program, ProgramId } from '@/data/programs'

const accents: Record<Program['accent'], string> = {
  lavender: 'bg-lavender/60 text-ink',
  sky: 'bg-sky text-brand',
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
 * Hover (mouse only): the card lifts a few pixels, its shadow deepens, the
 * outline warms to brand blue, the number darkens and the arrow nudges on.
 * The scroll reveal lives on the wrapping list item, so the two never fight
 * over the same transition.
 */
export function ProgramCard({ program, index, onSelect }: Props) {
  const Icon = program.icon
  const headingId = `program-${program.id}`

  return (
    <article
      aria-labelledby={headingId}
      className="hover-card group/card flex h-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-soft hover:-translate-y-[5px] hover:shadow-lift hover:ring-brand-soft sm:p-9"
    >
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase transition-colors duration-300 group-hover/card:text-brand-dark">
            {String(index + 1).padStart(2, '0')} · {program.audience}
          </p>
          <h3 id={headingId} className="mt-3 text-h3 text-ink">
            {program.name}
          </h3>
        </div>
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-[scale] duration-500 ease-soft group-hover/card:scale-105 ${accents[program.accent]}`}
          aria-hidden="true"
        >
          <Icon size={22} />
        </span>
      </header>

      <p className="mt-3 font-serif text-lg text-muted italic">{program.tagline}</p>

      <dl className="mt-7 space-y-6 border-t border-line pt-7 text-[15px] leading-relaxed">
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Who it’s for</dt>
          <dd className="mt-2 text-muted">{program.forWhom}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">What we work on</dt>
          <dd className="mt-3">
            <ul className="space-y-2.5">
              {program.workOn.map((item) => (
                <li
                  key={item}
                  className="relative pl-6 text-muted before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-brand-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">The goal</dt>
          <dd className="mt-2 text-ink">{program.goal}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-8">
        <TextLink href="#booking-form" onClick={() => onSelect(program.id)}>
          Ask about {program.name}
        </TextLink>
      </div>
    </article>
  )
}
