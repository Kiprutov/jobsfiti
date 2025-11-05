export interface JobOffer {
  // Core Information
  id: number | string;
  title: string;
  description: string;
  detailedDescription?: string;
  companyName: string;
  companyDescription?: string;
  companyWebsite?: string;
  logo?: string;
  
  // Job Details
  role: string;
  category: string;
  subCategory?: string;
  jobFunction?: string;
  industry?: string;
  experienceLevel: "internship" | "entry" | "associate" | "mid-senior" | "director" | "executive";
  employmentType: "full-time" | "part-time" | "contract" | "temporary" | "volunteer" | "internship";
  
  // Location
  location: string;
  isRemote?: boolean;
  remoteAllowed?: boolean;
  workFromHomePolicy?: string;
  
  // Compensation
  payout: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
    period: "hour" | "day" | "week" | "month" | "year";
    isEstimate?: boolean;
  };
  bonusPotential?: string;
  equityOffered?: boolean;
  
  // Application
  link: string;
  applicationDeadline?: string;
  applicationProcess?: string[];
  applicationRequirements?: string[];
  requiredDocuments?: string[];
  
  // Requirements
  requirements: {
    education?: {
      degree?: string;
      fieldOfStudy?: string;
      required: boolean;
    }[];
    experience?: {
      years: number;
      skills: string[];
      industryExperience?: string[];
    };
    skills: string[];
    languages?: {
      name: string;
      proficiency: 'basic' | 'conversational' | 'professional' | 'native';
      required?: boolean;
    }[];
    technicalSkills?: string[];
    softSkills?: string[];
    certifications?: string[];
  };
  
  // Benefits & Perks
  benefits: {
    healthInsurance?: boolean;
    retirementPlans?: boolean;
    paidTimeOff?: boolean;
    flexibleHours?: boolean;
    remoteWorkOptions?: boolean;
    professionalDevelopment?: boolean;
    wellnessPrograms?: boolean;
    familyBenefits?: boolean;
    relocationAssistance?: boolean;
    otherBenefits?: string[];
  };
  
  // Company Culture
  companyCulture?: {
    values?: string[];
    workEnvironment?: string;
    diversityInclusion?: string;
  };
  
  // Additional Metadata
  isSponsored?: boolean;
  sponsoredBy?: string;
  datePosted: string;
  startDate?: string;
  validThrough?: string;
  hiringManager?: string;
  
  // Status
  status: "open" | "closed" | "paused" | "draft";
  
  // SEO & Visibility
  keywords?: string[];
  
  // Legacy fields (kept for backward compatibility)
  type?: string;
  deadline?: string;
  process?: string[];
  sponsored?: string;
}

// Empty array as we're using Firebase Firestore for job offers
export const jobOffers: JobOffer[] = [];
