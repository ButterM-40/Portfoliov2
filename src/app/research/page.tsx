'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { useTheme } from '@/hooks/useTheme';
import { useMobile } from '@/hooks/useMobile';

export default function ResearchPage() {
  const { brand, research, footer } = usePortfolioData();
  const { theme, toggleTheme } = useTheme('coral');
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div data-theme={theme} style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--ink)', background: 'var(--page)', minHeight: '100vh' }}>

      {/* NAV */}
      <div style={{ position: 'sticky', top: 16, zIndex: 50, padding: '0 16px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 12px 10px 22px', boxShadow: '0 4px 0 var(--shadow)' }}>
          <Link href="/" style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22, textDecoration: 'none', color: 'var(--ink)', letterSpacing: -0.5, flexShrink: 0 }}>
            {brand.name}<span style={{ color: 'var(--accent)' }}>{brand.accentWord}</span>
          </Link>
          {isMobile ? (
            <button onClick={() => setMenuOpen(o => !o)} style={{ cursor: 'pointer', background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 12, padding: '8px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, lineHeight: 1 }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Link href="/"         style={{ textDecoration: 'none', color: 'var(--card-soft)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999 }}>Portfolio</Link>
              <Link href="/games"    style={{ textDecoration: 'none', color: 'var(--card-soft)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999 }}>Games</Link>
              <Link href="/projects" style={{ textDecoration: 'none', color: 'var(--card-soft)', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999 }}>Projects</Link>
              <span style={{ color: 'var(--ink)', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,94,94,0.12)', border: '1.5px solid var(--accent)' }}>Research</span>
              <button onClick={() => toggleTheme()} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--card)', color: 'var(--card-ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '7px 13px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: theme === 'coral' ? '#2EE6C5' : '#FF5E5E', border: '1.5px solid var(--border)', display: 'inline-block' }} />
                {theme === 'coral' ? 'Midnight' : 'Coral'}
              </button>
              <Link href="/#contact" style={{ textDecoration: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: '2px solid var(--border)', borderRadius: 999, padding: '9px 18px', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>Hire Me</Link>
            </div>
          )}
        </div>
        {isMobile && menuOpen && (
          <div style={{ maxWidth: 1240, margin: '8px auto 0', background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', border: '2px solid var(--border)', borderRadius: 20, padding: '16px 20px', boxShadow: '0 6px 0 var(--shadow)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['/', 'Portfolio'], ['/games', 'Games'], ['/projects', 'Projects'], ['/research', 'Research']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: href === '/research' ? 'var(--accent)' : 'var(--ink)', fontSize: 15, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '12px 10px', borderRadius: 12, display: 'block', borderBottom: '1px solid var(--border)' }}>{label}</Link>
            ))}
            <div style={{ paddingTop: 10 }}>
              <button onClick={() => { toggleTheme(); setMenuOpen(false); }} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--card)', color: 'var(--ink)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', marginRight: 8 }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: theme === 'coral' ? '#2EE6C5' : '#FF5E5E', border: '1.5px solid var(--border)', display: 'inline-block' }} />
                {theme === 'coral' ? 'Midnight' : 'Coral'}
              </button>
              <Link href="/#contact" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: '2px solid var(--border)', borderRadius: 999, padding: '10px 18px', fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', boxShadow: '0 4px 0 var(--shadow)' }}>Hire Me</Link>
            </div>
          </div>
        )}
      </div>

      {/* HERO */}
      <section style={{ background: 'var(--hero)', padding: isMobile ? '44px 16px 52px' : '64px 24px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -80, width: 340, height: 340, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 8px rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Academic Work</span>
          </div>
          <h1 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: isMobile ? 46 : 66, lineHeight: 0.92, margin: '0 0 18px', color: '#fff', letterSpacing: -1, textShadow: '0 5px 0 rgba(17,24,39,0.35)' }}>Published<br />Research</h1>
          <p style={{ maxWidth: 560, fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.9)', margin: '0 0 30px' }}>
            Peer-reviewed papers spanning game systems, AI-driven design, and real-time simulation. Click any card to read the full paper.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 14, padding: '12px 22px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 38, color: '#fff', lineHeight: 1 }}>{research.length}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Papers</div>
            </div>
            <a
              href="https://scholar.google.com/citations?user=qE8y_DAAAAAJ&hl=en"
              target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', background: '#fff', color: '#111827', border: '2px solid #111827', borderRadius: 999, padding: '14px 26px', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 5px 0 rgba(17,24,39,0.4)' }}
            >
              Google Scholar ↗
            </a>
          </div>
        </div>
      </section>

      {/* PAPERS */}
      <section style={{ padding: '64px 24px 80px', background: 'var(--page)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 40, margin: 0, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 0.5 }}>All Papers</h2>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--card-soft)' }}>{research.length} Publications</span>
          </div>

          {research.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, color: 'var(--card-soft)' }}>
              <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 8, color: 'var(--card-ink)' }}>No papers yet</div>
              <p style={{ fontSize: 13, margin: 0 }}>Add research papers from the Admin panel.</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
            {research.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 18, padding: 26, boxShadow: '0 6px 0 var(--shadow)', transition: 'transform .12s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              >
                {/* Venue badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ background: 'var(--accent)', color: 'var(--on-accent)', fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, border: '1.5px solid var(--border)' }}>
                    {r.venue.split('·')[0].trim()}
                  </span>
                  {r.venue.includes('·') && (
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--card-soft)' }}>
                      {r.venue.split('·').slice(1).join('·').trim()}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.2, margin: '0 0 12px', color: 'var(--card-ink)', letterSpacing: 0.2 }}>{r.title}</h3>

                {/* Abstract */}
                {r.desc && (
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--card-soft)', margin: '0 0 20px', flex: 1 }}>{r.desc}</p>
                )}

                {/* Read link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)', letterSpacing: 0.5 }}>Read paper →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--foot)', color: 'var(--foot-ink)', padding: '32px 24px', borderTop: '2px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 20 }}>{footer.name}</div>
            <div style={{ fontSize: 11, color: 'var(--foot-soft)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 3 }}>{footer.tagline}</div>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/"         style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Portfolio</Link>
            <Link href="/games"    style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Games</Link>
            <Link href="/projects" style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Projects</Link>
            <Link href="/#contact" style={{ textDecoration: 'none', color: 'var(--foot-soft)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
