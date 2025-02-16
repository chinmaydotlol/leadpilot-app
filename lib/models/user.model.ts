import mongoose from "mongoose"
import { UserType } from "../types"

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: String,
    image: String,
    emailVerified: Date,
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    provider: {
      type: String,
      default: "credentials",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User 