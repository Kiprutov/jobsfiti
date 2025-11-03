import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const guideContent: Record<number, any> = {
  1: {
    title: "How to Write a Winning Resume",
    category: "Career Tips",
    readTime: "8 min",
    content: `
    <h2>Introduction</h2>
    <p>Your resume is often your first impression with employers. It needs to be clear, concise, and compelling. Follow these tips to create a resume that stands out.</p>

    <h2>1. Choose the Right Format</h2>
    <p>Use a clean, professional format. The chronological format works best for most job seekers, but consider a functional format if you're changing careers.</p>

    <h2>2. Start with a Strong Header</h2>
    <p>Include your name, phone number, email, and location. A LinkedIn URL is a bonus but optional.</p>

    <h2>3. Craft a Compelling Summary</h2>
    <p>A 2-3 line professional summary highlighting your key strengths and career goals can grab attention immediately.</p>

    <h2>4. Highlight Your Experience</h2>
    <p>Use bullet points to describe your accomplishments, not just duties. Quantify results whenever possible.</p>

    <h2>5. Showcase Your Skills</h2>
    <p>Include a dedicated skills section with relevant technical and soft skills aligned to the job description.</p>

    <h2>6. Education Section</h2>
    <p>List your degrees, certifications, and relevant coursework. Include graduation date and GPA if it's 3.5 or above.</p>

    <h2>7. Additional Sections</h2>
    <p>Add volunteer work, publications, languages, or certifications if relevant to the job you're applying for.</p>

    <h2>8. Tailor Your Resume</h2>
    <p>Customize your resume for each job application. Use keywords from the job description to pass through ATS systems.</p>

    <h2>9. Proofread Carefully</h2>
    <p>Spelling and grammar errors can immediately disqualify you. Have someone else review your resume before submitting.</p>

    <h2>10. Keep It Concise</h2>
    <p>One page for entry-level, two pages maximum for experienced professionals. Recruiters spend seconds scanning resumes.</p>

    <h2>Conclusion</h2>
    <p>A winning resume combines clarity, relevance, and compelling storytelling about your professional journey.</p>
    `,
  },
  2: {
    title: "Mastering the Job Interview",
    category: "Interview Skills",
    readTime: "12 min",
    content: `
    <h2>Preparation is Key</h2>
    <p>Research the company thoroughly. Understand their mission, recent news, and products or services. This knowledge will impress interviewers.</p>

    <h2>Common Interview Questions</h2>
    <p>Prepare answers for: "Tell me about yourself," "Why do you want this job?", and "What are your strengths and weaknesses?"</p>

    <h2>The STAR Method</h2>
    <p>Use the Situation, Task, Action, Result method to structure your answers to behavioral questions effectively.</p>

    <h2>Dress for Success</h2>
    <p>Choose professional attire appropriate for the company culture. When in doubt, err on the side of being more formal.</p>

    <h2>Body Language Matters</h2>
    <p>Maintain eye contact, offer a firm handshake, sit up straight, and smile. Your non-verbal communication is crucial.</p>

    <h2>Listen Actively</h2>
    <p>Pay attention to the interviewer's questions and answer them directly. Avoid interrupting or talking too much.</p>

    <h2>Ask Thoughtful Questions</h2>
    <p>Prepare 3-5 questions about the role, team, or company culture. This shows genuine interest.</p>

    <h2>Managing Nervousness</h2>
    <p>Take deep breaths, remember your preparation, and remember that the interviewer wants you to succeed.</p>

    <h2>Follow-Up</h2>
    <p>Send a thank you email within 24 hours, reiterating your interest and key points from the conversation.</p>

    <h2>Conclusion</h2>
    <p>Successful interviews come from thorough preparation, authentic engagement, and clear communication of your value.</p>
    `,
  },
  3: {
    title: "Networking for Career Success",
    category: "Professional Growth",
    readTime: "10 min",
    content: `
    <h2>Why Networking Matters</h2>
    <p>Many jobs are filled through personal connections. Networking opens doors to opportunities you might never find online.</p>

    <h2>Building Your Network</h2>
    <p>Start with people you know. Reconnect with former colleagues, classmates, and mentors. Expand gradually and authentically.</p>

    <h2>Networking Events</h2>
    <p>Attend industry conferences, local meetups, and professional association meetings. These are goldmines for connections.</p>

    <h2>Online Networking</h2>
    <p>Optimize your LinkedIn profile, join industry groups, and participate in relevant online communities.</p>

    <h2>The Art of Conversation</h2>
    <p>Ask open-ended questions, listen more than you talk, and find common ground. Genuine connections matter more than surface interactions.</p>

    <h2>Providing Value</h2>
    <p>Share articles, make introductions, and offer help when possible. Networking is about mutual benefit.</p>

    <h2>Maintaining Relationships</h2>
    <p>Stay in touch with your network through occasional messages, coffee chats, or LinkedIn updates.</p>

    <h2>Informational Interviews</h2>
    <p>Request 15-20 minute coffee chats with professionals in your field to learn about their experiences.</p>

    <h2>Following Up</h2>
    <p>After meeting someone, send a brief follow-up message referencing your conversation and expressing interest in staying connected.</p>

    <h2>Conclusion</h2>
    <p>Strong networks built on genuine relationships are your greatest career asset. Invest in them consistently.</p>
    `,
  },
  4: {
    title: "Salary Negotiation Guide",
    category: "Career Tips",
    readTime: "7 min",
    content: `
    <h2>Know Your Worth</h2>
    <p>Research industry standards using Glassdoor, Payscale, and LinkedIn Salary. Understand your value in the job market.</p>

    <h2>Timing is Everything</h2>
    <p>Negotiate after receiving an offer. This is your strongest position. Don't discuss salary too early in the process.</p>

    <h2>Preparing Your Case</h2>
    <p>Document your achievements, skills, and market research. Come prepared with data, not just feelings.</p>

    <h2>Opening the Conversation</h2>
    <p>Let the employer make the first offer if possible. If asked first, provide a range based on your research.</p>

    <h2>Making Your Counteroffer</h2>
    <p>Be professional and positive. Present your case clearly and ask for what you've researched as fair compensation.</p>

    <h2>Beyond Salary</h2>
    <p>Consider bonuses, stock options, flexible work arrangements, remote work days, or professional development funds.</p>

    <h2>Handling Objections</h2>
    <p>Listen to the employer's concerns. Remain calm and flexible while standing firm on your value.</p>

    <h2>Getting It in Writing</h2>
    <p>Once you've negotiated terms, ensure everything is documented in your offer letter or employment contract.</p>

    <h2>Conclusion</h2>
    <p>Salary negotiation is normal and expected. Approach it professionally to secure fair compensation for your work.</p>
    `,
  },
  5: {
    title: "Career Transition Planning",
    category: "Career Development",
    readTime: "15 min",
    content: `
    <h2>Assess Your Situation</h2>
    <p>Evaluate why you want to transition. Ensure it's for the right reasons, not just escaping a bad situation.</p>

    <h2>Identify Your Target Career</h2>
    <p>Research your desired field thoroughly. Talk to people in that industry to understand the reality of the role.</p>

    <h2>Analyze the Gap</h2>
    <p>List the skills and experience required. Identify what you already have and what you need to develop.</p>

    <h2>Create a Learning Plan</h2>
    <p>Take courses, earn certifications, or pursue additional education relevant to your target career.</p>

    <h2>Gain Experience</h2>
    <p>Volunteer, take on freelance projects, or intern in your new field to build practical experience.</p>

    <h2>Build Your New Network</h2>
    <p>Connect with professionals in your target industry. Attend relevant events and join professional organizations.</p>

    <h2>Update Your Application Materials</h2>
    <p>Tailor your resume to highlight transferable skills. Craft a compelling cover letter explaining your transition.</p>

    <h2>Financial Preparation</h2>
    <p>Plan for potential salary adjustments when changing careers. Save an emergency fund to ease the transition.</p>

    <h2>Timeline and Milestones</h2>
    <p>Create a realistic timeline for your transition. Set clear milestones to track your progress.</p>

    <h2>Staying Committed</h2>
    <p>Career transitions take time. Stay focused on your goals and be patient with the process.</p>

    <h2>Conclusion</h2>
    <p>A successful career transition requires planning, learning, networking, and persistence. You can make the change.</p>
    `,
  },
  6: {
    title: "LinkedIn Profile Optimization",
    category: "Professional Growth",
    readTime: "6 min",
    content: `
    <h2>Complete Your Profile</h2>
    <p>Fill out every section. Recruiters often search for complete profiles. Missing sections reduce your visibility.</p>

    <h2>Professional Photo</h2>
    <p>Use a high-quality, professional headshot against a neutral background. A good photo can increase profile views by 21x.</p>

    <h2>Compelling Headline</h2>
    <p>Don't just list your job title. Create a headline that includes keywords and summarizes your value proposition.</p>

    <h2>Powerful Summary</h2>
    <p>Write a 3-5 paragraph professional summary. Use keywords relevant to your industry and tell your career story.</p>

    <h2>Detailed Experience Descriptions</h2>
    <p>Don't just list job duties. Highlight achievements, metrics, and impact. Use keywords naturally throughout.</p>

    <h2>Endorsements and Recommendations</h2>
    <p>Ask colleagues for recommendations and endorse their skills. This adds credibility to your profile.</p>

    <h2>Stay Active</h2>
    <p>Share relevant content, comment on posts, and engage with your network. Active profiles appear higher in searches.</p>

    <h2>Keywords Matter</h2>
    <p>Use industry-specific keywords throughout your profile. This improves your visibility in recruiter searches.</p>

    <h2>Customize Your URL</h2>
    <p>Change your LinkedIn URL to include your name. Make it professional and easy to share.</p>

    <h2>Conclusion</h2>
    <p>An optimized LinkedIn profile is your digital resume. Invest in making it visible and compelling.</p>
    `,
  },
}

export default function GuidePage({ params }: { params: { id: string } }) {
  const guide = guideContent[Number.parseInt(params.id)]

  if (!guide) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="w-full px-3 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Guide not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="w-full px-3 py-12">
        <div className="max-w-3xl">
          <Link href="/guides" className="flex items-center gap-2 text-primary mb-6 hover:underline">
            <ArrowLeft size={18} />
            Back to Guides
          </Link>

          <div className="mb-8">
            <p className="text-primary font-semibold mb-2">{guide.category}</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{guide.title}</h1>
            <p className="text-slate-600">{guide.readTime} read</p>
          </div>

          <div
            className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
