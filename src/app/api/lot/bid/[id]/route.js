import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const authHeader = request.headers.get("Authorization")

    const headers = { "Content-Type": "application/json" }
    if (authHeader) headers["Authorization"] = authHeader

    const body = await request.json()

    const url = `${API_URL}/api/v1/lots/bid/${id}/`

    let response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      redirect: "manual",
    })

    // Follow redirect while preserving Authorization header
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
        response = await fetch(redirectUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          redirect: "manual",
        })
      }
    }

    const text = await response.text()

    let data
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend" }, { status: 502 })
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
