import { TextLink } from '@/components/Button'
import type { ProgramId, SpecialProgram } from '@/data/programs'

type Props = {
  program: SpecialProgram
  /** Called before the link jumps to the enquiry form. */
  onSelect: (id: ProgramId) => void
}

/**
 * A focused program, set apart from the core cards by a warm sand surface
 * and topic pills instead of a list, so it stays short however many topics
 * it has. Hover (mouse only) only deepens the outline; the card never moves.
 */
export function SpecialProgramCard({ program, onSelect }: Props) {
  const Icon = program.icon
  const headingId = `program-${program.id}`
  const topicsId = `${headingId}-topics`

  return (
    <article
      aria-labelledby={headingId}
      className="hover-card flex h-full flex-col rounded-card bg-sand p-6 ring-1 ring-ink/5 transition-shadow duration-500 ease-soft hover:shadow-card hover:ring-brand-soft sm:p-7"
    >
      <header className="flex items-center gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand"
          aria-hidden="true"
        >
          <Icon size={20} />
        </span>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">{program.kind}</p>
          <h4 id={headingId} className="mt-1 text-h3 text-ink">
            {program.name}
          </h4>
        </div>
      </header>

      <p className="mt-4 text-[15px] leading-relaxed text-ink">{program.summary}</p>

      <p id={topicsId} className="mt-4 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
        {program.topicsLabel}
      </p>
      <ul aria-labelledby={topicsId} className="mt-3 flex flex-wrap gap-2">
        {program.topics.map((t) => (
          <li key={t} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink ring-1 ring-ink/5">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-6 xl:flex-row xl:items-end xl:justify-between">
        <p className="text-sm text-muted italic">{program.note}</p>
        <TextLink href="#booking-form" onClick={() => onSelect(program.id)} className="shrink-0">
          Ask about {program.name}
        </TextLink>
      </div>
    </article>
  )
}
