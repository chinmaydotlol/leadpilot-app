"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Building,
  Key,
  Shield,
  Bell,
  Code,
  Webhook,
  Settings,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium">Account Settings</h2>
            <p className="text-xs text-muted-foreground">Manage your lead generation preferences</p>
          </div>
        </div>
      </div>

      {/* profile settings */}
      <div className="border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <h3 className="text-sm font-medium">Profile Information</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">Full Name</label>
              <Input placeholder="John Smith" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">Company Name</label>
              <Input placeholder="Acme Inc." />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Business Email</label>
            <Input type="email" placeholder="john@acme.com" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Company Description</label>
            <Textarea placeholder="Brief description of your company and lead generation goals" />
          </div>
        </div>
      </div>

      {/* lead gen settings */}
      <div className="border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            <h3 className="text-sm font-medium">Lead Generation Preferences</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium">Target Industries</label>
            <Input placeholder="e.g. SaaS, FinTech, Healthcare" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Company Size Range</label>
            <Input placeholder="e.g. 50-200 employees" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Target Locations</label>
            <Input placeholder="e.g. US, Canada, UK" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Decision Maker Roles</label>
            <Input placeholder="e.g. CTO, VP Engineering, Director of IT" />
          </div>
        </div>
      </div>

      {/* API integration */}
      <div className="border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <h3 className="text-sm font-medium">API Integration</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium">API Key</label>
            <div className="font-mono text-xs bg-secondary p-2 rounded">
              sk_live_51NxXXXXXXXXXXXXXXXXXXXXX
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">Webhook URL</label>
            <Input placeholder="https://your-domain.com/webhook" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">CRM Integration</div>
                <div className="text-xs text-muted-foreground">Sync leads with your CRM</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Email Integration</div>
                <div className="text-xs text-muted-foreground">Connect with email service</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">LinkedIn Integration</div>
                <div className="text-xs text-muted-foreground">Connect with LinkedIn</div>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>

      {/* notifications */}
      <div className="border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <h3 className="text-sm font-medium">Notification Preferences</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">New Lead Alerts</div>
              <div className="text-xs text-muted-foreground">Get notified when new leads are captured</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Response Notifications</div>
              <div className="text-xs text-muted-foreground">Get notified when leads respond</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Meeting Alerts</div>
              <div className="text-xs text-muted-foreground">Get notified when meetings are scheduled</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Campaign Updates</div>
              <div className="text-xs text-muted-foreground">Get notified about campaign performance</div>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* security */}
      <div className="border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <h3 className="text-sm font-medium">Security Settings</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium">New Password</label>
            <Input type="password" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Two-Factor Authentication</div>
              <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
} 