import { useId, useState } from 'react'
import { TextLink } from '@/components/Button'
import { PlusIcon } from '@/components/Icons'
import { Container, Section } from '@/components/layout'
import { SectionHeading } from '@/components/SectionHeading'
import { faq } from '@/data/faq'
import { useReveal } from '@/hooks/useReveal'

export function FAQ() {
  const ref = useReveal<HTMLUListElement>()
  const baseId = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" labelledBy="faq-title" tone="sand">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions, answered"
            intro="The things people usually ask before their first lesson."
          />
          <p className="mt-8 text-[15px] text-muted">
            Something else on your mind?{' '}
            <TextLink href="#booking-form">Ask me directly</TextLink>
          </p>
        </div>

        <ul ref={ref} className="reveal border-t border-line">
          {faq.map((item, i) => {
            const isOpen = open === i
            const buttonId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <li key={item.question} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl text-ink transition-colors duration-200 hover:text-brand sm:text-[1.375rem]"
                  >
                    {item.question}
                    {/* The plus turns into a close mark. */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-brand transition-[rotate,background-color,border-color] duration-300 ease-soft ${
                        isOpen ? 'rotate-45 border-brand-soft bg-sky' : 'border-line group-hover:border-brand-soft'
                      }`}
                      aria-hidden="true"
                    >
                      <PlusIcon />
                    </span>
                  </button>
                </h3>
                {/* Height-independent expand: the grid row grows from 0fr to 1fr. The answer
                    starts fading in straight away, so it is never delayed. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-[350ms] ease-soft ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-2xl pr-12 pb-7 text-base leading-relaxed text-muted transition-[opacity,translate] duration-300 ease-soft ${
                        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
