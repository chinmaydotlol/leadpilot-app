import { ReactNode } from "react"
import Sidebar from "@/components/dashboard/Sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080c08] flex">
      <div className="aurora-container fixed inset-0 -z-10">
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>
        <div className="aurora-4"></div>
      </div>
      
      <Sidebar />
      
      <main className="flex-1 pl-64 relative overflow-y-auto">
        <div className="backdrop-blur-xl bg-black/40 min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 