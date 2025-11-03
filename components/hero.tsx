"use client"

import type React from "react"

import Link from "next/link"

export default function Hero() {
  const handleScrollToJobs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const jobsSection = document.getElementById("job-listings")
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div
        className="h-[500px] sm:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop')",
        }}
      >
        <div className="relative z-20 h-full flex items-center px-4 sm:px-6 lg:pl-20 max-w-7xl mx-auto">
          <div className="text-white max-w-2xl">
            <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-primary mb-4 sm:mb-6"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Find The Perfect Job That You Deserved
            </h1>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 sm:ml-6">
              Apply Your Best Job Today and take the next step toward a fulfilling career! Explore exciting
              opportunities that match your skills and passion. Don't wait—seize the chance to grow, succeed, and
              achieve your professional dreams. Your future starts with a simple click.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="#job-listings" 
                onClick={handleScrollToJobs} 
                className="btn btn-primary cursor-pointer text-center px-6 py-3 sm:py-2.5 text-sm sm:text-base"
              >
                Find A Job
              </a>
              <Link 
                href="/scholarships" 
                className="btn btn-secondary text-center px-6 py-3 sm:py-2.5 text-sm sm:text-base"
              >
                Scholarships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
