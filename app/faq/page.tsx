import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I create an account on JobsFiti?",
      answer:
        "Simply click the Sign Up button on our homepage, enter your email and password, and fill in your basic profile information. You can start applying to jobs immediately.",
    },
    {
      question: "Is there a fee to apply for jobs?",
      answer:
        "No, JobsFiti is completely free for job seekers. You can browse and apply to all our listings without any charges.",
    },
    {
      question: "How often are new jobs posted?",
      answer:
        "We update our job listings daily with new opportunities from top employers. We recommend checking back regularly or enabling job alerts.",
    },
    {
      question: "Can I save jobs for later?",
      answer:
        "Yes, you can save jobs to your favorites list by clicking the bookmark icon. You can view your saved jobs anytime in your profile.",
    },
    {
      question: "How do I get support if I have issues?",
      answer:
        "You can reach our support team through the Contact page, via email at support@jobfiti.com, or through our live chat available 24/7.",
    },
    {
      question: "What if I'm scammed or encounter a fake job?",
      answer:
        "Please report suspicious listings immediately through our report button. We take fraud seriously and investigate all reports promptly.",
    },
    {
      question: "Can employers contact me directly?",
      answer:
        "When you apply for a job, employers may contact you using the information provided in your application. We never share your data without permission.",
    },
    {
      question: "How can I track my applications?",
      answer:
        "Visit your dashboard to see the status of all your applications, rejections, and interview invitations in one place.",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100">Find answers to common questions about JobsFiti</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white border border-slate-200 rounded-md shadow-sm group hover:shadow-md transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <ChevronDown className="text-slate-400 group-open:rotate-180 transition-transform" size={20} />
              </summary>
              <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-8 mt-12 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Didn't find your answer?</h3>
          <p className="text-slate-600 mb-4">
            Our support team is here to help. Don't hesitate to reach out with any other questions.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
