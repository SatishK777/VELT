import Navbar from '@/components/Navbar'

export default function ProtocolPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <section className="relative min-h-screen p-8 md:p-24 bg-[#050505] overflow-hidden">
        <div className="absolute right-[-10%] top-[20%] text-[25vw] font-heading font-black text-white/5 pointer-events-none leading-none select-none">
          SECURE
        </div>
        <h1 className="font-heading font-black text-7xl md:text-[8vw] text-white uppercase tracking-tighter mb-16 border-l-[16px] border-accent-volt pl-8 relative z-10 mt-16 md:mt-0">
          PROTOCOL
        </h1>
        <div className="max-w-4xl space-y-8 font-mono text-lg text-white/70 relative z-10">
          <div className="p-8 md:p-12 border-2 border-white/10 bg-black hover:border-accent-volt hover:shadow-[10px_10px_0_0_#ccff00] transition-all duration-300">
            <h2 className="text-4xl font-heading font-black text-accent-volt mb-6 uppercase tracking-tight">01. NO RESTOCKS</h2>
            <p className="leading-relaxed">Once a physical asset is depleted from the global matrix, it will not be replicated. All fabrications are final. Do not transmit queries requesting restock parameters.</p>
          </div>
          <div className="p-8 md:p-12 border-2 border-white/10 bg-black hover:border-accent-volt hover:shadow-[10px_10px_0_0_#ccff00] transition-all duration-300">
            <h2 className="text-4xl font-heading font-black text-accent-volt mb-6 uppercase tracking-tight">02. TRANSMISSION SECURITY</h2>
            <p className="leading-relaxed">All shipping coordinates must be encrypted and verified by the host node. We are not liable for intercepted drops by rogue elements. Verify local tracking networks post-purchase.</p>
          </div>
          <div className="p-8 md:p-12 border-2 border-white/10 bg-black hover:border-[#D40000] hover:shadow-[10px_10px_0_0_#D40000] transition-all duration-300">
            <h2 className="text-4xl font-heading font-black text-[#D40000] mb-6 uppercase tracking-tight">03. DEFECT TOLERANCE</h2>
            <p className="leading-relaxed">Minor glitches or variations in tactical gear are intentional aesthetic markers of authenticity. Total system failure returns are accepted within 14 cycles. Initiate COMMS to request an RMA auth token.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
