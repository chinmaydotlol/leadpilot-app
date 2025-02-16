import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import User from "@/lib/models/user.model"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      )
    }

    await clientPromise

    const user = await User.findOne({ verificationToken: token })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      )
    }

    user.emailVerified = new Date()
    user.verificationToken = undefined
    await user.save()

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 