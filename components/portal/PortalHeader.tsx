"use client"

import Link from "next/link"
import { useAuth } from "@/lib/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, Home } from "lucide-react"

export function PortalHeader() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300">
      <div className="w-full px-3 pr-5 md:pr-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - matching main navbar but pointing to portal */}
          <Link href="/portal" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">Jobs</span>
              <span className="text-secondary">Fiti</span>
            </span>
          </Link>

          {/* User Menu - matching main navbar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-12 w-12 rounded-full border-2 border-blue-300 hover:border-green-700 hover:bg-blue-200 transition-all p-0 overflow-hidden"
              >
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user.displayName ? user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase() : user.email?.slice(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 z-[100] bg-white shadow-xl border border-slate-100 rounded-xl p-2"
              align="end"
              forceMount
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-lg mb-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-slate-900">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs leading-none text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <div className="px-1">
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-slate-50 my-1 py-2.5">
                  <Link href="/portal" className="flex items-center w-full">
                    <Home className="mr-3 h-4 w-4 text-slate-500" />
                    <span className="font-medium text-slate-700">Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-slate-50 my-1 py-2.5">
                  <Settings className="mr-3 h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-700">Settings</span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="my-2 bg-slate-100" />

              <div className="px-1">
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg py-2.5"
                  onClick={async () => {
                    try {
                      await signOut();
                    } catch (error) {
                      console.error("Error signing out:", error);
                    }
                  }}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
