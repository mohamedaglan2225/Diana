import type { CSSProperties } from 'react'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/layout'
import { Photo } from '@/components/Photo'
import { useParallax } from '@/hooks/useParallax'
import { heroPortrait } from '@/lib/images'
import { siteConfig } from '@/site.config'

/** Start time of each step of the entrance, in ms (see `.hero-in` in index.css). */
const at = (ms: number, from?: number) =>
  ({ '--at': `${ms}ms`, ...(from !== undefined && { '--from': `${from}px` }) }) as CSSProperties

const formats = ['Online lessons', 'Private 1-to-1', 'Group lessons']

export function Hero() {
  const photoRef = useParallax<HTMLDivElement>()

  return (
    <section id="top" aria-labelledby="hero-title" className="pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="max-w-xl">
          <p
            className="hero-in flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand uppercase"
            style={at(0, 8)}
          >
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            {siteConfig.teacherName} · Online English Teacher
          </p>

          {/* Each line rises out of its own mask. The break matches how the heading wraps at every width. */}
          <h1 id="hero-title" className="hero-title mt-6 text-display text-ink">
            <span className="hero-line">
              <span style={at(120)}>Speak English</span>
            </span>{' '}
            <span className="hero-line">
              <span style={at(230)}>
                with <em className="text-brand">confidence.</em>
              </span>
            </span>
          </h1>

          <p className="hero-in mt-7 text-lg leading-relaxed text-pretty text-muted sm:text-xl" style={at(420)}>
            Hi, I&rsquo;m Diana. I teach practical, personalised English to children, teenagers,
            adults and professionals, in lessons where it feels natural to speak up, try and
            improve.
          </p>

          <div className="hero-in mt-10 flex flex-wrap gap-3" style={at(560)}>
            <ButtonLink href="#contact" arrow>
              Book a Lesson
            </ButtonLink>
            <ButtonLink href="#programs" variant="secondary">
              Explore Programs
            </ButtonLink>
          </div>

          <ul
            className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted"
            style={at(700, 8)}
            aria-label="Lesson formats"
          >
            {formats.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* The portrait is visible from the first frame; it only settles into place. */}
        <figure className="hero-figure relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:mr-0 lg:max-w-[28rem]">
          {/* Offset frame behind the portrait. */}
          <div
            className="hero-frame absolute inset-0 translate-x-3 translate-y-3 rounded-media border border-brand-soft bg-sky sm:translate-x-5 sm:translate-y-5"
            aria-hidden="true"
          />
          <div ref={photoRef} className="relative overflow-hidden rounded-media shadow-media">
            <Photo
              photo={heroPortrait}
              priority
              sizes="(min-width: 1024px) 448px, (min-width: 640px) 416px, 88vw"
              className="hero-portrait aspect-4/5 w-full"
            />
          </div>

          <figcaption
            className="hero-in absolute -bottom-7 left-4 rounded-2xl bg-surface/95 px-5 py-4 shadow-card sm:-left-8"
            style={at(950, 8)}
          >
            <span className="block text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
              Studied in
            </span>
            <span className="mt-1 block font-serif text-lg text-ink">
              {siteConfig.studiedIn.join(' · ')}
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
