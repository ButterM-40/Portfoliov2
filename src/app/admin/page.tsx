'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GRADIENTS,
  games as dGames, projects as dProjects, skills as dSkills,
  experience as dExp, education as dEdu, research as dRes,
  about as dAbout, contact as dContact, footer as dFooter,
  stats as dStats, heroData as dHero, brand as dBrand,
  grad,
} from '@/data/portfolio';

// ─── types ────────────────────────────────────────────────────────────────────
interface Slide { label: string; grad: string; image?: string; youtube?: string; }
interface Item  { id: string; n: string; title: string; genre: string; tag?: string; cover: string; role: string; engine: string; year: string; repo: string; link: string; desc: string; tech: string[]; slides: Slide[]; featured?: boolean; }
interface Skill { title: string; color: string; chips: string[]; }
interface Hist  { period: string; title: string; org: string; desc: string; }
interface Paper { venue: string; title: string; desc: string; href: string; }
interface AD {
  brand: { name: string; accentWord: string };
  hero:  { kicker: string; headline: string; subhead: string };
  stats: { value: string; label: string }[];
  games: Item[]; projects: Item[];
  skills: Skill[];
  experience: Hist[]; education: Hist[];
  research: Paper[];
  about: { image?: string; heading: string; bio: string; lookingForTitle: string; lookingFor: { dot: string; text: string }[] };
  contact: { kicker: string; heading: string; blurb: string; email: string; resumeHref: string; links: { label: string; href: string }[] };
  footer: { name: string; tagline: string; copyright: string };
}

// ─── defaults ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'portfolio-admin-v1';
const GRAD_KEYS = Object.keys(GRADIENTS);

function defaults(): AD {
  return JSON.parse(JSON.stringify({
    brand: dBrand, hero: dHero, stats: dStats,
    games: dGames, projects: dProjects, skills: dSkills,
    experience: dExp, education: dEdu, research: dRes,
    about: dAbout, contact: dContact, footer: dFooter,
  }));
}

// ─── shared style tokens ──────────────────────────────────────────────────────
const INP: React.CSSProperties = { fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:'#111827', background:'#fff', border:'2px solid #111827', borderRadius:10, padding:'9px 11px', width:'100%', outline:'none', boxSizing:'border-box' };
const TA:  React.CSSProperties = { ...INP, resize:'vertical', minHeight:74, lineHeight:1.55 };
const LBL: React.CSSProperties = { display:'block', fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase', color:'#9A6A58', marginBottom:5 } as React.CSSProperties;
const FLD: React.CSSProperties = { marginBottom:14 };
const R2:  React.CSSProperties = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 };
const R3:  React.CSSProperties = { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 };
const BTN = (bg: string, color='#111827'): React.CSSProperties => ({ cursor:'pointer', background:bg, color, border:'2px solid #111827', borderRadius:999, padding:'10px 18px', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:800, letterSpacing:.5, textTransform:'uppercase', boxShadow:'0 4px 0 #111827' } as React.CSSProperties);
const IBTN: React.CSSProperties = { cursor:'pointer', width:30, height:30, background:'#fff', border:'2px solid #111827', borderRadius:8, fontWeight:800, fontSize:13 };

// ─── helpers ──────────────────────────────────────────────────────────────────
function GradSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ ...INP, backgroundImage:'linear-gradient(45deg,transparent 50%,#111827 50%),linear-gradient(135deg,#111827 50%,transparent 50%)', backgroundPosition:'calc(100% - 16px) 50%,calc(100% - 11px) 50%', backgroundSize:'5px 5px,5px 5px', backgroundRepeat:'no-repeat', paddingRight:30, cursor:'pointer', appearance:'none' as 'none' }}>
      {GRAD_KEYS.map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase()+k.slice(1)}</option>)}
    </select>
  );
}

// ─── image picker ─────────────────────────────────────────────────────────────
function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  function openPicker() {
    setOpen(o => !o);
    if (files.length === 0) {
      fetch('/api/images').then(r => r.json()).then(d => setFiles(d.files ?? [])).catch(() => {});
    }
  }

  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          style={{ ...INP, fontSize: 11, flex: 1 }}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="/images/filename.jpg or https://..."
        />
        <button type="button" title="Browse public/images" style={{ ...IBTN, width: 'auto', padding: '0 10px', fontSize: 11, flexShrink: 0 }} onClick={openPicker}>
          📁
        </button>
        {value && <button type="button" title="Clear" style={IBTN} onClick={() => onChange('')}>✗</button>}
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 100, background: '#fff', border: '2px solid #111827', borderRadius: 10, boxShadow: '0 6px 0 #111827', maxHeight: 200, overflowY: 'auto' }}>
          {files.length === 0
            ? <div style={{ padding: '10px 14px', fontSize: 11, color: '#9A6A58' }}>No images in public/images/ yet</div>
            : files.map(f => (
              <div key={f.url} onClick={() => { onChange(f.url); setOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px', cursor: 'pointer', borderBottom: '1px solid #EADFD8' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FFF7F0')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <img src={f.url} style={{ width: 40, height: 28, objectFit: 'cover', borderRadius: 5, border: '1.5px solid #111827', flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11 }}>{f.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#9A6A58', fontFamily: "'JetBrains Mono',monospace" }}>{f.url}</span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [data,     setData]     = useState<AD>(defaults);
  const [active,   setActive]   = useState('hero');
  const [openItem, setOpenItem] = useState<number|null>(null);
  const [drafts,   setDrafts]   = useState<Record<string,string>>({});
  const [dirty,    setDirty]    = useState(false);
  const [toast,    setToast]    = useState('');
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) { try { setData(JSON.parse(s)); } catch {} }
  }, []);

  function upd(fn: (d: AD) => void) {
    setData(d => { const n = JSON.parse(JSON.stringify(d)); fn(n); return n; });
    setDirty(true);
  }

  function setObj<K extends keyof AD>(sec: K, key: string, val: string) {
    upd(d => { (d[sec] as Record<string,string>)[key] = val; });
  }

  function setItem(list: 'games'|'projects'|'stats'|'skills'|'experience'|'education'|'research', i: number, key: string, val: unknown) {
    upd(d => { (d[list][i] as Record<string,unknown>)[key] = val; });
  }

  function setCsv(list: 'games'|'projects'|'skills', i: number, key: string, raw: string) {
    const id = `${list}.${i}.${key}`;
    setDrafts(p => ({...p, [id]: raw}));
    upd(d => { (d[list][i] as unknown as Record<string,string[]>)[key] = raw.split(',').map(x=>x.trim()).filter(Boolean); });
  }

  function csvVal(list: 'games'|'projects'|'skills', i: number, key: string, arr: string[]): string {
    const id = `${list}.${i}.${key}`;
    return drafts[id] !== undefined ? drafts[id] : (arr||[]).join(', ');
  }

  function addTo(list: keyof AD, tmpl: unknown) {
    upd(d => { (d[list] as unknown[]).push(tmpl); });
    const len = (data[list] as unknown[]).length;
    setOpenItem(len); // open next index
  }

  function removeFrom(list: keyof AD, i: number) {
    upd(d => { (d[list] as unknown[]).splice(i,1); });
    setOpenItem(null);
  }

  function moveIn(list: keyof AD, i: number, dir: -1|1) {
    upd(d => {
      const a = d[list] as unknown[]; const j = i+dir;
      if (j<0||j>=a.length) return;
      [a[i],a[j]]=[a[j],a[i]];
    });
  }

  function setSlide(list:'games'|'projects', i:number, j:number, key:string, val:string) {
    upd(d => { (d[list][i].slides[j] as unknown as Record<string,string>)[key] = val; });
  }

  function addSlide(list:'games'|'projects', i:number) {
    upd(d => { d[list][i].slides.push({ label:'New screen', grad: d[list][i].cover||'dark', image:'', youtube:'' }); });
  }

  function removeSlide(list:'games'|'projects', i:number, j:number) {
    upd(d => { d[list][i].slides.splice(j,1); });
  }

  function setSub(sec: 'about'|'contact', key: string, i:number, subkey:string, val:string) {
    upd(d => { ((d[sec] as unknown as Record<string,Record<string,string>[]>)[key])[i][subkey] = val; });
  }

  function addSub(sec:'about'|'contact', key:string, tmpl:unknown) {
    upd(d => { ((d[sec] as unknown as Record<string,unknown[]>)[key]).push(tmpl); });
  }

  function removeSub(sec:'about'|'contact', key:string, i:number) {
    upd(d => { ((d[sec] as unknown as Record<string,unknown[]>)[key]).splice(i,1); });
  }

  function stripBase64(d: AD): AD {
    const c = JSON.parse(JSON.stringify(d)) as AD;
    const clean = (items: Item[]) => items.forEach(item =>
      item.slides?.forEach(sl => { if (sl.image?.startsWith('data:')) sl.image = ''; })
    );
    clean(c.games);
    clean(c.projects);
    if (c.about.image?.startsWith('data:')) c.about.image = '';
    return c;
  }

  function save() {
    const json = JSON.stringify(data);
    try {
      localStorage.setItem(STORAGE_KEY, json);
      setDirty(false);
      flash('Saved ✓');
    } catch (e) {
      if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        const stripped = stripBase64(data);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped));
          setDirty(false);
          flash('Saved — embedded images removed. Use image URLs instead.');
        } catch {
          flash('Save failed: data too large. Remove images or text.');
        }
      } else {
        flash('Save failed.');
      }
    }
  }

  function reset() {
    if (!confirm('Reset all content back to original defaults? This clears your saved edits.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setData(defaults());
    setDirty(false);
    setOpenItem(null);
    setDrafts({});
    flash('Reset to defaults');
  }

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 1900);
  }

  const SECTIONS = [
    { key:'hero',       label:'Hero',       count: undefined },
    { key:'stats',      label:'Stats',      count: data.stats.length },
    { key:'games',      label:'Games',      count: data.games.length },
    { key:'projects',   label:'Projects',   count: data.projects.length },
    { key:'skills',     label:'Skills',     count: data.skills.length },
    { key:'experience', label:'Experience', count: data.experience.length },
    { key:'education',  label:'Education',  count: data.education.length },
    { key:'research',   label:'Research',   count: data.research.length },
    { key:'about',      label:'About',      count: undefined },
    { key:'contact',    label:'Contact',    count: undefined },
    { key:'footer',     label:'Footer',     count: undefined },
  ];

  function navBtn(sec: typeof SECTIONS[0]) {
    const on = active === sec.key;
    return (
      <button key={sec.key} onClick={() => { setActive(sec.key); setOpenItem(null); setDrafts({}); }}
        style={{ cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, background: on?'#FF5E5E':'#fff', color: on?'#fff':'#111827', border:'2px solid #111827', borderRadius:12, padding:'11px 14px', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:800, letterSpacing:.5, textTransform:'uppercase', boxShadow: on?'0 4px 0 #111827':'none', width:'100%' }}>
        <span>{sec.label}</span>
        {sec.count !== undefined && <span style={{ fontSize:10, opacity:.7 }}>{sec.count}</span>}
      </button>
    );
  }

  // field helpers bound to current data
  const f = (sec: keyof AD, key: string) => ({
    val: ((data[sec] as Record<string,string>)[key]) ?? '',
    on: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setObj(sec as never, key, e.target.value),
  });
  const fi = (list: 'games'|'projects'|'stats'|'skills'|'experience'|'education'|'research', i: number, key: string) => ({
    val: ((data[list][i] as Record<string,string>)[key]) ?? '',
    on: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setItem(list, i, key, e.target.value),
  });

  // ─── PANELS ────────────────────────────────────────────────────────────────
  const panel = (() => {
    switch (active) {

      // HERO ──────────────────────────────────────────────────────────────────
      case 'hero': return (
        <div>
          <PH title="Hero & brand" sub="The top of the page — your name, headline and intro." />
          <div style={R2}>
            <div style={FLD}><label style={LBL}>Brand name</label><input style={INP} value={f('brand','name').val} onChange={f('brand','name').on}/></div>
            <div style={FLD}><label style={LBL}>Accent suffix</label><input style={INP} value={f('brand','accentWord').val} onChange={f('brand','accentWord').on}/></div>
          </div>
          <div style={FLD}><label style={LBL}>Kicker</label><input style={INP} value={f('hero','kicker').val} onChange={f('hero','kicker').on}/></div>
          <div style={FLD}><label style={LBL}>Headline</label><textarea style={TA} value={f('hero','headline').val} onChange={f('hero','headline').on}/></div>
          <div style={FLD}><label style={LBL}>Subheadline</label><textarea style={TA} value={f('hero','subhead').val} onChange={f('hero','subhead').on}/></div>
        </div>
      );

      // STATS ─────────────────────────────────────────────────────────────────
      case 'stats': return (
        <div>
          <PH title="Stats" sub="The number band under the hero." />
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {data.stats.map((x,i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'140px 1fr auto', gap:12, alignItems:'end', border:'2px solid #EADFD8', borderRadius:14, padding:14 }}>
                <div><label style={LBL}>Value</label><input style={INP} value={fi('stats',i,'value').val} onChange={fi('stats',i,'value').on}/></div>
                <div><label style={LBL}>Label</label><input style={INP} value={fi('stats',i,'label').val} onChange={fi('stats',i,'label').on}/></div>
                <button style={IBTN} onClick={() => removeFrom('stats',i)}>✕</button>
              </div>
            ))}
          </div>
          <button style={{...BTN('#FFDA14'), marginTop:16}} onClick={() => addTo('stats',{value:'0',label:'New stat'})}>+ Add stat</button>
        </div>
      );

      // GAMES / PROJECTS ──────────────────────────────────────────────────────
      case 'games':
      case 'projects': {
        const list = active as 'games'|'projects';
        const isProj = list === 'projects';
        return (
          <div>
            <PH title={isProj ? 'Featured projects' : 'Featured games'} sub={isProj ? 'Apps, APIs and tools. Click a card to expand.' : 'Your shipped games. Click a card to expand.'} />
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16, padding:'10px 14px', background:'#FFFBEA', border:'1.5px solid #F0D000', borderRadius:10, fontSize:12 }}>
              <span style={{ fontSize:14 }}>★</span>
              <span><strong>{data[list].filter(x=>x.featured).length}</strong> of {data[list].length} {isProj?'projects':'games'} featured on landing page (max 6 shown). Click ★ on any card to toggle.</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {data[list].map((it,i) => (
                <div key={it.id} style={{ border:'2px solid #111827', borderRadius:14, overflow:'hidden' }}>
                  {/* header */}
                  <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background: it.featured ? '#FFFBEA' : '#FFF4EE' }}>
                    <span style={{ width:30, height:30, flexShrink:0, borderRadius:7, border:'2px solid #111827', background:grad(it.cover), display:'inline-block' }}/>
                    <button onClick={() => setOpenItem(openItem===i?null:i)} style={{ cursor:'pointer', flex:1, textAlign:'left', background:'none', border:'none', fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:17, color:'#111827', padding:0 }}>{it.title||'(untitled)'}</button>
                    {it.featured && <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, textTransform:'uppercase', background:'#FFDA14', color:'#111827', border:'1.5px solid #111827', borderRadius:999, padding:'3px 8px', flexShrink:0 }}>On Landing</span>}
                    <button title={it.featured ? 'Remove from landing page' : 'Feature on landing page'} style={{ ...IBTN, background: it.featured ? '#FFDA14' : '#fff', fontSize:15 }} onClick={() => setItem(list,i,'featured', !it.featured)}>★</button>
                    <button style={IBTN} onClick={() => moveIn(list,i,-1)}>↑</button>
                    <button style={IBTN} onClick={() => moveIn(list,i,1)}>↓</button>
                    <button style={IBTN} onClick={() => removeFrom(list,i)}>✕</button>
                    <button style={IBTN} onClick={() => setOpenItem(openItem===i?null:i)}>{openItem===i?'–':'+'}</button>
                  </div>
                  {/* body */}
                  {openItem === i && (
                    <div style={{ padding:'16px 14px' }}>
                      <div style={R2}>
                        <div style={FLD}><label style={LBL}>Title</label><input style={INP} value={fi(list,i,'title').val} onChange={fi(list,i,'title').on}/></div>
                        <div style={FLD}><label style={LBL}>Cover label</label><input style={INP} value={fi(list,i,'n').val} onChange={fi(list,i,'n').on}/></div>
                      </div>
                      <div style={R2}>
                        <div style={FLD}><label style={LBL}>Genre / subtitle</label><input style={INP} value={fi(list,i,'genre').val} onChange={fi(list,i,'genre').on}/></div>
                        <div style={FLD}><label style={LBL}>Cover art</label><GradSelect value={it.cover} onChange={v => setItem(list,i,'cover',v)}/></div>
                      </div>
                      {isProj && <div style={FLD}><label style={LBL}>Tag badge</label><input style={INP} value={fi(list,i,'tag').val} onChange={fi(list,i,'tag').on}/></div>}
                      <div style={R3}>
                        <div style={FLD}><label style={LBL}>Role</label><input style={INP} value={fi(list,i,'role').val} onChange={fi(list,i,'role').on}/></div>
                        <div style={FLD}><label style={LBL}>Engine / stack</label><input style={INP} value={fi(list,i,'engine').val} onChange={fi(list,i,'engine').on}/></div>
                        <div style={FLD}><label style={LBL}>Year</label><input style={INP} value={fi(list,i,'year').val} onChange={fi(list,i,'year').on}/></div>
                      </div>
                      <div style={FLD}><label style={LBL}>Game description</label><textarea style={TA} value={fi(list,i,'desc').val} onChange={fi(list,i,'desc').on}/></div>
                      <div style={FLD}><label style={LBL}>What I did</label><textarea style={TA} value={fi(list,i,'roleDesc').val} onChange={fi(list,i,'roleDesc').on}/></div>
                      <div style={FLD}><label style={LBL}>Tech tags (comma separated)</label><input style={INP} value={csvVal(list,i,'tech',it.tech)} onChange={e=>setCsv(list,i,'tech',e.target.value)}/></div>
                      <div style={R2}>
                        <div style={FLD}><label style={LBL}>{isProj?'Live / view URL':'Play URL'}</label><input style={INP} value={fi(list,i,'link').val} onChange={fi(list,i,'link').on}/></div>
                        <div style={FLD}><label style={LBL}>GitHub repo URL</label><input style={INP} value={fi(list,i,'repo').val} onChange={fi(list,i,'repo').on}/></div>
                      </div>
                      {/* slides */}
                      <label style={{...LBL, marginTop:6}}>Screens / slideshow</label>
                      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                        {it.slides.map((sl,j) => (
                          <div key={j} style={{ border:'1.5px solid #EADFD8', borderRadius:10, padding:'10px 12px', display:'flex', flexDirection:'column', gap:8 }}>
                            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                              {sl.image
                                ? <img src={sl.image} style={{ width:44, height:32, flexShrink:0, borderRadius:7, border:'2px solid #111827', objectFit:'cover' }} />
                                : <span style={{ width:44, height:32, flexShrink:0, borderRadius:7, border:'2px solid #111827', background:grad(sl.grad), display:'inline-block' }} />
                              }
                              <input style={{...INP, flex:1}} value={sl.label} onChange={e=>setSlide(list,i,j,'label',e.target.value)} placeholder="Screen name"/>
                              <div style={{ width:120, flexShrink:0 }}><GradSelect value={sl.grad} onChange={v=>setSlide(list,i,j,'grad',v)}/></div>
                              <button style={IBTN} onClick={()=>removeSlide(list,i,j)}>✕</button>
                            </div>
                            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                              <span style={{ fontSize:9, fontWeight:700, letterSpacing:1, textTransform:'uppercase', color:'#9A6A58', flexShrink:0 }}>Image</span>
                              <ImagePicker value={sl.image ?? ''} onChange={v=>setSlide(list,i,j,'image',v)}/>
                            </div>
                            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                              <span style={{ fontSize:9, fontWeight:700, letterSpacing:1, textTransform:'uppercase', color:'#9A6A58', flexShrink:0 }}>YouTube</span>
                              <input style={{...INP, fontSize:11}} value={(sl as unknown as Record<string,string>).youtube ?? ''} onChange={e=>setSlide(list,i,j,'youtube',e.target.value)} placeholder="https://www.youtube.com/watch?v=..."/>
                              {(sl as unknown as Record<string,string>).youtube && (
                                <button style={{...IBTN, fontSize:10}} title="Clear YouTube" onClick={()=>setSlide(list,i,j,'youtube','')}>✗</button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button style={{...BTN('#fff'), marginTop:12, boxShadow:'none'}} onClick={()=>addSlide(list,i)}>+ Add screen</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button style={{...BTN('#FFDA14'), marginTop:18}} onClick={() => {
              const n = data[list].length+1;
              const tmpl: Item = isProj
                ? {id:'p'+Date.now(),n:'Project '+n,title:'New Project',genre:'Web App',tag:'New',cover:'indigo',role:'Full-Stack',engine:'',year:'2025',repo:'',link:'#',desc:'',tech:[],slides:[{label:'Screen 1',grad:'indigo',image:'',youtube:''}]}
                : {id:'g'+Date.now(),n:'Game '+n,title:'New Game',genre:'Genre',cover:'violet',role:'Solo Dev',engine:'',year:'2025',repo:'',link:'#',desc:'',tech:[],slides:[{label:'Screen 1',grad:'violet',image:'',youtube:''}]};
              addTo(list, tmpl);
            }}>{isProj?'+ Add project':'+ Add game'}</button>
          </div>
        );
      }

      // SKILLS ────────────────────────────────────────────────────────────────
      case 'skills': return (
        <div>
          <PH title="Skills & tools" sub="Each card is a category with a colored title and a row of chips." />
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {data.skills.map((x,i) => (
              <div key={i} style={{ border:'2px solid #EADFD8', borderRadius:14, padding:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 70px auto', gap:12, alignItems:'end', marginBottom:12 }}>
                  <div><label style={LBL}>Category</label><input style={INP} value={fi('skills',i,'title').val} onChange={fi('skills',i,'title').on}/></div>
                  <div><label style={LBL}>Color</label><input type="color" value={x.color} onChange={e=>setItem('skills',i,'color',e.target.value)} style={{ ...INP, padding:3, height:38, cursor:'pointer' }}/></div>
                  <button style={IBTN} onClick={()=>removeFrom('skills',i)}>✕</button>
                </div>
                <label style={LBL}>Chips (comma separated)</label>
                <input style={INP} value={csvVal('skills',i,'chips',x.chips)} onChange={e=>setCsv('skills',i,'chips',e.target.value)}/>
              </div>
            ))}
          </div>
          <button style={{...BTN('#FFDA14'), marginTop:16}} onClick={()=>addTo('skills',{title:'New Category',color:'#2EE6C5',chips:[]})}>+ Add category</button>
        </div>
      );

      // EXPERIENCE / EDUCATION ────────────────────────────────────────────────
      case 'experience':
      case 'education': {
        const hist = active as 'experience'|'education';
        return (
          <div>
            <PH title={hist==='experience'?'Experience':'Education'} sub="Timeline entries, newest first." />
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {data[hist].map((x,i) => (
                <div key={i} style={{ border:'2px solid #EADFD8', borderRadius:14, padding:14 }}>
                  <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginBottom:8 }}>
                    <button style={IBTN} onClick={()=>moveIn(hist,i,-1)}>↑</button>
                    <button style={IBTN} onClick={()=>moveIn(hist,i,1)}>↓</button>
                    <button style={IBTN} onClick={()=>removeFrom(hist,i)}>✕</button>
                  </div>
                  <div style={R2}>
                    <div style={FLD}><label style={LBL}>Period</label><input style={INP} value={fi(hist,i,'period').val} onChange={fi(hist,i,'period').on}/></div>
                    <div style={FLD}><label style={LBL}>Organization</label><input style={INP} value={fi(hist,i,'org').val} onChange={fi(hist,i,'org').on}/></div>
                  </div>
                  <div style={FLD}><label style={LBL}>Title</label><input style={INP} value={fi(hist,i,'title').val} onChange={fi(hist,i,'title').on}/></div>
                  <div style={{...FLD, marginBottom:0}}><label style={LBL}>Description</label><textarea style={TA} value={fi(hist,i,'desc').val} onChange={fi(hist,i,'desc').on}/></div>
                </div>
              ))}
            </div>
            <button style={{...BTN('#FFDA14'), marginTop:16}} onClick={()=>addTo(hist,{period:'2025',title:'New entry',org:'',desc:''})}>{hist==='experience'?'+ Add role':'+ Add entry'}</button>
          </div>
        );
      }

      // RESEARCH ──────────────────────────────────────────────────────────────
      case 'research': return (
        <div>
          <PH title="Published papers" sub="Research cards linking out to each paper." />
          <div style={{ display:'flex', gap:10, marginBottom:18 }}>
            <button style={BTN('#FFDA14')} onClick={()=>addTo('research',{venue:'Venue · 2025',title:'New paper',desc:'',href:'#'})}>+ Add paper</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {data.research.map((x,i) => (
              <div key={i} style={{ border:'2px solid #EADFD8', borderRadius:14, padding:14 }}>
                <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginBottom:8 }}>
                  <button style={IBTN} onClick={()=>moveIn('research',i,-1)}>↑</button>
                  <button style={IBTN} onClick={()=>moveIn('research',i,1)}>↓</button>
                  <button style={IBTN} onClick={()=>removeFrom('research',i)}>✕</button>
                </div>
                <div style={R2}>
                  <div style={FLD}><label style={LBL}>Venue / year</label><input style={INP} value={fi('research',i,'venue').val} onChange={fi('research',i,'venue').on}/></div>
                  <div style={FLD}><label style={LBL}>Link URL</label><input style={INP} value={fi('research',i,'href').val} onChange={fi('research',i,'href').on}/></div>
                </div>
                <div style={FLD}><label style={LBL}>Title</label><input style={INP} value={fi('research',i,'title').val} onChange={fi('research',i,'title').on}/></div>
                <div style={{...FLD, marginBottom:0}}><label style={LBL}>Summary</label><textarea style={TA} value={fi('research',i,'desc').val} onChange={fi('research',i,'desc').on}/></div>
              </div>
            ))}
          </div>
        </div>
      );

      // ABOUT ─────────────────────────────────────────────────────────────────
      case 'about': return (
        <div>
          <PH title="About me" sub="Your bio and what you're looking for." />
          <div style={{...FLD, display:'flex', gap:16, alignItems:'flex-start'}}>
            {data.about.image
              ? <img src={data.about.image} style={{ width:96, height:96, borderRadius:'50%', border:'2px solid #111827', objectFit:'cover', flexShrink:0 }} />
              : <div style={{ width:96, height:96, borderRadius:'50%', border:'2px dashed #EADFD8', background:'#FFF8F5', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#9A6A58', textAlign:'center', fontWeight:700 }}>No photo</div>
            }
            <div style={{ flex:1 }}>
              <label style={LBL}>Profile photo</label>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <label style={{ ...BTN('#fff'), display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer', boxShadow:'0 3px 0 #111827', padding:'9px 16px' }}>
                  ↑ Upload image
                  <input type="file" accept="image/*" style={{ display:'none' }} onChange={e => {
                    const file = e.target.files?.[0]; if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => upd(d => { d.about.image = reader.result as string; });
                    reader.readAsDataURL(file);
                  }} />
                </label>
                {data.about.image && <button style={{ ...BTN('#fff'), boxShadow:'0 3px 0 #111827' }} onClick={()=>upd(d=>{ d.about.image=''; })}>Remove</button>}
              </div>
              <div style={{ fontSize:11, color:'#9A8E88', marginTop:6 }}>Appears in the About section on the portfolio home page.</div>
            </div>
          </div>
          <div style={FLD}><label style={LBL}>Heading</label><input style={INP} value={f('about','heading').val} onChange={f('about','heading').on}/></div>
          <div style={FLD}><label style={LBL}>Bio</label><textarea style={{...TA, minHeight:120}} value={f('about','bio').val} onChange={f('about','bio').on}/></div>
          <div style={FLD}><label style={LBL}>&ldquo;Looking for&rdquo; heading</label><input style={INP} value={f('about','lookingForTitle').val} onChange={f('about','lookingForTitle').on}/></div>
          <label style={LBL}>List items</label>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {data.about.lookingFor.map((x,i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'54px 1fr auto', gap:10, alignItems:'center' }}>
                <input type="color" value={x.dot} onChange={e=>setSub('about','lookingFor',i,'dot',e.target.value)} style={{...INP, padding:3, height:38, cursor:'pointer'}}/>
                <input style={INP} value={x.text} onChange={e=>setSub('about','lookingFor',i,'text',e.target.value)}/>
                <button style={IBTN} onClick={()=>removeSub('about','lookingFor',i)}>✕</button>
              </div>
            ))}
          </div>
          <button style={{...BTN('#fff'), marginTop:14, boxShadow:'none'}} onClick={()=>addSub('about','lookingFor',{dot:'#14B8A6',text:'New item'})}>+ Add item</button>
        </div>
      );

      // CONTACT ───────────────────────────────────────────────────────────────
      case 'contact': return (
        <div>
          <PH title="Contact & links" sub="The closing call-to-action and your social links." />
          <div style={FLD}><label style={LBL}>Kicker</label><input style={INP} value={f('contact','kicker').val} onChange={f('contact','kicker').on}/></div>
          <div style={FLD}><label style={LBL}>Heading</label><textarea style={TA} value={f('contact','heading').val} onChange={f('contact','heading').on}/></div>
          <div style={FLD}><label style={LBL}>Blurb</label><textarea style={TA} value={f('contact','blurb').val} onChange={f('contact','blurb').on}/></div>
          <div style={R2}>
            <div style={FLD}><label style={LBL}>Email</label><input style={INP} value={f('contact','email').val} onChange={f('contact','email').on}/></div>
            <div style={FLD}><label style={LBL}>Resume URL</label><input style={INP} value={f('contact','resumeHref').val} onChange={f('contact','resumeHref').on}/></div>
          </div>
          <label style={LBL}>Social links</label>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {data.contact.links.map((x,i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'160px 1fr auto', gap:10, alignItems:'center' }}>
                <input style={INP} value={x.label} onChange={e=>setSub('contact','links',i,'label',e.target.value)} placeholder="Label"/>
                <input style={INP} value={x.href}  onChange={e=>setSub('contact','links',i,'href', e.target.value)} placeholder="https://"/>
                <button style={IBTN} onClick={()=>removeSub('contact','links',i)}>✕</button>
              </div>
            ))}
          </div>
          <button style={{...BTN('#fff'), marginTop:14, boxShadow:'none'}} onClick={()=>addSub('contact','links',{label:'Link',href:'https://'})}>+ Add link</button>
        </div>
      );

      // FOOTER ────────────────────────────────────────────────────────────────
      case 'footer': return (
        <div>
          <PH title="Footer" sub="The bottom strip of the page." />
          <div style={R2}>
            <div style={FLD}><label style={LBL}>Name</label><input style={INP} value={f('footer','name').val} onChange={f('footer','name').on}/></div>
            <div style={FLD}><label style={LBL}>Tagline</label><input style={INP} value={f('footer','tagline').val} onChange={f('footer','tagline').on}/></div>
          </div>
          <div style={FLD}><label style={LBL}>Copyright line</label><input style={INP} value={f('footer','copyright').val} onChange={f('footer','copyright').on}/></div>
        </div>
      );

      default: return null;
    }
  })();

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'JetBrains Mono',monospace", color:'#111827', minHeight:'100vh', background:'#FFF2EC' }}>

      {/* TOP BAR */}
      <div style={{ position:'sticky', top:0, zIndex:40, background:'#fff', borderBottom:'2px solid #111827', padding:'14px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:22, letterSpacing:-.5 }}>Site Editor<span style={{ color:'#FF5E5E' }}>.</span></div>
          <span style={{ fontSize:11, color:'#9A8E88', letterSpacing:.5 }}>Edits save to this browser</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          {dirty && <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:11, fontWeight:700, letterSpacing:.5, color:'#C2410C' }}><span style={{ width:8, height:8, borderRadius:'50%', background:'#FF8A3D', display:'inline-block' }}/>Unsaved changes</span>}
          <Link href="/" target="_blank" rel="noopener" style={{ textDecoration:'none', ...BTN('#fff'), boxShadow:'0 3px 0 #111827' }}>View site ↗</Link>
          <button style={{ ...BTN('#fff'), boxShadow:'0 3px 0 #111827' }} onClick={reset}>Reset</button>
          <button style={{ ...BTN('#FFDA14'), boxShadow:'0 3px 0 #111827' }} onClick={()=>setExportOpen(true)}>Export TS</button>
          <button style={{ ...BTN('#FF5E5E','#fff'), boxShadow:'0 3px 0 #111827' }} onClick={save}>Save changes</button>
        </div>
      </div>

      {/* LAYOUT */}
      <div style={{ maxWidth:1180, margin:'0 auto', display:'grid', gridTemplateColumns:'210px 1fr', gap:26, padding:'26px 22px 80px', alignItems:'start' }}>

        {/* SIDEBAR */}
        <div style={{ position:'sticky', top:84, display:'flex', flexDirection:'column', gap:6 }}>
          {SECTIONS.map(navBtn)}
        </div>

        {/* PANEL */}
        <div style={{ background:'#fff', border:'2px solid #111827', borderRadius:18, padding:26, boxShadow:'0 6px 0 #111827', minHeight:420 }}>
          {panel}
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:60, background:'#111827', color:'#fff', border:'2px solid #111827', borderRadius:999, padding:'12px 24px', fontSize:12, fontWeight:800, letterSpacing:.5, textTransform:'uppercase', boxShadow:'0 6px 20px rgba(0,0,0,0.3)', whiteSpace:'nowrap' }}>
          {toast}
        </div>
      )}

      {/* EXPORT MODAL */}
      {exportOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:70, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }} onClick={()=>setExportOpen(false)}>
          <div style={{ background:'#fff', border:'2px solid #111827', borderRadius:18, padding:28, boxShadow:'0 8px 0 #111827', width:'100%', maxWidth:680, maxHeight:'80vh', display:'flex', flexDirection:'column', gap:16 }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:22 }}>Export to portfolio.ts</div>
              <button style={{ ...IBTN, width:34, height:34 }} onClick={()=>setExportOpen(false)}>✕</button>
            </div>
            <p style={{ fontSize:12, color:'#9A8E88', margin:0 }}>Copy the JSON below. Paste it into <code>src/data/portfolio.ts</code> to permanently save your edits.</p>
            <textarea
              readOnly
              style={{ ...TA, minHeight:320, fontSize:11, background:'#FFF4EE', flex:1 }}
              value={JSON.stringify(data, null, 2)}
            />
            <button style={BTN('#FFDA14')} onClick={() => { navigator.clipboard.writeText(JSON.stringify(data,null,2)); flash('Copied!'); setExportOpen(false); }}>
              Copy to clipboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function PH({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:26, margin:'0 0 4px' }}>{title}</div>
      <p style={{ fontSize:12, color:'#8A8076', margin:0 }}>{sub}</p>
    </div>
  );
}
