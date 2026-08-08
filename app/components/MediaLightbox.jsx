'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function MediaLightbox({ media, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!media) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [media, onClose])

  if (!media || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${media.label} 放大预览`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        ref={closeButtonRef}
        className="media-lightbox__close"
        type="button"
        onClick={onClose}
        aria-label="关闭放大预览"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div className="media-lightbox__stage" onMouseDown={(event) => event.stopPropagation()}>
        {media.type === 'video'
          ? <video
              className="media-lightbox__media"
              src={media.src}
              aria-label={media.label}
              controls
              autoPlay
              muted={media.muted}
              loop={media.loop}
              playsInline
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />
          : <img
              className="media-lightbox__media"
              src={media.src}
              alt={media.label}
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />}
      </div>

      <div className="media-lightbox__caption" aria-hidden="true">
        <span>{media.label}</span>
        <span>ESC 关闭</span>
      </div>
    </div>,
    document.body,
  )
}
