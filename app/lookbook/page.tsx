export default function Lookbook() {
  const images = [
    '/col_bot_1_1775044003047.png',
    '/col_out_1_1775043953311.png',
    '/col_top_1_1775044025699.png',
    '/home_rec_2_1775043832949.png',
    '/home_rec_3_1775043883142.png',
    '/story_bg_1775043910637.png'
  ]

  return (
    <div className="pt-48 pb-32 px-[5%] max-w-[1800px] mx-auto relative z-10 min-h-screen">
      <h1 className="font-heading font-black text-[15vw] leading-[0.8] text-accent-volt text-center mb-10 tracking-tighter mix-blend-difference">
        VISUAL DATA
      </h1>
      <div className="w-full h-8 bg-accent-volt mb-20 flex items-center px-4 font-mono font-bold text-black text-sm uppercase">
        <div className="whitespace-nowrap overflow-hidden tracking-[0.2em] w-full text-center">ARCHIVE RECORDS /// DECLASSIFIED VISUALS /// HIGH TENSION DEPLOYMENTS ///</div>
      </div>

      <div className="columns-1 lg:columns-2 gap-16 space-y-16">
        {images.map((img, i) => (
          <div key={i} className="relative w-full h-auto bg-black border-8 border-white group hov hover:border-accent-volt transition-colors duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={"Lookbook Image " + i} className="w-full h-auto object-cover filter contrast-150 grayscale group-hover:grayscale-0 transition-all duration-300" />
            <div className="absolute -left-6 -top-6 bg-accent-volt text-black font-heading font-black text-6xl p-4 shadow-[8px_8px_0_0_#fff] group-hover:translate-x-2 group-hover:translate-y-2 transition-transform">
               {i + 1}
            </div>
            <div className="absolute bottom-4 right-4 bg-black text-white font-mono font-bold text-xl px-4 py-2 border-2 border-white group-hover:text-accent-volt group-hover:border-accent-volt">
               REC_ID: 100{i}-VX{i * 3}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
