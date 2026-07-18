"use client"

import { motion } from "framer-motion"
import { Copy, Check, Zap, Shield, Database } from "lucide-react"
import { useState } from "react"
import { BASE_URL } from "@/lib/api-docs-data"

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const baseUrl = BASE_URL

  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Japanese title */}
          <p
            className="text-[#c41e3a] text-lg tracking-[0.3em] mb-4 font-bold"
            style={{ fontFamily: "var(--font-noto-jp)" }}
          >
            呪術廻戦
          </p>

          {/* Main title */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight"
          >
            <span className="text-balance">
              Jujutsu Kaisen{" "}
              <span className="text-[#c41e3a]">API</span>
            </span>
          </h1>

          {/* Description */}
          <p
            className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto text-pretty"
          >
            A RESTful API providing comprehensive data about sorcerers, cursed spirits, 
            techniques, and domain expansions from the Jujutsu Kaisen universe.
          </p>

          {/* Base URL */}
          <div
            className="mt-8 inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3"
          >
            <span className="text-neutral-500 text-sm">Base URL:</span>
            <code className="text-[#c41e3a] font-mono">{baseUrl}</code>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-1.5 hover:bg-neutral-800 rounded transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-neutral-500" />
              )}
            </button>
          </div>

          {/* Features */}
          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 text-neutral-400">
              <Zap className="w-5 h-5 text-[#c41e3a]" />
              <span>Fast & Reliable</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-neutral-400">
              <Shield className="w-5 h-5 text-[#c41e3a]" />
              <span>No Auth Required</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-neutral-400">
              <Database className="w-5 h-5 text-[#c41e3a]" />
              <span>Complete Data</span>
            </div>
          </div>

          {/* Quick example */}
          <div
            className="mt-12 max-w-2xl mx-auto text-left"
          >
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-950">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-auto text-xs text-neutral-500 font-mono">Quick Start</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono">
                  <span className="text-emerald-400">GET</span>{" "}
                  <span className="text-neutral-300">/api/v1/characters/2</span>
                  {"\n\n"}
                  <span className="text-neutral-500">{"// Response"}</span>
                  {"\n"}
                  {`{
  `}<span className="text-blue-400">"id"</span>{`: `}<span className="text-amber-400">2</span>{`,
  `}<span className="text-blue-400">"name"</span>{`: `}<span className="text-green-400">"Megumi Fushiguro"</span>{`,
  `}<span className="text-blue-400">"alias"</span>{`: [`}<span className="text-green-400">"Sea Urchin Head"</span>{`],
  `}<span className="text-blue-400">"speciesId"</span>{`: `}<span className="text-amber-400">1</span>{`,
  `}<span className="text-blue-400">"birthday"</span>{`: `}<span className="text-green-400">"December 22"</span>{`,
  `}<span className="text-blue-400">"height"</span>{`: `}<span className="text-green-400">"175 cm"</span>{`,
  `}<span className="text-blue-400">"age"</span>{`: `}<span className="text-green-400">"16"</span>{`,
  `}<span className="text-blue-400">"gender"</span>{`: `}<span className="text-amber-400">1</span>{`,
  `}<span className="text-blue-400">"occupationId"</span>{`: [`}<span className="text-amber-400">1, 4</span>{`],
  `}<span className="text-blue-400">"affiliationId"</span>{`: [`}<span className="text-amber-400">1, 3</span>{`],
  `}<span className="text-blue-400">"animeDebut"</span>{`: `}<span className="text-green-400">"Ep1"</span>{`,
  `}<span className="text-blue-400">"mangaDebut"</span>{`: `}<span className="text-green-400">"Ch1"</span>{`,
  `}<span className="text-blue-400">"cursedTechniquesIds"</span>{`: [`}<span className="text-amber-400">59, 71, 82, 83, 84, 85, 86, 87, 88, 89, 90</span>{`],
  `}<span className="text-blue-400">"gradeId"</span>{`: `}<span className="text-amber-400">4</span>{`,
  `}<span className="text-blue-400">"domainExpansionId"</span>{`: `}<span className="text-amber-400">5</span>{`,
  `}<span className="text-blue-400">"battlesId"</span>{`: [`}<span className="text-amber-400">14, 15, 26, 18, 19, 22, 24, 31, 37, 38, 39, 42, 43, 44, 49, 50, 55, 56, 57, 59, 69, 76, 78, 105</span>{`],
  `}<span className="text-blue-400">"cursedToolId"</span>{`: [`}<span className="text-amber-400">9, 12, 13, 35, 36</span>{`],
  `}<span className="text-blue-400">"status"</span>{`: `}<span className="text-amber-400">1</span>{`,
  `}<span className="text-blue-400">"relatives"</span>{`: [
    `}<span className="text-green-400">"Tsumiki Fushiguro (Step-Sister)"</span>{`,
    `}<span className="text-green-400">"Toji Fushiguro (Father)"</span>{`,
    `}<span className="text-green-400">"Maki Zenin (Second Aunt)"</span>
    {`  ],
  `}<span className="text-blue-400">"image"</span>{`: `}<span className="text-green-400">"/characters/2.webp"</span>{`,
  `}<span className="text-blue-400">"created_at"</span>{`: `}<span className="text-green-400">"2026-03-08T19:21:25.000000Z"</span>{`,
  `}<span className="text-blue-400">"updated_at"</span>{`: `}<span className="text-green-400">"2026-03-08T19:21:25.000000Z"</span>
                  {"\n}"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
