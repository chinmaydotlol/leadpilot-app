"use client"

import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import { AnimatePresence } from "framer-motion"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SessionProvider refetchOnWindowFocus={false}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        <Toaster 
          richColors 
          position="top-center" 
          theme="dark"
          closeButton
          duration={4000}
          visibleToasts={3}
          style={{
            fontFamily: 'var(--font-geist-sans)',
          }}
        />
      </SessionProvider>
    </ThemeProvider>
  )
} 