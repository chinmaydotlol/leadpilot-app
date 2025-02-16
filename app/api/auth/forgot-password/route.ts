import { NextResponse } from "next/server"
import crypto from "crypto"
import clientPromise from "@/lib/mongodb"
import User from "@/lib/models/user.model"
import { sendPasswordResetEmail } from "@/lib/services/email.service"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    await clientPromise 

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset email" },
        { status: 200 }
      )
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")

    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordExpires = new Date(Date.now() + 3600000)
    await user.save()

    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json(
      { message: "If an account exists, you will receive a password reset email" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 