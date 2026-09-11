import { useId, useState, type FormEvent } from 'react'
import { MailIcon, WhatsAppIcon } from '@/components/Icons'
import { useReveal } from '@/hooks/useReveal'
import { emailLink, siteConfig, whatsappLink } from '@/site.config'

const ageGroups = ['Child', 'Teen', 'Adult']
const levels = ['Beginner', 'Elementary', 'Intermediate', 'Upper Intermediate', 'Advanced', 'Not Sure']
const lessonTypes = ['Kids English', 'Teen English', 'General English', 'Conversation', 'Business English']

const fieldClass =
  'w-full px-4 py-3 rounded-xl border border-[#DDE8EF] text-sm text-[#2F3A40] bg-white placeholder-[#8A9CA8] focus:outline-none focus:border-[#6F9FBD] focus:ring-2 focus:ring-[#6F9FBD]/25 transition-colors'
const labelClass = 'block text-xs font-semibold text-[#2F3A40] mb-1.5'

export function Contact() {
  const ref = useReveal()
  const ids = useId()
  const [form, setForm] = useState({ name: '', age: '', level: '', type: '', message: '' })
  const [status, setStatus] = useState<string | null>(null)

  const composeBody = () =>
    [
      `Name: ${form.name}`,
      `Student age: ${form.age || '—'}`,
      `English level: ${form.level || '—'}`,
      `Lesson type: ${form.type || '—'}`,
      '',
      form.message,
    ].join('\n')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (siteConfig.email) {
      const subject = encodeURIComponent(`Lesson enquiry from ${form.name}`)
      const body = encodeURIComponent(composeBody())
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
      return
    }

    if (whatsappLink) {
      window.open(`${whatsappLink}?text=${encodeURIComponent(composeBody())}`, '_blank', 'noopener')
      return
    }

    setStatus(
      'Thanks — the contact details for this form have not been connected yet. Please check back shortly.',
    )
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #4A7C9B 0%, #3F6C88 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal text-center mb-12 lg:mb-14">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] text-white leading-tight mb-4 text-balance">
            Ready to Feel More Confident in English?
          </h2>
          <p className="text-white/90 text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Tell me who the lesson is for and what you would like to improve. I&rsquo;ll help you
            choose the right learning approach.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#booking-form"
              className="px-6 py-3 rounded-full bg-white text-[#3F6C88] font-semibold text-sm hover:bg-[#FAF9F6] transition-colors shadow-sm"
            >
              Book Your First Lesson
            </a>
            <a
              href={whatsappLink ?? '#booking-form'}
              {...(whatsappLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="px-6 py-3 rounded-full bg-white/15 text-white font-medium text-sm border border-white/40 hover:bg-white/25 transition-colors"
            >
              Send a Message
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-[24px] p-6 sm:p-7 lg:p-10 shadow-xl">
            <h3 className="text-xl text-[#2F3A40] mb-6">Get in Touch</h3>
            <form id="booking-form" className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className={labelClass} htmlFor={`${ids}-name`}>
                  Your Name
                </label>
                <input
                  id={`${ids}-name`}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="How should I address you?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={fieldClass}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor={`${ids}-age`}>
                    Student Age
                  </label>
                  <select
                    id={`${ids}-age`}
                    name="age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={fieldClass}
                  >
                    <option value="">Select age group</option>
                    {ageGroups.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor={`${ids}-level`}>
                    English Level
                  </label>
                  <select
                    id={`${ids}-level`}
                    name="level"
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className={fieldClass}
                  >
                    <option value="">Select level</option>
                    {levels.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor={`${ids}-type`}>
                  Lesson Type
                </label>
                <select
                  id={`${ids}-type`}
                  name="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={fieldClass}
                >
                  <option value="">Select lesson type</option>
                  {lessonTypes.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor={`${ids}-message`}>
                  Your Goals / Message
                </label>
                <textarea
                  id={`${ids}-message`}
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me a bit about your goals and what you'd like to improve..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#4A7C9B] text-white font-semibold text-sm hover:bg-[#3F6C88] hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Send Message
              </button>

              <p aria-live="polite" className="text-xs text-[#68767D] leading-relaxed min-h-4">
                {status}
              </p>
            </form>
          </div>

          <div className="space-y-4">
            <ContactCard
              icon={<WhatsAppIcon />}
              kind="WhatsApp"
              title={whatsappLink ? 'Message me directly' : 'Coming soon'}
              body="The easiest way to reach me for lesson enquiries."
              href={whatsappLink}
            />
            <ContactCard
              icon={<MailIcon />}
              kind="Email"
              title={emailLink ? siteConfig.email! : 'Coming soon'}
              body="For longer messages, lesson details and scheduling."
              href={emailLink}
            />

            <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
              <p className="text-xs text-white/85 leading-relaxed text-center">
                &ldquo;Learn English naturally,
                <br />
                confidently, and with joy.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({
  icon,
  kind,
  title,
  body,
  href,
}: {
  icon: React.ReactNode
  kind: string
  title: string
  body: string
  href: string | null
}) {
  const inner = (
    <>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs text-white/85">{kind}</p>
          <p className="font-medium text-sm truncate">{title}</p>
        </div>
      </div>
      <p className="text-xs text-white/85 leading-relaxed">{body}</p>
    </>
  )

  const className =
    'block bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/25'

  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${className} hover:bg-white/25 transition-colors`}
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  )
}
