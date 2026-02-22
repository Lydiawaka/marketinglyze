"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowRight, Eye, EyeOff, Check, AlertCircle } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const passwordStrength = {
    hasLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password),
  }

  const isPasswordStrong = Object.values(passwordStrength).every((v) => v)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!isPasswordStrong || !passwordsMatch) {
      setError("Please ensure your password meets all requirements and matches the confirmation.")
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        setSuccess(true)
        // Show success message and redirect to login after a delay
        setTimeout(() => {
          router.push("/login?message=check-email")
        }, 3000)
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Success state after signup
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Marketinglyse</span>
          </Link>

          <Card className="border border-border bg-card p-8 text-center">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-success" size={32} />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">Check Your Email!</h1>
            
            <p className="text-muted-foreground mb-6">
              We've sent a confirmation link to <strong>{email}</strong>. 
              Please click the link in the email to verify your account and get started.
            </p>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={handleSubmit}
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  resend confirmation
                </button>
              </p>

              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="w-full border-border"
              >
                Go to Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <span className="text-lg font-bold text-white">M</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Marketinglyse</span>
        </Link>

        <Card className="border border-border bg-card p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Start finding verified leads today.</p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-destructive text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background border-border"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-border"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-border pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password && (
                <div className="mt-3 space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Password requirements:</div>
                  <div className="space-y-1">
                    {[
                      { label: "8+ characters", met: passwordStrength.hasLength },
                      { label: "Uppercase letter", met: passwordStrength.hasUppercase },
                      { label: "Number", met: passwordStrength.hasNumber },
                      { label: "Special character", met: passwordStrength.hasSpecial },
                    ].map((req, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-xs ${req.met ? "text-success" : "text-muted-foreground"}`}
                      >
                        <Check size={14} className={req.met ? "" : "opacity-30"} />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-background border-border pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                  disabled={loading}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-destructive mt-2">Passwords don't match</p>
              )}
              {passwordsMatch && (
                <p className="text-xs text-success mt-2 flex items-center gap-1">
                  <Check size={14} /> Passwords match
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="w-4 h-4 rounded border-border accent-primary" 
                required 
                disabled={loading}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:text-primary/90 font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:text-primary/90 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading || !isPasswordStrong || !passwordsMatch}
              className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
              size="lg"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <ArrowRight size={16} />}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border bg-transparent"
              onClick={() => handleSocialSignUp("google")}
              disabled={loading}
            >
              Google
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border bg-transparent"
              onClick={() => handleSocialSignUp("github")}
              disabled={loading}
            >
              GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/90 font-medium">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}