/**
 * Portal app URL.
 * Set NEXT_PUBLIC_PORTAL_URL in production (e.g. Netlify env var).
 * Defaults to local dev port for @apd-studio/web.
 */
export function portalUrl(): string {
  return process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3003";
}
