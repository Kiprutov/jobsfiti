export interface JobOffer {
  // Core Information
  id: number
  title: string
  description: string
  detailedDescription?: string
  companyName: string
  companyDescription?: string
  companyWebsite?: string
  logo?: string
  
  // Job Details
  role: string
  category: string
  subCategory?: string
  jobFunction?: string
  industry?: string
  experienceLevel: "internship" | "entry" | "associate" | "mid-senior" | "director" | "executive"
  employmentType: "full-time" | "part-time" | "contract" | "temporary" | "volunteer" | "internship"
  
  // Location
  location: string
  isRemote?: boolean
  remoteAllowed?: boolean
  workFromHomePolicy?: string
  
  // Compensation
  payout: string
  salaryRange?: {
    min: number
    max: number
    currency: string
    period: "hour" | "day" | "week" | "month" | "year"
    isEstimate?: boolean
  }
  bonusPotential?: string
  equityOffered?: boolean
  
  // Application
  link: string
  applicationDeadline?: string
  applicationProcess?: string[]
  applicationRequirements?: string[]
  requiredDocuments?: string[]
  
  // Requirements
  requirements: {
    education?: {
      degree?: string
      fieldOfStudy?: string
      required: boolean
    }[]
    experience?: {
      years: number
      skills: string[]
      industryExperience?: string[]
    }
    skills: string[]
    languages?: {
      name: string
      proficiency: "basic" | "conversational" | "professional" | "fluent" | "native"
      required: boolean
    }[]
    certifications?: string[]
    technicalSkills?: string[]
    softSkills?: string[]
  }
  
  // Benefits & Perks
  benefits?: {
    healthInsurance?: boolean
    retirementPlans?: boolean
    paidTimeOff?: boolean
    flexibleHours?: boolean
    remoteWorkOptions?: boolean
    professionalDevelopment?: boolean
    wellnessPrograms?: boolean
    familyBenefits?: boolean
    relocationAssistance?: boolean
    otherBenefits?: string[]
  }
  
  // Company Culture
  companyCulture?: {
    values?: string[]
    workEnvironment?: string
    diversityInclusion?: string
  }
  
  // Additional Metadata
  isSponsored?: boolean
  sponsoredBy?: string
  datePosted: string
  startDate?: string
  validThrough?: string
  hiringManager?: string
  
  // Status
  status: "open" | "closed" | "paused" | "draft"
  
  // SEO & Visibility
  keywords?: string[]
  
  // Legacy fields (kept for backward compatibility)
  type?: string
  deadline?: string
  process?: string[]
  category?: string
  role?: string
  sponsored?: string
}

export const jobOffers: JobOffer[] = [
  {
    id: 3732,
    title: "Frontend Developer",
    description: "Join our team as a Frontend Developer to build amazing user experiences.",
    detailedDescription: "We are looking for a skilled Frontend Developer to join our growing team. You will be responsible for building user interfaces and implementing features using modern web technologies. The ideal candidate is passionate about creating responsive and accessible web applications.",
    companyName: "Adir Technologies",
    companyDescription: "Adir Technologies is a leading software development company specializing in enterprise solutions.",
    companyWebsite: "https://adir-tech.com",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=80&auto=format&fit=crop",
    
    // Job Details
    role: "Frontend Developer",
    category: "Technology",
    subCategory: "Software Development",
    jobFunction: "Engineering",
    industry: "Information Technology & Services",
    experienceLevel: "mid-senior",
    employmentType: "full-time",
    
    // Location
    location: "New York, NY, USA",
    isRemote: false,
    remoteAllowed: true,
    workFromHomePolicy: "Hybrid (3 days in office, 2 days remote)",
    
    // Compensation
    payout: "$18 + $2 Fixed",
    salaryRange: {
      min: 90000,
      max: 120000,
      currency: "USD",
      period: "year",
      isEstimate: true
    },
    bonusPotential: "Up to 15% annual bonus",
    equityOffered: true,
    
    // Application
    link: "https://desmaff.com/clsc/to-97222p-6302",
    applicationDeadline: "2025-12-31",
    applicationProcess: [
      "Submit Application", 
      "Initial Screening Call", 
      "Technical Assessment", 
      "Technical Interview",
      "Team Interview",
      "Final Decision"
    ],
    applicationRequirements: [
      "Resume/CV",
      "Portfolio/Code Samples",
      "Cover Letter (Optional)"
    ],
    
    // Requirements
    requirements: {
      education: [
        {
          degree: "Bachelor's",
          fieldOfStudy: "Computer Science or related field",
          required: true
        }
      ],
      experience: {
        years: 3,
        skills: ["React", "TypeScript", "Redux"],
        industryExperience: ["SaaS", "Enterprise Software"]
      },
      skills: [
        "JavaScript (ES6+)",
        "React.js",
        "TypeScript",
        "Redux/Context API",
        "HTML5/CSS3",
        "Responsive Design",
        "RESTful APIs",
        "Git"
      ],
      languages: [
        {
          name: "English",
          proficiency: "professional",
          required: true
        }
      ],
      technicalSkills: [
        "Webpack",
        "Jest/Testing Library",
        "GraphQL",
        "Node.js"
      ],
      softSkills: [
        "Problem Solving",
        "Team Collaboration",
        "Communication",
        "Time Management"
      ]
    },
    
    // Benefits & Perks
    benefits: {
      healthInsurance: true,
      retirementPlans: true,
      paidTimeOff: true,
      flexibleHours: true,
      remoteWorkOptions: true,
      professionalDevelopment: true,
      wellnessPrograms: true,
      familyBenefits: true,
      relocationAssistance: true,
      otherBenefits: [
        "Stock Options",
        "Annual Conference Budget",
        "Home Office Stipend"
      ]
    },
    
    // Company Culture
    companyCulture: {
      values: ["Innovation", "Collaboration", "Transparency", "Continuous Learning"],
      workEnvironment: "Agile, collaborative, and fast-paced environment with a focus on work-life balance.",
      diversityInclusion: "We are committed to creating an inclusive environment for all employees and celebrate diversity in all its forms."
    },
    
    // Additional Metadata
    isSponsored: true,
    sponsoredBy: "Adir Technologies",
    datePosted: "2025-10-15",
    startDate: "2026-01-15",
    validThrough: "2025-12-31",
    hiringManager: "Sarah Johnson",
    
    // Status
    status: "open",
    
    // SEO & Visibility
    keywords: ["frontend", "react", "typescript", "developer", "remote", "new york"],
    
    // Legacy fields (for backward compatibility)
    type: "Full Time",
    deadline: "December 31, 2025",
    process: ["Submit Application", "Phone Interview", "Technical Assessment", "Final Interview"],
    requirements: [
      "3+ years of experience with React and TypeScript",
      "Strong understanding of modern JavaScript",
      "Experience with state management solutions (Redux, Context API)",
      "Bachelor's degree in Computer Science or related field"
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health benefits",
      "Flexible work arrangements",
      "Professional development budget"
    ],
    category: "Technology",
    role: "mid-level"
  },
  {
    id: 3731,
    title: "OnlyGretaJobs - Walmart - (US)",
    description: "Get your job at Walmart now! Connect on Valid Email submit.",
    payout: "$18",
    link: "https://desmaff.com/clsc/to-5721&p=6322",
    location: "Multiple Locations, USA",
    type: "Full Time",
    category: "retail",
    role: "attachment",
    logo: "https://corporate.walmart.com/content/dam/corporate/images/logos/walmart-logo.svg",
    sponsored: "Walmart Group",
    deadline: "January 15, 2026",
    process: ["Online Application", "Assessment", "Store Interview"],
    requirements: ["18+ years old", "Customer service experience preferred", "Flexible schedule"],
    benefits: ["Competitive Wages", "Health Benefits", "Employee Discounts", "Career Growth"],
  },
  {
    id: 3730,
    title: "OnlyGretaJobs - Pepsi - (J05)",
    description: "Get your job at Pepsi now! Connect on Valid Email submit.",
    payout: "$18 + $2 Fixed",
    link: "https://desmaff.com/clsc/to-3728/apr5822",
    location: "Chicago, USA",
    type: "Full Time",
    category: "business",
    role: "mid-level",
    logo: "https://images.unsplash.com/photo-1629203432180-71e9b18d855a?q=80&w=80&auto=format&fit=crop",
    deadline: "December 15, 2025",
    process: ["Submit Resume", "Phone Screening", "In-person Interview", "Background Check"],
    requirements: ["Bachelor's degree", "2+ years experience", "Strong communication skills"],
    benefits: ["Competitive Salary", "Health & Wellness", "Retirement Plan", "Tuition Reimbursement"],
  },
  {
    id: 3734,
    title: "Hyperhxcomables - Medical Jobs - (US)",
    description: "Sign up and find medical jobs! Connect on Valid Email submit.",
    payout: "$18 + $2 Fixed",
    link: "https://desmaff.com/cisci/o-97245p+6302",
    location: "Boston, USA",
    type: "Part Time",
    category: "healthcare",
    role: "senior",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=80&auto=format&fit=crop",
    deadline: "January 10, 2026",
    process: ["Application", "Medical Screening", "Interview", "Certification Verification"],
    requirements: ["Medical License", "CPR Certification", "Healthcare experience"],
    benefits: ["Flexible Hours", "Medical Benefits", "Continuing Education", "Shift Differentials"],
  },
  {
    id: 3729,
    title: "OnlyGestables - Food Taste - (US)",
    description: "Get your job as a food taster! Convert on Valid Email submit.",
    payout: "$18",
    link: "https://desmaff.com/cist/to-5725kg-c532",
    location: "Los Angeles, USA",
    type: "Contract",
    category: "other",
    role: "internship",
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=80&auto=format&fit=crop",
    deadline: "December 20, 2025",
    process: ["Submit Application", "Taste Test", "Interview"],
    requirements: ["Refined palate", "Attention to detail", "Written communication skills"],
    benefits: ["Flexible Schedule", "Free Samples", "Travel Opportunities"],
  },
  {
    id: 3735,
    title: "Hyperhxcomables - Nurse Jobs - (US)",
    description: "Sign up and find nurse jobs! Connect on Valid Email submit.",
    payout: "$18 + $2 Fixed",
    link: "https://desmaff.com/clsc/to-57258p+5822",
    location: "Miami, USA",
    type: "Full Time",
    category: "healthcare",
    role: "senior",
    logo: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=80&auto=format&fit=crop",
    deadline: "January 5, 2026",
    process: ["Application", "Nursing License Verification", "Clinical Interview", "Background Check"],
    requirements: ["RN License", "BLS Certification", "2+ years nursing experience"],
    benefits: ["Competitive Salary", "Health Insurance", "Shift Bonuses", "Tuition Assistance"],
  },
  {
    id: 3788,
    title: "Higherhocomolubia - Work From Home - (US)",
    description: "Sign up and start working from home!",
    payout: "$18",
    link: "https://dreamsfit.com/click?c=275&lg=6322",
    location: "Remote, USA",
    type: "Remote",
    category: "tech",
    role: "internship",
    logo: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?q=80&w=80&auto=format&fit=crop",
    deadline: "December 25, 2025",
    process: ["Online Application", "Video Interview", "Skills Assessment"],
    requirements: ["Reliable internet", "Quiet workspace", "Self-motivated"],
    benefits: ["Work from Home", "Flexible Hours", "No Commute", "Equipment Provided"],
  },
  {
    id: 3728,
    title: "OnlyGestables - UPS - (US)",
    description: "Sign up and get your UPS job! Convert on Valid Email submit.",
    payout: "$52",
    link: "https://dreamoff.com/cdcK/o=3728&e=6362",
    location: "Dallas, USA",
    type: "Full Time",
    category: "logistics",
    role: "junior",
    logo: "https://images.unsplash.com/photo-1586818079715-23011105e8b8?q=80&w=80&auto=format&fit=crop",
    deadline: "January 20, 2026",
    process: ["Application", "Physical Assessment", "Interview", "Drug Test"],
    requirements: ["Valid Driver's License", "Clean driving record", "Physical fitness"],
    benefits: ["Competitive Pay", "Health Benefits", "Retirement Plan", "Advancement Opportunities"],
  },
  {
    id: 3733,
    title: "HigherhocmeAids - Other Jobs - (US)",
    description: "Sign up and start working as a direct Connect on Valid Email submit.",
    payout: "$18 + $2 Fixed",
    link: "https://desmaff.com/clsc/to-57235p-0502",
    location: "Seattle, USA",
    type: "Part Time",
    category: "retail",
    role: "graduate",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=80&auto=format&fit=crop",
    deadline: "December 28, 2025",
    process: ["Submit Application", "Phone Interview", "In-person Meeting"],
    requirements: ["High School Diploma", "Customer service skills", "Availability"],
    benefits: ["Flexible Schedule", "Training Provided", "Team Environment"],
  },
  {
    id: 3736,
    title: "FedEx Job",
    description:
      "Join our team at FedEx and be part of a global delivery network. Great benefits and career growth opportunities.",
    payout: "$200 - $500",
    link: "/apply/fedex",
    location: "New York, USA",
    type: "Part Time",
    category: "logistics",
    role: "expert",
    logo: "https://www.fedex.com/content/dam/fedex-com/logos/logo.png",
    sponsored: "FedEx Group",
    deadline: "January 30, 2026",
    process: ["Online Application", "Background Check", "Interview", "Orientation"],
    requirements: ["Valid ID", "18+ years old", "Reliable transportation"],
    benefits: ["Competitive Wages", "Health Insurance", "Employee Discounts", "Tuition Reimbursement"],
  },
]
