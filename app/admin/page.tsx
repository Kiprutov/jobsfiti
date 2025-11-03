"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getJobs, FirestoreJob } from "@/lib/services/jobsService"
import { Briefcase, Users, FileText, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    openJobs: 0,
    totalUsers: 0,
    totalApplications: 0,
  })
  const [recentJobs, setRecentJobs] = useState<FirestoreJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const jobs = await getJobs()
      const openJobs = jobs.filter(job => job.status === 'open')
      
      setStats({
        totalJobs: jobs.length,
        openJobs: openJobs.length,
        totalUsers: 0, // TODO: Implement when user management is ready
        totalApplications: 0, // TODO: Implement when applications are ready
      })
      
      setRecentJobs(jobs.slice(0, 5))
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      description: `${stats.openJobs} currently open`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Open Jobs",
      value: stats.openJobs,
      icon: TrendingUp,
      description: "Active listings",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
      description: "Total received",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
        </div>
        <Link href="/admin/jobs">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Create New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Recent Jobs */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Job Postings</CardTitle>
          <CardDescription className="text-sm">Latest jobs you've created</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : recentJobs.length > 0 ? (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.companyName} • {job.location}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {job.role}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {job.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        job.status === 'open' ? 'bg-green-100 text-green-800' :
                        job.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                  <Link href={`/admin/jobs`}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm" size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No jobs yet. Create your first job posting!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription className="text-sm">Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/jobs">
              <Card className="hover:shadow-sm cursor-pointer transition-colors hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Manage Jobs</CardTitle>
                  <CardDescription>View, edit, and manage job postings</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/admin/users">
              <Card className="hover:shadow-sm cursor-pointer transition-colors hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Manage Users</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/admin/analytics">
              <Card className="hover:shadow-sm cursor-pointer transition-colors hover:border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">View Analytics</CardTitle>
                  <CardDescription>See insights and statistics</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
