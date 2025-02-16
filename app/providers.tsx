"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      {children}
      <Toaster richColors position="top-center" />
    </SessionProvider>
  )
} 