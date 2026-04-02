import Navbar from '@/components/Navbar'

export default function SupportPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row bg-[#050505]">
        <div className="w-full lg:w-1/2 p-8 pt-32 lg:p-24 flex flex-col justify-center border-r-[10px] border-white/5 relative z-10 bg-black/50 backdrop-blur-sm">
          <h1 className="font-heading font-black text-[12vw] lg:text-[7vw] text-accent-volt leading-[0.85] mb-12">
            SUPPORT SYSTEM
          </h1>
          <p className="font-mono text-lg lg:text-xl text-white/50 mb-12 border-l-4 border-accent-volt pl-6 leading-relaxed">
            Initialize transmission to the central node. Responses typically arrive within 24-48 standard cycles. End-to-end encryption is active.
          </p>
          <form className="flex flex-col gap-6 font-mono">
            <input type="text" placeholder="CODENAME [NAME]" className="p-6 bg-transparent border-4 border-white/10 text-white focus:border-accent-volt focus:bg-accent-volt/5 focus:outline-none placeholder-white/30 tracking-widest transition-colors" />
            <input type="email" placeholder="SECURE COMM LOOP [EMAIL]" className="p-6 bg-transparent border-4 border-white/10 text-white focus:border-accent-volt focus:bg-accent-volt/5 focus:outline-none placeholder-white/30 tracking-widest transition-colors" />
            <textarea placeholder="TRANSMISSION DATA..." rows={6} className="p-6 bg-transparent border-4 border-white/10 text-white focus:border-accent-volt focus:bg-accent-volt/5 focus:outline-none placeholder-white/30 tracking-widest resize-none transition-colors"></textarea>
            <button type="button" className="bg-accent-volt text-black font-heading font-black text-4xl py-6 hover:bg-white hover:shadow-[10px_10px_0_0_#fff] border-4 border-transparent hover:border-black transition-all uppercase mt-4">
              SEND DIRECTIVE
            </button>
          </form>
        </div>

        {/* Tactical UI Right Side */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-black overflow-hidden relative group">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
          
          {/* Radar Circles */}
          <div className="absolute w-[150%] h-[150%] border-[2px] border-accent-volt/10 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[100%] h-[100%] border-[4px] border-dashed border-accent-volt/20 rounded-full animate-spin-slow [animation-direction:reverse]"></div>
          <div className="absolute w-[50%] h-[50%] border-[1px] border-accent-volt/40 rounded-full flex items-center justify-center">
             <div className="w-full h-[1px] bg-accent-volt/40 animate-spin-slow"></div>
          </div>
          
          <div className="text-center z-10 bg-black p-12 border-4 border-accent-volt shadow-[0_0_50px_rgba(204,255,0,0.2)]">
            <div className="text-accent-volt mb-8 block font-black text-8xl animate-pulse">
               //
            </div>
            <p className="font-mono text-white tracking-[0.5em] text-2xl font-bold">NODE_SECURE</p>
            <p className="font-mono text-accent-volt/50 text-sm mt-4 tracking-widest">AWAITING INPUT...</p>
          </div>
        </div>
      </section>
    </main>
  )
}
