/**
 * Hand-drawn SVG jewellery used across the Atelier scenes. Crisp at any
 * scale, controllable via transform, no external image dependency.
 * All pieces are ~200×200 viewBox so they compose consistently.
 */

const GOLD = '#C9A96E';
const GOLD_DEEP = '#A8884E';
const GOLD_LIGHT = '#E3CFA0';

export function Ring({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <linearGradient id="ringBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
        <radialGradient id="diamond" cx="0.35" cy="0.3">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e8ecf2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9ea4b0" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      {/* Band back half */}
      <ellipse cx="100" cy="120" rx="52" ry="48" fill="none" stroke="url(#ringBand)" strokeWidth="10" />
      {/* Band inner hairline */}
      <ellipse cx="100" cy="120" rx="44" ry="40" fill="none" stroke="rgba(11,11,15,0.25)" strokeWidth="0.6" />
      {/* Prongs */}
      <path d="M86 72 L84 56 M100 68 L100 50 M114 72 L116 56" stroke={GOLD_DEEP} strokeWidth="1.2" strokeLinecap="round" />
      {/* Stone */}
      <path d="M100 46 L118 70 L100 88 L82 70 Z" fill="url(#diamond)" stroke={GOLD_DEEP} strokeWidth="1" />
      <path d="M100 46 L100 88 M82 70 L118 70" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
      {/* Band front half (overlay to simulate depth) */}
      <path d="M48 122 C 60 156, 140 156, 152 122" fill="none" stroke="url(#ringBand)" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

export function Pendant({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <radialGradient id="pendantStone" cx="0.35" cy="0.3">
          <stop offset="0%" stopColor="#d8efe3" />
          <stop offset="55%" stopColor="#1a6b51" />
          <stop offset="100%" stopColor="#0F3D2E" />
        </radialGradient>
        <linearGradient id="bale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
      </defs>
      {/* Bale */}
      <rect x="92" y="48" width="16" height="22" rx="8" fill="none" stroke="url(#bale)" strokeWidth="2.5" />
      {/* Setting */}
      <path d="M64 92 C 64 80, 136 80, 136 92 L 128 138 C 122 160, 78 160, 72 138 Z"
            fill="url(#pendantStone)" stroke={GOLD_DEEP} strokeWidth="2" />
      {/* Facet hairlines */}
      <path d="M100 82 L100 156 M72 108 L128 108 M80 128 L120 128"
            stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />
      {/* Top highlight */}
      <ellipse cx="90" cy="98" rx="14" ry="5" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

export function Earring({ size = 200 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <linearGradient id="hook" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
        <radialGradient id="pearl" cx="0.35" cy="0.3">
          <stop offset="0%" stopColor="#fff9ec" />
          <stop offset="60%" stopColor="#f1e5cd" />
          <stop offset="100%" stopColor="#c9b38c" />
        </radialGradient>
      </defs>
      {/* hook */}
      <path d="M100 28 C 118 28, 120 54, 100 54" fill="none" stroke="url(#hook)" strokeWidth="2.5" strokeLinecap="round" />
      {/* wire drop */}
      <path d="M100 54 L100 96" stroke={GOLD_DEEP} strokeWidth="1.6" />
      {/* teardrop pearl */}
      <path d="M100 96 C 72 100, 68 142, 100 160 C 132 142, 128 100, 100 96 Z"
            fill="url(#pearl)" stroke={GOLD_DEEP} strokeWidth="1" />
      <ellipse cx="90" cy="118" rx="10" ry="6" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

export function BraceletLink({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden>
      <defs>
        <linearGradient id="link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD_LIGHT} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="30" rx="22" ry="14" fill="none" stroke="url(#link)" strokeWidth="4" />
      <ellipse cx="30" cy="30" rx="16" ry="9" fill="none" stroke="rgba(11,11,15,0.25)" strokeWidth="0.4" />
    </svg>
  );
}

/** Chain as an SVG path — used with strokeDasharray for a drawn-in reveal. */
export function ChainPath({ pathRef, d, id, strokeWidth = 2 }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(201,169,110,0)" />
          <stop offset="15%" stopColor={GOLD} />
          <stop offset="85%" stopColor={GOLD} />
          <stop offset="100%" stopColor="rgba(201,169,110,0)" />
        </linearGradient>
      </defs>
      <path ref={pathRef} d={d} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export const GOLDS = { GOLD, GOLD_DEEP, GOLD_LIGHT };
