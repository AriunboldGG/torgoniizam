import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Candidate URLs tried in order — first non-404 wins
const BID_URL_CANDIDATES = (id) => [
  `${API_URL}/api/v1/lots/bid/${id}/`,
  `${API_URL}/api/v1/lot/bid/${id}/`,
  `${API_URL}/api/v1/lots/${id}/bid/`,
  `${API_URL}/api/v1/bid/${id}/`,
]

async function tryFetch(url, options) {
  let response = await fetch(url, { ...options, redirect: "manual" })
  // Follow redirect while preserving Authorization header
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location")
    if (location) {
      const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
      response = await fetch(redirectUrl, { ...options, redirect: "manual" })
    }
  }
  return response
}

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const authHeader = request.headers.get("Authorization")

    const headers = { "Content-Type": "application/json" }
    if (authHeader) headers["Authorization"] = authHeader

    const body = await request.json()
    const fetchOptions = { method: "POST", headers, body: JSON.stringify(body) }

    let response = null
    for (const url of BID_URL_CANDIDATES(id)) {
      response = await tryFetch(url, fetchOptions)
      console.log(`[lot/bid] tried ${url} → ${response.status}`)
      if (response.status !== 404) break
    }

    const text = await response.text()
    console.log(`[lot/bid] backend response ${response.status}: ${text.substring(0, 300)}`)

    let data
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      // Backend returned non-JSON (HTML error page) — surface the real HTTP status
      return NextResponse.json(
        { detail: `Backend error (${response.status}): ${text.substring(0, 200)}` },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[lot/bid] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Үнийн санал илгээхэд алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
