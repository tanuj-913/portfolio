export const profile = {
  name: 'Tanuj Jenna',
  roles: ['AI-Native Developer', 'Full-Stack Engineer', 'Agent Builder', 'Product Engineer'],
  headline: 'I build applications where AI does real work.',
  sub: 'Web, mobile, backend — and the AI inside them. From first requirement through to deployment.',
  email: 'tanujjenna2004@gmail.com',
  github: 'https://github.com/tanuj-913',
  linkedin: 'https://www.linkedin.com/in/tanuj-jenna-449332316/',
  instagram: 'https://www.instagram.com/tanuj_jenna/',
}

export const stats = [
  { label: 'Projects Shipped', value: 12, suffix: '+' },
  { label: 'Agent Systems', value: 3, suffix: '' },
  { label: 'Technologies', value: 80, suffix: '+' },
  { label: 'Platforms', value: 3, suffix: '' },
]

export const about = [
  "I'm an AI-native developer. I build applications where AI is part of how the product works, not a feature bolted on at the end.",
  'I work across the whole stack — React Native apps on Android and iOS, web front ends, backend services and APIs, and the AI layer that sits inside them.',
  'I take features from requirement through to deployment rather than handing them off halfway.',
]

export const whatIDo = [
  {
    title: 'Agentic Systems',
    points: ['Agent orchestration and planning', 'Multi-step tool calling', 'Local and cloud LLM routing', 'Memory and context handling'],
  },
  {
    title: 'AI Integration',
    points: ['AI inside shipped products', 'RAG over real documents', 'Voice, vision and language', 'Prompt design that holds up'],
  },
  {
    title: 'Full-Stack Development',
    points: ['React and React Native', 'Node, Express, REST APIs', 'PostgreSQL, Redis, Prisma', 'Through to deployment'],
  },
  {
    title: 'DevOps & Delivery',
    points: ['Docker and containerised services', 'CI/CD pipelines and release builds', 'Deploying to AWS, GCP and Vercel', 'Shipping to the Play Store and App Store'],
  },
]

export type Project = {
  title: string
  tag: string
  desc: string
  tech: string[]
  href?: string
  status: 'flagship' | 'public' | 'work' | 'academic' | 'personal'
  note?: string
  /** Drop a screenshot in public/shots/ and reference it here, e.g. '/shots/cinebook.png' */
  shot?: string
  /** Two or three headline points shown on the flipped side. */
  highlights?: string[]
}

export const projects: Project[] = [
  {
    title: 'Voice Assistant',
    highlights: ['Talk to it and it carries out the task', 'Reads your mail, finds files, controls your Mac', 'Works offline — nothing leaves the machine'],
    tag: 'Local-first agentic desktop assistant',
    desc: 'A desktop assistant that plans, calls tools and acts on your machine. It sequences multi-step work, speculates ahead and carries memory between turns, routing each call between a local model and the cloud. Voice runs locally end to end.',
    tech: ['TypeScript', 'React', 'Node', 'Ollama', 'Gemini', 'Whisper'],
    href: 'https://github.com/tanuj-913/Voice-Assistant',
    status: 'flagship',
  },
  {
    title: 'Sumitra',
    highlights: ['Staff clock in and out from their phone', 'Request leave and get it approved', 'Managers see where time actually went'],
    tag: 'HR & time-tracking app · Android + iOS',
    desc: 'A cross-platform HR and time-tracking application for a company’s day-to-day operations — time entry and people management in one product, shipping to both Android and iOS from a single codebase.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    status: 'work',
    note: 'Work project',
  },
  {
    title: 'CineBook',
    highlights: ['Browse films and pick your seats', 'Your seat is held while you pay', 'Staff manage screens, films and showtimes'],
    tag: 'Movie ticket booking platform',
    desc: 'A full-stack booking system. The hard part of ticket booking is that two people must never buy the same seat while one is still typing card details — so seats are held in Redis with a TTL and a job expires stale holds every 30 seconds.',
    tech: ['TypeScript', 'React', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    href: 'https://github.com/tanuj-913/cinebook',
    status: 'public',
  },
  {
    title: 'ADFC Gold Loan',
    highlights: ['Agents raise loan applications in the field', 'Customer and jewellery details captured on the spot', 'Head office reviews and approves from one panel'],
    tag: 'Gold loan origination platform',
    desc: 'A gold loan origination platform with two surfaces: a DSA partner app for agents working in the field, and an admin panel for oversight and approvals.',
    tech: ['TypeScript', 'React Native', 'Node'],
    status: 'work',
    note: 'Work project',
  },
  {
    title: 'LinkedIn Agent',
    highlights: ['Tells you what\'s trending in your field today', 'Drafts posts and articles in your voice', 'Publishes straight to LinkedIn'],
    tag: 'Trend intelligence & content generation',
    desc: 'Discovers and scrapes daily news across configured topics, synthesises what is actually trending, and generates posts and articles in a consistent voice. Skills-based agent architecture.',
    tech: ['Python', 'React', 'TypeScript', 'LLM'],
    href: 'https://github.com/tanuj-913/Linkedin-Agent',
    status: 'public',
  },
  {
    title: 'FactorLab',
    highlights: ['Shows what\'s actually driving a portfolio\'s returns', 'Surfaces insights on individual stocks', 'Refreshes the numbers on a schedule'],
    tag: 'Investment analytics platform',
    desc: 'Factor regression over mutual-fund portfolios, a stock insights surface, and scheduled jobs running the analysis pipeline.',
    tech: ['TypeScript', 'Python', 'Jupyter'],
    status: 'work',
    note: 'Work project',
  },
  {
    title: 'MAX',
    highlights: ['Ask questions about your own documents', 'Point it at a website and question that instead', 'Understands images and speech, fully offline'],
    tag: 'Local AI research assistant',
    desc: 'Seven subsystems behind one interface — chat, document RAG, an ephemeral web crawler that indexes a site on demand then discards it, image understanding, live video, voice and multimodal chat. Runs offline.',
    tech: ['Python', 'Flask', 'LangChain', 'Ollama', 'Whisper', 'OpenCV'],
    href: 'https://github.com/tanuj-913/MAX-The-local-AI-Research-Assistant',
    status: 'public',
  },
  {
    title: 'Room Restyle',
    highlights: ['Photograph a room and restyle it instantly', 'Try a new look before spending anything', 'Compare the original and result side by side'],
    tag: 'AI interior restyling',
    desc: 'Upload a photo of a room and get it restyled by generative AI — upload handling, prompt construction and image round-trip, with before/after comparison.',
    tech: ['Python', 'Flask', 'Gemini', 'JavaScript'],
    href: 'https://github.com/tanuj-913/Room-Restyle',
    status: 'public',
  },
  {
    title: '3D Furniture Placement',
    highlights: ['See furniture in your own space before buying', 'Move and rotate pieces to check they fit', 'Works in the browser, no app needed'],
    tag: 'WebXR furniture preview',
    desc: 'Place and view furniture in 3D in the browser, so a piece can be previewed in a space before buying.',
    tech: ['React', 'three.js', 'WebXR'],
    href: 'https://github.com/tanuj-913/3D-Furniture-Placement',
    status: 'public',
  },
  {
    title: 'Mukhanvesha',
    highlights: ['Registers a person\'s face once', 'Recognises them in any later photo', 'Finds and crops every face in an image'],
    tag: 'Face recognition pipeline',
    desc: 'Detects faces in uploaded images, crops and encodes them into vector representations, stores them, then matches new faces against the store.',
    tech: ['Python', 'Flask', 'OpenCV', 'dlib'],
    href: 'https://github.com/tanuj-913/Mukhanvehsa',
    status: 'public',
  },
  {
    title: 'Dog Breed Prediction',
    highlights: ['Upload a photo of a dog', 'Tells you the breed', 'Works on breeds it was never shown directly'],
    tag: 'Transfer learning classifier',
    desc: 'Identifies a dog’s breed from a photo using transfer learning on VGG19, served through a web app.',
    tech: ['Python', 'TensorFlow', 'Keras', 'Flask'],
    href: 'https://github.com/tanuj-913/Dog-breed-prediction',
    status: 'public',
  },
  {
    title: 'Interactive Web Experience',
    tag: 'Zero-dependency animation build',
    desc: 'A fully animated interactive site built with nothing but HTML, CSS and vanilla JavaScript — no framework, no build step, no dependencies, no CDN. Canvas particle systems, layered ambient effects and choreographed CSS animation, running entirely offline.',
    tech: ['JavaScript', 'Canvas', 'CSS Animation', 'HTML'],
    highlights: ['Unfolds as a guided animated sequence', 'Reacts to every tap and movement', 'Loads instantly and runs with no internet'],
    status: 'personal',
    note: 'Private repo',
  },
  {
    title: 'Online Voting System',
    highlights: ['Voters register and cast a ballot online', 'Every vote counted once, results tallied live', 'Admins set up and run the whole election'],
    tag: 'Web voting platform',
    desc: 'Voter registration, ballot casting and result tallying, with an admin side for managing an election end to end.',
    tech: ['Web', 'Backend', 'Database'],
    href: 'https://github.com/tanuj-913/OnlineVotingSystem',
    status: 'public',
  },
]

export const skills = [
  {
    tier: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'C', 'SQL'],
  },
  {
    tier: 'Frontend',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS', 'Vite', 'three.js', 'WebXR', 'Framer Motion'],
  },
  {
    tier: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'Flask', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth'],
  },
  {
    tier: 'Databases',
    items: ['PostgreSQL', 'Neon', 'MongoDB', 'MySQL', 'Redis', 'Vector Databases', 'Prisma', 'SQLite'],
  },
  {
    tier: 'AI & Agents',
    items: ['Agent Orchestration', 'Multi-step Planning', 'Tool Calling', 'RAG', 'Embeddings', 'Prompt Design', 'LLM Integration', 'Computer Vision', 'Voice AI', 'Speech to Text', 'Generative AI'],
  },
  {
    tier: 'AI Frameworks',
    items: ['LangChain', 'Ollama', 'Gemini', 'OpenAI', 'Whisper', 'TensorFlow', 'Keras', 'PyTorch', 'OpenCV', 'Hugging Face'],
  },
  {
    tier: 'Integrations',
    items: ['Twilio', 'Leegality', 'Payment Gateways', 'OAuth / SSO', 'Webhooks', 'Push Notifications', 'Third-party REST APIs'],
  },
  {
    tier: 'DevOps & Deploy',
    items: ['Docker', 'CI/CD', 'GitHub Actions', 'AWS', 'GCP', 'Vercel', 'Render', 'Firebase', 'Supabase', 'Nginx', 'Expo EAS', 'Play Store', 'App Store', 'Environment Config', 'Release Builds'],
  },
  {
    tier: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Claude Code', 'Postman', 'OpenAPI / Swagger', 'Mermaid', 'ESLint', 'Prettier', 'Jira', 'Slack', 'Notion', 'Figma', 'pnpm', 'npm', 'Turborepo'],
  },
  {
    tier: 'Engineering',
    items: ['Problem Solving', 'Architecture & System Design', 'End-to-end Ownership', 'Cross-platform Delivery'],
  },
]

export type Award = {
  title: string
  org: string
  tag: 'Hackathon' | 'Award' | 'Recognition' | 'College' | 'Work'
  year?: string
  desc: string
}

/**
 * Real achievements only — fill these in and the section appears automatically.
 * It stays hidden while the list is empty, so nothing invented ever ships.
 */
export const awards: Award[] = [
  // {
  //   title: 'Winner — <hackathon name>',
  //   org: '<where it was held>',
  //   tag: 'Hackathon',
  //   year: '2025',
  //   desc: 'What you built and what you beat — one or two lines.',
  // },
]

/**
 * Journey — drafted from your actual commit history (first repos Jun 2025,
 * office work through 2026). Correct the labels, dates and notes.
 */
export const journey = [
  {
    period: 'Mid 2025',
    label: 'Foundations',
    value: 25,
    note: 'First real builds — Python, Flask, computer vision and ML projects.',
  },
  {
    period: 'Late 2025',
    label: 'AI Integration',
    value: 48,
    note: 'LLMs, RAG and generative AI wired into working applications.',
  },
  {
    period: 'Early 2026',
    label: 'Full-Stack',
    value: 70,
    note: 'TypeScript, React Native, Node and databases — shipping to production.',
  },
  {
    period: 'Mid 2026',
    label: 'Agentic Systems',
    value: 88,
    note: 'Agent orchestration, planning and tool calling in real products.',
  },
  {
    period: 'Now',
    label: 'End-to-End Delivery',
    value: 100,
    note: 'Owning features from requirement through to deployment.',
  },
]

export const services = [
  { title: 'Web & Mobile Apps', desc: 'Full applications end to end — React and React Native for Android and iOS, plus the backend behind them.' },
  { title: 'Backend & APIs', desc: 'Services, databases and integrations. Built to be handed over, not just to work once.' },
  { title: 'Deployment & DevOps', desc: 'Get it live and keep it there — containers, CI/CD, cloud hosting, and app store releases.' },
  { title: 'AI Integration', desc: 'Add AI to an existing product without rebuilding it — or automate a process that still runs by hand.' },
  { title: 'Prototypes & MVPs', desc: 'Get a working version in front of people before committing to the full build.' },
]
