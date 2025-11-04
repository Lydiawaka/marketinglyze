"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
        <div className="hidden md:flex items-center gap-8 text-background">
          <Link href="/services" className="text-sm font-medium hover:text-foreground transition">
            Services
          </Link>
          <Link href="/tools" className="text-sm font-medium hover:text-foreground transition">
            Tools
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-foreground transition">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-foreground transition">
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-white hover:bg-primary/90 text-primary">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="flex flex-col gap-3 px-4 py-4">
            <Link href="/services" className="text-sm font-medium text-foreground">
              Services
            </Link>
            <Link href="/tools" className="text-sm font-medium text-foreground">
              Tools
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground">
              Contact
            </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
