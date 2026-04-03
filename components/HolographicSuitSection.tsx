'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Float, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import ShaderBackground from '@/components/ui/shader-background'

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    // Morph the plane based on a sine wave flowing upwards
    pos.z += sin(pos.y * 5.0 + uTime * 3.0) * 0.10;
    // Removed shaking
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    // Holographic chromatic shift
    float shift = sin(uTime * 10.0 + vUv.y * 20.0) * 0.005;
    // CRT scanline effect
    float scanline = sin(vUv.y * 800.0 - uTime * 20.0) * 0.04;
    
    vec4 cr = texture2D(uTexture, vUv + vec2(shift, 0.0));
    vec4 cg = texture2D(uTexture, vUv);
    vec4 cb = texture2D(uTexture, vUv - vec2(shift, 0.0));
    
    vec4 col = vec4(cr.r, cg.g, cb.b, cg.a);
    col.rgb += vec3(scanline);
    
    // Mask out the dark background completely to make it a transparent floating hologram
    float luminance = dot(col.rgb, vec3(0.299, 0.587, 0.114));
    if(luminance < 0.15) discard;
    
    gl_FragColor = col;
  }
`

function HologramImage() {
  const tex = useTexture('/hologram_armor_suit_1775197197304.png')
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: tex }
  }), [tex])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <group position={[0, -0.6, 0]}>
      <mesh scale={[7.0, 7.0, 1]}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial 
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Surrounding tactical rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
         <torusGeometry args={[2.4, 0.02, 16, 64]} />
         <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, Math.PI/16, 0]} position={[0, -1, 0]}>
         <torusGeometry args={[3.0, 0.01, 16, 64]} />
         <meshStandardMaterial color="#ccff00" emissive="#ccff00" emissiveIntensity={2} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function HolographicSuitSection() {
  return (
    <section className="relative w-full min-h-[100vh] bg-[#020202] py-24 overflow-hidden border-b-[10px] border-white flex flex-col items-center">
      
      {/* Dynamic 21st.dev WebGL Shader Background */}
      <ShaderBackground className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none" />

      {/* Background Cyber-Acid Gradient Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,255,0,0.02)_0%,rgba(0,0,0,1)_80%)] pointer-events-none z-10"></div>

      <div className="absolute top-12 left-[5%] z-20 pointer-events-none">
        <h2 className="font-heading font-black text-6xl md:text-8xl text-white uppercase tracking-tighter mix-blend-difference drop-shadow-[0_0_20px_#ccff00]">
          ARMOR <br/> <span className="text-accent-volt text-[1.2em] leading-none">HOLOGRAM.</span>
        </h2>
        <div className="font-mono text-white/50 text-xl tracking-widest mt-6 border-l-4 border-accent-volt pl-4">
          [ VΞLT ARMOR PROJECTION ]
        </div>
      </div>

      <div className="absolute bottom-12 right-[5%] text-right z-20 pointer-events-none">
        <div className="font-heading font-black text-white text-5xl opacity-20 uppercase tracking-tighter">DATA // UPLINK</div>
        <div className="font-mono text-accent-volt text-sm mt-2 animate-pulse">[ DRAG TO ROTATE MATRIX ]</div>
      </div>

      <div className="w-full h-[85vh] cursor-crosshair relative z-10">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <ambientLight intensity={0.5} />
          
          <PresentationControls 
            global 
            polar={[-0.2, 0.2]} 
            azimuth={[-0.8, 0.8]}
            snap={true}
          >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <Suspense fallback={null}>
                <HologramImage />
              </Suspense>
            </Float>
          </PresentationControls>

          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.1} 
              luminanceSmoothing={0.9} 
              intensity={2} 
            />
            <ChromaticAberration 
              blendFunction={BlendFunction.NORMAL} 
              offset={new THREE.Vector2(0.003, 0.003)} 
            />
            <Noise opacity={0.02} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Forefront Tactical Overlay Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
         <div className="absolute top-[20%] left-[20%] w-4 h-4 border-t-2 border-l-2 border-accent-volt"></div>
         <div className="absolute bottom-[20%] right-[20%] w-4 h-4 border-b-2 border-r-2 border-accent-volt"></div>
      </div>
    </section>
  )
}
