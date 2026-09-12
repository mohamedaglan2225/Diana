import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Button } from '@/components/Button'
import { InstagramIcon, MailIcon, WhatsAppIcon } from '@/components/Icons'
import { Container, Section } from '@/components/layout'
import { SectionHeading } from '@/components/SectionHeading'
import { programChoices, type ProgramChoice } from '@/data/programs'
import { useReveal } from '@/hooks/useReveal'
import { emailLink, instagramLink, siteConfig, whatsappLink } from '@/site.config'

const learners = ['Child', 'Teenager', 'Adult']
const levels = ['Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced', 'Not sure']
const formats = ['Private 1-to-1', 'Group', 'Not sure yet']

const steps = [
  'Send a short enquiry using the form.',
  'I’ll reply to talk through your level, goals and the right lesson option for you.',
  'We plan your first online lessons around you.',
]

/** Border warms on hover; focus adds a soft brand ring. Both ease in over 200ms. */
const fieldClass =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-subtle transition-[border-color,box-shadow] duration-200 ease-out outline-none hover:border-brand-soft focus:border-brand focus:ring-4 focus:ring-brand-soft/60'
const labelClass = 'mb-2 block text-sm font-medium text-ink'

type Props = {
  program: ProgramChoice
  onProgramChange: (choice: ProgramChoice) => void
}

export function Contact({ program, onProgramChange }: Props) {
  const ids = useId()
  // The page's closing moment: heading, then the steps, then the form card.
  const stepsRef = useReveal<HTMLOListElement>()
  const cardRef = useReveal()
  const [form, setForm] = useState({ name: '', reply: '', learner: '', level: '', format: '', message: '' })
  const [status, setStatus] = useState<string | null>(null)

  const update = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }))
  const programLabel = programChoices.find((c) => c.value === program)?.label

  const composeBody = () =>
    [
      `Name: ${form.name}`,
      `Reply to: ${form.reply}`,
      `Lessons for: ${form.learner || 'Not specified'}`,
      `English level: ${form.level || 'Not specified'}`,
      `Program: ${programLabel ?? 'Not specified'}`,
      `Lesson format: ${form.format || 'Not specified'}`,
      '',
      form.message,
    ].join('\n')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (siteConfig.email) {
      const subject = encodeURIComponent(`Lesson enquiry from ${form.name}`)
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(composeBody())}`
      setStatus('Your email app should now open with the enquiry ready to send.')
      return
    }

    if (whatsappLink) {
      window.open(`${whatsappLink}?text=${encodeURIComponent(composeBody())}`, '_blank', 'noopener')
      setStatus('WhatsApp should open in a new tab with your enquiry ready to send.')
      return
    }

    setStatus('Online enquiries aren’t connected yet, so this message wasn’t sent. Please check back soon.')
  }

  const channels = [
    whatsappLink && { href: whatsappLink, label: 'WhatsApp', detail: 'Message me directly', icon: <WhatsAppIcon /> },
    emailLink && { href: emailLink, label: 'Email', detail: siteConfig.email!, icon: <MailIcon /> },
    instagramLink && { href: instagramLink, label: 'Instagram', detail: 'Follow along', icon: <InstagramIcon /> },
  ].filter(Boolean) as { href: string; label: string; detail: string; icon: ReactNode }[]

  return (
    <Section id="contact" labelledBy="contact-title" tone="brand">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:pt-6">
          <SectionHeading
            id="contact-title"
            tone="brand"
            eyebrow="Book a lesson"
            title="Not sure which program or lesson format is right for you?"
            intro="Tell me about your goals and I’ll help you choose the right option. Lessons are online, so you can join from wherever you are."
          />

          <ol ref={stepsRef} className="reveal mt-10 space-y-5 [--delay:120ms] [--distance:16px]">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 text-[15px] leading-relaxed text-white">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 font-serif text-sm"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>

          {channels.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3 rounded-2xl border border-white/30 px-4 py-3 text-white transition-colors hover:bg-white/10"
                  >
                    <span aria-hidden="true">{c.icon}</span>
                    <span className="text-sm">
                      <span className="block font-medium">{c.label}</span>
                      <span className="block text-white/90">{c.detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* The form arrives once, as a whole card; its fields never animate on their own. */}
        <div
          ref={cardRef}
          id="booking-form"
          className="reveal rounded-[1.75rem] bg-surface p-6 text-ink shadow-lift [--delay:200ms] [--distance:28px] sm:p-9 lg:p-10"
        >
          <h3 className="text-h3">Send an enquiry</h3>
          <p className="mt-2 text-[15px] text-muted">It only takes a minute. Fields marked * are required.</p>

          <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Field label="Your name" required htmlFor={`${ids}-name`}>
              <input
                id={`${ids}-name`}
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => update('name')(e.target.value)}
                className={fieldClass}
              />
            </Field>

            <Field label="Email or WhatsApp number" required htmlFor={`${ids}-reply`}>
              <input
                id={`${ids}-reply`}
                name="reply"
                type="text"
                required
                autoComplete="email"
                placeholder="So I know how to reply"
                value={form.reply}
                onChange={(e) => update('reply')(e.target.value)}
                className={fieldClass}
              />
            </Field>

            <Field label="Who are the lessons for?" htmlFor={`${ids}-learner`}>
              <select
                id={`${ids}-learner`}
                name="learner"
                value={form.learner}
                onChange={(e) => update('learner')(e.target.value)}
                className={fieldClass}
              >
                <option value="">Select</option>
                {learners.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="Current level" htmlFor={`${ids}-level`}>
              <select
                id={`${ids}-level`}
                name="level"
                value={form.level}
                onChange={(e) => update('level')(e.target.value)}
                className={fieldClass}
              >
                <option value="">Select</option>
                {levels.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="Program" htmlFor={`${ids}-program`}>
              <select
                id={`${ids}-program`}
                name="program"
                value={program}
                onChange={(e) => onProgramChange(e.target.value as ProgramChoice)}
                className={fieldClass}
              >
                <option value="">Select a program</option>
                {programChoices.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Lesson format" htmlFor={`${ids}-format`}>
              <select
                id={`${ids}-format`}
                name="format"
                value={form.format}
                onChange={(e) => update('format')(e.target.value)}
                className={fieldClass}
              >
                <option value="">Select a format</option>
                {formats.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="What would you like to improve?" required htmlFor={`${ids}-message`} wide>
              <textarea
                id={`${ids}-message`}
                name="message"
                rows={4}
                required
                placeholder="A few words about goals, experience or anything I should know"
                value={form.message}
                onChange={(e) => update('message')(e.target.value)}
                className={`${fieldClass} resize-y`}
              />
            </Field>

            <div className="sm:col-span-2">
              <Button type="submit" arrow className="w-full">
                Send enquiry
              </Button>
              {/* The live region itself never changes; each new message is a fresh child,
                  which screen readers announce at once while it eases in visually. */}
              <p aria-live="polite" className="mt-4 min-h-5 text-sm leading-relaxed text-muted">
                {status && (
                  <span key={status} className="status-in block">
                    {status}
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  )
}

function Field({
  label,
  htmlFor,
  wide = false,
  required = false,
  children,
}: {
  label: string
  htmlFor: string
  wide?: boolean
  /** Visual marker only — the control itself carries `required`. */
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className={wide ? 'sm:col-span-2' : undefined}>
      <label className={labelClass} htmlFor={htmlFor}>
        {label}
        {required && (
          <span className="text-brand" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      {children}
    </div>
  )
}
