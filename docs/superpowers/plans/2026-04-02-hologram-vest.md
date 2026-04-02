# VΞLT Platform Upgrades - Holographic Vest Suit Integration

## 1. Overview
The user requested a massive, intensely animated Holographic 3D section featuring a tactical vest-suit model. We will construct an experiential module (`components/HologramVest.tsx`) that embeds a generated photorealistic cyber-wireframe render and applies extreme CSS mapping and composite layers to simulate a hyper-active, unstable holographic data feed.

## 2. Animation & Interaction Mechanics
- **Chromatic Glitching:** Generating three overlapping composite layers of the image. The red/cyan offset will snap violently using CSS `@keyframes` and Framer Motion randomized offsets.
- **Scanlines:** A continuous overlay `bg-[repeating-linear-gradient(...)]` will translate infinitely downward, simulating CRT projection mechanics.
- **Flicker:** The opacity of the overall container will randomly snap between 100%, 80%, and 20% to look like failing power matrices.
- **Perspective Distortion:** When the user mouse-overs the block, the hologram will skew using CSS `transform: perspective(1000px) rotateY(...)` tracking the cursor.

## 3. Execution Plan
- [ ] **Step 1:** Copy `hologram_vest_model_1775112269615.png` to `/public/hologram_vest.png`. *(Completed)*
- [ ] **Step 2:** Create `components/HologramVest.tsx` incorporating complex pure CSS glitch framing and Framer Motion wrappers. 
- [ ] **Step 3:** Inject `<HologramVest />` into `app/page.tsx` directly above the final `SurveillanceGrid` or Footer CTA, providing a monumental conclusion to the home scroll.
- [ ] **Step 4:** Run manual browser Subagent verification to record the glitch effects.
