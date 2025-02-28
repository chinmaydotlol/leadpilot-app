import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import User from "@/lib/models/user.model";

let client;
(async () => {
  client = await clientPromise; 
})();

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 });
    }

    type LeanUser = {
      _id: string; 
      verificationToken?: string;
      emailVerified?: Date | number;
    };

    const user = (await User.findOne({ verificationToken: token }).lean()) as LeanUser | null;

    if (!user) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 });
    }

    await User.updateOne(
      { _id: user._id },
      {
        emailVerified: Date.now(),
        verificationToken: null,
      }
    );

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}