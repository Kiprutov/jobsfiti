"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CoverageRateCard } from "./CoverageRateCard"
import { AlertSection } from "./AlertSection"
import { ChevronDown, ChevronUp, TrendingUp, AlertCircle, CheckCircle2, Clock, Heart } from "lucide-react"
import { FirestoreJob } from "@/lib/services/jobsService"
import { JobInterest } from "@/lib/types/jobInterest"

interface StatsOverviewSectionProps {
    coverageRate: {
        total: number
        applied: number
        started: number
        interested: number
        coverageRate: number
    }
    alerts: {
        interest: JobInterest
        job: FirestoreJob
        daysUntilDeadline: number
    }[]
}

export function StatsOverviewSection({ coverageRate, alerts }: StatsOverviewSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const getCoverageColor = (rate: number) => {
        if (rate >= 80) return "text-green-600"
        if (rate >= 50) return "text-yellow-600"
        return "text-orange-600"
    }

    return (
        <div className="space-y-4">
            {/* Collapsed Summary View */}
            {!isExpanded && (
                <Card className="bg-white border-slate-200 shadow-none md:shadow-sm rounded-md border">
                    <CardContent className="py-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            {/* Summary Stats */}
                            <div className="flex flex-wrap items-center gap-6">
                                {/* Coverage Rate Summary */}
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-slate-600" />
                                    <span className="text-sm text-slate-600">Coverage:</span>
                                    <span className={`text-lg font-semibold ${getCoverageColor(coverageRate.coverageRate)}`}>
                                        {coverageRate.coverageRate}%
                                    </span>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Heart className="h-4 w-4 text-blue-600" />
                                        <span className="text-slate-600">{coverageRate.interested}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                        <span className="text-slate-600">{coverageRate.started}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <span className="text-slate-600">{coverageRate.applied}</span>
                                    </div>
                                </div>

                                {/* Alerts Summary */}
                                {alerts.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-orange-600" />
                                        <span className="text-sm text-orange-700 font-medium">
                                            {alerts.length} deadline{alerts.length !== 1 ? 's' : ''} approaching
                                        </span>
                                    </div>
                                )}
                                {alerts.length === 0 && (
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-slate-400" />
                                        <span className="text-sm text-slate-500">No alerts</span>
                                    </div>
                                )}

                                {/* Total Tracked */}
                                <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                                    <span className="text-sm text-slate-600">Total:</span>
                                    <span className="text-lg font-semibold text-slate-900">{coverageRate.total}</span>
                                    <span className="text-sm text-slate-500">jobs</span>
                                </div>
                            </div>

                            {/* Expand Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsExpanded(true)}
                                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            >
                                <span className="mr-1.5 text-sm">Show Details</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Expanded Full View */}
            {isExpanded && (
                <div className="space-y-4">
                    {/* Collapse Button Header */}
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(false)}
                            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                            <span className="mr-1.5 text-sm">Collapse Stats</span>
                            <ChevronUp className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Stats Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                        <CoverageRateCard {...coverageRate} />
                        <AlertSection alerts={alerts} />
                    </div>
                </div>
            )}
        </div>
    )
}
