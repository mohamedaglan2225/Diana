import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { siteConfig } from './src/site.config'

/**
 * SEO tags that depend on build settings or on the (not yet known) domain.
 *
 * Always: hero image preload (base-path aware) and Person structured data.
 * Only when `siteConfig.siteUrl` is set: canonical link, og:url, absolute
 * og:image / twitter:image, and a sitemap.xml referenced from robots.txt.
 */
function seo(): Plugin {
  let base = '/'
  const siteUrl = siteConfig.siteUrl ? siteConfig.siteUrl.replace(/\/?$/, '/') : null
  const shareImage = 'images/diana-portrait.jpg'

  return {
    name: 'english-with-diana:seo',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [
        {
          // Must match the hero <Photo> srcset/sizes (src/lib/images.ts, src/sections/Hero.tsx).
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            type: 'image/webp',
            href: `${base}images/diana-portrait-932.webp`,
            imagesrcset: `${base}images/diana-portrait-640.webp 640w, ${base}images/diana-portrait-932.webp 932w`,
            imagesizes: '(min-width: 1024px) 448px, (min-width: 640px) 416px, 88vw',
            fetchpriority: 'high',
          },
          injectTo: 'head',
        },
      ]

      const person: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.teacherName,
        jobTitle: 'English Teacher',
        description:
          'TESOL / TEFL certified English teacher offering online lessons for children, teenagers, adults and Business English, as private 1-to-1 or group lessons.',
        knowsAbout: ['English as a second language', 'Business English', 'English for children', 'English for teenagers'],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: siteConfig.certificate.name,
          credentialCategory: 'certificate',
          recognizedBy: { '@type': 'Organization', name: siteConfig.certificate.issuer },
        },
      }

      if (siteUrl) {
        const image = new URL(shareImage, siteUrl).href
        person.url = siteUrl
        person.image = image
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: siteUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: siteUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
        )
      }

      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(person),
        injectTo: 'head',
      })
      return tags
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) {
        robots.push('', `Sitemap: ${new URL('sitemap.xml', siteUrl).href}`)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}</loc></url>\n</urlset>\n`,
        })
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })
    },
  }
}

// Vite config — https://vitejs.dev/config/
// `base` is configurable so the built site works at the domain root or
// from a sub-path (e.g. GitHub Pages) without touching any image path.
export default defineConfig({
  base: process.env.PUBLIC_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), seo()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    assetsInlineLimit: 0,
  },
})
