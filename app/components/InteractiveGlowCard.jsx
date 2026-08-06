'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import './InteractiveGlowCard.css'

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

// Same spring language as the official React Bits TiltedCard (JS + CSS).
const tiltSpring = { damping: 30, stiffness: 100, mass: 2 }

export default function InteractiveGlowCard({
  children,
  className = '',
  glowColor = '#9b8cff',
  radius = 28,
  borderRadius,
  rotateAmplitude = 8,
  scaleOnHover = 1.018,
}) {
  const wrapperRef = useRef(null)
  const frameRef = useRef(null)
  const current = useRef({ x: 0, y: 0, opacity: 0 })
  const target = useRef({ x: 0, y: 0, opacity: 0 })
  const rotateX = useSpring(useMotionValue(0), tiltSpring)
  const rotateY = useSpring(useMotionValue(0), tiltSpring)
  const scale = useSpring(1, tiltSpring)

  const render = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const state = current.current
    const next = target.current
    // ~80ms visual follow at a 60Hz refresh rate.
    state.x += (next.x - state.x) * 0.19
    state.y += (next.y - state.y) * 0.19
    state.opacity += (next.opacity - state.opacity) * 0.19

    wrapper.style.setProperty('--mouse-x', `${state.x.toFixed(1)}px`)
    wrapper.style.setProperty('--mouse-y', `${state.y.toFixed(1)}px`)
    wrapper.style.setProperty('--glow-opacity', state.opacity.toFixed(3))

    const stillMoving = Math.abs(next.x - state.x) + Math.abs(next.y - state.y) > 0.2
    const stillFading = Math.abs(next.opacity - state.opacity) > 0.01
    frameRef.current = stillMoving || stillFading ? requestAnimationFrame(render) : null
  }

  const requestRender = () => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(render)
  }

  const handleMove = (event) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const rect = wrapper.getBoundingClientRect()
    const x = clamp(event.clientX - rect.left, 0, rect.width)
    const y = clamp(event.clientY - rect.top, 0, rect.height)
    const edgeDistance = Math.min(x, y, rect.width - x, rect.height - y)
    const edgeFactor = clamp(1 - edgeDistance / 180, 0, 1)

    const offsetX = x - rect.width / 2
    const offsetY = y - rect.height / 2
    const tiltX = (offsetY / Math.max(rect.height / 2, 1)) * -rotateAmplitude
    const tiltY = (offsetX / Math.max(rect.width / 2, 1)) * rotateAmplitude
    rotateX.set(tiltX)
    rotateY.set(tiltY)
    scale.set(scaleOnHover)

    target.current = {
      x,
      y,
      // The center remains subtly alive, while edges receive the full response.
      opacity: 0.1 + Math.pow(edgeFactor, 1.45) * 0.9,
    }
    requestRender()
  }

  const handleLeave = () => {
    target.current = { ...target.current, opacity: 0 }
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    requestRender()
  }

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
  }, [])

  const resolvedRadius = borderRadius ?? radius

  return <div
    ref={wrapperRef}
    className={`card-wrapper ${className}`}
    onMouseMove={handleMove}
    onMouseLeave={handleLeave}
    style={{ '--radius': `${resolvedRadius}px`, '--glow-color': glowColor }}
  >
    <div className="ambient-glow" aria-hidden="true" />
    <motion.div
      className="interactive-card"
      style={{ rotateX, rotateY, scale }}
    >
      <div className="border-base" aria-hidden="true" />
      <div className="border-interactive" aria-hidden="true" />
      <div className="content">{children}</div>
    </motion.div>
  </div>
}
