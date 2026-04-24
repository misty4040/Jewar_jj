import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import Placeholder from '../../../components/maison/Placeholder';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import { Earring } from '../../../components/maison/Jewels';

/**
 *  0.00 – 0.20   backdrop fades in, reveals side profile
 *  0.15 – 0.55   earring swings in from above on a pendulum curve
 *  0.55 – 0.72   earring hooks onto the lobe (spring damped rotation)
 *  0.72 – 0.80   sparkle burst
 *  0.80 – 1.00   damped sway (infinite, low amplitude)
 */
const EAR_IMAGE =
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop';
const LANDING_X = 58; // earlobe position, % of frame
const LANDING_Y = 52;

export default function EarringsOnEar() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);
  const [settled, setSettled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useTransform(scrollYProgress, [0.18, 0.85], [0, 1], { clamp: true });

  const bgOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const bgScale = useTransform(p, [0, 1], [1.06, 1.02]);

  // approach: earring swings in on a pendulum arc from upper-left
  const earX = useTransform(p, [0.15, 0.55, 0.72], ['-24vw', '-4vw', '0vw']);
  const earY = useTransform(p, [0.15, 0.55, 0.72], ['-30vh', '-4vh', '0vh']);
  const earScale = useTransform(p, [0.15, 0.55, 0.72], [0.4, 0.96, 1]);
  const earOpacity = useTransform(p, [0.15, 0.3, 1], [0, 1, 1]);
  // rotation during approach (big swing), then settles small
  const swingRaw = useTransform(p, [0.15, 0.55, 0.72, 1], [-65, 18, -4, 0]);
  const earRotate = useSpring(swingRaw, { stiffness: 120, damping: 14 });

  const textY = useTransform(p, [0, 1], ['8vh', '-8vh']);
  const textOpacity = useTransform(p, [0, 0.2, 0.85, 1], [0, 1, 1, 0.4]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.72 && !settled) {
      setSettled(true);
      setSparkle(true);
      window.setTimeout(() => setSparkle(false), 1100);
    }
    if (v < 0.2 && settled) setSettled(false);
  });

  return (
    <section ref={ref} className="scene" style={{ height: '260vh', background: 'var(--ivory-2)' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) minmax(380px, 1fr)',
        alignItems: 'center',
        padding: '0 48px',
        maxWidth: 1600,
        margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — editorial */}
        <motion.div style={{ y: textY, opacity: textOpacity, paddingRight: 40 }}>
          <div className="label" style={{ color: 'var(--gold-deep)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № III · The Earring
          </div>

          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5.2vw, 84px)',
            lineHeight: 0.96,
            fontWeight: 300,
            letterSpacing: '-0.015em',
            margin: 0,
          }}>
            A single pearl, <span className="serif-italic">teardrop</span>,<br />
            suspended from a whisper of wire.
          </h2>

          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '32px 0' }} />

          <p className="serif-italic" style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink-2)',
            maxWidth: 420,
            margin: 0,
          }}>
            Akoya pearl from the Ise Bay — two years hung upside-down in
            seawater before being drawn to length and capped in matte
            18k. The wire is struck, never cast.
          </p>

          <div style={{ display: 'flex', gap: 40, marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--rule)' }}>
            <Stat n="II" l="Years of nacre" />
            <Stat n="Ise" l="Bay of origin" />
            <Stat n="8mm" l="Bead diameter" />
          </div>
        </motion.div>

        {/* RIGHT — ear frame with earring */}
        <div style={{ position: 'relative', height: '86vh', overflow: 'hidden' }}>
          <motion.div
            style={{ position: 'absolute', inset: 0, opacity: bgOpacity, scale: bgScale }}
          >
            <Placeholder
              src={EAR_IMAGE}
              alt="Side profile of model"
              label={'PROFILE · LOBE\nRaking light from upper left\nf/2.0 · 105mm · skin detail'}
              number="SCENE · 03"
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* earring */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${LANDING_X}%`,
              top: `${LANDING_Y}%`,
              marginLeft: -75,
              marginTop: -75,
              width: 150,
              height: 150,
              x: earX,
              y: earY,
              scale: earScale,
              rotate: earRotate,
              opacity: earOpacity,
              transformOrigin: '50% 14%', // pivot near the hook
              filter: 'drop-shadow(0 18px 22px rgba(0,0,0,0.45))',
            }}
          >
            <motion.div
              animate={settled ? { rotate: [0, 2.5, -2, 1.3, -0.8, 0.4, 0] } : undefined}
              transition={settled ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
              style={{ transformOrigin: '50% 14%', width: '100%', height: '100%' }}
            >
              <Earring size={150} />
            </motion.div>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SparkleBurst show={sparkle} count={12} size={180} />
            </div>
          </motion.div>

          <div className="mono" style={{
            position: 'absolute', right: 18, bottom: 16,
            color: 'rgba(247,242,234,0.7)', zIndex: 3,
          }}>
            EAR · REF № 04
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 34, fontWeight: 300, lineHeight: 1, color: 'var(--gold-deep)' }}>{n}</div>
      <div className="label" style={{ color: 'var(--muted)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
