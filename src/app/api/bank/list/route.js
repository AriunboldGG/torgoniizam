import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")
    const headers = {}
    if (authHeader) headers["Authorization"] = authHeader

    const backendUrl = `${API_URL}/api/v1/bank/list`
    console.log("[bank/list] Fetching:", backendUrl)

    const response = await fetch(backendUrl, {
      headers,
      redirect: "follow",
    })

    const text = await response.text()
    console.log("[bank/list] Status:", response.status, "Body:", text.slice(0, 200))

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend", raw: text.slice(0, 200) }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[bank/list] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Банкны жагсаалт авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
