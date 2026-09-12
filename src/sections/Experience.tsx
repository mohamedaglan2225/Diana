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
 * Motion: the certificate card rises in; hovering it (mouse only) zooms the
 * thumbnail very slightly and nudges the button's arrow. The viewer opens
 * with the shared dialog motion. Timeline entries reveal as they are reached.
 */
export function Experience() {
  const cardRef = useReveal()
  const [viewing, setViewing] = useState(false)

  return (
    <Section id="experience" labelledBy="experience-title" tone="sky">
      <Container>
        <SectionHeading
          id="experience-title"
          eyebrow="Experience & qualifications"
          title="Experience that supports your progress"
          intro="Private students, language schools and classrooms in different countries. Each one added something to how I teach."
        />

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Qualification */}
          <div>
            <div
              ref={cardRef}
              id="certification"
              className="hover-card group/cert reveal rounded-card bg-surface p-8 shadow-card ring-1 ring-line sm:p-10 lg:sticky lg:top-28"
            >
              {certificateSrc ? (
                // Mouse shortcut to the viewer; keyboard and screen-reader users get the button below.
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => setViewing(true)}
                  className="block w-full overflow-hidden rounded-xl ring-1 ring-line transition-shadow duration-500 ease-soft group-hover/cert:ring-brand-soft"
                >
                  <CertificatePicture
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 560px, 85vw"
                    className="aspect-[2400/1696] w-full bg-surface transition-[scale] duration-700 ease-soft group-hover/cert:scale-[1.02]"
                  />
                </button>
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky text-brand" aria-hidden="true">
                  <AwardIcon />
                </span>
              )}

              <p className="mt-7 text-xs font-semibold tracking-[0.18em] text-brand uppercase">Qualification</p>
              <h3 className="mt-3 text-h3 text-ink">{certificate.name}</h3>
              <p className="mt-2 text-[15px] font-medium text-ink">{certificate.issuer}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                An accredited course in teaching English to non-native learners, in overseas and online
                classrooms. Accredited by ACCREDITAT and The CPD Certification Service.
              </p>
              {certificateSrc && (
                <Button variant="secondary" size="sm" arrow className="mt-7" onClick={() => setViewing(true)}>
                  View certificate
                </Button>
              )}
            </div>
          </div>

          {/* Experience timeline */}
          <ol className="border-t border-brand-soft">
            {roles.map((r) => (
              <Reveal
                as="li"
                key={r.period + r.role}
                className="reveal grid gap-2 border-b border-brand-soft py-8 [--distance:16px] sm:grid-cols-[9.5rem_1fr] sm:gap-8"
              >
                <p className="pt-1 text-sm font-medium text-brand tabular-nums">{r.period}</p>
                <div>
                  <h3 className="text-xl text-ink">{r.role}</h3>
                  {r.org && <p className="mt-1 text-[15px] font-medium text-ink/80">{r.org}</p>}
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
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
