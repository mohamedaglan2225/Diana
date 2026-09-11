import { useCallback, useEffect, useState } from 'react'
import { CloseIcon } from '@/components/Icons'
import { useReveal } from '@/hooks/useReveal'
import { galleryPhotos } from '@/lib/images'
import type { GalleryPhoto } from '@/lib/images'

export function Gallery() {
  const ref = useReveal()
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [lightbox, close])

  return (
    <section id="gallery" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div ref={ref} className="reveal text-center mb-12 lg:mb-14">
          <p className="text-xs font-medium tracking-widest text-[#3F6C88] uppercase mb-4">
            Gallery
          </p>
          <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] text-[#2F3A40] mb-4 text-balance">
            Inside My Classroom
          </h2>
          <p className="text-[#68767D] max-w-md mx-auto text-base lg:text-lg leading-relaxed">
            English becomes easier when students are involved, curious and having fun.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
          {galleryPhotos.map((img) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightbox(img)}
              className="break-inside-avoid mb-4 sm:mb-5 block w-full text-left group relative rounded-[20px] overflow-hidden"
              aria-label={`View photo: ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className={`gallery-img w-full object-cover rounded-[20px] shadow-sm ${img.ratio}`}
                style={{ objectPosition: img.position }}
              />
              <span className="pointer-events-none absolute inset-0 rounded-[20px] bg-[#2F3A40]/0 group-hover:bg-[#2F3A40]/25 group-focus-visible:bg-[#2F3A40]/25 transition-colors duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 bg-[#2F3A40]/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {img.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
          className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              width={lightbox.width}
              height={lightbox.height}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-sm text-white/70 mt-3">{lightbox.caption}</p>
            <button
              type="button"
              autoFocus
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              onClick={close}
              aria-label="Close photo"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
