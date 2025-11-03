"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Key,
  BarChart2,
  Bell,
  Settings,
  Search,
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        )}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">JobHouse</span>
              <Badge variant="secondary" className="text-xs">Admin</Badge>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="md:hidden"
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
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                  {item.name === 'Notifications' && (
                    <Badge className="ml-auto" variant="destructive">
                      3
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Admin User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@jobhouse.com</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-gray-700"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          isCollapsed ? "md:pl-0" : "md:pl-64"
        )}
      >
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:hidden"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 max-w-2xl ml-4">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" 
                aria-hidden="true" 
              />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">View notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500">
                <span className="sr-only">3 unread notifications</span>
              </span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
