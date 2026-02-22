"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BarChart3, Mail, Zap } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {

   const paragraphs = [
    "Marketinglyse helps brands grow smarter with AI-powered strategies that amplify performance and engagement.",
    "We merge creativity with analytics; turning your marketing data into actionable insights for real results.",
    "From email campaigns to lead generation, Marketinglyse ensures your brand stays visible, valuable, and ahead of the curve."
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % paragraphs.length)
    }, 4000) // switch every 4 seconds
    return () => clearInterval(interval)
  }, [paragraphs.length])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12 items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                  <Zap size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Smart Marketing Platform</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                  Smart Marketing. Verified Leads. Real Results.
                </h1>

                <p className="text-lg text-muted-foreground max-w-md text-pretty">
                  Combine creative marketing strategy with intelligent data tools. Find verified emails, optimize
                  campaigns, and grow your business.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/tools">
                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                      Start Finding Leads
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link href="#services">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                      Explore Services
                    </Button>
                  </Link>
                </div>
              </div>

             <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <Card className="relative border-primary/20 bg-white/50 backdrop-blur p-8 overflow-hidden">
                <div className="space-y-6 relative z-10">
                  {/* Title */}
                  <motion.h2
                    className="text-2xl font-bold text-primary"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    Marketinglyse
                  </motion.h2>

                  {/* Sliding paragraphs */}
                  <div className="h-20 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={index}
                        className="absolute text-muted-foreground text-sm leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        {paragraphs[index]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Moving text line */}
                  <motion.div
                    className="text-primary font-medium text-sm"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                     Empowering digital growth, one strategy at a time.
                  </motion.div>

                  {/* Decorative bars */}
                  <div className="pt-4 flex gap-2">
                    <div className="h-2 flex-1 rounded bg-success/50" />
                    <div className="h-2 flex-1 rounded bg-accent/50" />
                    <div className="h-2 flex-1 rounded bg-primary/50" />
                  </div>
                </div>
              </Card>
            </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to grow your business online
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Digital Marketing */}
              <Card className="border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Digital Marketing</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  SEO, Google & Meta Ads, social media management, content creation, and conversion optimization.
                </p>
                <Link href="/services" className="inline-flex items-center text-primary font-medium text-sm">
                  Learn more <ArrowRight size={16} />
                </Link>
              </Card>

              {/* Email Tools */}
              <Card className="border border-border bg-card hover:border-success/50 transition-all hover:shadow-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 mb-4">
                  <Mail className="text-success" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email Finder & Verification</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Find verified emails by domain, verify bulk lists, and export results with success metrics.
                </p>
                <Link href="/tools" className="inline-flex items-center text-success font-medium text-sm">
                  Try tools <ArrowRight size={16} />
                </Link>
              </Card>

              {/* Analytics */}
              <Card className="border border-border bg-card hover:border-accent/50 transition-all hover:shadow-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <BarChart3 className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Analytics & Insights</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Marketing dashboards, ROI tracking, campaign analytics, and competitor analysis reports.
                </p>
                <Link href="/services" className="inline-flex items-center text-success font-medium text-sm">
                  View more <ArrowRight size={16} />
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 sm:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Verified Emails Daily</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">98%</div>
                <p className="text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-muted-success mb-2">500+</div>
                <p className="text-muted-foreground">Active Clients</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">Ready to grow your business?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of businesses using Marketinglyse to find leads and optimize campaigns.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Get Started Free
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
