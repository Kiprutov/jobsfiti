"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext"
import { LoginForm } from "@/components/auth/LoginForm"
import { SignUpForm } from "@/components/auth/SignUpForm"
import { Briefcase, TrendingUp, Users, CheckCircle2, Sparkles } from "lucide-react"

export default function AuthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.push("/portal")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-white overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-md h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-12 text-white h-full overflow-y-auto">
          <div className="max-w-md py-4">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-700/50 rounded-md border border-blue-500/30 mb-6 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-medium">Trusted Platform</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-semibold mb-4 leading-tight text-white">
                Your Career Journey Starts Here
              </h1>
              <p className="text-base text-blue-50 mb-8 leading-relaxed">
                Connect with top employers and discover opportunities that match your skills and aspirations.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-700/40 rounded-md border border-blue-500/30 flex-shrink-0 backdrop-blur-sm">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-white">50K+ Job Listings</h3>
                  <p className="text-blue-100 text-xs leading-relaxed">Explore opportunities across various industries</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-700/40 rounded-md border border-blue-500/30 flex-shrink-0 backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-white">Career Growth</h3>
                  <p className="text-blue-100 text-xs leading-relaxed">Track your applications and career progress</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-700/40 rounded-md border border-blue-500/30 flex-shrink-0 backdrop-blur-sm">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-white">Professional Network</h3>
                  <p className="text-blue-100 text-xs leading-relaxed">Connect with employers and professionals</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-blue-500/30">
              <div className="flex items-center gap-6 text-xs text-blue-100">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>98% Satisfaction</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 sm:p-6 lg:p-10 xl:p-12 overflow-hidden">
        <div className="w-full max-w-md">
          {/* Mobile Logo/Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="p-2.5 bg-blue-50 rounded-md border border-blue-100">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-slate-900">JobsFiti</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-slate-600">
              {isSignUp ? "Sign up to start your career journey" : "Sign in to continue your career journey"}
            </p>
          </div>

          {/* Desktop Header */}
          <div className={`hidden lg:block ${isSignUp ? 'mb-6' : 'mb-10'}`}>
            <div className={isSignUp ? 'mb-4' : 'mb-6'}>
              <div className={`flex items-center gap-3 ${isSignUp ? 'mb-3' : 'mb-5'}`}>
                <div className="p-2.5 bg-blue-50 rounded-md border border-blue-100">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-xl font-semibold text-slate-900">JobsFiti</span>
              </div>
              <h1 className={`font-semibold text-slate-900 tracking-tight ${isSignUp ? 'text-2xl mb-1' : 'text-3xl mb-2'}`}>
                {isSignUp ? "Create Your Account" : "Sign In"}
              </h1>
              <p className={`text-slate-600 leading-relaxed ${isSignUp ? 'text-sm' : 'text-base'}`}>
                {isSignUp 
                  ? "Create a new account to access your career portal"
                  : "Sign in to your account to access your career portal"
                }
              </p>
            </div>
          </div>

          {/* Auth Form Card */}
          <div className="bg-white border border-slate-200 rounded-md">
            <div className={isSignUp ? "p-5 sm:p-6" : "p-6 sm:p-8"}>
              {isSignUp ? <SignUpForm /> : <LoginForm />}
              
              {/* Switch between Sign In and Sign Up */}
              <div className={isSignUp ? "mt-4 text-center" : "mt-6 text-center"}>
                <p className="text-sm text-slate-600">
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsSignUp(false)}
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        Sign In
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsSignUp(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

