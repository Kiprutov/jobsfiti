"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FirestoreJob } from "@/lib/services/jobsService"
import { JobInterest } from "@/lib/types/jobInterest"

interface AlertSectionProps {
  alerts: {
    interest: JobInterest
    job: FirestoreJob
    daysUntilDeadline: number
  }[]
}

export function AlertSection({ alerts }: AlertSectionProps) {
  if (alerts.length === 0) {
    return (
      <Card className="bg-white border-slate-200 shadow-none md:shadow-sm rounded-md border">
        <CardHeader className="pb-4">
          <CardTitle>Deadline Alerts</CardTitle>
          <CardDescription>
            Jobs with approaching deadlines that you haven't applied to yet
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 border-t border-slate-200">
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No deadline alerts at the moment.</p>
            <p className="text-sm mt-2">All good! Keep up the great work.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-slate-200 shadow-none md:shadow-sm rounded-md border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          Deadline Alerts ({alerts.length})
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">
          Jobs with deadlines within 3 days that you haven't applied to yet
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 border-t border-slate-200">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.interest.jobId}
              className="p-4 border border-orange-200 bg-orange-50/50 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    {alert.job.title}
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    {alert.job.companyName}
                  </p>
                  <p className="text-sm text-orange-800 mb-3">
                    Deadline in{" "}
                    <strong>
                      {alert.daysUntilDeadline} day{alert.daysUntilDeadline !== 1 ? "s" : ""}
                    </strong>
                    {" • "}
                    Status: <strong className="capitalize">{alert.interest.status}</strong>
                  </p>
                  {alert.job.applicationDeadline && (
                    <p className="text-xs text-slate-600 mb-3">
                      Deadline: {alert.job.applicationDeadline}
                    </p>
                  )}
                  <Link href={`/jobs/${alert.job.jobId}`}>
                    <Button variant="outline" size="sm" className="shadow-sm text-xs h-8">
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      View Job & Apply
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

