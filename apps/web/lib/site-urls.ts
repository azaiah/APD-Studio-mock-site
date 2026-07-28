/**
 * Public marketing site URL.
 * Set NEXT_PUBLIC_MARKETING_SITE_URL in production (e.g. Netlify env var).
 * Defaults to local dev port for @apd-studio/site.
 */
export function marketingSiteUrl(): string {
  return process.env.NEXT_PUBLIC_MARKETING_SITE_URL ?? "http://localhost:3002";
}
