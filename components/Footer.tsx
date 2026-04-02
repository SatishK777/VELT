'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-8 py-20 bg-accent-volt relative z-10 border-t-[10px] border-black">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-black">
        <div className="md:col-span-6">
          <span className="font-heading font-black text-8xl md:text-[8vw] leading-none block border-b-8 border-black pb-4 mb-8">VΞLT</span>
          <p className="font-mono text-xl font-bold max-w-lg mb-8 bg-black text-accent-volt p-4">
            {'// TERMINAL OF OPERATIONS'}<br/>
            {'// HIGH TENSION GEAR'}
          </p>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="font-heading font-black text-3xl mb-8 uppercase border-l-8 border-black pl-4">DATA</h4>
          <div className="flex flex-col gap-4 font-mono font-bold">
            {['Archives', 'Protocol', 'Manifesto', 'Support'].map(link => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="text-black hover:bg-black hover:text-accent-volt px-2 py-1 transition-colors w-fit hov">
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
           <h4 className="font-heading font-black text-3xl mb-8 uppercase border-l-8 border-black pl-4">COMM</h4>
           <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER SECURE CHANNEL..." 
                required 
                className="bg-black border-4 border-black p-4 text-accent-volt font-mono font-bold outline-none placeholder-accent-volt/50 focus:border-white hov"
              />
              <button 
                type="submit" 
                className="bg-black text-white font-heading font-black text-2xl py-4 hover:bg-white hover:text-black border-4 border-black transition-colors hov"
              >
                CONNECT
              </button>
           </form>
        </div>
      </div>
    </footer>
  )
}
