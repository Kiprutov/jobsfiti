import Footer from "@/components/footer"
import { Award, BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ScholarshipsPage() {
  const scholarships = [
    {
      title: "Excellence in Tech Scholarship",
      amount: "KES 500,000",
      deadline: "December 15, 2024",
      eligibility: "Tech graduates and professionals",
      description: "Award for outstanding candidates pursuing careers in technology and software development.",
      icon: TrendingUp,
    },
    {
      title: "Women in Leadership Fund",
      amount: "KES 300,000",
      deadline: "December 20, 2024",
      eligibility: "Female professionals in any field",
      description: "Scholarship dedicated to empowering women leaders and supporting their career advancement.",
      icon: Users,
    },
    {
      title: "Sustainable Future Initiative",
      amount: "KES 400,000",
      deadline: "January 10, 2025",
      eligibility: "Environmental and sustainability professionals",
      description: "Support for professionals working on sustainable development and environmental impact.",
      icon: BookOpen,
    },
    {
      title: "Innovation & Entrepreneurship Grant",
      amount: "KES 600,000",
      deadline: "January 15, 2025",
      eligibility: "Entrepreneurs and innovators",
      description: "Funding for talented individuals starting or growing their own business ventures.",
      icon: Award,
    },
    {
      title: "Healthcare Heroes Scholarship",
      amount: "KES 350,000",
      deadline: "January 20, 2025",
      eligibility: "Healthcare and medical professionals",
      description: "Recognition and support for healthcare professionals dedicated to improving health outcomes.",
      icon: TrendingUp,
    },
    {
      title: "Community Impact Scholarship",
      amount: "KES 250,000",
      deadline: "January 25, 2025",
      eligibility: "All professionals committed to community development",
      description: "Supporting professionals who are making a positive impact in their communities.",
      icon: Users,
    },
  ]

  const faq = [
    {
      question: "Who is eligible to apply?",
      answer:
        "Most of our scholarships are open to professionals and recent graduates. Specific eligibility criteria are listed for each scholarship. Some require proof of employment or educational background.",
    },
    {
      question: "How do I apply?",
      answer:
        "Applications are made through our website. Click 'Apply Now' on any scholarship and complete the application form with your details, resume, and supporting documents.",
    },
    {
      question: "When are applications due?",
      answer:
        "Each scholarship has its own deadline as listed. Make sure to submit your application before the deadline to be considered.",
    },
    {
      question: "How will winners be selected?",
      answer:
        "Our selection committee reviews all applications based on merit, academic/professional achievement, impact potential, and alignment with scholarship goals.",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer:
        "Yes, you can apply for multiple scholarships as long as you meet the eligibility requirements for each one.",
    },
    {
      question: "How will I know if I've won?",
      answer:
        "Winners will be notified via email and announced on our website. Notifications are typically sent within 2-3 weeks after the deadline.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">JobsFiti Scholarships</h1>
            <p className="text-xl text-blue-100 mb-0">
              Invest in your future with our educational and career development scholarships
            </p>
          </div>
        </section>

        {/* Scholarships Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Available Scholarships</h2>
            <p className="text-slate-600 text-sm">Browse our current scholarship opportunities and apply today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship, index) => {
            const Icon = scholarship.icon
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center h-32">
                  <Icon className="text-blue-600" size={48} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{scholarship.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-1">{scholarship.amount}</p>
                  <p className="text-sm text-slate-600 mb-4">Deadline: {scholarship.deadline}</p>
                  <p className="text-slate-700 text-sm mb-4">{scholarship.description}</p>
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Eligibility</p>
                    <p className="text-sm text-slate-700">{scholarship.eligibility}</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Choose Our Scholarships */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose JobsFiti Scholarships?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Prestigious Recognition</h3>
              <p className="text-slate-600">
                Our scholarships are recognized by leading employers and educational institutions across Africa.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Comprehensive Support</h3>
              <p className="text-slate-600">
                Beyond funding, we offer mentorship, career guidance, and networking opportunities with industry
                leaders.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Career Growth</h3>
              <p className="text-slate-600">
                Our scholarship programs include job placement assistance and career development resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Scholarship FAQs</h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <details
              key={index}
              className="bg-white border border-slate-200 rounded-lg shadow-sm group hover:shadow-md transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Scroll up to view all available scholarships and submit your application today. Don't miss out on this
            opportunity to invest in your future!
          </p>
          <Link
            href="/scholarships"
            className="inline-block bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            View All Scholarships
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
  )
}
