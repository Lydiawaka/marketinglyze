import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error("Profile fetch error:", profileError)
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: profile?.full_name || user.user_metadata?.full_name || "User",
          email_confirmed: user.email_confirmed_at,
          avatar_url: profile?.avatar_url,
          company: profile?.company,
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ user: null }, { status: 500 })
  }
}