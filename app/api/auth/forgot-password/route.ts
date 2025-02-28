import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import User from "@/lib/models/user.model";
import { sendPasswordResetEmail } from "@/lib/services/email.service";

let client;
(async () => {
  client = await clientPromise; 
})();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset email" },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await User.updateOne(
      { email },
      {
        resetPasswordToken,
        resetPasswordExpires: Date.now() + 3600000, 
      }
    );

    sendPasswordResetEmail(email, resetToken).catch((err) =>
      console.error("Email send error:", err)
    );

    return NextResponse.json(
      { message: "If an account exists, you will receive a password reset email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}