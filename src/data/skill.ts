// Single source of truth for technical skills.
//
// `skills` is the master list. Reference it everywhere by property, e.g.
// project.ts -> techStack: [skills.react, skills.node] (no loose strings).
//
// `confidentSkills` is the only list you maintain; `workedSkills` is derived
// (everything else), so no skill is ever repeated.

export const skills = {
  // Languages
  ts: 'TypeScript',
  js: 'JavaScript',
  py: 'Python',
  php: 'PHP',
  kt: 'Kotlin',
  dart: 'Dart',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  // Frontend
  react: 'React',
  next: 'Next.js',
  astro: 'Astro',
  tw: 'Tailwind CSS',
  redux: 'Redux Toolkit',
  tanstack: 'TanStack Query',
  rhf: 'React Hook Form',
  zod: 'Zod',
  shadcn: 'shadcn/ui',
  radix: 'Radix UI',
  reactRouter: 'React Router',
  recharts: 'Recharts',
  vite: 'Vite',
  sass: 'Sass',
  bs: 'Bootstrap',
  jquery: 'jQuery',
  three: 'Three.js',
  alpine: 'Alpine.js',
  // Backend
  node: 'Node.js',
  express: 'Express',
  hono: 'Hono',
  flask: 'Flask',
  fastapi: 'FastAPI',
  laravel: 'Laravel',
  gql: 'GraphQL',
  rest: 'REST APIs',
  ws: 'WebSocket',
  socketio: 'Socket.IO',
  bullmq: 'BullMQ',
  jwt: 'JWT',
  passport: 'Passport',
  pydantic: 'Pydantic',
  gunicorn: 'Gunicorn',
  // Databases
  pg: 'PostgreSQL',
  mongo: 'MongoDB',
  mysql: 'MySQL',
  redis: 'Redis',
  neo4j: 'Neo4j',
  prisma: 'Prisma',
  firebase: 'Firebase',
  // AI / ML
  openai: 'OpenAI API',
  genai: 'Google GenAI',
  langchain: 'LangChain',
  whisper: 'Whisper',
  tf: 'TensorFlow',
  keras: 'Keras',
  torch: 'PyTorch',
  sklearn: 'scikit-learn',
  opencv: 'OpenCV',
  librosa: 'librosa',
  pyannote: 'pyannote-audio',
  pandas: 'Pandas',
  numpy: 'NumPy',
  mpl: 'Matplotlib',
  jupyter: 'Jupyter Notebook',
  // DevOps / Infra
  docker: 'Docker',
  caddy: 'Caddy',
  gha: 'GitHub Actions',
  aws: 'AWS',
  vercel: 'Vercel',
  heroku: 'Heroku',
  turbo: 'Turborepo',
  bun: 'Bun',
  pnpm: 'pnpm',
  gulp: 'Gulp',
  prom: 'Prometheus',
  grafana: 'Grafana',
  loki: 'Grafana Loki',
  minio: 'MinIO',
  // Mobile
  compose: 'Jetpack Compose',
  flutterflow: 'FlutterFlow',
  // Testing / Tools
  playwright: 'Playwright',
  storybook: 'Storybook',
  jest: 'Jest',
  puppeteer: 'Puppeteer',
  git: 'Git',
  plasmo: 'Plasmo',
  winston: 'Winston',
  stripe: 'Stripe',
  razorpay: 'Razorpay',
  clerk: 'Clerk',
  postman: 'Postman',
  figma: 'Figma',
  linux: 'Linux',
  // Other
  osm: 'Open Street Map',
  googleMaps: 'Google Maps'
} as const

export type SkillKey = keyof typeof skills
export type Skill = (typeof skills)[SkillKey]

// The only list you maintain: the skills you're confident with.
export type SkillCategory = {
  heading: string
  skills: Skill[]
}

export const confidentSkills: SkillCategory[] = [
  {
    heading: 'Language',
    skills: [skills.js, skills.ts, skills.php, skills.py]
  },
  {
    heading: 'Libraries/Framework',
    skills: [
      skills.react,
      skills.next,
      skills.astro,
      skills.node,
      skills.gql,
      skills.tw,
      skills.redux
    ]
  },
  {
    heading: 'Database',
    skills: [skills.pg, skills.mongo, skills.redis]
  },
  {
    heading: 'DevOps/Tools',
    skills: [
      skills.git,
      skills.docker,
      skills.aws,
      skills.postman,
      skills.figma,
      skills.prisma,
      skills.linux
    ]
  }
]

// Every skill you've worked with (includes the confident ones) — derived
// from the master list, so no repetition.
export const workedSkills: Skill[] = Object.values(skills)
