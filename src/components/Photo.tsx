import type { CSSProperties } from 'react'
import type { Photo as PhotoData } from '@/lib/images'

type Props = {
  photo: PhotoData
  className?: string
  style?: CSSProperties
  /** The hero photo loads eagerly; everything else is lazy. */
  priority?: boolean
}

/**
 * A photograph rendered with `object-fit: cover` and a hand-chosen
 * `object-position`, so it is cropped rather than stretched. Intrinsic
 * width/height are always emitted to reserve layout space.
 */
export function Photo({ photo, className = '', style, priority = false }: Props) {
  return (
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
      style={{ objectPosition: photo.position, ...style }}
    />
  )
}
