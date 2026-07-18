"use client"

import { motion } from "framer-motion"
import { apiSections } from "@/lib/api-docs-data"

interface DocSidebarProps {
  activeSection: string
  onSectionChange: (id: string) => void
}

export function DocSidebar({ activeSection, onSectionChange }: DocSidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-mono">
            API Reference
          </h3>
        </div>

        <nav className="space-y-1">
          {apiSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all relative group ${
                activeSection === section.id
                  ? "text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-gradient-to-r from-[#c41e3a] to-transparent border-l-2 border-[#c41e3a] rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between">
                <span>{section.title}</span>
                <span
                  className="text-xs font-mono text-neutral-600 group-hover:text-neutral-500"
                  style={{ fontFamily: "var(--font-noto-jp)" }}
                >
                  {section.titleJp}
                </span>
              </span>
            </button>
          ))}
        </nav>

        {/* Decorative element */}
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            API Status: Online
          </div>
        </div>
      </div>
    </aside>
  )
}
