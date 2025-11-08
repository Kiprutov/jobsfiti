"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "@/lib/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle } from "lucide-react"

interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  displayName: string
  acceptTerms: boolean
}

export function SignUpForm() {
  const { signUp, error: authError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      acceptTerms: false,
    },
  })

  const password = watch("password")

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      await signUp(data.email, data.password, data.displayName)
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const displayError = error || authError

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "" }
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z\d]/.test(pwd)) strength++
    
    const labels = ["Weak", "Fair", "Good", "Strong"]
    return { strength, label: labels[strength - 1] || "" }
  }

  const passwordStrength = getPasswordStrength(password || "")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {displayError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{displayError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="displayName">Full Name</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="John Doe"
          {...register("displayName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          disabled={isLoading}
        />
        {errors.displayName && (
          <p className="text-sm text-red-600">{errors.displayName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a strong password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          disabled={isLoading}
        />
        {password && passwordStrength.strength > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    passwordStrength.strength === 1
                      ? "bg-red-500 w-1/4"
                      : passwordStrength.strength === 2
                      ? "bg-yellow-500 w-2/4"
                      : passwordStrength.strength === 3
                      ? "bg-blue-500 w-3/4"
                      : "bg-green-500 w-full"
                  }`}
                />
              </div>
              <span className="text-xs text-gray-600">{passwordStrength.label}</span>
            </div>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="acceptTerms"
          checked={watch("acceptTerms") || false}
          onCheckedChange={(checked) => {
            setValue("acceptTerms", checked === true, { shouldValidate: true });
          }}
          disabled={isLoading}
          {...register("acceptTerms", {
            required: "You must accept the terms and conditions",
          })}
        />
        <Label
          htmlFor="acceptTerms"
          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the Terms and Conditions and Privacy Policy
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}

