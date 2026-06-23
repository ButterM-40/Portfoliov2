// Run: node scripts/sync-portfolio.js
// Reads text.txt (Admin panel export) and rewrites src/data/portfolio.ts

const fs = require('fs');
const path = require('path');

const SRC  = path.join(__dirname, '..', 'text.txt');
const DEST = path.join(__dirname, '..', 'src', 'data', 'portfolio.ts');

const raw = fs.readFileSync(SRC, 'utf8');
const d   = JSON.parse(raw);

function q(s)  { return s == null ? "''" : "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n') + "'"; }
function qs(s) { return s == null ? '' : String(s); }

function slideEntry(sl) {
  const parts = [
    `label: ${q(sl.label)}`,
    `grad: ${q(sl.grad)}`,
    `image: ${q((sl.image || '').startsWith('data:') ? '' : (sl.image || ''))}`,
  ];
  if (sl.youtube) parts.push(`youtube: ${q(sl.youtube)}`);
  return `{ ${parts.join(', ')} }`;
}

function gameEntry(g) {
  const slides = (g.slides || []).map(slideEntry).join(', ');
  const tech   = (g.tech   || []).map(q).join(', ');
  return `\
  { id: ${q(g.id)}, n: ${q(g.n)}, title: ${q(g.title)}, genre: ${q(g.genre)}, cover: ${q(g.cover)},
    role: ${q(g.role)}, engine: ${q(g.engine)}, year: ${q(g.year)},
    repo: ${q(g.repo)}, link: ${q(g.link)},
    desc: ${q(g.desc)},
    roleDesc: ${q(g.roleDesc || '')},
    tech: [${tech}],
    slides: [${slides}] }`;
}

function projectEntry(p) {
  const slides = (p.slides || []).map(slideEntry).join(', ');
  const tech   = (p.tech   || []).map(q).join(', ');
  return `\
  { id: ${q(p.id)}, n: ${q(p.n)}, title: ${q(p.title)}, genre: ${q(p.genre)}, tag: ${q(p.tag)}, cover: ${q(p.cover)},
    role: ${q(p.role)}, engine: ${q(p.engine)}, year: ${q(p.year)},
    repo: ${q(p.repo)}, link: ${q(p.link)},
    desc: ${q(p.desc)},
    roleDesc: ${q(p.roleDesc || '')},
    tech: [${tech}],
    slides: [${slides}] }`;
}

const out = `\
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
  return \`radial-gradient(\${d.dot} 1.2px, transparent 1.6px) 0 0 / 11px 11px, \${d.grad}\`;
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
    if (id) return \`url(https://img.youtube.com/vi/\${id}/hqdefault.jpg) center / cover no-repeat\`;
  }
  if (s.image) return \`url(\${encodeURI(s.image)}) center / cover no-repeat\`;
  return coverBg(s.grad);
}

export const brand = { name: ${q(d.brand?.name)}, accentWord: ${q(d.brand?.accentWord)} };

export const heroData = {
  kicker: ${q(d.hero?.kicker)},
  headline: ${q(d.hero?.headline)},
  subhead: ${q(d.hero?.subhead)},
};

export const stats = [
${(d.stats || []).map(s => `  { value: ${q(s.value)}, label: ${q(s.label)} }`).join(',\n')},
];

export const games = [
${(d.games || []).map(gameEntry).join(',\n')},
];

export const projects = [
${(d.projects || []).map(projectEntry).join(',\n')},
];

export const skills = [
${(d.skills || []).map(s => {
  const chips = (s.chips || []).map(q).join(', ');
  return `  { title: ${q(s.title)}, color: ${q(s.color)}, chips: [${chips}] }`;
}).join(',\n')},
];

export const experience = [
${(d.experience || []).map(e =>
  `  { period: ${q(e.period)}, title: ${q(e.title)}, org: ${q(e.org)}, desc: ${q(e.desc)} }`
).join(',\n')},
];

export const education = [
${(d.education || []).map(e =>
  `  { period: ${q(e.period)}, title: ${q(e.title)}, org: ${q(e.org)}, desc: ${q(e.desc)} }`
).join(',\n')},
];

export const research = [
${(d.research || []).map(r =>
  `  { venue: ${q(r.venue)}, title: ${q(r.title)}, desc: ${q(r.desc)}, href: ${q(r.href)} }`
).join(',\n')},
];

export const about = {
  image: ${q((d.about?.image || '').startsWith('data:') ? '' : (d.about?.image || ''))},
  heading: ${q(d.about?.heading)},
  bio: ${q(d.about?.bio)},
  lookingForTitle: ${q(d.about?.lookingForTitle)},
  lookingFor: [
${(d.about?.lookingFor || []).map(l =>
  `    { dot: ${q(l.dot)}, text: ${q(l.text)} }`
).join(',\n')},
  ],
};

export const contact = {
  kicker: ${q(d.contact?.kicker)},
  heading: ${q(d.contact?.heading)},
  blurb: ${q(d.contact?.blurb)},
  email: ${q(d.contact?.email)},
  resumeHref: ${q(d.contact?.resumeHref)},
  links: [
${(d.contact?.links || []).map(l =>
  `    { label: ${q(l.label)}, href: ${q(l.href)} }`
).join(',\n')},
  ],
};

export const footer = {
  name: ${q(d.footer?.name)},
  tagline: ${q(d.footer?.tagline)},
  copyright: ${q(d.footer?.copyright)},
};
`;

fs.writeFileSync(DEST, out, 'utf8');
console.log('✓ src/data/portfolio.ts updated from text.txt');
