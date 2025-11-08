"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Heart, TrendingUp } from "lucide-react"

interface CoverageRateCardProps {
  total: number
  applied: number
  started: number
  interested: number
  coverageRate: number
}

export function CoverageRateCard({
  total,
  applied,
  started,
  interested,
  coverageRate,
}: CoverageRateCardProps) {
  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coverage Rate</CardTitle>
          <CardDescription>
            Track your application progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No jobs in your interests yet.</p>
            <p className="text-sm mt-2">
              Start adding jobs you're interested in to track your progress!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getCoverageColor = (rate: number) => {
    if (rate >= 80) return "text-green-600"
    if (rate >= 50) return "text-yellow-600"
    return "text-orange-600"
  }

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return "bg-green-600"
    if (rate >= 50) return "bg-yellow-600"
    return "bg-orange-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Coverage Rate
        </CardTitle>
        <CardDescription>
          Percentage of interested jobs you've applied to
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Application Completion Rate
            </span>
            <span className={`text-2xl font-bold ${getCoverageColor(coverageRate)}`}>
              {coverageRate}%
            </span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full transition-all ${getProgressColor(coverageRate)}`}
              style={{ width: `${coverageRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Interested</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{interested}</div>
            <div className="text-xs text-blue-700 mt-1">
              {total > 0 ? Math.round((interested / total) * 100) : 0}% of total
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Started</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{started}</div>
            <div className="text-xs text-yellow-700 mt-1">
              {total > 0 ? Math.round((started / total) * 100) : 0}% of total
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200 col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Applied</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{applied}</div>
            <div className="text-xs text-green-700 mt-1">
              {total > 0 ? Math.round((applied / total) * 100) : 0}% of total
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Jobs Tracked</span>
            <span className="text-lg font-semibold">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

