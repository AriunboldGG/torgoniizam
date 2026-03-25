import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    const body = new URLSearchParams()
    body.append("client_id", process.env.OAUTH_CLIENT_ID)
    body.append("client_secret", process.env.OAUTH_CLIENT_SECRET)
    body.append("grant_type", process.env.OAUTH_GRANT_TYPE)
    body.append("username", username)
    body.append("password", password)

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
    console.error("Login proxy error:", error)
    return NextResponse.json(
      { detail: "Серверт холбогдоход алдаа гарлаа." },
      { status: 500 }
    )
  }
}
