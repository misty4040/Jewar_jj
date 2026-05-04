import React from 'react';
import { motion } from 'framer-motion';

// Editorial product card used on category-detail pages. Lives inside a
// .maison wrapper, so it can rely on the maison tokens (--gold, --rule,
// .mono, .link-underline). Plain ivory plate, serif italic name, mono
// detail line, gold hairline, gold WhatsApp enquiry link.
export default function MaisonProductCard({ product, index = 0 }) {
  const num = String(index + 1).padStart(2, '0');
  const enquireHref = `https://wa.me/1234567890?text=${encodeURIComponent(
    `I'd like to enquire about the ${product.name}`
  )}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.95, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      {/* Image plate */}
      <div
        className="relative aspect-[4/5] overflow-hidden mb-7"
        style={{
          background:
            'linear-gradient(135deg, var(--ivory-2) 0%, var(--ivory-3) 100%)',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          style={{ filter: 'saturate(0.8) contrast(1.04) brightness(0.94)' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background =
              'radial-gradient(ellipse at 30% 30%, #C9A96E 0%, #6b4f1f 60%, #1a1109 100%)';
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 60%, rgba(11,11,15,0.18) 100%)',
          }}
        />

        {/* Top-right index */}
        <div
          className="absolute top-4 right-4 mono z-10"
          style={{ color: 'var(--gold)', fontSize: 9, letterSpacing: '0.32em', opacity: 0.85 }}
        >
          № {num}
        </div>

        {/* Top-left hairline corner */}
        <div className="absolute top-4 left-4 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
          <div className="w-6 h-[1px] bg-[var(--gold)]" />
          <div className="w-[1px] h-6 bg-[var(--gold)]" />
        </div>

        {/* Hairline frame settles in on hover */}
        <div className="absolute inset-3 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/40 transition-colors duration-1000 pointer-events-none" />
      </div>

      {/* Caption */}
      <div className="px-1">
        <div
          className="h-[1px] w-12 mb-5 transition-all duration-1000 group-hover:w-24"
          style={{ background: 'var(--gold)' }}
        />
        <h3
          className="font-serif italic font-light tracking-[-0.01em] leading-[1.05] mb-3"
          style={{ fontSize: 'clamp(22px, 1.6vw, 30px)', color: 'var(--ink)' }}
        >
          {product.name}
        </h3>
        <p className="mono mb-6" style={{ fontSize: 10, letterSpacing: '0.24em', color: 'var(--muted)' }}>
          {product.material}
        </p>

        <div
          className="flex items-center justify-between pt-5 border-t"
          style={{ borderColor: 'var(--rule)' }}
        >
          <span
            className="mono"
            style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--ink)', opacity: 0.7 }}
          >
            Price on Request
          </span>
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mono"
            style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)' }}
          >
            Enquire ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}
