"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import Link from "next/link"
import { toast } from "sonner"
import SpotlightCard from "@/components/ui/spotlight-card"

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      toast.success(data.message)
      router.push("/login")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
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
            <h1 className="text-2xl font-semibold">Create an Account</h1>
            <p className="text-sm text-muted-foreground">Sign up to get started</p>
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
                <HiOutlineUser className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 pl-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 transition-all duration-300"
                  disabled={isLoading}
                  required
                  minLength={2}
                />
              </div>

              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pl-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 transition-all duration-300"
                  disabled={isLoading}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}
