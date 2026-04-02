export default function Story() {
  return (
    <div className="pt-52 pb-32 px-[5%] max-w-[1400px] mx-auto relative z-10 min-h-screen">
      <h1 className="font-heading font-black text-[18vw] leading-[0.75] mb-20 text-white tracking-tighter uppercase relative z-20 mix-blend-difference">
        CORE<br/>SYS<span className="text-accent-volt">TEM</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="font-mono text-xl md:text-2xl text-white/80 leading-relaxed font-bold border-l-8 border-accent-volt pl-8 py-4 bg-black/50 backdrop-blur-sm">
          <p className="mb-8">
            &gt; DO NOT ADAPT TO THE FUTURE.
          </p>
          <p className="mb-8">
            &gt; WEAR IT.
          </p>
          <p className="text-accent-volt">
            &gt; VLT IS AN ATELIER FOR THE CYBERNETIC AGE, SYNTHESIZING BLEEDING-EDGE TEXTILES WITH ARCHITECTURAL PRECISION.
          </p>
        </div>
        
        <div className="relative w-full h-[600px] border-8 border-white bg-black group hov hover:border-accent-volt transition-colors z-10">
          <div className="absolute inset-0 bg-cover bg-center filter grayscale contrast-150 group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url("/story_bg_1775043910637.png")' }}>
          </div>
          <div className="absolute -bottom-8 -right-8 bg-accent-volt text-black font-heading font-black text-8xl px-6 py-2 shadow-[12px_12px_0_0_#fff]">
            VLT
          </div>
        </div>
      </div>
    </div>
  )
}
