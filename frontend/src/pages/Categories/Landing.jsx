import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../../components/maison/Cursor';
import FilmGrain from '../../components/maison/FilmGrain';
import Monogram from '../../components/maison/Monogram';
import CategoriesGrid from '../../components/CategoriesGrid';
import Footer from '../../components/Footer';
import '../../styles/maison.css';

export default function CategoriesLanding() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <div className="maison">
      <Cursor />
      <FilmGrain />

      {/* Top brand bar — same chrome as Atelier */}
      <div className={`maison-top ${scrolled ? 'scrolled' : ''}`}>
        <span className="est">Est. 1908 · Hazaribag · Volume X</span>
        <Link to="/" className="crest">
          <Monogram size={28} />
          <span className="wordmark">Jewar</span>
        </Link>
        <button type="button" className="exit" onClick={() => navigate('/')}>
          Return to the House
        </button>
      </div>

      {/* HERO — ivory editorial */}
      <section
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ background: 'var(--ivory)' }}
      >
        {/* warm radial wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 25% 30%, rgba(201,169,110,0.22), transparent 65%), radial-gradient(ellipse 55% 50% at 78% 78%, rgba(166,124,78,0.10), transparent 60%)',
          }}
        />

        {/* hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        {/* ghost massive numeral X */}
        <div className="absolute right-[-6vw] top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span
            className="font-serif italic font-extralight leading-none"
            style={{
              fontSize: 'clamp(280px, 38vw, 720px)',
              color: 'rgba(11,11,15,0.045)',
              letterSpacing: '-0.05em',
            }}
          >
            X
          </span>
        </div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-14 pt-44 pb-24">
          {/* est. label with hairline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-5 mb-12"
          >
            <span style={{ width: 56, height: 1, background: 'var(--gold)' }} />
            <span className="mono" style={{ color: 'var(--gold-deep)', fontSize: 11, letterSpacing: '0.32em' }}>
              The Atelier · By Form
            </span>
          </motion.div>

          {/* Massive serif headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[0.92] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(56px, 12vw, 240px)', color: 'var(--ink)' }}
          >
            Ten chapters,
            <br />
            <span className="italic font-extralight" style={{ color: 'var(--gold-deep)' }}>
              one Maison.
            </span>
          </motion.h1>

          {/* Sub paragraph + stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16"
          >
            <p
              className="font-serif italic max-w-xl leading-[1.5] font-light"
              style={{ fontSize: 'clamp(17px, 1.5vw, 24px)', color: 'var(--muted)' }}
            >
              From the seamless kara to the bridal collar — each form has a
              voice, a discipline, and a chapter at the bench. Slip into the
              one that calls to you.
            </p>

            <div className="flex gap-10 md:gap-14" style={{ color: 'var(--ink)' }}>
              <Stat n="X" l="Categories" />
              <Stat n="200+" l="Pieces" />
              <Stat n="Hazaribag" l="At the bench" />
            </div>
          </motion.div>

          {/* gold hairline + scroll cue */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 origin-left"
            style={{ height: 1, maxWidth: 240, background: 'var(--gold)' }}
          />

          <div className="mt-8 flex items-center gap-3 mono" style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.32em' }}>
            <span>Scroll · The Directory</span>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--muted)' }} />
          </div>
        </div>
      </section>

      {/* MOSAIC — on warm parchment */}
      <section className="py-20 md:py-32" style={{ background: 'var(--ivory-2)' }}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-14">
          <div className="flex items-end justify-between mb-12 md:mb-20 pb-8 border-b" style={{ borderColor: 'var(--rule)' }}>
            <div>
              <div className="mono mb-4" style={{ color: 'var(--gold-deep)', fontSize: 11, letterSpacing: '0.4em' }}>
                The Directory
              </div>
              <h2
                className="font-serif font-light leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(36px, 5vw, 80px)', color: 'var(--ink)' }}
              >
                Choose your <span className="italic font-extralight" style={{ color: 'var(--gold-deep)' }}>form</span>.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 mono" style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.34em' }}>
              <span>Volume № I</span>
              <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)' }} />
              <span>X Chapters</span>
            </div>
          </div>

          <CategoriesGrid variant="page" />
        </div>
      </section>

      {/* HALLMARK CLOSING — ink banner */}
      <section
        className="py-28 md:py-44 border-t"
        style={{ background: 'var(--ink)', color: 'var(--ivory)', borderColor: 'var(--rule-dark)' }}
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 text-center">
          {/* hallmark stamp */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span className="mono" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.36em' }}>
              JWR · MMXXVI · HAZARIBAG
            </span>
            <span style={{ width: 40, height: 1, background: 'var(--gold)' }} />
          </div>

          <h3
            className="font-serif font-light leading-[1.08] tracking-[-0.015em]"
            style={{ fontSize: 'clamp(40px, 6vw, 110px)' }}
          >
            Each piece is benched, hallmarked,
            <br />
            and signed by{' '}
            <span className="italic font-extralight" style={{ color: 'var(--gold-soft)' }}>
              a single hand
            </span>
            .
          </h3>

          <p
            className="font-serif italic mt-12 max-w-2xl mx-auto leading-[1.6]"
            style={{ color: 'rgba(247,242,234,0.62)', fontSize: 'clamp(16px, 1.3vw, 22px)' }}
          >
            The Maison's atelier sits in the heart of Hazaribag — where the
            same families have struck gold by torch, file, and thumb since
            1908.
          </p>

          <Link to="/atelier" className="btn mt-16 inline-flex" style={{ color: 'var(--ivory)' }}>
            <span className="dot" />
            Step into the Atelier
          </Link>
        </div>
      </section>

      {/* House footer (kept) */}
      <Footer />
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div
        className="font-serif font-light leading-none"
        style={{ fontSize: 'clamp(28px, 2.6vw, 44px)', color: 'var(--gold-deep)' }}
      >
        {n}
      </div>
      <div className="mono mt-3" style={{ fontSize: 10, letterSpacing: '0.32em', color: 'var(--muted)' }}>
        {l}
      </div>
    </div>
  );
}
