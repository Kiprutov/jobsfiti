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
      <Card>
        <CardHeader>
          <CardTitle>Deadline Alerts</CardTitle>
          <CardDescription>
            Jobs with approaching deadlines that you haven't applied to yet
          </CardDescription>
        </CardHeader>
        <CardContent>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          Deadline Alerts ({alerts.length})
        </CardTitle>
        <CardDescription>
          These jobs have deadlines within 3 days and you haven't applied yet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.interest.jobId}
              variant={alert.daysUntilDeadline === 0 ? "destructive" : "default"}
              className="border-orange-300 bg-orange-50"
            >
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-900">
                {alert.job.title} - {alert.job.companyName}
              </AlertTitle>
              <AlertDescription className="text-orange-800">
                <p className="mb-2">
                  Application deadline is in{" "}
                  <strong>
                    {alert.daysUntilDeadline} day{alert.daysUntilDeadline !== 1 ? "s" : ""}
                  </strong>
                  . Current status:{" "}
                  <strong className="capitalize">{alert.interest.status}</strong>
                </p>
                {alert.job.applicationDeadline && (
                  <p className="text-sm mb-3">
                    Deadline: {alert.job.applicationDeadline}
                  </p>
                )}
                <Link href={`/jobs/${alert.job.jobId}`}>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Job & Apply
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

