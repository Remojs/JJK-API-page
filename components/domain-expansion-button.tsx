"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

interface DomainExpansionButtonProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export function DomainExpansionButton({
  onClick,
  children,
  className = "",
}: DomainExpansionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    setIsExpanding(true)
    setTimeout(() => {
      setIsExpanding(false)
      onClick?.()
    }, 1500)
  }

  return (
    <>
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={`relative overflow-hidden px-8 py-4 font-bold tracking-wider uppercase bg-[#c41e3a] text-white border-2 border-[#c41e3a] transition-colors ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Infinity void particles effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    scale: [0, 1, 0],
                  }}
                  exit={{}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#c41e3a] via-[#ff4d6d] to-[#c41e3a]"
          animate={
            isHovered
              ? {
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 100%",
          }}
        />

        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>

      {/* Domain Expansion Full Screen Animation — rendered via portal at body level */}
      {mounted && createPortal(
        <AnimatePresence>
          {isExpanding && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          >
            {/* Dark void background */}
            <motion.div
              initial={{ scale: 0, borderRadius: "50%" }}
              animate={{ scale: 50, borderRadius: "0%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-20 h-20 bg-[#0a0a0a]"
            />

            {/* Expanding circles - Infinity effect */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 3] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="absolute w-40 h-40 rounded-full border-2 border-[#c41e3a]"
              />
            ))}

            {/* Japanese text */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative z-10 text-center"
            >
              <p className="text-[#c41e3a] text-6xl font-black tracking-widest" style={{ fontFamily: "var(--font-noto-jp)" }}>
                領域展開
              </p>
              <p className="mt-4 text-white text-xl tracking-[0.3em]">
                DOMAIN EXPANSION
              </p>
            </motion.div>

            {/* Floating eyes effect */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  scale: [0, Math.random() * 0.5 + 0.5, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5 + 0.3,
                }}
                className="absolute"
              >
                <svg width="30" height="20" viewBox="0 0 30 20">
                  <ellipse cx="15" cy="10" rx="14" ry="9" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx="15" cy="10" r="5" fill="white" />
                  <circle cx="15" cy="10" r="2" fill="#0a0a0a" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
