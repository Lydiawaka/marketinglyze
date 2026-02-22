import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    const supabase = createClient()

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error("Error checking existing user:", checkError)
      return NextResponse.json({ error: "Error checking user existence" }, { status: 500 })
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${req.headers.get('origin')}/auth/callback`,
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Create user profile in database
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email,
          full_name: name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

    if (profileError) {
      console.error("Profile creation error:", profileError)
      
      // If profile creation fails, try to delete the auth user to maintain consistency
      await supabase.auth.admin.deleteUser(authData.user.id)
      
      return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name: name,
          email_confirmed: authData.user.email_confirmed_at,
        },
        message: authData.user.email_confirmed_at 
          ? "Account created successfully" 
          : "Confirmation email sent. Please check your inbox."
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}