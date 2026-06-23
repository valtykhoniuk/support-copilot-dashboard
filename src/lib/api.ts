/** Local dev: Vite proxy `/api` → localhost:8000. Production: set VITE_API_URL to backend origin. */
export function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "/api";
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
