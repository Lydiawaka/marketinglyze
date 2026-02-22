import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Logout error:", error)
      return NextResponse.json({ error: "Logout failed" }, { status: 500 })
    }

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    )

    // Clear auth cookies
    response.cookies.set('sb-access-token', '', { maxAge: 0 })
    response.cookies.set('sb-refresh-token', '', { maxAge: 0 })

    return response

  } catch (error) {
    console.error("Unexpected logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}