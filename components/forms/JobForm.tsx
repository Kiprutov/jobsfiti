"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, X } from "lucide-react"

type ExperienceLevel = "internship" | "entry" | "associate" | "mid-senior" | "director" | "executive"
type EmploymentType = "full-time" | "part-time" | "contract" | "temporary" | "volunteer" | "internship"
type ProficiencyLevel = "basic" | "conversational" | "professional" | "fluent" | "native"

interface EducationRequirement {
  degree: string
  fieldOfStudy: string
  required: boolean
  id: string
}

interface LanguageRequirement {
  name: string
  proficiency: ProficiencyLevel
  required: boolean
  id: string
}

export interface JobFormData {
  // Core Information
  id: number
  title: string
  description: string
  detailedDescription: string
  companyName: string
  companyDescription: string
  companyWebsite: string
  logo: string
  
  // Job Details
  role: string
  category: string
  subCategory: string
  jobFunction: string
  industry: string
  experienceLevel: ExperienceLevel
  employmentType: EmploymentType
  
  // Location
  location: string
  isRemote: boolean
  remoteAllowed: boolean
  workFromHomePolicy: string
  
  // Compensation
  payout: string
  salaryRange: {
    min: number
    max: number
    currency: string
    period: "hour" | "day" | "week" | "month" | "year"
    isEstimate: boolean
  }
  bonusPotential: string
  equityOffered: boolean
  
  // Application
  link: string
  applicationDeadline: string
  applicationProcess: string[]
  applicationRequirements: string[]
  requiredDocuments: string[]
  
  // Requirements
  requirements: {
    education: EducationRequirement[]
    experience: {
      years: number
      skills: string[]
      industryExperience: string[]
    }
    skills: string[]
    languages: LanguageRequirement[]
    certifications: string[]
    technicalSkills: string[]
    softSkills: string[]
  }
  
  // Benefits & Perks
  benefits: {
    healthInsurance: boolean
    retirementPlans: boolean
    paidTimeOff: boolean
    flexibleHours: boolean
    remoteWorkOptions: boolean
    professionalDevelopment: boolean
    wellnessPrograms: boolean
    familyBenefits: boolean
    relocationAssistance: boolean
    otherBenefits: string[]
  }
  
  // Company Culture
  companyCulture: {
    values: string[]
    workEnvironment: string
    diversityInclusion: string
  }
  
  // Additional Metadata
  isSponsored: boolean
  sponsoredBy: string
  datePosted: string
  startDate: string
  validThrough: string
  hiringManager: string
  status: "open" | "closed" | "paused" | "draft"
  keywords: string[]
}

interface JobFormProps {
  initialData?: Partial<JobFormData>
  onSave: (data: JobFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export const initialFormData: JobFormData = {
  // Core Information
  title: "",
  description: "",
  detailedDescription: "",
  companyName: "",
  companyDescription: "",
  companyWebsite: "",
  logo: "",
  
  // Job Details
  role: "",
  category: "",
  subCategory: "",
  jobFunction: "",
  industry: "",
  experienceLevel: "mid-senior",
  employmentType: "full-time",
  
  // Location
  location: "",
  isRemote: false,
  remoteAllowed: true,
  workFromHomePolicy: "",
  
  // Compensation
  payout: "",
  salaryRange: {
    min: 0,
    max: 0,
    currency: "USD",
    period: "year",
    isEstimate: true
  },
  bonusPotential: "",
  equityOffered: false,
  
  // Application
  link: "",
  applicationDeadline: "",
  applicationProcess: [],
  applicationRequirements: [],
  requiredDocuments: [],
  
  // Requirements
  requirements: {
    education: [{ degree: "", fieldOfStudy: "", required: true, id: Date.now().toString() }],
    experience: { years: 0, skills: [], industryExperience: [] },
    skills: [],
    languages: [],
    certifications: [],
    technicalSkills: [],
    softSkills: []
  },
  
  // Benefits & Perks
  benefits: {
    healthInsurance: false,
    retirementPlans: false,
    paidTimeOff: false,
    flexibleHours: false,
    remoteWorkOptions: false,
    professionalDevelopment: false,
    wellnessPrograms: false,
    familyBenefits: false,
    relocationAssistance: false,
    otherBenefits: []
  },
  
  // Company Culture
  companyCulture: {
    values: [],
    workEnvironment: "",
    diversityInclusion: ""
  },
  
  // Additional Metadata
  isSponsored: false,
  sponsoredBy: "",
  datePosted: new Date().toISOString().split('T')[0],
  startDate: "",
  validThrough: "",
  hiringManager: "",
  status: "draft",
  keywords: []
}

export function JobForm({ initialData, onSave, onCancel, isSubmitting = false }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    ...initialFormData,
    ...(initialData || { id: 0 }) // Provide default id if not present
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Education requirements handlers
  const addEducationRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        education: [
          ...(prev.requirements.education || []),
          {
            id: Date.now().toString(),
            degree: '',
            fieldOfStudy: '',
            required: false
          }
        ]
      }
    }));
  };

  const updateEducationRequirement = (index: number, field: keyof EducationRequirement, value: any) => {
    setFormData(prev => {
      const updatedEducation = [...(prev.requirements.education || [])];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value
      };
      
      return {
        ...prev,
        requirements: {
          ...prev.requirements,
          education: updatedEducation
        }
      };
    });
  };

  const removeEducationRequirement = (index: number) => {
    setFormData(prev => {
      const updatedEducation = [...(prev.requirements.education || [])];
      updatedEducation.splice(index, 1);
      
      return {
        ...prev,
        requirements: {
          ...prev.requirements,
          education: updatedEducation
        }
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData as JobFormData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSalaryRangeChange = (field: keyof JobFormData['salaryRange'], value: string) => {
    setFormData(prev => ({
      ...prev,
      salaryRange: {
        ...prev.salaryRange,
        [field]: field === 'min' || field === 'max' ? Number(value) : value
      }
    }));
  }

  // Helper function to render error message
  const renderError = (field: string) => {
    return errors[field] ? (
      <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
    ) : null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>{initialData?.id ? "Edit Job" : "Create New Job"}</CardTitle>
          <CardDescription>
            Fill in all the required fields to {initialData?.id ? 'update' : 'create'} a job listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <div>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Frontend Developer"
                      className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {renderError('title')}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Tech Solutions Inc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi, Kenya"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData({...formData, employmentType: value as EmploymentType})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed job description..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="detailedDescription">Detailed Description</Label>
                <Textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleInputChange}
                  placeholder="More detailed information about the role..."
                  rows={6}
                />
              </div>
            </TabsContent>
            
            {/* Job Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <h3 className="text-lg font-medium">Job Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g., Information Technology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => setFormData({...formData, experienceLevel: value as ExperienceLevel})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
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
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isRemote" 
                    checked={formData.isRemote} 
                    onCheckedChange={(checked) => setFormData({...formData, isRemote: !!checked})}
                  />
                  <Label htmlFor="isRemote">This is a remote position</Label>
                </div>
                
                {formData.isRemote && (
                  <div className="space-y-2 pl-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remoteAllowed" 
                        checked={formData.remoteAllowed} 
                        onCheckedChange={(checked) => setFormData({...formData, remoteAllowed: !!checked})}
                      />
                      <Label htmlFor="remoteAllowed">Remote work allowed</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workFromHomePolicy">Work From Home Policy</Label>
                      <Textarea
                        id="workFromHomePolicy"
                        name="workFromHomePolicy"
                        value={formData.workFromHomePolicy}
                        onChange={handleInputChange}
                        placeholder="Describe the work from home policy..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 pt-2">
                <h4 className="font-medium">Salary Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange.min">Minimum Salary</Label>
                    <Input
                      type="number"
                      id="salaryRange.min"
                      name="salaryRange.min"
                      value={formData.salaryRange.min}
                      onChange={handleInputChange}
                      placeholder="Min"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange.max">Maximum Salary</Label>
                    <Input
                      type="number"
                      id="salaryRange.max"
                      name="salaryRange.max"
                      value={formData.salaryRange.max}
                      onChange={handleInputChange}
                      placeholder="Max"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryRange.currency">Currency</Label>
                    <Select
                      value={formData.salaryRange.currency}
                      onValueChange={(value) => 
                        setFormData({
                          ...formData, 
                          salaryRange: {
                            ...formData.salaryRange, 
                            currency: value
                          }
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="KES">KES (KSh)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="salaryRange.isEstimate" 
                    checked={formData.salaryRange.isEstimate} 
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData, 
                        salaryRange: {
                          ...formData.salaryRange, 
                          isEstimate: !!checked
                        }
                      })
                    }
                  />
                  <Label htmlFor="salaryRange.isEstimate">Salary is an estimate</Label>
                </div>
              </div>
            </TabsContent>
            
            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-4">
              <h3 className="text-lg font-medium">Job Requirements</h3>
              
              <div className="space-y-4">
                <h4 className="font-medium">Education Requirements</h4>
                {formData.requirements.education.map((edu, index) => (
                  <div key={edu.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducationRequirement(index, 'degree', e.target.value)}
                        placeholder="e.g., Bachelor's"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducationRequirement(index, 'fieldOfStudy', e.target.value)}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`edu-required-${index}`}
                        checked={edu.required}
                        onCheckedChange={(checked) => updateEducationRequirement(index, 'required', checked)}
                      />
                      <Label htmlFor={`edu-required-${index}`}>Required</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => removeEducationRequirement(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEducationRequirement}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education Requirement
                </Button>
              </div>
              
              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Experience Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input
                      type="number"
                      value={formData.requirements.experience.years}
                      onChange={(e) => 
                        setFormData({
                          ...formData,
                          requirements: {
                            ...formData.requirements,
                            experience: {
                              ...formData.requirements.experience,
                              years: parseInt(e.target.value) || 0
                            }
                          }
                        })
                      }
                      min="0"
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Skills</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Technical Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.requirements.technicalSkills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSkills = [...formData.requirements.technicalSkills]
                              updatedSkills.splice(index, 1)
                              setFormData({
                                ...formData,
                                requirements: {
                                  ...formData.requirements,
                                  technicalSkills: updatedSkills
                                }
                              })
                            }}
                            className="ml-2 text-slate-500 hover:text-slate-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add technical skill"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            e.preventDefault()
                            setFormData({
                              ...formData,
                              requirements: {
                                ...formData.requirements,
                                technicalSkills: [
                                  ...formData.requirements.technicalSkills,
                                  e.currentTarget.value.trim()
                                ]
                              }
                            })
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Soft Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.requirements.softSkills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSkills = [...formData.requirements.softSkills]
                              updatedSkills.splice(index, 1)
                              setFormData({
                                ...formData,
                                requirements: {
                                  ...formData.requirements,
                                  softSkills: updatedSkills
                                }
                              })
                            }}
                            className="ml-2 text-slate-500 hover:text-slate-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add soft skill"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            e.preventDefault()
                            setFormData({
                              ...formData,
                              requirements: {
                                ...formData.requirements,
                                softSkills: [
                                  ...formData.requirements.softSkills,
                                  e.currentTarget.value.trim()
                                ]
                              }
                            })
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-4">
              <h3 className="text-lg font-medium">Benefits & Perks</h3>
              
              <div className="space-y-4">
                <h4 className="font-medium">Standard Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="healthInsurance"
                      checked={formData.benefits.healthInsurance}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          benefits: {
                            ...formData.benefits,
                            healthInsurance: !!checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="healthInsurance">Health Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="retirementPlans"
                      checked={formData.benefits.retirementPlans}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          benefits: {
                            ...formData.benefits,
                            retirementPlans: !!checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="retirementPlans">Retirement Plans</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="paidTimeOff"
                      checked={formData.benefits.paidTimeOff}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          benefits: {
                            ...formData.benefits,
                            paidTimeOff: !!checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="paidTimeOff">Paid Time Off</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flexibleHours"
                      checked={formData.benefits.flexibleHours}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          benefits: {
                            ...formData.benefits,
                            flexibleHours: !!checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="flexibleHours">Flexible Hours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remoteWorkOptions"
                      checked={formData.benefits.remoteWorkOptions}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          benefits: {
                            ...formData.benefits,
                            remoteWorkOptions: !!checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="remoteWorkOptions">Remote Work Options</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="professionalDevelopment"
                      checked={formData.benefits.professionalDevelopment}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          benefits: {
                            ...formData.benefits,
                            professionalDevelopment: !!checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="professionalDevelopment">Professional Development</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Additional Benefits</h4>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits.otherBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm">
                        {benefit}
                        <button
                          type="button"
                          onClick={() => {
                            const updatedBenefits = [...formData.benefits.otherBenefits]
                            updatedBenefits.splice(index, 1)
                            setFormData({
                              ...formData,
                              benefits: {
                                ...formData.benefits,
                                otherBenefits: updatedBenefits
                              }
                            })
                          }}
                          className="ml-2 text-slate-500 hover:text-slate-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add custom benefit"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault()
                          setFormData({
                            ...formData,
                            benefits: {
                              ...formData.benefits,
                              otherBenefits: [
                                ...formData.benefits.otherBenefits,
                                e.currentTarget.value.trim()
                              ]
                            }
                          })
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-4 pt-6 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData?.id ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
