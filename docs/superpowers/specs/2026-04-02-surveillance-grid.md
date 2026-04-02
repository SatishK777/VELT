# VΞLT Interactive Redesign - Surveillance Grid

## 1. Overview
Adding a highly interactive "Surveillance Grid" section below the Hero. The user will be presented with a stark, dark terminal background. As they move their cursor, a brutalist "spotlight" will reveal high-resolution lookbook images hidden underneath. Clicking engages the image, halting the mask and slamming product specs onto the screen.

## 2. Architecture & Layout
- **Container:** Full width, `min-h-[150vh]` to give ample scrolling and exploration room.
- **Background Layer:** A deep black `#050505` canvas with a faint, static cyber-grid (`bg-[radial-gradient...]` or SVG matrix).
- **Foreground (Masked) Layer:** A masonry layout of product and lookbook images (reusing some of the assets from `/public`). This layer uses CSS `clip-path` or `mask-image` tied directly to cursor coordinates via framer-motion's `useMouse` to create a flashlight/spotlight effect.

## 3. Visuals & Typography
- **Spotlight Reveal:** A soft radial gradient mask that tracks the pointer. Inside the spotlight, images are fully saturated and 100% visible.
- **Hover Interaction:** When hovering over a revealed image, it pulses, and brutalist text (Volt Yellow `#CCFF00`) overlaid on the image locks onto the cursor.
- **Typography:** Retain the Cyber-Acid vibe with `font-heading` overlapping `font-mono` stat blocks that glitch rapidly when activated.

## 4. Implementation Direction
- Create a new component `components/SurveillanceGrid.tsx`.
- Track mouse position continuously on the `window` using React state or Framer Motion's `useMotionValue`.
- Use a `maskImage` style dynamically updated via `motion.div` to punch a transparent "hole" showing the hidden images underneath.
- Drop `<SurveillanceGrid />` into `app/page.tsx` right under the massive marquee.
