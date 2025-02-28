"use client";

import { Button } from "@/components/ui/button";
import { 
  Users, 
  Mail,
  Target,
  LineChart,
  ArrowRight,
  Plus,
  Building,
  Phone
} from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";

const metrics = [
  {
    name: "Lead Pipeline",
    value: "2,459",
    change: "+12.5%",
    icon: Users,
  },
  {
    name: "Qualified Leads",
    value: "856",
    change: "+8.2%",
    icon: Target,
  },
  {
    name: "Response Rate",
    value: "24.8%",
    change: "-2.1%",
    icon: Mail,
  },
  {
    name: "Avg. Deal Size",
    value: "$45,230",
    change: "+15.3%",
    icon: LineChart,
  }
];

const recentLeads = [
  {
    name: "Mark Anderson",
    company: "Quantum Computing Ltd",
    position: "Head of Innovation",
    source: "LinkedIn Outreach",
    score: 92,
    status: "Qualified"
  },
  {
    name: "Rachel Chen",
    company: "AI Solutions Group",
    position: "CTO",
    source: "Website Form",
    score: 78,
    status: "New"
  },
  {
    name: "James Wilson",
    company: "DataFlow Systems",
    position: "VP Engineering",
    source: "Cold Email",
    score: 85,
    status: "In Discussion"
  }
];

const activeOutreach = [
  {
    type: "Cold Email",
    target: "Tech Leaders",
    sent: 1250,
    responses: 186,
    meetings: 45
  },
  {
    type: "LinkedIn",
    target: "CTOs",
    sent: 800,
    responses: 142,
    meetings: 38
  },
  {
    type: "Phone",
    target: "VP Sales",
    sent: 450,
    responses: 85,
    meetings: 24
  }
];

const leadGenChannels = [
  { icon: <Mail className="text-white w-6 h-6" />, color: "neutral", label: "Email Outreach" },
  { icon: <Phone className="text-white w-6 h-6" />, color: "neutral", label: "Cold Calling" },
  { icon: <Building className="text-white w-6 h-6" />, color: "neutral", label: "LinkedIn" },
  { icon: <Target className="text-white w-6 h-6" />, color: "neutral", label: "Campaigns" },
  { icon: <Users className="text-white w-6 h-6" />, color: "neutral", label: "Database" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* header */}
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground">Here's an overview of your lead generation performance</p>
      </div>

      {/* metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <SpotlightCard key={metric.name} className="p-4">
            <div className="flex items-center justify-between">
              <metric.icon className="w-5 h-5" />
              <span className={`text-xs ${metric.change.startsWith('+') ? 'text-foreground' : 'text-muted-foreground'}`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-medium">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{metric.name}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Recent Leads */}
      <SpotlightCard>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent High-Value Leads</h2>
          <Button variant="ghost" size="sm" className="h-8">View All</Button>
        </div>
        <div className="divide-y divide-border">
          {recentLeads.map((lead) => (
            <div key={lead.name} className="p-4 flex items-center justify-between hover:bg-muted/5 transition-colors">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.position} at {lead.company}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{lead.score} / 100</p>
                <p className="text-xs text-muted-foreground">{lead.source}</p>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* active outreach */}
      <SpotlightCard>
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-medium">Active Outreach Campaigns</h2>
        </div>
        <div className="divide-y divide-border">
          {activeOutreach.map((campaign) => (
            <div key={campaign.type} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {campaign.type === "Cold Email" && <Mail className="w-4 h-4" />}
                  {campaign.type === "LinkedIn" && <Users className="w-4 h-4" />}
                  {campaign.type === "Phone" && <Phone className="w-4 h-4" />}
                  <span className="text-sm font-medium">{campaign.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">{campaign.target}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-sm font-medium">{campaign.sent}</p>
                  <p className="text-xs text-muted-foreground">Sent</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{campaign.responses}</p>
                  <p className="text-xs text-muted-foreground">Responses</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{campaign.meetings}</p>
                  <p className="text-xs text-muted-foreground">Meetings</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
} 