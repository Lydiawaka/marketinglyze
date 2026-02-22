"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    setIsOpen(false)
  }

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-black">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Loading skeleton */}
          <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
        </nav>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
            <span className="text-sm font-bold text-primary">M</span>
          </div>
          <span className="text-xl font-bold text-white">Marketinglyse</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-gray-300 transition">
                Dashboard
              </Link>
              <Link href="/tools" className="text-sm font-medium hover:text-gray-300 transition">
                Tools
              </Link>
              <Link href="/email-templates" className="text-sm font-medium hover:text-gray-300 transition">
                Email Templates
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium hover:text-gray-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button size="sm" className="bg-white hover:bg-gray-200 text-black">
                  Go to Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white border-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-700 bg-black">
          <div className="flex flex-col gap-3 px-4 py-4">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/tools" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Tools
                </Link>
                <Link 
                  href="/email-templates" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Email Templates
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-white text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/services" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/tools" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Tools
                </Link>
                <Link 
                  href="/about" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-sm font-medium text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
            <div className="flex gap-2 pt-2">
              {user ? (
                <>
                  <Link href="/dashboard" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full bg-white hover:bg-gray-200 text-black">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-white border-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-white border-white">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full bg-white hover:bg-gray-200 text-black">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}