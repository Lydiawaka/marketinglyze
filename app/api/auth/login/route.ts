import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createClient()

    // Sign in user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error("Login error:", authError)
      
      // Provide more specific error messages
      if (authError.message.includes("Invalid login credentials")) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
      if (authError.message.includes("Email not confirmed")) {
        return NextResponse.json({ 
          error: "Please verify your email address before logging in" 
        }, { status: 401 })
      }
      if (authError.message.includes("too many requests")) {
        return NextResponse.json({ 
          error: "Too many login attempts. Please try again later." 
        }, { status: 429 })
      }
      
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Login failed" }, { status: 500 })
    }

    // Get user profile from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      console.error("Profile fetch error:", profileError)
      // Continue even if profile fetch fails, as auth is successful
    }

    // Set session cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name: profile?.full_name || authData.user.user_metadata?.full_name || "User",
          email_confirmed: authData.user.email_confirmed_at,
          avatar_url: profile?.avatar_url,
          company: profile?.company,
        },
        session: {
          access_token: authData.session?.access_token,
          expires_at: authData.session?.expires_at,
        },
        message: "Login successful"
      },
      { status: 200 },
    )

    // Set auth cookies if session exists
    if (authData.session) {
      await supabase.auth.setSession(authData.session)
    }

    return response

  } catch (error) {
    console.error("Unexpected login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}