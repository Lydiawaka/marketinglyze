"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const emailData = [
  { date: "1 Jan", found: 120, verified: 118 },
  { date: "5 Jan", found: 240, verified: 235 },
  { date: "10 Jan", found: 380, verified: 372 },
  { date: "15 Jan", found: 420, verified: 410 },
  { date: "20 Jan", found: 580, verified: 567 },
  { date: "25 Jan", found: 720, verified: 705 },
  { date: "30 Jan", found: 890, verified: 872 },
]

const campaignData = [
  { name: "SEO", value: 32, fill: "#7F56D9" },
  { name: "Paid Ads", value: 28, fill: "#22C55E" },
  { name: "Social", value: 25, fill: "#F97316" },
  { name: "Email", value: 15, fill: "#3B82F6" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your marketing performance and metrics.</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: "Total Emails", value: "8,942", change: "+45%" },
              { label: "Verified Rate", value: "98%", change: "+2%" },
              { label: "Campaign ROI", value: "3.2x", change: "+12%" },
              { label: "Team Growth", value: "+3", change: "This month" },
            ].map((metric, idx) => (
              <Card key={idx} className="border border-border bg-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{metric.label}</h3>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <p className="text-xs text-success mt-2">{metric.change}</p>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <Tabs defaultValue="emails" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="emails" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Email Metrics
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Campaign Breakdown
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emails" className="space-y-6">
              <Card className="border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Emails Found vs Verified (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={emailData}>
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
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="found"
                      stackId="1"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="verified"
                      stackId="1"
                      stroke="var(--success)"
                      fill="var(--success)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border border-border bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground mb-6">Campaign Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={campaignData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={100}
                        fill="var(--primary)"
                        dataKey="value"
                      >
                        {campaignData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="border border-border bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground mb-6">Performance Summary</h3>
                  <div className="space-y-4">
                    {[
                      { label: "SEO", leads: 1240, rate: "32%", color: "bg-primary" },
                      { label: "Paid Ads", leads: 980, rate: "28%", color: "bg-success" },
                      { label: "Social Media", leads: 750, rate: "25%", color: "bg-accent" },
                      { label: "Email", leads: 420, rate: "15%", color: "bg-primary-light" },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {item.leads} leads • {item.rate}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: item.rate }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
