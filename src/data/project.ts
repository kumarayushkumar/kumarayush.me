import ivaanArchitecture from '../assets/images/project/ivaan-architecture.png'
import { skills, type Skill } from './skill'

type Project = {
  name: string
  image?: ImageMetadata
  techStack: Skill[]
  tagline?: string
  role?: string
  highlight?: string
  description: string
  problemStatement?: string
  approach?: string
  liveLink?: string
  github?: string
  design?: string
  demo?: string
  architecture?: string
  architectureImage?: ImageMetadata
  usedBy?: string
  createdAt: string
}

// Highlighted projects get richer shape: tech grouped by layer (so the UI can
// label Frontend / Backend / etc.). liveLink is a plain string for a single
// link, or a { web, app } object when a project has both (e.g. site + app store).
// Every techStack value must reference skills.* (no loose strings).
type TechStack = {
  frontend?: Skill[]
  backend?: Skill[]
  database?: Skill[]
  ai?: Skill[]
  mobile?: Skill[]
  infra?: Skill[]
  tools?: Skill[]
}

type HighlightedProject = Omit<Project, 'techStack' | 'liveLink'> & {
  techStack: TechStack
  liveLink?: string | { web?: string; app?: string }
}

export const highlightedProjects: HighlightedProject[] = [
  {
    name: 'Graminx',
    tagline: 'Location-based services marketplace for rural India.',
    role: 'Technical Lead · Graminx',
    highlight: '11,000+ users(as of Aug 2026)',
    description:
      'Graminx is a location-based services marketplace for rural India, used by 11,000+ users. Customers book services and the platform matches each job to nearby, eligible workers, across farmer, worker, distributor and admin roles, with region-aware pricing and a multi-language interface.',
    approach:
      'Built a multi-stage booking-broadcast engine that matches service bookings to workers through a funnel of coverage-area and 25 km Haversine-distance filters, so each job reaches only eligible, nearby workers. Designed a location-based dynamic pricing system that resolves the best price through a Village to Region to District to State to global cascade (most-specific wins), letting admins set service prices at any geographic tier. Implemented a multi-role system (farmer / worker / distributor / admin) with scoped access, plus a multi-language UI backed by on-the-fly address translation and SMS/OTP auth.',
    architecture:
      'Hardened API-key and DB configuration to environment and secret-based config, and shipped via a production Docker deployment pipeline.',
    liveLink: {
      web: 'https://graminx.com/',
      app: 'https://play.google.com/store/apps/details?id=com.graminx&hl=en_IN'
    },
    techStack: {
      frontend: [skills.alpine, skills.bs, skills.tw, skills.sass],
      backend: [skills.php, skills.laravel],
      database: [skills.firebase],
      infra: [skills.docker, skills.caddy],
      tools: [skills.osm, skills.googleMaps]
    },
    createdAt: '2026-03'
  },
  {
    name: 'Ivaan',
    tagline: 'AI meeting assistant that remembers context across meetings.',
    role: 'Full-stack · Growigh',
    highlight: 'Amazon Startup Program',
    description:
      "Ivaan is an AI meeting assistant, delivered as a SaaS. Its core value is simple: keep notes of your meetings and store the context for the next one. An AI agent joins your meeting, records and transcribes it, summarises it, and maintains the context of those notes across meetings, all accessible through the agent's website. The vision was to grow from this core into an all-in-one personal assistant, adding email management, calendar management and to-dos to help you hit your daily and weekly goals. Ivaan was selected for the Amazon startup program, but we eventually dropped it, as competition in this space grew very fast and it became hard to keep up.",
    approach:
      'A bot joins the meeting through a headless Chrome tab and captures the audio (a Chrome extension using tabCapture plus an offscreen document). The audio is transcribed with Whisper and run through speaker diarization to label who said what, then summarised. Notes and their context are stored so the assistant can recall them across future meetings. Work is queued and coordinated between services with BullMQ and Redis.',
    architecture:
      'A microservices system with separate services for the meeting bot (chrome-bot), transcription, and speaker diarization, plus a Chrome extension for tab capture, coordinated over a queue (BullMQ / Redis) and WebSockets. Runs on Docker Compose with Redis, PostgreSQL, MinIO (S3-compatible storage), and Prometheus + Grafana for monitoring.',
    architectureImage: ivaanArchitecture,
    liveLink: 'https://heyivaan.com/',
    techStack: {
      frontend: [skills.next, skills.tw, skills.shadcn, skills.ts],
      backend: [
        skills.hono,
        skills.fastapi,
        skills.py,
        skills.bullmq,
        skills.ws
      ],
      database: [skills.redis, skills.pg],
      ai: [skills.whisper, skills.pyannote],
      infra: [
        skills.turbo,
        skills.docker,
        skills.minio,
        skills.prom,
        skills.grafana
      ],
      tools: [skills.puppeteer]
    },
    createdAt: '2025-09'
  },
  {
    name: 'UI Analyzer',
    tagline:
      "Paste a URL, get an AI critique of any site's UI and Core Web Vitals.",
    role: 'Full-stack · Growigh',
    highlight: 'Live at uianalyzer.in',
    description:
      'UI Analyser analyses the UI of any website. You enter a URL, and in the backend Playwright opens the site, captures a full-page screenshot and runs a Core Web Vitals audit. The screenshot is sent to an LLM with a prompt to critique the UI, and the results are shown back to the user.',
    approach:
      'Built a backend where Playwright loads user-submitted URLs, captures full-page screenshots, and runs Core Web Vitals audits. Implemented a scalable job system using BullMQ and Redis to queue the screenshot, LLM analysis, and audit work so requests are processed reliably under load.',
    architecture:
      'A NodeJS and Python hybrid backend. NodeJS runs the API, while Python workers handle the browser automation and image extraction. Everything is containerised with Docker.',
    liveLink: 'https://uianalyzer.in',
    github: 'https://github.com/yaman-694/ui-analyser',
    techStack: {
      frontend: [skills.next, skills.tw, skills.ts],
      backend: [
        skills.node,
        skills.express,
        skills.bullmq,
        skills.py,
        skills.fastapi
      ],
      database: [skills.mongo, skills.redis],
      ai: [skills.langchain, skills.genai, skills.openai],
      infra: [skills.turbo, skills.docker, skills.caddy],
      tools: [skills.clerk, skills.stripe, skills.playwright]
    },
    createdAt: '2025-08'
  },
  {
    name: 'LiveGame',
    tagline:
      'Real-time multiplayer gaming platform with 6 roles and live data.',
    role: 'Backend · DK Tech (UK client)',
    highlight: '100+ users',
    description:
      'A live, real-time gaming platform where people play games. It has 6 user roles with role-based authentication, live data streaming to the frontend, and full user management. This project taught me a lot: writing complex real-time gaming logic, working with AWS (EC2, S3, CloudFront), Docker containerisation, and deploying.',
    approach:
      'The heart of this project was writing the complex real-time gaming logic and keeping live data in sync across all clients. I set up role-based authentication for 6 roles, streamed live third-party data to users over WebSockets, and handled all the user CRUD and transaction logic in the main backend.',
    architecture:
      'Split into 3 microservices. Mirror API fetches live data from a third-party API and saves it to the main db and a score db, the Websocket service is what the frontend connects to for live data, and the main backend handles everything else (users and all other CRUD). Deployed on AWS (EC2, S3, CloudFront) with Docker containerisation, shipped through GitHub Actions.',
    techStack: {
      frontend: [
        skills.next,
        skills.react,
        skills.ts,
        skills.shadcn,
        skills.tw,
        skills.redux,
        skills.tanstack,
        skills.rhf,
        skills.zod
      ],
      backend: [skills.node, skills.express, skills.socketio],
      database: [skills.mongo, skills.redis, skills.prisma],
      infra: [skills.aws, skills.docker, skills.gha]
    },
    createdAt: '2024-05'
  },
  {
    name: 'Emersym',
    tagline:
      'Emergency detection and SOS from ambient sound via deep learning.',
    role: 'Research · Amity University',
    highlight: 'Patent · 3 hackathons · State-level recognition',
    problemStatement:
      'One death every 4 minutes due to road accidents in India (soon to be the 5th largest cause of death worldwide per WHO, costing India 3% of GDP). India also registered 31,677 rape cases in 2021, with nearly 49 crimes against women logged every hour.',
    description:
      'EmerSym is an emergency detection and SOS alert system, built as a research project at Amity University Gwalior with my team. The app listens to environmental sound through the phone mic and uses a deep-learning model to classify it as emergency or non-emergency. On an emergency it automatically fires SOS alerts by SMS to the user\'s close relatives, the nearest police station and hospital, sharing the victim\'s location through the Google Maps API. It reached about 92% sound-classification accuracy. We presented it at DevFest, and it won 3 hackathons. The three of us also hold a patent for this work, titled "System and Method for Early Detection and Notification of Critical Situations Using Ambient Sound Analysis".',
    approach:
      "The Android app continuously records audio and sends it to a Flask backend. The server converts the sound into a model-compatible format, runs the trained deep-learning model (loaded from a pickle file, using MFCC audio features) to predict emergency vs non-emergency, and uses the haversine formula to find the closest police station or hospital to the user. If the prediction is an emergency, an alert is sent to the user's phone with a timer, and if the user does not cancel it, the SOS message is broadcast to relatives and nearby services along with the location.",
    techStack: {
      mobile: [skills.kt, skills.compose],
      backend: [skills.py, skills.flask],
      ai: [skills.tf, skills.sklearn],
      infra: [skills.heroku]
    },
    createdAt: '2022-09'
  },
  {
    name: 'Koor',
    tagline: 'Job-seeker platform for Somalia; I built the admin and backend.',
    role: 'Web Dev Intern · DigiMonk',
    highlight: '500+ job postings within 2 months of launch',
    description:
      'A job-seeker platform for Somalia, where job seekers can browse and apply to jobs and recruiters can view candidate profiles. I built it during my Web Developer internship at DigiMonk Technologies (July to August 2023, 2 months); the team launched it publicly after some time my internship ended, and it is live today. I owned the admin dashboard and the backend: I built the CRUD REST APIs and the routes the React frontend consumes, on a monolithic Node, Express, TypeScript and MySQL stack, and I migrated a large JavaScript codebase to TypeScript in about 1.5 months. Within 2 months of launch it had 500+ job postings.',
    liveLink: 'https://www.koorpro.com',
    techStack: {
      frontend: [skills.react, skills.ts],
      backend: [skills.node, skills.express],
      database: [skills.mysql]
    },
    createdAt: '2023-07'
  }
]

export const archivedProjects: Project[] = [
  {
    name: 'Razemble',
    description:
      'A LinkedIn but only for projects, where you can show your projects to others and share project ideas with people. Pretty similar to Peerlist, though we did not know Peerlist existed at the time. It was a group project I worked on with other members of my university coding club, and I was the group leader. Leading it taught me how to manage people, assign tasks, review GitHub PRs, take feedback and opinions, and work with people in general.',
    design: 'https://www.figma.com/design/nOhsHsoqyao45iUAIQcUdg/Portfolio',
    techStack: [
      skills.mongo,
      skills.react,
      skills.gql,
      skills.express,
      skills.tw,
      skills.neo4j,
      skills.heroku
    ],
    createdAt: '2023-03'
  },
  {
    name: 'TravKaro',
    description:
      'A social media platform only for travellers, built with two friends. Think Instagram but focused on travel. We took it to Buildspace Season 3, submitted the project and got selected in round 1. Along the way we realised that getting people onto a new social platform is a very, very tough task, so we eventually dropped it.',
    design: 'https://www.figma.com/design/nOhsHsoqyao45iUAIQcUdg/Portfolio',
    techStack: [
      skills.react,
      skills.gql,
      skills.mongo,
      skills.express,
      skills.tw,
      skills.heroku
    ],
    createdAt: '2023-06'
  },
  {
    name: 'SportSquare',
    description:
      'A sports app I built for a client. I built the mobile app in FlutterFlow on a fully Firebase backend, and wrote custom Flutter code for the functionality FlutterFlow could not handle on its own. The admin dashboard is a separate React app. I designed the whole UI and UX flow myself. This project taught me no-code and low-code development, coding, Firebase and dashboards, but also the softer side: how to talk to a client, understand what they actually need, and explain UI/UX decisions to them.',
    techStack: [
      skills.flutterflow,
      skills.dart,
      skills.firebase,
      skills.react,
      skills.ts,
      skills.shadcn,
      skills.tw,
      skills.redux,
      skills.rhf,
      skills.zod
    ],
    createdAt: '2024-03'
  },
  {
    name: 'Omnilogs',
    problemStatement:
      'Across our projects, my friend and I kept rewriting and reconfiguring the same logging setup over and over (file logging, Loki, Telegram alerts). It was repetitive work in every new repo, so we decided to package it once as a reusable library.',
    description:
      'Omnilogs is a production-ready logging library for Node.js, published on npm and built on top of Winston. It is plug and play: a single createLogger call gives you console, Loki (Grafana), and Telegram transports, with detailed, compact, or JSON formats, configurable log levels, colors and date formats, full TypeScript types, and built-in exception and rejection handling.',
    liveLink: 'https://www.npmjs.com/package/omnilogs',
    github: 'https://github.com/yaman-694/omnilogs',
    techStack: [skills.node, skills.ts],
    createdAt: '2025-09'
  },
  {
    name: 'Curlme',
    liveLink: 'https://curlme.dev',
    description:
      'Curlme is a terminal-only social network for developers, like Twitter but used entirely from the command line. You interact with it through plain curl requests, an API tool like Postman, or an optional CLI you install with npm (curlme). Login runs through GitHub OAuth. It has a real-time paginated feed, threaded replies, and a like system for both posts and replies, all served by a clean REST API. The backend is Node and Express with Prisma and PostgreSQL, Redis for caching, JWT auth, Zod validation, and rate limiting. It is a Turborepo monorepo, containerised with Docker and served behind Caddy. Building it taught me a lot about how Caddy handles reverse proxying and automatic HTTPS, and how Turborepo structures a monorepo.',
    github: 'https://github.com/kumarayushkumar/curlme',
    demo: 'https://www.linkedin.com/feed/update/urn:li:activity:7449001272864854016/',
    techStack: [
      skills.turbo,
      skills.node,
      skills.express,
      skills.ts,
      skills.prisma,
      skills.pg,
      skills.redis,
      skills.ws,
      skills.jwt,
      skills.zod,
      skills.docker,
      skills.caddy
    ],
    createdAt: '2025-09'
  },
  {
    name: 'Market Seasonality Explorer',
    description:
      'A company assignment. A financial dashboard for crypto that streams real-time tick data from the Binance API over WebSocket. Its centre is an interactive calendar (daily, weekly, monthly) with color-coded performance, volatility and liquidity metrics, alongside a live data panel and order book. You can compare periods, run custom date-range analysis, detect historical patterns, set price and volume alerts, and export data as CSV or PDF. Hosted on Vercel.',
    liveLink: 'https://market-seasonality-explorer-nine.vercel.app',
    github: 'https://github.com/kumarayushkumar/market-seasonality-explorer',
    techStack: [skills.next, skills.react, skills.tw, skills.jest],
    createdAt: '2025-07'
  },
  {
    name: 'CommentKit',
    description:
      'An AI comment-generator Chrome extension for LinkedIn. It reads a post, sends it to the Gemini API to generate a relevant comment, then posts and likes it. Two modes: comment on a single post, or auto-comment on up to 50 posts one by one. No API key is bundled, so you plug in your own key to use it.',
    liveLink:
      'https://chromewebstore.google.com/detail/commentkit/bhaflkdicaedajhkeaipecfchdonglcn?pli=1',
    github: 'https://github.com/kumarayushkumar/commentkit',
    usedBy: '4 friends',
    techStack: [skills.ts, skills.react, skills.tw, skills.genai],
    createdAt: '2025-03'
  },
  {
    name: 'Component Library',
    description:
      'A one-month contract with a company. I worked with their team to build a reusable component library for their main dashboard, documented in Storybook and tested with Playwright.',
    techStack: [
      skills.next,
      skills.tw,
      skills.shadcn,
      skills.playwright,
      skills.storybook
    ],
    createdAt: '2025-09'
  },
  {
    name: 'MerchnGifts',
    description:
      'A freelance project (client work) for a promotional merchandise and gifts company in Australia, lead passed on by my PG owner. A static React site listing their product range across categories, with sections for what they offer, why choose merchandise, testimonials, clients and promises, plus a printing page and a contact page. Hosted on Vercel.',
    liveLink: 'https://merchngift.com',
    github: 'https://github.com/kumarayushkumar/merchngifts',
    techStack: [skills.react, skills.ts, skills.bs, skills.sass],
    createdAt: '2023-12'
  },
  {
    name: 'Sassay',
    description:
      'A lightweight, customisable CSS framework I built in Sass to understand how UI frameworks like Bootstrap and Tailwind work under the hood. It has a responsive grid and containers, six breakpoints (xs to xxl), utility classes (spacing, flex, display, border, typography), reusable components (buttons, cards, accordion), a reboot and type system, and variables you override in a _custom.scss file. Compiled with Gulp and published as an npm package you can import and extend.',
    github: 'https://github.com/kumarayushkumar/sassay',
    usedBy: '3 friends',
    techStack: [skills.sass, skills.gulp],
    createdAt: '2023-04'
  },
  {
    name: 'QualityImpro',
    description:
      'A freelance project (client work). My PG owner ran a separate business training hospitality staff, so he asked me to build the marketing website for it. A multi-page React site with Home, About, Features, Industries, Pricing tiers, customer testimonials, and a Book a Demo form, plus supporting sections like a before/after showcase and a comparison table. Hosted on Vercel.',
    liveLink: 'http://qualityimpro.com',
    github: 'https://github.com/kumarayushkumar/qualityimpro',
    techStack: [skills.react, skills.ts, skills.sass, skills.rhf, skills.zod],
    createdAt: '2023-12'
  },
  {
    name: 'WashingtonAdvert',
    description:
      'A freelance project, client from USA. A multi-page marketing website for a digital marketing agency, brought in through friends. Built dedicated pages for each service (SEO, Local SEO, PPC, Social Media Marketing, Web Designing, Google My Business), plus Home, About, Industries, Packages, Reviews, a validated Contact form, and legal pages (Privacy, Refund, Terms). Hosted on Vercel.',
    liveLink: 'https://washingtonadvert.com',
    github: 'https://github.com/kumarayushkumar/washington-advert',
    techStack: [skills.react, skills.ts, skills.tw, skills.rhf, skills.zod],
    createdAt: '2024-08'
  },
  {
    name: 'solar-system',
    description:
      'A simple Three.js project (3D sun / earth / moon) I built to learn the fundamentals of Three.js.',
    liveLink: 'https://threejs-chi-neon.vercel.app',
    github: 'https://github.com/kumarayushkumar/solar-system',
    techStack: [skills.three, skills.ts],
    createdAt: '2024-04'
  },
  {
    name: 'Flower Recognition',
    description:
      'A term-paper project that classifies flower images with classical machine learning. Used the Kaggle "flowers-recognition" dataset, 300 images across 3 categories (rose, sunflower, tulip).',
    approach:
      'Load and resize each image, flatten the pixels into a feature vector, 80/20 train-test split, then train and compare several models (Logistic Regression, SVM, Decision Tree, Random Forest, plus Linear/Lasso/Ridge) and rank them by accuracy with confusion matrices and an accuracy bar graph.',
    github: 'https://github.com/kumarayushkumar/flower-recognition',
    techStack: [
      skills.py,
      skills.jupyter,
      skills.pandas,
      skills.numpy,
      skills.mpl,
      skills.sklearn
    ],
    createdAt: '2022-05'
  },
  {
    name: 'Space Invader',
    description:
      'A simple game I built while learning Python in college, a clone of the classic Atari Space Invaders.',
    github: 'https://github.com/kumarayushkumar/space-invaders',
    techStack: [skills.py],
    createdAt: '2022-07'
  },
  {
    name: 'Rshns',
    description:
      "A freelance project, single-page website for a nursing home, brought in by a friend's friend. It listed the services and facilities they offer, plus a contact form whose submissions were saved to a text file on the server (PHP). Hosted on free hosting.",
    github: 'https://github.com/kumarayushkumar/rshns',
    techStack: [skills.html, skills.css, skills.bs, skills.sass, skills.php],
    createdAt: '2021-07'
  },
  {
    name: 'AbhiSMM',
    description:
      'My first freelance project. A friend who sold SMM (social media marketing) tools paid me ₹2000 to build a single-page website listing his products. Deployed it on free cPanel hosting.',
    techStack: [skills.html, skills.css, skills.bs],
    createdAt: '2019-06'
  }
]
