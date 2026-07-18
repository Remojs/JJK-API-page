"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCw } from "lucide-react"

interface Character {
  id: number
  name: string
  alias: string[]
  birthday: string
  height: string
  age: string
  gender: number
  gradeId: number
  status: number
  image: string
  domainExpansionId: number | null
}

const GRADE_MAP: Record<number, string> = {
  1: "Special Grade",
  2: "Grade 1",
  3: "Semi-Grade 1",
  4: "Grade 2",
  5: "Semi-Grade 2",
  6: "Grade 3",
  7: "Grade 4",
  8: "Special Grade",
}

const STATUS_MAP: Record<number, { label: string; color: string }> = {
  1: { label: "Alive", color: "text-emerald-400" },
  2: { label: "Deceased", color: "text-red-400" },
  3: { label: "Unknown", color: "text-neutral-400" },
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count)
}

export function CharacterShowcase() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [displayed, setDisplayed] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetch("https://api.jujutsukaisenapi.site/api/v1/characters?per_page=100")
      .then((r) => r.json())
      .then((data) => {
        const chars: Character[] = data.data ?? data
        setAllCharacters(chars)
        setDisplayed(pickRandom(chars, 3))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const refresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setDisplayed(pickRandom(allCharacters, 3))
      setRefreshing(false)
    }, 300)
  }, [allCharacters])

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="h-3 w-24 bg-neutral-800 rounded mb-2 animate-pulse" />
              <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl h-[480px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!displayed.length) return null

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p
              className="text-[#c41e3a] text-sm tracking-[0.3em] font-bold mb-1"
              style={{ fontFamily: "var(--font-noto-jp)" }}
            >
              呪術師
            </p>
            <h2 className="text-3xl font-black text-white">Random Characters</h2>
          </div>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 rounded-lg transition-all disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Regenerate
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.map((char) => {
            const status = STATUS_MAP[char.status] ?? { label: "Unknown", color: "text-neutral-400" }
            const grade = GRADE_MAP[char.gradeId] ?? `Grade ${char.gradeId}`
                const imageUrl = char.image

            return (
              <div
                key={char.id}
                className="bg-[#000000] border border-neutral-800 rounded-xl overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-72 bg-neutral-950 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={char.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = "none"
                    }}
                  />
                  {/* Grade badge */}
                  <span className="absolute top-3 right-3 px-2 py-1 bg-[#c41e3a] text-white text-xs font-bold rounded">
                    {grade}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{char.name}</h3>
                    {char.alias?.length > 0 && (
                      <p className="text-neutral-500 text-sm mt-1">
                        {char.alias.join(" · ")}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm flex-1">
                    <div>
                      <span className="text-neutral-600 block text-xs uppercase tracking-wider mb-0.5">Status</span>
                      <span className={`font-medium ${status.color}`}>{status.label}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-xs uppercase tracking-wider mb-0.5">Age</span>
                      <span className="text-neutral-300 font-medium">{char.age || "—"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-xs uppercase tracking-wider mb-0.5">Birthday</span>
                      <span className="text-neutral-300 font-medium">{char.birthday || "—"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-xs uppercase tracking-wider mb-0.5">Height</span>
                      <span className="text-neutral-300 font-medium">{char.height || "—"}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-neutral-600 text-xs font-mono">ID: {char.id}</span>
                    {char.domainExpansionId && (
                      <span className="text-xs text-[#c41e3a] font-semibold tracking-wide">
                        ∞ Domain Expansion
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
