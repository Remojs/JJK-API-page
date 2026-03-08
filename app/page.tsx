"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { MahoragaLoaderOverlay } from "@/components/mahoraga-loader"
import { EyesBackground } from "@/components/eyes-background"
import { DocHeader } from "@/components/doc-header"
import { HeroSection } from "@/components/hero-section"
import { DocSidebar } from "@/components/doc-sidebar"
import { ApiSectionComponent } from "@/components/api-section"
import { MobileNav } from "@/components/mobile-nav"
import { CharacterShowcase } from "@/components/character-showcase"
import { apiSections } from "@/lib/api-docs-data"

export default function JJKApiDocs() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(apiSections[0].id)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = apiSections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <MahoragaLoaderOverlay />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-[#0a0a0a] relative">
          {/* Malevolent Shrine Background */}
          <div 
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'url(/wallp.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.25,
            }}
          />
          {/* Dark overlay gradient */}

          <EyesBackground />
          <DocHeader />

          <main>
            <HeroSection />

            <CharacterShowcase />

            {/* Documentation section */}
            <section id="documentation" className="py-16 lg:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-12">
                  <DocSidebar
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                  />

                  <div id="endpoints" className="flex-1 min-w-0 space-y-16">
                    {apiSections.map((section) => (
                      <ApiSectionComponent key={section.id} section={section} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[#c41e3a] to-[#8b1425] flex items-center justify-center">
                      <span
                        className="text-white font-black text-sm"
                        style={{ fontFamily: "var(--font-noto-jp)" }}
                      >
                        呪
                      </span>
                    </div>
                    <span className="text-neutral-500 text-sm">
                      Jujutsu Kaisen API
                    </span>
                  </div>

                  <p className="text-neutral-600 text-sm text-center">
                    This is a fan-made API. Jujutsu Kaisen is created by Gege Akutami.
                  </p>

                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <a href="#" className="hover:text-white transition-colors">
                      GitHub
                    </a>
                    <span className="text-neutral-700">|</span>
                    <a href="#" className="hover:text-white transition-colors">
                      Discord
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </main>

          <MobileNav
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      )}
    </>
  )
}
