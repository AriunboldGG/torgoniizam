import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function POST(request, { params }) {
  try {
    const { id } = await params
    const authHeader = request.headers.get("Authorization")

    const headers = { "Content-Type": "application/json" }
    if (authHeader) headers["Authorization"] = authHeader

    const url = `${API_URL}/api/v1/lots/join/${id}/`

    let response = await fetch(url, { method: "POST", headers, redirect: "manual" })

    // Follow redirect while preserving Authorization header
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
        response = await fetch(redirectUrl, { method: "POST", headers, redirect: "manual" })
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
    console.error("[lot/join] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Дэнчин байршуулахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
