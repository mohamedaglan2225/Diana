export type Testimonial = {
  quote: string
  /** As the person agreed to be credited — e.g. 'Anna' or 'Parent of a 9-year-old'. */
  name: string
  /** Optional context, e.g. the program they took. */
  context?: string
}

/**
 * Real student / parent reviews only, shared with their permission.
 * The Student Stories section stays hidden while this list is empty.
 */
export const testimonials: Testimonial[] = []
