"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")
  const isAuthRoute = pathname === "/auth"
  const isPortalRoute = pathname?.startsWith("/portal")

  return (
    <>
      {!isAdminRoute && !isPortalRoute && <Navbar />}
      <main className={isAuthRoute ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isAdminRoute && !isAuthRoute && !isPortalRoute && <Footer />}
    </>
  )
}

