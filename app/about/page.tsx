import { CheckCircle2, Mail, Phone, GraduationCap, Code, Award, MapPin, Linkedin } from "lucide-react"
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
              <div key={index} className="bg-white rounded-md p-6 border border-slate-200">
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
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Founder</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Passionate about making job search better for everyone, combining technology expertise with a commitment to connecting talented professionals with meaningful career opportunities.
            </p>
          </div>
          
          <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-40 h-40 bg-white rounded-md flex items-center justify-center">
                    <span className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent">VR</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-md p-2 border border-slate-200">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                
                {/* Header Info */}
                <div className="flex-1 text-center md:text-left text-white">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <h3 className="text-3xl font-bold">Victor Rotich</h3>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      <span className="font-semibold">Software Developer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Bsc. Computer Science</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Contact Information</h4>
                  
                  <a 
                    href="mailto:kiprutovictor@gmail.com" 
                    className="group flex items-center gap-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-md border border-slate-200 hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="p-3 bg-blue-100 group-hover:bg-blue-200 rounded-md transition-colors">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 mb-1">Email</p>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        kiprutovictor@gmail.com
                      </p>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+254701899724" 
                    className="group flex items-center gap-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-md border border-slate-200 hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="p-3 bg-blue-100 group-hover:bg-blue-200 rounded-md transition-colors">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 mb-1">Phone</p>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        +254 701 899 724
                      </p>
                    </div>
                  </a>
                </div>
                
                {/* Professional Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Professional Details</h4>
                  
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-md">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Education</p>
                        <p className="text-sm font-semibold text-slate-900">Bachelor of Science</p>
                        <p className="text-sm text-slate-700">Computer Science</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-md border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-200 rounded-md">
                        <Code className="h-5 w-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Role</p>
                        <p className="text-sm font-semibold text-slate-900">Software Developer</p>
                        <p className="text-sm text-slate-600">Full-Stack Development</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
