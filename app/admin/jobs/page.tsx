"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { JobFormWizard } from "@/components/forms/JobFormWizard"
import { JobFormData } from "@/components/forms/JobForm"
import { createJob, updateJob, deleteJob, getJobs, FirestoreJob } from "@/lib/services/jobsService"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function JobsPage() {
  const [jobs, setJobs] = useState<FirestoreJob[]>([])
  const [filteredJobs, setFilteredJobs] = useState<FirestoreJob[]>([])
  const [editingJob, setEditingJob] = useState<FirestoreJob | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, statusFilter])

  const loadJobs = async () => {
    try {
      setIsLoading(true)
      const fetchedJobs = await getJobs()
      setJobs(fetchedJobs)
    } catch (error) {
      console.error('Failed to load jobs:', error)
      toast({
        title: "Error",
        description: "Failed to load jobs. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter)
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(term) ||
          job.companyName?.toLowerCase().includes(term) ||
          job.location?.toLowerCase().includes(term) ||
          job.description?.toLowerCase().includes(term)
      )
    }

    setFilteredJobs(filtered)
  }

  const handleSaveJob = async (data: JobFormData) => {
    setIsSubmitting(true)
    try {
      if (editingJob && editingJob.id) {
        await updateJob(editingJob.id, data)
        toast({
          title: "Success",
          description: "Job updated successfully!",
        })
        setEditingJob(null)
        setShowForm(false)
        await loadJobs()
      } else {
        const jobData: Omit<JobFormData, 'id'> = {
          ...data,
          datePosted: new Date().toISOString().split('T')[0],
          status: "open" as const
        }
        await createJob(jobData)
        toast({
          title: "Success",
          description: "Job created successfully!",
        })
        setShowForm(false)
        await loadJobs()
      }
    } catch (error) {
      console.error('Failed to save job:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save job. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditJob = (job: FirestoreJob) => {
    setEditingJob(job)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobId)
        toast({
          title: "Success",
          description: "Job deleted successfully!",
        })
        if (editingJob && editingJob.id === jobId) {
          setEditingJob(null)
          setShowForm(false)
        }
        await loadJobs()
      } catch (error) {
        console.error('Failed to delete job:', error)
        toast({
          title: "Error",
          description: "Failed to delete job. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-gray-600 mt-1">Manage all job postings</p>
        </div>
        {!showForm && !editingJob && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Job
          </Button>
        )}
      </div>

      {/* Job Form Wizard */}
      {(showForm || editingJob) && (
        <JobFormWizard
          initialData={editingJob || undefined}
          onSave={handleSaveJob}
          onCancel={() => {
            setEditingJob(null)
            setShowForm(false)
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Filters and Search */}
      {!showForm && !editingJob && (
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search jobs by title, company, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Jobs List */}
      {!showForm && !editingJob && (
        <Card>
          <CardHeader>
            <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
            <CardDescription>
              {isLoading ? "Loading jobs..." : `Showing ${filteredJobs.length} of ${jobs.length} jobs`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading jobs...</div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {job.companyName} • {job.location}
                        </p>
                        <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {job.role}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {job.category}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {job.employmentType}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            job.status === 'open' ? 'bg-green-100 text-green-800' :
                            job.status === 'closed' ? 'bg-red-100 text-red-800' :
                            job.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                        {job.datePosted && (
                          <p className="text-xs text-gray-400 mt-2">
                            Posted: {new Date(job.datePosted).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditJob(job)}
                          aria-label={`Edit ${job.title}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => job.id && handleDeleteJob(job.id)}
                          aria-label={`Delete ${job.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "No jobs found matching your filters."
                  : "No jobs to display. Create your first job posting!"}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

