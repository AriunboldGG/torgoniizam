import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const authHeader = request.headers.get("authorization")
    const headers = {}
    if (authHeader) headers["Authorization"] = authHeader

    const response = await fetch(`${API_URL}/api/v1/account/default/${id}`, {
      headers,
      redirect: "follow",
    })

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend", raw: text.slice(0, 200) }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[account/default] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Үндсэн данс тохируулахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
