'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

const DROP_ITEMS = [
  {
    id: '01',
    name: 'EXO-JACKET .VOLT',
    price: '$850',
    status: 'LOCKED',
    img: '/exo_jacket_volt_1775039942732.png'
  },
  {
    id: '02',
    name: 'TRENCH RUNNER',
    price: '$420',
    status: 'LOCKED',
    img: '/home_rec_2_1775043832949.png'
  },
  {
    id: '03',
    name: 'VOID SNEAKERS',
    price: '$350',
    status: 'LOCKED',
    img: '/void_sneakers_1775039980673.png'
  }
]

export default function DropPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Mathematical horizontal mapping for 3 items
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%'])
  
  // Parallax extreme background logic
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-150%'])

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      
      {/* Physical scroll container granting the height timeline */}
      <section ref={containerRef} className="relative h-[300vh] w-full bg-[#050505]">
        
        {/* Sticky camera viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* Typographic parallax layer */}
          <motion.div 
            style={{ x: textX }} 
            className="absolute z-0 flex whitespace-nowrap font-heading font-black text-[30vw] text-white-[0.02] opacity-5 select-none pointer-events-none"
          >
            DROP 01 // NO RESTOCKS // HIGH TENSION APPAREL // INITIATE PROTOCOL // DO NOT COMPLY //
          </motion.div>

          {/* Slider track layer */}
          <motion.div 
            style={{ x, width: `${DROP_ITEMS.length * 100}vw` }}
            className="absolute z-10 flex h-full items-center pl-[5vw] transform-gpu will-change-transform"
          >
            {DROP_ITEMS.map((item) => (
              <div key={item.id} className="relative h-full w-[100vw] flex-shrink-0 flex items-center justify-center">
                
                {/* Product Card Container */}
                <div className="relative h-[70%] w-[90%] md:w-[60%] lg:w-[45%] group border-4 border-white/10 overflow-hidden bg-black/80 backdrop-blur-3xl shadow-2xl">
                   
                   {/* Tactical Information Readouts */}
                   <div className="absolute top-6 left-6 z-20 font-mono text-accent-volt text-lg border border-accent-volt px-3 py-1 font-bold">
                      ASSET {item.id}
                   </div>
                   <div className="absolute top-6 right-6 z-20 font-mono text-[#D40000] text-lg font-black border border-[#D40000] px-3 py-1 animate-pulse">
                      {item.status}
                   </div>

                   {/* Background Sub-Grid Matrix */}
                   <div className="absolute inset-0 z-0 pointer-events-none opacity-20 border-[1px] border-white/5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                   {/* Visual Render Object */}
                   <div className="absolute inset-x-8 inset-y-24 z-10 overflow-hidden">
                       <Image 
                         src={item.img} 
                         alt={item.name} 
                         fill 
                         className="object-contain contrast-[1.2] grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-[1.15]" 
                       />
                   </div>

                   {/* Data Slate Interface Reveal */}
                   <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-8">
                      <h2 className="font-heading font-black text-6xl text-accent-volt uppercase leading-[0.9] tracking-tighter mix-blend-difference">{item.name}</h2>
                      <div className="mt-8 flex justify-between items-end border-t-2 border-white/20 pt-6">
                        <div>
                          <span className="block font-mono text-white/50 text-sm mb-1 uppercase tracking-widest">Clearance Code Needed</span>
                          <span className="font-mono text-4xl font-black text-white">{item.price}</span>
                        </div>
                        <button className="font-mono bg-accent-volt text-black px-8 py-4 font-black hover:bg-white hover:text-black transition-colors uppercase tracking-widest group/btn relative overflow-hidden">
                          <span className="relative z-10 group-hover/btn:opacity-0 transition-opacity">Request Auth</span>
                          <span className="absolute inset-0 z-20 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 text-[#D40000] font-black tracking-widest uppercase transition-transform duration-300">Denied</span>
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
    </main>
  )
}
