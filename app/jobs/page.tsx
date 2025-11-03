"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Footer from "@/components/footer"
import { getJobs, FirestoreJob } from "@/lib/services/jobsService"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get("category")
  const role = searchParams.get("role")
  const [jobs, setJobs] = useState<FirestoreJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load jobs from Firebase
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        const jobsData = await getJobs()
        // Only show open jobs and normalize fields
        const normalizedJobs = jobsData
          .filter(job => job.status === 'open')
          .map(job => ({
            ...job,
            role: job.role?.toLowerCase() || 'other',
            category: job.category?.toLowerCase() || 'other',
          }))
        setJobs(normalizedJobs)
      } catch (error) {
        console.error('Failed to load jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadJobs()
  }, [])

  // Filter jobs based on role and category
  let filteredJobs = [...jobs]
  
  if (role) {
    filteredJobs = filteredJobs.filter((job) => {
      const jobRole = job.role?.toLowerCase() || ''
      return jobRole === role.toLowerCase()
    })
  }
  
  if (category) {
    filteredJobs = filteredJobs.filter((job) => {
      const jobCategory = job.category?.toLowerCase() || ''
      return jobCategory === category.toLowerCase()
    })
  }

  // Generate categories and roles from the actual jobs data
  const categories = [
    { id: "tech", label: "Technology" },
    { id: "healthcare", label: "Healthcare" },
    { id: "business", label: "Business" },
    { id: "retail", label: "Retail" },
    { id: "logistics", label: "Logistics" },
    { id: "other", label: "Other" },
  ].map((cat) => ({
    ...cat,
    count: jobs.filter((j: FirestoreJob) => j.category === cat.id && (!role || j.role === role)).length,
  }))

  const roles = [
    { id: "attachment", label: "Attachment" },
    { id: "internship", label: "Internship" },
    { id: "graduate", label: "Graduate" },
    { id: "junior", label: "Junior Role" },
    { id: "mid-level", label: "Mid-Level Role" },
    { id: "senior", label: "Senior Role" },
    { id: "expert", label: "Expert Role" },
  ].map((r) => ({
    ...r,
    count: jobs.filter((j: FirestoreJob) => j.role === r.id && (!category || j.category === category)).length,
  }))

  const getRoleLabel = () => {
    const roleObj = roles.find((r) => r.id === role)
    return roleObj?.label
  }

  const getCategoryLabel = () => {
    const catObj = categories.find((c) => c.id === category)
    return catObj?.label
  }

  // Handle auto-navigation when there's only one category for a role
  useEffect(() => {
    if (role && !category) {
      const categoriesForRole = categories.filter((c) => c.count > 0)
      if (categoriesForRole.length === 1) {
        router.push(`/jobs?role=${role}&category=${categoriesForRole[0].id}`)
      }
    }
  }, [role, category, categories, router])

  const getCategoriesWithAutoSelect = () => {
    if (!role) return categories
    const categoriesForRole = categories.filter((c) => c.count > 0)
    return categoriesForRole.length === 1 ? categoriesForRole : categories
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="w-full px-2 pt-6 pb-12">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Job Opportunities</h1>
            <p className="text-slate-600">
              {role && category
                ? `${getRoleLabel()} jobs in ${getCategoryLabel()}: ${filteredJobs.length} available`
                : role
                  ? `${getRoleLabel()} positions: ${filteredJobs.length} available`
                  : category
                    ? `${getCategoryLabel()} jobs: ${filteredJobs.length} available`
                    : `Showing all ${filteredJobs.length} jobs`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {!role && (
                  <div className="bg-slate-50 rounded-md p-4 shadow-sm sticky top-24">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Job Levels</h3>
                    <div className="space-y-2">
                      <Link
                        href={category ? `/jobs?category=${category}` : "/jobs"}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          !role ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        All Levels
                      </Link>
                      {roles.map((r) => (
                        <Link
                          key={r.id}
                          href={category ? `/jobs?role=${r.id}&category=${category}` : `/jobs?role=${r.id}`}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            role === r.id ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span className="flex justify-between items-center">
                            <span>{r.label}</span>
                            <span className="text-xs">{r.count}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Filter */}
                <div className="bg-slate-50 rounded-md p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <Link
                      href={role ? `/jobs?role=${role}` : "/jobs"}
                      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                        !category ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex justify-between items-center">
                        <span>All Categories</span>
                        <span className="text-xs">{filteredJobs.length}</span>
                      </span>
                    </Link>
                    {getCategoriesWithAutoSelect().map((cat) => (
                      <Link
                        key={cat.id}
                        href={role ? `/jobs?role=${role}&category=${cat.id}` : `/jobs?category=${cat.id}`}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          category === cat.id ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="flex justify-between items-center">
                          <span>{cat.label}</span>
                          <span className="text-xs">{cat.count}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="bg-slate-50 rounded-md p-12 text-center">
                  <p className="text-slate-600 text-lg">Loading jobs...</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                                {job.logo ? (
                                  <img
                                    src={job.logo}
                                    alt={job.title}
                                    className="w-full h-full rounded-md object-cover"
                                  />
                                ) : (
                                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              <p className="text-gray-600 text-sm">{job.companyName || 'Company Name'}</p>
                            </div>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                           Experience: {typeof job.experienceLevel === 'number' ? `${job.experienceLevel} yrs` : (job.experienceLevel || 'N/A')}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {('type' in job && (job as any).type) ? (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                              {(job as any).type}
                            </span>
                          ) : null}
                          {job.location && (
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                          )}
                          {job.role && (
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded">
                              {job.role.charAt(0).toUpperCase() + job.role.slice(1)}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            ⏰ Deadline: {job.applicationDeadline || 'N/A'}
                          </span>
                          <Link 
                            href={`/jobs/${job.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            View Details
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-md p-12 text-center">
                  <p className="text-slate-600 text-lg">No jobs found matching your filters.</p>
                  <Link href="/jobs" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
                    Clear filters
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
