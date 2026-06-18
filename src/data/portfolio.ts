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

export const brand = { name: 'Ramiro', accentWord: '.dev' };

export const heroData = {
  kicker: 'Ramiro Santos · Solo Game Developer',
  headline: 'Games that feel good to play.',
  subhead: 'I design and build original games end to end — engine, gameplay, and the last 10% of polish. I turn hard systems into tight, joyful play.',
};

export const stats = [
  { value: '3+',   label: 'Years Making Games' },
  { value: '6',    label: 'Games Shipped'       },
  { value: '3',    label: 'Research Papers'     },
  { value: '50K+', label: 'Players Reached'     },
];

export const games = [
  { id: 'g1', n: 'Game 1', title: 'Crypto Knights',   genre: 'RPG / Adventure',      cover: 'violet',
    role: 'Solo Dev',            engine: 'Unity',        year: '2024',
    repo: 'https://github.com/ramiro/crypto-knights',  link: '#',
    desc: 'A party-based tactics RPG with on-chain item ownership. Raid procedurally generated dungeons, trade loot, and climb a seasonal ladder against other players.',
    roleDesc: '',
    tech: ['Unity', 'C#', 'Photon', 'Solidity'],
    slides: [{ label: 'Dungeon Raid', grad: 'violet', image: '' }, { label: 'Party Loadout', grad: 'indigo', image: '' }, { label: 'Boss Encounter', grad: 'dark', image: '' }] },
  { id: 'g2', n: 'Game 2', title: 'Metaverse Racer',  genre: 'Racing / Action',       cover: 'lavender',
    role: 'Gameplay & Netcode',  engine: 'Unreal 5',     year: '2023',
    repo: 'https://github.com/ramiro/metaverse-racer', link: '#',
    desc: 'An arcade racer with ghost-replay multiplayer and a full track editor. Drift physics are tuned for feel over realism, with rollback netcode under the hood.',
    roleDesc: '',
    tech: ['Unreal', 'C++', 'Niagara', 'Photon'],
    slides: [{ label: 'Time Trial', grad: 'lavender', image: '' }, { label: 'Track Editor', grad: 'pink', image: '' }, { label: 'Ghost Replay', grad: 'violet', image: '' }] },
  { id: 'g3', n: 'Game 3', title: 'Neon Drifters',    genre: 'Arcade / Racing',       cover: 'aqua',
    role: 'Solo Dev',            engine: 'Godot 4',      year: '2023',
    repo: 'https://github.com/ramiro/neon-drifters',   link: '#',
    desc: 'An endless synthwave runner with rhythm-locked obstacles and a build-and-burn combo meter. Every track is generated to the beat of its soundtrack.',
    roleDesc: '',
    tech: ['Godot', 'GDScript', 'FMOD'],
    slides: [{ label: 'Endless Run', grad: 'aqua', image: '' }, { label: 'Combo Meter', grad: 'purple', image: '' }, { label: 'Synth Tunnel', grad: 'teal', image: '' }] },
  { id: 'g4', n: 'Game 4', title: 'Pixel Siege',      genre: 'Strategy / Defense',    cover: 'pink',
    role: 'Design & Engineering',engine: 'Unity',        year: '2022',
    repo: 'https://github.com/ramiro/pixel-siege',     link: '#',
    desc: 'Tower-defense meets auto-battler. Build, fuse, and overclock turrets against escalating waves, then prestige into harder loops for better blueprints.',
    roleDesc: '',
    tech: ['Unity', 'C#', 'Burst', 'DOTS'],
    slides: [{ label: 'Wave Defense', grad: 'pink', image: '' }, { label: 'Turret Fusion', grad: 'amber', image: '' }, { label: 'Overclock', grad: 'indigo', image: '' }] },
  { id: 'g5', n: 'Game 5', title: 'Astro Salvage',    genre: 'Roguelike / Space',     cover: 'orange',
    role: 'Solo Dev',            engine: 'Bevy',          year: '2025',
    repo: 'https://github.com/ramiro/astro-salvage',   link: '#',
    desc: 'A roguelike where you scavenge derelict ships for parts and oxygen. Every run reshapes the station layout, and death is permanent — but your blueprints persist.',
    roleDesc: '',
    tech: ['Bevy', 'Rust', 'WGSL'],
    slides: [{ label: 'Salvage Run', grad: 'orange', image: '' }, { label: 'Derelict Ship', grad: 'dark', image: '' }, { label: 'Station Map', grad: 'aqua', image: '' }] },
  { id: 'g6', n: 'Game 6', title: 'Combo Cats',       genre: 'Puzzle / Casual',       cover: 'green',
    role: 'Solo Dev',            engine: 'Web / PixiJS',  year: '2024',
    repo: 'https://github.com/ramiro/combo-cats',      link: '#',
    desc: 'A cozy match-3 with a chain-combo twist and a roster of hand-animated cats to collect. Daily puzzles, no timers, no pressure — just satisfying chains.',
    roleDesc: '',
    tech: ['TypeScript', 'PixiJS', 'Howler'],
    slides: [{ label: 'Match Combo', grad: 'green', image: '' }, { label: 'Cat Album', grad: 'amber', image: '' }, { label: 'Daily Puzzle', grad: 'pink', image: '' }] },
];

export const projects = [
  { id: 'p1', n: 'Project 1', title: 'Realtime Analytics',  genre: 'Web App / Dashboard', tag: 'Web App',  cover: 'indigo',
    role: 'Full-Stack', engine: 'Next.js',  year: '2024',
    repo: 'https://github.com/ramiro/realtime-analytics',  link: 'https://example.com/analytics',
    desc: 'A realtime analytics dashboard streaming millions of events a day. Live charts, alerting and a query builder over a websocket data layer.',
    roleDesc: '',
    tech: ['React', 'Next.js', 'WebSocket', 'D3'],
    slides: [{ label: 'Live Dashboard', grad: 'indigo', image: '' }, { label: 'Query Builder', grad: 'aqua', image: '' }, { label: 'Alerting', grad: 'dark', image: '' }] },
  { id: 'p2', n: 'Project 2', title: 'Inventory API',       genre: 'API / Platform',      tag: 'API',      cover: 'green',
    role: 'Backend',    engine: 'FastAPI',  year: '2023',
    repo: 'https://github.com/ramiro/inventory-api',        link: 'https://example.com/inventory',
    desc: 'A multi-tenant inventory platform with a typed REST + GraphQL API, role-based access, and a Redis-backed cache serving sub-50ms reads.',
    roleDesc: '',
    tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    slides: [{ label: 'API Explorer', grad: 'green', image: '' }, { label: 'Schema Docs', grad: 'amber', image: '' }, { label: 'Dashboards', grad: 'teal', image: '' }] },
  { id: 'p3', n: 'Project 3', title: 'Doc-Summarizer AI',   genre: 'AI Tool',             tag: 'AI',       cover: 'pink',
    role: 'ML Engineer',engine: 'Python',   year: '2024',
    repo: 'https://github.com/ramiro/doc-summarizer',       link: 'https://example.com/summarize',
    desc: 'An AI tool that ingests long documents and returns structured, cited summaries. Retrieval-augmented over a vector store with streaming output.',
    roleDesc: '',
    tech: ['Python', 'LLM', 'Vector DB', 'FastAPI'],
    slides: [{ label: 'Upload & Parse', grad: 'pink', image: '' }, { label: 'Cited Summary', grad: 'purple', image: '' }, { label: 'Vector Search', grad: 'violet', image: '' }] },
  { id: 'p4', n: 'Project 4', title: 'DevPortfolio CMS',   genre: 'Web App / Tooling',   tag: 'Web App',  cover: 'teal',
    role: 'Full-Stack', engine: 'Sanity',   year: '2023',
    repo: 'https://github.com/ramiro/devportfolio-cms',     link: 'https://example.com/cms',
    desc: 'A headless CMS and theme system that powers developer portfolios. Authors edit content live and preview across multiple themes instantly.',
    roleDesc: '',
    tech: ['Next.js', 'Sanity', 'TypeScript'],
    slides: [{ label: 'Live Editor', grad: 'teal', image: '' }, { label: 'Theme Switch', grad: 'indigo', image: '' }, { label: 'Preview', grad: 'dark', image: '' }] },
  { id: 'p5', n: 'Project 5', title: 'Match Scheduler Bot', genre: 'Automation',          tag: 'Bot',      cover: 'orange',
    role: 'Backend',    engine: 'Node.js',  year: '2022',
    repo: 'https://github.com/ramiro/match-scheduler',      link: 'https://example.com/scheduler',
    desc: 'A Discord bot that organizes community tournaments end to end — sign-ups, bracket generation, match reminders and live result tracking.',
    roleDesc: '',
    tech: ['Node.js', 'Discord API', 'SQLite'],
    slides: [{ label: 'Bracket View', grad: 'orange', image: '' }, { label: 'Sign-ups', grad: 'amber', image: '' }, { label: 'Reminders', grad: 'dark', image: '' }] },
  { id: 'p6', n: 'Project 6', title: 'Shader Playground',  genre: 'Creative / WebGL',    tag: 'Creative', cover: 'purple',
    role: 'Solo Dev',   engine: 'WebGL',    year: '2025',
    repo: 'https://github.com/ramiro/shader-playground',    link: 'https://example.com/shaders',
    desc: 'A browser playground for writing and sharing fragment shaders with live hot-reload, a uniform inspector, and one-click GIF capture.',
    roleDesc: '',
    tech: ['TypeScript', 'WebGL', 'GLSL'],
    slides: [{ label: 'Live Shader', grad: 'purple', image: '' }, { label: 'Uniform Inspector', grad: 'aqua', image: '' }, { label: 'GIF Capture', grad: 'violet', image: '' }] },
];

export const skills = [
  { title: 'Engines',        color: '#14B8A6', chips: ['Unity', 'Unreal', 'Godot', 'Bevy'] },
  { title: 'Languages',      color: '#D97706', chips: ['C#', 'C++', 'GDScript', 'Rust', 'TypeScript'] },
  { title: 'Art & Audio',    color: '#EC4899', chips: ['Shaders', 'Blender', 'Aseprite', 'FMOD'] },
  { title: 'Backend & Ops',  color: '#8B5CF6', chips: ['Node.js', 'Photon', 'PostgreSQL', 'Docker', 'CI/CD'] },
];

export const experience = [
  { period: '2023 — Now',  title: 'Solo Game Developer',       org: 'Independent',  desc: 'Designing and shipping original games end to end — six titles released across PC and web, from engine work to art, audio and release.' },
  { period: '2021 — 2023', title: 'Full-Stack Developer',      org: 'Tofu Studios', desc: 'Built realtime web platforms and internal tools, and led a small frontend team shipping weekly to production.' },
  { period: '2020 — 2021', title: 'Software Engineering Intern',org: 'Nimbus Labs',  desc: 'Shipped API features and developer tooling for a data analytics product used by enterprise teams.' },
];

export const education = [
  { period: '2019 — 2023', title: 'B.S. Computer Science',          org: 'State University',  desc: 'Focus on graphics, systems and AI. Published three papers during undergrad research.' },
  { period: '2022',        title: 'Game Development Certificate',    org: 'GameDev Academy',   desc: 'Intensive on engine architecture, gameplay programming and shipping a vertical slice to production.' },
];

export const research = [
  { venue: 'GDC Tech Track · 2024', title: 'Deterministic Netcode for Real-Time Multiplayer',  desc: 'A rollback model that keeps 8-player matches in lockstep under 120ms jitter.',                        href: '#' },
  { venue: 'AIIDE · 2023',          title: 'AI Director Patterns for Procedural Levels',        desc: 'Pacing-aware generation that adapts difficulty to live player telemetry.',                             href: '#' },
  { venue: 'SIGGRAPH Poster · 2025', title: 'Cache-Aware ECS for Large-Scale Simulation',       desc: 'Archetype packing that sustains 1M entities at 60fps on consumer hardware.',                          href: '#' },
];

export const about = {
  image: '',
  heading: 'Hi, I\'m Ramiro.',
  bio: 'A solo developer who ships games end to end — from the gameplay loop and engine work to art direction, audio, and release. I care about systems that are deep but feel effortless, and I sweat the final 10% that makes a game sing.',
  lookingForTitle: 'What I\'m looking for',
  lookingFor: [
    { dot: '#14B8A6', text: 'A gameplay or engine role on a small, ambitious team' },
    { dot: '#FFDA14', text: 'Studios that ship and iterate fast'                   },
    { dot: '#EC4899', text: 'Contract work on netcode, tools, or performance'      },
  ],
};

export const contact = {
  kicker: 'Let\'s talk',
  heading: 'Let\'s build something great.',
  blurb: 'Have a project in mind, or hiring for a team that ships? I\'m open to the right opportunity.',
  email: 'ramiro.santosf40@gmail.com',
  resumeHref: '#',
  links: [
    { label: 'GitHub',   href: 'https://github.com'   },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};

export const footer = {
  name: 'Ramiro Santos',
  tagline: 'Solo Game Developer',
  copyright: '© 2026 Ramiro Santos. All rights reserved.',
};
