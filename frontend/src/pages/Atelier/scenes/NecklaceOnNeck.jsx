import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Placeholder from '../../../components/maison/Placeholder';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import { Pendant } from '../../../components/maison/Jewels';

/**
 *  0.00 – 0.20  backdrop fades in
 *  0.15 – 0.55  chain SVG path draws left-to-right (via pathLength)
 *  0.20 – 0.72  pendant descends from above frame, following the chain's
 *               centre, with a slight tilt damped out by spring
 *  0.72 – 0.82  pendant "settles" at the collarbone — sparkle burst
 *  0.82 – 1.00  gentle breathing loop on the whole assembly
 */
const NECK_IMAGE =
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1600&auto=format&fit=crop';
const LANDING_X = 50; // collarbone hollow, % of frame
const LANDING_Y = 62;

// Chain path endpoints (percent of frame) — left shoulder → right shoulder,
// curving down through the collarbone hollow.
const CHAIN_D = 'M 18,38 Q 50,82 82,38';

export default function NecklaceOnNeck() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useTransform(scrollYProgress, [0.18, 0.85], [0, 1], { clamp: true });

  const bgOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const bgScale = useTransform(p, [0, 1], [1.06, 1.01]);

  const chainLen = useTransform(p, [0.15, 0.6], [0, 1]);
  const pendantY = useTransform(p, [0.2, 0.72], ['-60vh', '0vh']);
  const pendantScale = useTransform(p, [0.2, 0.7, 0.82], [0.55, 1, 0.94]);
  const pendantRot = useTransform(p, [0.2, 0.72], [-28, 0]);
  const pendantOpacity = useTransform(p, [0.2, 0.3, 1], [0, 1, 1]);
  const breath = useTransform(p, [0.82, 1], [0, 1]);

  const textY = useTransform(p, [0, 1], ['6vh', '-8vh']);
  const textOpacity = useTransform(p, [0, 0.2, 0.85, 1], [0, 1, 1, 0.45]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.78 && !sparkle) {
      setSparkle(true);
      window.setTimeout(() => setSparkle(false), 1200);
    }
  });

  return (
    <section ref={ref} className="scene scene-ink" style={{ height: '260vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(420px, 1.25fr) minmax(320px, 1fr)',
        alignItems: 'center',
        padding: '0 48px',
        maxWidth: 1600,
        margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — neck frame with chain + pendant */}
        <div style={{ position: 'relative', height: '86vh', overflow: 'hidden' }}>
          <motion.div
            style={{ position: 'absolute', inset: 0, opacity: bgOpacity, scale: bgScale }}
          >
            <Placeholder
              src={NECK_IMAGE}
              alt="Model's collarbone"
              label={'DÉCOLLETAGE · COLLARBONE\nCandle key · warm tungsten\nf/2.8 · 85mm · low-key'}
              number="SCENE · 02"
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Chain (drawn by scroll via pathLength) */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            aria-hidden
          >
            <defs>
              <linearGradient id="neck-chain" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(201,169,110,0)" />
                <stop offset="20%" stopColor="#C9A96E" />
                <stop offset="80%" stopColor="#C9A96E" />
                <stop offset="100%" stopColor="rgba(201,169,110,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d={CHAIN_D}
              fill="none"
              stroke="url(#neck-chain)"
              strokeWidth="0.6"
              strokeLinecap="round"
              style={{ pathLength: chainLen }}
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={CHAIN_D}
              fill="none"
              stroke="rgba(201,169,110,0.35)"
              strokeWidth="0.3"
              strokeLinecap="round"
              strokeDasharray="1 2"
              style={{ pathLength: chainLen }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Pendant — descends along the chain's centre */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${LANDING_X}%`,
              top: `${LANDING_Y}%`,
              marginLeft: -90,
              marginTop: -90,
              width: 180,
              height: 180,
              y: pendantY,
              scale: pendantScale,
              rotate: pendantRot,
              opacity: pendantOpacity,
              filter: 'drop-shadow(0 18px 26px rgba(0,0,0,0.55))',
            }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', opacity: breath }}
            >
              <Pendant size={180} />
            </motion.div>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SparkleBurst show={sparkle} count={14} size={220} />
            </div>
          </motion.div>

          {/* frame label */}
          <div className="mono" style={{
            position: 'absolute', right: 18, bottom: 16,
            color: 'rgba(247,242,234,0.7)',
            zIndex: 3,
          }}>
            NECK · REF № 03
          </div>
        </div>

        {/* RIGHT — editorial column */}
        <motion.div style={{ y: textY, opacity: textOpacity, paddingLeft: 40 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № II · The Pendant
          </div>

          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 84px)',
            lineHeight: 0.96,
            fontWeight: 300,
            letterSpacing: '-0.015em',
            margin: 0,
            color: 'var(--ivory)',
          }}>
            An emerald from <span className="serif-italic">Muzo</span>,<br />
            set against the hollow of the throat.
          </h2>

          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '32px 0' }} />

          <p className="serif-italic" style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: 'rgba(247,242,234,0.8)',
            maxWidth: 460,
            margin: 0,
          }}>
            A 4.2-carat cushion from the Muzo valley, Colombia — selected for the
            "jardin" of inclusions that only this seam produces. Strung on a woven
            18k chain, worn close to the breath.
          </p>

          <div style={{ display: 'flex', gap: 40, marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--rule-dark)' }}>
            <StatDark n="4.2" l="Carat cushion" />
            <StatDark n="18k" l="Woven chain" />
            <StatDark n="№ 03" l="Of an edition of 12" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatDark({ n, l }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 38, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>{n}</div>
      <div className="label" style={{ color: 'rgba(247,242,234,0.6)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
