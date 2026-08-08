import Link from 'next/link'
import Grainient from '../components/Grainient'
import TiltedCard from '../components/TiltedCard'

export const metadata = {
  title: '个人介绍 · 任国鹏 3D HMI 设计师',
  description: '任国鹏的个人介绍、职业经历与汽车 3D HMI 项目经验。',
}

const strengths = [
  {
    label: '01 / END TO END',
    title: '从概念到落地的完整主导能力',
    copy: '拥有工业设计与智能座舱双重经验，能够统筹需求、视觉、技术和交付资源，推动项目从 0 到 1 稳定落地。',
  },
  {
    label: '02 / SYSTEM THINKING',
    title: '把视觉语言沉淀为设计系统',
    copy: '持续研究行业趋势与前瞻体验，将三维资产、动效节奏和审核标准转化为可复用、可执行的规范。',
  },
  {
    label: '03 / COLLABORATION',
    title: '跨团队协同与结果导向',
    copy: '在客户、产品、交互、开发与测试之间建立清晰沟通路径，兼顾业务目标、技术边界与最终体验。',
  },
]

const experience = [
  {
    period: '2026.07 — 至今',
    company: '酷博思工业产品设计（上海）有限公司',
    role: '3D 设计师 · Volvo 驻场',
    summary: '负责 Volvo HMI 三维视觉与动态体验，建立统一的车内外视觉表达并推进跨团队交付。',
    details: [
      '车内外三维渲染、HMI 动效设计与视觉方向定义',
      '搭建可复用的三维资产系统与素材库',
      '协同设计、产品与开发团队完成高质量落地',
    ],
  },
  {
    period: '2021.11 — 2026.07',
    company: '博泰车联网股份有限公司',
    role: '3D 设计师',
    summary: '面向仪表、中控与智能驾驶场景，负责车载 HMI 三维视觉和动效设计，并参与从评审到量产的完整流程。',
    details: [
      '协同客户、产品、交互、开发与测试推进项目',
      '参与可用性评审，沉淀三维与动效设计规范',
      '开展趋势研究与前瞻概念提案',
    ],
  },
  {
    period: '2019.10 — 2021.11',
    company: '世邦工业科技集团股份有限公司',
    role: '3D 设计师',
    summary: '完成工业产品视觉从建模、材质、灯光到动画输出的全流程设计，为品牌传播与业务展示提供三维内容。',
    details: [
      '产品三维动画与 CG 海报设计',
      '生产线及场地漫游动画制作',
      '建立稳定的视觉输出与交付流程',
    ],
  },
]

const projects = [
  {
    name: 'VOLVO',
    role: '3D HMI 动效设计师',
    period: '2026.07 — 至今',
    summary: '围绕全车型三维 UX、官网视觉与座舱体验建立一致的设计语言，完成三维资产体系、交付规范与跨团队协作。',
    tags: ['3D UX', 'ASSET SYSTEM', 'MOTION SPEC'],
  },
  {
    name: 'PORSCHE',
    role: '3D HMI 动效设计师',
    period: '2024.07 — 至今',
    summary: '主导三维视觉从概念到交付，衔接 DCC、PBR、动画与 Unreal 流程，并协调 Porsche、博泰、Icon Incar 等多方团队。',
    tags: ['DIGITAL COCKPIT', 'PBR', 'UNREAL'],
  },
  {
    name: 'HYUNDAI',
    role: '3D HMI 动效设计师',
    period: '2023.10 — 至今',
    summary: '在 Unreal 中搭建动画、灯光、材质与天气系统，并沉淀电池、空调、语音和图标动效模板。',
    tags: ['UNREAL', 'SYSTEM', 'TEMPLATE'],
  },
  {
    name: 'AVATR',
    role: '3D HMI 动效设计师',
    period: '2022.05 — 2022.12',
    summary: '完成阿维塔 11 灯光秀的完整演示流程，并参与车控相关动态体验设计。',
    tags: ['LIGHT SHOW', 'CAR CONTROL'],
  },
  {
    name: 'VOYAH FREE',
    role: '3D HMI 动效设计师',
    period: '2021.11 — 2022.11',
    summary: '负责 H97A / H97C 三维动效、车辆渲染及车控、智驾、空调与座椅场景，项目获得红点奖。',
    tags: ['3D MOTION', 'ADAS', 'RED DOT'],
  },
]

export default function ProfilePage() {
  return <main className="profile-page">
    <div className="site__grainient" aria-hidden="true">
      <Grainient color1="#c67dff" color2="#2421bf" color3="#5172fc" timeSpeed={0.25} colorBalance={-0.21} warpStrength={1.0} warpFrequency={5.0} warpSpeed={2.0} warpAmplitude={50.0} blendAngle={0.0} blendSoftness={0.6} rotationAmount={500.0} noiseScale={2.0} grainAmount={0.01} grainScale={2.0} grainAnimated={false} contrast={1.8} gamma={0.45} saturation={0.2} centerX={0.0} centerY={0.0} zoom={1} />
    </div>
    <div className="site__background-mask" aria-hidden="true" />

    <nav className="nav-shell profile-dock" aria-label="个人介绍页导航">
      <Link className="brand" href="/">REN<span>·</span>HMI</Link>
      <div className="nav-links">
        <a href="#profile-overview">简介</a>
        <a href="#profile-career">经历</a>
        <a href="#profile-projects">项目</a>
      </div>
      <Link className="nav-cta" href="/">返回主页 <span>↖</span></Link>
    </nav>

    <div className="profile-content">
      <section className="profile-hero profile-shell" id="profile-overview">
        <div className="profile-hero__copy">
          <p className="profile-kicker"><span>PROFILE 2026</span><i /><span>3D HMI DESIGNER</span></p>
          <h1><span>REN</span><span>GUOPENG</span></h1>
          <p className="profile-lead">专注汽车 3D HMI 与动态体验，<br />让复杂系统以清晰、自然且有情绪的方式被感知。</p>
          <div className="profile-contact-list">
            <a href="mailto:1019431896@qq.com">1019431896@qq.com <span>↗</span></a>
            <a href="tel:15771978166">157 7197 8166 <span>↗</span></a>
            <span>SHANGHAI · CHINA</span>
          </div>
        </div>

        <TiltedCard className="profile-portrait-card" rotateAmplitude={1.4} borderRadius={32}>
          <img src="/images/ren-guopeng-portrait.jpg" alt="任国鹏个人照片" draggable={false} />
          <div className="profile-portrait-card__caption">
            <span>任国鹏</span>
            <small>3D HMI / MOTION / AUTOMOTIVE</small>
          </div>
        </TiltedCard>

        <div className="profile-metrics" aria-label="职业数据">
          <div><strong>07<sup>+</sup></strong><span>年设计经验</span></div>
          <div><strong>05<sup>+</sup></strong><span>汽车项目经验</span></div>
          <div><strong>01</strong><span>红点奖项目</span></div>
        </div>
      </section>

      <section className="profile-section profile-shell" aria-labelledby="profile-strengths-title">
        <header className="profile-section-heading">
          <p>01 · CORE STRENGTHS</p>
          <h2 id="profile-strengths-title">不仅塑造画面，<br /><span>也建立可落地的系统。</span></h2>
        </header>
        <div className="profile-strength-grid">
          {strengths.map(item => <TiltedCard className="profile-strength-card" rotateAmplitude={1.2} borderRadius={28} key={item.label}>
            <span className="profile-card-label">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </TiltedCard>)}
        </div>
      </section>

      <section className="profile-section profile-shell" id="profile-career" aria-labelledby="profile-career-title">
        <header className="profile-section-heading profile-section-heading--split">
          <div><p>02 · CAREER PATH</p><h2 id="profile-career-title">职业经历</h2></div>
          <p>从工业产品视觉到智能座舱体验，持续扩展三维设计在真实产品中的价值边界。</p>
        </header>
        <div className="profile-timeline">
          {experience.map((item, index) => <TiltedCard className="profile-career-card" rotateAmplitude={0.8} borderRadius={28} key={item.company}>
            <div className="profile-career-card__meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <time>{item.period}</time>
            </div>
            <div className="profile-career-card__main">
              <p>{item.role}</p>
              <h3>{item.company}</h3>
              <strong>{item.summary}</strong>
            </div>
            <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
          </TiltedCard>)}
        </div>
      </section>

      <section className="profile-section profile-shell" id="profile-projects" aria-labelledby="profile-projects-title">
        <header className="profile-section-heading profile-section-heading--split">
          <div><p>03 · SELECTED EXPERIENCE</p><h2 id="profile-projects-title">代表项目</h2></div>
          <p>以品牌一致性、可复用资产和工程可执行性为共同标准，参与多品牌智能座舱项目。</p>
        </header>
        <div className="profile-project-grid">
          {projects.map((project, index) => <TiltedCard className={`profile-project-card${index < 2 ? ' profile-project-card--featured' : ''}`} rotateAmplitude={1} borderRadius={28} key={project.name}>
            <div className="profile-project-card__top">
              <span>{project.period}</span>
              <span>{project.role}</span>
            </div>
            <div className="profile-project-card__body">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="profile-project-card__foot">
              <div className="profile-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </TiltedCard>)}
        </div>
      </section>

      <section className="profile-section profile-shell profile-education" aria-labelledby="profile-education-title">
        <div>
          <p>04 · EDUCATION</p>
          <h2 id="profile-education-title">西安文理学院</h2>
          <span>数字媒体艺术 · 本科 · 2015—2019</span>
        </div>
        <div className="profile-education__cta">
          <p>期待与汽车设计、体验与创新团队共同创造下一代数字座舱。</p>
          <a href="mailto:1019431896@qq.com">开始一次对话 <span>↗</span></a>
        </div>
      </section>

      <footer className="profile-footer profile-shell">
        <span>© 2026 任国鹏</span>
        <span>SHANGHAI · CHINA</span>
        <Link href="/">返回主页 ↑</Link>
      </footer>
    </div>
  </main>
}
