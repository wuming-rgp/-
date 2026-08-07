'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltedCard from '../../components/TiltedCard'
import ProjectDock from '../../components/ProjectDock'

let scrollRefreshFrame = null

function refreshScrollMeasurements() {
  if (scrollRefreshFrame !== null) return

  scrollRefreshFrame = requestAnimationFrame(() => {
    scrollRefreshFrame = null
    ScrollTrigger.refresh()
  })
}

function AutoPlayVideo({ src, label, className = '', onReady, priority = false }) {
  const video = useRef(null)

  useEffect(() => {
    const element = video.current
    if (!element) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => {})
      else element.pause()
    }, {
      rootMargin: '180px 0px',
      threshold: 0.01,
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <video ref={video} className={className} muted loop playsInline controls controlsList="nodownload noremoteplayback" disablePictureInPicture draggable={false} onContextMenu={(event) => event.preventDefault()} onLoadedMetadata={onReady} preload={priority ? 'metadata' : 'none'} src={src} aria-label={label} />
}

function isVideoMedia(source) {
  return /\.(mp4|webm|mov)(?:$|\?)/i.test(source)
}

export default function ProjectDetail({ project }) {
  const page = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-detail-nav, .detail-hero-meta', { y: -18, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.fromTo('.detail-title span', { yPercent: 120, scaleY: 1.24, opacity: 0, filter: 'blur(12px)' }, {
        yPercent: 0,
        scaleY: 1,
        opacity: 1,
        duration: 1.35,
        stagger: 0.12,
        delay: 0.08,
        ease: 'power4.out',
      })
      gsap.fromTo('.detail-hero-image', { clipPath: 'inset(0 0 100% 0)', scale: 1.06 }, {
        clipPath: 'inset(0 0 0% 0)',
        scale: 1,
        duration: 1.55,
        delay: 0.24,
        ease: 'power4.inOut',
      })

      gsap.utils.toArray('.detail-reveal').forEach((item) => {
        gsap.fromTo(item, { y: 66, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('.detail-gallery-image').forEach((image) => {
        gsap.fromTo(image, { scale: 1.14, yPercent: 12 }, {
          scale: 1,
          yPercent: -5,
          ease: 'none',
          scrollTrigger: { trigger: image.closest('.detail-gallery-card'), start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      })
    }, page)
    return () => ctx.revert()
  }, [project.slug])

  return <main className="project-detail-page" data-project={project.slug} ref={page}>
    <div className="project-detail-background" aria-hidden="true" />
    <ProjectDock activeSlug={project.slug} />

    <section className="detail-hero detail-shell">
      <div className="detail-hero-meta"><span>{project.eyebrow}</span><span>{project.year}</span></div>
      <h1 className="detail-title">{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
      <div className="detail-hero-grid">
        <TiltedCard className={`detail-hero-image${project.heroVideo ? ' detail-hero-video' : ''}`} rotateAmplitude={1.5}>{project.heroVideo
          ? <AutoPlayVideo className="detail-hero-media" src={project.heroVideo} label={`${project.name} 项目主视觉视频`} onReady={refreshScrollMeasurements} priority />
          : <img src={project.heroImage} alt={`${project.name} 项目主视觉`} width={project.slug === '3d-assets' ? 1280 : undefined} height={project.slug === '3d-assets' ? 720 : undefined} decoding="async" onLoad={refreshScrollMeasurements} draggable={false} onContextMenu={(event) => event.preventDefault()} />}</TiltedCard>
        <div className="detail-hero-copy">
          <p>{project.summary}</p>
          <dl>
            <div><dt>ROLE</dt><dd>{project.role}</dd></div>
            <div><dt>TYPE</dt><dd>PERSONAL PORTFOLIO</dd></div>
          </dl>
          <div className="detail-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </section>

    {project.gallery.length > 0 && <section className="detail-section detail-shell">
      <div className="detail-section-heading detail-reveal"><span>01 · SELECTED MEDIA</span><h2>把每一个状态，<br /><em>变成可感知的体验。</em></h2></div>
      <div className="detail-gallery detail-media-gallery">
        {project.gallery.map((media, index) => <TiltedCard className={`detail-gallery-card detail-reveal${isVideoMedia(media) ? ' detail-gallery-video-card' : ' detail-gallery-image-card'}`} rotateAmplitude={1.8} key={media}>
          {isVideoMedia(media)
            ? <AutoPlayVideo src={media} label={`${project.name} 作品视频 ${index + 1}`} onReady={refreshScrollMeasurements} />
            : <img className="detail-gallery-image" src={media} alt={`${project.name} 作品画面 ${index + 1}`} width={project.slug === '3d-assets' ? 1280 : undefined} height={project.slug === '3d-assets' ? 720 : undefined} loading="lazy" decoding="async" onLoad={refreshScrollMeasurements} draggable={false} onContextMenu={(event) => event.preventDefault()} />}
          <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
        </TiltedCard>)}
      </div>
    </section>}

    {project.videos.length > 0 && <section className="detail-section detail-shell detail-motion-section">
      <div className="detail-section-heading detail-reveal"><span>02 · MOTION STUDIES</span><h2>让视觉语言<br /><em>开始流动。</em></h2></div>
      <div className="detail-video-grid">
        {project.videos.map((video, index) => <TiltedCard className="detail-video detail-reveal" rotateAmplitude={1.6} key={video}>
          <div className="detail-video-label"><span>{String(index + 1).padStart(2, '0')}</span><span>PLAY STUDY</span></div>
          <video controls playsInline controlsList="nodownload noremoteplayback" disablePictureInPicture draggable={false} onContextMenu={(event) => event.preventDefault()} preload="metadata" src={video} aria-label={`${project.name} 动效视频 ${index + 1}`} />
        </TiltedCard>)}
      </div>
    </section>}

    <footer className="detail-footer detail-shell">
      <p>任国鹏 · 3D HMI 动效设计师</p>
      <Link href="/#work">探索下一项目 <span>↗</span></Link>
    </footer>
  </main>
}
