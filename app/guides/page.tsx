'use client';

import Link from "next/link"
import { BookOpen, Briefcase, Zap, Users } from "lucide-react"
import { useSearchParams } from 'next/navigation';

export default function GuidesPage() {
  const searchParams = useSearchParams();
  const guides = [
    {
      id: 1,
      title: "How to Write a Winning Resume",
      icon: BookOpen,
      category: "Career Tips",
      description: "Learn the essential tips to create a resume that stands out to employers.",
      readTime: "8 min",
    },
    {
      id: 2,
      title: "Mastering the Job Interview",
      icon: Briefcase,
      category: "Interview Skills",
      description: "Preparation strategies and common interview questions to help you succeed.",
      readTime: "12 min",
    },
    {
      id: 3,
      title: "Networking for Career Success",
      icon: Users,
      category: "Professional Growth",
      description: "Build meaningful professional connections that can lead to great opportunities.",
      readTime: "10 min",
    },
    {
      id: 4,
      title: "Salary Negotiation Guide",
      icon: Zap,
      category: "Career Tips",
      description: "Discover strategies for negotiating a competitive salary package.",
      readTime: "7 min",
    },
    {
      id: 5,
      title: "Career Transition Planning",
      icon: Briefcase,
      category: "Career Development",
      description: "Step-by-step guide to successfully transition to a new career field.",
      readTime: "15 min",
    },
    {
      id: 6,
      title: "LinkedIn Profile Optimization",
      icon: Users,
      category: "Professional Growth",
      description: "Make your LinkedIn profile a powerful tool for job search success.",
      readTime: "6 min",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Career Guides</h1>
          <p className="text-xl text-blue-100">Expert advice to help you succeed in your career journey</p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="bg-white border border-slate-200 rounded-md p-6 shadow-sm hover:shadow-md hover:border-blue-600 transition-all duration-200 group"
              >
                <Icon className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <p className="text-sm text-blue-600 font-medium mb-2">{guide.category}</p>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{guide.description}</p>
                <p className="text-xs text-slate-500">{guide.readTime} read</p>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
