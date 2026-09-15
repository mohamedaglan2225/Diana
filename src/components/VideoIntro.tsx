import { VideoIcon } from '@/components/Icons'
import { Photo } from '@/components/Photo'
import { asset } from '@/lib/assets'
import { aboutPhoto } from '@/lib/images'
import { siteConfig } from '@/site.config'

const sizes = '(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw'

/**
 * Diana's video introduction.
 *
 * With `siteConfig.introVideo` set, this is a native player: controls, no
 * autoplay, nothing downloaded until played (`preload="none"`), captions when
 * a WebVTT file is given, and `object-contain` so portrait or landscape
 * footage is never cropped. Until then it shows her classroom photo with a
 * plain "coming soon" label: no fake player and no play button that does
 * nothing.
 */
export function VideoIntro() {
  const video = siteConfig.introVideo

  return (
    <figure>
      <div className="relative overflow-hidden rounded-media bg-night shadow-media">
        {video ? (
          <video
            controls
            playsInline
            preload="none"
            poster={video.poster ? asset(video.poster) : aboutPhoto.src}
            className="aspect-4/5 w-full object-contain"
          >
            <source src={asset(video.src)} />
            {video.captions && (
              <track kind="captions" src={asset(video.captions)} srcLang="en" label="English" default />
            )}
          </video>
        ) : (
          <>
            <Photo photo={aboutPhoto} sizes={sizes} className="reveal-zoom aspect-4/5 w-full" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-linear-to-t from-night/90 via-night/60 to-transparent px-6 pt-20 pb-6 text-white">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30"
                aria-hidden="true"
              >
                <VideoIcon size={20} />
              </span>
              <span>
                <span className="block font-serif text-xl leading-tight">Video introduction</span>
                <span className="mt-0.5 block text-sm text-white/90">Coming soon</span>
              </span>
            </div>
          </>
        )}
      </div>
      <figcaption className="mt-4 text-[15px] leading-relaxed text-muted">
        {video
          ? 'Watch a short introduction and hear how I speak and teach.'
          : 'Soon you’ll be able to watch a short introduction here and hear how I speak and teach.'}
      </figcaption>
    </figure>
  )
}
