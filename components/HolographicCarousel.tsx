'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

const ITEMS = [
  {
    id: 1,
    src: '/volt_neon_runner_1775193738402.png',
    title: 'NEON_RUNNER',
    modelName: 'NEON GRID FRAME',
    desc: 'High tension neon fabric designed for extreme cybernetic environments. Thermal suppression integrated... 100% complete.',
    price: '$850'
  },
  {
    id: 2,
    src: '/exo_suit_brutalist_1775193800058.png',
    title: 'EXO_SUIT.01',
    modelName: 'EXO AUGMENTATION',
    desc: 'Heavy industrial plating overlaid with responsive volt cabling. Built for high impact traversal... 88% complete.',
    price: '$1200'
  },
  {
    id: 3,
    src: '/cyber_vest_tactical_1775193876377.png',
    title: 'CYBER_VEST.04',
    modelName: 'TACTICAL VEST',
    desc: 'Rendering sub-dermal cybernetic weave structures. Modular attachment points active... 42% complete.',
    price: '$600'
  },
]

export default function HolographicCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Mouse hover springs for active item 3D perspective
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const springX = useSpring(coords.x, { stiffness: 100, damping: 30 })
  const springY = useSpring(coords.y, { stiffness: 100, damping: 30 })
  const rotateX = useTransform(springY, [-1, 1], [15, -15])
  const rotateYTracking = useTransform(springX, [-1, 1], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
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

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % ITEMS.length)
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length)

  // Carousel layout variants
  const variants = {
    active: {
      x: '0%',
      scale: 1,
      zIndex: 20,
      opacity: 1,
      filter: 'blur(0px)',
      boxShadow: '0 0 40px rgba(204,255,0,0.2)'
    },
    next: (offset: number) => ({
      x: `${offset * 35}%`, // Stack shifted to the right
      scale: Math.max(0.5, 1 - 0.15 * offset),
      zIndex: 10 - offset,
      opacity: Math.max(0, 1 - 0.3 * offset),
      filter: `blur(${offset * 2}px) grayscale(${offset * 30}%)`,
      boxShadow: '0 0 0 rgba(0,0,0,0)'
    }),
    prev: {
      x: '-100%',
      scale: 1.15,
      zIndex: 30, // Sweeps over the front
      opacity: 0,
      filter: 'blur(10px)',
      boxShadow: '0 0 0 rgba(0,0,0,0)'
    }
  }

  const activeItem = ITEMS[activeIndex]

  return (
    <section className="relative min-h-[100vh] w-full bg-[#050505] flex items-center justify-center overflow-hidden py-24 border-y-[10px] border-accent-volt text-white">
      
      {/* Dynamic Blurred Background responding to Active Item */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-1000 ease-in-out opacity-20 group">
        <Image 
          src={activeItem.src}
          alt="background"
          fill
          className="object-cover blur-[80px] scale-125 saturate-200 transition-all duration-1000"
          unoptimized
        />
      </div>

      <style>{`
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

      {/* Main Split Layout Grid */}
      <div className="relative z-10 w-full max-w-[1800px] px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Information & Controls */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start gap-8 z-20 min-w-0">
          <div className="w-full border-l-4 border-accent-volt pl-6 pr-6 md:pr-10 py-4 bg-black/40 backdrop-blur-sm shadow-[8px_8px_0_0_#ccff00]">
            <p className="font-mono text-accent-volt text-sm mb-2 break-words">SYS.COM // MEGA_SLIDER_INIT</p>
            <motion.h2 
              key={activeItem.id + '-title'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading font-black text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tighter leading-none break-all"
            >
              {activeItem.title}
            </motion.h2>
          </div>

          <motion.div 
            key={activeItem.id + '-desc'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-4"
          >
            <h3 className="text-3xl font-heading font-bold text-white mb-4 uppercase">{activeItem.modelName}</h3>
            <p className="font-mono text-lg text-white/70 max-w-lg leading-relaxed border-l-2 border-white/20 pl-4">
              {activeItem.desc}
            </p>
            <div className="mt-8 font-heading font-black text-4xl bg-white text-black px-6 py-2 inline-block shadow-[4px_4px_0_0_#ccff00]">
              {activeItem.price}
            </div>
          </motion.div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="w-16 h-16 border-4 border-white/30 bg-black/50 backdrop-blur-md flex items-center justify-center hover:border-accent-volt hover:bg-accent-volt hover:text-black transition-all group"
            >
              <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-16 h-16 border-4 border-white/30 bg-black/50 backdrop-blur-md flex items-center justify-center hover:border-accent-volt hover:bg-accent-volt hover:text-black transition-all group"
            >
              <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          <div className="mt-4 text-accent-volt/50 font-mono text-sm uppercase">
            [ {('0' + (activeIndex + 1)).slice(-2)} / {('0' + ITEMS.length).slice(-2)} ]
          </div>
        </div>

        {/* Right Side: High-Perspective 3D Stack */}
        <div className="col-span-1 lg:col-span-7 relative h-[60vh] md:h-[75vh] perspective-1000">
          <div className="absolute inset-0 flex items-center justify-start pr-[20%]">
            {ITEMS.map((item, index) => {
              // Compute wrap offset purely visually
              let offset = index - activeIndex
              if (offset < -1) offset += ITEMS.length // Keep elements passed as -1, let the rest wrap to the back as trailing
              
              const isActive = offset === 0

              return (
                <motion.div
                  key={item.id}
                  custom={offset}
                  initial={false}
                  variants={variants}
                  animate={offset === 0 ? "active" : offset > 0 ? "next" : "prev"}
                  transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                  className="absolute w-full max-w-[350px] md:max-w-[450px] aspect-[3/4] origin-left border-4 border-white/5 bg-black/40 backdrop-blur-lg transform-style-3d transform-gpu"
                  style={isActive ? { rotateX, rotateY: rotateYTracking } : undefined}
                  onMouseMove={isActive ? handleMouseMove : undefined}
                  onMouseLeave={isActive ? handleMouseLeave : undefined}
                  ref={isActive ? containerRef : null}
                >
                  <div className="relative w-full h-full transform-style-3d overflow-hidden group">
                    {/* Active State = Clear Visible Image */}
                    {isActive ? (
                      <>
                        <div className="absolute inset-0 z-10 pointer-events-none transform-gpu">
                          <Image src={item.src} alt={item.modelName} fill className="object-cover scale-105 pointer-events-none" unoptimized />
                        </div>
                        
                        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.1]" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(204,255,0,0.8) 3px, transparent 4px)' }}></div>
                        
                        {/* Interactive Plinth Base */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 border-b-[4px] border-accent-volt rounded-[50%] blur-[8px] opacity-80 animate-pulse pointer-events-none"></div>
                        
                        {/* Click indicator layer */}
                        <div className="absolute inset-0 bg-transparent cursor-crosshair z-50 pointer-events-none"></div>
                      </>
                    ) : (
                      /* Inactive Trailing State = Grayscale, muted */
                      <div className="absolute inset-0 z-10 mix-blend-luminosity">
                        <Image src={item.src} alt={item.modelName} fill className="object-cover opacity-60 pointer-events-none select-none contrast-[1.1] scale-105" unoptimized />
                        <div className="absolute inset-0 bg-black/30 w-full h-full"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
