'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Lock scroll structurally during load
    document.body.style.overflow = 'hidden'

    let frame: number
    let currentProgress = 0

    const update = () => {
      // Eased pseudo-random progression simulating heavy tactical asset loading
      currentProgress += (100 - currentProgress) * 0.05 + Math.random() * 2
      if (currentProgress >= 100) {
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          // Free scroll shortly after animation finishes rendering the door slam
          setTimeout(() => {
            document.body.style.overflow = ''
          }, 1500)
        }, 800) // Hover beautifully at 100% to let users lock-in 
      } else {
        setProgress(Math.floor(currentProgress))
        frame = requestAnimationFrame(update)
      }
    }
    
    // Delay rapid start for dramatic effect
    setTimeout(() => {
      frame = requestAnimationFrame(update)
    }, 400)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto bg-black"
          // Fade out the absolute background base *after* the sliding doors finish opening
          exit={{ opacity: 0, transition: { duration: 0.1, delay: 1.2 } }}
        >
          {/* Top Hatch Vector Panel */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[50vh] bg-[#020202] border-b-[10px] border-accent-volt z-0"
            exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.3 } }}
          >
             <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4vw_4vw]" />
          </motion.div>
          
          {/* Bottom Hatch Vector Panel */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#020202] border-t-8 border-black z-0 drop-shadow-[0_-20px_40px_rgba(204,255,0,0.15)]"
            exit={{ y: "100%", transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.3 } }}
          >
             <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4vw_4vw]" />
          </motion.div>
          
          {/* HUD Content Overlay -> Vaporizes quickly just before hatch rips open */}
          <motion.div 
             className="relative z-10 w-full h-full px-[5vw] py-[8vh] flex flex-col justify-between"
             exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, transition: { duration: 0.35, ease: "easeIn" } }}
          >
            {/* Top Navigation Diagnostic Frame */}
            <div className="flex justify-between items-start text-accent-volt font-mono text-xs sm:text-base tracking-widest font-bold uppercase">
              <div className="flex flex-col gap-2">
                <span className="bg-accent-volt text-black px-3 py-1 w-fit">VΞLT // OS_BOOT</span>
                <span>INITIALIZING_CORE_ENVIRONMENT</span>
              </div>
              <div className="flex flex-col items-end gap-2 text-right">
                <span className="bg-accent-volt text-black px-3 py-1 w-fit">SECURE_LINK</span>
                <span className="animate-pulse">{progress >= 100 ? 'LINK_ESTABLISHED' : 'AWAITING_HANDSHAKE...'}</span>
              </div>
            </div>

            {/* Massive Structural Loading Graphic Component */}
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="relative w-full flex justify-center items-baseline px-4">
                {/* Visual Distortion / Drop Shadow Hack Layer */}
                <span className="absolute text-[30vw] md:text-[25vw] font-heading font-black text-accent-volt leading-none tracking-tighter opacity-20 blur-[15px] -translate-x-4 translate-y-4">
                  {progress}
                </span>
                
                <motion.span 
                  className="relative text-[30vw] md:text-[25vw] font-heading font-black text-accent-volt leading-none tracking-tighter z-10 drop-shadow-md"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {progress}
                </motion.span>
                <span className="text-[12vw] md:text-[6vw] font-heading font-bold text-white tracking-widest ml-4 -translate-y-4 opacity-50">
                  %
                </span>
              </div>
            </div>

            {/* Bottom Progress Diagnostic Injection Frame */}
            <div className="flex flex-col gap-6 w-full max-w-[90vw] md:max-w-[80vw] mx-auto">
               <div className="flex justify-between w-full text-white font-mono text-[10px] md:text-sm font-bold uppercase tracking-widest px-1">
                 <span>{progress < 100 ? 'Decrypting Visual Arrays...' : 'Decryption Complete.'}</span>
                 <span><span className="text-accent-volt">{progress}</span> / 100 UNITS</span>
               </div>
               
               {/* Heavy Hardware Interface Progress Bar Wrapper */}
               <div className="w-full h-10 md:h-16 border-[4px] md:border-[8px] border-accent-volt p-1 md:p-2 relative overflow-hidden bg-black/80 backdrop-blur-md">
                 {/* Fill Interpolation Logic */}
                 <motion.div 
                   className="h-full bg-accent-volt"
                   initial={{ width: "0%" }}
                   animate={{ width: `${progress}%` }}
                   transition={{ ease: "linear", duration: 0.15 }}
                 />
                 
                 {/* Internal Striated Diagnostic Hash Grid Overlayed directly over the filling block */}
                 <div className="absolute inset-0 pointer-events-none w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(0,0,0,0.4)_8px,rgba(0,0,0,0.4)_12px)] z-20"></div>
               </div>
            </div>
          </motion.div>
          
        </motion.div>
      )}
    </AnimatePresence>
  )
}
