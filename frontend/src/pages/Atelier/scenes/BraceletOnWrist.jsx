import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import Placeholder from '../../../components/maison/Placeholder';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import { BraceletLink } from '../../../components/maison/Jewels';

/**
 * Scroll choreography: twelve rose-gold links scatter in from the margins,
 * orbit inward, then align themselves along an elliptical path around the
 * wrist — like a chain being clasped in real time.
 *
 *  0.00 – 0.18   wrist fades in
 *  0.15 – 0.55   links travel from seed positions to their ellipse slots
 *  0.55 – 0.72   slots lock; a full clasp-shimmer sweeps left-to-right
 *  0.72 – 0.80   sparkle burst at the clasp position
 *  0.80 – 1.00   chain rotates slowly as one
 */
const WRIST_IMAGE =
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop';
const CENTER_X = 50; // wrist centre, % of frame
const CENTER_Y = 55;
const RADIUS_X = 26; // ellipse radii (vw)
const RADIUS_Y = 11;
const LINK_COUNT = 14;

// deterministic pseudo-random scatter seeds (stable per link)
function seed(i) {
  const angle = ((i * 137.5) % 360) * (Math.PI / 180);
  const dist = 45 + (i * 9) % 25;
  return { sx: Math.cos(angle) * dist, sy: Math.sin(angle) * dist, r: ((i * 53) % 360) - 180 };
}

export default function BraceletOnWrist() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useTransform(scrollYProgress, [0.18, 0.9], [0, 1], { clamp: true });

  const bgOpacity = useTransform(p, [0, 0.18], [0, 1]);
  const bgScale = useTransform(p, [0, 1], [1.05, 1.01]);
  const textY = useTransform(p, [0, 1], ['8vh', '-8vh']);
  const textOpacity = useTransform(p, [0, 0.2, 0.85, 1], [0, 1, 1, 0.4]);

  // whole bracelet gentle rotation once assembled
  const chainRot = useTransform(p, [0.72, 1], [0, 6]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.76 && !sparkle) {
      setSparkle(true);
      window.setTimeout(() => setSparkle(false), 1000);
    }
  });

  const links = useMemo(() => {
    return Array.from({ length: LINK_COUNT }).map((_, i) => {
      const slotAngle = (i / LINK_COUNT) * Math.PI * 2 + Math.PI / 2;
      const tx = Math.cos(slotAngle) * RADIUS_X;
      const ty = Math.sin(slotAngle) * RADIUS_Y;
      const tangent = Math.atan2(
        Math.cos(slotAngle) * RADIUS_Y,
        -Math.sin(slotAngle) * RADIUS_X,
      ) * (180 / Math.PI);
      return { i, tx, ty, tangent, ...seed(i) };
    });
  }, []);

  return (
    <section ref={ref} className="scene scene-ink" style={{ height: '280vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(400px, 1.15fr) minmax(320px, 1fr)',
        alignItems: 'center',
        padding: '0 48px',
        maxWidth: 1600,
        margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — wrist frame */}
        <div style={{ position: 'relative', height: '86vh', overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', inset: 0, opacity: bgOpacity, scale: bgScale }}>
            <Placeholder
              src={WRIST_IMAGE}
              alt="Model's wrist on linen"
              label={'WRIST · LINEN GROUND\nAmber tungsten · warm key\nf/2.8 · 100mm macro'}
              number="SCENE · 04"
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* Bracelet orbit container — rotates as a unit once assembled */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${CENTER_X}%`,
              top: `${CENTER_Y}%`,
              width: 0, height: 0,
              rotate: chainRot,
            }}
          >
            {links.map((lk) => (
              <Link key={lk.i} lk={lk} progress={p} />
            ))}

            {/* clasp shimmer sweep */}
            <motion.div
              style={{
                position: 'absolute',
                left: 0, top: 0,
                width: `${RADIUS_X * 2}vw`,
                height: `${RADIUS_Y * 2}vh`,
                translateX: '-50%',
                translateY: '-50%',
                borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.0)',
                pointerEvents: 'none',
              }}
              animate={{
                borderColor: ['rgba(201,169,110,0)', 'rgba(201,169,110,0.55)', 'rgba(201,169,110,0)'],
              }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />

            {/* sparkle at clasp */}
            <div style={{ position: 'absolute', left: 0, top: `${-RADIUS_Y}vh`, width: 0, height: 0 }}>
              <SparkleBurst show={sparkle} count={12} size={180} />
            </div>
          </motion.div>

          <div className="mono" style={{
            position: 'absolute', right: 18, bottom: 16,
            color: 'rgba(247,242,234,0.7)', zIndex: 3,
          }}>
            WRIST · REF № 05
          </div>
        </div>

        {/* RIGHT — editorial */}
        <motion.div style={{ y: textY, opacity: textOpacity, paddingLeft: 40 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № IV · The Bracelet
          </div>

          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 80px)',
            lineHeight: 0.96,
            fontWeight: 300,
            letterSpacing: '-0.015em',
            margin: 0,
            color: 'var(--ivory)',
          }}>
            Fourteen links, drawn by hand,<br />
            clasped at the <span className="serif-italic">pulse.</span>
          </h2>

          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '32px 0' }} />

          <p className="serif-italic" style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: 'rgba(247,242,234,0.8)',
            maxWidth: 420,
            margin: 0,
          }}>
            Rolled from a single 22k ingot, each link is turned over the anvil,
            filed, and polished by thumb. The clasp is concealed within the
            chain — so the bracelet never truly ends.
          </p>

          <div style={{ display: 'flex', gap: 40, marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--rule-dark)' }}>
            <StatDark n="XIV" l="Oval links" />
            <StatDark n="22k" l="Ingot origin" />
            <StatDark n="7 days" l="At the bench" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Link({ lk, progress }) {
  const x = useTransform(progress, [0.15, 0.55, 1], [`${lk.sx}vw`, `${lk.tx}vw`, `${lk.tx}vw`]);
  const y = useTransform(progress, [0.15, 0.55, 1], [`${lk.sy}vh`, `${lk.ty}vh`, `${lk.ty}vh`]);
  const r = useTransform(progress, [0.15, 0.55, 1], [lk.r, lk.tangent, lk.tangent]);
  const op = useTransform(progress, [0.15, 0.32, 1], [0, 1, 1]);
  const sc = useTransform(progress, [0.15, 0.55, 0.72], [0.55, 1.02, 1]);
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0, top: 0,
        marginLeft: -30,
        marginTop: -30,
        width: 60,
        height: 60,
        x, y,
        rotate: r,
        scale: sc,
        opacity: op,
        filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.45))',
        transformOrigin: 'center',
      }}
    >
      <BraceletLink size={60} />
    </motion.div>
  );
}

function StatDark({ n, l }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 34, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>{n}</div>
      <div className="label" style={{ color: 'rgba(247,242,234,0.6)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
