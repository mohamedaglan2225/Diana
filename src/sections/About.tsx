import type { CSSProperties } from 'react'
import { TextLink } from '@/components/Button'
import { Container, Section } from '@/components/layout'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { VideoIntro } from '@/components/VideoIntro'
import { useReveal } from '@/hooks/useReveal'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/* Formerly its own "My approach" section. */
const principles = [
  {
    title: 'Speak from day one',
    desc: 'Speaking isn’t saved for later. It’s part of every lesson, at every level.',
  },
  {
    title: 'Learn by doing',
    desc: 'Games, role-plays and hands-on tasks: students match, move, solve and create.',
  },
  {
    title: 'Personalised',
    desc: 'The plan follows the learner, not a fixed textbook, and changes as they grow.',
  },
  {
    title: 'Confidence first',
    desc: 'Feeling safe to speak comes before perfect accuracy. The accuracy follows.',
  },
]

/*
 * Who Diana is, in one screen: video (or photo) introduction, a short bio
 * that folds in the former "International perspective" section, and her
 * approach as four short principles. The detailed work history and the
 * certificate stay in Experience, one link away.
 *
 * Motion, kept calm: the media arrives first, then the quote (its rule
 * drawing downward), then the biography and the principles.
 */
export function About() {
  const mediaRef = useReveal()
  const textRef = useReveal()

  return (
    <Section id="about" labelledBy="about-title" tone="sand">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={mediaRef} className="reveal mx-auto w-full max-w-md lg:sticky lg:top-28 lg:max-w-none">
          <VideoIntro />
        </div>

        <div>
          <SectionHeading id="about-title" eyebrow="About me" title="Meet Diana" />

          <div ref={textRef} className="mt-7 max-w-2xl">
            <blockquote
              className="reveal relative pl-6 font-serif text-2xl leading-snug text-ink italic sm:text-[1.625rem]"
              style={delay(100)}
            >
              <span className="draw-y absolute inset-y-0 left-0 w-0.5 bg-brand-accent" aria-hidden="true" />
              &ldquo;I believe students learn best when they feel comfortable enough to speak, make
              mistakes, laugh and try again.&rdquo;
            </blockquote>

            <div className="reveal mt-7 space-y-4 text-base leading-relaxed text-muted sm:text-lg" style={delay(240)}>
              <p>
                I&rsquo;ve taught private students, language-school classes, speaking clubs and summer
                programmes, from young children learning their first words to adults who need English
                for work.
              </p>
              <p>
                Studying in different countries showed me how differently people learn and
                communicate. So I don&rsquo;t teach from a script: I listen, adapt, and build each lesson
                around the person in front of me.
              </p>
            </div>

            <div className="reveal mt-6" style={delay(320)}>
              <TextLink href="#experience">See my experience and certificate</TextLink>
            </div>
          </div>

          <div className="mt-10 border-t border-ink/10 pt-8">
            <h3 className="text-h3 text-ink">My approach</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-5 [--distance:12px] [--order-step:80ms] sm:grid-cols-2">
              {principles.map((p) => (
                <Reveal as="li" key={p.title} className="reveal">
                  <h4 className="flex items-center gap-3 text-lg text-ink">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
