'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CanvasScene from '@/components/CanvasScene'
import SurveillanceGrid from '@/components/SurveillanceGrid'
import HolographicCarousel from '@/components/HolographicCarousel'
import NeuralInterfaceSection from '@/components/NeuralInterfaceSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HorizontalLookbook = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // Track continuous structural scroll offset
  const { scrollYProgress } = useScroll({ target: scrollRef })
  
  // Convert vertical scroll distance directly into strict horizontal translation matrix
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"])

  return (
    <div ref={scrollRef} className="relative h-[300vh] z-10 w-full">
      <section className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-accent-volt border-b-[20px] border-black">
        <h2 className="absolute left-[5%] text-[20vw] font-heading font-black text-black/10 z-0 pointer-events-none tracking-tighter leading-none">LOOKBOOK</h2>
        <motion.div style={{ x }} className="flex gap-10 md:gap-20 px-[10vw] md:px-[20vw] relative z-10 w-fit">
          {['/neon_streetwear_model_1775040238060.png', '/home_rec_2_1775043832949.png', '/home_rec_3_1775043883142.png'].map((src, i) => (
            <div key={i} className="min-w-[85vw] md:min-w-[70vw] h-[60vh] md:h-[75vh] border-[8px] md:border-[12px] border-black overflow-hidden relative group hov bg-black">
              <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-300 object-cover" style={{ backgroundImage: `url(${src})` }}></div>
              <div className="absolute top-0 right-0 bg-black text-accent-volt font-mono font-bold text-2xl md:text-4xl p-4 md:p-6 border-b-8 border-l-8 border-accent-volt">
                REC_0{i + 1}
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.9, 0.3, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch text jitter
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
      glitchTl.to('.glitch-text', { x: -10, skewX: -10, filter: 'hue-rotate(90deg)', duration: 0.05 })
        .to('.glitch-text', { x: 10, skewX: 10, filter: 'hue-rotate(-90deg)', duration: 0.05 })
        .to('.glitch-text', { x: 0, skewX: 0, filter: 'hue-rotate(0deg)', duration: 0.05 })
        .to('.glitch-text', { opacity: 0.5, duration: 0.02 })
        .to('.glitch-text', { opacity: 1, duration: 0.02 })

      // Snappy brutalist reveals
      gsap.utils.toArray<HTMLElement>('.brutal-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 150, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power4.out', scrollTrigger: {
              trigger: el,
              start: 'top 98%'
            }
          }
        )
      })

      // Grid dissolve on scroll
      gsap.to(['.hero-grid-lines > div', '.hero-container'], {
        borderColor: 'rgba(255, 255, 255, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,
        pointerEvents: 'none',
        scrollTrigger: {
          trigger: '#hero-container',
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        }
      })

      // GSAP pinning removed in favor of native CSS sticky execution and Framer Motion scrolling to guarantee zero gap collisions.

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 500)

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-[-50] bg-transparent overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        >
          {/* Infinitely Sharp WebGL Cybernetic Environment */}
          <div className="absolute inset-0 w-full h-[100vh] z-10">
            <CanvasScene />
          </div>
          
          {/* Edge vignette to meticulously frame the 3D void */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)] z-20 pointer-events-none opacity-90"></div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10 pointer-events-none"></div>
      </div>

      {/* Epic Spatial Quadrant Grid Hero Section */}
      <section className="relative h-[200vh] z-10 w-full" id="hero-container">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none overflow-hidden border-b-[2px] border-white/20 hero-container">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 grid-rows-2 md:grid-rows-1 w-full h-full hero-grid-lines pointer-events-none z-20">
            
            {/* Left Quadrant: Glitch Branding & Text */}
            <div className="col-span-1 md:col-span-5 border-b-[2px] md:border-b-0 md:border-r-[2px] border-white/20 flex flex-col justify-between p-8 md:p-12 relative pointer-events-auto hov bg-black/40 backdrop-blur-sm">
              <div className="font-mono text-xs text-white max-w-[250px] text-justify bg-surface-raw p-4 border border-white/20 uppercase brutal-reveal">
                DEPLOYING NEXT-GEN TACTICAL FABRICATIONS. BRUTALIST STREETWEAR DESIGNED FOR EXTREME CYBERNETIC ENVIRONMENTS.
              </div>
              
              <h1
                className="glitch-text font-heading font-black text-[18vw] md:text-[12vw] leading-[0.75] tracking-tighter text-white hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_20px_#ccff00] self-start"
                style={{ textShadow: '4px 4px 0px #ccff00' }}
                data-text="HIGH VOLT"
              >
                HIGH<br />VOLT
              </h1>
            </div>
            
            {/* Right Quadrant: Digital UI & Spatial Void Focus */}
            <div className="col-span-1 md:col-span-7 flex flex-col items-end justify-between p-8 md:p-12 relative pointer-events-none bg-black/10">
              {/* Corner Decorative Matrix Lines */}
              <div className="absolute top-8 right-8 w-16 h-16 border-t-[4px] border-r-[4px] border-accent-volt opacity-80 mix-blend-screen pointer-events-auto hov hover:scale-110 transition-transform"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 border-b-[4px] border-l-[4px] border-accent-volt opacity-80 mix-blend-screen pointer-events-auto hov hover:scale-110 transition-transform"></div>
              
              <div className="border border-white/20 p-4 text-left font-mono text-white text-xs uppercase bg-black/80 backdrop-blur-sm group hover:bg-accent-volt hover:text-black transition-colors shadow-[8px_8px_0_0_#ccff00] pointer-events-auto cursor-pointer hov self-end">
                <p className="font-bold mb-2">COLLECTION: 04</p>
                <p>DROP: WINTER / 2026</p>
                <p>CANVAS: ACTIVE 3D</p>
              </div>
              
              <div className="font-heading font-black text-2xl text-accent-volt opacity-50 uppercase pointer-events-auto hov brutal-reveal">
                SCROLL TO INITIATE SEQUENCE //
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Funky Marquee */}
      <section className="relative h-32 flex items-center bg-accent-volt overflow-hidden z-20 border-b-[10px] border-black text-black font-heading font-black text-7xl whitespace-nowrap">
        <div className="animate-marquee-fast flex gap-8">
          {Array(10).fill('/// THE DROP IS LIVE /// NO RESTOCKS /// HIGH TENSION APPAREL ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </section>

      {/* Cursor Surveillance Grid Feature */}
      <SurveillanceGrid />

      {/* Product Feature (Custom AI Image 1) */}
      <section className="relative min-h-[120vh] py-32 px-[5%] z-10 bg-black/50 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto">
          <h2 className="font-heading font-black text-[12vw] leading-none mb-12 brutal-reveal uppercase tracking-tighter border-b-8 border-accent-volt pb-4 inline-block">
            EXO-JACKET <span className="text-accent-volt opacity-50">.VOLT</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
            <div className="md:col-span-8 border-8 border-surface-raw bg-black p-4 brutal-reveal hov group relative overflow-hidden transition-all duration-300 hover:border-accent-volt hover:shadow-[16px_16px_0_0_#ccff00]">
              <div className="w-full h-[700px] bg-cover bg-center filter contrast-125 object-cover transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: 'url(/exo_jacket_volt_1775039942732.png)' }}></div>
              <div className="absolute top-8 left-8 bg-accent-volt text-black font-heading font-black text-5xl px-4 py-2 translate-y-[-10px] group-hover:translate-y-0 transition-transform shadow-[8px_8px_0_0_#fff]">
                MATTE BLACK + VOLT
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end gap-8 pb-12 brutal-reveal">
              <h3 className="font-heading font-black text-6xl uppercase tracking-tight">Tactical Fabric</h3>
              <p className="font-mono text-xl leading-relaxed text-white/70 bg-surface-raw p-6 border-l-4 border-accent-volt">
                Engineered with high-tensile hyper-ballistic nylon. Water resistant, tear resistant, entirely modular. The straps glow under direct UV exposure.
              </p>
              <button className="bg-white text-black font-heading font-black text-4xl py-6 px-8 hover:bg-accent-volt hover:shadow-[8px_8px_0_0_#fff] transition-all hov text-left border-4 border-transparent hover:border-black uppercase">
                Secure Asset -&gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Deep-Dive */}
      <section className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden border-y-[15px] border-white z-10 w-full py-24">
        <h2 className="absolute top-[10%] left-[5%] text-[15vw] font-heading font-black text-white/5 tracking-tighter mix-blend-difference pointer-events-none">
          VOID<br />STEPS
        </h2>
        <div className="relative z-20 flex flex-col lg:flex-row gap-12 items-center bg-black/80 backdrop-blur-xl p-8 border-8 border-accent-volt shadow-[20px_20px_0_0_#fff] max-w-6xl w-full mx-6 rotate-[-2deg] hover:rotate-0 transition-transform duration-300 hov">
          <div className="w-full lg:w-1/2 h-[300px] lg:h-[500px] bg-cover bg-center border-4 border-white" style={{ backgroundImage: 'url(/void_sneakers_1775039980673.png)' }}></div>
          <div className="w-full lg:w-1/2">
            <h3 className="font-heading font-black text-6xl lg:text-8xl text-white uppercase leading-[0.85] mb-6">Trench<br /><span className="text-accent-volt">Runners</span></h3>
            <p className="font-mono text-lg text-white/80 mb-8 border-l-2 border-white/20 pl-4">
              Chunky brutalist platform soles. Engineered for concrete traversal. Lock into the grid with high-tension volt straps.
            </p>
            <div className="text-4xl font-heading font-black bg-white text-black self-start px-6 py-2 inline-block">
              $420
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Archive Native Scroll Sequence */}
      <HorizontalLookbook />

      <HolographicCarousel />
      <NeuralInterfaceSection />

      {/* Slow massive marquee */}
      <section className="relative h-48 flex items-center bg-black overflow-hidden z-20 border-b border-white/20 text-white font-heading font-black text-9xl whitespace-nowrap">
        <div className="animate-marquee-slow flex gap-8 opacity-20 hover:opacity-100 transition-opacity duration-300">
          {Array(5).fill('/// REWRITING THE CODE /// HIGH TENSION APPAREL /// CYBERNETIC STREETWEAR ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </section>

      <section className="relative py-48 px-[5%] z-10 bg-black border-t-4 border-white">
        <h2 className="font-heading font-black text-[12vw] md:text-[15vw] leading-[0.85] brutal-reveal text-center massive-clip hover:grayscale transition-all duration-500 hov uppercase">
          SECURE <br /> THE DROP.
        </h2>
      </section>
    </div>
  )
}
