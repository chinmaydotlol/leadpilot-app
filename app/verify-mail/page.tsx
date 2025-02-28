"use client"

import { useEffect, useState, Suspense } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import SpotlightCard from "@/components/ui/spotlight-card"

function VerifyMailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      
      if (!token) {
        toast.error("Verification token is missing")
        router.push("/login")
        return
      }

      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Verification failed")
        }

        setIsVerified(true)
        toast.success(data.message)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Verification failed")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
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
            {isLoading ? (
              <>
                <h1 className="text-2xl font-semibold">
                  Verifying Your Email
                </h1>
                <div className="flex justify-center mt-4">
                  <div className="w-12 h-12 border-4 border-foreground/20 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : isVerified ? (
              <>
                <h1 className="text-2xl font-semibold">
                  Email Verified!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Redirecting you to login...
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold">
                  Verification Failed
                </h1>
                <p className="text-sm text-muted-foreground">
                  Please try again or contact support.
                </p>
                <div className="mt-4">
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    Back to Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}

export default function VerifyMail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
          <div className="w-12 h-12 border-4 border-foreground/20 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <VerifyMailForm />
    </Suspense>
  )
} 