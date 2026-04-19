import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization")
    const headers = { "Content-Type": "application/json" }
    if (authHeader) headers["Authorization"] = authHeader

    const { searchParams } = new URL(request.url)
    const query = searchParams.toString()
    const url = `${API_URL}/api/v1/bid/history${query ? `?${query}` : ""}`

    const response = await fetch(url, { headers, redirect: "follow" })
    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend", raw: text.slice(0, 200) }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[bid/history] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Bid history авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
