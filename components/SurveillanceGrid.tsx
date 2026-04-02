'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import Image from 'next/image'

export default function SurveillanceGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  // Springs for smooth tracking
  const springX = useSpring(0, { stiffness: 100, damping: 20 })
  const springY = useSpring(0, { stiffness: 100, damping: 20 })

  useEffect(() => {
    springX.set(mousePosition.x)
    springY.set(mousePosition.y)
  }, [mousePosition, springX, springY])

  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, black 10%, transparent 100%)`

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const items = [
    { src: '/home_rec_2_1775043832949.png', title: 'TRENCH RUNNER', price: '$420' },
    { src: '/exo_jacket_volt_1775039942732.png', title: 'EXO-JACKET', price: '$850' },
    { src: '/void_sneakers_1775039980673.png', title: 'VOID SNEAKERS', price: '$350' },
    { src: '/neon_streetwear_model_1775040238060.png', title: 'CYBER-VEST', price: '$220' },
  ]

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-[130vh] w-full bg-[#050505] cursor-crosshair overflow-hidden border-t-8 border-white/10"
    >
      {/* Background terminal static layer */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 border-white/5 [&>div]:border [&>div]:border-white/5 pointer-events-none">
         {Array.from({ length: 36 }).map((_, i) => <div key={i} className="h-full w-full"></div>)}
      </div>

      {/* Foreground interactive mask layer */}
      <motion.div 
        className="absolute inset-0 z-10 w-full h-full flex items-center justify-center pointer-events-none transform-gpu will-change-transform will-change-opacity"
        style={{ 
          maskImage,
          WebkitMaskImage: maskImage,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 max-w-[1800px] w-full mt-32 pointer-events-auto">
            {items.map((item, i) => (
               <div key={i} className="relative group h-[500px] w-full border-4 border-accent-volt/50 overflow-hidden bg-black">
                 <div className="absolute inset-0 bg-cover bg-center object-cover contrast-125 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" style={{ backgroundImage: `url(${item.src})`}}></div>
                 <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500"></div>
                 
                 {/* Hover Reveal Details */}
                 <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity translate-y-8 group-hover:translate-y-0 duration-500">
                    <h3 className="font-heading font-black text-5xl text-accent-volt uppercase" style={{ textShadow: '2px 2px 0px #000' }}>{item.title}</h3>
                    <span className="font-mono text-2xl bg-accent-volt text-black px-4 py-2 font-bold select-none">{item.price}</span>
                 </div>
               </div>
            ))}
        </div>
      </motion.div>
      
      {/* Title that sits "behind" the mask */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
         <h2 className="font-heading font-black text-[12vw] text-white/5 leading-none pointer-events-none">INITIATE<br/>SWEEP</h2>
         <p className="font-mono text-white/20 uppercase mt-8 text-xl">Move terminal pointer to reveal locked data.</p>
      </div>
    </section>
  )
}
