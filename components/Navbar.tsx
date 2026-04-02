'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const links = ['Collection', 'Story', 'Lookbook', 'Drop']

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-6 py-4 z-[1000] bg-black border-b-4 border-accent-volt transform-gpu will-change-transform"
      >
        <Link href="/" className="font-heading font-black text-3xl md:text-4xl text-white transition-colors hov group" onClick={() => setIsOpen(false)}>
          V<span className="text-accent-volt">Ξ</span>LT
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <Link 
              key={link} 
              href={`/${link.toLowerCase()}`}
              className="text-white font-mono text-sm font-bold uppercase hover:bg-accent-volt hover:text-black hover:border-black px-3 py-1 border border-transparent transition-all hov"
            >
              {'> '}{link}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Desktop Initiate */}
          <Link href="/initiate" className="hidden md:block px-6 py-2 bg-accent-volt text-black font-heading font-black text-xl uppercase transition-all duration-100 hover:bg-white hover:shadow-[4px_4px_0_0_#fff] border-2 border-transparent hover:border-black hov">
            INITIATE
          </Link>
          
          {/* Mobile Hamburger Icon */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[1001]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`h-[3px] w-8 bg-accent-volt transition-transform duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`h-[3px] w-8 bg-accent-volt transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-[3px] w-8 bg-accent-volt transition-transform duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: 'anticipate' }}
            className="fixed inset-0 bg-black z-[999] flex flex-col justify-center items-center overflow-hidden pt-20"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            
            <div className="flex flex-col gap-6 text-center relative z-10 w-full px-8 max-h-[80vh] overflow-y-auto">
              {links.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={`/${link.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block font-heading font-black text-5xl sm:text-6xl text-white hover:text-accent-volt transition-colors uppercase border-b-2 border-white/10 pb-4"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.4 }}
                 className="mt-6"
              >
                  <Link 
                    href="/initiate" 
                    onClick={() => setIsOpen(false)}
                    className="inline-block px-12 py-4 bg-accent-volt text-black font-heading font-black text-3xl uppercase border-4 border-transparent active:bg-white active:shadow-[4px_4px_0_0_#fff]"
                  >
                    INITIATE
                  </Link>
              </motion.div>

              {/* Utility Pages grid added for mobile convenience */}
              <div className="mt-8 w-full grid grid-cols-2 gap-4 border-t-[4px] border-accent-volt pt-8 text-white/70 font-mono text-sm uppercase">
                <Link href="/archives" onClick={() => setIsOpen(false)}>Archives</Link>
                <Link href="/protocol" onClick={() => setIsOpen(false)}>Protocol</Link>
                <Link href="/manifesto" onClick={() => setIsOpen(false)}>Manifesto</Link>
                <Link href="/support" onClick={() => setIsOpen(false)}>Support</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
