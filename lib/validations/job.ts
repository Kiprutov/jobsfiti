import { z } from 'zod';

// Step 1: Role Selection Schema
export const step1Schema = z.object({
  role: z.enum(['attachment', 'internship', 'graduate', 'junior', 'mid-level', 'senior', 'expert'], {
    required_error: 'Please select a job role',
  }),
});

// Step 2: Category Selection Schema
export const step2Schema = z.object({
  category: z.string().min(2, 'Please select or enter a category'),
});

// Step 3: Basic Information Schema
export const step3Schema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  detailedDescription: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  companyDescription: z.string().optional(),
  companyWebsite: z.string().url('Invalid website URL').optional().or(z.literal('')),
  logo: z.string().optional(),
});

// Step 4: Job Details Schema
export const step4Schema = z.object({
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'temporary', 'volunteer', 'internship']),
  experienceLevel: z.enum(['internship', 'entry', 'associate', 'mid-senior', 'director', 'executive']),
  applicationDeadline: z.string().optional(),
  isRemote: z.boolean(),
  remoteAllowed: z.boolean().optional(),
  workFromHomePolicy: z.string().optional(),
  jobFunction: z.string().optional(),
  industry: z.string().optional(),
});

// Step 5: Compensation Schema
export const step5Schema = z.object({
  salaryRange: z.object({
    min: z.number().min(0, 'Minimum salary must be 0 or greater'),
    max: z.number().min(0, 'Maximum salary must be 0 or greater'),
    currency: z.string(),
    period: z.enum(['hour', 'day', 'week', 'month', 'year']),
    isEstimate: z.boolean(),
  }).refine((data) => data.max >= data.min, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['max'],
  }),
  payout: z.string().optional(),
  bonusPotential: z.string().optional(),
  equityOffered: z.boolean().optional(),
});

// Step 6: Requirements Schema
export const step6Schema = z.object({
  requirements: z.object({
    education: z.array(z.object({
      degree: z.string().optional(),
      fieldOfStudy: z.string().optional(),
      required: z.boolean(),
      id: z.string(),
    })).optional(),
    experience: z.object({
      years: z.string().min(1, 'Years of experience is required'),
      skills: z.array(z.string()).optional(),
      industryExperience: z.array(z.string()).optional(),
    }).optional(),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.object({
      name: z.string(),
      proficiency: z.enum(['basic', 'conversational', 'professional', 'fluent', 'native']),
      required: z.boolean(),
      id: z.string(),
    })).optional(),
    certifications: z.array(z.string()).optional(),
    technicalSkills: z.array(z.string()).optional(),
    softSkills: z.array(z.string()).optional(),
  }),
  requirementsText: z.string().optional(),
  applicationProcess: z.array(z.string()).optional(),
  applicationRequirements: z.array(z.string()).optional(),
  requiredDocuments: z.array(z.string()).optional(),
});

// Step 7: Benefits & Culture Schema
export const step7Schema = z.object({
  benefits: z.object({
    healthInsurance: z.boolean().optional(),
    retirementPlans: z.boolean().optional(),
    paidTimeOff: z.boolean().optional(),
    flexibleHours: z.boolean().optional(),
    remoteWorkOptions: z.boolean().optional(),
    professionalDevelopment: z.boolean().optional(),
    wellnessPrograms: z.boolean().optional(),
    familyBenefits: z.boolean().optional(),
    relocationAssistance: z.boolean().optional(),
    otherBenefits: z.array(z.string()).optional(),
  }).optional(),
  companyCulture: z.object({
    values: z.array(z.string()).optional(),
    workEnvironment: z.string().optional(),
    diversityInclusion: z.string().optional(),
  }).optional(),
});

// Complete Job Schema (for final validation)
export const fullJobSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3),
  description: z.string().min(50),
  detailedDescription: z.string().optional(),
  companyName: z.string().min(2),
  companyDescription: z.string().optional(),
  companyWebsite: z.string().url().optional().or(z.literal('')),
  logo: z.string().optional(),
  role: z.enum(['attachment', 'internship', 'graduate', 'junior', 'mid-level', 'senior', 'expert']),
  category: z.string().min(2),
  subCategory: z.string().optional(),
  jobFunction: z.string().optional(),
  industry: z.string().optional(),
  experienceLevel: z.enum(['internship', 'entry', 'associate', 'mid-senior', 'director', 'executive']),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'temporary', 'volunteer', 'internship']),
  location: z.string().min(2),
  isRemote: z.boolean(),
  remoteAllowed: z.boolean().optional(),
  workFromHomePolicy: z.string().optional(),
  payout: z.string().optional(),
  salaryRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string(),
    period: z.enum(['hour', 'day', 'week', 'month', 'year']),
    isEstimate: z.boolean(),
  }),
  bonusPotential: z.string().optional(),
  equityOffered: z.boolean().optional(),
  link: z.string().url('Invalid application link').optional().or(z.literal('')),
  applicationDeadline: z.string().optional(),
  applicationProcess: z.array(z.string()).optional(),
  applicationRequirements: z.array(z.string()).optional(),
  requiredDocuments: z.array(z.string()).optional(),
  requirements: z.object({
    education: z.array(z.object({
      degree: z.string().optional(),
      fieldOfStudy: z.string().optional(),
      required: z.boolean(),
      id: z.string(),
    })).optional(),
    experience: z.object({
      years: z.string().min(1),
      skills: z.array(z.string()).optional(),
      industryExperience: z.array(z.string()).optional(),
    }).optional(),
    skills: z.array(z.string()).optional(),
    languages: z.array(z.object({
      name: z.string(),
      proficiency: z.enum(['basic', 'conversational', 'professional', 'fluent', 'native']),
      required: z.boolean(),
      id: z.string(),
    })).optional(),
    certifications: z.array(z.string()).optional(),
    technicalSkills: z.array(z.string()).optional(),
    softSkills: z.array(z.string()).optional(),
  }),
  requirementsText: z.string().optional(),
  benefits: z.object({
    healthInsurance: z.boolean().optional(),
    retirementPlans: z.boolean().optional(),
    paidTimeOff: z.boolean().optional(),
    flexibleHours: z.boolean().optional(),
    remoteWorkOptions: z.boolean().optional(),
    professionalDevelopment: z.boolean().optional(),
    wellnessPrograms: z.boolean().optional(),
    familyBenefits: z.boolean().optional(),
    relocationAssistance: z.boolean().optional(),
    otherBenefits: z.array(z.string()).optional(),
  }).optional(),
  companyCulture: z.object({
    values: z.array(z.string()).optional(),
    workEnvironment: z.string().optional(),
    diversityInclusion: z.string().optional(),
  }).optional(),
  isSponsored: z.boolean().optional(),
  sponsoredBy: z.string().optional(),
  datePosted: z.string(),
  startDate: z.string().optional(),
  validThrough: z.string().optional(),
  hiringManager: z.string().optional(),
  status: z.enum(['open', 'closed', 'paused', 'draft']),
  keywords: z.array(z.string()).optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;
export type Step6FormData = z.infer<typeof step6Schema>;
export type Step7FormData = z.infer<typeof step7Schema>;
