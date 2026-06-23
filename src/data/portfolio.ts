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

type Slide = { grad: string; image?: string; youtube?: string };

function youtubeId(url: string): string | null {
  const m = url.match(/[?&]v=([^&]+)/);
  return m?.[1] ?? null;
}

export function slide0Bg(slides: Slide[] | undefined, fallbackCover: string): string {
  if (!slides?.length) return coverBg(fallbackCover);
  const s = slides[0];
  if (s.youtube) {
    const id = youtubeId(s.youtube);
    if (id) return `url(https://img.youtube.com/vi/${id}/hqdefault.jpg) center / cover no-repeat`;
  }
  if (s.image) return `url(${encodeURI(s.image)}) center / cover no-repeat`;
  return coverBg(s.grad);
}

export const brand = { name: 'Butter', accentWord: '.dev' };

export const heroData = {
  kicker: 'Ramiro Santos · Developer',
  headline: 'Games that feel good to play.',
  subhead: 'Developer who makes games. From the first mechanic to the last bug fix.',
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
    repo: 'https://github.com/ButterM-40/Game-Jam-94', link: 'https://butterman40.itch.io/mutant-arena',
    desc: '',
    roleDesc: 'Collaborated with a 3-person team to build a mutant-themed fighting game in Godot using the Castagne framework. Contributed to game planning, progress coordination, and connecting the lead artist\'s artwork with the codebase. Accomplished this in 9 days.',
    tech: [],
    slides: [{ label: 'Concept Art', grad: 'violet', image: '/images/artwork1.jpg' }, { label: 'Mutant Arena Video', grad: 'violet', image: '', youtube: 'https://youtu.be/ugR1BdQ41aY' }] },
  { id: 'g1', n: 'Game 1', title: 'Half Hazard', genre: 'Horror / Puzzle', cover: 'violet',
    role: 'Programmer', engine: 'Godot', year: '2025',
    repo: 'https://github.com/ramiro/crypto-knights', link: 'https://t33-h33-studio.itch.io/half-hazard',
    desc: 'Developed a horror survival game in 48 hours at the Chillennium 2025 Game Jam hosted by Texas A&M University. Implemented core systems including dialogue, an interactive map, and puzzle mechanics.',
    roleDesc: '',
    tech: ['Godot'],
    slides: [{ label: 'Logo', grad: 'violet', image: '/images/zXDARO.png' }, { label: 'Logo', grad: 'violet', image: '', youtube: 'https://www.youtube.com/watch?v=xBPetsN8w90&source_ve_path=OTY3MTQ&embeds_referring_euri=https%3A%2F%2Ft33-h33-studio.itch.io%2Fhalf-hazard' }] },
  { id: 'g2', n: 'Game 2', title: 'Spirits of the Wind', genre: 'Puzzle / Platform', cover: 'lavender',
    role: 'Lead Programmer', engine: 'Godot', year: '2024',
    repo: 'https://github.com/ButterM-40/BlitzWaveStudioGameJam70', link: 'https://blitzwavesstudios.itch.io/spirits-of-the-wild',
    desc: 'A puzzle platformer inspired by Native American culture. Made for the Godot WildJam 70. You wake up and you and several others are all trapped in one body. When you and the others in your body die you turn into Totems and start at the begining of the puzzle. You all have angered a spirit in some way and now it wants revenge.',
    roleDesc: 'Led a 6-person team to design and ship a puzzle game in one week for Godot Wild Jam 84. Contributed systems such as UI design, map development, a character swap mechanic, and coordinating with the team.',
    tech: ['Godot'],
    slides: [{ label: 'Main Scene', grad: 'lavender', image: '/images/Screenshot 2026-06-21 220127.png' }, { label: 'Gameplay', grad: 'lavender', image: '/images/Screenshot 2026-06-21 220230.png' }] },
  { id: 'g3', n: 'Sole Survivor', title: 'Sole Survivor', genre: 'Arcade ', cover: 'aqua',
    role: 'Lead Programmer', engine: 'Unity', year: '2023',
    repo: 'https://github.com/ButterM-40/202320-final-game-immortal-players-only', link: '#',
    desc: 'A Sole Survivor in a world overunned by Vampires, your goal is to survive! \nEnjoy this Vampire Survivors, and try to reach the highscore.',
    roleDesc: 'Led a team of 3 to build a Vampire Survivors-style game for a game dev competition, earning Player\'s Choice and 3rd place. Built the leaderboard, enemy spawning system, and scoring mechanics. ',
    tech: ['Unity', 'Asesprite'],
    slides: [{ label: 'Synth Tunnel', grad: 'teal', image: '' }] },
];

export const projects = [
  { id: 'p1', n: 'Project 1', title: 'Tumbile Tiles Web', genre: 'Web App', tag: 'Web App', cover: 'indigo',
    role: 'Web Developer', engine: 'Javscript', year: '2024',
    repo: 'https://github.com/ButterM-40/TumbleTiles', link: 'https://github.com/ButterM-40/TumbleTiles',
    desc: 'Implements the tumble tile model as designed by Robert Schweller and Tim Wylie. This project was done for the Algorithmic Self-Assembly Research Group (ASARG) at the University of Texas - Rio Grande Valley.',
    roleDesc: 'Web Version is available and will not be maintained by me',
    tech: ['HTML', 'CSS', 'Javscript'],
    slides: [{ label: 'Live Dashboard', grad: 'indigo', image: '' }] },
  { id: 'p1782235220846', n: 'Project 2', title: 'Communicative NPC', genre: 'AI NPC', tag: 'New', cover: 'indigo',
    role: 'Full-Stack', engine: 'Unity', year: '2023',
    repo: 'https://github.com/ButterM-40/Dungeon-Game-3D', link: '#',
    desc: 'Developed a 3D RPG featuring custom spawners and a climactic boss room. The boss enemy leverages a dual-LLM architecture to dynamically decide actions and dialogue based on its current mood state. Integrated ElevenLabs for real-time voice synthesis, enabling fully voiced NPC responses. Built a voice-to-voice pipeline where players speak to the boss and receive spoken replies creating an immersive, AI-driven combat experience.',
    roleDesc: 'Led LLM architecture design and API integration (ElevenLabs + LLM pipeline), including voice input capture and NPC voice response.',
    tech: ['ElevenLab', 'LLM', 'C#'],
    slides: [{ label: 'Screen 1', grad: 'indigo', image: '', youtube: 'https://www.youtube.com/watch?v=W_adTM71V2w' }] },
];

export const skills = [
  { title: 'Engines', color: '#14B8A6', chips: ['Unity', 'Unreal', 'Godot', 'Bevy'] },
  { title: 'Languages', color: '#D97706', chips: ['C#', 'C++', 'GDScript', 'Rust', 'TypeScript', 'Python'] },
  { title: 'Art & Audio', color: '#EC4899', chips: ['Shaders', 'Blender', 'Aseprite', 'FMOD'] },
  { title: 'Backend & Ops', color: '#8B5CF6', chips: ['Node.js', 'Photon', 'PostgreSQL', 'Docker', 'CI/CD'] },
];

export const experience = [
  { period: '2026 — Now', title: 'Adjunct Computer Science ', org: 'South Texas College', desc: 'Teaching Computer Science courses at the college level, bringing real-world research and industry experience into the classroom to help students build a strong foundation in CS fundamentals.' },
  { period: '2024 — 2026', title: 'Graduate Researcher', org: 'ASARG', desc: 'Conducting theoretical research in molecular computing, exploring Chemical Reaction Networks, Tile Assembly Models, and computational complexity at the nanoscale. Working at the intersection of mathematics, biology, and computer science.' },
  { period: '2024 — 2026', title: 'Lecturer', org: 'University of Texas Rio Grande Valley', desc: 'Teaching Introduction to Computer Science across multiple sections, covering topics from Boolean logic and web technologies to AI and game development. Focused on making foundational CS concepts accessible to students of all backgrounds.' },
  { period: '2022 — 2023', title: 'Undergraduate Teacher Assistant', org: 'University of Texas Rio Grande Valley', desc: 'Supported student success through grading, office hours, and one-on-one guidance. Helped create an encouraging learning environment where students could confidently engage with course material.' },
  { period: '2024 — 2025', title: 'Frontend Web Developer', org: 'MVSSIVE', desc: 'Built and maintained full stack web features using TypeScript and Dockerized microservices, from audio/image processing tools to secure backend APIs. Collaborated with cross-functional teams to ship scalable, production-ready applications.' },
];

export const education = [
  { period: '2024 — 2026', title: 'M.A. Computer Science', org: 'University of Texas Rio Grande Valley', desc: '' },
  { period: '2021 — 2023', title: 'B.S. Computer Science', org: 'University of Texas Rio Grande Valley', desc: '' },
];

export const research = [
  { venue: 'SWAT · 2026', title: 'Reachability with Restricted Reactions in Inhibitory Chemical Reaction Networks', desc: '', href: '#' },
  { venue: 'Master Thesis 2026', title: 'Exploration of Extended Chemical Reaction Networks', desc: '', href: '#' },
  { venue: 'ISAAC · 2025', title: 'Polynomial equivalence of extended chemical reaction models', desc: '', href: 'https://arxiv.org/pdf/2509.15584' },
  { venue: 'SAND · 2025', title: 'Fractals in Seeded Tile Automata', desc: '', href: 'https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.SAND.2025.14' },
  { venue: 'IWOCA  · 2025', title: 'Tile-Based Knot Assembly with Celtic!', desc: '', href: 'https://link.springer.com/chapter/10.1007/978-3-031-98740-3_23' },
  { venue: 'Hackresearch · 2024', title: 'Kirby\'s Adventure into PSPACE', desc: '', href: 'https://utrgv.hackresearch.com/site/wp-content/uploads/2024/01/HackR23.pdf#page=44' },
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
