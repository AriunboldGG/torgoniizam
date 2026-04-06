import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function POST(request) {
  try {
    const { refresh_token } = await request.json()

    if (!refresh_token) {
      return NextResponse.json({ detail: "refresh_token required" }, { status: 400 })
    }

    const body = new URLSearchParams()
    body.append("client_id", process.env.OAUTH_CLIENT_ID)
    body.append("client_secret", process.env.OAUTH_CLIENT_SECRET)
    body.append("grant_type", "refresh_token")
    body.append("refresh_token", refresh_token)

    const response = await fetch(`${API_URL}/api/oauth2/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "follow",
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Refresh token proxy error:", error.message)
    return NextResponse.json(
      { detail: "Token refresh failed.", error: error.message },
      { status: 500 }
    )
  }
}
