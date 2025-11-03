'use client';

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"

import { useSearchParams } from 'next/navigation';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Skills Employers Look for in 2025",
      excerpt:
        "Discover the most in-demand skills that can accelerate your career growth and make you stand out in the job market.",
      author: "Sarah Johnson",
      date: "January 15, 2025",
      readTime: "8 min",
      category: "Career Tips",
      image: "/career-skills-2025.jpg",
    },
    {
      id: 2,
      title: "Remote Work: Best Practices for Success",
      excerpt:
        "Learn how to thrive working from home with these proven strategies for productivity and work-life balance.",
      author: "Mike Chen",
      date: "January 10, 2025",
      readTime: "10 min",
      category: "Work Culture",
      image: "/remote-work-setup.png",
    },
    {
      id: 3,
      title: "Career Pivoting: Making the Transition Smoothly",
      excerpt: "Planning a career change? Here's your complete guide to transitioning successfully to a new industry.",
      author: "Emily Rodriguez",
      date: "January 5, 2025",
      readTime: "12 min",
      category: "Career Development",
      image: "/career-transition.jpg",
    },
    {
      id: 4,
      title: "Salary Negotiation: Know Your Worth",
      excerpt:
        "Master the art of salary negotiation with our comprehensive guide to getting the compensation you deserve.",
      author: "David Park",
      date: "December 28, 2024",
      readTime: "9 min",
      category: "Career Tips",
      image: "/salary-negotiation-meeting.png",
    },
    {
      id: 5,
      title: "AI and Automation: Preparing for the Future of Work",
      excerpt: "Understand how AI is reshaping the workplace and what you need to know to stay competitive.",
      author: "Lisa Thompson",
      date: "December 20, 2024",
      readTime: "11 min",
      category: "Future of Work",
      image: "/ai-workplace-automation.jpg",
    },
    {
      id: 6,
      title: "Building Your Professional Network in 2025",
      excerpt:
        "Strategic networking is more important than ever. Learn how to build meaningful professional connections.",
      author: "James Wilson",
      date: "December 15, 2024",
      readTime: "7 min",
      category: "Networking",
      image: "/professional-networking.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="w-full px-3">
            <h1 className="text-4xl font-bold mb-4">JobsFiti Blog</h1>
            <p className="text-xl text-opacity-90">Expert insights and career advice to help you succeed</p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="w-full px-3 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="bg-white border border-slate-200 rounded-md overflow-hidden hover:shadow-sm transition-shadow duration-200 group"
              >
                <div className="overflow-hidden h-48 bg-slate-200">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{post.category}</p>
                <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{post.author}</span>
                  <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
    </div>
  )
}
