import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Clock, User, Calendar } from "lucide-react"

const blogContent: Record<number, any> = {
  1: {
    title: "Top 10 Skills Employers Look for in 2025",
    author: "Sarah Johnson",
    date: "January 15, 2025",
    readTime: "8 min",
    category: "Career Tips",
    image: "/career-skills-2025.jpg",
    content: `
    <h2>Introduction</h2>
    <p>The job market in 2025 is evolving rapidly. Employers are no longer just looking for technical expertise; they want well-rounded professionals who can adapt to change.</p>

    <h2>1. Artificial Intelligence and Machine Learning</h2>
    <p>Understanding AI and ML basics is becoming essential across industries. You don't need to be a data scientist, but familiarity with these technologies is a significant advantage.</p>

    <h2>2. Critical Thinking and Problem-Solving</h2>
    <p>As automation handles routine tasks, employers increasingly value employees who can think critically and solve complex problems creatively.</p>

    <h2>3. Emotional Intelligence</h2>
    <p>The ability to understand and manage emotions—your own and others'—is crucial for leadership and teamwork in modern workplaces.</p>

    <h2>4. Digital Literacy</h2>
    <p>Beyond basic computer skills, employers expect proficiency with various digital tools, cloud platforms, and collaborative software.</p>

    <h2>5. Adaptability and Learning Agility</h2>
    <p>The pace of change demands professionals who can quickly learn new skills and adapt to evolving job requirements.</p>

    <h2>6. Communication Skills</h2>
    <p>Clear communication across multiple platforms—written, verbal, and visual—remains one of the most valuable skills in the workplace.</p>

    <h2>7. Data Literacy</h2>
    <p>Understanding how to interpret and work with data is increasingly important, even in non-technical roles.</p>

    <h2>8. Cybersecurity Awareness</h2>
    <p>With remote work and cyber threats on the rise, basic cybersecurity knowledge is essential for all employees.</p>

    <h2>9. Sustainability Knowledge</h2>
    <p>Environmental consciousness and sustainable practices are now integral to many organizations' missions and operations.</p>

    <h2>10. Collaboration and Teamwork</h2>
    <p>In an increasingly distributed and diverse workplace, the ability to collaborate effectively across teams and cultures is invaluable.</p>

    <h2>Conclusion</h2>
    <p>The skills employers seek continue to evolve. Focus on continuous learning and developing a diverse skill set that combines technical and soft skills for maximum career growth.</p>
    `,
  },
  2: {
    title: "Remote Work: Best Practices for Success",
    author: "Mike Chen",
    date: "January 10, 2025",
    readTime: "10 min",
    category: "Work Culture",
    image: "/remote-work-setup.png",
    content: `
    <h2>The New Normal of Remote Work</h2>
    <p>Remote work has transitioned from a novelty to a permanent fixture in many industries. Success requires intentional strategies and habits.</p>

    <h2>Creating Your Workspace</h2>
    <p>Your home office environment significantly impacts productivity. Invest in ergonomic furniture, proper lighting, and minimal distractions.</p>

    <h2>Establishing Routines</h2>
    <p>Structure your day with clear start and end times. This helps maintain work-life boundaries and prevents burnout.</p>

    <h2>Communication is Key</h2>
    <p>Over-communicate when working remotely. Use clear email subjects, regular check-ins, and leverage synchronous and asynchronous communication tools.</p>

    <h2>Managing Time Effectively</h2>
    <p>Use time-blocking techniques, take regular breaks, and use productivity tools to stay on track and maintain focus.</p>

    <h2>Building Team Connection</h2>
    <p>Schedule virtual coffee chats, participate in online team activities, and make an effort to build relationships with colleagues.</p>

    <h2>Staying Healthy</h2>
    <p>Take care of your physical and mental health. Exercise regularly, maintain proper posture, and don't neglect your well-being.</p>

    <h2>Professional Development</h2>
    <p>Use the flexibility of remote work to invest in learning. Take courses, attend webinars, and stay current in your field.</p>

    <h2>Conclusion</h2>
    <p>Remote work success comes from discipline, clear communication, and a commitment to maintaining professional standards while enjoying flexibility.</p>
    `,
  },
  3: {
    title: "Career Pivoting: Making the Transition Smoothly",
    author: "Emily Rodriguez",
    date: "January 5, 2025",
    readTime: "12 min",
    category: "Career Development",
    image: "/career-transition.jpg",
    content: `
    <h2>Why People Pivot Their Careers</h2>
    <p>Career changes are increasingly common. Whether driven by passion, market changes, or personal circumstances, a successful pivot requires strategic planning.</p>

    <h2>Step 1: Self-Assessment</h2>
    <p>Evaluate your skills, interests, and values. Identify transferable skills from your current role that will benefit your new career.</p>

    <h2>Step 2: Market Research</h2>
    <p>Thoroughly research your target industry. Understand job requirements, salary expectations, and growth opportunities.</p>

    <h2>Step 3: Skill Development</h2>
    <p>Identify gaps in your skillset and invest in targeted learning. Online courses, certifications, and bootcamps can accelerate your transition.</p>

    <h2>Step 4: Building Your Network</h2>
    <p>Connect with professionals in your target field. Informational interviews can provide valuable insights and potential opportunities.</p>

    <h2>Step 5: Gaining Experience</h2>
    <p>Consider volunteer work, internships, or freelance projects to gain practical experience in your new field.</p>

    <h2>Step 6: Updating Your Application Materials</h2>
    <p>Tailor your resume and cover letter to highlight relevant skills and explain your career transition strategically.</p>

    <h2>Step 7: Managing the Transition</h2>
    <p>Consider the timing of your transition. It may be wise to maintain your current role while preparing for the change.</p>

    <h2>Conclusion</h2>
    <p>Career pivoting is an achievable goal with proper planning and commitment. Stay focused on your goals and be patient with the process.</p>
    `,
  },
  4: {
    title: "Salary Negotiation: Know Your Worth",
    author: "David Park",
    date: "December 28, 2024",
    readTime: "9 min",
    category: "Career Tips",
    image: "/salary-negotiation-meeting.png",
    content: `
    <h2>Understanding Your Value</h2>
    <p>Before negotiating, research industry standards, company benchmarks, and your specific role's market value.</p>

    <h2>Preparation is Everything</h2>
    <p>Document your accomplishments, track your contributions, and prepare concrete examples of your value.</p>

    <h2>Timing Your Negotiation</h2>
    <p>The best time to negotiate is during the offer stage or during performance reviews. Know when to initiate these conversations.</p>

    <h2>Tactics for Successful Negotiation</h2>
    <p>Start with your research-backed number, listen actively to the employer's constraints, and explore non-monetary benefits.</p>

    <h2>Handling Objections</h2>
    <p>Prepare responses to common objections. Remember, negotiation is a conversation, not confrontation.</p>

    <h2>Beyond Base Salary</h2>
    <p>Consider bonuses, stock options, flexible working arrangements, professional development funds, and other benefits.</p>

    <h2>Closing the Deal</h2>
    <p>Get final offers in writing and ensure all agreed-upon terms are documented.</p>

    <h2>Conclusion</h2>
    <p>Salary negotiation is a normal part of employment. Approach it professionally and confidently to secure fair compensation.</p>
    `,
  },
  5: {
    title: "AI and Automation: Preparing for the Future of Work",
    author: "Lisa Thompson",
    date: "December 20, 2024",
    readTime: "11 min",
    category: "Future of Work",
    image: "/ai-workplace-automation.jpg",
    content: `
    <h2>The AI Revolution in the Workplace</h2>
    <p>Artificial intelligence and automation are reshaping job roles across industries. Rather than fear, embrace adaptation.</p>

    <h2>Jobs Being Transformed</h2>
    <p>Routine, repetitive tasks are being automated. Jobs that combine human judgment with AI-enhanced tools are in high demand.</p>

    <h2>Skills for the AI Era</h2>
    <p>Focus on skills that AI cannot replicate: creativity, emotional intelligence, complex problem-solving, and strategic thinking.</p>

    <h2>Continuous Learning</h2>
    <p>Stay updated with AI trends, learn basic AI literacy, and understand how AI tools can enhance your work.</p>

    <h2>Ethical Considerations</h2>
    <p>Understanding AI ethics and responsible AI usage is becoming increasingly important across all sectors.</p>

    <h2>Upskilling Strategies</h2>
    <p>Take courses in AI-adjacent fields, learn data literacy, and develop expertise in emerging technologies.</p>

    <h2>Preparing Your Career</h2>
    <p>Assess your current role's automation risk and proactively develop skills that will remain valuable in an AI-driven world.</p>

    <h2>Conclusion</h2>
    <p>The future of work will be shaped by those who can work alongside AI effectively. Invest in your growth and adaptability today.</p>
    `,
  },
  6: {
    title: "Building Your Professional Network in 2025",
    author: "James Wilson",
    date: "December 15, 2024",
    readTime: "7 min",
    category: "Networking",
    image: "/professional-networking.png",
    content: `
    <h2>Why Networking Matters</h2>
    <p>Professional networks open doors to opportunities, knowledge, and support. Relationships often matter more than resumes.</p>

    <h2>Strategic Networking Approaches</h2>
    <p>Be intentional about who you connect with. Focus on building genuine relationships rather than collecting contacts.</p>

    <h2>Online Networking</h2>
    <p>Leverage LinkedIn, industry forums, and online communities to build your professional presence and connect with peers.</p>

    <h2>In-Person Networking</h2>
    <p>Attend industry conferences, local meetups, and professional association events to build face-to-face relationships.</p>

    <h2>Informational Interviews</h2>
    <p>Request informational interviews with professionals in your field. This is a low-pressure way to learn and build connections.</p>

    <h2>Maintaining Relationships</h2>
    <p>Follow up regularly, offer value, and stay in touch with your network. Relationships require ongoing effort.</p>

    <h2>Giving Back</h2>
    <p>Mentor others, share knowledge, and help your network when you can. Reciprocal support strengthens relationships.</p>

    <h2>Conclusion</h2>
    <p>Strong professional relationships are investments that pay dividends throughout your career. Start building today.</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogContent[Number.parseInt(params.id)]

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="w-full px-3 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Featured Image */}
      <div className="w-full h-96 bg-slate-200 overflow-hidden">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <article className="w-full px-3 py-12">
        <div className="max-w-3xl">
          <div className="mb-8">
            <p className="text-primary font-semibold mb-2">{post.category}</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime} read
              </span>
            </div>
          </div>

          <div
            className="prose prose-sm max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <Footer />
    </main>
  )
}
