'use client'

import { useEffect, useRef } from 'react'
import './InteractiveSpecularCard.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

// All cards share one passive window listener. The registry lets nearby cards
// respond without expanding their DOM boxes or placing an invisible hit layer
// above links and neighbouring content.
const cardRegistry = new Set()
const globalPointer = { x: 0, y: 0, ready: false }
let globalFrame = null
let globalListenersAttached = false

// Signed distance to the real rounded-rectangle contour. Unlike measuring
// only four straight edges, this also produces the correct distance at every
// corner arc.
function roundedRectDistance(x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  const px = x - width / 2
  const py = y - height / 2
  const qx = Math.abs(px) - (width / 2 - safeRadius)
  const qy = Math.abs(py) - (height / 2 - safeRadius)

  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
    + Math.min(Math.max(qx, qy), 0)
    - safeRadius
}

function updateRegisteredCards() {
  globalFrame = null
  if (!globalPointer.ready) return
  cardRegistry.forEach(card => card.update(globalPointer.x, globalPointer.y))
}

function scheduleRegisteredCardsUpdate() {
  if (globalFrame === null) globalFrame = requestAnimationFrame(updateRegisteredCards)
}

function handleGlobalPointerMove(event) {
  if (event.pointerType === 'touch') return
  globalPointer.x = event.clientX
  globalPointer.y = event.clientY
  globalPointer.ready = true
  scheduleRegisteredCardsUpdate()
}

function resetRegisteredCards() {
  globalPointer.ready = false
  cardRegistry.forEach(card => card.reset())
}

function handleGlobalPointerOut(event) {
  if (event.relatedTarget === null) resetRegisteredCards()
}

function attachGlobalListeners() {
  if (globalListenersAttached) return
  globalListenersAttached = true
  window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true })
  window.addEventListener('pointerout', handleGlobalPointerOut)
  window.addEventListener('blur', resetRegisteredCards)
  window.addEventListener('scroll', scheduleRegisteredCardsUpdate, { passive: true, capture: true })
}

function detachGlobalListeners() {
  if (!globalListenersAttached || cardRegistry.size) return
  globalListenersAttached = false
  window.removeEventListener('pointermove', handleGlobalPointerMove)
  window.removeEventListener('pointerout', handleGlobalPointerOut)
  window.removeEventListener('blur', resetRegisteredCards)
  window.removeEventListener('scroll', scheduleRegisteredCardsUpdate, true)
  if (globalFrame !== null) cancelAnimationFrame(globalFrame)
  globalFrame = null
  globalPointer.ready = false
}

function registerCard(card) {
  cardRegistry.add(card)
  attachGlobalListeners()
  return () => {
    cardRegistry.delete(card)
    detachGlobalListeners()
  }
}

export default function InteractiveSpecularCard({
  children,
  className = '',
  style,
  borderRadius = 28,
  radius,
  rotateAmplitude = 0,
  edgeDetectionRange = 40,
  ...rootProps
}) {
  const wrapperRef = useRef(null)
  const surfaceRef = useRef(null)
  const frameRef = useRef(null)
  const geometryRef = useRef({ width: 1, height: 1, radius: 0 })
  const stateRef = useRef({
    x: 0,
    y: 0,
    opacity: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    targetX: 0,
    targetY: 0,
    targetOpacity: 0,
    targetRotateX: 0,
    targetRotateY: 0,
    targetScale: 1,
    ready: false,
  })

  const resolvedRadius = radius ?? borderRadius

  useEffect(() => {
    const wrapper = wrapperRef.current
    const surface = surfaceRef.current
    if (!wrapper || !surface) return undefined

    const writeFrame = () => {
      const state = stateRef.current
      // About 80ms of perceived follow-through, without CSS transition
      // conflicts while the pointer is moving quickly.
      state.x += (state.targetX - state.x) * 0.2
      state.y += (state.targetY - state.y) * 0.2
      state.opacity += (state.targetOpacity - state.opacity) * 0.16
      state.rotateX += (state.targetRotateX - state.rotateX) * 0.18
      state.rotateY += (state.targetRotateY - state.rotateY) * 0.18
      state.scale += (state.targetScale - state.scale) * 0.18

      wrapper.style.setProperty('--mouse-x', `${state.x}px`)
      wrapper.style.setProperty('--mouse-y', `${state.y}px`)
      wrapper.style.setProperty('--edge-opacity', state.opacity.toFixed(4))
      wrapper.style.setProperty('--tilt-x', `${state.rotateX.toFixed(3)}deg`)
      wrapper.style.setProperty('--tilt-y', `${state.rotateY.toFixed(3)}deg`)
      wrapper.style.setProperty('--tilt-scale', state.scale.toFixed(4))

      const stillMoving = Math.abs(state.targetX - state.x) + Math.abs(state.targetY - state.y) > 0.08
        || Math.abs(state.targetOpacity - state.opacity) > 0.002
        || Math.abs(state.targetRotateX - state.rotateX) + Math.abs(state.targetRotateY - state.rotateY) > 0.01
        || Math.abs(state.targetScale - state.scale) > 0.001

      frameRef.current = stillMoving ? requestAnimationFrame(writeFrame) : null
    }

    const requestFrame = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(writeFrame)
    }

    const syncGeometry = () => {
      // The wrapper is deliberately never transformed, so these dimensions
      // remain the trustworthy local coordinate system for pointer input.
      const rect = wrapper.getBoundingClientRect()
      const style = window.getComputedStyle(surface)
      const measuredRadius = Number.parseFloat(style.borderTopLeftRadius) || resolvedRadius
      const width = Math.max(rect.width, 1)
      const height = Math.max(rect.height, 1)
      const geometry = geometryRef.current
      geometry.width = width
      geometry.height = height
      geometry.radius = Math.min(measuredRadius, width / 2, height / 2)

      const state = stateRef.current
      if (!state.ready) {
        state.ready = true
        state.x = state.targetX = width / 2
        state.y = state.targetY = height / 2
        wrapper.style.setProperty('--mouse-x', `${state.x}px`)
        wrapper.style.setProperty('--mouse-y', `${state.y}px`)
      }
    }

    const updateFromGlobalPointer = (clientX, clientY) => {
      const rect = wrapper.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const geometry = geometryRef.current
      const width = geometry.width || rect.width
      const height = geometry.height || rect.height
      const distanceToBorder = Math.abs(roundedRectDistance(x, y, width, height, geometry.radius))
      const linearIntensity = clamp(1 - distanceToBorder / edgeDetectionRange, 0, 1)
      const edgeOpacity = linearIntensity * linearIntensity * (3 - 2 * linearIntensity)
      const state = stateRef.current
      const normalizedX = clamp(x / width, 0, 1) - 0.5
      const normalizedY = clamp(y / height, 0, 1) - 0.5
      const pointerInside = x >= 0 && x <= width && y >= 0 && y <= height

      // x and y intentionally remain unclamped. Negative values and values
      // beyond width/height position the radial light just outside the card.
      state.targetX = x
      state.targetY = y
      state.targetOpacity = edgeOpacity
      state.targetRotateX = pointerInside ? -normalizedY * rotateAmplitude : 0
      state.targetRotateY = pointerInside ? normalizedX * rotateAmplitude : 0
      // Scale is intentionally locked to 1. The card can still tilt, but
      // never grows under the cursor and therefore keeps its page rhythm.
      state.targetScale = 1

      if (edgeOpacity > 0 || pointerInside || state.opacity > 0.002
        || Math.abs(state.rotateX) + Math.abs(state.rotateY) > 0.01) {
        requestFrame()
      }
    }

    const resetFromGlobalPointer = () => {
      const state = stateRef.current
      state.targetOpacity = 0
      state.targetRotateX = 0
      state.targetRotateY = 0
      state.targetScale = 1
      requestFrame()
    }

    const observer = new ResizeObserver(syncGeometry)
    observer.observe(wrapper)
    syncGeometry()
    const unregisterCard = registerCard({
      update: updateFromGlobalPointer,
      reset: resetFromGlobalPointer,
    })

    return () => {
      observer.disconnect()
      unregisterCard()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [edgeDetectionRange, resolvedRadius, rotateAmplitude])

  return (
    <div
      {...rootProps}
      ref={wrapperRef}
      className={`card-wrapper interactive-specular-card ${className}`}
      style={{
        '--card-radius': `${resolvedRadius}px`,
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--edge-opacity': 0,
        '--tilt-x': '0deg',
        '--tilt-y': '0deg',
        '--tilt-scale': 1,
        ...style,
      }}
    >
      <div ref={surfaceRef} className="card-surface">
        <div className="card-content">{children}</div>
      </div>
    </div>
  )
}
