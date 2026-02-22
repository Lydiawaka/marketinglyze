import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

// Server component header for initial render
export function HeaderServer() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
            <span className="text-sm font-bold text-black">M</span>
          </div>
          <span className="text-xl font-bold text-white">Marketinglyse</span>
        </Link>

        {/* Desktop Menu - Simple version for server */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <Link href="/services" className="text-sm font-medium hover:text-gray-300 transition">
            Services
          </Link>
          <Link href="/tools" className="text-sm font-medium hover:text-gray-300 transition">
            Tools
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-gray-300 transition">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-gray-300 transition">
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons - Simple version */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white border-white">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-white hover:bg-gray-200 text-black">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button - Simple */}
        <div className="md:hidden text-white">
          <Menu size={24} />
        </div>
      </nav>
    </header>
  )
}