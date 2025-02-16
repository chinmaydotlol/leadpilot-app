"use client"

import { motion } from "framer-motion"
import { RiUserLine, RiMailLine, RiBarChartLine, RiRocketLine } from "react-icons/ri"

const stats = [
  {
    name: "Total Leads",
    value: "2,543",
    change: "+12.3%",
    icon: RiUserLine,
  },
  {
    name: "Active Campaigns",
    value: "8",
    change: "+2",
    icon: RiRocketLine,
  },
  {
    name: "Email Opens",
    value: "67.2%",
    change: "+5.4%",
    icon: RiMailLine,
  },
  {
    name: "Conversion Rate",
    value: "12.3%",
    change: "+2.1%",
    icon: RiBarChartLine,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black font-medium shadow-lg shadow-[#BDD9BF]/25"
        >
          New Campaign
        </motion.button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={item}
            className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                <stat.icon className="w-5 h-5 text-[#BDD9BF]" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-[#BDD9BF]">{stat.change}</span>
              <span className="text-sm text-gray-400 ml-1">vs last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={item}
          className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10"
        >
          <h2 className="text-lg font-medium text-white mb-4">Recent Campaigns</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">Q4 Outreach Campaign</p>
                  <p className="text-sm text-gray-400">1,234 leads • 67% open rate</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#BDD9BF]/20 text-[#BDD9BF]">
                  Active
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10"
        >
          <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Import Leads",
              "Create Template",
              "Schedule Campaign",
              "View Reports",
            ].map((action) => (
              <motion.button
                key={action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
              >
                <p className="text-white font-medium">{action}</p>
                <p className="text-sm text-gray-400">Click to start</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 