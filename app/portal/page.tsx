"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobInterestCard } from "@/components/portal/JobInterestCard"
import { AlertSection } from "@/components/portal/AlertSection"
import { CoverageRateCard } from "@/components/portal/CoverageRateCard"
import { InterviewPrepSection } from "@/components/portal/InterviewPrepSection"
import {
  getInterestsWithJobs,
  getJobsWithApproachingDeadlines,
  calculateCoverageRate,
} from "@/lib/services/portalService"
import { JobInterest } from "@/lib/types/jobInterest"
import { FirestoreJob } from "@/lib/services/jobsService"
import { useAuth } from "@/lib/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Briefcase, AlertCircle, TrendingUp, FileText } from "lucide-react"

export default function PortalPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [interestsWithJobs, setInterestsWithJobs] = useState<{
    interest: JobInterest
    job: FirestoreJob | null
  }[]>([])
  const [alerts, setAlerts] = useState<{
    interest: JobInterest
    job: FirestoreJob
    daysUntilDeadline: number
  }[]>([])
  const [coverageRate, setCoverageRate] = useState({
    total: 0,
    applied: 0,
    started: 0,
    interested: 0,
    coverageRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  const loadPortalData = async () => {
    if (!user) return
    
    try {
      setIsLoading(true)
      
      // Load all interests with their job data
      const interestsData = await getInterestsWithJobs(user.uid)
      setInterestsWithJobs(interestsData)
      
      // Load deadline alerts
      const alertsData = await getJobsWithApproachingDeadlines(user.uid)
      setAlerts(alertsData)
      
      // Calculate coverage rate
      const coverage = await calculateCoverageRate(user.uid)
      setCoverageRate(coverage)
    } catch (error) {
      console.error("Error loading portal data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadPortalData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleUpdate = () => {
    loadPortalData()
  }

  // Filter interests by status for tabs
  const interestedJobs = interestsWithJobs.filter(
    (item) => item.interest.status === "interested"
  )
  const startedJobs = interestsWithJobs.filter(
    (item) => item.interest.status === "started"
  )
  const appliedJobs = interestsWithJobs.filter(
    (item) => item.interest.status === "applied" || 
             item.interest.status === "interviewed" ||
             item.interest.status === "rejected" ||
             item.interest.status === "accepted"
  )

  // Show loading while checking auth or loading data
  if (authLoading || (isLoading && !user)) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portal</h1>
        <p className="text-gray-600">
          Manage your job interests, track application progress, and stay on top of deadlines
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CoverageRateCard {...coverageRate} />
            <AlertSection alerts={alerts} />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                All ({interestsWithJobs.length})
              </TabsTrigger>
              <TabsTrigger value="interested" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Interested ({interestedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="started" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Started ({startedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="applied" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Applied ({appliedJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {interestsWithJobs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No jobs tracked yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start tracking jobs you're interested in to manage your applications.
                      </p>
                      <a
                        href="/jobs"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Browse Jobs
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interestsWithJobs.map((item) => (
                    <JobInterestCard
                      key={item.interest.jobId}
                      interest={item.interest}
                      job={item.job}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="interested" className="space-y-4">
              {interestedJobs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-gray-500">
                      No jobs marked as "Interested" yet.
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interestedJobs.map((item) => (
                    <JobInterestCard
                      key={item.interest.jobId}
                      interest={item.interest}
                      job={item.job}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="started" className="space-y-4">
              {startedJobs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-gray-500">
                      No jobs with "Started Application" status.
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {startedJobs.map((item) => (
                    <JobInterestCard
                      key={item.interest.jobId}
                      interest={item.interest}
                      job={item.job}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="applied" className="space-y-4">
              {appliedJobs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-gray-500">
                      No jobs marked as "Applied" yet.
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appliedJobs.map((item) => (
                    <JobInterestCard
                      key={item.interest.jobId}
                      interest={item.interest}
                      job={item.job}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Interview Preparation Section */}
          <InterviewPrepSection />
        </div>
      )}
    </div>
  )
}

