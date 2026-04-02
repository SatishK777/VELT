'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1
      meshRef.current.rotation.y = t * 0.2
    }
    if (ring1.current) {
      ring1.current.rotation.z = t * -0.5
      ring1.current.rotation.x = Math.sin(t * 0.5) * 1.5
    }
    if (ring2.current) {
      ring2.current.rotation.z = t * 0.4
      ring2.current.rotation.y = Math.cos(t * 0.3) * 1.2
    }
  })

  return (
    <group>
      {/* Central Core - Brutalist Geometric Polyhedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef} scale={3.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh scale={3.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ccff00" wireframe />
        </mesh>
      </Float>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1} scale={7}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2} scale={9.5}>
        <torusGeometry args={[1, 0.05, 4, 100]} />
        <meshBasicMaterial color="#ccff00" wireframe />
      </mesh>
    </group>
  )
}

function DataGrid() {
  // Endlessly scrolling floor grid
  const gridRef = useRef<THREE.GridHelper>(null)
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 4) % 2
    }
  })
  return (
    <group position={[0, -5, 0]}>
      <gridHelper ref={gridRef} args={[100, 50, '#ccff00', '#111111']} />
    </group>
  )
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  const [positions] = useState(() => {
    const pos = new Float32Array(3000)
    for(let i=0; i<3000; i++){
      pos[i] = (Math.random() - 0.5) * 60
    }
    return pos
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1000} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.6} />
    </points>
  )
}

export default function CanvasScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 16]} fov={60} />
        <ambientLight intensity={3} />
        <directionalLight position={[5, 10, 5]} color="#ccff00" intensity={4} />
        <directionalLight position={[-5, 5, -5]} color="#ccff00" intensity={3} />
        <directionalLight position={[0, -5, 10]} color="#ccff00" intensity={2} />
        
        <CyberCore />
        <DataGrid />
        <Particles />
      </Canvas>
    </div>
  )
}
