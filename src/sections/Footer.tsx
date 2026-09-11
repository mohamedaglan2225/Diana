import { InstagramIcon, WhatsAppIcon } from '@/components/Icons'
import { siteConfig, whatsappLink } from '@/site.config'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#2F3A40] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-serif text-xl mb-2">{siteConfig.brandName}</p>
            <p className="text-white/60 text-sm leading-relaxed">&ldquo;{siteConfig.tagline}&rdquo;</p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-medium tracking-widest text-white/50 uppercase mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium tracking-widest text-white/50 uppercase mb-4">
              Connect
            </p>
            <ul className="flex gap-3">
              <li>
                <a
                  href={siteConfig.instagramUrl ?? '#contact'}
                  {...(siteConfig.instagramUrl
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4A7C9B] transition-colors"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink ?? '#contact'}
                  {...(whatsappLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4A7C9B] transition-colors"
                >
                  <WhatsAppIcon size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
