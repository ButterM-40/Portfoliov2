'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { grad, coverBg, coverInk, slide0Bg } from '@/data/portfolio';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { useTheme } from '@/hooks/useTheme';
import { useMobile } from '@/hooks/useMobile';

function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function GamesPage() {
  const { brand, games } = usePortfolioData();
  const { theme, toggleTheme } = useTheme('midnight');
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [heroSlide, setHeroSlide]     = useState(0);
  const [activeTag, setActiveTag]     = useState('All');
  const [roleOpen, setRoleOpen]       = useState(false);
  const [muted, setMuted]             = useState(false);

  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const acRef    = useRef<AudioContext|null>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  function getAC() {
    if (mutedRef.current) return null;
    try { acRef.current = acRef.current || new AudioContext(); return acRef.current; } catch { return null; }
  }
  function beep(freq: number, dur = 0.1) {
    const ac = getAC(); if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'square'; o.frequency.value = freq;
    o.connect(g); g.connect(ac.destination);
    const t = ac.currentTime;
    g.gain.setValueAtTime(0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur);
  }

  const hero   = games[featuredIdx] ?? games[0];
  const slides = hero?.slides ?? [];
  const cur    = slides[heroSlide] ?? slides[0];
  const curYtId = getYoutubeId((cur as any)?.youtube || '');

  const allTags = ['All', ...Array.from(new Set(games.flatMap(g => g.genre.split('/').map(t => t.trim()))))];
  const filtered = activeTag === 'All' ? games : games.filter(g => g.genre.split('/').some(t => t.trim() === activeTag));

  function selectFeatured(i: number) { setFeaturedIdx(i); setHeroSlide(0); setRoleOpen(false); beep(440, 0.08); }
  function prevSlide() { setHeroSlide(s => (s - 1 + slides.length) % slides.length); beep(380, 0.07); }
  function nextSlide() { setHeroSlide(s => (s + 1) % slides.length); beep(420, 0.07); }

  const accent = theme === 'midnight' ? '#FF5E5E' : 'var(--accent)';

  return (
    <div data-theme={theme} style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--ink)', background: 'var(--page)', minHeight: '100vh' }}>

      {/* NAV */}
      <div style={{ position: 'sticky', top: 16, zIndex: 50, padding: '0 16px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 12px 10px 22px', boxShadow: '0 4px 0 var(--shadow)' }}>
          <Link href="/" style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22, textDecoration: 'none', color: 'var(--ink)', letterSpacing: -0.5, flexShrink: 0 }}>
            {brand.name}<span style={{ color: accent }}>{brand.accentWord}</span>
          </Link>
          {isMobile ? (
            <button onClick={() => setMenuOpen(o => !o)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 12, padding: '8px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, lineHeight: 1 }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Link href="/"          style={{ textDecoration: 'none', color: 'var(--card-soft)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999 }}>Portfolio</Link>
              <span style={{ color: 'var(--ink)', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999, background: `rgba(255,94,94,0.12)`, border: `1.5px solid ${accent}` }}>Games</span>
              <Link href="/projects"  style={{ textDecoration: 'none', color: 'var(--card-soft)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999 }}>Projects</Link>
              <Link href="/research"  style={{ textDecoration: 'none', color: 'var(--card-soft)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999 }}>Research</Link>
              <button onClick={() => { toggleTheme(); beep(700, 0.06); }} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '7px 13px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: theme === 'coral' ? '#2EE6C5' : '#FF5E5E', border: '1.5px solid var(--border)', display: 'inline-block' }} />
                {theme === 'coral' ? 'Midnight' : 'Coral'}
              </button>
              <button onClick={() => setMuted(m => !m)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '7px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>{muted ? 'SFX OFF' : 'SFX ON'}</button>
              <Link href="/#contact" style={{ textDecoration: 'none', background: accent, color: '#fff', border: '2px solid var(--border)', borderRadius: 999, padding: '9px 18px', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>Hire Me</Link>
            </div>
          )}
        </div>
        {isMobile && menuOpen && (
          <div style={{ maxWidth: 1240, margin: '8px auto 0', background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', border: '2px solid var(--border)', borderRadius: 20, padding: '16px 20px', boxShadow: '0 6px 0 var(--shadow)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['/', 'Portfolio'], ['/games', 'Games'], ['/projects', 'Projects'], ['/research', 'Research']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: href === '/games' ? 'var(--accent)' : 'var(--ink)', fontSize: 15, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '12px 10px', borderRadius: 12, display: 'block', borderBottom: '1px solid var(--border)' }}>{label}</Link>
            ))}
            <div style={{ display: 'flex', gap: 8, paddingTop: 10, flexWrap: 'wrap' }}>
              <button onClick={() => { toggleTheme(); beep(700, 0.06); setMenuOpen(false); }} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: theme === 'coral' ? '#2EE6C5' : '#FF5E5E', border: '1.5px solid var(--border)', display: 'inline-block' }} />
                {theme === 'coral' ? 'Midnight' : 'Coral'}
              </button>
              <button onClick={() => setMuted(m => !m)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, letterSpacing: 0.5 }}>{muted ? 'SFX OFF' : 'SFX ON'}</button>
              <Link href="/#contact" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', background: accent, color: '#fff', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 18px', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>Hire Me</Link>
            </div>
          </div>
        )}
      </div>

      {/* FEATURED HERO */}
      <section style={{ background: theme === 'midnight' ? '#0B0E1C' : 'var(--stat)', padding: isMobile ? '32px 16px 44px' : '44px 24px 60px', borderBottom: `1px solid ${theme === 'midnight' ? '#171B30' : 'var(--border)'}` }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}99`, display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: theme === 'midnight' ? '#3A4A6A' : 'rgba(17,24,39,0.5)' }}>Now Featuring</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.95fr', gap: isMobile ? 24 : 48, alignItems: 'start' }}>
            {/* Carousel */}
            <div>
              <div style={{ background: theme === 'midnight' ? '#0D1020' : 'rgba(0,0,0,0.07)', borderRadius: 16, padding: 10, border: `2px solid ${theme === 'midnight' ? '#232844' : 'var(--border)'}`, boxShadow: `0 14px 0 var(--shadow)` }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden', border: `2px solid ${theme === 'midnight' ? '#1A1F38' : 'rgba(0,0,0,0.15)'}`, background: curYtId ? '#000' : (cur as any).image ? `url(${(cur as any).image}) center/cover no-repeat` : grad(cur?.grad ?? 'dark') }}>
                {curYtId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${curYtId}?rel=0`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', zIndex: 2 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.07) 0 2px,transparent 2px 5px)', pointerEvents: 'none', zIndex: 2 }} />
                    <div style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 3 }}>
                      <span style={{ background: 'rgba(0,0,0,0.7)', color: '#EEF0FF', fontSize: 11, fontWeight: 700, letterSpacing: 1, padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)' }}>{cur?.label}</span>
                    </div>
                  </>
                )}
                {!curYtId && (
                  <>
                    <button onClick={prevSlide} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 42, height: 42, borderRadius: '50%', background: 'rgba(0,0,0,0.65)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#EEF0FF', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>‹</button>
                    <button onClick={nextSlide} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 42, height: 42, borderRadius: '50%', background: 'rgba(0,0,0,0.65)', border: '1.5px solid rgba(255,255,255,0.15)', color: '#EEF0FF', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>›</button>
                    <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 6, zIndex: 3 }}>
                      {slides.map((_, i) => <button key={i} onClick={() => { setHeroSlide(i); beep(440, 0.06); }} style={{ width: 9, height: 9, borderRadius: '50%', background: i === heroSlide ? accent : 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: 0 }} />)}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnails — hidden for 1 slide, fixed equal size for 2+ */}
              {slides.length > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: slides.length > 3 ? 'auto' : 'visible' }}>
                  {slides.map((sl, i) => {
                    const slYtId = getYoutubeId((sl as any).youtube || '');
                    const slImg  = (sl as any).image || '';
                    const slBg   = slYtId ? `url(https://img.youtube.com/vi/${slYtId}/mqdefault.jpg) center/cover no-repeat` : slImg ? `url(${slImg}) center/cover no-repeat` : grad(sl.grad);
                    return (
                      <button key={i} onClick={() => { setHeroSlide(i); beep(400, 0.06); }} style={{ flexShrink: 0, width: 'calc(33.33% - 6px)', aspectRatio: '16/9', borderRadius: 6, overflow: 'hidden', border: i === heroSlide ? `2px solid ${accent}` : `2px solid ${theme === 'midnight' ? '#1A1F38' : 'rgba(0,0,0,0.15)'}`, background: slBg, cursor: 'pointer', padding: 0, position: 'relative' }}>
                        {i !== heroSlide && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.48)' }} />}
                        {slYtId && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none' }}><span style={{ fontSize: 14, color: '#fff', opacity: i === heroSlide ? 1 : 0.7 }}>▶</span></div>}
                      </button>
                    );
                  })}
                </div>
              )}
              </div>
            </div>
            {/* Info */}
            <div style={{ paddingTop: 8 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {[{label: hero?.engine, color: theme === 'midnight' ? '#5060A0' : '#6B5B55'}, {label: hero?.year, color: theme === 'midnight' ? '#5060A0' : '#6B5B55'}, {label: hero?.role, color: '#FFDA14', bg: 'rgba(255,218,20,0.1)', border: 'rgba(255,218,20,0.3)'}].map(b => (
                  <span key={b.label} style={{ background: (b as {bg?:string}).bg ?? 'var(--chip-bg)', border: `1.5px solid ${(b as {border?:string}).border ?? 'var(--border)'}`, borderRadius: 999, padding: '5px 13px', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: b.color }}>{b.label}</span>
                ))}
              </div>
              <h1 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 56, lineHeight: 0.9, margin: 0, color: theme === 'midnight' ? '#EEF0FF' : 'var(--ink)', letterSpacing: -0.5 }}>{hero?.title}</h1>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: accent, marginTop: 14 }}>{hero?.genre}</div>
              <p style={{ fontSize: 14, lineHeight: 1.82, color: theme === 'midnight' ? '#6878A0' : 'var(--soft)', margin: '16px 0 0', maxWidth: 460 }}>{hero?.desc}</p>
              {(hero as any)?.roleDesc && (
                <div style={{ marginTop: 16, border: `1.5px solid ${theme === 'midnight' ? '#1E2240' : 'var(--border)'}`, borderRadius: 10, overflow: 'hidden' }}>
                  <button onClick={() => setRoleOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', background: theme === 'midnight' ? '#0F1222' : 'var(--chip-bg)', border: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: theme === 'midnight' ? '#EEF0FF' : 'var(--ink)' }}>
                    <span>What I did</span>
                    <span style={{ color: accent, fontSize: 12 }}>{roleOpen ? '▲' : '▼'}</span>
                  </button>
                  {roleOpen && <div style={{ padding: '14px 16px', background: theme === 'midnight' ? '#0A0C1A' : '#fff', borderTop: `1px solid ${theme === 'midnight' ? '#1E2240' : 'var(--border)'}` }}><p style={{ fontSize: 13, lineHeight: 1.8, color: theme === 'midnight' ? '#6878A0' : 'var(--soft)', margin: 0 }}>{(hero as any).roleDesc}</p></div>}
                </div>
              )}
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: theme === 'midnight' ? '#2A3450' : 'var(--card-soft)', marginBottom: 10 }}>Built With</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {hero?.tech.map(t => <span key={t} style={{ background: 'var(--chip-bg)', border: `1.5px solid var(--chip-border)`, borderRadius: 999, padding: '6px 13px', fontSize: 12, fontWeight: 600, color: 'var(--card-ink)' }}>{t}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <a href={hero?.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: accent, color: '#fff', border: '2px solid var(--border)', borderRadius: 999, padding: '14px 30px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 var(--shadow)' }}>▶ Play Now</a>
                <a href={hero?.repo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '14px 30px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 var(--shadow)' }}>GitHub Repo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL GAMES */}
      <section style={{ padding: '64px 24px 80px', background: 'var(--page)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 40, margin: 0, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 0.5 }}>All Games</h2>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--card-soft)' }}>{filtered.length} Titles</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
            {allTags.map(t => (
              <button key={t} onClick={() => { setActiveTag(t); beep(500, 0.06); }} style={{ cursor: 'pointer', background: t === activeTag ? accent : 'var(--card)', color: t === activeTag ? '#fff' : 'var(--card-soft)', border: `1.5px solid ${t === activeTag ? 'var(--border)' : 'var(--border)'}`, borderRadius: 999, padding: '9px 18px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 16 }}>
            {filtered.map(g => {
              const isFeatured = g === hero;
              const idx = games.indexOf(g);
              return (
                <div key={g.id} onClick={() => selectFeatured(idx)} style={{ cursor: 'pointer', background: 'var(--card)', border: isFeatured ? `2px solid ${accent}` : '2px solid var(--border)', borderRadius: 14, overflow: 'hidden', boxShadow: isFeatured ? `0 6px 0 ${accent}44` : '0 6px 0 var(--shadow)' }}>
                  <div style={{ position: 'relative', height: 158, background: slide0Bg(g.slides, g.cover), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.07) 0 2px,transparent 2px 5px)', pointerEvents: 'none' }} />
                    {isFeatured && <div style={{ position: 'absolute', top: 10, left: 10, background: '#FFDA14', color: '#111827', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, border: '1.5px solid #111827', zIndex: 2 }}>▶ NOW PLAYING</div>}
                    {!g.slides?.length && <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: 2, color: coverInk(g.cover), textTransform: 'uppercase', zIndex: 1, position: 'relative' }}>{g.n}</span>}
                  </div>
                  <div style={{ padding: '14px 16px 16px' }}>
                    <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 18, margin: '0 0 3px', color: 'var(--card-ink)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{g.title}</h3>
                    <div style={{ fontSize: 11, color: 'var(--card-soft)', marginBottom: 12, letterSpacing: 0.5 }}>{g.genre}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--card-soft)' }}>{g.engine} · {g.year}</span>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${accent}1A`, border: `1.5px solid ${accent}50`, color: accent, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--foot)', padding: '32px 24px', borderTop: '2px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--foot-ink)' }}>{brand.name}</div>
            <div style={{ fontSize: 11, color: 'var(--foot-soft)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 3 }}>Solo Game Developer</div>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/"         style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Portfolio</Link>
            <Link href="/projects" style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Projects</Link>
            <Link href="/research" style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Research</Link>
            <Link href="/#contact" style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
