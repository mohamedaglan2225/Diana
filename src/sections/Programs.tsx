import { TextLink } from '@/components/Button'
import { Container, Section } from '@/components/layout'
import { ProgramCard } from '@/components/ProgramCard'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { programs, type ProgramChoice } from '@/data/programs'

type Props = { onSelect: (choice: ProgramChoice) => void }

export function Programs({ onSelect }: Props) {
  return (
    <Section id="programs" labelledBy="programs-title" tone="sky">
      {/* Keeps links to the old #lessons anchor working. */}
      <span id="lessons" aria-hidden="true" />
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow="Programs"
            title="Who I help, and how"
            intro="Four online programs for four kinds of learners. Each one is adapted to the student’s age, level and goals, so no two lessons look exactly the same."
          />
          <Reveal
            as="p"
            className="reveal reveal-fade shrink-0 text-[15px] text-muted [--delay:260ms] lg:pb-2 lg:text-right"
          >
            Not sure which fits?
            <br className="hidden lg:block" />{' '}
            <TextLink href="#booking-form" onClick={() => onSelect('unsure')}>
              I’ll help you choose
            </TextLink>
          </Reveal>
        </div>

        {/* Each card reveals as it is reached; cards that arrive together stagger 01, 02… */}
        <ul className="mt-14 grid gap-5 [--order-step:90ms] md:grid-cols-2 lg:mt-16 lg:gap-6">
          {programs.map((p, i) => (
            <Reveal as="li" key={p.id} className="reveal">
              <ProgramCard program={p} index={i} onSelect={onSelect} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted">
          Every program can be taken as private 1-to-1 lessons or as group lessons, depending on the
          learner’s needs and current availability.
        </p>
      </Container>
    </Section>
  )
}
