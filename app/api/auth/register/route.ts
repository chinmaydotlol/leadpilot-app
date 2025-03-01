import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import User from "@/lib/models/user.model";
import { sendVerificationEmail } from "@/lib/services/email.service";
import mongoose, { Mongoose } from 'mongoose';

// connect to mongodb before running the route
let client: Mongoose | null = null;

async function connectToDatabase() {
  if (!client) {
    client = await clientPromise; // reuse connection
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase(); // Ensure connection is established
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // calc hash pass & token concurrently
    const [hashedPassword, verificationToken] = await Promise.all([
      bcrypt.hash(password, 10),
      Promise.resolve(crypto.randomBytes(32).toString("hex")),
    ]);

    await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    sendVerificationEmail(email, verificationToken).catch((err) =>
      console.error("Verification email error:", err)
    );

    return NextResponse.json(
      { message: "Registration successful. Please check your mail to verify your account." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}