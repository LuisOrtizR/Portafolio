export interface Project {
  id: number
  title: string
  description: string
  stack: string[]
  repoUrl: string
  demoUrl?: string
  featured?: boolean
  year: number
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Developer Portfolio',
    description: 'Modern SPA built with Vue 3, TypeScript and TailwindCSS. Scalable architecture ready for AI integrations.',
    stack: ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite'],
    repoUrl: 'https://github.com/LuisOrtizR/portfolio',
    demoUrl: 'https://luisortiz.dev',
    featured: true,
    year: 2024,
  },
  {
    id: 2,
    title: 'REST API Platform',
    description: 'Scalable REST API with authentication, rate limiting, and automatic documentation.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/LuisOrtizR',
    featured: true,
    year: 2024,
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Full-stack productivity tool with real-time updates and team collaboration features.',
    stack: ['Vue 3', 'Pinia', 'Node.js', 'WebSockets'],
    repoUrl: 'https://github.com/LuisOrtizR',
    featured: false,
    year: 2023,
  },
]
