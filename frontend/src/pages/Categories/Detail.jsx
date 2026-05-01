import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../../components/maison/Cursor';
import FilmGrain from '../../components/maison/FilmGrain';
import Monogram from '../../components/maison/Monogram';
import MaisonProductCard from '../../components/maison/MaisonProductCard';
import Footer from '../../components/Footer';
import { findCategory, relatedCategories } from '../../data/categories';
import '../../styles/maison.css';

const SORTS = [
  { key: 'curated',    label: 'Curated' },
  { key: 'newest',     label: 'Newest' },
  { key: 'price-asc',  label: 'Price · Low' },
  { key: 'price-desc', label: 'Price · High' },
];

const FILTERS = ['all', 'gold', 'platinum', 'diamond', 'pearl'];

export default function CategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cat = findCategory(slug);

  const [sort, setSort] = useState('curated');
  const [filter, setFilter] = useState('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const products = useMemo(() => {
    if (!cat) return [];
    let list = [...cat.products];
    if (filter !== 'all') {
      list = list.filter((p) => p.material.toLowerCase().includes(filter));
    }
    if (sort === 'newest') list.reverse();
    return list;
  }, [cat, sort, filter]);

  if (!cat) return <Navigate to="/categories" replace />;

  const related = relatedCategories(slug, 4);
  const sceneTag = `SCENE · ${cat.numeral} · ${cat.name.toUpperCase()}`;

  return (
    <div className="maison">
      <Cursor />
      <FilmGrain />

      {/* Top brand bar — on-ink while hero is dark */}
      <div className={`maison-top on-ink ${scrolled ? 'scrolled' : ''}`}>
        <span className="est">Est. 1908 · Hazaribag · Chapter № {cat.numeral}</span>
        <Link to="/" className="crest">
          <Monogram size={28} />
          <span className="wordmark">Jewar</span>
        </Link>
        <button type="button" className="exit" onClick={() => navigate('/categories')}>
          The Directory
        </button>
      </div>

      {/* HERO — full-bleed cinematic with image, gradient, numeral watermark */}
      <section className="relative h-screen min-h-[760px] overflow-hidden" style={{ background: 'var(--ink)' }}>
        {/* photograph */}
        <img
          src={cat.hero.src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{
            objectPosition: cat.hero.position,
            filter: 'saturate(0.7) contrast(1.06) brightness(0.74)',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background =
              'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
          }}
        />

        {/* gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />

        {/* warm spotlight (Stage echo) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(201,169,110,0.16) 0%, transparent 60%)',
          }}
        />

        {/* hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--ivory) 1px, transparent 1px), linear-gradient(to bottom, var(--ivory) 1px, transparent 1px)',
            backgroundSize: '160px 160px',
          }}
        />

        {/* Massive ghost numeral */}
        <div className="absolute right-[-8vw] top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span
            className="font-serif italic font-extralight leading-none block"
            style={{
              fontSize: 'clamp(280px, 38vw, 760px)',
              color: 'rgba(201,169,110,0.07)',
              letterSpacing: '-0.05em',
            }}
          >
            {cat.numeral}
          </span>
        </div>

        {/* Content */}
        <div
          className="relative z-10 h-full max-w-[1800px] mx-auto px-6 md:px-14 pt-44 pb-16 flex flex-col justify-end"
          style={{ color: 'var(--ivory)' }}
        >
          {/* breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mono mb-8"
            style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(247,242,234,0.55)' }}
          >
            <Link to="/categories" className="link-underline">All Chapters</Link>
            <span style={{ display: 'inline-block', width: 14, height: 1, background: 'rgba(247,242,234,0.4)' }} />
            <span style={{ color: 'var(--gold)' }}>{cat.name}</span>
          </motion.div>

          {/* chapter label with hairline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-5 mb-8"
          >
            <span style={{ width: 56, height: 1, background: 'var(--gold)' }} />
            <span className="mono" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.36em' }}>
              Chapter № {cat.numeral} · The Atelier
            </span>
          </motion.div>

          {/* Massive serif headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[0.9] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(72px, 14vw, 280px)' }}
          >
            <span className="italic font-extralight">{cat.name}</span>
          </motion.h1>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic mt-8 max-w-2xl leading-[1.5] font-light"
            style={{ color: 'rgba(247,242,234,0.78)', fontSize: 'clamp(18px, 1.8vw, 28px)' }}
          >
            {cat.tagline}
          </motion.p>

          {/* stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap items-end gap-x-12 md:gap-x-16 gap-y-6 pt-7 border-t"
            style={{ borderColor: 'rgba(247,242,234,0.18)' }}
          >
            {cat.stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className="font-serif font-light leading-none"
                  style={{ fontSize: 'clamp(28px, 2.6vw, 48px)', color: 'var(--gold)' }}
                >
                  {s.n}
                </div>
                <div className="mono mt-3" style={{ fontSize: 10, letterSpacing: '0.32em', opacity: 0.55 }}>
                  {s.l}
                </div>
              </div>
            ))}
            <div className="ml-auto mono opacity-55 hidden md:block" style={{ fontSize: 10, letterSpacing: '0.34em' }}>
              {sceneTag}
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 mono" style={{ color: 'rgba(247,242,234,0.4)', fontSize: 10, letterSpacing: '0.4em' }}>
          Scroll · Browse
        </div>
      </section>

      {/* DESCRIPTION + filters — on warm parchment */}
      <section className="border-t" style={{ background: 'var(--ivory-2)', borderColor: 'var(--rule)' }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-14 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            {/* Description */}
            <div className="lg:col-span-7 max-w-2xl">
              <div className="mono mb-5" style={{ color: 'var(--gold-deep)', fontSize: 11, letterSpacing: '0.36em' }}>
                A Note from the Bench
              </div>
              <p
                className="font-serif font-light leading-[1.3] tracking-[-0.005em]"
                style={{ fontSize: 'clamp(22px, 2.2vw, 38px)', color: 'var(--ink)' }}
              >
                {cat.description}
              </p>
              <div className="hairline-gold mt-12" style={{ maxWidth: 200 }} />
              <p className="font-serif italic mt-8" style={{ color: 'var(--muted)', fontSize: 16 }}>
                — Signed at the Hazaribag bench
              </p>
            </div>

            {/* Filter rail */}
            <aside
              className="lg:col-span-5 lg:pl-12 lg:border-l flex flex-col gap-12"
              style={{ borderColor: 'var(--rule)' }}
            >
              <div>
                <div className="mono mb-5" style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.4em' }}>
                  Filter · Material
                </div>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((f) => {
                    const active = filter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className="mono px-5 py-2.5 transition-all"
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.3em',
                          color: active ? 'var(--ivory)' : 'var(--ink)',
                          background: active ? 'var(--ink)' : 'transparent',
                          border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mono mb-5" style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.4em' }}>
                  Sort
                </div>
                <div className="flex flex-wrap gap-x-7 gap-y-3">
                  {SORTS.map((s) => {
                    const active = sort === s.key;
                    return (
                      <button
                        key={s.key}
                        onClick={() => setSort(s.key)}
                        className="mono pb-1 transition-all"
                        style={{
                          fontSize: 10,
                          letterSpacing: '0.3em',
                          color: active ? 'var(--gold-deep)' : 'var(--muted)',
                          borderBottom: `1px solid ${active ? 'var(--gold)' : 'transparent'}`,
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-20 md:py-32" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-14">
          <div className="flex items-end justify-between mb-14 md:mb-20 pb-7 border-b" style={{ borderColor: 'var(--rule)' }}>
            <div>
              <div className="mono mb-3" style={{ color: 'var(--gold-deep)', fontSize: 11, letterSpacing: '0.4em' }}>
                The Selection
              </div>
              <h2
                className="font-serif font-light leading-[0.95] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(32px, 4vw, 60px)', color: 'var(--ink)' }}
              >
                {cat.name}{' '}
                <span className="italic font-extralight" style={{ color: 'var(--gold-deep)' }}>
                  · {products.length} {products.length === 1 ? 'piece' : 'pieces'}
                </span>
              </h2>
            </div>
            <Link
              to="/categories"
              className="link-underline mono hidden md:inline-block"
              style={{ color: 'var(--ink)', fontSize: 10, letterSpacing: '0.34em' }}
            >
              All Chapters ↗
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-32" style={{ color: 'var(--muted)' }}>
              <p className="font-serif italic" style={{ fontSize: 26 }}>
                No pieces match this filter.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="link-underline mono mt-6 inline-block"
                style={{ color: 'var(--gold-deep)', fontSize: 10, letterSpacing: '0.34em' }}
              >
                Clear filter ↗
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-20 md:gap-y-28 gap-x-8 md:gap-x-14">
              {products.map((p, i) => (
                <MaisonProductCard key={p.id || i} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HAZARIBAG editorial banner */}
      <section
        className="py-28 md:py-44 border-t"
        style={{ background: 'var(--ink)', color: 'var(--ivory)', borderColor: 'var(--rule-dark)' }}
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 text-center">
          {/* hallmark stamp */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            <span className="mono" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.36em' }}>
              JWR · MMXXVI · {cat.name.toUpperCase()}
            </span>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
          </div>

          <h3
            className="font-serif font-light leading-[1.1] tracking-[-0.015em]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 96px)' }}
          >
            Crafted in Hazaribag,{' '}
            <span className="italic font-extralight" style={{ color: 'var(--gold-soft)' }}>
              delivered to the world.
            </span>
          </h3>

          <p
            className="font-serif italic mt-10 max-w-2xl mx-auto leading-[1.6] font-light"
            style={{ color: 'rgba(247,242,234,0.62)', fontSize: 'clamp(16px, 1.3vw, 22px)' }}
          >
            Each piece in this chapter is benched, hallmarked, and dispatched
            in heirloom-grade velvet — by appointment only.
          </p>

          <a
            href={`https://wa.me/1234567890?text=${encodeURIComponent(
              `I'd like to enquire about the ${cat.name} collection`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-14 inline-flex"
            style={{ color: 'var(--ivory)' }}
          >
            <span className="dot" />
            Enquire about {cat.name}
          </a>
        </div>
      </section>

      {/* CROSS-SELL — also worn with */}
      <section className="py-20 md:py-28 border-t" style={{ background: 'var(--ivory-2)', borderColor: 'var(--rule)' }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-14">
          <div className="flex items-end justify-between mb-12 md:mb-14 pb-6 border-b" style={{ borderColor: 'var(--rule)' }}>
            <div>
              <div className="mono mb-3" style={{ color: 'var(--gold-deep)', fontSize: 11, letterSpacing: '0.4em' }}>
                The House Suggests
              </div>
              <h3
                className="font-serif font-light tracking-[-0.01em]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', color: 'var(--ink)' }}
              >
                Also worn with <span className="italic font-extralight" style={{ color: 'var(--gold-deep)' }}>{cat.name}</span>.
              </h3>
            </div>
            <Link
              to="/categories"
              className="link-underline mono hidden md:inline-block"
              style={{ color: 'var(--ink)', fontSize: 10, letterSpacing: '0.34em' }}
            >
              View All ↗
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {related.map((c) => (
              <Link
                key={c.slug}
                to={`/categories/${c.slug}`}
                className="group relative aspect-[4/5] overflow-hidden block bg-[#0a0a0a]"
              >
                <img
                  src={c.hero.src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  style={{
                    objectPosition: c.hero.position,
                    filter: 'saturate(0.72) contrast(1.06) brightness(0.82)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background =
                      'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-3 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/40 transition-colors duration-1000" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end" style={{ color: 'var(--ivory)' }}>
                  <div className="mono mb-2" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.36em' }}>
                    Chapter № {c.numeral}
                  </div>
                  <h4
                    className="font-serif italic font-light tracking-[-0.01em] leading-[1]"
                    style={{ fontSize: 'clamp(22px, 2.2vw, 36px)' }}
                  >
                    {c.name}
                  </h4>
                  <div className="h-[1px] w-10 bg-[var(--gold)] mt-3 group-hover:w-20 transition-all duration-1000" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
