"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  RiSearchLine,
  RiFilter3Line,
  RiAddLine,
  RiDownloadLine,
  RiUploadLine,
  RiMailLine,
  RiStarLine,
  RiStarFill,
} from "react-icons/ri"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const leads = [
  {
    id: 1,
    name: "John Smith",
    company: "Tech Solutions Inc",
    email: "john@techsolutions.com",
    status: "Hot",
    lastContacted: "2024-02-08",
    tags: ["Enterprise", "SaaS"],
    starred: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Digital Dynamics",
    email: "sarah@digitaldynamics.com",
    status: "Warm",
    lastContacted: "2024-02-07",
    tags: ["Startup", "E-commerce"],
    starred: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    company: "Growth Corp",
    email: "michael@growthcorp.com",
    status: "Cold",
    lastContacted: "2024-02-05",
    tags: ["SMB"],
    starred: true,
  },
]

const statusColors = {
  Hot: "bg-red-500/20 text-red-500",
  Warm: "bg-orange-500/20 text-orange-500",
  Cold: "bg-blue-500/20 text-blue-500",
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus ? lead.status === selectedStatus : true

    return matchesSearch && matchesStatus
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lead Management</h1>
          <p className="text-gray-400">Manage and track your leads</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9FC5A0] to-[#BDD9BF] text-black font-medium shadow-lg shadow-[#BDD9BF]/25 flex items-center gap-2"
        >
          <RiAddLine className="w-5 h-5" />
          Add Lead
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 relative">
          <RiSearchLine className="absolute left-4 top-3.5 text-gray-500 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search leads..."
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
        <div>
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-white gap-2"
          >
            <RiDownloadLine className="w-5 h-5" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400"></th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Company</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Tags</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Last Contacted</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-[#BDD9BF] transition-colors">
                      {lead.starred ? (
                        <RiStarFill className="w-5 h-5 text-[#BDD9BF]" />
                      ) : (
                        <RiStarLine className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{lead.name}</p>
                      <p className="text-gray-400 text-sm">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{lead.company}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[lead.status as keyof typeof statusColors]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {lead.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{lead.lastContacted}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                      >
                        <RiMailLine className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                      >
                        <RiUploadLine className="w-5 h-5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
} 