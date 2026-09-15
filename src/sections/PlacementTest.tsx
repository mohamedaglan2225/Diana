import { useState } from 'react'
import { Button, ButtonLink } from '@/components/Button'
import { ArrowRightIcon } from '@/components/Icons'
import { Container, Section } from '@/components/layout'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { levels } from '@/data/levels'
import { useReveal } from '@/hooks/useReveal'
import { siteConfig } from '@/site.config'

/* Short on purpose: why the review matters is said once, under the levels. */
const flow = [
  { title: 'Take the test', desc: 'Online, before your first lesson.' },
  { title: 'Estimated English Level', desc: 'Where your English is today.' },
  { title: 'Teacher review', desc: 'I check the result with you.' },
  { title: 'Recommended program', desc: 'The right level and format.' },
]

type Props = {
  /** Marks the enquiry form's program as "Not sure yet" before jumping to it. */
  onEnquire: () => void
}

/**
 * Marketing entry point for the future placement test. There is no test
 * engine here: with `siteConfig.placementTestUrl` set, the button links to
 * the real test; until then it is labelled "Coming soon" and pressing it
 * explains that plainly and offers the enquiry form instead.
 */
export function PlacementTest({ onEnquire }: Props) {
  const testUrl = siteConfig.placementTestUrl
  const [asked, setAsked] = useState(false)
  const textRef = useReveal()

  return (
    <Section id="placement-test" labelledBy="placement-title" tone="night">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            id="placement-title"
            tone="dark"
            eyebrow="Placement test"
            title="Find your English level"
            intro="Start with a placement test so your lessons match your real level."
          />

          <div ref={textRef} className="reveal mt-5 max-w-xl [--delay:240ms]">
            <p className="text-base leading-relaxed text-white/75 sm:text-lg">
              Picking a level on your own is hard. Start too high and lessons feel overwhelming;
              start too low and they feel slow. That&rsquo;s why every new student begins here.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {testUrl ? (
                <ButtonLink href={testUrl} variant="light" arrow>
                  Take Placement Test
                </ButtonLink>
              ) : (
                <>
                  <Button variant="light" arrow onClick={() => setAsked(true)} aria-describedby="placement-soon">
                    Take Placement Test
                  </Button>
                  <span id="placement-soon" className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium tracking-wide text-white/85">
                    Coming soon
                  </span>
                </>
              )}
            </div>

            {!testUrl && (
              <p aria-live="polite" className="mt-4 min-h-5 max-w-lg text-sm leading-relaxed text-white/85">
                {asked && (
                  <span className="status-in block">
                    The online placement test isn&rsquo;t available yet. Until it is,{' '}
                    <a
                      href="#booking-form"
                      onClick={onEnquire}
                      className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                    >
                      send a short enquiry
                    </a>{' '}
                    and we&rsquo;ll check your level together before lessons start.
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        <Reveal className="reveal rounded-media bg-white/[0.06] p-6 ring-1 ring-white/10 [--delay:150ms] sm:p-8">
          <h3 className="text-xl text-white">How the test works</h3>
          {/* Two across wherever the card is wide enough; one column in the narrow 1024–1279px card. */}
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {flow.map((step, i) => (
              <li key={step.title} className="flex gap-3.5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-soft/40 font-serif text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="font-medium leading-snug text-white">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-white/70">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-soft uppercase">Levels</p>
            <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm text-white/85">
              {levels.map((level, i) => (
                <li key={level} className="flex items-center gap-1.5">
                  <span className="rounded-full bg-white/10 px-3 py-1">{level}</span>
                  {i < levels.length - 1 && <ArrowRightIcon size={12} className="text-white/40" />}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              The result is an Estimated English Level. A test can&rsquo;t fully measure speaking, which is
              best judged in conversation, so your level is confirmed after a teacher review.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
