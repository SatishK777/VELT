'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

export default function NeuralInterfaceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Smooth springs for the 3D rotation limiting the tilt to +/- 15 degrees
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 })
  
  // Springs for the spotlight so it trails the mouse slightly for organic feel
  const springCursorX = useSpring(cursorX, { damping: 40, stiffness: 300 })
  const springCursorY = useSpring(cursorY, { damping: 40, stiffness: 300 })

  const backgroundMask = useMotionTemplate`radial-gradient(350px circle at ${springCursorX}px ${springCursorY}px, black 0%, transparent 100%)`
  const glowMask = useMotionTemplate`radial-gradient(600px circle at ${springCursorX}px ${springCursorY}px, rgba(0,255,255,0.15) 0%, transparent 80%)`

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    let x = (e.clientX - rect.left) / rect.width - 0.5
    let y = (e.clientY - rect.top) / rect.height - 0.5
    
    // Clamp to ensure it doesn't break if hovering slightly outside padding
    x = Math.max(-0.5, Math.min(0.5, x))
    y = Math.max(-0.5, Math.min(0.5, y))
    
    mouseX.set(x)
    mouseY.set(y)

    // For background spotlight tracking
    cursorX.set(e.clientX - rect.left)
    cursorY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // Return to center when mouse leaves
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section 
      className="relative w-full min-h-[120vh] bg-[#020202] flex items-center justify-center overflow-hidden py-24 border-b-[15px] border-accent-volt border-t-[10px] border-white"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Background ambient text spanning the entire back */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-[0.05] pointer-events-none z-10 overflow-hidden font-heading font-black text-[25vw] leading-none text-white whitespace-nowrap">
        <div className="animate-pulse">VΞLT .SYS</div>
        <div className="text-right">ARMOR</div>
      </div>

      {/* INTERACTIVE TRACKING CROSS GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Faint unlit base crosses */}
        <div 
           className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 27v6m-3-3h6' stroke='%2300ffff' stroke-width='1.5' fill='none' opacity='0.5'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px'
           }}
        />

        {/* Ambient glow following the mouse */}
        <motion.div 
           className="absolute inset-0 mix-blend-screen"
           style={{ background: glowMask }}
        />

        {/* Bright volt lit crosses revealed via mask tracking mouse */}
        <motion.div 
           className="absolute inset-0 opacity-100"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 25v10m-5-5h10' stroke='%23ccff00' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px',
             WebkitMaskImage: backgroundMask,
             maskImage: backgroundMask
           }}
        />
      </div>

      <div className="absolute left-6 md:left-12 top-12 flex flex-col gap-2 z-20 pointer-events-none">
        <h2 className="text-white font-heading font-black text-5xl md:text-8xl tracking-tighter mix-blend-difference drop-shadow-[0_0_15px_#ccff00]">
          PROJECT <br/><span className="text-accent-volt">A.E.G.I.S</span>
        </h2>
        <div className="text-white font-mono border-l-4 border-accent-volt pl-4 py-2 mt-4 max-w-sm bg-black/50 backdrop-blur-sm">
           DOM-BASED OPTICAL PARALLAX ENGINE.
           HOVER OVER MATRIX TO INTERACT.
        </div>
      </div>

      <div className="absolute bottom-12 right-6 md:right-12 flex items-center justify-center gap-4 z-20 pointer-events-none mix-blend-screen">
         <div className="w-12 h-12 border-2 border-accent-volt animate-spin flex items-center justify-center rounded-full">
            <div className="w-4 h-4 bg-accent-volt rounded-full"></div>
         </div>
         <div className="font-mono text-accent-volt text-xl uppercase animate-pulse">Tracking Positional Data</div>
      </div>

      {/* The Parallax 3D Base Frame */}
      <motion.div 
        className="relative w-[90vw] md:w-[65vw] h-[75vh] max-w-[900px] border-[2px] border-white/20 bg-[#050505]/60 backdrop-blur-md cursor-crosshair z-10 transition-colors hover:border-accent-volt duration-500 group"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Deepest Layer - Matrix Scanlines */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.15)_2px,transparent_2px)] pointer-events-none opacity-50" 
          style={{ backgroundSize: '100% 6px', transform: 'translateZ(-150px)' }}
        ></div>

        {/* Layer 1: Abstract Holographic Backdrop Blur */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 transition-opacity duration-500 group-hover:opacity-100"
          style={{ transform: 'translateZ(-80px)' }}
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.3)_0%,transparent_60%)]"></div>
        </div>



        {/* Central Component Layer: The Generated Armor Hologram Image */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ transform: 'translateZ(0px)' }}
        >
           <div 
              className="w-[120%] h-[120%] bg-contain bg-center bg-no-repeat opacity-[0.85] filter drop-shadow-[0_0_20px_#ccff00]"
              style={{ backgroundImage: 'url(/hologram_armor_suit_1775197197304.png)' }}
           ></div>
        </div>

        {/* Forward Layer: Tactical UI Edge Marks */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 text-accent-volt group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: 'translateZ(60px)' }}
        >
          {/* Edge Targeting Marks */}
          <div className="absolute top-[10%] left-[10%] w-16 h-16 border-t-[4px] border-l-[4px] border-accent-volt"></div>
          <div className="absolute bottom-[10%] right-[10%] w-16 h-16 border-b-[4px] border-r-[4px] border-accent-volt"></div>
        </div>

        {/* Most Forward Layer: Popping Neon Typography Data */}
        <div 
          className="absolute bottom-12 left-12 pointer-events-none drop-shadow-[0_0_10px_rgba(204,255,0,0.8)]"
          style={{ transform: 'translateZ(120px)' }}
        >
          <h3 className="font-heading font-black text-5xl md:text-7xl text-accent-volt uppercase tracking-tighter leading-none mb-4 mix-blend-screen">
            SYS.ARMOR <br/> <span className="text-white">ONLINE</span>
          </h3>
          <p className="font-mono bg-accent-volt text-black font-bold inline-block px-4 py-2 text-xl drop-shadow-md">
             CLASSIFIED TACTICAL DATA [X: 84 Y: 92 Z: 1A]
          </p>
        </div>
        
        {/* Forward Floating Glitch Labels */}
        <div 
          className="absolute top-12 right-12 pointer-events-none"
          style={{ transform: 'translateZ(80px)' }}
        >
           <div className="flex flex-col items-end gap-2 text-white font-mono text-sm opacity-60 mix-blend-plus-lighter text-right">
              <span className="bg-white/20 px-2 py-1">SIG: ACTIVE RED</span>
              <span className="bg-white/20 px-2 py-1">DEFENSE MATRIX 94%</span>
           </div>
        </div>

      </motion.div>
    </section>
  )
}
