import type { CSSProperties } from 'react'
import { Container, Section } from '@/components/layout'
import { Photo } from '@/components/Photo'
import { SectionHeading } from '@/components/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { aboutPhoto } from '@/lib/images'
import { siteConfig } from '@/site.config'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/*
 * Motion, kept calm: the photo arrives first and settles from a slight zoom,
 * then the quote (its rule drawing downward), then the biography.
 */
export function About() {
  const photoRef = useReveal()
  const textRef = useReveal()

  return (
    <Section id="about" labelledBy="about-title" tone="sand">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div ref={photoRef} className="reveal mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-media shadow-media">
            <Photo
              photo={aboutPhoto}
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 448px, 90vw"
              className="reveal-zoom aspect-4/5 w-full"
            />
          </div>
        </div>

        <div>
          <SectionHeading id="about-title" eyebrow="About me" title="Meet Diana" />

          <div ref={textRef} className="mt-8 max-w-2xl">
            <blockquote
              className="reveal relative pl-6 font-serif text-2xl leading-snug text-ink italic sm:text-[1.75rem]"
              style={delay(100)}
            >
              <span className="draw-y absolute inset-y-0 left-0 w-0.5 bg-brand-accent" aria-hidden="true" />
              &ldquo;I believe students learn best when they feel comfortable enough to speak, make
              mistakes, laugh and try again.&rdquo;
            </blockquote>

            <div className="reveal mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg" style={delay(240)}>
              <p>
                Hi, I&rsquo;m {siteConfig.teacherName}, an English teacher and ESL educator.
                Over the years I&rsquo;ve taught private students, language-school classes, speaking
                clubs and summer programmes, from young children learning their first words to
                adults who need English for work.
              </p>
              <p>
                What I care about most is how students feel when they speak. When a lesson is
                relaxed and practical, people stop worrying about being perfect and start actually
                using the language.
              </p>
              <p>
                That&rsquo;s why I don&rsquo;t teach from a script. I listen, adapt, and build each
                lesson around the person in front of me.
              </p>
            </div>

            <p className="reveal mt-8 font-serif text-xl text-ink" style={delay(360)}>
              {siteConfig.teacherName}
              <span className="mt-1 block font-sans text-sm text-muted">
                English teacher · TESOL / TEFL certified
              </span>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
