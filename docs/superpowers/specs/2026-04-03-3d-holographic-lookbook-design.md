# 3D Holographic Procedural Lookbook - Design Spec

## Purpose
Convert the existing 2D `HolographicCarousel.tsx` into a true WebGL 3D experience where the items are represented as fully procedural, glowing cyber-geometries powered by Three.js and React Three Fiber.

## Approach: Procedural Cyber-Geometries
Since we are aiming for an intense "Cyber-Acid Brutalist" aesthetic matching the provided screenshot, we will transition from using static `.png` images to procedural 3D geometric shapes (e.g., Torus, Octahedron, Icosahedron) that act as abstract representations of each product.

### Dependencies
- **three** and **@react-three/fiber** (Already installed)
- **@react-three/drei** (Already installed)
- **@react-three/postprocessing** (Needs to be installed) - Crucial for adding the intense "Neon Bloom" and glowing glitch effects seen in the screenshot.

### Visualization & Scene Architecture
1. **The Canvas Shell**: 
   - A single `<Canvas>` element will replacing the 2D "cards" stack in `HolographicCarousel.tsx`.
   - The scene will feature a dark background with grid helpers and concentric data rings on the floor to simulate the "holographic projector pad" seen in the screenshot.
2. **Procedural Items (The "Apparel")**:
   - Each of the 3 items originally represented as a `.png` will be given a unique procedural geometry.
     - Item 1 (Neon Runner): `TorusKnotGeometry`
     - Item 2 (Exo Suit): Complex `IcosahedronGeometry` 
     - Item 3 (Tactical Vest): Spiky `DodecahedronGeometry`
   - **Shader / Materials**: A `MeshBasicMaterial` with `wireframe: true` and bright cyan (`#00FFFF`) or volt (`#CCFF00`) colors. 
   - Additive blending will be used so intersecting lines glow intensely.
3. **The Hologram Base**:
   - We will render glowing, rotating wireframe circles on the floor (`CylinderGeometry` with `wireframe` or `TorusGeometry`) underneath the active model to mimic the screenshot's floor rings.
4. **Interactivity**:
   - The model will slowly auto-rotate.
   - Using Framer Motion 3D or `@react-three/drei`'s `PresentationControls`, the model will slightly pivot and react to mouse movements, just like the current carousel.

### Animations & Transitions
When the user clicks "Next" or "Prev", instead of shifting cards, the active 3D geometry will swiftly scale down and glitch out into particles/wireframes, and the next geometry will phase in with an intense bloom flicker.

## Potential Trade-offs
- Adding `@react-three/postprocessing` Bloom can have a slight performance cost on lower-end devices, but is necessary for the true cyberpunk glow effect. We will optimize by limiting the bloom resolution and threshold.
- The 3D shapes are abstract representations, not exact scans of the clothing. This matches the "wireframe cybernetic" theme.

## Next Steps
1. User reviews this spec.
2. If approved, transition to `writing-plans` skill to generate the step-by-step implementation plan.
