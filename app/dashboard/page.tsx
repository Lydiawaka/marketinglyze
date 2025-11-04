"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, TrendingUp, CheckCircle, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", emails: 400, campaigns: 240 },
  { month: "Feb", emails: 520, campaigns: 290 },
  { month: "Mar", emails: 480, campaigns: 320 },
  { month: "Apr", emails: 650, campaigns: 380 },
  { month: "May", emails: 720, campaigns: 420 },
  { month: "Jun", emails: 890, campaigns: 520 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's your marketing performance overview.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">New Campaign</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Verified Emails</h3>
                <Mail className="text-primary" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">2,847</p>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp size={14} /> +12% this month
              </p>
            </Card>

            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
                <CheckCircle className="text-success" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">98%</p>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp size={14} /> Above average
              </p>
            </Card>

            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Active Campaigns</h3>
                <TrendingUp className="text-accent" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">5</p>
              <p className="text-xs text-accent flex items-center gap-1">
                <TrendingUp size={14} /> Running
              </p>
            </Card>

            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
                <Users className="text-primary-light" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">3</p>
              <p className="text-xs text-muted-foreground">1 awaiting invite</p>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Finder Chart */}
            <Card className="border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">Emails Found</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="emails"
                    stroke="var(--primary)"
                    dot={{ fill: "var(--primary)" }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Campaign Performance Chart */}
            <Card className="border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">Campaign Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="campaigns" fill="var(--success)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/dashboard/tools">
                <Button variant="outline" className="w-full justify-between border-border bg-transparent">
                  Find Emails
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/dashboard/tools">
                <Button variant="outline" className="w-full justify-between border-border bg-transparent">
                  Verify List
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/dashboard/campaigns">
                <Button variant="outline" className="w-full justify-between border-border bg-transparent">
                  New Campaign
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
