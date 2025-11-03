"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  number: number
  title: string
  description?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  completedSteps?: number[]
  className?: string
}

export function StepIndicator({ 
  steps, 
  currentStep, 
  completedSteps = [], 
  className 
}: StepIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number)
          const isCurrent = currentStep === step.number
          const isLast = index === steps.length - 1

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isCurrent
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-300 bg-white text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                
                {/* Step Title */}
                <div className="mt-2 text-center max-w-[120px]">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isCurrent || isCompleted
                        ? "text-primary"
                        : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "h-0.5 mx-2 flex-1 transition-colors",
                    isCompleted ? "bg-primary" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

