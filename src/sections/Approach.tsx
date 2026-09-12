import { Container, Section } from '@/components/layout'
import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { approachPhoto } from '@/lib/images'

const principles = [
  {
    title: 'Speak from day one',
    desc: 'Speaking isn’t saved for later. It’s part of every lesson, at every level.',
  },
  {
    title: 'Learn by doing',
    desc: 'Games, challenges and hands-on tasks: students match, move, solve and create.',
  },
  {
    title: 'Personalised learning',
    desc: 'The plan follows the learner, not a fixed textbook, and changes as they grow.',
  },
  {
    title: 'Confidence first',
    desc: 'Feeling safe to speak comes before perfect accuracy. The accuracy follows.',
  },
]

/*
 * Motion: each principle reveals as it is reached, its large number first,
 * then the title and description. On hover the number strengthens and a
 * short brand rule grows along the top border. No card treatment; it stays
 * an editorial list.
 */
export function Approach() {
  const photoRef = useReveal()

  return (
    <Section id="my-approach" labelledBy="approach-title">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div>
          <SectionHeading
            id="approach-title"
            eyebrow="My approach"
            title="Learning should feel active"
            intro="My classes are built around participation, not passive memorisation. English is something my students use, not simply something they study."
          />

          <ol className="mt-12 grid gap-x-10 [--order-step:90ms] sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                className="group relative border-t border-line py-7 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-500 before:ease-soft hover:before:scale-x-100"
              >
                <span className="reveal block font-serif text-4xl leading-none [--distance:14px]" aria-hidden="true">
                  <span className="text-brand-accent transition-colors duration-300 group-hover:text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="reveal [--delay:110ms] [--distance:10px]">
                  <h3 className="mt-4 text-xl text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <figure ref={photoRef} className="reveal relative mx-auto w-full max-w-md pb-10 lg:max-w-none lg:pb-0">
          <Photo
            photo={approachPhoto}
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw"
            className="aspect-4/5 w-full rounded-media shadow-media"
          />
          <figcaption className="reveal absolute right-4 bottom-0 left-4 rounded-2xl bg-brand px-6 py-5 text-white shadow-card [--delay:250ms] [--distance:12px] sm:right-auto sm:-left-6 sm:max-w-[18rem] lg:-bottom-8">
            <span className="block font-serif text-xl leading-snug">
              Practice builds confidence. Confidence builds communication.
            </span>
          </figcaption>
        </figure>
      </Container>
    </Section>
  )
}
