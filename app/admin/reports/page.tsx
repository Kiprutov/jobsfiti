"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Report {
  id: string
  name: string
  description: string
  type: "jobs" | "users" | "analytics"
  lastGenerated?: string
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<string>("jobs")
  const [dateRange, setDateRange] = useState<string>("30")

  const reports: Report[] = [
    {
      id: "1",
      name: "Jobs Report",
      description: "Complete listing of all job postings with details",
      type: "jobs",
      lastGenerated: "2024-01-20",
    },
    {
      id: "2",
      name: "User Activity Report",
      description: "User registrations, logins, and activity statistics",
      type: "users",
      lastGenerated: "2024-01-19",
    },
    {
      id: "3",
      name: "Analytics Summary",
      description: "Key metrics and performance indicators",
      type: "analytics",
      lastGenerated: "2024-01-20",
    },
  ]

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    alert(`Generating ${reportType} report for last ${dateRange} days...`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download reports</p>
        </div>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select report type and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jobs">Jobs Report</SelectItem>
                  <SelectItem value="users">User Activity Report</SelectItem>
                  <SelectItem value="analytics">Analytics Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleGenerateReport} className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Generate Report (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Pre-configured report templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        {report.lastGenerated && (
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {new Date(report.lastGenerated).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>Recently generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No report history available yet. Generate your first report to see it here.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

