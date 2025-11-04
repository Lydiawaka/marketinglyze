"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, BarChart3, PenTool, TrendingUp, Search } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "Digital Marketing",
      icon: TrendingUp,
      color: "text-primary",
      items: [
        "SEO (Search Engine Optimization)",
        "Google & Meta Ads Management",
        "Social Media Strategy & Management",
        "Content Creation & Scheduling",
        "Conversion Rate Optimization",
        "Influencer Campaign Management",
      ],
    },
    {
      title: "Email Finder & Verification",
      icon: Search,
      color: "text-success",
      items: [
        "Find emails by domain or company",
        "Bulk email verification",
        "Success rate analytics",
        "Verified contact database",
        "CSV export & integration",
        "Real-time verification API",
      ],
    },
    {
      title: "Brand Strategy & Design",
      icon: PenTool,
      color: "text-accent",
      items: [
        "Logo design & brand identity",
        "Brand guidelines & style guides",
        "Visual design for campaigns",
        "Brand messaging strategy",
        "Marketing collateral design",
        "Digital asset creation",
      ],
    },
    {
      title: "Analytics & Insights",
      icon: BarChart3,
      color: "text-primary",
      items: [
        "Marketing performance dashboards",
        "ROI & conversion tracking",
        "Campaign analytics & reporting",
        "Competitor analysis",
        "AI-powered insights",
        "Custom reporting",
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative bg-gradient-to-br from-primary/10 to-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl mb-4 text-balance">
              Comprehensive Marketing Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From digital marketing to email verification, we provide everything you need to find customers and
              optimize your campaigns.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, idx) => {
                const Icon = service.icon
                return (
                  <Card key={idx} className="border border-border bg-card p-8 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-muted">
                        <Icon className={`${service.color}`} size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">Learn More</Button>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">How Our Services Work</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple, transparent process to get results
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "1", title: "Discovery", desc: "We analyze your business and goals" },
                { step: "2", title: "Strategy", desc: "Develop a custom marketing plan" },
                { step: "3", title: "Execution", desc: "Implement campaigns and tools" },
                { step: "4", title: "Optimize", desc: "Track results and continuously improve" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a consultation or start using our tools today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/tools">
                <Button size="lg" variant="outline">
                  Try Email Tools
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
