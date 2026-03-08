"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Copy, Check } from "lucide-react"
import { type Endpoint, methodColors } from "@/lib/api-docs-data"

interface EndpointCardProps {
  endpoint: Endpoint
}

export function EndpointCard({ endpoint }: EndpointCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const colors = methodColors[endpoint.method]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className={`border ${colors.border} rounded-lg overflow-hidden bg-neutral-900/50 backdrop-blur-sm`}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-4 hover:bg-neutral-800/50 transition-colors"
      >
        <span
          className={`px-3 py-1 rounded text-xs font-mono font-bold ${colors.bg} ${colors.text}`}
        >
          {endpoint.method}
        </span>
        <code className="text-neutral-200 font-mono text-sm flex-1 text-left">
          {endpoint.path}
        </code>
        <span className="text-neutral-400 text-sm hidden md:block">
          {endpoint.summary}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-neutral-800 space-y-6">
              {/* Description */}
              <p className="text-neutral-400">{endpoint.description}</p>

              {/* Parameters */}
              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#c41e3a] rounded-full" />
                    Parameters
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-neutral-500 border-b border-neutral-800">
                          <th className="pb-2 pr-4">Name</th>
                          <th className="pb-2 pr-4">Location</th>
                          <th className="pb-2 pr-4">Type</th>
                          <th className="pb-2 pr-4">Required</th>
                          <th className="pb-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param) => (
                          <tr
                            key={param.name}
                            className="border-b border-neutral-800/50"
                          >
                            <td className="py-2 pr-4">
                              <code className="text-[#c41e3a]">{param.name}</code>
                            </td>
                            <td className="py-2 pr-4 text-neutral-400">
                              {param.in}
                            </td>
                            <td className="py-2 pr-4">
                              <code className="text-emerald-400">{param.type}</code>
                            </td>
                            <td className="py-2 pr-4">
                              {param.required ? (
                                <span className="text-[#c41e3a]">Yes</span>
                              ) : (
                                <span className="text-neutral-500">No</span>
                              )}
                            </td>
                            <td className="py-2 text-neutral-400">
                              {param.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Responses */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Responses
                </h4>
                <div className="space-y-2">
                  {endpoint.responses.map((response) => (
                    <div
                      key={response.status}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={`px-2 py-0.5 rounded font-mono ${
                          response.status >= 200 && response.status < 300
                            ? "bg-emerald-500/10 text-emerald-400"
                            : response.status >= 400
                            ? "bg-red-500/10 text-red-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {response.status}
                      </span>
                      <span className="text-neutral-400">
                        {response.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Response */}
              {endpoint.example && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Example Response
                    </h4>
                    <button
                      onClick={() => copyToClipboard(endpoint.example!.response)}
                      className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-neutral-950 rounded-lg p-4 overflow-x-auto border border-neutral-800">
                    <code className="text-sm text-neutral-300 font-mono">
                      {endpoint.example.response}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
