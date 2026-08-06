'use client'

import { useEffect } from 'react'

const MEDIA_SELECTOR = 'img, video'

export default function ContentProtection() {
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault()
    }

    const preventMediaDrag = (event) => {
      const target = event.target

      if (target instanceof Element && target.closest(MEDIA_SELECTOR)) {
        event.preventDefault()
      }
    }

    const preventSaveShortcuts = (event) => {
      const key = event.key.toLowerCase()
      const savePage = (event.ctrlKey || event.metaKey) && key === 's'
      const viewSource = (event.ctrlKey || event.metaKey) && key === 'u'

      if (!savePage && !viewSource) return

      event.preventDefault()
      event.stopPropagation()
    }

    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('dragstart', preventMediaDrag)
    window.addEventListener('keydown', preventSaveShortcuts, { capture: true })

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('dragstart', preventMediaDrag)
      window.removeEventListener('keydown', preventSaveShortcuts, { capture: true })
    }
  }, [])

  return null
}
