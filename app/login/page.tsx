"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import Link from "next/link"
import { toast } from "sonner"
import SpotlightCard from "@/components/ui/spotlight-card"

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(result.error)
        return
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong, Please check your credentials and try again")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="aurora-container">
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>
        <div className="aurora-4"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        <SpotlightCard className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-12 rounded-lg hover:bg-secondary/80 transition-all duration-300"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 transition-all duration-300"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 transition-all duration-300"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}
