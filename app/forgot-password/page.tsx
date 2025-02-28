"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HiOutlineMail } from "react-icons/hi"
import Link from "next/link"
import { toast } from "sonner"
import SpotlightCard from "@/components/ui/spotlight-card"

export default function ForgotPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email")
      }

      toast.success(data.message)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <p className="text-sm text-muted-foreground">Enter your email to receive reset instructions</p>
          </div>

          <div className="space-y-4">
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

              <Button
                type="submit"
                className="w-full h-12 bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
} 