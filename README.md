# English with Diana

Personal website for Diana Rasok — TESOL / TEFL certified English teacher.
A single-page site built with React 19 + Vite + Tailwind CSS v4 (CSS-first
config). No router, backend or CMS.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run build` | Typecheck, then produce `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

Deploying under a sub-path (e.g. GitHub Pages) works without touching any
image path — set `PUBLIC_BASE_PATH=/my-sub-path/` before `npm run build`.

## Page structure

`src/App.tsx` composes the page (V2), in this order:

| Section | File | Anchor |
| --- | --- | --- |
| Navigation | `sections/Nav.tsx` | — |
| Hero | `sections/Hero.tsx` | `#top` |
| Trust bar (the one place credentials appear as headline facts) | `sections/TrustStrip.tsx` | — |
| Programs: 4 core + Special programs (Conversation Club, Travel English) | `sections/Programs.tsx` + `data/programs.ts` | `#programs` |
| How it works: 4-step path + lesson formats | `sections/HowItWorks.tsx` | `#how-it-works` |
| Placement test (marketing entry point, no test engine) | `sections/PlacementTest.tsx` + `data/levels.ts` | `#placement-test` |
| About: video intro, short bio, approach | `sections/About.tsx` + `components/VideoIntro.tsx` | `#about` |
| Experience & qualifications | `sections/Experience.tsx` + `data/experience.ts` | `#experience`, `#certification` |
| Gallery (first two rows, then "Show all photos") | `sections/Gallery.tsx` + `lib/images.ts` | `#gallery` |
| Student stories (hidden until real reviews exist) | `sections/StudentStories.tsx` + `data/testimonials.ts` | `#stories` |
| FAQ | `sections/FAQ.tsx` + `data/faq.ts` | `#faq` |
| Contact / enquiry form | `sections/Contact.tsx` | `#contact`, `#booking-form` |
| Footer | `sections/Footer.tsx` | — |

Anchors from earlier versions still land in the right place (see
`hooks/useHashScroll.ts`): `#lessons` → Programs, `#progress` and
`#how-lessons-work` → How it works, `#international` and `#my-approach` → About.

Shared pieces live in `src/components/` (`Button`, `SectionHeading`,
`Section`/`Container`, `Modal`, `ProgramCard`, `SpecialProgramCard`,
`VideoIntro`, `Photo`, `Reveal`, `Icons`). Navigation links are defined once
in `src/data/navigation.ts`.

**Program → form flow.** The selected program lives in `App` state. Each
program card's "Ask about …" link sets it and jumps to `#booking-form`, where
the "Program" field is already filled in. Form options come from
`programChoices` in `data/programs.ts` (core and special programs), so names
always match the cards. The placement test's "send a short enquiry" fallback
sets it to "Not sure yet".

**Avoiding repetition.** Each message has one home: credentials in the trust
bar, lesson formats in How it works, Diana's approach in About, the detailed
history and certificate in Experience, the placement test's details (estimated
level, teacher review) in the Placement test section. Each program has one
tagline, not a tagline plus a "for whom" line. The FAQ keeps its answers short
where the page already explains something in full.

## Design tokens

All colours, type sizes, radii and shadows are defined in the `@theme` block
of `src/index.css`. The default Tailwind palette is switched off, so use the
semantic utilities (`bg-canvas`, `bg-sky`, `bg-sky-deep`, `bg-mist`, `bg-sand`, `bg-night`, `text-ink`,
`text-muted`, `bg-brand`, `border-line`, `text-h2`, `rounded-card`,
`shadow-card`, …) rather than hex values. Global element styles sit in
`@layer base`, so utilities always win.

## Owner information

Everything below lives in **`src/site.config.ts`**. Values left as `null`
are not yet supplied, and the site leaves that detail out rather than
inventing it.

Connected:

| Key | Value |
| --- | --- |
| `certificate.asset` | `images/tesol-certificate.jpg`, rendered from the owner's `TESOL Certificate.pdf` (WebP variants `-1200` / `-2400` alongside). Enables "View certificate". |
| `certificate.pdf` | `documents/tesol-certificate.pdf`, an unmodified copy of the original, linked from the certificate viewer |

Still missing:

| Key | What to put there |
| --- | --- |
| `whatsappNumber` | International format, e.g. `'201234567890'` (spaces, dashes and `+` are stripped) |
| `email` | The address enquiries should reach |
| `instagramUrl` | Full profile URL |
| `siteUrl` | Public URL with trailing slash, e.g. `'https://englishwithdiana.com/'`. Enables canonical, `og:url`, absolute social image, `twitter:image` and `sitemap.xml` |
| `placementTestUrl` | Link to the real placement test once it exists. While `null`, "Take Placement Test" is labelled "Coming soon" and, when pressed, says so plainly and offers the enquiry form |
| `introVideo` | `{ src, poster?, captions? }`, paths inside `public/` (e.g. `videos/diana-intro.mp4`, a WebVTT captions file). While `null`, About shows Diana's classroom photo with a "Video introduction · Coming soon" label, never a fake player |

Real student or parent reviews (with permission) go in
`src/data/testimonials.ts`; the Student Stories section appears automatically.

Confirmed by the owner: lessons are **online**, as **private 1-to-1** or
**group** lessons. Prices are intentionally **not** shown anywhere; visitors
are invited to get in touch instead. Lesson length, schedules and group size
are not stated.

**Contact form.** There is no backend. With `email` set, submitting opens a
pre-filled email; failing that, a pre-filled WhatsApp message; with neither,
the visitor is told plainly that the message wasn't sent. The message includes
name, reply address, learner, level, program and lesson format. Wire it to a
form service later if you'd prefer; the form already collects a reply address.

**Copy style.** Visible website copy doesn't use em dashes, en dashes or
double hyphens as punctuation. Use periods, commas, colons or parentheses;
`·` is fine for compact metadata such as "Russia · Vietnam · Egypt".
Hyphenated terms such as 1-to-1 and 120-Hour are fine.

## Photography

All images in `public/images/` are Diana's own photographs — no stock imagery.
`src/lib/images.ts` is the single manifest: alt text, intrinsic dimensions
(so nothing shifts while loading) and a hand-picked `object-position`.

Each JPEG has two WebP variants next to it, served via `srcset` (the JPEG is
the fallback). The certificate image was rendered from the PDF with macOS PDFKit at
2400px, then converted with the same tools. After adding or replacing a photo,
regenerate the variants with
[`cwebp`](https://developers.google.com/speed/webp/docs/cwebp):

```bash
cd public/images
for f in *.jpg; do
  [ "$f" = tesol-certificate.jpg ] && continue   # rendered separately from the PDF
  b="${f%.jpg}"; w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  small=$([ "$w" -gt 1000 ] && echo 800 || echo 640)
  cwebp -quiet -q 78 -m 6 -resize $small 0 "$f" -o "$b-$small.webp"
  cwebp -quiet -q 78 -m 6 "$f" -o "$b-$w.webp"
done
```

## SEO

`index.html` holds the title, description and social copy. A small plugin in
`vite.config.ts` adds the hero image preload and `Person` structured data
(from `site.config.ts`), always emits `robots.txt`, and — once `siteUrl` is
set — the canonical link, absolute share image and `sitemap.xml`.

## Motion

No animation library: CSS transitions and keyframes, one shared
IntersectionObserver, and one small scroll handler for the hero parallax.
The classes and timing knobs are documented at the top of the motion block
in `src/index.css`.

- **Scroll reveals.** `useReveal()` (or the `<Reveal as="li">` wrapper for
  list items) adds `.is-visible` once, the first time an element enters the
  viewport. Style the element or its children with `.reveal` (fade up),
  `.reveal-left` / `.reveal-right`, `.reveal-scale`, `.reveal-fade`,
  `.draw-x` / `.draw-y` (lines) or `.reveal-unveil` / `.reveal-zoom`
  (photos). Siblings that enter together are staggered automatically in
  reading order; `--delay`, `--i`, `--distance` and `--order-step` fine-tune it.
- **One-offs.** The hero entrance (`.hero-*`), the nav's sliding indicator
  and reading-progress hairline (a CSS scroll timeline, so no JavaScript),
  dialog open/close, and the FAQ's grid-row expand.
- **Easing.** `ease-soft` for entrances, `ease-draw` for lines, plain
  `ease-out` for small hover feedback. Nothing bounces or overshoots.
- **Touch and phones.** Tailwind's `hover:` only applies on devices that can
  hover. Parallax runs from 1024px up only; sideways slides become fade-ups
  below 640px.

## Accessibility notes

- `#6F9FBD` (`brand-accent`) is decorative only; text and buttons use
  `brand` (`#3F6C88`, 5.7:1 with white). On the dark Placement test band,
  body copy is at least 70% white and the button uses the `light` variant.
- The placement-test button stays a real, focusable button while the test
  doesn't exist; it is described by its "Coming soon" label and announces an
  explanation through a polite live region when pressed.
- Dialogs use native `<dialog>` + `showModal()`: focus stays inside, Escape
  and backdrop click close, page scroll is locked and focus returns to the
  trigger.
- The collapsed mobile menu and closed FAQ answers are `inert`.
- Gallery photos beyond the first rows are `display: none` (out of the tab
  order) until "Show all photos" is pressed; focus then moves to the first
  newly shown photo. The lightbox always steps through all twelve.
- All motion respects `prefers-reduced-motion`: content is simply there,
  with no reveals, line drawing, parallax or dialog animation. The portrait
  is never hidden by animation (it is the LCP image), and revealed content
  is always shown when printing.
