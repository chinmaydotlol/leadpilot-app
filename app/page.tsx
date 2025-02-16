"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (session) {
      router.replace("/dashboard")
    } else {
      router.replace("/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#080c08] overflow-hidden">
        <div className="aurora-container">
          <div className="aurora-1"></div>
          <div className="aurora-2"></div>
          <div className="aurora-3"></div>
          <div className="aurora-4"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <div className="w-12 h-12 border-4 border-[#BDD9BF] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    )
  }

  return null
}
