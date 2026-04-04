/**
 * fetchWithAuth(url, options)
 *
 * A drop-in replacement for fetch() that:
 *  1. Attaches the Bearer token from localStorage automatically
 *  2. On 401 — tries to refresh the access token using the stored refresh_token
 *  3. Retries the original request once with the new token
 *  4. If refresh also fails — clears all auth tokens so the user is forced to re-login
 */

const clearTokens = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("user")
}

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) return null

  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!res.ok) {
      clearTokens()
      return null
    }

    const data = await res.json()
    const newAccessToken = data?.access_token
    if (!newAccessToken) {
      clearTokens()
      return null
    }

    localStorage.setItem("access_token", newAccessToken)
    // Server may also return a new refresh_token — store it if so
    if (data?.refresh_token) {
      localStorage.setItem("refresh_token", data.refresh_token)
    }

    return newAccessToken
  } catch {
    clearTokens()
    return null
  }
}

export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem("access_token")

  const makeRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    })

  // First attempt
  let response = await makeRequest(accessToken)

  // If 401, try to refresh and retry once
  if (response.status === 401) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      response = await makeRequest(newToken)
    }
  }

  return response
}
