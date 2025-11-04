"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Mail, Check, ArrowRight, Upload } from "lucide-react"
import { useState } from "react"

export default function ToolsPage() {
  const [finderDomain, setFinderDomain] = useState("")
  const [finderResults, setFinderResults] = useState<any[]>([])
  const [finderSearching, setFinderSearching] = useState(false)

  const [verifyEmails, setVerifyEmails] = useState("")
  const [verifyResults, setVerifyResults] = useState<any[]>([])
  const [verifyingEmails, setVerifyingEmails] = useState(false)

  const handleFindEmails = () => {
    if (!finderDomain.trim()) return

    setFinderSearching(true)
    // Simulate API call
    setTimeout(() => {
      setFinderResults([
        { email: "john.doe@" + finderDomain, name: "John Doe", role: "CEO", verified: true },
        { email: "jane.smith@" + finderDomain, name: "Jane Smith", role: "Marketing Lead", verified: true },
        { email: "contact@" + finderDomain, name: "Support", role: "General Contact", verified: true },
      ])
      setFinderSearching(false)
    }, 1500)
  }

  const handleVerifyEmails = () => {
    if (!verifyEmails.trim()) return

    setVerifyingEmails(true)
    const emails = verifyEmails.split("\n").filter((e) => e.trim())

    // Simulate API call
    setTimeout(() => {
      setVerifyResults(
        emails.map((email, idx) => ({
          email,
          status: Math.random() > 0.15 ? "valid" : "invalid",
          score: Math.random() > 0.15 ? 0.98 : 0.35,
        })),
      )
      setVerifyingEmails(false)
    }, 1500)
  }

  const validCount = verifyResults.filter((r) => r.status === "valid").length
  const successRate = verifyResults.length > 0 ? ((validCount / verifyResults.length) * 100).toFixed(1) : 0

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative bg-gradient-to-br from-primary/10 to-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl mb-4 text-balance">
              Email Finder & Verification Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Find verified emails by company domain and verify bulk email lists with 98% accuracy.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="finder" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-8 bg-secondary">
                <TabsTrigger value="finder" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Mail size={18} className="mr-2" />
                  Email Finder
                </TabsTrigger>
                <TabsTrigger value="verify" className="data-[state=active]:bg-success data-[state=active]:text-white">
                  <Check size={18} className="mr-2" />
                  Email Verifier
                </TabsTrigger>
              </TabsList>

              {/* Email Finder Tab */}
              <TabsContent value="finder" className="space-y-8">
                <Card className="border border-border bg-card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Find Email Addresses</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Company Domain</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="e.g., example.com"
                          value={finderDomain}
                          onChange={(e) => setFinderDomain(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleFindEmails()}
                          className="flex-1 bg-background border-border"
                        />
                        <Button
                          onClick={handleFindEmails}
                          disabled={finderSearching || !finderDomain.trim()}
                          className="bg-primary hover:bg-primary/90 text-white"
                          size="lg"
                        >
                          {finderSearching ? "Searching..." : "Find Emails"}
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>

                    {finderResults.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-border">
                        <h3 className="font-bold text-foreground mb-4">Found {finderResults.length} Email(s)</h3>
                        <div className="space-y-3">
                          {finderResults.map((result, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                            >
                              <div>
                                <p className="font-medium text-foreground">{result.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  {result.name} • {result.role}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Check size={20} className="text-success" />
                                <span className="text-sm font-medium text-success">Verified</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                          <ArrowRight size={16} className="mr-2" />
                          Export as CSV
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="border border-border bg-background p-6">
                  <h3 className="font-bold text-foreground mb-4">How Email Finder Works</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
                      <span>Enter a company domain to search for employee email addresses</span>
                    </li>
                    <li className="flex gap-3">
                      <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
                      <span>All results are verified and cross-referenced with company data</span>
                    </li>
                    <li className="flex gap-3">
                      <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
                      <span>Export unlimited results in CSV format</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>

              {/* Email Verifier Tab */}
              <TabsContent value="verify" className="space-y-8">
                <Card className="border border-border bg-card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Verify Email Addresses</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Addresses (one per line)
                      </label>
                      <textarea
                        placeholder="john@example.com&#10;jane@example.com&#10;contact@company.com"
                        value={verifyEmails}
                        onChange={(e) => setVerifyEmails(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleVerifyEmails}
                        disabled={verifyingEmails || !verifyEmails.trim()}
                        className="flex-1 bg-success hover:bg-success/90 text-white"
                        size="lg"
                      >
                        {verifyingEmails ? "Verifying..." : "Verify Emails"}
                        <Check size={16} />
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                        <Upload size={16} className="mr-2" />
                        Upload CSV
                      </Button>
                    </div>

                    {verifyResults.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-border">
                        <div className="grid gap-4 md:grid-cols-3 mb-6">
                          <div className="p-4 rounded-lg bg-background border border-border">
                            <p className="text-sm text-muted-foreground mb-1">Total Emails</p>
                            <p className="text-2xl font-bold text-foreground">{verifyResults.length}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-background border border-success/30">
                            <p className="text-sm text-muted-foreground mb-1">Valid</p>
                            <p className="text-2xl font-bold text-success">{validCount}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-background border border-accent/30">
                            <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                            <p className="text-2xl font-bold text-accent">{successRate}%</p>
                          </div>
                        </div>

                        <h3 className="font-bold text-foreground mb-4">Results</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {verifyResults.map((result, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-background rounded border border-border text-sm"
                            >
                              <span className="text-foreground">{result.email}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16">
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${result.status === "valid" ? "bg-success" : "bg-destructive"}`}
                                      style={{ width: `${result.score * 100}%` }}
                                    />
                                  </div>
                                </div>
                                <span
                                  className={`font-medium ${result.status === "valid" ? "text-success" : "text-destructive"}`}
                                >
                                  {(result.score * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                          <ArrowRight size={16} className="mr-2" />
                          Export Results
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="border border-border bg-background p-6">
                  <h3 className="font-bold text-foreground mb-4">How Email Verifier Works</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
                      <span>Paste or upload email addresses for bulk verification</span>
                    </li>
                    <li className="flex gap-3">
                      <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
                      <span>Advanced algorithms verify deliverability and validity</span>
                    </li>
                    <li className="flex gap-3">
                      <Check size={20} className="text-success flex-shrink-0 mt-0.5" />
                      <span>Get instant results with confidence scores</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-card border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Our Tools?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "98% Accuracy", desc: "Industry-leading verification accuracy" },
                { title: "Real-time Results", desc: "Instant verification and email discovery" },
                { title: "Easy Export", desc: "Download results in CSV format" },
                { title: "24/7 Support", desc: "Expert support whenever you need it" },
                { title: "Bulk Processing", desc: "Verify thousands of emails at once" },
                { title: "API Access", desc: "Integrate with your existing tools" },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-border bg-background">
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to find and verify leads?</h2>
            <p className="text-lg text-muted-foreground mb-8">Sign up now to get started with our email tools.</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Create Free Account
              <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
