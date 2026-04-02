# Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the VΞLT hero section into a strict, high-contrast Spatial Quadrant Grid with immersive scroll-triggered animations inspired by `makedesign.tech`.

**Architecture:** We will replace the current glitch text hero section in `app/page.tsx` with a rigid CSS Grid layout (`grid-cols-12`). We will also add GSAP ScrollTrigger to fade out the rigid grid borders once the user begins scrolling, revealing the 3D void beneath.

**Tech Stack:** React, Tailwind CSS, GSAP, Next.js.

---

### Task 1: Reconstruct the Hero Section HTML Layout

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the current `<section>` with the Spatial Grid structure.**

Find the following exact code chunk inside `app/page.tsx`:
```tsx
      {/* Epic Glitched Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center z-10 pointer-events-none overflow-hidden border-b-[20px] border-accent-volt">
        <h1
          className="glitch-text font-heading font-black text-[18vw] leading-[0.75] tracking-tighter text-accent-volt pointer-events-auto hover:scale-105 transition-transform duration-300 relative z-20 drop-shadow-[0_0_20px_#ccff00]"
          style={{ textShadow: '8px 8px 0px #fff' }}
          data-text="HIGH VOLT"
        >
          HIGH<br />VOLT
        </h1>
        <div className="absolute top-32 left-8 md:left-12 border-2 border-accent-volt p-4 text-left font-mono text-accent-volt text-xs uppercase bg-black/80 backdrop-blur-sm pointer-events-auto group hov hover:bg-accent-volt hover:text-black transition-colors z-20 shadow-[8px_8px_0_0_#ccff00]">
          <p className="font-bold mb-2">COLLECTION: 04</p>
          <p>DROP: WINTER / 2026</p>
          <p>LOAD: 98.4% STOCK</p>
        </div>
        <div className="absolute bottom-32 right-8 md:right-12 font-mono text-xs text-white max-w-[250px] text-justify bg-surface-raw p-4 border border-white/20 pointer-events-auto hov">
          DEPLOYING NEXT-GEN TACTICAL FABRICATIONS. BRUTALIST STREETWEAR DESIGNED FOR EXTREME CYBERNETIC ENVIRONMENTS.
        </div>
      </section>
```

Replace it entirely with the newly designed spatial grid:
```tsx
      {/* Epic Spatial Quadrant Grid Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center z-10 pointer-events-auto overflow-hidden border-b-[2px] border-white/20 hero-container">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 grid-rows-2 md:grid-rows-1 w-full h-full hero-grid-lines pointer-events-none z-20">
          
          {/* Left Quadrant: Glitch Branding & Text */}
          <div className="col-span-1 md:col-span-5 border-b-[2px] md:border-b-0 md:border-r-[2px] border-white/20 flex flex-col justify-between p-8 md:p-12 relative pointer-events-auto hov">
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
          <div className="col-span-1 md:col-span-7 flex flex-col items-end justify-between p-8 md:p-12 relative pointer-events-none">
            {/* Corner Decorative Matrix Lines */}
            <div className="absolute top-8 right-8 w-16 h-16 border-t-[4px] border-r-[4px] border-accent-volt opacity-80 mix-blend-screen pointer-events-auto hov hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-[4px] border-l-[4px] border-accent-volt opacity-80 mix-blend-screen pointer-events-auto hov hover:scale-110 transition-transform"></div>
            
            <div className="border border-white/20 p-4 text-left font-mono text-white text-xs uppercase bg-black/80 backdrop-blur-sm group hover:bg-accent-volt hover:text-black transition-colors shadow-[8px_8px_0_0_#ccff00] pointer-events-auto cursor-pointer hov self-end">
              <p className="font-bold mb-2">COLLECTION: 04</p>
              <p>DROP: WINTER / 2026</p>
              <p>CANVAS: ACTIVE 3D</p>
            </div>
            
            <div className="font-heading font-black text-2xl text-accent-volt opacity-50 uppercase pointer-events-auto hov">
              SCROLL TO INITIATE SEQUENCE //
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Start local dev server and manually verify the UI layout.**

Run: `npm run build` to verify no syntactic errors, then `npm run dev &`. Check browser at localhost:3000.
Expected: New rigid layout renders with borders dividing the space. 

### Task 2: Implement GSAP Grid Dissolve Animation

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Edit the `useEffect` hook to animate grid collapse on scroll.**

Inside the existing `useEffect` of `app/page.tsx`, directly below the `// Snappy brutalist reveals` block, add the GSAP scroll-triggered animation for the grid borders.

Look for:
```tsx
      // Snappy brutalist reveals
      gsap.utils.toArray<HTMLElement>('.brutal-reveal').forEach((el) => {
...
      })
```

Add exactly this code:
```tsx
      // Grid dissolve on scroll
      gsap.to('.hero-grid-lines > div, .hero-container', {
        borderColor: 'rgba(255, 255, 255, 0)',
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        }
      })
```

- [ ] **Step 2: Add CSS transition definition.**

- [ ] **Step 3: Run build check to verify GSAP integration passes typing.**

Run: `npm run build`
Expected: Next.js types build successfully without compiler errors.

- [ ] **Step 4: Commit changes.**

```bash
git add app/page.tsx
git commit -m "feat: spatial quadrant grid layout and scroll animation for hero"
```

