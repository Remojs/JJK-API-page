"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { apiSections } from "@/lib/api-docs-data"

interface MobileNavProps {
  activeSection: string
  onSectionChange: (id: string) => void
}

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSectionChange = (id: string) => {
    onSectionChange(id)
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#c41e3a] text-white rounded-full shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-neutral-900 border-l border-neutral-800 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white">Navigation</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {apiSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? "bg-[#c41e3a] text-white border-l-2 border-[#c41e3a]"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span>{section.title}</span>
                      <span
                        className="text-xs font-mono text-neutral-600"
                        style={{ fontFamily: "var(--font-noto-jp)" }}
                      >
                        {section.titleJp}
                      </span>
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
