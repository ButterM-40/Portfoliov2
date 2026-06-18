'use client';
import { useState, useEffect } from 'react';
import {
  games as dGames, projects as dProjects, skills as dSkills,
  experience as dExp, education as dEdu, research as dRes,
  about as dAbout, contact as dContact, footer as dFooter,
  stats as dStats, heroData as dHero, brand as dBrand,
} from '@/data/portfolio';

const STORAGE_KEY = 'portfolio-admin-v1';

function defaults() {
  return {
    brand:      dBrand,
    hero:       dHero,
    stats:      dStats,
    games:      dGames,
    projects:   dProjects,
    skills:     dSkills,
    experience: dExp,
    education:  dEdu,
    research:   dRes,
    about:      dAbout,
    contact:    dContact,
    footer:     dFooter,
  };
}

export function usePortfolioData() {
  const [data, setData] = useState(defaults);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { setData(JSON.parse(saved)); } catch {} }

    // Live-update when admin saves in another tab
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setData(JSON.parse(e.newValue)); } catch {}
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return data;
}
