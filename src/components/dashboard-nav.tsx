"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  BarChart3, 
  AlertTriangle,
  Settings,
  LogOut
} from "lucide-react"

const items = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Tickets", icon: Ticket, href: "/dashboard/tickets" },
  { label: "Customers", icon: Users, href: "/dashboard/customers" },
  { label: "Escalations", icon: AlertTriangle, href: "/dashboard/escalations" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-sidebar h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-headline font-bold text-xl">
            O
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">OmniFTE</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href 
                ? "bg-primary text-white" 
                : "text-muted-foreground hover:bg-accent hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          onClick={() => window.location.href = '/'}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
