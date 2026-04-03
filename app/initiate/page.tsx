'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function InitiatePage() {
  const [inputVal, setInputVal] = useState('')
  const [access, setAccess] = useState<'pending' | 'granted' | 'denied'>('pending')
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputVal.toUpperCase() === 'VELT' || inputVal.toUpperCase() === 'GLITCH') {
        setAccess('granted')
        setTimeout(() => {
          window.location.href = '/drop' // Redirect to primary drop after auth
        }, 1500)
      } else {
        setAccess('denied')
        setTimeout(() => setAccess('pending'), 2000)
      }
    }
  }

  return (
    <main className="bg-black text-white min-h-screen font-mono">
      <Navbar />
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-8 bg-[#050505]">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        {/* Terminal Window */}
        <div className="w-full max-w-2xl border-4 border-accent-volt lg:mt-16 bg-black relative shadow-[0_0_50px_rgba(204,255,0,0.1)]">
          <div className="bg-accent-volt px-4 py-2 text-black font-bold flex justify-between uppercase">
            <span>SYS.TERMINAL // AUTH</span>
            <span className="animate-pulse">_REC</span>
          </div>
          <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-end relative">
            <div className="absolute top-8 left-8 text-white/50 text-sm whitespace-pre-wrap">
              {'>'} INITIALIZING SECURE PROTOCOL...<br/>
              {'>'} ENCRYPTING CONNECTION... [OK]<br/>
              {'>'} AWAITING OVERRIDE KEYCODE...
            </div>

            {access === 'denied' && (
              <div className="text-[#D40000] font-black text-2xl animate-pulse mb-8 border-l-4 border-[#D40000] pl-4">
                [!] ACCESS DENIED. INVALID CLEARANCE TIER.
              </div>
            )}

            {access === 'granted' && (
              <div className="text-accent-volt font-black text-2xl animate-pulse mb-8 border-l-4 border-accent-volt pl-4">
                [+] ACCESS GRANTED. DECRYPTING DROP SECTOR...
              </div>
            )}

            {access === 'pending' && (
              <div className="flex items-center text-4xl">
                <span className="mr-4 text-accent-volt">{'>'}</span>
                <input 
                  autoFocus
                  type="text" 
                  className="bg-transparent text-white border-none outline-none w-full uppercase tracking-widest placeholder-white/20"
                  placeholder="ENTER ACCESS KEY"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
            <div className="mt-8 text-xs text-white/20 uppercase tracking-widest">
              [SYSTEM] Press INT (Enter) to execute directive. Hint: &apos;VELT&apos;
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
