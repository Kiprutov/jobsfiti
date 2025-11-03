"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { jobOffers } from "@/data/job-offers"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isJobsOpen, setIsJobsOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)

  const roleStats = {
    attachment: jobOffers.filter((j) => j.role === "attachment").length,
    internship: jobOffers.filter((j) => j.role === "internship").length,
    graduate: jobOffers.filter((j) => j.role === "graduate").length,
    junior: jobOffers.filter((j) => j.role === "junior").length,
    "mid-level": jobOffers.filter((j) => j.role === "mid-level").length,
    senior: jobOffers.filter((j) => j.role === "senior").length,
    expert: jobOffers.filter((j) => j.role === "expert").length,
  }

  const roleOptions = [
    { id: "attachment", label: "Attachment" },
    { id: "internship", label: "Internship" },
    { id: "graduate", label: "Graduate" },
    { id: "junior", label: "Junior Role" },
    { id: "mid-level", label: "Mid-Level Role" },
    { id: "senior", label: "Senior Role" },
    { id: "expert", label: "Expert Role" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="w-full px-3">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              JobFiti
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md"
            >
              About
            </Link>

            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md flex items-center gap-2">
                Jobs
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link
                  href="/jobs"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors font-medium border-b border-slate-100"
                >
                  Browse All Jobs
                </Link>
                {roleOptions.map((role) => (
                  <Link
                    key={role.id}
                    href={`/jobs?role=${role.id}`}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
                  >
                    <span className="flex justify-between items-center">
                      <span>{role.label}</span>
                      <span className="text-xs text-slate-500">{roleStats[role.id as keyof typeof roleStats]}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md flex items-center gap-2">
                Resources
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link
                  href="/guides"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
                >
                  Career Guides
                </Link>
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/scholarships"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
                >
                  Scholarships
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </div>

            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md"
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-3 py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Jobs Dropdown */}
            <div>
              <button
                className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-between"
                onClick={() => setIsJobsOpen(!isJobsOpen)}
              >
                Jobs
                <ChevronDown size={16} className={`transition-transform ${isJobsOpen ? "rotate-180" : ""}`} />
              </button>
              {isJobsOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    href="/jobs"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary rounded-md transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse All Jobs
                  </Link>
                  {roleOptions.map((role) => (
                    <Link
                      key={role.id}
                      href={`/jobs?role=${role.id}`}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex justify-between items-center">
                        <span>{role.label}</span>
                        <span className="text-xs text-slate-500">{roleStats[role.id as keyof typeof roleStats]}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Pages Dropdown */}
            <div>
              <button
                className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors flex items-center justify-between"
                onClick={() => setIsPagesOpen(!isPagesOpen)}
              >
                Resources
                <ChevronDown size={16} className={`transition-transform ${isPagesOpen ? "rotate-180" : ""}`} />
              </button>
              {isPagesOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    href="/guides"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Career Guides
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/scholarships"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Scholarships
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
