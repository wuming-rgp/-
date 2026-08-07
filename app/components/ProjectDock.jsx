'use client'

import Link from 'next/link'
import { projects } from '../projects/project-data'

export default function ProjectDock({ activeSlug }) {
  const resetScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  return (
    <nav className="project-detail-nav" aria-label="项目详情导航">
      <Link className="detail-brand" href="/">REN <span>·</span> HMI</Link>

      <div className="detail-nav-tabs project-dock__navigation" aria-label="项目切换">
        {projects.map((project) => {
          const projectPath = `/projects/${project.slug}`
          const isActive = activeSlug === project.slug

          return (
            <Link
              key={project.slug}
              href={projectPath}
              className={`project-dock__item${isActive ? ' project-dock__item--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              scroll
              onClick={resetScroll}
            >
              <span className="project-dock__index">{project.number}</span>
              <span className="project-dock__label">{project.name}</span>
            </Link>
          )
        })}
      </div>

      <Link className="detail-back" href="/">返回主页 <span>↖</span></Link>
    </nav>
  )
}
