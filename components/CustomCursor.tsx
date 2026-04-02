'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const orbRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let trailX = mouseX
    let trailY = mouseY
    let animationFrameId: number

    const updateMousePos = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
    }

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.2 // fast, snappy brutalist trail
      trailY += (mouseY - trailY) * 0.2
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(2)' : 'scale(1)'}`
      }
      animationFrameId = requestAnimationFrame(animateTrail)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.hov') || target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT') {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePos)
    window.addEventListener('mouseover', handleMouseOver)
    animateTrail()

    return () => {
      window.removeEventListener('mousemove', updateMousePos)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isHovering])

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (orbRef.current) orbRef.current.style.display = 'none';
      if (trailRef.current) trailRef.current.style.display = 'none';
      document.body.style.cursor = 'auto';
    }
  }, [])

  return (
    <>
      <div 
        ref={orbRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-difference transition-all duration-100 ease-out
          ${isHovering 
            ? 'w-1 h-1 bg-transparent' 
            : 'w-4 h-4 bg-accent-volt'
          }`}
      />
      <div 
        ref={trailRef}
        className={`fixed top-0 left-0 rounded-none pointer-events-none z-[9990] transition-all duration-300 ease-out border-4
          ${isHovering 
            ? 'w-24 h-24 border-accent-volt bg-transparent shadow-[8px_8px_0_0_rgba(204,255,0,0.3)]' 
            : 'w-12 h-12 border-white bg-transparent shadow-none'}`}
      />
    </>
  )
}
