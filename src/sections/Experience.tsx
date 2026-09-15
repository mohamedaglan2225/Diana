import { useState } from 'react'
import { Button } from '@/components/Button'
import { AwardIcon, CloseIcon } from '@/components/Icons'
import { Container, Section } from '@/components/layout'
import { Modal } from '@/components/Modal'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { roles } from '@/data/experience'
import { useReveal } from '@/hooks/useReveal'
import { asset } from '@/lib/assets'
import { certificateImage } from '@/lib/images'
import { siteConfig } from '@/site.config'

const { certificate } = siteConfig
const certificateSrc = certificate.asset ? asset(certificate.asset) : null
const certificatePdf = certificate.pdf ? asset(certificate.pdf) : null
const certificateAlt = `${certificate.name} from ${certificate.issuer}, awarded to ${siteConfig.teacherName} as an accredited course graduate`

/** The full certificate, never cropped: `object-contain` at its native ratio. */
function CertificatePicture({ sizes, className }: { sizes: string; className: string }) {
  if (!certificateSrc) return null
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={certificateImage.srcSet} sizes={sizes} />
      <img
        src={certificateSrc}
        alt={certificateAlt}
        width={certificateImage.width}
        height={certificateImage.height}
        loading="lazy"
        decoding="async"
        className={`object-contain ${className}`}
      />
    </picture>
  )
}

/*
 * Compact on purpose: the heading and the certificate share one row, and the
 * work history runs as a horizontal timeline on desktop instead of a long CV
 * column. Motion: the certificate card rises in; hovering it (mouse only)
 * zooms the thumbnail very slightly and nudges the button's arrow. The viewer
 * opens with the shared dialog motion. Timeline entries reveal as reached.
 */
export function Experience() {
  const cardRef = useReveal()
  const [viewing, setViewing] = useState(false)

  return (
    <Section id="experience" labelledBy="experience-title" tone="mist">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="experience-title"
            eyebrow="Experience & qualifications"
            title="Experience that supports your progress"
            intro="Private students, language schools and classrooms in different countries. Each one added something to how I teach."
          />

          {/* Qualification */}
          <div
            ref={cardRef}
            id="certification"
            className="hover-card group/cert reveal grid gap-6 rounded-card bg-surface p-5 shadow-card ring-1 ring-line sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-center sm:p-6"
          >
            {certificateSrc ? (
              // Mouse shortcut to the viewer; keyboard and screen-reader users get the button beside it.
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => setViewing(true)}
                className="block w-full overflow-hidden rounded-xl ring-1 ring-line transition-shadow duration-500 ease-soft group-hover/cert:ring-brand-soft"
              >
                <CertificatePicture
                  sizes="(min-width: 640px) 240px, 85vw"
                  className="aspect-[2400/1696] w-full bg-surface transition-[scale] duration-700 ease-soft group-hover/cert:scale-[1.02]"
                />
              </button>
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky text-brand" aria-hidden="true">
                <AwardIcon />
              </span>
            )}

            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">Qualification</p>
              <h3 className="mt-2 text-xl leading-snug text-ink sm:text-2xl">{certificate.name}</h3>
              <p className="mt-1 text-[15px] font-medium text-ink">{certificate.issuer}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Accredited by ACCREDITAT and The CPD Certification Service.
              </p>
              {certificateSrc && (
                <Button variant="secondary" size="sm" arrow className="mt-5" onClick={() => setViewing(true)}>
                  View certificate
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Experience timeline: a row on desktop, a list on phones. */}
        <ol className="mt-14 grid gap-x-8 [--order-step:110ms] sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-x-6">
          {roles.map((r, i) => (
            <Reveal
              as="li"
              key={r.period + r.role}
              className="reveal relative border-t border-brand-soft pt-6 pb-8 [--distance:14px] before:absolute before:-top-[5px] before:left-0 before:h-2.5 before:w-2.5 before:rounded-full before:bg-brand-accent lg:pb-0"
            >
              <p className={`text-sm font-medium tabular-nums ${i === 0 ? 'text-brand' : 'text-muted'}`}>{r.period}</p>
              <h3 className="mt-2 text-lg leading-snug text-ink">{r.role}</h3>
              {r.org && <p className="mt-1 text-sm font-medium text-ink/80">{r.org}</p>}
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
            </Reveal>
          ))}
        </ol>
      </Container>

      {certificateSrc && (
        <Modal open={viewing} onClose={() => setViewing(false)} label={certificate.name}>
          <div
            className="flex h-full items-center justify-center p-3 sm:p-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) setViewing(false)
            }}
          >
            <div className="relative flex max-h-full w-full max-w-5xl flex-col rounded-3xl bg-surface p-3 pt-14 shadow-lift sm:p-6 sm:pt-16">
              <CertificatePicture
                sizes="(min-width: 1100px) 1000px, 96vw"
                className="mx-auto h-auto max-h-[72dvh] w-auto max-w-full rounded-lg"
              />
              <div className="mt-4 flex flex-col items-center gap-2 px-2 pb-1 text-center sm:flex-row sm:justify-between sm:text-left">
                <p className="text-sm text-muted">
                  {certificate.name}, {certificate.issuer}
                </p>
                {certificatePdf && (
                  <a
                    href={certificatePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                  >
                    Open the original PDF<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
              <button
                type="button"
                data-autofocus
                onClick={() => setViewing(false)}
                className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky text-ink transition-colors hover:bg-brand-soft"
                aria-label="Close certificate"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Section>
  )
}
