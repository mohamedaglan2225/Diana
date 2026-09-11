# English with Diana

Personal website for Diana Rasok — TESOL / TEFL certified English teacher.

Implemented from the Figma Make project
`https://www.figma.com/make/NTIIG6777RfH4LaFUanzue/Complete-current-task`,
keeping that project's stack (React 19 + Vite + Tailwind CSS v4), its theme
tokens, layout, typography and section order.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Typecheck, then produce `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

Deploying under a sub-path (e.g. GitHub Pages) works without touching any
image path — set `PUBLIC_BASE_PATH=/my-sub-path/` before `npm run build`.

## Things that still need real information

Everything below lives in **`src/site.config.ts`**. Each value is `null` until
supplied, and the UI degrades to an honest "coming soon" state rather than
inventing a detail.

| Key | What to put there |
| --- | --- |
| `whatsappNumber` | International digits only, e.g. `'201234567890'` |
| `email` | The address enquiries should reach |
| `instagramUrl` | Full profile URL |
| `certificateAsset` | Path to the real TESOL certificate scan once added to `public/images/`, e.g. `'/images/tesol-certificate.jpg'` |

The contact form has no backend. Once `email` (or failing that
`whatsappNumber`) is set, submitting opens a pre-filled message with the
enquiry details. Wire it to a form service later if you'd prefer.

## Photography

All images in `public/images/` are Diana's own photographs. No stock imagery,
no placeholders. `src/lib/images.ts` is the single manifest: it holds each
photo's alt text, intrinsic dimensions (so nothing shifts while loading) and a
hand-picked `object-position`.

Aspect ratios are set at or very near each photo's native ratio, so images are
cropped gently — never stretched.

## Accessibility notes

`#6F9FBD` is retained as the decorative brand accent, but white text on it
measures only 2.85:1, so text and solid buttons use deeper members of the same
blue family (`#4A7C9B`, `#3F6C88`) which clear WCAG AA.
