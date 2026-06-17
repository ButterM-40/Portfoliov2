/* Shared content model + localStorage store for the Ramiro.dev portfolio.
   Loaded by both Landing Page.dc.html and Admin.dc.html via a <helmet> <script src>. */
(function () {
  var KEY = 'ramiro.portfolio.v1';

  // ---- Gradient palette (single source of truth for cover art) ----
  var L_INK = 'rgba(17,24,39,0.42)', D_INK = 'rgba(255,255,255,0.5)';
  var L_DOT = 'rgba(17,24,39,0.16)', D_DOT = 'rgba(255,255,255,0.18)';
  function g(grad, light) {
    return { grad: grad, ink: light ? L_INK : D_INK, dot: light ? L_DOT : D_DOT, light: !!light };
  }
  var GRAD = {
    violet:   g('linear-gradient(160deg,#4D2BE0,#3415B8)', false),
    indigo:   g('linear-gradient(160deg,#4502FF,#7B3DFF)', false),
    lavender: g('linear-gradient(160deg,#A78BFA,#8159F0)', false),
    aqua:     g('linear-gradient(160deg,#2EE6C5,#17A6D6)', true),
    pink:     g('linear-gradient(160deg,#FF5E8A,#E0316B)', false),
    amber:    g('linear-gradient(160deg,#FFD914,#FF8A3D)', true),
    orange:   g('linear-gradient(160deg,#FF8A3D,#E05A1E)', false),
    green:    g('linear-gradient(160deg,#10B981,#0E8F6A)', false),
    purple:   g('linear-gradient(160deg,#8B5CF6,#5B2BD6)', false),
    teal:     g('linear-gradient(160deg,#0EA5B7,#0B7E8C)', false),
    coral:    g('linear-gradient(160deg,#FF5E5E,#FF8169)', false),
    dark:     g('linear-gradient(160deg,#1b1430,#0e0a1c)', false),
  };
  var GRAD_KEYS = Object.keys(GRAD);

  // ---- Default content ----
  var DEFAULTS = {
    brand: { name: 'Ramiro', accentWord: '.dev' },
    hero: {
      kicker: 'Ramiro Santos · Solo Game Developer',
      headline: 'Games that feel good to play.',
      subhead: 'I design and build original games end to end — engine, gameplay, and the last 10% of polish. I turn hard systems into tight, joyful play.',
    },
    stats: [
      { value: '3+', label: 'Years Making Games' },
      { value: '6', label: 'Games Shipped' },
      { value: '3', label: 'Research Papers' },
      { value: '50K+', label: 'Players Reached' },
    ],
    games: [
      { id: 'g1', n: 'Game 1', title: 'Crypto Knights', genre: 'RPG / Adventure', cover: 'violet',
        role: 'Solo Dev', engine: 'Unity', year: '2024', repo: 'https://github.com/ramiro/crypto-knights', link: '#',
        desc: 'A party-based tactics RPG with on-chain item ownership. Raid procedurally generated dungeons, trade loot, and climb a seasonal ladder against other players.',
        tech: ['Unity', 'C#', 'Photon', 'Solidity'],
        slides: [{ label: 'Dungeon Raid', grad: 'violet' }, { label: 'Party Loadout', grad: 'indigo' }, { label: 'Boss Encounter', grad: 'dark' }] },
      { id: 'g2', n: 'Game 2', title: 'Metaverse Racer', genre: 'Racing / Action', cover: 'lavender',
        role: 'Gameplay & Netcode', engine: 'Unreal 5', year: '2023', repo: 'https://github.com/ramiro/metaverse-racer', link: '#',
        desc: 'An arcade racer with ghost-replay multiplayer and a full track editor. Drift physics are tuned for feel over realism, with rollback netcode under the hood.',
        tech: ['Unreal', 'C++', 'Niagara', 'Photon'],
        slides: [{ label: 'Time Trial', grad: 'lavender' }, { label: 'Track Editor', grad: 'pink' }, { label: 'Ghost Replay', grad: 'violet' }] },
      { id: 'g3', n: 'Game 3', title: 'Neon Drifters', genre: 'Arcade / Racing', cover: 'aqua',
        role: 'Solo Dev', engine: 'Godot 4', year: '2023', repo: 'https://github.com/ramiro/neon-drifters', link: '#',
        desc: 'An endless synthwave runner with rhythm-locked obstacles and a build-and-burn combo meter. Every track is generated to the beat of its soundtrack.',
        tech: ['Godot', 'GDScript', 'FMOD'],
        slides: [{ label: 'Endless Run', grad: 'aqua' }, { label: 'Combo Meter', grad: 'purple' }, { label: 'Synth Tunnel', grad: 'teal' }] },
      { id: 'g4', n: 'Game 4', title: 'Pixel Siege', genre: 'Strategy / Defense', cover: 'pink',
        role: 'Design & Engineering', engine: 'Unity', year: '2022', repo: 'https://github.com/ramiro/pixel-siege', link: '#',
        desc: 'Tower-defense meets auto-battler. Build, fuse, and overclock turrets against escalating waves, then prestige into harder loops for better blueprints.',
        tech: ['Unity', 'C#', 'Burst', 'DOTS'],
        slides: [{ label: 'Wave Defense', grad: 'pink' }, { label: 'Turret Fusion', grad: 'amber' }, { label: 'Overclock', grad: 'indigo' }] },
      { id: 'g5', n: 'Game 5', title: 'Astro Salvage', genre: 'Roguelike / Space', cover: 'orange',
        role: 'Solo Dev', engine: 'Bevy', year: '2025', repo: 'https://github.com/ramiro/astro-salvage', link: '#',
        desc: 'A roguelike where you scavenge derelict ships for parts and oxygen. Every run reshapes the station layout, and death is permanent — but your blueprints persist.',
        tech: ['Bevy', 'Rust', 'WGSL'],
        slides: [{ label: 'Salvage Run', grad: 'orange' }, { label: 'Derelict Ship', grad: 'dark' }, { label: 'Station Map', grad: 'aqua' }] },
      { id: 'g6', n: 'Game 6', title: 'Combo Cats', genre: 'Puzzle / Casual', cover: 'green',
        role: 'Solo Dev', engine: 'Web / PixiJS', year: '2024', repo: 'https://github.com/ramiro/combo-cats', link: '#',
        desc: 'A cozy match-3 with a chain-combo twist and a roster of hand-animated cats to collect. Daily puzzles, no timers, no pressure — just satisfying chains.',
        tech: ['TypeScript', 'PixiJS', 'Howler'],
        slides: [{ label: 'Match Combo', grad: 'green' }, { label: 'Cat Album', grad: 'amber' }, { label: 'Daily Puzzle', grad: 'pink' }] },
    ],
    projects: [
      { id: 'p1', n: 'Project 1', title: 'Realtime Analytics', genre: 'Web App / Dashboard', tag: 'Web App', cover: 'indigo',
        role: 'Full-Stack', engine: 'Next.js', year: '2024', repo: 'https://github.com/ramiro/realtime-analytics', link: 'https://example.com/analytics',
        desc: 'A realtime analytics dashboard streaming millions of events a day. Live charts, alerting and a query builder over a websocket data layer.',
        tech: ['React', 'Next.js', 'WebSocket', 'D3'],
        slides: [{ label: 'Live Dashboard', grad: 'indigo' }, { label: 'Query Builder', grad: 'aqua' }, { label: 'Alerting', grad: 'dark' }] },
      { id: 'p2', n: 'Project 2', title: 'Inventory API', genre: 'API / Platform', tag: 'API', cover: 'green',
        role: 'Backend', engine: 'FastAPI', year: '2023', repo: 'https://github.com/ramiro/inventory-api', link: 'https://example.com/inventory',
        desc: 'A multi-tenant inventory platform with a typed REST + GraphQL API, role-based access, and a Redis-backed cache serving sub-50ms reads.',
        tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
        slides: [{ label: 'API Explorer', grad: 'green' }, { label: 'Schema Docs', grad: 'amber' }, { label: 'Dashboards', grad: 'teal' }] },
      { id: 'p3', n: 'Project 3', title: 'Doc-Summarizer AI', genre: 'AI Tool', tag: 'AI', cover: 'pink',
        role: 'ML Engineer', engine: 'Python', year: '2024', repo: 'https://github.com/ramiro/doc-summarizer', link: 'https://example.com/summarize',
        desc: 'An AI tool that ingests long documents and returns structured, cited summaries. Retrieval-augmented over a vector store with streaming output.',
        tech: ['Python', 'LLM', 'Vector DB', 'FastAPI'],
        slides: [{ label: 'Upload & Parse', grad: 'pink' }, { label: 'Cited Summary', grad: 'purple' }, { label: 'Vector Search', grad: 'violet' }] },
      { id: 'p4', n: 'Project 4', title: 'DevPortfolio CMS', genre: 'Web App / Tooling', tag: 'Web App', cover: 'teal',
        role: 'Full-Stack', engine: 'Sanity', year: '2023', repo: 'https://github.com/ramiro/devportfolio-cms', link: 'https://example.com/cms',
        desc: 'A headless CMS and theme system that powers developer portfolios. Authors edit content live and preview across multiple themes instantly.',
        tech: ['Next.js', 'Sanity', 'TypeScript'],
        slides: [{ label: 'Live Editor', grad: 'teal' }, { label: 'Theme Switch', grad: 'indigo' }, { label: 'Preview', grad: 'dark' }] },
      { id: 'p5', n: 'Project 5', title: 'Match Scheduler Bot', genre: 'Automation', tag: 'Bot', cover: 'orange',
        role: 'Backend', engine: 'Node.js', year: '2022', repo: 'https://github.com/ramiro/match-scheduler', link: 'https://example.com/scheduler',
        desc: 'A Discord bot that organizes community tournaments end to end — sign-ups, bracket generation, match reminders and live result tracking.',
        tech: ['Node.js', 'Discord API', 'SQLite'],
        slides: [{ label: 'Bracket View', grad: 'orange' }, { label: 'Sign-ups', grad: 'amber' }, { label: 'Reminders', grad: 'dark' }] },
      { id: 'p6', n: 'Project 6', title: 'Shader Playground', genre: 'Creative / WebGL', tag: 'Creative', cover: 'purple',
        role: 'Solo Dev', engine: 'WebGL', year: '2025', repo: 'https://github.com/ramiro/shader-playground', link: 'https://example.com/shaders',
        desc: 'A browser playground for writing and sharing fragment shaders with live hot-reload, a uniform inspector, and one-click GIF capture.',
        tech: ['TypeScript', 'WebGL', 'GLSL'],
        slides: [{ label: 'Live Shader', grad: 'purple' }, { label: 'Uniform Inspector', grad: 'aqua' }, { label: 'GIF Capture', grad: 'violet' }] },
    ],
    skills: [
      { title: 'Engines', color: '#14B8A6', chips: ['Unity', 'Unreal', 'Godot', 'Bevy'] },
      { title: 'Languages', color: '#D97706', chips: ['C#', 'C++', 'GDScript', 'Rust', 'TypeScript'] },
      { title: 'Art & Audio', color: '#EC4899', chips: ['Shaders', 'Blender', 'Aseprite', 'FMOD'] },
      { title: 'Backend & Ops', color: '#8B5CF6', chips: ['Node.js', 'Photon', 'PostgreSQL', 'Docker', 'CI/CD'] },
    ],
    experience: [
      { period: '2023 — Now', title: 'Solo Game Developer', org: 'Independent', desc: 'Designing and shipping original games end to end — six titles released across PC and web, from engine work to art, audio and release.' },
      { period: '2021 — 2023', title: 'Full-Stack Developer', org: 'Tofu Studios', desc: 'Built realtime web platforms and internal tools, and led a small frontend team shipping weekly to production.' },
      { period: '2020 — 2021', title: 'Software Engineering Intern', org: 'Nimbus Labs', desc: 'Shipped API features and developer tooling for a data analytics product used by enterprise teams.' },
    ],
    education: [
      { period: '2019 — 2023', title: 'B.S. Computer Science', org: 'State University', desc: 'Focus on graphics, systems and AI. Published three papers during undergrad research.' },
      { period: '2022', title: 'Game Development Certificate', org: 'GameDev Academy', desc: 'Intensive on engine architecture, gameplay programming and shipping a vertical slice to production.' },
    ],
    research: [
      { venue: 'GDC Tech Track · 2024', title: 'Deterministic Netcode for Real-Time Multiplayer', desc: 'A rollback model that keeps 8-player matches in lockstep under 120ms jitter.', href: '#' },
      { venue: 'AIIDE · 2023', title: 'AI Director Patterns for Procedural Levels', desc: 'Pacing-aware generation that adapts difficulty to live player telemetry.', href: '#' },
      { venue: 'SIGGRAPH Poster · 2025', title: 'Cache-Aware ECS for Large-Scale Simulation', desc: 'Archetype packing that sustains 1M entities at 60fps on consumer hardware.', href: '#' },
    ],
    about: {
      heading: 'Hi, I’m Ramiro.',
      bio: 'A solo developer who ships games end to end — from the gameplay loop and engine work to art direction, audio, and release. I care about systems that are deep but feel effortless, and I sweat the final 10% that makes a game sing.',
      lookingForTitle: 'What I’m looking for',
      lookingFor: [
        { dot: '#14B8A6', text: 'A gameplay or engine role on a small, ambitious team' },
        { dot: '#FFDA14', text: 'Studios that ship and iterate fast' },
        { dot: '#EC4899', text: 'Contract work on netcode, tools, or performance' },
      ],
    },
    contact: {
      kicker: 'Let’s talk',
      heading: 'Let’s build something great.',
      blurb: 'Have a project in mind, or hiring for a team that ships? I’m open to the right opportunity.',
      email: 'ramiro.santosf40@gmail.com',
      resumeHref: '#',
      links: [
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
      ],
    },
    footer: {
      name: 'Ramiro Santos',
      tagline: 'Solo Game Developer',
      copyright: '© 2026 Ramiro Santos. All rights reserved.',
    },
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load() {
    var base = clone(DEFAULTS);
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return base;
      var saved = JSON.parse(raw);
      // top-level merge: saved value wins when present
      Object.keys(saved || {}).forEach(function (k) { base[k] = saved[k]; });
      return base;
    } catch (e) { return base; }
  }

  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    return clone(DEFAULTS);
  }

  function grad(key) { return (GRAD[key] || GRAD.dark).grad; }
  function coverInk(key) { return (GRAD[key] || GRAD.dark).ink; }
  function coverBg(key) {
    var d = (GRAD[key] || GRAD.dark);
    return 'radial-gradient(' + d.dot + ' 1.2px, transparent 1.6px) 0 0 / 11px 11px, ' + d.grad;
  }

  window.PORTFOLIO_GRADIENTS = GRAD;
  window.PORTFOLIO_GRADIENT_KEYS = GRAD_KEYS;
  window.PORTFOLIO_DEFAULTS = DEFAULTS;
  window.PortfolioStore = {
    KEY: KEY, load: load, save: save, reset: reset, clone: clone,
    grad: grad, coverInk: coverInk, coverBg: coverBg,
  };
})();
