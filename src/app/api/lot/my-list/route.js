import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization")
    const headers = { "Content-Type": "application/json" }
    if (authHeader) headers["Authorization"] = authHeader

    const { searchParams } = new URL(request.url)
    const offset = searchParams.get("offset") ?? "0"
    const limit = searchParams.get("limit") ?? "100"

    const url = `${API_URL}/api/v1/lot/list?is_participant=true&limit=${limit}&offset=${offset}`

    let response = await fetch(url, { headers, redirect: "manual" })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
        response = await fetch(redirectUrl, { headers, redirect: "manual" })
      }
    }

    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend" }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[lot/my-list] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Миний дуудлагын жагсаалт авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
