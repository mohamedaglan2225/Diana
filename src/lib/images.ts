import { asset } from './assets'

export type Photo = {
  /** Original JPEG — the fallback for browsers without WebP. */
  src: string
  /** WebP `srcset` (a small and a full-width variant). */
  srcSet: string
  alt: string
  width: number
  height: number
  /** CSS object-position, hand-picked so faces are never cropped out. */
  position: string
}

/**
 * Every photo in /public/images has two WebP variants next to it:
 *   <name>-<800|640>.webp  (640 for photos under 1000px wide)
 *   <name>-<width>.webp    (native width)
 * See README → Photography for the command that regenerates them.
 */
const photo = (
  file: string,
  alt: string,
  width: number,
  height: number,
  position = '50% 50%',
): Photo => {
  const name = file.replace(/\.jpg$/, '')
  const small = width > 1000 ? 800 : 640
  return {
    src: asset(`images/${file}`),
    srcSet: `${asset(`images/${name}-${small}.webp`)} ${small}w, ${asset(`images/${name}-${width}.webp`)} ${width}w`,
    alt,
    width,
    height,
    position,
  }
}

/** Diana's portrait — the hero image. Keep in sync with the preload in vite.config.ts. */
export const heroPortrait = photo(
  'diana-portrait.jpg',
  'Diana Rasok, English teacher, smiling outdoors',
  932,
  1188,
  '50% 22%',
)

export const aboutPhoto = photo(
  'classroom-craft-circle.jpg',
  'Diana sitting on the floor with a small group of young learners during a craft activity',
  960,
  1280,
  '50% 64%',
)

export const approachPhoto = photo(
  'lesson-board-clothes.jpg',
  'Diana and a young student matching clothing flashcards on the whiteboard',
  1600,
  1200,
  '44% 50%',
)

/**
 * The TESOL certificate, rendered from the owner's PDF at 2400px wide so the
 * fine print stays readable. The JPEG (1600px) is the fallback; the WebP
 * variants are 1200px and 2400px. Full document, never cropped.
 */
export const certificateImage = {
  srcSet: `${asset('images/tesol-certificate-1200.webp')} 1200w, ${asset('images/tesol-certificate-2400.webp')} 2400w`,
  width: 2400,
  height: 1696,
}

/**
 * Editorial gallery — a deliberate mix of orientations, no repeats and no
 * photo used elsewhere on the page.
 */
export type GalleryPhoto = Photo & {
  caption: string
  /** Tailwind aspect class — kept at or very near the photo's native ratio. */
  ratio: string
}

const galleryItem = (
  file: string,
  alt: string,
  width: number,
  height: number,
  caption: string,
  ratio: string,
  position = '50% 45%',
): GalleryPhoto => ({ ...photo(file, alt, width, height, position), caption, ratio })

export const galleryPhotos: GalleryPhoto[] = [
  galleryItem(
    'colour-by-numbers.jpg',
    'A class of young learners holding up finished colour-by-numbers worksheets with Diana',
    1600,
    1200,
    'Creative classroom activities',
    'aspect-4/3',
  ),
  galleryItem(
    'outdoor-storytelling.jpg',
    'Diana leading an outdoor English activity for a group of children',
    1200,
    1600,
    'English beyond the classroom',
    'aspect-3/4',
    '50% 40%',
  ),
  galleryItem(
    'lesson-board-pointing.jpg',
    'Diana pointing at an exercise on the classroom screen while a student follows along',
    1600,
    1200,
    'Grammar, practised out loud',
    'aspect-4/3',
    '50% 40%',
  ),
  galleryItem(
    'flashcards-on-the-floor.jpg',
    'Young learners working through English flashcards laid out on the floor',
    1600,
    900,
    'Interactive learning',
    'aspect-16/9',
  ),
  galleryItem(
    'letters-to-santa.jpg',
    'A class proudly presenting the English letters they have written',
    1600,
    1200,
    'Celebrating progress',
    'aspect-4/3',
  ),
  galleryItem(
    'floor-reading-circle.jpg',
    'Students sitting in a circle on the floor reading together with Diana',
    1600,
    1200,
    'Learning together',
    'aspect-3/2',
    '50% 55%',
  ),
  galleryItem(
    'christmas-lesson-teens.jpg',
    'Diana and two teenage students during a festive themed English lesson',
    1600,
    900,
    'Lessons with a bit of fun',
    'aspect-16/9',
  ),
  galleryItem(
    'paper-craft-group.jpg',
    'A group of young learners holding paper crafts they made during an English lesson',
    1600,
    1200,
    'Making English hands-on',
    'aspect-4/3',
  ),
  galleryItem(
    'worksheet-practice.jpg',
    'Diana moving around the classroom helping students with their worksheets',
    1600,
    1200,
    'Practice with support',
    'aspect-4/3',
    '50% 50%',
  ),
  galleryItem(
    'festive-classroom-visit.jpg',
    'Diana with students during a seasonal classroom celebration',
    1600,
    900,
    'Classroom moments',
    'aspect-16/9',
  ),
  galleryItem(
    'outdoor-group-lesson.jpg',
    'Diana speaking to a large group of children and parents at an outdoor event',
    1280,
    853,
    'Speaking in front of a crowd',
    'aspect-3/2',
  ),
]
