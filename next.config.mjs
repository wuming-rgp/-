const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserOrOrganizationSite = repositoryName.endsWith('.github.io')
const basePath = isGitHubPages && repositoryName && !isUserOrOrganizationSite
  ? `/${repositoryName}`
  : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGitHubPages ? { output: 'export', trailingSlash: true } : {}),
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
