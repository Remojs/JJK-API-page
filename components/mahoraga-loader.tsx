"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function MahoragaLoader({ size = 120 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: size, height: size }}
      >
        <Image
          src="/loading.webp"
          alt="Mahoraga Wheel Loading"
          width={size}
          height={size}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </div>
  )
}

export function MahoragaLoaderOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <MahoragaLoader size={150} />
      <p className="mt-8 text-lg tracking-widest text-neutral-400 font-mono">
        ADAPTING...
      </p>
    </div>
  )
}
