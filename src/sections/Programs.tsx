import { TextLink } from '@/components/Button'
import { Container, Section } from '@/components/layout'
import { ProgramCard } from '@/components/ProgramCard'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { SpecialProgramCard } from '@/components/SpecialProgramCard'
import { programs, specialPrograms, type ProgramChoice } from '@/data/programs'

type Props = { onSelect: (choice: ProgramChoice) => void }

/*
 * The four core programs in one row from 1280px (2 × 2 on tablets), then the
 * special programs as a pair of warmer cards on a shared band. Six programs,
 * two rows on desktop.
 */
export function Programs({ onSelect }: Props) {
  return (
    <Section id="programs" labelledBy="programs-title" tone="sky">
      {/* Keeps links to the old #lessons anchor working. */}
      <span id="lessons" aria-hidden="true" />
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow="Programs"
            title="Who I help, and how"
            intro="Four core programs by age and goal, plus focused programs for speaking practice and travel."
          />
          <Reveal
            as="p"
            className="reveal reveal-fade shrink-0 text-[15px] text-muted [--delay:260ms] lg:pb-2 lg:text-right"
          >
            Not sure which fits?
            <br className="hidden lg:block" />{' '}
            <TextLink href="#placement-test">Start with the placement test</TextLink>
          </Reveal>
        </div>

        {/* Each card reveals as it is reached; cards that arrive together stagger 01, 02… */}
        <ul className="mt-10 grid gap-5 [--order-step:90ms] md:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {programs.map((p, i) => (
            <Reveal as="li" key={p.id} className="reveal">
              <ProgramCard program={p} index={i} onSelect={onSelect} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 rounded-media bg-surface/55 p-4 ring-1 ring-brand-soft/50 sm:p-6 lg:mt-12">
          <Reveal className="reveal flex flex-col gap-1 px-1 [--distance:12px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <h3 className="flex items-center gap-3 text-h3 text-ink">
              <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" />
              Special programs
            </h3>
            <p className="text-[15px] text-muted">Focused options for a specific goal.</p>
          </Reveal>
          <ul className="mt-5 grid gap-4 [--order-step:90ms] md:grid-cols-2 lg:gap-5">
            {specialPrograms.map((p) => (
              <Reveal as="li" key={p.id} className="reveal">
                <SpecialProgramCard program={p} onSelect={onSelect} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
