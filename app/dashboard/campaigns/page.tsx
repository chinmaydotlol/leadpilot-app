"use client";

import { Mail, Phone, Target, Users, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpotlightCard from "@/components/ui/spotlight-card";

const campaigns = [
  {
    name: "Tech Leaders Outreach",
    type: "email",
    status: "active",
    metrics: {
      sent: 1250,
      opened: 625,
      responded: 187,
      meetings: 45,
      qualified: 28
    },
    audience: "CTO, VP Engineering, Director IT"
  },
  {
    name: "LinkedIn Decision Makers",
    type: "linkedin",
    status: "active",
    metrics: {
      sent: 850,
      opened: 510,
      responded: 153,
      meetings: 38,
      qualified: 22
    },
    audience: "Founders, CEOs, Business Owners"
  },
  {
    name: "Enterprise Sales Calls",
    type: "call",
    status: "scheduled",
    metrics: {
      sent: 450,
      opened: 450,
      responded: 135,
      meetings: 42,
      qualified: 31
    },
    audience: "VP Sales, Sales Directors"
  }
];

const campaignMetrics = {
  "Total Sent": campaigns.reduce((acc, curr) => acc + curr.metrics.sent, 0),
  "Total Opened": campaigns.reduce((acc, curr) => acc + curr.metrics.opened, 0),
  "Total Responses": campaigns.reduce((acc, curr) => acc + curr.metrics.responded, 0),
  "Total Meetings": campaigns.reduce((acc, curr) => acc + curr.metrics.meetings, 0),
  "Qualified Leads": campaigns.reduce((acc, curr) => acc + curr.metrics.qualified, 0)
};

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lead Generation Campaigns</h1>
          <p className="text-muted-foreground">
            {campaigns.length} active campaigns · {campaigns.reduce((acc, curr) => acc + curr.metrics.qualified, 0)} qualified leads
          </p>
        </div>
        <Button className="hover:scale-[1.02] transition-transform">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* campaign stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(campaignMetrics).map(([label, value], index) => (
          <SpotlightCard key={index} className="p-4 hover:scale-[1.02] transition-transform">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-2xl font-semibold">{value}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search campaigns..."
          className="max-w-sm hover:border-foreground/20 transition-colors"
          type="search"
        />
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign, index) => (
          <SpotlightCard key={index} className="p-6 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{campaign.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-secondary hover:bg-secondary/80 transition-colors">
                  {campaign.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Target Audience</div>
                <p className="text-sm">{campaign.audience}</p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Campaign Metrics</div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="hover:bg-muted/5 p-1 rounded transition-colors">
                    <div className="text-muted-foreground">Sent</div>
                    <div className="font-medium">{campaign.metrics.sent}</div>
                  </div>
                  <div className="hover:bg-muted/5 p-1 rounded transition-colors">
                    <div className="text-muted-foreground">Opened</div>
                    <div className="font-medium">{campaign.metrics.opened}</div>
                  </div>
                  <div className="hover:bg-muted/5 p-1 rounded transition-colors">
                    <div className="text-muted-foreground">Responded</div>
                    <div className="font-medium">{campaign.metrics.responded}</div>
                  </div>
                  <div className="hover:bg-muted/5 p-1 rounded transition-colors">
                    <div className="text-muted-foreground">Meetings</div>
                    <div className="font-medium">{campaign.metrics.meetings}</div>
                  </div>
                  <div className="hover:bg-muted/5 p-1 rounded transition-colors">
                    <div className="text-muted-foreground">Qualified</div>
                    <div className="font-medium">{campaign.metrics.qualified}</div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
} 