import { Container, Section } from '@/components/layout'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

const stages = [
  {
    title: 'Understand your starting point',
    desc: 'We look at your current level, what you need English for and how you like to learn.',
  },
  {
    title: 'Build strong foundations',
    desc: 'The vocabulary, grammar and language patterns you need to communicate, chosen for your goals.',
  },
  {
    title: 'Guided practice',
    desc: 'Structured speaking activities and practical exercises help new language settle in.',
  },
  {
    title: 'Real communication',
    desc: 'You put English to work in realistic conversations, situations and topics.',
  },
  {
    title: 'Growing confidence',
    desc: 'Using English on your own starts to feel more comfortable and more natural.',
  },
]

/*
 * Motion. Desktop: the path draws left to right while stages 01 to 05 appear
 * one after another, each node scaling up and its text following a moment
 * later (about 1.6s in all). Phones: each stage reveals as it scrolls into
 * view and draws the short line down to the next one.
 */
export function LearningJourney() {
  return (
    <Section id="progress" labelledBy="progress-title" tone="night">
      <Container>
        <SectionHeading
          id="progress-title"
          tone="dark"
          eyebrow="Your progress"
          title="How your English grows"
          intro="There’s no fixed textbook route. Every learner moves at their own pace, but progress usually has a shape. This is how it tends to unfold."
        />

        <div className="relative mt-16 lg:mt-20">
          {/* The path across all five stages (desktop). */}
          <Reveal
            className="draw-x absolute top-[1.375rem] right-0 left-0 hidden h-px bg-linear-to-r from-brand-soft/60 via-brand-soft/30 to-transparent lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid gap-10 [--order-step:180ms] lg:grid-cols-5 lg:gap-8">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.title} className="relative flex gap-6 lg:flex-col lg:gap-7">
                {/* The path down to the next stage (phones and tablets). */}
                {i < stages.length - 1 && (
                  <span
                    className="draw-y absolute top-11 -bottom-10 left-[1.375rem] w-px bg-linear-to-b from-brand-soft/50 to-brand-soft/20 [--delay:150ms] lg:hidden"
                    aria-hidden="true"
                  />
                )}
                <span
                  className="reveal reveal-scale relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-soft/40 bg-night font-serif text-lg text-white [--scale:0.8]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="reveal pt-2 [--delay:120ms] [--distance:10px] lg:pt-0">
                  <h3 className="text-xl leading-snug text-white">
                    <span className="sr-only">Stage {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <p className="mt-16 max-w-2xl border-l border-brand-soft/40 pl-5 font-serif text-lg text-white/80 italic lg:mt-20">
          Children, teens and adults each move through these stages differently. We revisit and adjust
          the plan as you grow.
        </p>
      </Container>
    </Section>
  )
}
