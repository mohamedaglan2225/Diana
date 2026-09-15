import { Container, Section } from '@/components/layout'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

/*
 * Replaces the former "Learning journey" and "How lessons work" sections:
 * the learner's path in four steps, and the two lesson formats. This is the
 * overview; the placement test's own details (estimated level, teacher
 * review) live in the Placement Test section right below, not here.
 * Confirmed by the owner: lessons are online, as private 1-to-1 or group
 * lessons. No group sizes, schedules or durations are stated.
 */
const steps = [
  {
    title: 'Placement test',
    desc: 'Every new student starts here, so nobody begins in the wrong place.',
  },
  {
    title: 'Level recommendation',
    desc: 'You get a suggested level, program and lesson format.',
  },
  {
    title: 'Start classes',
    desc: 'Online lessons begin at your recommended level.',
  },
  {
    title: 'Track improvement',
    desc: 'We revisit your goals and adjust the plan as your English grows.',
  },
]

const formats = [
  {
    label: 'Just you',
    title: 'Private 1-to-1',
    desc: 'Personal attention, with every lesson adapted closely to your level, goals and pace.',
    goodFor: 'Good for a fully personal plan or a specific goal.',
  },
  {
    label: 'Learn together',
    title: 'Group lessons',
    desc: 'Interactive lessons where you communicate and practise alongside other students.',
    goodFor: 'Good if you enjoy speaking with others and learning through interaction.',
  },
]

/*
 * Motion: the two formats arrive as a pair, 1-to-1 from the left and group
 * from the right. Desktop: the path draws left to right while steps 01 to 04
 * appear in turn. Phones: each step reveals as it is reached and draws the
 * short line down to the next one.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" tone="canvas">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title="From your first test to real progress"
            intro="Start at the right level, then move at your own pace in online lessons you can join from anywhere."
          />

          <ul className="grid gap-4 [--distance:18px] sm:grid-cols-2" aria-label="Lesson formats">
            {formats.map((f, i) => (
              <Reveal as="li" key={f.title} className={`reveal flex ${i === 0 ? 'reveal-left' : 'reveal-right'}`}>
                <div className="flex w-full flex-col rounded-card bg-surface p-6 ring-1 ring-line transition-shadow duration-500 ease-soft hover:shadow-card hover:ring-brand-soft">
                  <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">{f.label}</p>
                  <h3 className="mt-2 text-h3 text-ink">{f.title}</h3>
                  <p className="mt-2 mb-5 text-[15px] leading-relaxed text-muted">{f.desc}</p>
                  <p className="mt-auto border-t border-line pt-4 text-sm leading-relaxed text-ink">{f.goodFor}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="relative mt-12 lg:mt-14">
          {/* The path across all four steps (desktop). */}
          <Reveal
            className="draw-x absolute top-[1.375rem] right-0 left-0 hidden h-px bg-linear-to-r from-brand-soft via-brand-soft/60 to-transparent lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-8 [--order-step:160ms] sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} className="relative flex gap-5 lg:flex-col lg:gap-6">
                {/* The path down to the next step (phones). */}
                {i < steps.length - 1 && (
                  <span
                    className="draw-y absolute top-11 -bottom-8 left-[1.375rem] w-px bg-linear-to-b from-brand-soft to-brand-soft/30 [--delay:150ms] sm:hidden"
                    aria-hidden="true"
                  />
                )}
                <span
                  className="reveal reveal-scale relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-soft bg-surface font-serif text-lg text-brand [--scale:0.8]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="reveal pt-2 [--delay:120ms] [--distance:10px] lg:pt-0">
                  <h3 className="text-xl leading-snug text-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
