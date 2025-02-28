"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronDown,
  Download,
  Users,
  Target,
  Mail,
  Phone,
  Linkedin,
  Building,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";

interface Metric {
  label: string;
  value: string;
  change: number;
  icon: any;
}

interface LeadSource {
  source: string;
  leads: number;
  qualified: number;
  meetings: number;
  conversion: number;
}

interface LeadActivity {
  date: string;
  emails: number;
  calls: number;
  linkedin: number;
}

const metrics: Metric[] = [
  {
    label: "Total Leads",
    value: "2,456",
    change: 12.5,
    icon: Users
  },
  {
    label: "Qualified Leads",
    value: "864",
    change: 8.2,
    icon: Star
  },
  {
    label: "Response Rate",
    value: "18.4%",
    change: -2.1,
    icon: Mail
  },
  {
    label: "Meeting Rate",
    value: "4.2%",
    change: 1.5,
    icon: Calendar
  }
];

const leadSources: LeadSource[] = [
  {
    source: "Cold Email",
    leads: 1245,
    qualified: 425,
    meetings: 98,
    conversion: 7.9
  },
  {
    source: "LinkedIn",
    leads: 856,
    qualified: 312,
    meetings: 76,
    conversion: 8.9
  },
  {
    source: "Cold Calling",
    leads: 355,
    qualified: 127,
    meetings: 45,
    conversion: 12.7
  }
];

const leadActivity: LeadActivity[] = [
  { date: "2024-02-25", emails: 245, calls: 45, linkedin: 78 },
  { date: "2024-02-24", emails: 198, calls: 52, linkedin: 65 },
  { date: "2024-02-23", emails: 276, calls: 38, linkedin: 92 },
  { date: "2024-02-22", emails: 187, calls: 41, linkedin: 84 },
  { date: "2024-02-21", emails: 265, calls: 49, linkedin: 71 }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <SpotlightCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium">Lead Generation Analytics</h2>
            <p className="text-xs text-muted-foreground">Last 30 days performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 hover:bg-muted/50 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 hover:bg-muted/50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </SpotlightCard>

      {/* metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <SpotlightCard key={index} className="p-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className="w-4 h-4" />
              <span className="text-xs font-medium">{metric.label}</span>
            </div>
            <div className="text-2xl font-medium">{metric.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {metric.change > 0 ? (
                <ArrowUpRight className="w-3 h-3 text-foreground" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-muted-foreground" />
              )}
              <span className={`text-xs ${metric.change > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                {Math.abs(metric.change)}% from last month
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* sources table */}
      <SpotlightCard>
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium">Lead Sources</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Source</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Total Leads</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Qualified</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Meetings</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Conversion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leadSources.map((source, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      {source.source === "Cold Email" && <Mail className="w-4 h-4" />}
                      {source.source === "LinkedIn" && <Linkedin className="w-4 h-4" />}
                      {source.source === "Cold Calling" && <Phone className="w-4 h-4" />}
                    </div>
                    <span className="text-sm">{source.source}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{source.leads}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{source.qualified}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{source.meetings}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{source.conversion}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SpotlightCard>

      {/* lead activity */}
      <SpotlightCard>
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium">Recent Activity</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Emails Sent</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Calls Made</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">LinkedIn Messages</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leadActivity.map((activity, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors">
                <td className="py-3 px-4">
                  <span className="text-sm">{activity.date}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{activity.emails}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{activity.calls}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">{activity.linkedin}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SpotlightCard>
    </div>
  );
} 