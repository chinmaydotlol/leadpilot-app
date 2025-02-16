import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const rateLimit = new Map<string, { count: number; timestamp: number }>()

export async function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || 
             request.headers.get("x-real-ip") ||
             "127.0.0.1"

  const now = Date.now()
  const windowSize = 60 * 1000
  const maxRequests = 60 

  const current = rateLimit.get(ip) ?? { count: 0, timestamp: now }
  
  if (now - current.timestamp > windowSize) {
    current.count = 0
    current.timestamp = now
  }
  
  current.count++
  rateLimit.set(ip, current)

  if (current.count > maxRequests) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests" }),
      { 
        status: 429, 
        headers: { 
          "Content-Type": "application/json",
          "Retry-After": "60"
        } 
      }
    )
  }

  const response = NextResponse.next()
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  )

  return response
}

export const config = {
  matcher: "/api/:path*",
} 