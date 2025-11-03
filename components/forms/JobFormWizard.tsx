"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Trash2, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { JobFormData, initialFormData } from "./JobForm"
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  fullJobSchema,
} from "@/lib/validations/job"
import { useToast } from "@/hooks/use-toast"

interface JobFormWizardProps {
  initialData?: Partial<JobFormData>
  onSave: (data: JobFormData) => Promise<void> | void
  onCancel: () => void
  isSubmitting?: boolean
}

const STEPS = [
  { number: 1, title: "Role", description: "Select job role" },
  { number: 2, title: "Category", description: "Select category" },
  { number: 3, title: "Basic Info", description: "Job details" },
  { number: 4, title: "Details", description: "Job specifics" },
  { number: 5, title: "Compensation", description: "Salary & benefits" },
  { number: 6, title: "Requirements", description: "Skills & education" },
  { number: 7, title: "Benefits", description: "Perks & culture" },
  { number: 8, title: "Review", description: "Review & submit" },
]

const ROLES = [
  { id: "attachment", label: "Attachment" },
  { id: "internship", label: "Internship" },
  { id: "graduate", label: "Graduate" },
  { id: "junior", label: "Junior Role" },
  { id: "mid-level", label: "Mid-Level Role" },
  { id: "senior", label: "Senior Role" },
  { id: "expert", label: "Expert Role" },
]

const CATEGORIES = [
  { id: "tech", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "business", label: "Business" },
  { id: "retail", label: "Retail" },
  { id: "logistics", label: "Logistics" },
  { id: "other", label: "Other" },
]

export function JobFormWizard({ initialData, onSave, onCancel, isSubmitting = false }: JobFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<JobFormData>>({
    ...initialFormData,
    ...(initialData || {}),
    id: initialData?.id || 0,
  })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { toast } = useToast()

  // Validation schemas for each step
  const stepValidators = [
    () => step1Schema.safeParse({ role: formData.role }),
    () => step2Schema.safeParse({ category: formData.category }),
    () => step3Schema.safeParse(formData),
    () => step4Schema.safeParse(formData),
    () => step5Schema.safeParse(formData),
    () => step6Schema.safeParse(formData),
    () => step7Schema.safeParse(formData),
  ]

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      // Validate current step
      const validator = stepValidators[currentStep - 1]
      if (validator) {
        const result = validator()
        if (!result.success) {
          toast({
            title: "Validation Error",
            description: result.error.errors[0]?.message || "Please complete all required fields",
            variant: "destructive",
          })
          return
        }
      }

      // Mark step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }

      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Final validation
    const result = fullJobSchema.safeParse({
      ...formData,
      datePosted: formData.datePosted || new Date().toISOString().split('T')[0],
      status: formData.status || "draft",
    })

    if (!result.success) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      await onSave(result.data as JobFormData)
      toast({
        title: "Success",
        description: "Job saved successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save job",
        variant: "destructive",
      })
    }
  }

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  // Step 1: Role Selection
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Job Role</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose the primary role classification for this job posting. This determines how the job will be categorized.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLES.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => updateFormData({ role: role.id })}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              formData.role === role.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">{role.label}</div>
          </button>
        ))}
      </div>
    </div>
  )

  // Step 2: Category Selection
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Category</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose the industry category for this job posting.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => updateFormData({ category: category.id })}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              formData.category === category.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">{category.label}</div>
          </button>
        ))}
      </div>
    </div>
  )

  // Step 3: Basic Information
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
        <p className="text-sm text-gray-600 mb-6">
          Provide essential details about the job and company.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="e.g. Senior Frontend Developer"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName || ""}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            placeholder="e.g. Tech Solutions Inc."
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location || ""}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="e.g. Nairobi, Kenya"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Provide a clear and detailed description of the job..."
            rows={6}
            required
          />
          <p className="text-xs text-gray-500">Minimum 50 characters required</p>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="detailedDescription">Detailed Description</Label>
          <Textarea
            id="detailedDescription"
            value={formData.detailedDescription || ""}
            onChange={(e) => updateFormData({ detailedDescription: e.target.value })}
            placeholder="Additional detailed information about the role..."
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            type="url"
            value={formData.companyWebsite || ""}
            onChange={(e) => updateFormData({ companyWebsite: e.target.value })}
            placeholder="https://company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">Company Logo URL</Label>
          <Input
            id="logo"
            type="url"
            value={formData.logo || ""}
            onChange={(e) => updateFormData({ logo: e.target.value })}
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>
    </div>
  )

  // Step 4: Job Details
  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Job Details</h3>
        <p className="text-sm text-gray-600 mb-6">
          Specify employment type, experience level, and remote work options.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type *</Label>
          <Select
            value={formData.employmentType || "full-time"}
            onValueChange={(value) => updateFormData({ employmentType: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level *</Label>
          <Select
            value={formData.experienceLevel || "mid-senior"}
            onValueChange={(value) => updateFormData({ experienceLevel: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="associate">Associate</SelectItem>
              <SelectItem value="mid-senior">Mid-Senior</SelectItem>
              <SelectItem value="director">Director</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicationDeadline">Application Deadline</Label>
          <Input
            id="applicationDeadline"
            type="date"
            value={formData.applicationDeadline || ""}
            onChange={(e) => updateFormData({ applicationDeadline: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry || ""}
            onChange={(e) => updateFormData({ industry: e.target.value })}
            placeholder="e.g. Information Technology"
          />
        </div>
        <div className="space-y-4 md:col-span-2 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isRemote"
              checked={formData.isRemote || false}
              onCheckedChange={(checked) => updateFormData({ isRemote: !!checked })}
            />
            <Label htmlFor="isRemote">This is a remote position</Label>
          </div>
          {formData.isRemote && (
            <div className="pl-6 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remoteAllowed"
                  checked={formData.remoteAllowed ?? true}
                  onCheckedChange={(checked) => updateFormData({ remoteAllowed: !!checked })}
                />
                <Label htmlFor="remoteAllowed">Remote work allowed</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workFromHomePolicy">Work From Home Policy</Label>
                <Textarea
                  id="workFromHomePolicy"
                  value={formData.workFromHomePolicy || ""}
                  onChange={(e) => updateFormData({ workFromHomePolicy: e.target.value })}
                  placeholder="Describe the work from home policy..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Step 5: Compensation
  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Compensation</h3>
        <p className="text-sm text-gray-600 mb-6">
          Provide salary information and compensation details.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salaryMin">Minimum Salary</Label>
            <Input
              id="salaryMin"
              type="number"
              value={formData.salaryRange?.min || 0}
              onChange={(e) =>
                updateFormData({
                  salaryRange: {
                    ...formData.salaryRange!,
                    min: Number(e.target.value) || 0,
                  },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryMax">Maximum Salary</Label>
            <Input
              id="salaryMax"
              type="number"
              value={formData.salaryRange?.max || 0}
              onChange={(e) =>
                updateFormData({
                  salaryRange: {
                    ...formData.salaryRange!,
                    max: Number(e.target.value) || 0,
                  },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.salaryRange?.currency || "USD"}
              onValueChange={(value) =>
                updateFormData({
                  salaryRange: {
                    ...formData.salaryRange!,
                    currency: value,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="KES">KES (KSh)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Select
              value={formData.salaryRange?.period || "year"}
              onValueChange={(value) =>
                updateFormData({
                  salaryRange: {
                    ...formData.salaryRange!,
                    period: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hour">Per Hour</SelectItem>
                <SelectItem value="day">Per Day</SelectItem>
                <SelectItem value="week">Per Week</SelectItem>
                <SelectItem value="month">Per Month</SelectItem>
                <SelectItem value="year">Per Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isEstimate"
            checked={formData.salaryRange?.isEstimate ?? true}
            onCheckedChange={(checked) =>
              updateFormData({
                salaryRange: {
                  ...formData.salaryRange!,
                  isEstimate: !!checked,
                },
              })
            }
          />
          <Label htmlFor="isEstimate">Salary is an estimate</Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bonusPotential">Bonus Potential</Label>
            <Input
              id="bonusPotential"
              value={formData.bonusPotential || ""}
              onChange={(e) => updateFormData({ bonusPotential: e.target.value })}
              placeholder="e.g. Performance-based bonus"
            />
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="equityOffered"
              checked={formData.equityOffered || false}
              onCheckedChange={(checked) => updateFormData({ equityOffered: !!checked })}
            />
            <Label htmlFor="equityOffered">Equity Offered</Label>
          </div>
        </div>
      </div>
    </div>
  )

  // Step 6: Requirements
  const renderStep6 = () => {
    const addEducationRequirement = () => {
      const newEdu = {
        degree: "",
        fieldOfStudy: "",
        required: false,
        id: Date.now().toString(),
      }
      updateFormData({
        requirements: {
          ...formData.requirements!,
          education: [...(formData.requirements?.education || []), newEdu],
        },
      })
    }

    const updateEducationRequirement = (index: number, field: string, value: any) => {
      const updatedEducation = [...(formData.requirements?.education || [])]
      updatedEducation[index] = { ...updatedEducation[index], [field]: value }
      updateFormData({
        requirements: {
          ...formData.requirements!,
          education: updatedEducation,
        },
      })
    }

    const removeEducationRequirement = (index: number) => {
      const updatedEducation = [...(formData.requirements?.education || [])]
      updatedEducation.splice(index, 1)
      updateFormData({
        requirements: {
          ...formData.requirements!,
          education: updatedEducation,
        },
      })
    }

    const addSkill = (skillType: 'technicalSkills' | 'softSkills', skill: string) => {
      const currentSkills = formData.requirements?.[skillType] || []
      updateFormData({
        requirements: {
          ...formData.requirements!,
          [skillType]: [...currentSkills, skill],
        },
      })
    }

    const removeSkill = (skillType: 'technicalSkills' | 'softSkills', index: number) => {
      const currentSkills = [...(formData.requirements?.[skillType] || [])]
      currentSkills.splice(index, 1)
      updateFormData({
        requirements: {
          ...formData.requirements!,
          [skillType]: currentSkills,
        },
      })
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Job Requirements</h3>
          <p className="text-sm text-gray-600 mb-6">
            Specify education, experience, and skill requirements.
          </p>
        </div>

        {/* Education Requirements */}
        <div className="space-y-4">
          <h4 className="font-medium">Education Requirements</h4>
          {(formData.requirements?.education || []).map((edu, index) => (
            <div key={edu.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree || ""}
                  onChange={(e) => updateEducationRequirement(index, 'degree', e.target.value)}
                  placeholder="e.g., Bachelor's"
                />
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.fieldOfStudy || ""}
                  onChange={(e) => updateEducationRequirement(index, 'fieldOfStudy', e.target.value)}
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={edu.required}
                    onCheckedChange={(checked) => updateEducationRequirement(index, 'required', checked)}
                  />
                  <Label>Required</Label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducationRequirement(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addEducationRequirement}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education Requirement
          </Button>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h4 className="font-medium">Experience</h4>
          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Input
              type="number"
              value={formData.requirements?.experience?.years || 0}
              onChange={(e) =>
                updateFormData({
                  requirements: {
                    ...formData.requirements!,
                    experience: {
                      ...formData.requirements?.experience!,
                      years: Number(e.target.value) || 0,
                    },
                  },
                })
              }
              min="0"
              placeholder="e.g., 5"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h4 className="font-medium">Technical Skills</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {(formData.requirements?.technicalSkills || []).map((skill, index) => (
              <div key={index} className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill('technicalSkills', index)}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Add technical skill (press Enter)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                e.preventDefault()
                addSkill('technicalSkills', e.currentTarget.value.trim())
                e.currentTarget.value = ''
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Soft Skills</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {(formData.requirements?.softSkills || []).map((skill, index) => (
              <div key={index} className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill('softSkills', index)}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Add soft skill (press Enter)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                e.preventDefault()
                addSkill('softSkills', e.currentTarget.value.trim())
                e.currentTarget.value = ''
              }
            }}
          />
        </div>
      </div>
    )
  }

  // Step 7: Benefits & Culture
  const renderStep7 = () => {
    const addOtherBenefit = (benefit: string) => {
      const currentBenefits = formData.benefits?.otherBenefits || []
      updateFormData({
        benefits: {
          ...formData.benefits!,
          otherBenefits: [...currentBenefits, benefit],
        },
      })
    }

    const removeOtherBenefit = (index: number) => {
      const currentBenefits = [...(formData.benefits?.otherBenefits || [])]
      currentBenefits.splice(index, 1)
      updateFormData({
        benefits: {
          ...formData.benefits!,
          otherBenefits: currentBenefits,
        },
      })
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Benefits & Company Culture</h3>
          <p className="text-sm text-gray-600 mb-6">
            Select benefits and describe company culture.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Standard Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'healthInsurance', label: 'Health Insurance' },
              { key: 'retirementPlans', label: 'Retirement Plans' },
              { key: 'paidTimeOff', label: 'Paid Time Off' },
              { key: 'flexibleHours', label: 'Flexible Hours' },
              { key: 'remoteWorkOptions', label: 'Remote Work Options' },
              { key: 'professionalDevelopment', label: 'Professional Development' },
              { key: 'wellnessPrograms', label: 'Wellness Programs' },
              { key: 'familyBenefits', label: 'Family Benefits' },
              { key: 'relocationAssistance', label: 'Relocation Assistance' },
            ].map((benefit) => (
              <div key={benefit.key} className="flex items-center space-x-2">
                <Checkbox
                  id={benefit.key}
                  checked={formData.benefits?.[benefit.key as keyof typeof formData.benefits] || false}
                  onCheckedChange={(checked) =>
                    updateFormData({
                      benefits: {
                        ...formData.benefits!,
                        [benefit.key]: !!checked,
                      },
                    })
                  }
                />
                <Label htmlFor={benefit.key}>{benefit.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Additional Benefits</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {(formData.benefits?.otherBenefits || []).map((benefit, index) => (
              <div key={index} className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
                {benefit}
                <button
                  type="button"
                  onClick={() => removeOtherBenefit(index)}
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Add custom benefit (press Enter)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                e.preventDefault()
                addOtherBenefit(e.currentTarget.value.trim())
                e.currentTarget.value = ''
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Company Culture</h4>
          <div className="space-y-2">
            <Label htmlFor="workEnvironment">Work Environment</Label>
            <Textarea
              id="workEnvironment"
              value={formData.companyCulture?.workEnvironment || ""}
              onChange={(e) =>
                updateFormData({
                  companyCulture: {
                    ...formData.companyCulture!,
                    workEnvironment: e.target.value,
                  },
                })
              }
              placeholder="Describe the work environment..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diversityInclusion">Diversity & Inclusion</Label>
            <Textarea
              id="diversityInclusion"
              value={formData.companyCulture?.diversityInclusion || ""}
              onChange={(e) =>
                updateFormData({
                  companyCulture: {
                    ...formData.companyCulture!,
                    diversityInclusion: e.target.value,
                  },
                })
              }
              placeholder="Describe diversity and inclusion initiatives..."
              rows={3}
            />
          </div>
        </div>
      </div>
    )
  }

  // Step 8: Review
  const renderStep8 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review & Submit</h3>
        <p className="text-sm text-gray-600 mb-6">
          Please review all information before submitting.
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Title:</span> {formData.title || "N/A"}
            </div>
            <div>
              <span className="font-medium">Company:</span> {formData.companyName || "N/A"}
            </div>
            <div>
              <span className="font-medium">Role:</span> {ROLES.find((r) => r.id === formData.role)?.label || "N/A"}
            </div>
            <div>
              <span className="font-medium">Category:</span> {CATEGORIES.find((c) => c.id === formData.category)?.label || "N/A"}
            </div>
            <div>
              <span className="font-medium">Location:</span> {formData.location || "N/A"}
            </div>
            <div>
              <span className="font-medium">Employment Type:</span> {formData.employmentType || "N/A"}
            </div>
            <div>
              <span className="font-medium">Experience Level:</span> {formData.experienceLevel || "N/A"}
            </div>
          </CardContent>
        </Card>

        {formData.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{formData.description}</p>
            </CardContent>
          </Card>
        )}

        {formData.salaryRange && (formData.salaryRange.min > 0 || formData.salaryRange.max > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {formData.salaryRange.currency} {formData.salaryRange.min} - {formData.salaryRange.max} per {formData.salaryRange.period}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      case 6:
        return renderStep6()
      case 7:
        return renderStep7()
      case 8:
        return renderStep8()
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{initialData?.id ? "Edit Job" : "Create New Job"}</CardTitle>
          <CardDescription>
            Complete all steps to {initialData?.id ? 'update' : 'create'} a job listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator
              steps={STEPS}
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>

          {/* Current Step Content */}
          <div className="min-h-[400px]">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onCancel : handleBack}
              disabled={isSubmitting}
            >
              {currentStep === 1 ? (
                "Cancel"
              ) : (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              )}
            </Button>

            <div className="flex gap-2">
              {currentStep < STEPS.length ? (
                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : initialData?.id ? "Update Job" : "Create Job"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

