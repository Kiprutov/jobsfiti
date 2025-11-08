import { CheckCircle2 } from "lucide-react"
import { OurStoryCarousel } from "@/components/our-story-carousel"

export default function AboutPage() {
  const values = [
    {
      title: "Transparency",
      description: "We believe in honest job listings and clear communication about opportunities.",
    },
    {
      title: "Accessibility",
      description: "Job opportunities should be accessible to everyone, regardless of background.",
    },
    {
      title: "Growth",
      description: "We help both job seekers and employers grow and succeed together.",
    },
    {
      title: "Innovation",
      description: "We continuously improve our platform to serve you better.",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Job Seekers" },
    { number: "2000+", label: "Job Listings" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About JobsFiti</h1>
          <p className="text-xl text-blue-100">Connecting talented professionals with their dream opportunities</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              JobsFiti exists to bridge the gap between talented professionals and meaningful career opportunities. We
              believe that everyone deserves access to high-quality job listings and the support to succeed in their
              career journey.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Since our founding, we've helped thousands of job seekers find their perfect role and empowered employers
              to discover exceptional talent. Our commitment to transparency and excellence drives everything we do.
            </p>
          </div>
          <OurStoryCarousel />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-md p-6 shadow-sm">
                <CheckCircle2 className="text-blue-600 mb-4" size={32} />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Dedicated Team</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Our team consists of experienced professionals from recruitment, technology, and business backgrounds. We're
            passionate about making job search better for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-md p-6 shadow-sm text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-900">Team Member {i}</h3>
                <p className="text-slate-600 text-sm mt-1">Lead Professional</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
