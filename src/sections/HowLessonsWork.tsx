import { Container, Section } from '@/components/layout'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

/*
 * Confirmed by the owner: lessons are online, as private 1-to-1 or group
 * lessons. No group sizes, schedules or durations are stated.
 */
const formats = [
  {
    label: 'Just you',
    title: 'Private 1-to-1',
    desc: 'Personal attention, with every lesson adapted closely to your level, goals and pace.',
    goodFor: 'Good if you want a fully personal plan or have a specific goal in mind.',
  },
  {
    label: 'Learn together',
    title: 'Group lessons',
    desc: 'Interactive lessons where you communicate, practise and learn alongside other students.',
    goodFor: 'Good if you enjoy speaking with others and learning through interaction.',
  },
]

const qualities = [
  {
    title: 'Personalised',
    desc: 'Topics, pace and activities are chosen to fit the learner’s age, level and goals.',
  },
  {
    title: 'Practical',
    desc: 'Vocabulary and grammar arrive inside real situations, so they’re ready to use.',
  },
  {
    title: 'Interactive',
    desc: 'Games, role-plays, pictures and discussion. Students talk, not just listen.',
  },
  {
    title: 'Supportive',
    desc: 'There’s room to hesitate and get things wrong. That’s how speaking gets easier.',
  },
]

/*
 * Motion: the two formats arrive as a pair, 1-to-1 from the left and group
 * from the right, then the qualities follow in a quick row. On hover the
 * format cards only deepen their outline and shadow; they never move.
 */
export function HowLessonsWork() {
  return (
    <Section id="how-lessons-work" labelledBy="lessons-work-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            id="lessons-work-title"
            eyebrow="How lessons work"
            title="What studying with me looks like"
            intro="All lessons are online, so you can learn from home or wherever you are. There are two ways to study."
          />

          <ul className="grid gap-5 [--distance:18px] sm:grid-cols-2 lg:self-end">
            {formats.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                className={`reveal flex ${i === 0 ? 'reveal-left' : 'reveal-right'}`}
              >
                <div className="flex w-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-line transition-shadow duration-500 ease-soft hover:shadow-lift hover:ring-brand-soft">
                  <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">{f.label}</p>
                  <h3 className="mt-3 text-h3 text-ink">{f.title}</h3>
                  <p className="mt-3 mb-6 text-[15px] leading-relaxed text-muted">{f.desc}</p>
                  <p className="mt-auto border-t border-line pt-4 text-sm leading-relaxed text-ink">
                    {f.goodFor}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-sm font-medium text-ink lg:mt-20">Whichever format you choose, lessons are:</p>
        <ul className="mt-2 grid gap-x-10 [--distance:12px] [--order-step:80ms] sm:grid-cols-2 lg:grid-cols-4">
          {qualities.map((q) => (
            <Reveal as="li" key={q.title} className="reveal border-t border-line py-6">
              <h3 className="flex items-center gap-3 text-xl text-ink">
                <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" />
                {q.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{q.desc}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
