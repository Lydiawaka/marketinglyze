import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${req.headers.get('origin')}/auth/update-password`,
    })

    if (error) {
      console.error("Password reset error:", error)
      // Don't reveal if email exists or not for security
      return NextResponse.json({ 
        success: true, 
        message: "If an account with that email exists, a password reset link has been sent." 
      }, { status: 200 })
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "If an account with that email exists, a password reset link has been sent." 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}