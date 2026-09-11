/**
 * Resolves a path inside /public against Vite's configured base URL so that
 * images work identically in `vite dev`, `vite build` and sub-path deploys.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
