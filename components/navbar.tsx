"use client"

import { jobOffers } from "@/data/job-offers";
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const roleStats = {
    attachment: jobOffers.filter((j) => j.role === "attachment").length,
    internship: jobOffers.filter((j) => j.role === "internship").length,
    graduate: jobOffers.filter((j) => j.role === "graduate").length,
    junior: jobOffers.filter((j) => j.role === "junior").length,
    "mid-level": jobOffers.filter((j) => j.role === "mid-level").length,
    senior: jobOffers.filter((j) => j.role === "senior").length,
    expert: jobOffers.filter((j) => j.role === "expert").length,
  };

  const roleOptions = [
    { id: "attachment", label: "Attachment" },
    { id: "internship", label: "Internship" },
    { id: "graduate", label: "Graduate" },
    { id: "junior", label: "Junior Role" },
    { id: "mid-level", label: "Mid-Level Role" },
    { id: "senior", label: "Senior Role" },
    { id: "expert", label: "Expert Role" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="w-full px-3 pr-5 md:pr-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">Jobs</span>
              <span className="text-secondary">Fiti</span>
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
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
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
                      <span className="text-xs text-slate-500">
                        {roleStats[role.id as keyof typeof roleStats]}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 hover:bg-slate-50 rounded-md flex items-center gap-2">
                Resources
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
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

            {/* Auth Section */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} />
                          <AvatarFallback>
                            {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/portal" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>My Portal</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600"
                        onClick={async () => {
                          try {
                            await signOut();
                          } catch (error) {
                            console.error("Error signing out:", error);
                          }
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/auth">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth">
                      <Button size="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
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
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isJobsOpen ? "rotate-180" : ""
                  }`}
                />
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
                        <span className="text-xs text-slate-500">
                          {roleStats[role.id as keyof typeof roleStats]}
                        </span>
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
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isPagesOpen ? "rotate-180" : ""
                  }`}
                />
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
          </div>
        </div>
      )}
    </nav>
  );
}
