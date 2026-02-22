"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, TrendingUp, CheckCircle, Users, ArrowRight, Plus, Send, FileText } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

const chartData = [
  { month: "Jan", emails: 400, campaigns: 240 },
  { month: "Feb", emails: 520, campaigns: 290 },
  { month: "Mar", emails: 480, campaigns: 320 },
  { month: "Apr", emails: 650, campaigns: 380 },
  { month: "May", emails: 720, campaigns: 420 },
  { month: "Jun", emails: 890, campaigns: 520 },
]

// Types for our email system
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
}

interface CampaignStats {
  totalTemplates: number;
  recentCampaigns: number;
  contactsCount: number;
  successRate: number;
}

export default function DashboardPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaignStats, setCampaignStats] = useState<CampaignStats>({
    totalTemplates: 0,
    recentCampaigns: 0,
    contactsCount: 0,
    successRate: 98
  });
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Fetch templates and stats on component mount
  useEffect(() => {
    fetchTemplates();
    fetchCampaignStats();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/email-templates');
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const fetchCampaignStats = async () => {
    try {
      const res = await fetch('/api/email-campaigns/stats');
      if (res.ok) {
        const data = await res.json();
        setCampaignStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleCreateTemplate = async (templateData: { name: string; subject: string; body: string }) => {
    try {
      const res = await fetch('/api/email-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData),
      });
      
      if (res.ok) {
        setShowTemplateModal(false);
        fetchTemplates();
        fetchCampaignStats();
      }
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's your marketing performance overview.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowTemplateModal(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus size={16} className="mr-2" />
              New Template
            </Button>
            <Button className="bg-success hover:bg-success/90 text-white">
              <Send size={16} className="mr-2" />
              Send Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          {/* Updated Stats Grid with Email Automation Metrics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Email Templates</h3>
                <FileText className="text-primary" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">{campaignStats.totalTemplates}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp size={14} /> Ready to use
              </p>
            </Card>

            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Campaign Success</h3>
                <CheckCircle className="text-success" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">{campaignStats.successRate}%</p>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp size={14} /> Above average
              </p>
            </Card>

            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Active Campaigns</h3>
                <TrendingUp className="text-accent" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">{campaignStats.recentCampaigns}</p>
              <p className="text-xs text-accent flex items-center gap-1">
                <TrendingUp size={14} /> Running
              </p>
            </Card>

            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Contacts</h3>
                <Users className="text-primary-light" size={24} />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">{campaignStats.contactsCount}</p>
              <p className="text-xs text-muted-foreground">In database</p>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Performance Chart */}
            <Card className="border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">Email Performance</h3>
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

          {/* Recent Templates & Quick Actions */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Templates */}
            <Card className="border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Recent Templates</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowTemplateModal(true)}
                >
                  <Plus size={16} className="mr-2" />
                  New Template
                </Button>
              </div>
              <div className="space-y-4">
                {templates.slice(0, 3).map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.subject}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Send size={14} className="mr-1" />
                      Use
                    </Button>
                  </div>
                ))}
                {templates.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No templates yet</p>
                    <Button 
                      variant="link" 
                      onClick={() => setShowTemplateModal(true)}
                      className="mt-2"
                    >
                      Create your first template
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">Quick Actions</h3>
              <div className="grid gap-4">
                <Link href="/dashboard/email-templates">
                  <Button variant="outline" className="w-full justify-between border-border bg-transparent">
                    Manage Templates
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/dashboard/contacts">
                  <Button variant="outline" className="w-full justify-between border-border bg-transparent">
                    Import Contacts
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/dashboard/campaigns">
                  <Button variant="outline" className="w-full justify-between border-border bg-transparent">
                    Launch Campaign
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Template Creation Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Create Email Template</h3>
            <EmailTemplateEditor 
              onSave={handleCreateTemplate}
              onCancel={() => setShowTemplateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Simple Template Editor Component (you can expand this later)
function EmailTemplateEditor({ onSave, onCancel }: { 
  onSave: (data: { name: string; subject: string; body: string }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, subject, body });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-border rounded bg-background"
          placeholder="Welcome Email Template"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-border rounded bg-background"
          placeholder="Hello {{name}} from {{company}}"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          className="w-full p-2 border border-border rounded bg-background"
          placeholder="Dear {{name}}, we noticed you work at {{company}} as {{position}}..."
          required
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Available variables: {"{{name}}"} {"{{company}}"} {"{{position}}"} {"{{email}}"}</p>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
          Create Template
        </Button>
      </div>
    </form>
  );
}