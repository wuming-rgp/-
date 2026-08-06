'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from './projects/project-data'
import TiltedCard from './components/TiltedCard'
import Grainient from './components/Grainient'
import SideRays from './components/SideRays'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const skills = [
  ['01', '三维体验设计', '以概念、模型、材质、灯光与动效构建完整的三维体验。'],
  ['02', 'HMI 动效系统', '为仪表、中控、智驾等场景建立清晰的状态、节奏与反馈。'],
  ['03', '开发协同落地', '衔接 DCC、Unreal 与开发流程，兼顾视觉品质和实现效率。'],
  ['04', '设计资产规范', '沉淀组件、动效与审核标准，提升跨团队复用与交付质量。'],
]

export default function Page() {
  const page = useRef(null)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-shell, .hero-meta', { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' })
      gsap.fromTo('.hero-title > span', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.25, stagger: 0.11, delay: 0.18, ease: 'power4.out' })
      gsap.fromTo('.hero-foot', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.62, ease: 'power3.out' })

      gsap.utils.toArray('.scroll-section').forEach((section) => {
        const title = section.querySelector('.scroll-title')
        const subtitle = section.querySelector('.scroll-subtitle')
        const cards = section.querySelectorAll('.scroll-card')
        const copy = section.querySelectorAll('.scroll-copy')

        if (title) {
          gsap.fromTo(title, { yPercent: 115, scaleY: 1.35, opacity: 0, filter: 'blur(10px)' }, {
            yPercent: 0, scaleY: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out',
            scrollTrigger: { trigger: section, start: 'top 72%', once: true },
          })
        }
        if (subtitle) {
          gsap.fromTo(subtitle, { y: 36, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.05, delay: 0.22, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 68%', once: true },
          })
        }
        if (copy.length) {
          gsap.fromTo(copy, { y: 28, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 62%', once: true },
          })
        }
        if (cards.length) {
          gsap.fromTo(cards, { y: 92, scaleY: 0.78, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
            y: 0, scaleY: 1, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.28, stagger: 0.16, ease: 'power4.out',
            scrollTrigger: { trigger: cards[0].parentElement, start: 'top 78%', once: true },
          })
        }
      })

      gsap.utils.toArray('.project-image img, .project-image video').forEach((image) => {
        gsap.fromTo(image, { scale: 1.22, yPercent: 10 }, {
          scale: 1, yPercent: -4, ease: 'none',
          scrollTrigger: { trigger: image.closest('.project-card'), start: 'top bottom', end: 'bottom top', scrub: 0.9 },
        })
      })
    }, page)
    return () => ctx.revert()
  }, [])

  return <main ref={page}>
    <div className="site__grainient" aria-hidden="true">
        <Grainient color1="#c67dff" color2="#2421bf" color3="#5172fc" timeSpeed={0.25} colorBalance={-0.21} warpStrength={1.0} warpFrequency={5.0} warpSpeed={2.0} warpAmplitude={50.0} blendAngle={0.0} blendSoftness={0.6} rotationAmount={500.0} noiseScale={2.0} grainAmount={0.01} grainScale={2.0} grainAnimated={false} contrast={1.8} gamma={0.45} saturation={0.2} centerX={0.0} centerY={0.0} zoom={1} />
    </div>
    <div className="site__background-mask" aria-hidden="true" />
    <section className="hero" id="home">
      <nav className="nav-shell"><a className="brand" href="#home">REN<span>·</span>HMI</a><div className="nav-links"><a href="#about">关于我</a><a href="#work">精选项目</a><a href="#skills">专业能力</a></div><a className="nav-cta" href="mailto:1019431896@qq.com">联系我 <span>↗</span></a></nav>
      <SideRays
        speed={0.18}
        rayColor1="#EAF2FF"
        rayColor2="#A9BDDF"
        intensity={1.8}
        spread={2.4}
        origin="top-right"
        tilt={0}
        saturation={0.55}
        blend={0.78}
        falloff={1.35}
        opacity={0.48}
        className="hero-side-rays"
      />
      <div className="hero__layout">
        <div className="hero__copy hero__content"><div className="hero-meta"><span>PERSONAL PORTFOLIO</span><i /> <span>3D HMI DESIGNER</span></div><h1 className="hero-title"><span>REN</span><span>GUOPENG</span></h1><p className="hero-subtitle">Creating immersive digital experiences<br />for future mobility.</p><a className="hero-explore" href="#work">探索精选作品 <b>↘</b></a></div>
      </div>
      <div className="hero-foot"><span>SHANGHAI · CHINA</span><a href="#about">向下探索 <b>↓</b></a><span>SCROLL TO DISCOVER</span></div>
    </section>

    <section className="about section-shell scroll-section" id="about"><div className="eyebrow scroll-copy">01 · 关于我</div><div className="section-title-wrap"><p className="section-title-english scroll-title">ABOUT.</p></div><div className="about-grid"><TiltedCard className="portrait-frame scroll-card" rotateAmplitude={2.2}><img className="portrait-photo" src={`${basePath}/images/ren-guopeng-portrait.jpg`} alt="任国鹏个人照片" draggable={false} onContextMenu={(event) => event.preventDefault()} /><span>REN GUOPENG / 3D HMI</span></TiltedCard><TiltedCard className="about-content" rotateAmplitude={1.4}><h2 className="scroll-subtitle">让每一帧动态<br />都服务于<span>理解与感受。</span></h2><p className="scroll-copy">我是一名专注于 3D HMI 与动态体验的设计师，拥有 7 年工业设计与智能座舱设计经验。通过清晰的视觉语言与精确的运动节奏，让复杂系统自然地被感知。</p><div className="pill-row scroll-copy"><span>上海 / 可远程</span><a href="mailto:1019431896@qq.com">1019431896@qq.com ↗</a><span>汽车 · 3D · 动效</span></div></TiltedCard></div><div className="stats">{[['07+', '年设计经验'], ['05+', '汽车项目经验'], ['01', '红点奖项目']].map(([value, label]) => <TiltedCard className="scroll-card" rotateAmplitude={2} scaleOnHover={1.025} key={label}><strong>{value}</strong><span>{label}</span></TiltedCard>)}</div></section>

    <section className="work scroll-section" id="work"><div className="section-shell work-heading"><div className="eyebrow scroll-copy">02 · 精选项目</div><div><div className="section-title-wrap"><h2 className="scroll-title">SELECTED<br /><span>WORK.</span></h2></div><p className="scroll-copy">从概念到量产，以三维设计与动效塑造下一代车载体验。</p></div></div><div className="project-grid section-shell">{projects.map((project) => <TiltedCard className="project-card scroll-card" rotateAmplitude={2.4} scaleOnHover={1.015} key={project.number}><Link className="project-link" href={`/projects/${project.slug}`} aria-label={`查看 ${project.name} 项目`}><div className="project-image">{project.previewVideo ? <video src={project.previewVideo} autoPlay muted loop playsInline controlsList="nodownload noremoteplayback" disablePictureInPicture draggable={false} onContextMenu={(event) => event.preventDefault()} preload="metadata" aria-label={`${project.name} 项目预览视频`} /> : <img src={project.image} alt={`${project.name} 项目展示`} draggable={false} onContextMenu={(event) => event.preventDefault()} />}</div><div className="project-info"><div><h3>{project.name}</h3><p>{project.label}</p></div><span className="project-open" aria-hidden="true">↗</span></div></Link></TiltedCard>)}</div></section>

    <section className="skills section-shell scroll-section" id="skills"><div className="eyebrow scroll-copy">03 · 专业能力</div><div className="section-title-wrap"><p className="section-title-english scroll-title">CAPABILITIES.</p></div><div className="skills-heading"><h2 className="scroll-subtitle">让动效<br />更有<span>意义。</span></h2><p className="scroll-copy">从策略、视觉到技术落地，以系统化思考创造可感知的体验价值。</p></div><div className="skill-grid">{skills.map(([number, title, copy]) => <TiltedCard className="skill-card scroll-card" rotateAmplitude={2.2} scaleOnHover={1.02} key={number}><h3>{title}</h3><p>{copy}</p><span className="skill-arrow">↗</span></TiltedCard>)}</div></section>

    <section className="contact scroll-section" id="contact"><div className="contact-halo" /><div className="section-shell contact-inner"><div className="eyebrow scroll-copy">04 · 联系我</div><div className="section-title-wrap"><p className="section-title-english scroll-title">CONTACT.</p></div><p className="scroll-copy">有项目想一起做吗？</p><a className="scroll-subtitle" href="mailto:1019431896@qq.com">一起让体验<br /><span>动起来。</span> <b>↗</b></a><TiltedCard className="contact-card scroll-card" borderRadius={24}><a className="contact-card-link" href="mailto:1019431896@qq.com" aria-label="发送邮件联系任国鹏"><span>CONTACT</span><strong>1019431896@qq.com</strong><small>SHANGHAI · CHINA</small><em>3D HMI · MOTION ↗</em></a></TiltedCard><div className="footer scroll-copy"><span>© 2026 任国鹏</span><span>SHANGHAI · CHINA</span><a href="#home">返回顶部 ↑</a></div></div></section>
  </main>
}
