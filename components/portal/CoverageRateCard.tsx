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
    <Card className="bg-white border-slate-200 shadow-none md:shadow-sm rounded-md border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <TrendingUp className="h-5 w-5 text-slate-700" />
          Coverage Rate
        </CardTitle>
        <CardDescription className="text-sm text-slate-600">
          Percentage of interested jobs you've applied to
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">
              Application Completion
            </span>
            <span className={`text-3xl font-semibold ${getCoverageColor(coverageRate)}`}>
              {coverageRate}%
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full transition-all ${getProgressColor(coverageRate)}`}
              style={{ width: `${coverageRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Heart className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-slate-700">Interested</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">{interested}</div>
            <div className="text-xs text-slate-500 mt-1">
              {total > 0 ? Math.round((interested / total) * 100) : 0}%
            </div>
          </div>

          <div className="text-center border-l border-r border-slate-200">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-xs font-medium text-slate-700">Started</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">{started}</div>
            <div className="text-xs text-slate-500 mt-1">
              {total > 0 ? Math.round((started / total) * 100) : 0}%
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-slate-700">Applied</span>
            </div>
            <div className="text-2xl font-semibold text-slate-900">{applied}</div>
            <div className="text-xs text-slate-500 mt-1">
              {total > 0 ? Math.round((applied / total) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Total Jobs Tracked</span>
            <span className="text-xl font-semibold text-slate-900">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

