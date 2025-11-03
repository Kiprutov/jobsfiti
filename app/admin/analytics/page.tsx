"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/services/jobsService"
import { BarChart3, TrendingUp, Users, Briefcase, Download } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [analytics, setAnalytics] = useState({
    totalJobs: 0,
    openJobs: 0,
    closedJobs: 0,
    jobsByRole: {} as Record<string, number>,
    jobsByCategory: {} as Record<string, number>,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setIsLoading(true)
      const jobs = await getJobs()

      // Filter by time range (if needed in future)
      const filteredJobs = jobs // For now, use all jobs

      const jobsByRole: Record<string, number> = {}
      const jobsByCategory: Record<string, number> = {}

      filteredJobs.forEach((job) => {
        // Count by role
        if (job.role) {
          jobsByRole[job.role] = (jobsByRole[job.role] || 0) + 1
        }
        // Count by category
        if (job.category) {
          jobsByCategory[job.category] = (jobsByCategory[job.category] || 0) + 1
        }
      })

      setAnalytics({
        totalJobs: filteredJobs.length,
        openJobs: filteredJobs.filter((j) => j.status === "open").length,
        closedJobs: filteredJobs.filter((j) => j.status === "closed").length,
        jobsByRole,
        jobsByCategory,
      })
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Jobs",
      value: analytics.totalJobs,
      icon: Briefcase,
      description: "All time",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Open Jobs",
      value: analytics.openJobs,
      icon: TrendingUp,
      description: "Currently active",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Closed Jobs",
      value: analytics.closedJobs,
      icon: BarChart3,
      description: "Completed/Closed",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600 mt-1">View insights and statistics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs by Role */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs by Role</CardTitle>
          <CardDescription>Distribution of jobs across different role types</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : Object.keys(analytics.jobsByRole).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(analytics.jobsByRole)
                .sort(([, a], [, b]) => b - a)
                .map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-32 text-sm font-medium capitalize">{role.replace('-', ' ')}</div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{
                              width: `${(count / analytics.totalJobs) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold">{count}</div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No data available</div>
          )}
        </CardContent>
      </Card>

      {/* Jobs by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs by Category</CardTitle>
          <CardDescription>Distribution of jobs across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : Object.keys(analytics.jobsByCategory).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(analytics.jobsByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium capitalize">{category}</div>
                      <div className="text-sm text-gray-500">{count} jobs</div>
                    </div>
                    <div className="text-2xl font-bold">{count}</div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

