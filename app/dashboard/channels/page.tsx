"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RiMailLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiAddLine,
  RiRefreshLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiMailSendLine,
  RiUserLine,
  RiTimeLine,
  RiSettings3Line,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"

const channels = [
  {
    id: "email",
    name: "Email",
    icon: RiMailLine,
    status: "Connected",
    type: "Gmail",
    account: "john@company.com",
    stats: {
      sent: "12.5k",
      delivered: "12.1k",
      opened: "8.2k",
      replied: "2.1k",
    },
    limits: {
      daily: 500,
      used: 342,
    },
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: RiLinkedinBoxLine,
    status: "Connected",
    type: "Sales Navigator",
    account: "John Smith",
    stats: {
      sent: "450",
      accepted: "286",
      responded: "164",
      pending: "89",
    },
    limits: {
      daily: 100,
      used: 45,
    },
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: RiTwitterXLine,
    status: "Not Connected",
    type: "Professional",
    account: "-",
    stats: {
      sent: "0",
      delivered: "0",
      opened: "0",
      replied: "0",
    },
    limits: {
      daily: 0,
      used: 0,
    },
  },
]

const statusColors = {
  Connected: "bg-green-500/20 text-green-500",
  "Not Connected": "bg-red-500/20 text-red-500",
  "Rate Limited": "bg-orange-500/20 text-orange-500",
}

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Multi-Channel</h1>
          <p className="text-gray-400">Manage your outreach channels</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black font-medium shadow-lg shadow-[#BDD9BF]/25 flex items-center gap-2"
        >
          <RiAddLine className="w-5 h-5" />
          Connect Channel
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {channels.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                  <channel.icon className="w-6 h-6 text-[#BDD9BF]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{channel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[channel.status as keyof typeof statusColors]
                      }`}
                    >
                      {channel.status}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
              >
                <RiSettings3Line className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-400">Account</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-white">{channel.account}</p>
                {channel.status === "Connected" ? (
                  <RiCheckLine className="w-5 h-5 text-green-500" />
                ) : (
                  <RiErrorWarningLine className="w-5 h-5 text-red-500" />
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">{channel.type}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(channel.stats).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-gray-400 capitalize">{key}</p>
                  <p className="text-lg font-medium text-white mt-1">{value}</p>
                </div>
              ))}
            </div>

            {channel.status === "Connected" && (
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Daily Limit Usage</span>
                  <span className="text-white">
                    {channel.limits.used}/{channel.limits.daily}
                  </span>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(channel.limits.used / channel.limits.daily) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF]"
                  />
                </div>
              </div>
            )}

            {channel.status === "Not Connected" && (
              <Button
                className="w-full mt-4 bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 text-[#BDD9BF] hover:from-[#9FC5A0]/30 hover:to-[#BDD9BF]/30"
              >
                Connect {channel.name}
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Recent Activity</h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <RiRefreshLine className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {[
            {
              channel: "Email",
              icon: RiMailSendLine,
              action: "Campaign 'Q1 Outreach' sent",
              time: "2 hours ago",
            },
            {
              channel: "LinkedIn",
              icon: RiUserLine,
              action: "15 new connections accepted",
              time: "4 hours ago",
            },
            {
              channel: "Email",
              icon: RiTimeLine,
              action: "Daily limit reset",
              time: "6 hours ago",
            },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                <activity.icon className="w-5 h-5 text-[#BDD9BF]" />
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.channel}</p>
              </div>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 