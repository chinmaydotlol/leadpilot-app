"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RiRobot2Line,
  RiMagicLine,
  RiMailLine,
  RiTimeLine,
  RiTranslate2,
  RiFileTextLine,
  RiBarChart2Line,
  RiPulseLine,
  RiLockLine,
  RiStarLine,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const aiTools = [
  {
    id: "email-writer",
    name: "Email Writer",
    description: "Generate personalized cold emails based on lead data",
    icon: RiMailLine,
    isPro: false,
    stats: {
      used: 145,
      limit: 200,
    },
  },
  {
    id: "smart-scheduler",
    name: "Smart Scheduler",
    description: "AI-powered timing optimization for maximum engagement",
    icon: RiTimeLine,
    isPro: true,
    stats: {
      used: 0,
      limit: 100,
    },
  },
  {
    id: "content-generator",
    name: "Content Generator",
    description: "Create engaging content for multiple platforms",
    icon: RiFileTextLine,
    isPro: true,
    stats: {
      used: 0,
      limit: 50,
    },
  },
  {
    id: "response-analyzer",
    name: "Response Analyzer",
    description: "Analyze response sentiment and suggest follow-ups",
    icon: RiBarChart2Line,
    isPro: true,
    stats: {
      used: 0,
      limit: 500,
    },
  },
  {
    id: "language-optimizer",
    name: "Language Optimizer",
    description: "Improve email tone and language for better results",
    icon: RiTranslate2,
    isPro: true,
    stats: {
      used: 0,
      limit: 300,
    },
  },
  {
    id: "engagement-predictor",
    name: "Engagement Predictor",
    description: "Predict open and response rates before sending",
    icon: RiPulseLine,
    isPro: true,
    stats: {
      used: 0,
      limit: 200,
    },
  },
]

const demoPrompt = "Write a personalized cold email to [Lead Name] from [Company Name] who is a [Position] interested in [Product/Service]."

export default function AIToolsPage() {
  const [prompt, setPrompt] = useState(demoPrompt)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Tools</h1>
          <p className="text-gray-400">Supercharge your outreach with AI</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black font-medium shadow-lg shadow-[#BDD9BF]/25 flex items-center gap-2"
        >
          <RiStarLine className="w-5 h-5" />
          Upgrade to Pro
        </motion.button>
      </div>

      <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6">
        <h2 className="text-lg font-medium text-white mb-4">Quick Email Generation</h2>
        <div className="space-y-4">
          <div className="relative">
            <RiMagicLine className="absolute left-4 top-3.5 text-gray-500 h-5 w-5" />
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 pl-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#BDD9BF]/40 focus:ring-0 transition-all duration-300 hover:bg-white/10"
              placeholder="Enter your prompt..."
              multiple
            />
          </div>
          <div className="flex gap-4">
            <Button className="flex-1 bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 text-[#BDD9BF] hover:from-[#9FC5A0]/30 hover:to-[#BDD9BF]/30">
              Generate Email
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
            >
              View Templates
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors group relative"
          >
            {tool.isPro && (
              <div className="absolute top-4 right-4">
                <RiLockLine className="w-5 h-5 text-[#BDD9BF]" />
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20">
                <tool.icon className="w-6 h-6 text-[#BDD9BF]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{tool.name}</h3>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </div>
            </div>

            {!tool.isPro ? (
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Usage</span>
                  <span className="text-white">
                    {tool.stats.used}/{tool.stats.limit}
                  </span>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(tool.stats.used / tool.stats.limit) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF]"
                  />
                </div>
              </div>
            ) : (
              <Button
                className="w-full mt-4 bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 text-[#BDD9BF] hover:from-[#9FC5A0]/30 hover:to-[#BDD9BF]/30"
              >
                Unlock with Pro
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl backdrop-blur-lg bg-gradient-to-r from-[#9FC5A0]/20 to-[#BDD9BF]/20 border border-white/10 p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-white mb-2">
              Unlock Advanced AI Features
            </h3>
            <p className="text-gray-400 mb-4">
              Get access to all AI tools, unlimited generations, and priority support
            </p>
            <Button className="bg-white text-black hover:bg-white/90">
              Upgrade Now
            </Button>
          </div>
          <div className="p-4 rounded-2xl bg-white/10">
            <RiRobot2Line className="w-12 h-12 text-[#BDD9BF]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 