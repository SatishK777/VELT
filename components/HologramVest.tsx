'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function HologramVest() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track mouse coordinates (-1 to 1)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const springX = useSpring(coords.x, { stiffness: 100, damping: 30 })
  const springY = useSpring(coords.y, { stiffness: 100, damping: 30 })

  // Transform coordinates into rotation degrees
  const rotateX = useTransform(springY, [-1, 1], [15, -15])
  const rotateY = useTransform(springX, [-1, 1], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalize coordinates to -1 to 1 based on center of container
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    setCoords({ x, y })
    springX.set(x)
    springY.set(y)
  }

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 })
    springX.set(0)
    springY.set(0)
  }

  return (
    <section className="relative min-h-[120vh] w-full bg-[#050505] flex items-center justify-center overflow-hidden py-32 border-y-[10px] border-accent-volt text-white">
      
      {/* Raw custom CSS injected directly for self-containment */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        @keyframes hologram-flicker {
          0%, 100% { opacity: 0.9; }
          33% { opacity: 0.6; }
          34% { opacity: 0.95; }
          66% { opacity: 0.8; }
          67% { opacity: 0.3; }
          68% { opacity: 0.9; }
        }
        .animate-hologram-flicker { animation: hologram-flicker 5s infinite linear; }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(4px, -2px); opacity: 0.7; }
          10% { transform: translate(-4px, 2px); opacity: 0.4; }
          20% { transform: translate(4px, -2px); opacity: 0.7; }
          80% { transform: translate(4px, -2px); opacity: 0.7; }
          85% { transform: translate(-8px, -4px); opacity: 0.9; }
          90% { transform: translate(4px, -2px); opacity: 0.7; }
        }
        .animate-glitch-1 { animation: glitch-1 3s infinite steps(2); }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(-6px, 3px); opacity: 0.5; }
          15% { transform: translate(-6px, 3px); opacity: 0.5; }
          20% { transform: translate(6px, -3px); opacity: 0.2; }
          25% { transform: translate(-6px, 3px); opacity: 0.5; }
          70% { transform: translate(-6px, 3px); opacity: 0.5; }
          75% { transform: translate(8px, 4px); opacity: 0.8; }
          80% { transform: translate(-6px, 3px); opacity: 0.5; }
        }
        .animate-glitch-2 { animation: glitch-2 2.5s infinite steps(2); }

        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scan-vertical { animation: scan-vertical 5s infinite linear; }
      `}</style>

      {/* Background terminal static layer */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 border-white/5 [&>div]:border-t [&>div]:border-l [&>div]:border-white/5 opacity-30 pointer-events-none">
         {Array.from({ length: 144 }).map((_, i) => <div key={i} className="h-full w-full"></div>)}
      </div>

      <div className="absolute top-12 left-12 font-mono text-accent-volt text-sm border-l-4 border-accent-volt pl-4">
         <p>SYS.COM // HOLOGRAM_INIT</p>
         <p className="animate-pulse text-[#D40000]">WARNING: SIGNAL UNSTABLE</p>
         <p className="mt-4 text-xs opacity-50 max-w-xs uppercase">Rendering sub-dermal cybernetic weave structures... 42% complete.</p>
      </div>

      {/* Main 3D Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-4xl aspect-[4/5] perspective-1000 cursor-crosshair z-10 mx-auto"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative w-full h-full transform-style-3d shadow-2xl shadow-accent-volt/5 will-change-transform transform-gpu"
        >
          {/* Base Image Layer */}
          <div className="absolute inset-0 z-10 animate-hologram-flicker mix-blend-screen pointer-events-none will-change-opacity transform-gpu">
            <Image 
              src="/hologram_vest.png" 
              alt="Holographic Tactical Vest" 
              fill 
              className="object-contain opacity-90 contrast-125 select-none" 
              unoptimized
            />
          </div>

          {/* Cyan Glitch Offset Layer */}
          <div className="absolute inset-0 z-20 mix-blend-screen animate-glitch-1 opacity-70 pointer-events-none translate-x-[4px] translate-y-[-2px] filter saturate-[5] contrast-200 hue-rotate-[180deg] will-change-transform will-change-filter transform-gpu">
            <Image 
              src="/hologram_vest.png" 
              alt="Glitch Layer 1" 
              fill 
              className="object-contain select-none blur-[1px]" 
              unoptimized
            />
          </div>

          {/* Red/Magenta Glitch Offset Layer */}
          <div className="absolute inset-0 z-20 mix-blend-screen animate-glitch-2 opacity-50 pointer-events-none translate-x-[-6px] translate-y-[3px] filter saturate-[5] contrast-200 hue-rotate-[-90deg] will-change-transform will-change-filter transform-gpu">
            <Image 
              src="/hologram_vest.png" 
              alt="Glitch Layer 2" 
              fill 
              className="object-contain select-none blur-[2px]" 
              unoptimized
            />
          </div>

          {/* CRT Scanline Overlay */}
          <div 
            className="absolute inset-0 z-30 pointer-events-none opacity-[0.15] mix-blend-overlay"
            style={{ 
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(204,255,0,0.8) 3px, transparent 4px)' 
            }}
          ></div>
          
          {/* Sweeping scanline animation */}
          <div className="absolute inset-0 z-40 bg-gradient-to-b from-transparent via-accent-volt/10 to-transparent h-[15%] w-full animate-scan-vertical pointer-events-none will-change-transform transform-gpu"></div>

          {/* Hologram Base Plinth */}
          <div className="absolute bottom-[-5%] left-[20%] right-[20%] h-12 border-b-4 border-l-[10px] border-r-[10px] border-transparent border-b-accent-volt rounded-[50%] blur-[12px] opacity-60 animate-pulse pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Massive Background Text behind hologram */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[15vw] text-white/5 whitespace-nowrap pointer-events-none z-0 mix-blend-layer">
        CYBER_VEST.04
      </h2>
      
    </section>
  )
}
