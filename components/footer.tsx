import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">Jobs</span>
              <span className="text-secondary">Fiti</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Find your dream job with JobsFiti. We connect talented individuals with top employers.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-primary">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-gray-400 hover:text-primary">
                  Portal
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-gray-400 hover:text-primary">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Job Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs/remote" className="text-gray-400 hover:text-primary">
                  Remote Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/full-time" className="text-gray-400 hover:text-primary">
                  Full-Time Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/part-time" className="text-gray-400 hover:text-primary">
                  Part-Time Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/freelance" className="text-gray-400 hover:text-primary">
                  Freelance Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@jobfiti.com</li>
              <li>Phone: +254701899724</li>
              <li>Address: 272-30200 Kitale, Kenya</li>
              <li>Office: Kitale, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} JobsFiti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
