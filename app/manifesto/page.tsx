import Navbar from '@/components/Navbar'

export default function ManifestoPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <section className="relative min-h-[90vh] flex items-center justify-center bg-accent-volt text-black overflow-hidden selection:bg-black selection:text-white p-8 md:p-24">
        
        {/* Intense Brutalist Grid Background overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '100px 100px' }}></div>
        
        <div className="max-w-6xl z-10 text-center relative mt-16 md:mt-0">
          <h1 className="font-heading font-black text-[15vw] md:text-[12vw] leading-[0.8] mb-16 mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-700">
            WE ARE <br/>THE GLITCH
          </h1>
          <p className="font-mono text-xl md:text-3xl font-bold max-w-4xl mx-auto leading-[1.8] border-t-8 border-black pt-16 tracking-wide">
            VΞLT WAS FORGED IN THE STATIC BETWEEN THE HIGH-RISE AND THE GUTTER. WE ENGINEER HEAVY-DUTY ARCHITECTURE FOR THE DIGITAL ERA. NO FAST FASHION. ONLY PERMANENT HARDWARE AND UNCOMPROMISING AESTHETICS.
          </p>
          <div className="mt-16 animate-pulse font-heading font-black text-4xl">{`/// DO NOT COMPLY.`}</div>
        </div>
      </section>
    </main>
  )
}
