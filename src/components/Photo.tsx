import type { Photo as PhotoData } from '@/lib/images'

type Props = {
  photo: PhotoData
  /** The `sizes` hint for the WebP srcset — how wide the image renders. */
  sizes: string
  className?: string
  /** The hero photo loads eagerly; everything else is lazy. */
  priority?: boolean
}

/**
 * A photograph rendered with `object-fit: cover` and a hand-chosen
 * `object-position`, so it is cropped rather than stretched. Serves WebP
 * (small + full) with the original JPEG as fallback, and always emits
 * intrinsic width/height to reserve layout space.
 */
export function Photo({ photo, sizes, className = '', priority = false }: Props) {
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={photo.srcSet} sizes={sizes} />
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className={`object-cover ${className}`}
        style={{ objectPosition: photo.position }}
      />
    </picture>
  )
}
