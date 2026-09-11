import { asset } from './assets'

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  /** CSS object-position, hand-picked so faces are never cropped out. */
  position: string
}

const photo = (
  file: string,
  alt: string,
  width: number,
  height: number,
  position = '50% 50%',
): Photo => ({ src: asset(`images/${file}`), alt, width, height, position })

/** Diana's portrait — the hero image. */
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
  'lesson-board-pointing.jpg',
  'Diana pointing at an exercise on the classroom screen while a student follows along',
  1600,
  1200,
  '50% 40%',
)

export const activeLearningPhoto = photo(
  'lesson-board-clothes.jpg',
  'Diana and a young student matching clothing flashcards on the whiteboard',
  1600,
  1200,
  '50% 42%',
)

/**
 * Editorial gallery — a deliberate mix of orientations, no repeats and no
 * photo used elsewhere on the page.
 */
export type GalleryPhoto = Photo & {
  caption: string
  /** Tailwind aspect class — kept at or very near the photo's native ratio. */
  ratio: string
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    ...photo(
      'colour-by-numbers.jpg',
      'A class of young learners holding up finished colour-by-numbers worksheets with Diana',
      1600,
      1200,
      '50% 45%',
    ),
    caption: 'Creative classroom activities',
    ratio: 'aspect-4/3',
  },
  {
    ...photo(
      'outdoor-storytelling.jpg',
      'Diana leading an outdoor English activity for a group of children',
      1200,
      1600,
      '50% 40%',
    ),
    caption: 'English beyond the classroom',
    ratio: 'aspect-3/4',
  },
  {
    ...photo(
      'flashcards-on-the-floor.jpg',
      'Young learners working through English flashcards laid out on the floor',
      1600,
      900,
      '50% 45%',
    ),
    caption: 'Interactive learning',
    ratio: 'aspect-16/9',
  },
  {
    ...photo(
      'letters-to-santa.jpg',
      'A class proudly presenting the English letters they have written',
      1600,
      1200,
      '50% 45%',
    ),
    caption: 'Celebrating progress',
    ratio: 'aspect-4/3',
  },
  {
    ...photo(
      'floor-reading-circle.jpg',
      'Students sitting in a circle on the floor reading together with Diana',
      1600,
      1200,
      '50% 55%',
    ),
    caption: 'Learning together',
    ratio: 'aspect-3/2',
  },
  {
    ...photo(
      'christmas-lesson-teens.jpg',
      'Diana and two teenage students during a festive themed English lesson',
      1600,
      900,
      '50% 45%',
    ),
    caption: 'Lessons with a bit of fun',
    ratio: 'aspect-16/9',
  },
  {
    ...photo(
      'paper-craft-group.jpg',
      'A group of young learners holding paper crafts they made during an English lesson',
      1600,
      1200,
      '50% 45%',
    ),
    caption: 'Making English hands-on',
    ratio: 'aspect-4/3',
  },
  {
    ...photo(
      'worksheet-practice.jpg',
      'Diana moving around the classroom helping students with their worksheets',
      1600,
      1200,
      '50% 50%',
    ),
    caption: 'Practice with support',
    ratio: 'aspect-4/3',
  },
  {
    ...photo(
      'festive-classroom-visit.jpg',
      'Diana with students during a seasonal classroom celebration',
      1600,
      900,
      '50% 45%',
    ),
    caption: 'Classroom moments',
    ratio: 'aspect-16/9',
  },  {
    ...photo(
      'outdoor-group-lesson.jpg',
      'Diana speaking to a large group of children and parents at an outdoor event',
      1280,
      853,
      '50% 45%',
    ),
    caption: 'Speaking in front of a crowd',
    ratio: 'aspect-3/2',
  },
]
