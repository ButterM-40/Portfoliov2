export const GRADIENTS = {
  violet:   { grad: 'linear-gradient(160deg,#4D2BE0,#3415B8)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  indigo:   { grad: 'linear-gradient(160deg,#4502FF,#7B3DFF)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  lavender: { grad: 'linear-gradient(160deg,#A78BFA,#8159F0)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  aqua:     { grad: 'linear-gradient(160deg,#2EE6C5,#17A6D6)',  ink: 'rgba(17,24,39,0.42)',    dot: 'rgba(17,24,39,0.16)'  },
  pink:     { grad: 'linear-gradient(160deg,#FF5E8A,#E0316B)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  amber:    { grad: 'linear-gradient(160deg,#FFD914,#FF8A3D)',  ink: 'rgba(17,24,39,0.42)',    dot: 'rgba(17,24,39,0.16)'  },
  orange:   { grad: 'linear-gradient(160deg,#FF8A3D,#E05A1E)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  green:    { grad: 'linear-gradient(160deg,#10B981,#0E8F6A)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  purple:   { grad: 'linear-gradient(160deg,#8B5CF6,#5B2BD6)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  teal:     { grad: 'linear-gradient(160deg,#0EA5B7,#0B7E8C)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  coral:    { grad: 'linear-gradient(160deg,#FF5E5E,#FF8169)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
  dark:     { grad: 'linear-gradient(160deg,#1b1430,#0e0a1c)',  ink: 'rgba(255,255,255,0.5)',  dot: 'rgba(255,255,255,0.18)' },
} as const;

type GradKey = keyof typeof GRADIENTS;

export function grad(key: string) {
  return (GRADIENTS[key as GradKey] ?? GRADIENTS.dark).grad;
}
export function coverInk(key: string) {
  return (GRADIENTS[key as GradKey] ?? GRADIENTS.dark).ink;
}
export function coverBg(key: string) {
  const d = GRADIENTS[key as GradKey] ?? GRADIENTS.dark;
  return `radial-gradient(${d.dot} 1.2px, transparent 1.6px) 0 0 / 11px 11px, ${d.grad}`;
}

export const brand = { name: 'Butter', accentWord: '.dev' };

export const heroData = {
  kicker: 'Ramiro Santos · Developer',
  headline: 'Games that feel good to play.',
  subhead: 'I design and build original games end to end — engine, gameplay, and the last 10% of polish. I turn hard systems into tight, joyful play.',
};

export const stats = [
  { value: '3+', label: 'Years Making Games' },
  { value: '6', label: 'Games Shipped' },
  { value: '3', label: 'Research Papers' },
  { value: '50K+', label: 'Players Reached' },
];

export const games = [
  { id: 'g1781758275292', n: 'Game 4', title: 'Mutant Arena', genre: 'Fighting', cover: 'violet',
    role: 'Lead Programmer', engine: 'Godot', year: '2026',
    repo: 'https://github.com/ButterM-40/Game-Jam-94', link: '#',
    desc: 'Collaborated with a 3-person team to build a mutant-themed fighting game in Godot using the Castagne framework. Contributed to game planning, progress coordination, and connecting the lead artist\'s artwork with the codebase.',
    roleDesc: 'Meow Meow',
    tech: [],
    slides: [{ label: 'Screen 1', grad: 'violet', image: '' }] },
  { id: 'g1', n: 'Game 1', title: 'Half Hazard', genre: 'Horror / Puzzle', cover: 'violet',
    role: 'Programmer', engine: 'Godot', year: '2025',
    repo: 'https://github.com/ramiro/crypto-knights', link: 'https://t33-h33-studio.itch.io/half-hazard',
    desc: 'Developed a horror survival game in 48 hours at the Chillennium 2025 Game Jam hosted by Texas A&M University. Implemented core systems including dialogue, an interactive map, and puzzle mechanics.',
    roleDesc: '',
    tech: ['Godot'],
    slides: [{ label: 'Dungeon Raid', grad: 'violet', image: '', youtube: 'https://www.youtube.com/watch?v=xBPetsN8w90&source_ve_path=OTY3MTQ&embeds_referring_euri=https%3A%2F%2Ft33-h33-studio.itch.io%2Fhalf-hazard' }, { label: 'Party Loadout', grad: 'indigo', image: '' }, { label: 'Boss Encounter', grad: 'dark', image: '' }] },
  { id: 'g2', n: 'Game 2', title: 'Spirits of the Wind', genre: 'Puzzle / Platform', cover: 'lavender',
    role: 'Lead Programmer', engine: 'Godot', year: '2024',
    repo: 'https://github.com/ButterM-40/BlitzWaveStudioGameJam70', link: 'https://blitzwavesstudios.itch.io/spirits-of-the-wild',
    desc: 'Led a 6-person team to design and ship a puzzle game in one week for Godot Wild Jam 84. Contributed systems such as UI design, map development, a character swap mechanic, and coordinating with the team.',
    roleDesc: '',
    tech: ['Godot'],
    slides: [{ label: 'Time Trial', grad: 'lavender', image: '' }, { label: 'Track Editor', grad: 'pink', image: '' }, { label: 'Ghost Replay', grad: 'violet', image: '' }] },
  { id: 'g3', n: 'Game 3', title: 'Sole Survivor', genre: 'Arcade ', cover: 'aqua',
    role: 'Lead Programmer', engine: 'Unity', year: '2023',
    repo: 'https://github.com/ButterM-40/202320-final-game-immortal-players-only', link: '#',
    desc: 'Led a team of 3 to build a Vampire Survivors-style game for a game dev competition, earning Player\'s Choice and 3rd place. Built the leaderboard, enemy spawning system, and scoring mechanics.',
    roleDesc: '',
    tech: ['Unity', 'Asesprite'],
    slides: [{ label: 'Endless Run', grad: 'aqua', image: '' }, { label: 'Combo Meter', grad: 'purple', image: '' }, { label: 'Synth Tunnel', grad: 'teal', image: '' }] },
];

export const projects = [
  { id: 'p1', n: 'Project 1', title: 'Realtime Analytics', genre: 'Web App / Dashboard', tag: 'Web App', cover: 'indigo',
    role: 'Full-Stack', engine: 'Next.js', year: '2024',
    repo: 'https://github.com/ramiro/realtime-analytics', link: 'https://example.com/analytics',
    desc: 'A realtime analytics dashboard streaming millions of events a day. Live charts, alerting and a query builder over a websocket data layer.',
    roleDesc: '',
    tech: ['React', 'Next.js', 'WebSocket', 'D3'],
    slides: [{ label: 'Live Dashboard', grad: 'indigo', image: '' }, { label: 'Query Builder', grad: 'aqua', image: '' }, { label: 'Alerting', grad: 'dark', image: '' }] },
  { id: 'p2', n: 'Project 2', title: 'Inventory API', genre: 'API / Platform', tag: 'API', cover: 'green',
    role: 'Backend', engine: 'FastAPI', year: '2023',
    repo: 'https://github.com/ramiro/inventory-api', link: 'https://example.com/inventory',
    desc: 'A multi-tenant inventory platform with a typed REST + GraphQL API, role-based access, and a Redis-backed cache serving sub-50ms reads.',
    roleDesc: '',
    tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    slides: [{ label: 'API Explorer', grad: 'green', image: '' }, { label: 'Schema Docs', grad: 'amber', image: '' }, { label: 'Dashboards', grad: 'teal', image: '' }] },
  { id: 'p3', n: 'Project 3', title: 'Doc-Summarizer AI', genre: 'AI Tool', tag: 'AI', cover: 'pink',
    role: 'ML Engineer', engine: 'Python', year: '2024',
    repo: 'https://github.com/ramiro/doc-summarizer', link: 'https://example.com/summarize',
    desc: 'An AI tool that ingests long documents and returns structured, cited summaries. Retrieval-augmented over a vector store with streaming output.',
    roleDesc: '',
    tech: ['Python', 'LLM', 'Vector DB', 'FastAPI'],
    slides: [{ label: 'Upload & Parse', grad: 'pink', image: '' }, { label: 'Cited Summary', grad: 'purple', image: '' }, { label: 'Vector Search', grad: 'violet', image: '' }] },
  { id: 'p4', n: 'Project 4', title: 'DevPortfolio CMS', genre: 'Web App / Tooling', tag: 'Web App', cover: 'teal',
    role: 'Full-Stack', engine: 'Sanity', year: '2023',
    repo: 'https://github.com/ramiro/devportfolio-cms', link: 'https://example.com/cms',
    desc: 'A headless CMS and theme system that powers developer portfolios. Authors edit content live and preview across multiple themes instantly.',
    roleDesc: '',
    tech: ['Next.js', 'Sanity', 'TypeScript'],
    slides: [{ label: 'Live Editor', grad: 'teal', image: '' }, { label: 'Theme Switch', grad: 'indigo', image: '' }, { label: 'Preview', grad: 'dark', image: '' }] },
  { id: 'p5', n: 'Project 5', title: 'Match Scheduler Bot', genre: 'Automation', tag: 'Bot', cover: 'orange',
    role: 'Backend', engine: 'Node.js', year: '2022',
    repo: 'https://github.com/ramiro/match-scheduler', link: 'https://example.com/scheduler',
    desc: 'A Discord bot that organizes community tournaments end to end — sign-ups, bracket generation, match reminders and live result tracking.',
    roleDesc: '',
    tech: ['Node.js', 'Discord API', 'SQLite'],
    slides: [{ label: 'Bracket View', grad: 'orange', image: '' }, { label: 'Sign-ups', grad: 'amber', image: '' }, { label: 'Reminders', grad: 'dark', image: '' }] },
  { id: 'p6', n: 'Project 6', title: 'Shader Playground', genre: 'Creative / WebGL', tag: 'Creative', cover: 'purple',
    role: 'Solo Dev', engine: 'WebGL', year: '2025',
    repo: 'https://github.com/ramiro/shader-playground', link: 'https://example.com/shaders',
    desc: 'A browser playground for writing and sharing fragment shaders with live hot-reload, a uniform inspector, and one-click GIF capture.',
    roleDesc: '',
    tech: ['TypeScript', 'WebGL', 'GLSL'],
    slides: [{ label: 'Live Shader', grad: 'purple', image: '' }, { label: 'Uniform Inspector', grad: 'aqua', image: '' }, { label: 'GIF Capture', grad: 'violet', image: '' }] },
  { id: 'p1781810008267', n: 'Project 7', title: 'New Project', genre: 'Web App', tag: 'New', cover: 'indigo',
    role: 'Full-Stack', engine: '', year: '2025',
    repo: '', link: '#',
    desc: '',
    roleDesc: '',
    tech: [],
    slides: [{ label: 'Screen 1', grad: 'indigo', image: '' }] },
];

export const skills = [
  { title: 'Engines', color: '#14B8A6', chips: ['Unity', 'Unreal', 'Godot', 'Bevy'] },
  { title: 'Languages', color: '#D97706', chips: ['C#', 'C++', 'GDScript', 'Rust', 'TypeScript'] },
  { title: 'Art & Audio', color: '#EC4899', chips: ['Shaders', 'Blender', 'Aseprite', 'FMOD'] },
  { title: 'Backend & Ops', color: '#8B5CF6', chips: ['Node.js', 'Photon', 'PostgreSQL', 'Docker', 'CI/CD'] },
];

export const experience = [
  { period: '2026 — Now', title: 'Adjunct Computer Science ', org: 'South Texas College', desc: 'Designing and shipping original games end to end — six titles released across PC and web, from engine work to art, audio and release.' },
  { period: '2024 — 2026', title: 'Graduate Researcher', org: 'ASARG', desc: 'Built realtime web platforms and internal tools, and led a small frontend team shipping weekly to production.' },
  { period: '2024 — 2026', title: 'Lecturer', org: 'University of Texas Rio Grande Valley', desc: 'Shipped API features and developer tooling for a data analytics product used by enterprise teams.' },
  { period: '2022 — 2023', title: 'Undergraduate Teacher Assistant', org: 'University of Texas Rio Grande Valley', desc: '' },
  { period: '2024 — 2025', title: 'Frontend Web Developer', org: 'MVSSIVE', desc: '' },
];

export const education = [
  { period: '2024 — 2026', title: 'M.A. Computer Science', org: 'University of Texas Rio Grande Valley', desc: 'Intensive on engine architecture, gameplay programming and shipping a vertical slice to production.' },
  { period: '2021 — 2023', title: 'B.S. Computer Science', org: 'University of Texas Rio Grande Valley', desc: 'Focus on graphics, systems and AI. Published three papers during undergrad research.' },
];

export const research = [
  { venue: 'Venue · 2025', title: 'New paper', desc: '', href: '#' },
];

export const about = {
  image: '',
  heading: 'Hi, I\'m Ramiro.',
  bio: 'A solo developer who ships games end to end — from the gameplay loop and engine work to art direction, audio, and release. I care about systems that are deep but feel effortless, and I sweat the final 10% that makes a game sing.',
  lookingForTitle: 'What I\'m looking for',
  lookingFor: [
    { dot: '#14B8A6', text: 'A gameplay or engine role on a small, ambitious team' },
    { dot: '#FFDA14', text: 'Studios that ship and iterate fast' },
    { dot: '#EC4899', text: 'Contract work on netcode, tools, or performance' },
  ],
};

export const contact = {
  kicker: 'Let\'s talk',
  heading: 'Let\'s build something great.',
  blurb: 'Have a project in mind, or hiring for a team that ships? I\'m open to the right opportunity.',
  email: 'ramiro.santosf40@gmail.com',
  resumeHref: '#',
  links: [
    { label: 'GitHub', href: 'https://github.com/ButterM-40' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramiro-santos-a26652268/' },
  ],
};

export const footer = {
  name: 'Ramiro Santos',
  tagline: 'Solo Game Developer',
  copyright: '© 2026 Ramiro Santos. All rights reserved.',
};
