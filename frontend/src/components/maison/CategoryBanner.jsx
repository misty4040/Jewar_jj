import React from 'react';
import { motion } from 'framer-motion';

// Editorial banner inserted as a wide interlude inside the category-detail
// product grid. Maison-tinted: ivory plate, gold rule, serif italic
// headline, model photograph with chiaroscuro. Parent (Detail.jsx) places
// this on a `gridColumn: '1 / -1'` so it spans the full grid width.
export default function CategoryBanner({ image, word, name }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden w-full"
      style={{
        background: 'var(--ivory-2)',
        gridColumn: '1 / -1',
        aspectRatio: '16 / 7',
        minHeight: 320,
      }}
    >
      {/* Photograph anchored to the right */}
      <img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: '70% 35%',
          filter: 'saturate(0.78) contrast(1.04) brightness(0.94)',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.style.background =
            'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
        }}
      />

      {/* Warm fade from left so the headline reads against ivory */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, var(--ivory-2) 0%, rgba(239,232,220,0.95) 30%, rgba(239,232,220,0.55) 50%, transparent 72%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 22% 50%, rgba(201,169,110,0.18) 0%, transparent 55%)',
        }}
      />

      {/* Hairline gold corner */}
      <div className="absolute top-5 left-5 opacity-90">
        <div className="w-7 h-[1px]" style={{ background: 'var(--gold)' }} />
        <div className="w-[1px] h-7" style={{ background: 'var(--gold)' }} />
      </div>

      {/* Index */}
      <div
        className="absolute top-5 right-5 mono"
        style={{ color: 'var(--gold-deep)', fontSize: 9, letterSpacing: '0.32em', opacity: 0.85 }}
      >
        № {name ? name.toUpperCase() : '—'}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 lg:p-14 max-w-[58%] sm:max-w-[55%]">
        <div
          className="mono mb-5"
          style={{ color: 'var(--gold-deep)', fontSize: 10, letterSpacing: '0.4em' }}
        >
          The Maison Says
        </div>

        <h3
          className="font-serif font-light leading-[1.05] tracking-[-0.015em]"
          style={{ fontSize: 'clamp(26px, 3.6vw, 60px)', color: 'var(--ink)' }}
        >
          Make a style statement,
          <br />
          one{' '}
          <span
            className="italic font-extralight"
            style={{ color: 'var(--gold-deep)', letterSpacing: '0.02em' }}
          >
            {word}
          </span>{' '}
          at a time.
        </h3>

        <div
          className="mt-7 h-[1px] origin-left"
          style={{ width: 80, background: 'var(--gold)' }}
        />

        <p
          className="font-serif italic mt-5 leading-[1.5] font-light"
          style={{ fontSize: 'clamp(13px, 1.05vw, 17px)', color: 'var(--muted)' }}
        >
          Hand-finished at the Hazaribag bench. By appointment, by hand.
        </p>
      </div>

      {/* Bottom hallmark stamp */}
      <div
        className="absolute bottom-5 left-8 md:left-12 mono flex items-center gap-3"
        style={{ color: 'var(--gold-deep)', fontSize: 9, letterSpacing: '0.36em' }}
      >
        <span style={{ width: 22, height: 1, background: 'var(--gold)' }} />
        <span>JWR · MMXXVI</span>
      </div>
    </motion.aside>
  );
}
