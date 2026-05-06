import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../../components/maison/Cursor';
import FilmGrain from '../../components/maison/FilmGrain';
import Monogram from '../../components/maison/Monogram';
import MaisonProductCard from '../../components/maison/MaisonProductCard';
import CategoryBanner from '../../components/maison/CategoryBanner';
import Footer from '../../components/Footer';
import { findCategory, relatedCategories } from '../../data/categories';
import '../../styles/maison.css';

const SORTS = [
  { key: 'curated',    label: 'Curated' },
  { key: 'newest',     label: 'Newest' },
  { key: 'price-asc',  label: 'Price · Low' },
  { key: 'price-desc', label: 'Price · High' },
];

// Material keywords matched against the (free-form) product.material string.
const MATERIALS = ['Diamond', 'Gold', 'Platinum', 'Pearl'];

export default function CategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cat = findCategory(slug);

  const [sort, setSort] = useState('curated');
  const [selectedMaterials, setSelectedMaterials] = useState(() => new Set());
  const [selectedStyles, setSelectedStyles] = useState(() => new Set());
  const [selectedSubtypes, setSelectedSubtypes] = useState(() => new Set());
  const [scrolled, setScrolled] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Reset filters & sort when navigating between categories. React docs
  // recommend the in-render state-update pattern over setState-in-effect.
  const [prevSlug, setPrevSlug] = useState(slug);
  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setSelectedMaterials(new Set());
    setSelectedStyles(new Set());
    setSelectedSubtypes(new Set());
    setSort('curated');
    setMobileFiltersOpen(false);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Available filter options + counts (computed from this category's pieces).
  const styleOptions = useMemo(() => {
    if (!cat) return [];
    const counts = new Map();
    cat.products.forEach((p) => {
      if (!p.style) return;
      counts.set(p.style, (counts.get(p.style) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [cat]);

  const subtypeOptions = useMemo(() => {
    if (!cat) return [];
    const counts = new Map();
    cat.products.forEach((p) => {
      if (!p.subtype) return;
      counts.set(p.subtype, (counts.get(p.subtype) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [cat]);

  const materialOptions = useMemo(() => {
    if (!cat) return [];
    return MATERIALS.map((m) => ({
      name: m,
      count: cat.products.filter((p) =>
        p.material.toLowerCase().includes(m.toLowerCase())
      ).length,
    })).filter((o) => o.count > 0);
  }, [cat]);

  const products = useMemo(() => {
    if (!cat) return [];
    let list = cat.products.filter((p) => {
      if (selectedMaterials.size > 0) {
        const matchesMaterial = Array.from(selectedMaterials).some((m) =>
          p.material.toLowerCase().includes(m.toLowerCase())
        );
        if (!matchesMaterial) return false;
      }
      if (selectedStyles.size > 0 && !selectedStyles.has(p.style)) return false;
      if (selectedSubtypes.size > 0 && !selectedSubtypes.has(p.subtype)) return false;
      return true;
    });
    if (sort === 'newest') list = [...list].reverse();
    return list;
  }, [cat, sort, selectedMaterials, selectedStyles, selectedSubtypes]);

  const activeCount =
    selectedMaterials.size + selectedStyles.size + selectedSubtypes.size;

  const toggleIn = useCallback((setter) => (value) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const clearAll = () => {
    setSelectedMaterials(new Set());
    setSelectedStyles(new Set());
    setSelectedSubtypes(new Set());
  };

  if (!cat) return <Navigate to="/categories" replace />;

  const related = relatedCategories(slug, 4);
  const sceneTag = `SCENE · ${cat.numeral} · ${cat.name.toUpperCase()}`;

  // Split the product grid so the banner sits as an editorial interlude
  // after the first row (4 products on desktop / 2 on mobile).
  const bannerCutoff = Math.min(4, products.length);
  const firstBatch = products.slice(0, bannerCutoff);
  const restBatch = products.slice(bannerCutoff);
  const hasRestBatch = restBatch.length > 0;

  const filterPanel = (
    <div className="flex flex-col gap-10">
      {/* Filter header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span
              className="mono"
              style={{ color: 'var(--ink)', fontSize: 11, letterSpacing: '0.4em' }}
            >
              Filters
            </span>
            <span
              className="mono"
              style={{
                color: 'var(--gold-deep)',
                fontSize: 10,
                letterSpacing: '0.3em',
                opacity: activeCount ? 1 : 0.4,
              }}
            >
              {String(activeCount).padStart(2, '0')}
            </span>
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="link-underline mono"
              style={{ color: 'var(--gold-deep)', fontSize: 10, letterSpacing: '0.28em' }}
            >
              Clear ↗
            </button>
          )}
        </div>
        <div className="hairline-gold" style={{ maxWidth: '100%' }} />
      </div>

      {/* Sort */}
      <FilterGroup title="Sort">
        <div className="flex flex-col gap-3">
          {SORTS.map((s) => {
            const active = sort === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                className="text-left mono transition-all"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.26em',
                  color: active ? 'var(--gold-deep)' : 'var(--muted)',
                  paddingLeft: active ? 12 : 0,
                  borderLeft: `1px solid ${active ? 'var(--gold)' : 'transparent'}`,
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Material Type">
        <CheckboxList
          options={materialOptions}
          selected={selectedMaterials}
          onToggle={toggleIn(setSelectedMaterials)}
        />
      </FilterGroup>

      {styleOptions.length > 1 && (
        <FilterGroup title="Design Type">
          <CheckboxList
            options={styleOptions}
            selected={selectedStyles}
            onToggle={toggleIn(setSelectedStyles)}
          />
        </FilterGroup>
      )}

      {subtypeOptions.length > 1 && (
        <FilterGroup title={cat.subtypeLabel || 'Type'}>
          <CheckboxList
            options={subtypeOptions}
            selected={selectedSubtypes}
            onToggle={toggleIn(setSelectedSubtypes)}
          />
        </FilterGroup>
      )}
    </div>
  );

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

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(201,169,110,0.16) 0%, transparent 60%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--ivory) 1px, transparent 1px), linear-gradient(to bottom, var(--ivory) 1px, transparent 1px)',
            backgroundSize: '160px 160px',
          }}
        />

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

        <div
          className="relative z-10 h-full max-w-[1800px] mx-auto px-6 md:px-14 pt-44 pb-16 flex flex-col justify-end"
          style={{ color: 'var(--ivory)' }}
        >
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

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light leading-[0.9] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(72px, 14vw, 280px)' }}
          >
            <span className="italic font-extralight">{cat.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic mt-8 max-w-2xl leading-[1.5] font-light"
            style={{ color: 'rgba(247,242,234,0.78)', fontSize: 'clamp(18px, 1.8vw, 28px)' }}
          >
            {cat.tagline}
          </motion.p>

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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 mono" style={{ color: 'rgba(247,242,234,0.4)', fontSize: 10, letterSpacing: '0.4em' }}>
          Scroll · Browse
        </div>
      </section>

      {/* NOTE FROM THE BENCH — slim editorial band */}
      <section className="border-t" style={{ background: 'var(--ivory-2)', borderColor: 'var(--rule)' }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-14 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-3">
              <div className="mono mb-3" style={{ color: 'var(--gold-deep)', fontSize: 11, letterSpacing: '0.36em' }}>
                A Note from the Bench
              </div>
              <div className="hairline-gold" style={{ maxWidth: 100 }} />
            </div>
            <p
              className="lg:col-span-9 font-serif font-light leading-[1.35] tracking-[-0.005em]"
              style={{ fontSize: 'clamp(20px, 1.9vw, 32px)', color: 'var(--ink)' }}
            >
              {cat.description}
              <span className="font-serif italic block mt-5" style={{ color: 'var(--muted)', fontSize: 16 }}>
                — Signed at the Hazaribag bench
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SHOP LAYOUT — left filters + right grid (with embedded banner) */}
      <section
        className="border-t"
        style={{ background: 'var(--ivory)', borderColor: 'var(--rule)' }}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-14 py-14 md:py-20">
          {/* Selection heading */}
          <div className="flex items-end justify-between mb-10 md:mb-14 pb-6 border-b" style={{ borderColor: 'var(--rule)' }}>
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

          {/* Mobile filter trigger */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="lg:hidden w-full mono mb-6 px-5 py-4 flex items-center justify-between"
            style={{
              border: `1px solid var(--rule)`,
              fontSize: 11,
              letterSpacing: '0.32em',
              color: 'var(--ink)',
              background: 'var(--ivory-2)',
            }}
          >
            <span>
              Filters {activeCount > 0 && (
                <span style={{ color: 'var(--gold-deep)' }}>· {activeCount}</span>
              )}
            </span>
            <span style={{ color: 'var(--gold-deep)' }}>{mobileFiltersOpen ? '—' : '+'}</span>
          </button>

          {/* Two-column shop grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* FILTER RAIL */}
            <aside className="lg:col-span-3">
              {/* Mobile collapsible */}
              <div
                className={`lg:hidden ${mobileFiltersOpen ? 'block' : 'hidden'} mb-10 pb-10 border-b`}
                style={{ borderColor: 'var(--rule)' }}
              >
                {filterPanel}
              </div>

              {/* Desktop sticky */}
              <div className="hidden lg:block sticky top-28">{filterPanel}</div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-9">
              {products.length === 0 ? (
                <div className="text-center py-32" style={{ color: 'var(--muted)' }}>
                  <p className="font-serif italic" style={{ fontSize: 26 }}>
                    No pieces match these filters.
                  </p>
                  <button
                    onClick={clearAll}
                    className="link-underline mono mt-6 inline-block"
                    style={{ color: 'var(--gold-deep)', fontSize: 10, letterSpacing: '0.34em' }}
                  >
                    Clear filters ↗
                  </button>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-16 md:gap-y-20 gap-x-6 md:gap-x-10"
                >
                  {firstBatch.map((p, i) => (
                    <MaisonProductCard key={p.id || i} product={p} index={i} categorySlug={slug} />
                  ))}

                  {hasRestBatch && (
                    <CategoryBanner
                      image={cat.banner.image}
                      word={cat.banner.word}
                      name={cat.name}
                    />
                  )}

                  {restBatch.map((p, i) => (
                    <MaisonProductCard
                      key={p.id || `rest-${i}`}
                      product={p}
                      index={firstBatch.length + i}
                      categorySlug={slug}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HAZARIBAG editorial banner */}
      <section
        className="py-28 md:py-44 border-t"
        style={{ background: 'var(--ink)', color: 'var(--ivory)', borderColor: 'var(--rule-dark)' }}
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 text-center">
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

function FilterGroup({ title, children }) {
  return (
    <div>
      <div
        className="mono mb-5"
        style={{ color: 'var(--ink)', fontSize: 10, letterSpacing: '0.4em', opacity: 0.85 }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function CheckboxList({ options, selected, onToggle }) {
  if (!options || options.length === 0) {
    return (
      <div
        className="mono"
        style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.26em' }}
      >
        — none —
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isOn = selected.has(opt.name);
        return (
          <button
            key={opt.name}
            type="button"
            onClick={() => onToggle(opt.name)}
            className="group flex items-center justify-between w-full text-left transition-colors"
            style={{ color: isOn ? 'var(--ink)' : 'var(--muted)' }}
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex items-center justify-center transition-all"
                style={{
                  width: 14,
                  height: 14,
                  border: `1px solid ${isOn ? 'var(--gold)' : 'var(--rule)'}`,
                  background: isOn ? 'var(--gold)' : 'transparent',
                }}
              >
                {isOn && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: 'var(--ink)',
                    }}
                  />
                )}
              </span>
              <span
                className="font-serif"
                style={{
                  fontSize: 15,
                  letterSpacing: '0.005em',
                  color: 'inherit',
                }}
              >
                {opt.name}
              </span>
            </span>
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.26em',
                color: isOn ? 'var(--gold-deep)' : 'var(--muted)',
                opacity: 0.7,
              }}
            >
              {String(opt.count).padStart(2, '0')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
