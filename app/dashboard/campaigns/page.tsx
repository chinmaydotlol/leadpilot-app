"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RiSearchLine,
  RiFilter3Line,
  RiAddLine,
  RiMailLine,
  RiPauseLine,
  RiPlayLine,
  RiDeleteBinLine,
  RiBarChartLine,
  RiUserLine,
  RiMailOpenLine,
  RiMailSendLine,
} from "react-icons/ri"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const campaigns = [
  {
    id: 1,
    name: "Q1 SaaS Outreach",
    status: "Active",
    progress: 65,
    stats: {
      total: 1500,
      sent: 975,
      opened: 623,
      replied: 148,
    },
    lastUpdated: "2 hours ago",
    tags: ["SaaS", "Enterprise"],
  },
  {
    id: 2,
    name: "Startup Connect 2024",
    status: "Paused",
    progress: 45,
    stats: {
      total: 800,
      sent: 360,
      opened: 245,
      replied: 52,
    },
    lastUpdated: "1 day ago",
    tags: ["Startup", "Funding"],
  },
  {
    id: 3,
    name: "Tech Decision Makers",
    status: "Draft",
    progress: 0,
    stats: {
      total: 2000,
      sent: 0,
      opened: 0,
      replied: 0,
    },
    lastUpdated: "3 days ago",
    tags: ["Enterprise", "IT"],
  },
]

const statusColors = {
  Active: "bg-green-500/20 text-green-500",
  Paused: "bg-orange-500/20 text-orange-500",
  Draft: "bg-blue-500/20 text-blue-500",
  Completed: "bg-gray-500/20 text-gray-500",
}

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400">Manage your outreach campaigns</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black font-medium shadow-lg shadow-[#BDD9BF]/25 flex items-center gap-2"
        >
          <RiAddLine className="w-5 h-5" />
          New Campaign
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Campaigns", value: "12", icon: RiMailLine },
          { label: "Active Campaigns", value: "4", icon: RiPlayLine },
          { label: "Total Sent", value: "24.5k", icon: RiMailSendLine },
          { label: "Avg. Open Rate", value: "68%", icon: RiMailOpenLine },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                <stat.icon className="w-5 h-5 text-[#BDD9BF]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative">
          <RiSearchLine className="absolute left-4 top-3.5 text-gray-500 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0 transition-all duration-300 hover:bg-white/10"
          />
        </div>
        <div>
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-white gap-2"
          >
            <RiFilter3Line className="w-5 h-5" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">{campaign.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[campaign.status as keyof typeof statusColors]
                    }`}
                  >
                    {campaign.status}
                  </span>
                  <span className="text-sm text-gray-400">
                    Updated {campaign.lastUpdated}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {campaign.status === "Active" ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <RiPauseLine className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <RiPlayLine className="w-5 h-5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <RiBarChartLine className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                >
                  <RiDeleteBinLine className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${campaign.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute h-full bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF]"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total", value: campaign.stats.total, icon: RiUserLine },
                { label: "Sent", value: campaign.stats.sent, icon: RiMailSendLine },
                { label: "Opened", value: campaign.stats.opened, icon: RiMailOpenLine },
                { label: "Replied", value: campaign.stats.replied, icon: RiMailLine },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-lg font-medium text-white mt-1">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              {campaign.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 