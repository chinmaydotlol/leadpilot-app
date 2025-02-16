"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  RiDashboardLine,
  RiUserSearchLine,
  RiMailSendLine,
  RiShareCircleLine,
  RiRobot2Line,
  RiBarChartBoxLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: RiDashboardLine },
  { name: "Lead Management", href: "/dashboard/leads", icon: RiUserSearchLine },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: RiMailSendLine },
  { name: "Multi-Channel", href: "/dashboard/channels", icon: RiShareCircleLine },
  { name: "AI Tools", href: "/dashboard/ai", icon: RiRobot2Line },
  { name: "Analytics", href: "/dashboard/analytics", icon: RiBarChartBoxLine },
  { name: "Settings", href: "/dashboard/settings", icon: RiSettings4Line },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-black/60 border-r border-white/10">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] bg-clip-text text-transparent">
            LeadPilot
          </h1>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors",
                      "hover:bg-white/5",
                      isActive
                        ? "bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 text-[#BDD9BF] font-medium"
                        : "text-gray-400"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive && "text-[#BDD9BF]")} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="absolute right-4 w-1 h-1 rounded-full bg-[#BDD9BF]" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 space-y-4">
          <div className="rounded-xl bg-black/40 p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Email Credits</span>
                  <span className="text-sm text-white">450/500</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-[#BDD9BF] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Lead Slots</span>
                  <span className="text-sm text-white">850/1000</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-[#BDD9BF] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 p-4">
            <p className="text-sm text-gray-400">
              Upgrade to <span className="text-[#BDD9BF] font-medium">Pro</span> for AI features
            </p>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white gap-2"
          >
            <RiLogoutBoxRLine className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  )
} 