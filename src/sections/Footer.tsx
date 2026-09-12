import { TextLink } from '@/components/Button'
import { InstagramIcon, MailIcon, WhatsAppIcon } from '@/components/Icons'
import { Container } from '@/components/layout'
import { navLinks } from '@/data/navigation'
import { emailLink, instagramLink, siteConfig, whatsappLink } from '@/site.config'

/** Only channels that actually exist are shown — no placeholder social icons. */
const channels = [
  whatsappLink && { href: whatsappLink, label: 'WhatsApp', Icon: WhatsAppIcon },
  emailLink && { href: emailLink, label: 'Email', Icon: MailIcon },
  instagramLink && { href: instagramLink, label: 'Instagram', Icon: InstagramIcon },
].filter(Boolean) as { href: string; label: string; Icon: typeof MailIcon }[]

export function Footer() {
  return (
    <footer className="tone-dark bg-night text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl">
              English <em className="text-brand-soft">with</em> Diana
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/70">
              Practical, personalised English lessons for kids, teens, adults and professionals.
            </p>
            <p className="mt-6 font-serif text-lg text-white/85 italic">&ldquo;{siteConfig.tagline}&rdquo;</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-[15px] text-white/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">Get in touch</p>
            {channels.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {channels.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-3 text-[15px] text-white/75 transition-colors hover:text-white"
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[15px] leading-relaxed text-white/75">
                Questions about lessons?
                <br />
                <TextLink href="#booking-form" tone="dark" className="mt-2">
                  Send an enquiry
                </TextLink>
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
          <p>
            {siteConfig.teacherName} · TESOL / TEFL certified English teacher
          </p>
        </div>
      </Container>
    </footer>
  )
}
