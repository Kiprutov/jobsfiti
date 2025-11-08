"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Key,
  BarChart2,
  Menu,
  X,
  LogOut,
  FileText as FileTextIcon
} from "lucide-react"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Roles', href: '/admin/roles', icon: Key },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
    { name: 'Reports', href: '/admin/reports', icon: FileTextIcon },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out shadow-xl",
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        )}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">JobsFiti</span>
              <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-200">Admin</Badge>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Admin User" />
                <AvatarFallback className="bg-slate-700 text-slate-200">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@jobsfiti.com</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Button (Floating) */}
      {isCollapsed && (
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="fixed bottom-4 left-4 z-50 md:hidden h-12 w-12 rounded-full shadow-lg bg-slate-900 hover:bg-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          isCollapsed ? "md:pl-0" : "md:pl-64"
        )}
      >
        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
