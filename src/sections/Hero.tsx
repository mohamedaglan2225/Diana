import type { CSSProperties } from 'react'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/layout'
import { Photo } from '@/components/Photo'
import { useParallax } from '@/hooks/useParallax'
import { heroPortrait } from '@/lib/images'

/** Start time of each step of the entrance, in ms (see `.hero-in` in index.css). */
const at = (ms: number, from?: number) =>
  ({ '--at': `${ms}ms`, ...(from !== undefined && { '--from': `${from}px` }) }) as CSSProperties

/*
 * Kept deliberately short: who Diana teaches, what they achieve, that it's
 * online, one reason to trust her. The detailed credentials live in the
 * trust bar directly below.
 */
export function Hero() {
  const photoRef = useParallax<HTMLDivElement>()

  return (
    <section id="top" aria-labelledby="hero-title" className="hero-wash pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="max-w-xl">
          <p
            className="hero-in flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand uppercase"
            style={at(0, 8)}
          >
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            Online English lessons
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
            Hi, I&rsquo;m Diana, a certified English teacher. I help children, teens, adults and
            professionals understand more and speak naturally, in lessons built around their level
            and goals.
          </p>

          <div className="hero-in mt-9 flex flex-wrap gap-3" style={at(560)}>
            <ButtonLink href="#placement-test" arrow>
              Take Placement Test
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Book a Lesson
            </ButtonLink>
          </div>
        </div>

        {/* The portrait is visible from the first frame; it only settles into place. */}
        <figure className="hero-figure relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:mr-0 lg:max-w-[28rem]">
          {/* Offset frame behind the portrait. */}
          <div
            className="hero-frame absolute inset-0 translate-x-3 translate-y-3 rounded-media border border-brand-soft bg-sky-deep sm:translate-x-5 sm:translate-y-5"
            aria-hidden="true"
          />
          <div ref={photoRef} className="relative overflow-hidden rounded-media shadow-media">
            {/* sizes must match the preload in vite.config.ts */}
            <Photo
              photo={heroPortrait}
              priority
              sizes="(min-width: 1024px) 448px, (min-width: 640px) 416px, 88vw"
              className="hero-portrait aspect-4/5 w-full"
            />
          </div>

          <figcaption
            className="hero-in absolute -bottom-6 left-4 rounded-2xl bg-surface/95 px-5 py-4 shadow-card sm:-left-8"
            style={at(950, 8)}
          >
            <span className="block text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
              Lesson formats
            </span>
            <span className="mt-1 block font-serif text-lg text-ink">Private 1-to-1 or group</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
