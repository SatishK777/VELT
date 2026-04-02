import Navbar from '@/components/Navbar'

export default function ArchivesPage() {
  return (
    <main className="bg-black text-white min-h-screen uppercase">
      <Navbar />
      <section className="relative min-h-[90vh] flex flex-col items-center pl-4 pr-4 justify-center py-24 bg-[#050505]">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <h1 className="font-heading font-black text-8xl md:text-[10vw] text-accent-volt tracking-tighter mb-16 text-center mix-blend-exclusion">
          ARCHIVES
        </h1>
        <div className="w-full max-w-5xl border-4 border-white/10 p-4 md:p-12 bg-black/50 backdrop-blur-md overflow-x-auto shadow-2xl">
          <table className="w-full font-mono text-left text-sm md:text-xl">
            <thead>
              <tr className="border-b-4 border-accent-volt text-accent-volt">
                <th className="pb-6">ASSET_ID</th>
                <th className="pb-6 hidden md:table-cell">COLLECTION</th>
                <th className="pb-6 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {['V_01_GENESIS', 'V_02_VOID', 'V_03_TRENCH', 'V_04_CYBER'].map((id, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-accent-volt/10 hover:border-accent-volt transition-colors cursor-crosshair">
                  <td className="py-8 font-bold">{id}</td>
                  <td className="py-8 text-white/30 hidden md:table-cell">DATA CORRUPTED // ERROR 404</td>
                  <td className="py-8 text-right text-[#D40000] font-black tracking-widest animate-pulse">TERMINATED</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
