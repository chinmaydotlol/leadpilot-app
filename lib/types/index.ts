import { DefaultSession } from "next-auth"

export interface UserType {
  _id?: string
  name: string
  email: string
  password?: string
  image?: string
  emailVerified?: Date
  verificationToken?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  provider?: string
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
  
  interface User extends UserType {}
} 