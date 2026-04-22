import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function POST(request) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_URL}/api/v1/user/password/reset/confirm/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Password reset confirm proxy error:", error)
    return NextResponse.json(
      { detail: "Системийн алдаа гарлаа. Дахин оролдоно уу." },
      { status: 500 }
    )
  }
}
