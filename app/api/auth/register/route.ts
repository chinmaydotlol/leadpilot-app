import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import clientPromise from "@/lib/mongodb"
import User from "@/lib/models/user.model"
import { sendVerificationEmail } from "@/lib/services/email.service"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await clientPromise 

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const verificationToken = crypto.randomBytes(32).toString("hex")

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    })

    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json(
      { message: "Registration successful. Please check your mail to verify you're account." },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
} 