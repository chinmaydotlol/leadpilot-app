"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Search,
  Filter,
  Building,
  Mail,
  Phone,
  Star
} from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";

type LeadStatus = "new" | "contacted" | "meeting" | "qualified" | "lost";

interface Lead {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  status: LeadStatus;
  score: number;
  lastContact: string;
  source: string;
  notes: string;
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Alex Thompson",
    company: "Neural Dynamics",
    position: "Head of Engineering",
    email: "alex@neuraldynamics.ai",
    phone: "+1 (415) 555-0123",
    status: "qualified",
    score: 92,
    lastContact: "2024-02-25",
    source: "LinkedIn",
    notes: "Interested in AI-powered lead scoring"
  },
  {
    id: "2",
    name: "Maya Patel",
    company: "CloudScale Systems",
    position: "VP Technology",
    email: "maya@cloudscale.com",
    phone: "+1 (408) 555-0456",
    status: "meeting",
    score: 88,
    lastContact: "2024-02-24",
    source: "Referral",
    notes: "Meeting scheduled for next week"
  },
  {
    id: "3",
    name: "David Kim",
    company: "Quantum Solutions",
    position: "CTO",
    email: "david@quantumsolutions.tech",
    phone: "+1 (650) 555-0789",
    status: "contacted",
    score: 75,
    lastContact: "2024-02-23",
    source: "Cold Email",
    notes: "Follow-up needed"
  },
  {
    id: "4",
    name: "Sarah Chen",
    company: "DataFlow Inc",
    position: "Director of Innovation",
    email: "sarah@dataflow.io",
    phone: "+1 (628) 555-0147",
    status: "new",
    score: 82,
    lastContact: "2024-02-22",
    source: "Website",
    notes: "Requested product demo"
  }
];

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lead Pipeline</h1>
          <p className="text-muted-foreground">
            {leads.length} active leads · {leads.filter(lead => lead.status === "meeting").length} scheduled meetings
          </p>
        </div>
        <Button className="hover:scale-[1.02] transition-transform">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* search and filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search by name, company, or position..."
          className="max-w-sm hover:border-foreground/20 transition-colors"
          type="search"
        />
        <Button variant="outline" className="hover:bg-muted/50 transition-colors">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Leads Table */}
      <SpotlightCard className="rounded-xl overflow-hidden hover:border-foreground/20 transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Position</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Score</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Source</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/5 transition-colors cursor-pointer">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </div>
                  </td>
                  <td className="p-4">{lead.company}</td>
                  <td className="p-4">{lead.position}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-secondary hover:bg-secondary/80 transition-colors">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {lead.score}
                    </div>
                  </td>
                  <td className="p-4">{lead.source}</td>
                  <td className="p-4 text-sm text-muted-foreground">{lead.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SpotlightCard>
    </div>
  );
} 