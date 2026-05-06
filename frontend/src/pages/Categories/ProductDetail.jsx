import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cursor from '../../components/maison/Cursor';
import FilmGrain from '../../components/maison/FilmGrain';
import Monogram from '../../components/maison/Monogram';
import Footer from '../../components/Footer';
import { findCategory, productGallery } from '../../data/categories';
import '../../styles/maison.css';

const GAP = 10; // px between images in the slider track

export default function ProductDetail() {
  const { slug, productId } = useParams();
  const navigate = useNavigate();

  const cat = findCategory(slug);
  const product = cat?.products.find((p) => p.id === productId) ?? null;

  const [activeIdx, setActiveIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Measure container width synchronously before paint, then track resizes
  useLayoutEffect(() => {
    if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setActiveIdx(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [productId]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  if (!cat || !product) return <Navigate to="/categories" replace />;

  const images = productGallery(product, cat);
  const productNum = String(cat.products.findIndex((p) => p.id === productId) + 1).padStart(2, '0');

  // Each image is 76% of the container width; the remaining ~24% shows the next image peeking
  const imgWidth = containerWidth * 0.76;
  const slideAmt = imgWidth + GAP;

  const enquireHref = `https://wa.me/1234567890?text=${encodeURIComponent(
    `I'd like to enquire about the ${product.name}`
  )}`;

  const provenance = [
    'Benched in Hazaribag, Jharkhand',
    'BIS Hallmarked · Certified 916',
    'Dispatched in heirloom-grade velvet',
  ];

  return (
    <div className="maison">
      <Cursor />
      <FilmGrain />

      {/* ── fixed top bar ── */}
      <div className={`maison-top ${scrolled ? 'scrolled' : ''}`}>
        <span className="est">Est. 1908 · Hazaribag · № {productNum}</span>
        <Link to="/" className="crest">
          <Monogram size={28} />
          <span className="wordmark">Jewar</span>
        </Link>
        <button type="button" className="exit" onClick={() => navigate(`/categories/${slug}`)}>
          Back to {cat.name}
        </button>
      </div>

      {/* ── breadcrumb ── */}
      <div style={{ background: 'var(--ivory)', paddingTop: 80 }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-14">
          <nav
            className="flex items-center gap-3 py-6 border-b mono"
            style={{ borderColor: 'var(--rule)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--muted)' }}
          >
            <Link to="/categories" className="link-underline" style={{ color: 'inherit' }}>All Chapters</Link>
            <span aria-hidden>·</span>
            <Link to={`/categories/${slug}`} className="link-underline" style={{ color: 'inherit' }}>{cat.name}</Link>
            <span aria-hidden>·</span>
            <span style={{ color: 'var(--ink)' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── main product area ── */}
      <section style={{ background: 'var(--ivory)' }}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-14 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-10 lg:gap-14 items-start">

            {/* ─── LEFT: horizontal image slider ─── */}
            <div>
              {/* Slider viewport */}
              <div
                ref={containerRef}
                className="relative overflow-hidden"
                style={{
                  height: 'clamp(300px, 54vh, 480px)',
                  background: 'linear-gradient(135deg, var(--ivory-2) 0%, var(--ivory-3) 100%)',
                }}
              >
                {/* Sliding track */}
                {containerWidth > 0 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full flex"
                    style={{ gap: GAP }}
                    animate={{ x: -(activeIdx * slideAmt) }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="relative h-full flex-shrink-0 overflow-hidden"
                        style={{
                          width: imgWidth,
                          cursor: i !== activeIdx ? 'pointer' : 'default',
                        }}
                        onClick={() => i !== activeIdx && setActiveIdx(i)}
                      >
                        <img
                          src={img}
                          alt={`${product.name} · ${i + 1}`}
                          className="h-full w-full object-cover"
                          style={{
                            filter: `saturate(0.82) contrast(1.04) brightness(${i === activeIdx ? 0.96 : 0.76})`,
                            transition: 'filter 0.55s',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.style.background =
                              'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
                          }}
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Right gradient fade — always, fades peeking image into ivory */}
                <div
                  className="absolute inset-y-0 right-0 pointer-events-none z-10"
                  style={{
                    width: '30%',
                    background: 'linear-gradient(to right, transparent 0%, rgba(247,242,234,0.55) 100%)',
                  }}
                />

                {/* Left gradient fade — shows when past first image */}
                {activeIdx > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-y-0 left-0 pointer-events-none z-10"
                    style={{
                      width: '16%',
                      background: 'linear-gradient(to left, transparent 0%, rgba(247,242,234,0.55) 100%)',
                    }}
                  />
                )}

                {/* Corner mark */}
                <div className="absolute top-4 left-4 opacity-70 pointer-events-none z-20">
                  <div className="w-6 h-[1px] bg-[var(--gold)]" />
                  <div className="w-[1px] h-6 bg-[var(--gold)]" />
                </div>

                {/* Image counter */}
                <div
                  className="absolute top-4 mono z-20"
                  style={{
                    right: '32%',
                    color: 'var(--gold)',
                    fontSize: 9,
                    letterSpacing: '0.36em',
                    opacity: 0.85,
                  }}
                >
                  {String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </div>

                {/* Prev arrow */}
                {activeIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveIdx((p) => p - 1)}
                    className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center mono"
                    style={{
                      left: 14,
                      width: 34,
                      height: 34,
                      border: '1px solid var(--gold)',
                      background: 'rgba(247,242,234,0.9)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--ink)',
                      fontSize: 14,
                    }}
                  >
                    ←
                  </button>
                )}

                {/* Next arrow — sits at the right edge of the active image */}
                {activeIdx < images.length - 1 && containerWidth > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveIdx((p) => p + 1)}
                    className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center mono"
                    style={{
                      left: imgWidth - 48,
                      width: 34,
                      height: 34,
                      border: '1px solid var(--gold)',
                      background: 'rgba(247,242,234,0.9)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--ink)',
                      fontSize: 14,
                    }}
                  >
                    →
                  </button>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className="relative overflow-hidden group/thumb"
                    style={{
                      aspectRatio: '1 / 1',
                      border: `1px solid ${i === activeIdx ? 'var(--gold)' : 'var(--rule)'}`,
                      background: 'var(--ivory-2)',
                      transition: 'border-color 0.4s',
                    }}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-110"
                      style={{
                        filter: `saturate(${i === activeIdx ? 0.82 : 0.6}) brightness(${i === activeIdx ? 0.96 : 0.88})`,
                        transition: 'filter 0.4s, transform 1.6s cubic-bezier(0.22,1,0.36,1)',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background =
                          'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
                      }}
                    />
                    {i === activeIdx && (
                      <div className="absolute inset-0 bg-[var(--gold)]/8 pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: product details ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:sticky lg:top-28"
            >
              {/* Chapter tag */}
              <div className="mono mb-3" style={{ color: 'var(--gold-deep)', fontSize: 10, letterSpacing: '0.42em' }}>
                Chapter № {cat.numeral} · {cat.name.toUpperCase()}
              </div>

              <div className="hairline-gold mb-5" style={{ maxWidth: 60 }} />

              {/* Product name */}
              <h1
                className="font-serif italic font-light leading-[1.0] tracking-[-0.02em] mb-2"
                style={{ fontSize: 'clamp(32px, 3.2vw, 56px)', color: 'var(--ink)' }}
              >
                {product.name}
              </h1>

              {/* Material */}
              <p className="mono mb-5" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--muted)' }}>
                {product.material}
              </p>

              <div className="hairline mb-5" />

              {/* Description */}
              <p
                className="font-serif font-light leading-[1.55]"
                style={{ fontSize: 'clamp(14px, 1.05vw, 18px)', color: 'var(--ink)', opacity: 0.75 }}
              >
                {product.detail ?? cat.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-4">
                <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.46em' }}>
                  PRICE
                </span>
                <span
                  className="font-serif font-light tracking-[-0.01em]"
                  style={{ fontSize: 'clamp(18px, 1.5vw, 24px)', color: 'var(--ink)' }}
                >
                  Price on Request
                </span>
              </div>

              <div className="hairline mt-5 mb-5" />

              {/* Enquire CTA */}
              <a
                href={enquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex"
                style={{ color: 'var(--ink)' }}
              >
                <span className="dot" />
                Enquire on WhatsApp
              </a>

              {/* Provenance */}
              <div className="mt-7 pt-7 border-t" style={{ borderColor: 'var(--rule)' }}>
                <div className="mono mb-4" style={{ color: 'var(--gold-deep)', fontSize: 9, letterSpacing: '0.46em' }}>
                  PROVENANCE
                </div>
                <div className="flex flex-col gap-3">
                  {provenance.map((note, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 mono"
                      style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.22em' }}
                    >
                      <span style={{ width: 16, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/categories/${slug}`)}
                  className="link-underline mono flex items-center gap-3"
                  style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--muted)', background: 'none', border: 'none' }}
                >
                  <span style={{ display: 'inline-block', width: 14, height: 1, background: 'var(--muted)' }} />
                  View all {cat.name}
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
