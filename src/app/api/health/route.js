import { NextResponse } from "next/server"

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET
  const grantType = process.env.OAUTH_GRANT_TYPE

  const config = {
    NEXT_PUBLIC_API_URL: apiUrl ? `✅ set (${apiUrl})` : "❌ MISSING",
    OAUTH_CLIENT_ID: clientId ? `✅ set (${clientId.slice(0, 6)}...)` : "❌ MISSING",
    OAUTH_CLIENT_SECRET: clientSecret ? `✅ set (${clientSecret.slice(0, 6)}...)` : "❌ MISSING",
    OAUTH_GRANT_TYPE: grantType ? `✅ set (${grantType})` : "❌ MISSING",
  }

  // Test actual connectivity to the backend
  let backendReachable = false
  let backendStatus = null
  let backendError = null
  try {
    const res = await fetch(`${apiUrl}/api/v1/lot/list?limit=1`, {
      signal: AbortSignal.timeout(5000),
    })
    backendReachable = true
    backendStatus = res.status
  } catch (err) {
    backendError = err.message
  }

  return NextResponse.json({
    env: config,
    backend: {
      reachable: backendReachable,
      status: backendStatus,
      error: backendError,
    },
  })
}
