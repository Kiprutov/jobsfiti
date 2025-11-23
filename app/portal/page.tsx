"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
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
import { Briefcase, AlertCircle, TrendingUp, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"




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

      const [interests, approachingDeadlines, coverage] = await Promise.all([
        getInterestsWithJobs(user.uid),
        getJobsWithApproachingDeadlines(user.uid),
        calculateCoverageRate(user.uid)
      ]);

      setInterestsWithJobs(interests)
      setAlerts(approachingDeadlines)
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
    (item) => ["applied", "phone_screen", "technical_interview",
      "onsite_interview", "final_interview", "offer_stage",
      "interviewed", "rejected", "accepted"].includes(item.interest.status)
  )

  // Show loading while checking auth or loading data
  if (authLoading || (isLoading && !user)) {
    return (
      <div className="w-full px-8 md:px-16 py-12">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-slate-800 animate-spin"></div>
          </div>
          <p className="text-slate-600 font-medium animate-pulse">Loading your portal...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/30">
      {/* Welcome Section */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="px-8 md:px-16 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
                Welcome back, {user.displayName?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-slate-600 text-base md:text-lg max-w-3xl">
                Track your applications, manage deadlines, and stay on top of your job search.
              </p>
            </div>
            <Link href="/jobs">
              <button className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg transition-all font-medium text-sm shadow-sm">
                <Sparkles className="w-4 h-4" />
                Browse Jobs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-2 md:px-16 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          <CoverageRateCard {...coverageRate} />
          <AlertSection alerts={alerts} />
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-md shadow-none md:shadow-sm border border-slate-200">
          <Tabs defaultValue="all" className="w-full">
            <div className="px-6 pt-6 pb-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Applications</h2>
                  <p className="text-slate-500 text-sm mt-1">Manage and track your job applications</p>
                </div>
                <TabsList className="bg-slate-100 p-1 rounded-lg">
                  <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 text-sm font-medium">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="interested" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 text-sm font-medium">
                    Saved
                  </TabsTrigger>
                  <TabsTrigger value="started" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 text-sm font-medium">
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="applied" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-1.5 text-sm font-medium">
                    Applied
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="p-6">
              <TabsContent value="all" className="mt-0 space-y-4">
                {interestsWithJobs.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="grid grid-cols-1 gap-4">
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

              <TabsContent value="interested" className="mt-0 space-y-4">
                {interestedJobs.length === 0 ? (
                  <EmptyState title="No saved jobs" description="Jobs you mark as 'Interested' will appear here." />
                ) : (
                  <div className="grid grid-cols-1 gap-4">
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

              <TabsContent value="started" className="mt-0 space-y-4">
                {startedJobs.length === 0 ? (
                  <EmptyState title="No applications in progress" description="Jobs where you've started applying will appear here." />
                ) : (
                  <div className="grid grid-cols-1 gap-4">
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

              <TabsContent value="applied" className="mt-0 space-y-4">
                {appliedJobs.length === 0 ? (
                  <EmptyState title="No submitted applications" description="Jobs you've applied to will appear here." />
                ) : (
                  <div className="grid grid-cols-1 gap-4">
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
            </div>
          </Tabs>
        </div>


      </div>
    </div>
  )
}

function EmptyState({ title = "No jobs tracked yet", description = "Start tracking jobs you're interested in to manage your applications." }: { title?: string, description?: string }) {
  return (
    <div className="text-center py-16 px-4 rounded-lg border border-slate-200 bg-slate-50/50">
      <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4 border border-slate-200">
        <Briefcase className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
        {description}
      </p>
      <Link href="/jobs">
        <Button variant="outline" className="shadow-sm">
          Browse Jobs
        </Button>
      </Link>
    </div>
  )
}
