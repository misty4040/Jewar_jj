import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import Stage from '../../../components/maison/Stage';
import { EarSilhouette, EAR_LANDING, EAR_VB } from '../../../components/maison/Silhouettes';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import ContinueHint from '../../../components/maison/ContinueHint';
import { Earring } from '../../../components/maison/Jewels';

const SCENE_VH = 320;
const ANCHOR = {
  x: 50 + ((EAR_LANDING.x - EAR_VB.w / 2) / EAR_VB.w) * 100 * 0.58,
  y: 50 + ((EAR_LANDING.y - EAR_VB.h / 2) / EAR_VB.h) * 100 * 0.88,
};

export default function EarringsOnEar() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);
  const [settled, setSettled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true });

  const earOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const earScale = useTransform(p, [0, 1], [1.03, 1]);
  const earRotY = useTransform(p, [0, 1], [-5, 5]);

  // The earring swings in from upper-right on a pendulum arc, then hooks.
  const earrX = useTransform(p, [0.12, 0.55, 0.78, 1], ['28vw', '5vw', '0vw', '0vw']);
  const earrY = useTransform(p, [0.12, 0.55, 0.78, 1], ['-34vh', '-6vh', '0vh', '0vh']);
  const earrZ = useTransform(p, [0.12, 0.55, 0.78, 1], [-700, -80, 0, 0]);
  const earrScale = useTransform(p, [0.12, 0.55, 0.72, 0.88, 1], [0.4, 1.05, 1.1, 0.96, 1]);
  const swingRaw = useTransform(p, [0.12, 0.55, 0.78, 1], [70, -18, 6, 0]);
  const earrRot = useSpring(swingRaw, { stiffness: 90, damping: 12 });
  const earrRotX = useTransform(p, [0.12, 0.55, 0.78], [-28, 8, 0]);
  const earrRotY = useTransform(p, [0.12, 0.55, 0.78], [-80, 30, 0]);
  const earrOpacity = useTransform(p, [0.08, 0.22, 1], [0, 1, 1]);
  const earrBlurRaw = useTransform(p, [0.12, 0.4, 0.7], [4, 0, 0]);
  const earrFilter = useTransform(earrBlurRaw, (b) =>
    `blur(${b}px) drop-shadow(0 18px 22px rgba(0,0,0,0.55)) drop-shadow(0 0 12px rgba(227,207,160,0.35))`
  );

  const glow = useTransform(p, [0.1, 0.7, 1], [0.2, 0.9, 0.65]);

  const textY = useTransform(p, [0, 1], ['6vh', '-8vh']);
  const textOpacity = useTransform(p, [0, 0.18, 0.88, 1], [0, 1, 1, 0.35]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.72 && !settled) {
      setSettled(true);
      setSparkle(true);
      window.setTimeout(() => setSparkle(false), 1100);
    }
    if (v < 0.2 && settled) setSettled(false);
  });

  return (
    <section ref={ref} className="scene" style={{ height: `${SCENE_VH}vh`, background: 'var(--ivory-2)' }}>
      <div style={{
        position: 'sticky',
        top: 0, height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) minmax(500px, 1.25fr)',
        alignItems: 'stretch',
        maxWidth: 1600, margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — text */}
        <motion.div style={{ y: textY, opacity: textOpacity, padding: '0 56px', alignSelf: 'center' }}>
          <div className="label" style={{ color: 'var(--gold-deep)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № III · The Earring
          </div>
          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 84px)',
            lineHeight: 0.96, fontWeight: 300, letterSpacing: '-0.015em', margin: 0,
          }}>
            A single pearl, <span className="serif-italic">teardrop</span>,<br/>
            suspended from a whisper of wire.
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '28px 0' }} />
          <p className="serif-italic" style={{
            fontSize: 18, lineHeight: 1.65,
            color: 'var(--ink-2)', maxWidth: 420, margin: 0,
          }}>
            Akoya pearl from the Ise Bay — two years hung upside-down in
            seawater before being drawn to length and capped in matte 18k.
            The wire is struck, never cast.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
            <Stat n="II" l="Years of nacre" />
            <Stat n="Ise" l="Bay of origin" />
            <Stat n="8mm" l="Bead diameter" />
          </div>
        </motion.div>

        {/* RIGHT — stage */}
        <div style={{ position: 'relative', height: '100vh' }}>
          <Stage anchor={ANCHOR} glow={glow} tone="ivory">
            {/* Ear silhouette */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: '72%',
                aspectRatio: `${EAR_VB.w} / ${EAR_VB.h}`,
                x: '-50%', y: '-50%',
                opacity: earOpacity,
                scale: earScale,
                rotateY: earRotY,
                transformStyle: 'preserve-3d',
              }}
            >
              <EarSilhouette style={{ width: '100%', height: '100%', display: 'block' }} />
            </motion.div>

            {/* Earring */}
            <motion.div
              style={{
                position: 'absolute',
                left: `${ANCHOR.x}%`,
                top: `${ANCHOR.y}%`,
                marginLeft: -90, marginTop: -30,
                width: 180, height: 180,
                x: earrX, y: earrY, z: earrZ,
                scale: earrScale,
                rotate: earrRot,
                rotateX: earrRotX,
                rotateY: earrRotY,
                opacity: earrOpacity,
                transformOrigin: '50% 14%',
                filter: earrFilter,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <motion.div
                animate={settled ? { rotate: [0, 2.5, -2, 1.3, -0.8, 0.4, 0] } : undefined}
                transition={settled ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
                style={{ transformOrigin: '50% 14%', width: '100%', height: '100%' }}
              >
                <Earring size={180} />
              </motion.div>
            </motion.div>

            {/* Sparkle */}
            <div style={{
              position: 'absolute',
              left: `${ANCHOR.x}%`, top: `${ANCHOR.y}%`,
              width: 0, height: 0, pointerEvents: 'none',
            }}>
              <SparkleBurst show={sparkle} count={14} size={220} />
            </div>

            <div className="mono" style={{
              position: 'absolute', right: 22, bottom: 18,
              color: 'rgba(168,136,78,0.75)',
            }}>
              SCENE · 03 · LOBE
            </div>

            <ContinueHint progress={p} />
          </Stage>
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
