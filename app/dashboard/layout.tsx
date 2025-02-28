"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  LineChart,
  Users,
  Target,
  Settings,
  ChevronLeft,
  User,
} from "lucide-react";
import { CiLogout } from "react-icons/ci";

import { cn } from "@/lib/utils";

interface SidebarLink {
  label: string;
  icon: React.ElementType;
  href?: string; // Logout doesn't need href
  onClick?: () => void; // Add onClick for logout
}

const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Leads",
    icon: Users,
    href: "/dashboard/leads",
  },
  {
    label: "Campaigns",
    icon: Target,
    href: "/dashboard/campaigns",
  },
  {
    label: "Analytics",
    icon: LineChart,
    href: "/dashboard/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Logout",
    icon: CiLogout,
    onClick: () => signOut({ callbackUrl: "/dashboard/settings" }), // Proper logout
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-500 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* logo */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <a href="/dashboard">
            <img src="/img/logo.png" alt="LeadPilot Logo" className="w-24 h-auto" />
          </a>
        </div>

        {/* navigation links */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;

            return link.href ? (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300",
                  isActive ? "bg-secondary" : "hover:bg-secondary/50",
                  "group"
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {!isCollapsed && (
                  <span
                    className={cn(
                      "text-sm font-medium whitespace-nowrap transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.onClick}
                className="flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300 hover:bg-secondary/50 group w-full"
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap text-muted-foreground group-hover:text-foreground">
                    {link.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* user profile */}
        <div className="p-2 border-t border-border">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300",
              pathname === "/dashboard/settings" ? "bg-secondary" : "hover:bg-secondary/50",
              "group"
            )}
          >
            <User
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                pathname === "/dashboard/settings"
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            {!isCollapsed && (
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap transition-colors duration-300",
                  pathname === "/dashboard/settings"
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                Profile
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* main Content */}
      <div className={cn("transition-all duration-500 ease-in-out", isCollapsed ? "ml-16" : "ml-64")}>
        {/* top Navigation */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors duration-300"
          >
            <ChevronLeft
              className={cn("w-4 h-4 transition-transform duration-500 ease-in-out", isCollapsed && "rotate-180")}
            />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Pro Plan</span>
              <span className="mx-2">·</span>
              <span>7,532 / 10,000 leads</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
