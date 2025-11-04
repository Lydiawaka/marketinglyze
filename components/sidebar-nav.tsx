"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Mail, Settings, LogOut, Home, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/tools", label: "Email Tools", icon: Mail },
    { href: "/dashboard/campaigns", label: "Campaigns", icon: FileText },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
          <span className="text-sm font-bold text-white">M</span>
        </div>
        <span className="font-bold text-foreground">Marketinglyse</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 border-t border-border pt-4">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  )
}
