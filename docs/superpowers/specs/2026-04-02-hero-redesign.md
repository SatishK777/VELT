# VΞLT Hero Redesign - Spatial Quadrant Grid

## 1. Overview
Redesigning the hero section of the VΞLT landing page to emulate the highly creative, mindblowing Spatial Grid aesthetic inspired by `makedesign.tech`. The objective is to replace the current floating structure with a precise, high-contrast, Brutalist grid that elegantly frames our 3D elements.

## 2. Architecture & Layout
- **Strict Geometric Grid:** The primary viewport will be divided into rigid, thin-bordered rectangular quadrants.
  - **Primary Quadrant (Center/Right):** Houses the interactive 3D WebGL `CanvasScene`.
  - **Header Block (Left):** Massive uppercase `HIGH VOLT` glitch text, bounded by strict lines.
  - **Data Blocks:** Small, monospaced tech readouts (e.g., Collection 04, Stock constraints) placed in corners, imitating a tactical HUD.
- **Scroll-Triggered Evolution:** The hero will be initially pinned. Scrolling will trigger GSAP animations that fade out the grid lines and seamlessly expand the 3D element to full screen before continuing down to the product showcases.

## 3. Visuals & Typography
- **Colors:** Utilitarian Black (`#050505`), Pure White typography, and signature Volt Yellow (`#CCFF00`) for interactive elements and hover states.
- **Typography:** 
  - Thick, uppercase sans-serif (`font-heading`) for primary brutalist impact.
  - Functional monospaced text (`font-mono`) for terminal-like text.
- **Effects:** Heavy drop shadows `[8px_8px_0_0_#ccff00]` and glitch jitter to retain the Cyber-Acid vibe. Hovering over quadrants will trigger high-opacity Volt Yellow backgrounds and negative text colors.

## 4. Implementation Direction
- Restructure the top `<section>` of `app/page.tsx` using Tailwind CSS Grid (`grid-cols-12`, dividing spaces mathematically).
- Apply GSAP `ScrollTrigger` to orchestrate the transition from the rigid grid state to an open, immersive 3D state on scroll.
