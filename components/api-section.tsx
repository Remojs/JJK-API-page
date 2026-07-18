"use client"

import { motion } from "framer-motion"
import { type ApiSection } from "@/lib/api-docs-data"
import { EndpointCard } from "./endpoint-card"

interface ApiSectionComponentProps {
  section: ApiSection
}

export function ApiSectionComponent({ section }: ApiSectionComponentProps) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24"
    >
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          <span
            className="text-lg text-[#c41e3a] font-bold"
            style={{ fontFamily: "var(--font-noto-jp)" }}
          >
            {section.titleJp}
          </span>
        </div>
        <p className="mt-2 text-neutral-400">{section.description}</p>
      </div>

      <div className="space-y-4">
        {section.endpoints.map((endpoint, index) => (
          <EndpointCard key={`${endpoint.method}-${endpoint.path}-${index}`} endpoint={endpoint} />
        ))}
      </div>
    </section>
  )
}
