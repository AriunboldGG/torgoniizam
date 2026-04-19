import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET() {
  try {
    const url = `${API_URL}/api/v1/lot/category`

    let response = await fetch(url, {
      headers: { Accept: "application/json" },
      redirect: "manual",
    })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
        response = await fetch(redirectUrl, { headers: { Accept: "application/json" }, redirect: "manual" })
      }
    }

    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend", status: response.status, raw: text.slice(0, 500) }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[lot/category] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Ангилал авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
