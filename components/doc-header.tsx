"use client"

import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { DomainExpansionButton } from "./domain-expansion-button"

export function DocHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src="/icon.webp" alt="JJK API" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-wide">JJK API</h1>
              <p className="text-xs text-neutral-500 font-mono">v1.0.0</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#documentation"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#endpoints"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Endpoints
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Remojs/JujustuKaisen-API"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <DomainExpansionButton
              onClick={() => window.open("https://api.jujutsukaisenapi.site/api/v1/characters", "_blank")}
              className="text-sm px-4 py-2"
            >
              <ExternalLink className="w-4 h-4" />
              Launch API
            </DomainExpansionButton>
          </div>
        </div>
      </div>
    </header>
  )
}
