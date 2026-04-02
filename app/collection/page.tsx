export default function Collection() {
  const products = [
    { name: 'EXO-TRENCH 01', price: 699, img: '/col_out_1_1775043953311.png', cat: 'Outerwear' },
    { name: 'SYNTH-CARGO V2', price: 349, img: '/col_bot_1_1775044003047.png', cat: 'Bottoms' },
    { name: 'NEON-CORE TEE', price: 185, img: '/col_top_1_1775044025699.png', cat: 'Tops' },
    { name: 'VOID-WALKER BOOTS', price: 420, img: '/void_sneakers_1775039980673.png', cat: 'Footwear' },
    { name: 'GRID-RUNNER HOODIE', price: 210, img: '/crazy_3d_streetwear.png', cat: 'Outerwear' },
    { name: 'NEURAL-LINK VEST', price: 550, img: '/exo_jacket_volt_1775039942732.png', cat: 'Outerwear' },
  ]

  return (
    <div className="pt-40 pb-32 px-[5%] max-w-[1600px] mx-auto relative z-10 min-h-screen">
      <div className="border-b-8 border-white mb-20 pb-10 flex justify-between items-end">
        <h1 className="font-heading font-black text-[12vw] leading-none text-white tracking-tighter uppercase m-0">INVENTORY</h1>
        <p className="text-accent-volt font-mono font-bold text-xl uppercase bg-black px-4 py-2 border-2 border-accent-volt hidden md:block">
          STATUS: ACTIVE<br/>ITEMS: 06
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p, i) => (
          <div key={i} className="group relative bg-surface-raw border-4 border-white p-4 transition-all duration-200 hover:border-accent-volt hover:-translate-y-4 hover:shadow-[12px_12px_0_0_#ccff00] hov">
            <div className="relative w-full h-[500px] mb-6 overflow-hidden border-2 border-white/20">
               <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[0.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 filter contrast-125 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: 'url(' + p.img + ')' }}></div>
               <div className="absolute top-4 left-4 bg-accent-volt text-black font-mono font-bold px-3 py-1">
                 {p.cat}
               </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading font-black text-4xl text-white group-hover:text-accent-volt tracking-tight uppercase leading-none">{p.name}</h3>
              </div>
              <p className="font-mono text-xl font-bold text-black bg-white px-3 py-2 group-hover:bg-accent-volt transition-colors">${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
