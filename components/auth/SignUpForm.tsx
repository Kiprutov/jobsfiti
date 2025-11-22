"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "@/lib/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
      {displayError && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-3.5 w-3.5" />
          <AlertDescription className="text-xs">{displayError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="displayName" className="text-sm">Full Name</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="John Doe"
          className="h-9 focus:border-blue-500 focus:ring-blue-500"
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
          <p className="text-xs text-red-600">{errors.displayName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="h-9 focus:border-blue-500 focus:ring-blue-500"
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
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-9 pr-8 focus:border-blue-500 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm">Confirm</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm"
              className="h-9 pr-8 focus:border-blue-500 focus:ring-blue-500"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {password && passwordStrength.strength > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-md overflow-hidden">
            <div
              className={`h-full transition-all rounded-md ${
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
      )}

      <div className="flex items-start space-x-2 pt-1">
        <Checkbox
          id="acceptTerms"
          checked={watch("acceptTerms") || false}
          onCheckedChange={(checked) => {
            setValue("acceptTerms", checked === true, { shouldValidate: true });
          }}
          disabled={isLoading}
          className="mt-0.5"
          {...register("acceptTerms", {
            required: "You must accept the terms and conditions",
          })}
        />
        <Label
          htmlFor="acceptTerms"
          className="text-xs font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the Terms and Conditions and Privacy Policy
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="text-xs text-red-600">{errors.acceptTerms.message}</p>
      )}

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-9 mt-2" disabled={isLoading}>
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

