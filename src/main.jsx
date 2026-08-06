import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './hero-refine.css'
import './pills.css'

const Arrow = () => <span className="arrow" aria-hidden="true">&#8599;</span>

const projects = [
  { id: '01', title: '保时捷', type: '高端车机 · 3D 交互体验', image: '/assets/project-porsche.png' },
  { id: '02', title: '越野概念', type: '车型场景 · 3D 概念设计', image: '/assets/project-offroad.png' },
  { id: '03', title: 'HMI 动效', type: '智能座舱 · 动效系统', image: '/assets/project-hmi.png' },
]

const strengths = [
  ['01', '3D 设计', '从概念到模型、材质、灯光、动画与最终交付，全流程推进。'],
  ['02', 'HMI 动效', '围绕仪表、中控与智驾场景，建立清晰的状态与节奏。'],
  ['03', '引擎落地', '连接 DCC、Unreal 与开发团队，兼顾视觉精度与实现效率。'],
  ['04', '设计规范', '沉淀资产、动效与审核流程，推动多方高质量协作。'],
]

function App() {
  return <main>
    <section className="hero" id="home">
      <div className="hero-media" aria-hidden="true"><div className="hero-image" /><div className="hero-scrim" /><div className="grid" /></div>
      <nav className="nav shell"><a className="brand" href="#home">REN<span>·</span>HMI</a><div className="nav-links"><a href="#about">关于我</a><a href="#work">精选项目</a><a href="#contact">联系我</a></div><a className="contact-pill" href="mailto:1019431896@qq.com">立即联系 <Arrow /></a></nav>
      <div className="hero-content shell"><p className="eyebrow">任国鹏 <span>/</span> 3D HMI 动效设计师</p><h1>让运动<br /><em>成为体验。</em></h1><div className="hero-bottom"><p>专注智能座舱与 3D HMI，为复杂系统创造清晰、有温度的动态体验。</p><a className="scroll" href="#about">向下探索 <b>&darr;</b></a></div></div>
    </section>

    <section className="about shell" id="about"><div className="section-tag">( 01 - 关于我 )</div><div className="about-layout"><div className="portrait"><div className="portrait-light" /><span>任国鹏 / 3D HMI</span></div><div><p className="intro">你好，我是任国鹏，一名专注于<span> 3D HMI 与动态体验</span>的设计师。拥有 7 年设计经验，持续探索科技体验中的清晰表达与情绪温度。</p><div className="about-details"><p><small>所在城市</small><a className="info-pill" href="#contact">上海 / 可远程</a></p><p><small>邮箱</small><a className="info-pill" href="mailto:1019431896@qq.com">1019431896@qq.com</a></p><p><small>专注方向</small><span className="info-pill">汽车 · 3D HMI · 动效</span></p></div></div></div><div className="stats"><div><strong>07<sup>+</sup></strong><span>年设计经验</span></div><div><strong>05<sup>+</sup></strong><span>汽车项目经验</span></div><div><strong>01</strong><span>红点奖项目</span></div></div></section>

    <section className="work" id="work"><div className="shell work-head"><div className="section-tag">( 02 - 精选项目 )</div><h2>精选<br /><em>项目。</em></h2><p>参与 Volvo、Porsche、现代等智能座舱项目，部分内容受保密协议限制。</p></div><div className="projects shell">{projects.map((project) => <article className="project-card" key={project.id}><div className="project-visual"><img src={project.image} alt={`${project.title} 项目展示`} /></div><div className="project-meta"><span>{project.id}</span><div><h3>{project.title}</h3><p>{project.type}</p></div><Arrow /></div></article>)}</div></section>

    <section className="strength shell"><div className="section-tag">( 03 - 我的能力 )</div><div className="strength-heading"><h2>让动效<br />更有 <em>意义。</em></h2><p>从概念到交付，用系统化思考创造可感知、可落地的体验价值。</p></div><div className="strength-grid">{strengths.map(([number, title, text]) => <article className="strength-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><div className="corner" /></article>)}</div></section>

    <section className="contact" id="contact"><div className="contact-glow" /><div className="shell contact-inner"><div className="section-tag">( 04 - 联系我 )</div><p className="contact-kicker">有项目想一起做吗？</p><a href="mailto:1019431896@qq.com" className="contact-title">一起让体验<br /><em>动起来。</em><Arrow /></a><div className="footer-line"><span>&copy; 2026 任国鹏</span><span>上海 · 中国</span><a href="#home">返回顶部 &uarr;</a></div></div></section>
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
