'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { grad, coverBg, coverInk, slide0Bg } from '@/data/portfolio';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { useTheme } from '@/hooks/useTheme';
import { useMobile } from '@/hooks/useMobile';

interface Selected { kind: 'game'|'project'; title: string; genre: string; desc: string; role: string; engine: string; year: string; repo: string; link: string; tech: string[]; slides: {label:string;grad:string;image?:string;youtube?:string}[]; }

function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
function venueYear(venue: string): number {
  const m = venue.match(/\b(20\d{2}|19\d{2})\b/);
  return m ? parseInt(m[1]) : 0;
}

export default function HomePage() {
  const { brand, hero: heroData, stats, games, projects, skills, experience, education, research, about, contact, footer } = usePortfolioData();
  const { theme, toggleTheme } = useTheme('coral');
  const isMobile = useMobile();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [selected,  setSelected]  = useState<Selected | null>(null);
  const [slide,     setSlide]     = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);

  const acRef    = useRef<AudioContext|null>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const slides = (games.find((g: any) => g.featured) ?? games[0])?.slides ?? [];
    if (!slides.length) return;
    const t = setInterval(() => setHeroSlide(s => (s + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [games]);

  function getAC() {
    if (mutedRef.current) return null;
    try { acRef.current = acRef.current || new AudioContext(); return acRef.current; } catch { return null; }
  }
  function beep(freq: number, dur = 0.12) {
    const ac = getAC(); if (!ac) return;
    const o = ac.createOscillator(), g2 = ac.createGain();
    o.type = 'square'; o.frequency.value = freq;
    o.connect(g2); g2.connect(ac.destination);
    const t = ac.currentTime;
    g2.gain.setValueAtTime(0.06, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur);
  }

  function openModal(kind: 'game'|'project', idx: number) {
    const src = kind === 'game' ? games : projects;
    const item = src[idx];
    if (!item) return;
    setSelected({ kind, title: item.title, genre: item.genre, desc: item.desc, role: item.role, engine: item.engine, year: item.year, repo: item.repo, link: item.link, tech: item.tech, slides: item.slides });
    setSlide(0);
    beep(520, 0.08);
  }

  const slides    = selected?.slides ?? [];
  const curSlide  = slides[slide] ?? slides[0];
  const accent    = '#FFDA14';

  // Hero showcase — one featured game, cycles through its slides
  const heroGame   = games.find((g: any) => g.featured) ?? games[0];
  const heroSlides = heroGame?.slides ?? [];
  const heroCur    = heroSlides[heroSlide] ?? heroSlides[0];
  const heroYtId   = getYoutubeId((heroCur as any)?.youtube || '');

  // Display lists
  const displayedGames    = (games.some((g: any) => g.featured) ? games.filter((g: any) => g.featured) : games).slice(0, 6);
  const displayedProjects = (projects.some((p: any) => p.featured) ? projects.filter((p: any) => p.featured) : projects).slice(0, 6);
  const displayedResearch = [...research].sort((a, b) => venueYear(b.venue) - venueYear(a.venue)).slice(0, 3);

  const NAV_LINKS = ['Games','Projects','Experience','Research','About'];

  return (
    <div data-theme={theme} style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--ink)', background: 'var(--page)' }}>

      {/* NAV */}
      <div style={{ position: 'sticky', top: 16, zIndex: 50, padding: '0 16px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: 'var(--nav-bg)', backdropFilter: 'blur(10px)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 12px 10px 22px', boxShadow: '0 6px 0 var(--shadow)' }}>
          <a href="#home" style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22, textDecoration: 'none', color: 'var(--ink)', letterSpacing: -0.5, flexShrink: 0 }}>
            {brand.name}<span style={{ color: 'var(--accent)' }}>{brand.accentWord}</span>
          </a>
          {isMobile ? (
            <button onClick={() => setMenuOpen(o => !o)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 12, padding: '8px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, lineHeight: 1 }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'nowrap' }}>
              {NAV_LINKS.map(s => (
                <a key={s} href={`#${s.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--ink)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 12px', borderRadius: 999 }}>{s}</a>
              ))}
              <button onClick={() => { toggleTheme(); beep(700, 0.06); }} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '7px 13px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: theme === 'coral' ? '#2EE6C5' : '#FF5E5E', border: '1.5px solid var(--border)', display: 'inline-block' }} />
                {theme === 'coral' ? 'Midnight' : 'Coral'}
              </button>
              <button onClick={() => setMuted(m => !m)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '7px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>{muted ? 'SFX OFF' : 'SFX ON'}</button>
              <a href="#contact" style={{ textDecoration: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: '2px solid var(--border)', borderRadius: 999, padding: '9px 18px', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>Hire Me</a>
            </div>
          )}
        </div>
        {/* Mobile menu drawer */}
        {isMobile && menuOpen && (
          <div style={{ maxWidth: 1180, margin: '8px auto 0', background: 'var(--nav-bg)', backdropFilter: 'blur(10px)', border: '2px solid var(--border)', borderRadius: 20, padding: '16px 20px', boxShadow: '0 6px 0 var(--shadow)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--ink)', fontSize: 15, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '12px 10px', borderRadius: 12, display: 'block', borderBottom: '1px solid var(--border)' }}>{s}</a>
            ))}
            <div style={{ display: 'flex', gap: 8, paddingTop: 10, flexWrap: 'wrap' }}>
              <button onClick={() => { toggleTheme(); beep(700, 0.06); setMenuOpen(false); }} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: theme === 'coral' ? '#2EE6C5' : '#FF5E5E', border: '1.5px solid var(--border)', display: 'inline-block' }} />
                {theme === 'coral' ? 'Midnight' : 'Coral'}
              </button>
              <button onClick={() => setMuted(m => !m)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, letterSpacing: 0.5 }}>{muted ? 'SFX OFF' : 'SFX ON'}</button>
              <a href="#contact" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 18px', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>Hire Me</a>
            </div>
          </div>
        )}
      </div>

      {/* HERO */}
      <section id="home" style={{ scrollMarginTop: 90, background: 'var(--hero)', padding: isMobile ? '48px 16px 56px' : '64px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -80, width: 340, height: 340, borderRadius: '50%', background: 'rgba(255,218,20,0.16)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr', gap: isMobile ? 36 : 48, alignItems: 'center', position: 'relative' }}>
          <div className="reveal">
            <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{heroData.kicker}</div>
            <h1 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 52 : 74, lineHeight: 0.92, margin: '0px 0 0', color: '#fff', letterSpacing: -1.5, textShadow: '0 5px 0 rgba(17,24,39,0.4)' }}>{heroData.headline}</h1>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.9)', marginTop: 22 }}>M.S. Computer Science</div>
            <p style={{ maxWidth: 520, margin: '22px 0 0', fontSize: isMobile ? 14 : 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.92)' }}>{heroData.subhead}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <a href="#games"    style={{ textDecoration: 'none', background: '#FFDA14', color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '14px 26px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 6px 0 #111827' }}>View Games</a>
              <a href="#projects" style={{ textDecoration: 'none', background: '#fff',    color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '14px 26px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 6px 0 #111827' }}>View Projects</a>
            </div>
          </div>

          {/* HERO GAME SHOWCASE — one game, slides auto-cycle */}
          {heroGame && (
            <div className="reveal">
              <div style={{ background: '#fff', border: '2px solid #111827', borderRadius: 24, padding: 14, boxShadow: '0 12px 0 #111827' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 14, overflow: 'hidden', border: '2px solid #111827' }}>
                  {/* Slide — keyed so React remounts it and triggers the fade animation */}
                  <div
                    key={heroSlide}
                    style={{ position: 'absolute', inset: 0, animation: 'heroFade 0.45s ease', background: heroYtId ? '#000' : (heroCur as any)?.image ? `url(${(heroCur as any).image}) center/cover no-repeat` : `radial-gradient(rgba(255,255,255,0.16) 1.2px, transparent 1.6px) 0 0 / 13px 13px, ${grad(heroCur?.grad ?? 'dark')}` }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.05) 0 2px,transparent 2px 5px)', pointerEvents: 'none', zIndex: 2 }} />
                    {heroYtId ? (
                      <iframe src={`https://www.youtube.com/embed/${heroYtId}?rel=0`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', zIndex: 3 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    ) : !(heroCur as any)?.image && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
                        <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', padding: '0 16px' }}>{heroCur?.label}</div>
                      </div>
                    )}
                  </div>
                  {/* Slide dots */}
                  {heroSlides.length > 1 && (
                    <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', gap: 6, justifyContent: 'center', zIndex: 4 }}>
                      {heroSlides.map((_, i) => (
                        <button key={i} onClick={() => { setHeroSlide(i); beep(440, 0.06); }} style={{ width: 8, height: 8, borderRadius: '50%', background: i === heroSlide ? '#FFDA14' : 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', padding: 0 }} />
                      ))}
                    </div>
                  )}
                </div>
                {/* Game info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 4px 4px' }}>
                  <div>
                    <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 20, color: '#111827', textTransform: 'uppercase' }}>{heroGame.title}</div>
                    <div style={{ fontSize: 11, color: '#8A8AA0', letterSpacing: 0.5, marginTop: 2 }}>{heroGame.genre} · {heroGame.engine} · {heroGame.year}</div>
                  </div>
                  <button onClick={() => openModal('game', games.indexOf(heroGame))} style={{ cursor: 'pointer', background: '#FFDA14', color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '10px 18px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, letterSpacing: 0.5, boxShadow: '0 4px 0 #111827', whiteSpace: 'nowrap' }}>▶ View Game</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--stat)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '34px 16px' }}>
        <div className="reveal" style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 18 }}>
          {stats.map(st => (
            <div key={st.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 40 : 54, lineHeight: 1, color: 'var(--stat-ink)' }}>{st.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginTop: 6, color: 'var(--stat-label)' }}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED GAMES */}
      {/* FEATURED PROJECTS */}
      <section id="projects" style={{ scrollMarginTop: 90, background: 'var(--s-projects)', padding: isMobile ? '56px 16px' : '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--s-eyebrow)' }}>Beyond the arcade</span>
              <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 36 : 46, margin: '8px 0 0', color: 'var(--s-head)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Featured Projects</h2>
            </div>
            <Link href="/projects" style={{ textDecoration: 'none', background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '11px 22px', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 var(--shadow)', whiteSpace: 'nowrap' }}>View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {displayedProjects.slice(0, 3).map((p, i) => (
              <div key={p.id} className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr', gap: isMobile ? 20 : 36, alignItems: 'center', background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, padding: isMobile ? 20 : 32, boxShadow: '8px 8px 0 var(--shadow)' }}>
                <div style={{ position: 'relative', height: isMobile ? 180 : 220, border: '2px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: slide0Bg(p.slides, p.cover), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {!p.slides?.length && <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: 2, color: coverInk(p.cover), textTransform: 'uppercase' }}>{p.n}</span>}
                  <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(17,24,39,0.6)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>{p.tag}</span>
                  <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(17,24,39,0.6)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: '4px 10px', borderRadius: 999 }}>{p.year}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 22 : 28, margin: 0, textTransform: 'uppercase', color: 'var(--card-ink)', letterSpacing: 0.5 }}>{p.title}</h3>
                    <span style={{ fontSize: 12, color: 'var(--card-soft)', fontWeight: 600 }}>{p.genre} · {p.engine} · {p.role}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--card-ink)', opacity: 0.85 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {(p.tech || []).map((t: string) => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', background: 'var(--s-projects)', color: 'var(--s-eyebrow)', border: '1.5px solid var(--border)', borderRadius: 999, padding: '4px 10px' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {p.link && p.link !== '#' && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: accent, color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '10px 20px', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 4px 0 #111827' }}>View Project</a>}
                    {p.repo && p.repo !== '#' && <a href={p.repo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 20px', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>GitHub</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="games" style={{ scrollMarginTop: 90, background: 'var(--feature)', padding: isMobile ? '56px 16px' : '80px 24px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 36 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Top Titles</span>
              <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 36 : 46, margin: '8px 0 0', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5, textShadow: '0 4px 0 rgba(17,24,39,0.35)' }}>Featured Games</h2>
            </div>
            <Link href="/games" style={{ textDecoration: 'none', background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '11px 22px', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 var(--shadow)' }}>View All</Link>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
            {displayedGames.map(g => (
              <div key={g.id} style={{ background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 14, padding: 12, boxShadow: '8px 8px 0 var(--shadow)' }}>
                <div style={{ height: 140, border: '2px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: slide0Bg(g.slides, g.cover), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!g.slides?.length && <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: 2, color: coverInk(g.cover), textTransform: 'uppercase' }}>{g.n}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '14px 6px 6px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 19, margin: 0, textTransform: 'uppercase', color: 'var(--card-ink)' }}>{g.title}</h3>
                    <span style={{ fontSize: 12, color: 'var(--card-soft)' }}>{g.genre}</span>
                  </div>
                  <button onClick={() => openModal('game', games.indexOf(g))} style={{ width: 44, height: 44, flexShrink: 0, borderRadius: '50%', background: accent, border: '2px solid #111827', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, boxShadow: '0 4px 0 #111827', cursor: 'pointer', padding: 0 }}>▶</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ scrollMarginTop: 90, background: 'var(--s-skills)', padding: isMobile ? '56px 16px' : '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ marginBottom: 34 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--s-eyebrow)' }}>Tech Stack</span>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 36 : 46, margin: '8px 0 0', color: 'var(--s-head)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Skills &amp; Tools</h2>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16 }}>
            {skills.map(sk => (
              <div key={sk.title} style={{ background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, padding: isMobile ? 16 : 22, boxShadow: '0 5px 0 var(--shadow)' }}>
                <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 18, margin: '0 0 14px', color: sk.color, textTransform: 'uppercase' }}>{sk.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {sk.chips.map(c => <span key={c} style={{ border: '1.5px solid var(--chip-border)', color: 'var(--card-ink)', borderRadius: 999, padding: '5px 10px', fontSize: 11, fontWeight: 600 }}>{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ scrollMarginTop: 90, background: 'var(--s-exp)', padding: isMobile ? '56px 16px' : '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ marginBottom: 34 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--s-eyebrow)' }}>Background</span>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 36 : 46, margin: '8px 0 0', color: 'var(--s-head)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Education &amp; Experience</h2>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--s-sublabel)', marginBottom: 14 }}>Experience</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map(ex => (
                  <div key={ex.title} style={{ background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, padding: 22, boxShadow: '0 5px 0 var(--shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ background: 'var(--chip-bg)', border: '1.5px solid var(--chip-border)', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--card-ink)' }}>{ex.period}</span>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                    </div>
                    <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 21, margin: '12px 0 0', color: 'var(--card-ink)' }}>{ex.title}</h3>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: 'var(--accent)', marginTop: 3 }}>{ex.org}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--card-soft)', margin: '10px 0 0' }}>{ex.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: isMobile ? 24 : 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--s-sublabel)', marginBottom: 14 }}>Education</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {education.map(ed => (
                  <div key={ed.title} style={{ background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, padding: 22, boxShadow: '0 5px 0 var(--shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ background: 'var(--chip-bg)', border: '1.5px solid var(--chip-border)', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--card-ink)' }}>{ed.period}</span>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-2)', display: 'inline-block' }} />
                    </div>
                    <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 21, margin: '12px 0 0', color: 'var(--card-ink)' }}>{ed.title}</h3>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: 'var(--accent)', marginTop: 3 }}>{ed.org}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--card-soft)', margin: '10px 0 0' }}>{ed.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" style={{ scrollMarginTop: 90, background: 'var(--s-research)', padding: isMobile ? '56px 16px' : '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 34 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--s-eyebrow)' }}>Research</span>
              <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 36 : 46, margin: '8px 0 0', color: 'var(--s-head)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Published Papers</h2>
            </div>
            <Link href="/research" style={{ textDecoration: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: '2px solid var(--border)', borderRadius: 999, padding: '11px 22px', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 var(--shadow)' }}>View All</Link>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
            {displayedResearch.map(r => (
              <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, padding: 24, boxShadow: '0 6px 0 var(--shadow)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)' }}>{r.venue}</span>
                <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.25, margin: '12px 0 0', color: 'var(--card-ink)' }}>{r.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--card-soft)', margin: '12px 0 16px' }}>{r.desc}</p>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>Read paper →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ scrollMarginTop: 90, background: 'var(--s-about)', padding: isMobile ? '56px 16px' : '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1.2fr', gap: isMobile ? 28 : 44, alignItems: 'center', position: 'relative' }}>
          <div className="reveal">
            {(about as any).image ? (
              <img src={(about as any).image} alt="Portrait" style={{ width: '100%', maxWidth: isMobile ? 200 : '100%', aspectRatio: '1/1', border: '2px solid var(--border)', borderRadius: 24, objectFit: 'cover', boxShadow: '0 10px 0 var(--accent)', display: 'block', margin: isMobile ? '0 auto' : 0 }} />
            ) : (
              <div style={{ aspectRatio: '1/1', border: '2px solid var(--border)', borderRadius: 24, background: 'var(--portrait)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 0 var(--accent)', maxWidth: isMobile ? 200 : '100%', margin: isMobile ? '0 auto' : 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--card-soft)' }}>[ portrait ]</span>
              </div>
            )}
          </div>
          <div className="reveal">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--s-eyebrow)' }}>About</span>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 36 : 44, margin: '8px 0 0', color: 'var(--s-head)', letterSpacing: -0.5 }}>{about.heading}</h2>
            <p style={{ maxWidth: 560, margin: '18px 0 0', fontSize: isMobile ? 14 : 15, lineHeight: 1.75, color: 'var(--s-body)' }}>{about.bio}</p>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--s-sublabel)', marginBottom: 12 }}>{about.lookingForTitle}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {about.lookingFor.map(lf => (
                  <div key={lf.text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--s-head)', fontSize: 14 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: lf.dot, display: 'inline-block', flexShrink: 0 }} />
                    {lf.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ scrollMarginTop: 90, background: 'var(--hero)', padding: isMobile ? '64px 16px' : '90px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,218,20,0.14)', pointerEvents: 'none' }} />
        <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{contact.kicker}</span>
          <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 42 : 60, lineHeight: 0.96, margin: '12px 0 0', color: '#fff', letterSpacing: -1, textShadow: '0 5px 0 rgba(17,24,39,0.4)' }}>{contact.heading}</h2>
          <p style={{ margin: '20px auto 0', maxWidth: 520, fontSize: isMobile ? 14 : 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)' }}>{contact.blurb}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none', background: '#FFDA14', color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '15px 30px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 6px 0 #111827' }}>Get in touch</a>
            <a href={contact.resumeHref} style={{ textDecoration: 'none', background: '#fff', color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '15px 30px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 6px 0 #111827' }}>Resume</a>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            {contact.links.map(cl => (
              <a key={cl.label} href={cl.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 999, padding: '8px 18px', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{cl.label}</a>
            ))}
            <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 999, padding: '8px 18px', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Email</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--foot)', color: 'var(--foot-ink)', padding: '36px 16px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22 }}>{footer.name}</div>
            <div style={{ fontSize: 12, color: 'var(--foot-soft)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{footer.tagline}</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--foot-soft)' }}>{footer.copyright}</div>
        </div>
      </footer>

      {/* MODAL */}
      {selected && (
        <div onClick={e => { if (e.target === e.currentTarget) setSelected(null); }} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(14,10,28,0.85)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'flex-start', justifyContent: 'center', padding: isMobile ? 0 : '40px 24px', overflowY: 'auto' }}>
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 680, background: 'var(--card)', border: isMobile ? 'none' : '2px solid var(--border)', borderRadius: isMobile ? '20px 20px 0 0' : 22, overflow: 'hidden', boxShadow: '0 -8px 40px rgba(0,0,0,0.4)' }}>
            {/* drag pill on mobile */}
            {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)', margin: '10px auto 0' }} />}
            <div style={{ position: 'relative', height: isMobile ? 220 : 320, borderBottom: '2px solid var(--border)', overflow: 'hidden' }}>
              {(() => {
                const ytId = getYoutubeId((curSlide as any)?.youtube || '');
                const img  = (curSlide as any)?.image || '';
                if (ytId) return (
                  <iframe src={`https://www.youtube.com/embed/${ytId}?rel=0`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', zIndex: 1 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                );
                return (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: img ? `url(${img}) center/cover no-repeat` : `radial-gradient(rgba(255,255,255,0.16) 1.2px, transparent 1.6px) 0 0 / 13px 13px, ${curSlide ? grad(curSlide.grad) : ''}`, transition: 'background .25s ease' }}>
                    {!img && (
                      <div style={{ textAlign: 'center', padding: '0 24px' }}>
                        <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', letterSpacing: 1 }}>{curSlide?.label}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{slide + 1} / {slides.length}</div>
                      </div>
                    )}
                  </div>
                );
              })()}
              <button onClick={() => setSlide(s => (s-1+slides.length)%slides.length)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '2px solid #111827', cursor: 'pointer', fontSize: 20, fontWeight: 800, color: '#111827', boxShadow: '0 4px 0 #111827', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4, padding: 0 }}>‹</button>
              <button onClick={() => setSlide(s => (s+1)%slides.length)}             style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '2px solid #111827', cursor: 'pointer', fontSize: 20, fontWeight: 800, color: '#111827', boxShadow: '0 4px 0 #111827', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4, padding: 0 }}>›</button>
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: '50%', background: '#fff', border: '2px solid #111827', cursor: 'pointer', fontSize: 14, fontWeight: 800, color: '#111827', boxShadow: '0 4px 0 #111827', zIndex: 4, padding: 0 }}>✕</button>
              <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', gap: 8, justifyContent: 'center', zIndex: 4 }}>
                {slides.map((_, i) => <button key={i} onClick={() => setSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: i === slide ? accent : 'rgba(17,24,39,0.18)', border: '2px solid #111827', cursor: 'pointer', padding: 0 }} />)}
              </div>
            </div>
            <div style={{ padding: isMobile ? '20px 20px 32px' : 26, maxHeight: isMobile ? '60vh' : 'none', overflowY: isMobile ? 'auto' : 'visible' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 26 : 30, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--card-ink)' }}>{selected.title}</h3>
                  <span style={{ fontSize: 13, color: 'var(--card-soft)' }}>{selected.genre}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[selected.role, selected.engine, selected.year].map(v => <span key={v} style={{ border: '2px solid var(--border)', color: 'var(--card-ink)', borderRadius: 999, padding: '5px 11px', fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{v}</span>)}
                </div>
              </div>
              <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.75, color: 'var(--soft)' }}>{selected.desc}</p>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--card-soft)', margin: '20px 0 10px' }}>Built with</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selected.tech.map(t => <span key={t} style={{ background: 'var(--chip-bg)', border: '1.5px solid var(--chip-border)', borderRadius: 999, padding: '6px 13px', fontSize: 12, fontWeight: 600, color: 'var(--card-ink)' }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: accent, color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '14px 28px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 #111827' }}>{selected.kind === 'project' ? '↗ View Project' : '▶ Play the game'}</a>
                <a href={selected.repo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '14px 28px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 var(--shadow)' }}>GitHub Repo</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
