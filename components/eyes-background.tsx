"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Eye {
  id: number
  x: number
  y: number
  scale: number
  rotation: number
  delay: number
}

export function EyesBackground() {
  const [eyes, setEyes] = useState<Eye[]>([])

  useEffect(() => {
    const generateEyes = () => {
      const newEyes: Eye[] = []
      const count = 40

      for (let i = 0; i < count; i++) {
        newEyes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: Math.random() * 0.5 + 0.3,
          rotation: Math.random() * 360,
          delay: Math.random() * 2,
        })
      }
      setEyes(newEyes)
    }

    generateEyes()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.15]">
      {eyes.map((eye) => (
        <motion.div
          key={eye.id}
          transition={{
            duration: 4,
            delay: eye.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            transform: `scale(${eye.scale}) rotate(${eye.rotation}deg)`,
          }}
        >
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path
              d="M30 5C15 5 5 20 5 20C5 20 15 35 30 35C45 35 55 20 55 20C55 20 45 5 30 5Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="30" cy="20" r="10" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="30" cy="20" r="4" fill="white" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
