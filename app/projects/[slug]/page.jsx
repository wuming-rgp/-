import { notFound } from 'next/navigation'
import ProjectDetail from './ProjectDetail'
import { projectBySlug } from '../project-data'

export function generateStaticParams() {
  return Object.keys(projectBySlug).map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = projectBySlug[slug]

  if (!project) notFound()

  return <ProjectDetail project={project} />
}
