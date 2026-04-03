# 3D Holographic Lookbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a real WebGL 3D holographic wireframe loop by updating the HolographicCarousel to use Three.js procedural geometries with intense neon blooms.

**Architecture:** We will implement a `HolographicModel` component rendering different rotating shapes via React Three Fiber. `HolographicCarousel` will be modified to mount this canvas directly when a card is active, discarding static pngs for the active item. We'll use `@react-three/postprocessing` for the bloom effect.

**Tech Stack:** React, Next.js, Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing, framer-motion

---

### Task 1: Environment Setup

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install @react-three/postprocessing**

```bash
npm install @react-three/postprocessing
```

- [ ] **Step 2: Verify Installation**

```bash
cat package.json | grep postprocessing
```
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @react-three/postprocessing dependency"
```

### Task 2: Create HolographicModel Component

**Files:**
- Create: `components/HolographicModel.tsx`
- Create: `__tests__/HolographicModel.test.tsx` (using basic component boundary test to bypass WebGL context requirements for Jest)

- [ ] **Step 1: Write a basic failing test**

```tsx
// __tests__/HolographicModel.test.tsx
import React from 'react'
import { render } from '@testing-library/react'
import HolographicModel from '../components/HolographicModel'

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn()
}))

describe('HolographicModel', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<HolographicModel type={1} />)
    expect(getByTestId('canvas')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest` or `npm test __tests__/HolographicModel.test.tsx` (If Jest isn't configured, skip Step 2 to 4 and proceed to manually building, but for TDD discipline, we provide the test). 
*Note: Depending on project setup, simple render tests suffice for 3D components.*

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/HolographicModel.tsx
'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Sphere, TorusKnot, Icosahedron } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const CyberGeometry = ({ type }: { type: number }) => {
  const ref = useRef<any>()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5
      ref.current.rotation.x += delta * 0.2
    }
  })

  // Basic Material
  const material = <meshBasicMaterial wireframe={true} color="#00ffff" />

  switch (type) {
    case 1:
      return <TorusKnot ref={ref} args={[1, 0.4, 128, 32]}>{material}</TorusKnot>
    case 2:
      return <Icosahedron ref={ref} args={[1.5, 1]}>{material}</Icosahedron>
    case 3:
      return <Sphere ref={ref} args={[1.5, 32, 32]}>{material}</Sphere>
    default:
      return <TorusKnot ref={ref} args={[1, 0.4, 128, 32]}>{material}</TorusKnot>
  }
}

export default function HolographicModel({ type }: { type: number }) {
  return (
    <div className="w-full h-full absolute inset-0 z-50 mix-blend-screen pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={1} />
        <PresentationControls global polar={[-0.4, 0.2]} azimuth={[-0.4, 0.2]} config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }}>
          <CyberGeometry type={type} />
        </PresentationControls>
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/HolographicModel.tsx __tests__/HolographicModel.test.tsx
git commit -m "feat: implement procedural 3D holographic geometry component"
```

### Task 3: Integrate into HolographicCarousel

**Files:**
- Modify: `components/HolographicCarousel.tsx`

- [ ] **Step 1: Write integration updates**

Update `components/HolographicCarousel.tsx`. Replace the active state `<Image>` and glitch layers with the `<HolographicModel />`.
Keep inactive items as faint background noise or simple placeholders for performance.

```tsx
// Inside components/HolographicCarousel.tsx, import the model
// import HolographicModel from './HolographicModel'

// In the mapped ITEMS render block:
// Replace condition `isActive ? (...) : (...)`
// When active, mount:
// <HolographicModel type={item.id} />
// Keep the Interactive Plinth Base and scanning layout
```
*(Exact edit bounds to ensure the model visually replaces the previous CRT stack images.)*

- [ ] **Step 2: Commit**

```bash
git add components/HolographicCarousel.tsx
git commit -m "feat: swap static 2d images for 3d procedural holograms in carousel"
```
