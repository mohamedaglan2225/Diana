import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Button } from '@/components/Button'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@/components/Icons'
import { Container, Section } from '@/components/layout'
import { Modal } from '@/components/Modal'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { galleryPhotos } from '@/lib/images'

const count = galleryPhotos.length
const lightboxSizes = '(min-width: 1024px) 1024px, 100vw'

/*
 * Until "Show all" is pressed the grid keeps to its first rows: 6 photos in
 * 2 or 3 columns, 8 in 4 columns. Hidden photos are `display: none`, so they
 * are out of the tab order; the lightbox still steps through all of them.
 */
const collapsedClass = (i: number) => (i < 6 ? '' : i < 8 ? 'hidden lg:block' : 'hidden')

const lightboxButton =
  'group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20'

/*
 * Twelve photos in an even grid (2, 3 or 4 columns) at one 4:3 crop. Only
 * the first rows show at first, so the gallery stays short; "Show all
 * photos" reveals the rest and moves focus to the first new one.
 *
 * Motion: each frame is already in place (a soft sky tint) and its photo
 * rises into it from the bottom, settling from a slight zoom, then the
 * caption. Photos that arrive together follow each other quickly. Hover
 * (mouse only) zooms the photo a touch and darkens its caption.
 *
 * Lightbox: opens with the shared dialog motion and shows the full,
 * uncropped photo; stepping between photos cross-fades, and the neighbours
 * are preloaded so the fade has a photo to show.
 */
export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  // Index of the first photo that was hidden when "Show all" was pressed.
  const focusFrom = useRef(-1)

  const expand = () => {
    const buttons = gridRef.current ? [...gridRef.current.querySelectorAll('button')] : []
    focusFrom.current = buttons.findIndex((b) => b.offsetParent === null)
    setExpanded(true)
  }

  useEffect(() => {
    if (!expanded || focusFrom.current < 0) return
    gridRef.current?.querySelectorAll('button')[focusFrom.current]?.focus()
    focusFrom.current = -1
  }, [expanded])

  const close = () => setIndex(null)
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count))

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  useEffect(() => {
    if (index === null) return
    for (const n of [index + 1, index - 1 + count]) {
      const photo = galleryPhotos[n % count]
      const img = new Image()
      img.sizes = lightboxSizes
      img.srcset = photo.srcSet
    }
  }, [index])

  const current = index === null ? null : galleryPhotos[index]

  return (
    <Section id="gallery" labelledBy="gallery-title" tone="surface">
      <Container>
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="Inside my classroom"
          intro="Photos from my own lessons. This is what learning with me actually looks like."
        />

        <div
          ref={gridRef}
          id="gallery-grid"
          className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 [--order-step:70ms] sm:grid-cols-3 sm:gap-x-4 lg:mt-12 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-6"
        >
          {galleryPhotos.map((img, i) => (
            <Reveal as="figure" key={img.src} className={`group ${expanded ? '' : collapsedClass(i)}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-haspopup="dialog"
                className="block w-full overflow-hidden rounded-card bg-sky"
              >
                <span className="reveal-unveil">
                  <span className="reveal-zoom">
                    <picture className="contents">
                      <source
                        type="image/webp"
                        srcSet={img.srcSet}
                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 31vw, 46vw"
                      />
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-4/3 w-full object-cover transition-[scale] duration-700 ease-soft group-hover:scale-[1.035]"
                        style={{ objectPosition: img.position }}
                      />
                    </picture>
                  </span>
                </span>
              </button>
              <figcaption className="reveal mt-2.5 text-[13px] leading-snug text-muted [--delay:350ms] [--distance:6px] sm:text-sm">
                <span className="transition-colors duration-300 group-hover:text-ink">{img.caption}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        {!expanded && (
          <div className="mt-8 flex justify-center">
            <Button variant="secondary" size="sm" onClick={expand} aria-controls="gallery-grid">
              Show all {count} photos
            </Button>
          </div>
        )}
      </Container>

      <Modal open={current !== null} onClose={close} label="Photo viewer" onKeyDown={onKeyDown}>
        {current && index !== null && (
          <div
            className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            {/* Keyed by photo, so each new photo fades in rather than snapping. */}
            <picture key={current.src} className="contents">
              <source type="image/webp" srcSet={current.srcSet} sizes={lightboxSizes} />
              <img
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="fade-swap max-h-[78dvh] w-auto max-w-full rounded-2xl object-contain"
              />
            </picture>

            <div className="flex w-full max-w-4xl items-center justify-between gap-4 text-white">
              <button type="button" onClick={() => step(-1)} className={lightboxButton} aria-label="Previous photo">
                <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
              <p className="text-center text-sm text-white/80" aria-live="polite">
                {current.caption}
                <span className="ml-3 text-white/60">
                  {index + 1} / {count}
                </span>
              </p>
              <button type="button" onClick={() => step(1)} className={lightboxButton} aria-label="Next photo">
                <ArrowRightIcon size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            <button
              type="button"
              data-autofocus
              onClick={close}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
              aria-label="Close photo viewer"
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </Modal>
    </Section>
  )
}
