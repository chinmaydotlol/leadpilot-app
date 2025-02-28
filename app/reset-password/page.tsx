"use client"

import { useEffect, useState, Suspense } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RiLockPasswordLine } from "react-icons/ri"
import Link from "next/link"
import { toast } from "sonner"
import SpotlightCard from "@/components/ui/spotlight-card"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    const token = searchParams.get("token")
    if (!token) {
      toast.error("Reset token is missing")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password")
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

  useEffect(() => {
    if (!searchParams.get("token")) {
      toast.error("Reset token is missing")
      router.push("/forgot-password")
    }
  }, [searchParams, router])

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
            <p className="text-sm text-muted-foreground">Enter your new password</p>
          </div>

          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
                <Input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 transition-all duration-300"
                  disabled={isLoading}
                  required
                  minLength={6}
                />
              </div>

              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-3.5 text-muted-foreground h-5 w-5" />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Back to Sign in
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
          <div className="w-12 h-12 border-4 border-foreground/20 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
} 