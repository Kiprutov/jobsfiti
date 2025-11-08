import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ScrollHandler from "@/components/ScrollHandler"
import ConditionalLayout from "@/components/ConditionalLayout"
import { Toaster } from "@/components/ui/toaster"
import SearchParamsProvider from "@/components/SearchParamsWrapper"
import { AuthProvider } from "@/lib/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "JobsFiti - Find Your Perfect Job",
  description: "Discover exciting job opportunities that match your skills and passion.",
  generator: "v0.app",
  other: {
    'format-detection': 'telephone=no,date=no,email=no,address=no',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SearchParamsProvider>
            <ScrollHandler />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <Toaster />
          </SearchParamsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
