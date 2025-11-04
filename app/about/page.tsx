"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Target, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We help businesses grow online by combining creative marketing with intelligent data tools.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your success is our success. We build long-term partnerships with our clients.",
    },
    {
      icon: Lightbulb,
      title: "Innovative",
      description: "Constantly evolving our tools and strategies to stay ahead of market trends.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative bg-gradient-to-br from-primary/10 to-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl mb-4 text-balance">About Marketinglyse</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">Smart Marketing. Verified Leads. Real Results.</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Marketinglyse was founded with a simple belief: businesses should have access to powerful marketing
                tools and expert guidance without breaking the bank.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We noticed a gap in the market where small to medium-sized businesses couldn't afford enterprise-level
                marketing solutions or struggled to find verified leads. We built Marketinglyse to bridge that gap with
                intelligent email verification, data-driven insights, and accessible marketing services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to serve over 500+ active clients, helping them find verified leads and optimize
                their marketing campaigns for real growth.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24 bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Core Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <Card key={idx} className="border border-border bg-background p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="text-primary" size={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Active Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-success mb-2">10K+</div>
                <p className="text-muted-foreground">Emails Verified Daily</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <p className="text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Join our growing community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start using Marketinglyse to find leads and optimize your marketing campaigns.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
