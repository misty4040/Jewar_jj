import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import Stage from '../../../components/maison/Stage';
import { WristSilhouette, WRIST_LANDING, WRIST_VB } from '../../../components/maison/Silhouettes';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import ContinueHint from '../../../components/maison/ContinueHint';
import { BraceletLink } from '../../../components/maison/Jewels';

const SCENE_VH = 340;
const ANCHOR = {
  x: 50 + ((WRIST_LANDING.x - WRIST_VB.w / 2) / WRIST_VB.w) * 100 * 0.58,
  y: 50 + ((WRIST_LANDING.y - WRIST_VB.h / 2) / WRIST_VB.h) * 100 * 0.88,
};
const RADIUS_X = 22; // vw
const RADIUS_Y = 8;  // vh
const LINK_COUNT = 14;

function seed(i) {
  const angle = ((i * 137.5) % 360) * (Math.PI / 180);
  const dist = 40 + (i * 9) % 25;
  return { sx: Math.cos(angle) * dist, sy: Math.sin(angle) * dist, r: ((i * 53) % 360) - 180 };
}

export default function BraceletOnWrist() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true });

  const wristOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const wristScale = useTransform(p, [0, 1], [1.03, 1]);
  const wristRotX = useTransform(p, [0, 1], [2, -6]);
  const wristRotY = useTransform(p, [0, 1], [3, -3]);

  const chainRot = useTransform(p, [0.7, 1], [-8, 14]);
  const glow = useTransform(p, [0.1, 0.7, 1], [0.2, 0.9, 0.65]);

  const textY = useTransform(p, [0, 1], ['6vh', '-8vh']);
  const textOpacity = useTransform(p, [0, 0.18, 0.88, 1], [0, 1, 1, 0.35]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.74 && !sparkle) {
      setSparkle(true);
      window.setTimeout(() => setSparkle(false), 1000);
    }
  });

  const links = useMemo(() => {
    return Array.from({ length: LINK_COUNT }).map((_, i) => {
      const slot = (i / LINK_COUNT) * Math.PI * 2 + Math.PI / 2;
      const tx = Math.cos(slot) * RADIUS_X;
      const ty = Math.sin(slot) * RADIUS_Y;
      const tangent = Math.atan2(
        Math.cos(slot) * RADIUS_Y,
        -Math.sin(slot) * RADIUS_X,
      ) * (180 / Math.PI);
      return { i, tx, ty, tangent, ...seed(i) };
    });
  }, []);

  return (
    <section ref={ref} className="scene scene-ink" style={{ height: `${SCENE_VH}vh` }}>
      <div style={{
        position: 'sticky',
        top: 0, height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(500px, 1.25fr) minmax(320px, 1fr)',
        alignItems: 'stretch',
        maxWidth: 1600, margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — stage */}
        <div style={{ position: 'relative', height: '100vh' }}>
          <Stage anchor={ANCHOR} glow={glow} size="lg">

            {/* Wrist silhouette */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: '78%',
                aspectRatio: `${WRIST_VB.w} / ${WRIST_VB.h}`,
                x: '-50%', y: '-50%',
                opacity: wristOpacity,
                scale: wristScale,
                rotateX: wristRotX,
                rotateY: wristRotY,
                transformStyle: 'preserve-3d',
              }}
            >
              <WristSilhouette style={{ width: '100%', height: '100%', display: 'block' }} />
            </motion.div>

            {/* Orbit container — rotates as an assembled unit */}
            <motion.div
              style={{
                position: 'absolute',
                left: `${ANCHOR.x}%`,
                top: `${ANCHOR.y}%`,
                width: 0, height: 0,
                rotate: chainRot,
                transformStyle: 'preserve-3d',
              }}
            >
              {links.map((lk) => (
                <Link key={lk.i} lk={lk} progress={p} />
              ))}

              {/* Clasp shimmer */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0, top: 0,
                  width: `${RADIUS_X * 2}vw`,
                  height: `${RADIUS_Y * 2}vh`,
                  marginLeft: `${-RADIUS_X}vw`,
                  marginTop: `${-RADIUS_Y}vh`,
                  borderRadius: '50%',
                  border: '1px solid rgba(227,207,160,0)',
                  pointerEvents: 'none',
                }}
                animate={{
                  borderColor: ['rgba(227,207,160,0)', 'rgba(227,207,160,0.6)', 'rgba(227,207,160,0)'],
                }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />

              <div style={{ position: 'absolute', left: 0, top: `${-RADIUS_Y}vh`, width: 0, height: 0 }}>
                <SparkleBurst show={sparkle} count={16} size={220} />
              </div>
            </motion.div>

            <div className="mono" style={{
              position: 'absolute', right: 22, bottom: 18,
              color: 'rgba(227,207,160,0.7)',
            }}>
              SCENE · 04 · WRIST
            </div>

            <ContinueHint progress={p} />
          </Stage>
        </div>

        {/* RIGHT — text */}
        <motion.div style={{ y: textY, opacity: textOpacity, padding: '0 56px', alignSelf: 'center' }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № IV · The Bracelet
          </div>
          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 80px)',
            lineHeight: 0.96, fontWeight: 300, letterSpacing: '-0.015em', margin: 0,
            color: 'var(--ivory)',
          }}>
            Fourteen links, drawn by hand,<br/>
            clasped at the <span className="serif-italic">pulse.</span>
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '28px 0' }} />
          <p className="serif-italic" style={{
            fontSize: 18, lineHeight: 1.65,
            color: 'rgba(247,242,234,0.8)', maxWidth: 420, margin: 0,
          }}>
            Rolled from a single 22k ingot, each link is turned over the anvil,
            filed, and polished by thumb. The clasp is concealed within the
            chain — so the bracelet never truly ends.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--rule-dark)' }}>
            <Stat n="XIV" l="Oval links" />
            <Stat n="22k" l="Ingot origin" />
            <Stat n="7 days" l="At the bench" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Link({ lk, progress }) {
  const x = useTransform(progress, [0.12, 0.55, 1], [`${lk.sx}vw`, `${lk.tx}vw`, `${lk.tx}vw`]);
  const y = useTransform(progress, [0.12, 0.55, 1], [`${lk.sy}vh`, `${lk.ty}vh`, `${lk.ty}vh`]);
  const z = useTransform(progress, [0.12, 0.55, 1], [-400, 0, 0]);
  const r = useTransform(progress, [0.12, 0.55, 1], [lk.r, lk.tangent, lk.tangent]);
  const op = useTransform(progress, [0.12, 0.28, 1], [0, 1, 1]);
  const sc = useTransform(progress, [0.12, 0.55, 0.72], [0.5, 1.08, 1]);
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0, top: 0,
        marginLeft: -30, marginTop: -30,
        width: 60, height: 60,
        x, y, z,
        rotate: r,
        scale: sc,
        opacity: op,
        filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 6px rgba(227,207,160,0.3))',
        transformOrigin: 'center',
        transformStyle: 'preserve-3d',
      }}
    >
      <BraceletLink size={60} />
    </motion.div>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 34, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>{n}</div>
      <div className="label" style={{ color: 'rgba(247,242,234,0.65)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
