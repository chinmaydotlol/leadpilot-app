"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RiUser3Line,
  RiMailLine,
  RiBellLine,
  RiTeamLine,
  RiIdCardLine,
  RiShieldLine,
  RiGlobalLine,
  RiCheckLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const integrations = [
  {
    name: "Gmail",
    icon: RiMailLine,
    status: "Connected",
    email: "john@company.com",
  },
  {
    name: "LinkedIn",
    icon: RiLinkedinBoxLine,
    status: "Connected",
    email: "John Smith",
  },
  {
    name: "Twitter",
    icon: RiTwitterXLine,
    status: "Not Connected",
    email: "-",
  },
]

const notificationSettings = [
  {
    title: "Email Notifications",
    description: "Receive email notifications for important updates",
    enabled: true,
  },
  {
    title: "Campaign Alerts",
    description: "Get notified when campaigns reach key milestones",
    enabled: true,
  },
  {
    title: "Lead Activity",
    description: "Notifications for new leads and interactions",
    enabled: false,
  },
  {
    title: "Team Updates",
    description: "Stay informed about team member actions",
    enabled: true,
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState(notificationSettings)

  const tabs = [
    { id: "profile", label: "Profile", icon: RiUser3Line },
    { id: "integrations", label: "Integrations", icon: RiMailLine },
    { id: "notifications", label: "Notifications", icon: RiBellLine },
    { id: "team", label: "Team", icon: RiTeamLine },
    { id: "billing", label: "Billing", icon: RiIdCardLine },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Profile Settings */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
            <h2 className="text-lg font-medium text-white mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <Input
                  defaultValue="John Smith"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Email Address</label>
                <Input
                  defaultValue="john@company.com"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Company</label>
                <Input
                  defaultValue="Tech Solutions Inc"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Role</label>
                <Input
                  defaultValue="Sales Manager"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
            <h2 className="text-lg font-medium text-white mb-6">Security</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Current Password</label>
                <Input
                  type="password"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">New Password</label>
                <Input
                  type="password"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Confirm New Password</label>
                <Input
                  type="password"
                  className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "integrations" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                    <integration.icon className="w-6 h-6 text-[#BDD9BF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{integration.name}</h3>
                    <p className="text-sm text-gray-400">{integration.email}</p>
                  </div>
                </div>
                {integration.status === "Connected" ? (
                  <Button
                    variant="outline"
                    className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button className="bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6"
        >
          <h2 className="text-lg font-medium text-white mb-6">Notification Preferences</h2>
          <div className="space-y-6">
            {notifications.map((notification, index) => (
              <div key={notification.title} className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-400">{notification.description}</p>
                </div>
                <Switch
                  checked={notification.enabled}
                  onCheckedChange={(checked: boolean) => {
                    const newNotifications = [...notifications]
                    newNotifications[index].enabled = checked
                    setNotifications(newNotifications)
                  }}
                  className="bg-white/10 data-[state=checked]:bg-[#BDD9BF]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "team" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Team Members</h2>
              <Button className="bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black">
                Invite Member
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { name: "John Smith", role: "Admin", email: "john@company.com" },
                { name: "Sarah Johnson", role: "Member", email: "sarah@company.com" },
                { name: "Mike Brown", role: "Member", email: "mike@company.com" },
              ].map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 flex items-center justify-center">
                      <span className="text-[#BDD9BF] font-medium">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#BDD9BF]">{member.role}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "billing" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
            <h2 className="text-lg font-medium text-white mb-6">Current Plan</h2>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#BDD9BF]/20 text-[#BDD9BF]">
                    Current
                  </span>
                </div>
                <p className="text-gray-400 mt-2">
                  Access to all features including AI tools and team collaboration
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Unlimited campaigns",
                    "Advanced AI features",
                    "Priority support",
                    "Team collaboration",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300">
                      <RiCheckLine className="w-5 h-5 text-[#BDD9BF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">$49</p>
                <p className="text-sm text-gray-400">per user/month</p>
                <Button className="mt-4 bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black">
                  Manage Subscription
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
            <h2 className="text-lg font-medium text-white mb-6">Payment Method</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                  <RiIdCardLine className="w-6 h-6 text-[#BDD9BF]" />
                </div>
                <div>
                  <p className="text-white font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-400">Expires 12/24</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                Update
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
} 