'use client'

// Compatibility adapter: existing portfolio card content keeps its original
// API while the shared surface owns both tilt and the masked edge highlight.
import InteractiveSpecularCard from './InteractiveSpecularCard'

export default function TiltedCard({
  rotateAmplitude,
  showMobileWarning,
  showTooltip,
  displayOverlayContent,
  overlayContent,
  ...props
}) {
  return <InteractiveSpecularCard
    {...props}
    rotateAmplitude={rotateAmplitude}
  />
}
