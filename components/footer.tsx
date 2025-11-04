import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <span className="text-sm font-bold text-white">M</span>
              </div>
              <span className="font-bold text-foreground">Marketinglyse</span>
            </div>
            <p className="text-sm text-muted-foreground">Smart Marketing. Verified Leads. Real Results.</p>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Services</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Digital Marketing
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Email Tools
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Brand Strategy
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Company</h4>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
              Contact
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Blog
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Terms of Service
            </Link>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© 2025 Marketinglyse. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition">
              Twitter
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
