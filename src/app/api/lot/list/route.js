import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") ?? ""
    const offset = searchParams.get("offset") ?? "0"
    const limit = searchParams.get("limit") ?? ""

    const params = new URLSearchParams()
    if (status) params.set("status", status)
    params.set("offset", offset)
    if (limit) params.set("limit", limit)

    const url = `${API_URL}/api/v1/lot/list?${params.toString()}`

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
    console.error("[lot/list] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Дуудлага худалдааны жагсаалт авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
