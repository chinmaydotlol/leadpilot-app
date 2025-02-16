"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RiBarChartLine,
  RiMailLine,
  RiUserLine,
  RiTimeLine,
  RiPieChartLine,
  RiLineChartLine,
  RiDownloadLine,
  RiCalendarLine,
  RiMailOpenLine,
  RiThumbUpLine,
  RiRefreshLine,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"

const metrics = {
  overview: {
    totalLeads: "12.5k",
    activeLeads: "8.2k",
    totalCampaigns: "24",
    avgResponseRate: "28%",
  },
  performance: {
    emailsSent: "45.2k",
    emailsOpened: "32.1k",
    emailsReplied: "12.6k",
    avgOpenRate: "71%",
    avgReplyRate: "28%",
    avgResponseTime: "6h",
  },
  trends: {
    daily: [65, 72, 68, 75, 82, 78, 80],
    weekly: [420, 380, 450, 460, 380, 420, 440],
    monthly: [1200, 1400, 1350, 1250, 1500, 1600],
  },
}

const timeRanges = ["Last 7 days", "Last 30 days", "Last 3 months", "Last 6 months", "Custom"]

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("Last 7 days")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Track your outreach performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-white/5 hover:bg-white/10 border-white/10 text-white gap-2"
          >
            <RiDownloadLine className="w-5 h-5" />
            Export
          </Button>
          <Button
            variant="outline"
            className="bg-white/5 hover:bg-white/10 border-white/10 text-white gap-2"
          >
            <RiRefreshLine className="w-5 h-5" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {timeRanges.map((range) => (
          <Button
            key={range}
            variant={selectedRange === range ? "default" : "outline"}
            onClick={() => setSelectedRange(range)}
            className={
              selectedRange === range
                ? "bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }
          >
            {range}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Leads", value: metrics.overview.totalLeads, icon: RiUserLine },
          { label: "Active Leads", value: metrics.overview.activeLeads, icon: RiPieChartLine },
          { label: "Total Campaigns", value: metrics.overview.totalCampaigns, icon: RiBarChartLine },
          { label: "Avg. Response Rate", value: metrics.overview.avgResponseRate, icon: RiLineChartLine },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6"
        >
          <h3 className="text-lg font-medium text-white mb-6">Email Performance</h3>
          <div className="space-y-6">
            {[
              { label: "Emails Sent", value: metrics.performance.emailsSent, icon: RiMailLine },
              { label: "Emails Opened", value: metrics.performance.emailsOpened, icon: RiMailOpenLine },
              { label: "Emails Replied", value: metrics.performance.emailsReplied, icon: RiThumbUpLine },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                  <metric.icon className="w-5 h-5 text-[#BDD9BF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{metric.label}</p>
                  <p className="text-lg font-medium text-white">{metric.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#BDD9BF]">+12.5%</p>
                  <p className="text-xs text-gray-400">vs last period</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6"
        >
          <h3 className="text-lg font-medium text-white mb-6">Response Metrics</h3>
          <div className="space-y-6">
            {[
              { label: "Average Open Rate", value: metrics.performance.avgOpenRate, icon: RiMailOpenLine },
              { label: "Average Reply Rate", value: metrics.performance.avgReplyRate, icon: RiThumbUpLine },
              { label: "Average Response Time", value: metrics.performance.avgResponseTime, icon: RiTimeLine },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                  <metric.icon className="w-5 h-5 text-[#BDD9BF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{metric.label}</p>
                  <p className="text-lg font-medium text-white">{metric.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#BDD9BF]">+8.3%</p>
                  <p className="text-xs text-gray-400">vs last period</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Campaign Calendar</h3>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/5 hover:bg-white/10 border-white/10 text-white gap-2"
          >
            <RiCalendarLine className="w-4 h-4" />
            View Calendar
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Q1 SaaS Outreach", date: "Today, 2:00 PM", status: "Active" },
            { name: "Startup Connect", date: "Tomorrow, 10:00 AM", status: "Scheduled" },
            { name: "Enterprise Follow-up", date: "Feb 15, 3:00 PM", status: "Draft" },
          ].map((campaign) => (
            <div
              key={campaign.name}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <p className="font-medium text-white">{campaign.name}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-400">{campaign.date}</p>
                <span className="px-2 py-1 text-xs rounded-full bg-[#BDD9BF]/20 text-[#BDD9BF]">
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
} 