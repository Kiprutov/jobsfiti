"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Sparkles } from "lucide-react"

export function InterviewPrepSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Interview Preparation Materials
        </CardTitle>
        <CardDescription>
          Resources and materials to help you prepare for interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Coming Soon
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We're working on bringing you comprehensive interview preparation materials,
            including practice questions, tips, and resources tailored to the jobs you've applied for.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

