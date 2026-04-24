import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Placeholder from '../../../components/maison/Placeholder';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import { Ring } from '../../../components/maison/Jewels';

/**
 * Scroll choreography:
 *  0.00 – 0.15   hand backdrop fades in and drifts to resting position
 *  0.15 – 0.70   ring enters from upper-left, scales from 0.35 → 1.05,
 *                spins 720° on Y axis, settles above the ring finger
 *  0.70 – 0.82   ring "seats" onto the finger (tiny scale down + tilt)
 *                sparkle burst triggers on crossing 0.78
 *  0.82 – 1.00   ring remains, gentle breathing motion
 *
 * Hand position in the reference photo is tuned via LANDING_{X,Y}
 * (percent of the image frame). Swap the image and adjust these two
 * numbers — no other code changes needed.
 */
const HAND_IMAGE =
  'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1600&auto=format&fit=crop';
const LANDING_X = 52; // percent from left of image frame → ring finger
const LANDING_Y = 44; // percent from top

export default function RingOnHand() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);
  const [seated, setSeated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // keep scene visible near mid-scroll: refine active window
  const activeP = useTransform(scrollYProgress, [0.2, 0.85], [0, 1], { clamp: true });

  // hand drift
  const handX = useTransform(activeP, [0, 0.2], ['6%', '0%']);
  const handOpacity = useTransform(activeP, [0, 0.18], [0, 1]);
  const handScale = useTransform(activeP, [0, 0.2, 1], [1.05, 1, 1.02]);

  // ring choreography (values expressed in the landing frame space)
  const ringX = useTransform(activeP, [0.15, 0.7, 1], ['-42vw', '0vw', '0vw']);
  const ringY = useTransform(activeP, [0.15, 0.7, 1], ['-22vh', '0vh', '0vh']);
  const ringScale = useTransform(activeP, [0.15, 0.6, 0.78, 0.9, 1], [0.32, 1.12, 0.96, 1, 0.98]);
  const ringRot = useTransform(activeP, [0.15, 0.78], [-40, 720]);
  const ringRotY = useTransform(activeP, [0.15, 0.6, 0.82], [60, 220, 0]);
  const ringOpacity = useTransform(activeP, [0.15, 0.32, 1], [0, 1, 1]);

  // text column
  const textY = useTransform(activeP, [0, 1], ['8vh', '-10vh']);
  const textOpacity = useTransform(activeP, [0, 0.18, 0.85, 1], [0, 1, 1, 0.4]);

  useMotionValueEvent(activeP, 'change', (v) => {
    if (v > 0.78 && !sparkle) {
      setSparkle(true);
      setSeated(true);
      window.setTimeout(() => setSparkle(false), 1200);
    }
    if (v < 0.2 && seated) setSeated(false);
  });

  return (
    <section ref={ref} className="scene" style={{ height: '260vh', background: 'var(--ivory)' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 1.1fr)',
        alignItems: 'center',
        padding: '0 48px',
        maxWidth: 1600,
        margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — editorial column */}
        <motion.div style={{ y: textY, opacity: textOpacity, paddingRight: 40, position: 'relative', zIndex: 2 }}>
          <div className="label" style={{ color: 'var(--gold-deep)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № I · The Ring
          </div>

          <h2 className="serif" style={{
            fontSize: 'clamp(44px, 5.4vw, 88px)',
            lineHeight: 0.96,
            fontWeight: 300,
            letterSpacing: '-0.015em',
            margin: 0,
          }}>
            A band of <span className="serif-italic">rose gold</span>,<br />
            held to the fourth finger.
          </h2>

          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '32px 0' }} />

          <p className="serif-italic" style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink-2)',
            maxWidth: 440,
            margin: 0,
          }}>
            Eighteen miniature talons, hand-drawn in rose gold, each filed to the
            thickness of three human hairs before bending to cradle the cushion.
          </p>

          <div style={{ display: 'flex', gap: 40, marginTop: 44, paddingTop: 28, borderTop: '1px solid var(--rule)' }}>
            <Stat n="IV" l="Generation" />
            <Stat n="18k" l="Rose gold" />
            <Stat n="4.2ct" l="Old cushion" />
          </div>
        </motion.div>

        {/* RIGHT — hand frame with the ring landing */}
        <div style={{ position: 'relative', height: '86vh', overflow: 'hidden' }}>
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              x: handX, opacity: handOpacity, scale: handScale,
            }}
          >
            <Placeholder
              src={HAND_IMAGE}
              alt="Model's hand, north-facing light"
              label={'HAND · RING FINGER\nNorth-facing light. Raw silk backdrop.\nf/4 · 85mm · mid-key'}
              number="SCENE · 01"
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          {/* landing reticle — subtle, only visible while ring approaches */}
          <motion.div
            initial={false}
            animate={{ opacity: seated ? 0 : 0.6, scale: seated ? 0.7 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: `${LANDING_X}%`,
              top: `${LANDING_Y}%`,
              transform: 'translate(-50%, -50%)',
              width: 120, height: 120,
              border: '1px solid rgba(201,169,110,0.4)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          >
            <div style={{ position: 'absolute', inset: 18, border: '1px dashed rgba(201,169,110,0.28)', borderRadius: '50%' }} />
          </motion.div>

          {/* ring itself — centered via negative margin so x/y motion
              values own the transform composition without collision */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${LANDING_X}%`,
              top: `${LANDING_Y}%`,
              marginLeft: -110,
              marginTop: -110,
              width: 220,
              height: 220,
              x: ringX,
              y: ringY,
              scale: ringScale,
              rotate: ringRot,
              rotateY: ringRotY,
              opacity: ringOpacity,
              transformOrigin: 'center',
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 20px 28px rgba(0,0,0,0.35))',
            }}
          >
            <Ring size={220} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SparkleBurst show={sparkle} count={16} size={260} />
            </div>
          </motion.div>

          {/* image caption bottom-right */}
          <div className="mono" style={{
            position: 'absolute', right: 18, bottom: 16,
            color: 'rgba(247,242,234,0.7)',
            zIndex: 3,
          }}>
            HAND · REF № 02
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 38, fontWeight: 300, lineHeight: 1, color: 'var(--gold-deep)' }}>{n}</div>
      <div className="label" style={{ color: 'var(--muted)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
