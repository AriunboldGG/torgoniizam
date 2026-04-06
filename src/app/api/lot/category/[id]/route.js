import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const hasAttribute = searchParams.get("has_attribute")

    const url = `${API_URL}/api/v1/lot/category/${id}${hasAttribute ? `?has_attribute=${hasAttribute}` : ""}`

    const response = await fetch(url, { redirect: "follow" })
    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend" }, { status: 502 })
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
