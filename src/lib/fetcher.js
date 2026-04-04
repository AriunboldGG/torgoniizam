/**
 * SWR fetcher utilities.
 *
 * publicFetcher  – for unauthenticated endpoints (e.g. auction list)
 * authFetcher    – for authenticated endpoints; SWR key must be [url, token]
 * getAuthKey     – builds the SWR key synchronously from localStorage;
 *                  returns null on SSR or when not logged in (prevents any fetch)
 */

export const publicFetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    return res.json()
  })

export const authFetcher = ([url, token]) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
    return res.json()
  })

/**
 * Pass this as the SWR key (as a function so SWR re-evaluates on every render):
 *   useSWR(() => getAuthKey("/api/some/endpoint"), authFetcher, ...)
 *
 * - Returns null during SSR (localStorage unavailable) → no fetch
 * - Returns null when no access_token in localStorage → no fetch
 * - Returns [url, token] when logged in → SWR fetches
 */
export const getAuthKey = (path) => {
  if (typeof window === "undefined") return null
  const token = localStorage.getItem("access_token")
  return token ? [path, token] : null
}
