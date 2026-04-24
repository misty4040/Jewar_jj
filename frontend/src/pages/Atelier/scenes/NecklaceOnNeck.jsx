import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Stage from '../../../components/maison/Stage';
import { NeckSilhouette, NECK_LANDING, NECK_VB } from '../../../components/maison/Silhouettes';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import ContinueHint from '../../../components/maison/ContinueHint';
import LivingJewel from '../../../components/maison/LivingJewel';
import SceneTitle from '../../../components/maison/SceneTitle';
import Hallmark from '../../../components/maison/Hallmark';
import { Pendant } from '../../../components/maison/Jewels';

const SCENE_VH = 320;
const ANCHOR = {
  x: 50 + ((NECK_LANDING.x - NECK_VB.w / 2) / NECK_VB.w) * 100 * 0.58,
  y: 50 + ((NECK_LANDING.y - NECK_VB.h / 2) / NECK_VB.h) * 100 * 0.88,
};

// chain path in viewBox-percent coords, following the top of the collarbone
const CHAIN_D = `M ${ANCHOR.x - 34} ${ANCHOR.y - 16} C ${ANCHOR.x - 20} ${ANCHOR.y + 6}, ${ANCHOR.x + 20} ${ANCHOR.y + 6}, ${ANCHOR.x + 34} ${ANCHOR.y - 16}`;

export default function NecklaceOnNeck() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true });

  const neckOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const neckScale = useTransform(p, [0, 1], [1.03, 1]);
  const neckRotY = useTransform(p, [0, 1], [4, -4]);

  // Chain path draws from both ends simultaneously (via pathLength)
  const chainLen = useTransform(p, [0.15, 0.6], [0, 1]);
  const chainGlow = useTransform(p, [0.55, 0.78, 1], [0, 1, 0.6]);

  // Pendant descends and rotates — 3D: yaws 540°, pitches, drops with z
  const pendX = useTransform(p, [0.12, 0.7, 1], ['0vw', '0vw', '0vw']);
  const pendY = useTransform(p, [0.12, 0.55, 0.78, 1], ['-55vh', '-10vh', '2vh', '0vh']);
  const pendZ = useTransform(p, [0.12, 0.7, 1], [-600, -40, 0]);
  const pendScale = useTransform(p, [0.12, 0.55, 0.78, 1], [0.5, 1.05, 1.2, 0.98]);
  const pendRotY = useTransform(p, [0.12, 0.78], [540, 0]);
  const pendRotX = useTransform(p, [0.12, 0.55, 0.78, 1], [-40, 10, -4, 0]);
  const pendRotZ = useTransform(p, [0.12, 0.55, 0.78, 1], [24, -8, 4, 0]);
  const pendOpacity = useTransform(p, [0.08, 0.22, 1], [0, 1, 1]);
  const pendBlurRaw = useTransform(p, [0.12, 0.4, 0.7], [5, 0, 0]);
  const pendFilter = useTransform(pendBlurRaw, (b) =>
    `blur(${b}px) drop-shadow(0 22px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 18px rgba(227,207,160,0.45))`
  );

  // spotlight intensity
  const glow = useTransform(p, [0.1, 0.7, 1], [0.25, 0.95, 0.7]);

  // text
  const textY = useTransform(p, [0, 1], ['6vh', '-8vh']);
  const textOpacity = useTransform(p, [0, 0.18, 0.88, 1], [0, 1, 1, 0.35]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.76 && !sparkle) {
      setSparkle(true);
      window.setTimeout(() => setSparkle(false), 1200);
    }
  });

  return (
    <section ref={ref} className="scene scene-ink" style={{ height: `${SCENE_VH}vh` }}>
      <div
        className="scene-grid"
        style={{ gridTemplateColumns: 'minmax(500px, 1.25fr) minmax(320px, 1fr)' }}
      >

        {/* LEFT — stage */}
        <div className="scene-stage" style={{ position: 'relative', height: '100vh' }}>
          <Stage anchor={ANCHOR} glow={glow}>
            <SceneTitle progress={p} numeral="II" name="Pendant" italic="Pendant" tone="dark" />
            {/* Neck silhouette */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: '68%',
                aspectRatio: `${NECK_VB.w} / ${NECK_VB.h}`,
                x: '-50%', y: '-50%',
                opacity: neckOpacity,
                scale: neckScale,
                rotateY: neckRotY,
                transformStyle: 'preserve-3d',
              }}
            >
              <NeckSilhouette style={{ width: '100%', height: '100%', display: 'block' }} />
            </motion.div>

            {/* Chain — drawn with scroll */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              aria-hidden
            >
              <defs>
                <linearGradient id="chain-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(227,207,160,0)" />
                  <stop offset="20%" stopColor="#E3CFA0" />
                  <stop offset="80%" stopColor="#E3CFA0" />
                  <stop offset="100%" stopColor="rgba(227,207,160,0)" />
                </linearGradient>
              </defs>
              <motion.path
                d={CHAIN_D}
                fill="none"
                stroke="url(#chain-grad)"
                strokeWidth="0.6"
                strokeLinecap="round"
                style={{ pathLength: chainLen, opacity: chainGlow }}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={CHAIN_D}
                fill="none"
                stroke="rgba(227,207,160,0.45)"
                strokeWidth="0.3"
                strokeDasharray="0.5 1.2"
                strokeLinecap="round"
                style={{ pathLength: chainLen, opacity: chainGlow }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Pendant */}
            <motion.div
              style={{
                position: 'absolute',
                left: `${ANCHOR.x}%`,
                top: `${ANCHOR.y}%`,
                marginLeft: -110, marginTop: -110,
                width: 220, height: 220,
                x: pendX, y: pendY, z: pendZ,
                scale: pendScale,
                rotateX: pendRotX, rotateY: pendRotY, rotateZ: pendRotZ,
                opacity: pendOpacity,
                filter: pendFilter,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <LivingJewel progress={p} settleAt={0.78} parallax={14} tilt={10}>
                <Pendant size={220} />
              </LivingJewel>
            </motion.div>

            {/* Sparkle */}
            <div style={{
              position: 'absolute',
              left: `${ANCHOR.x}%`, top: `${ANCHOR.y}%`,
              width: 0, height: 0, pointerEvents: 'none',
            }}>
              <SparkleBurst show={sparkle} count={18} size={260} />
            </div>

            <Hallmark progress={p} settleAt={0.78} reference="JWR · MMXXVI · É.S" y={80} />

            <div className="mono" style={{
              position: 'absolute', right: 22, bottom: 18,
              color: 'rgba(227,207,160,0.7)',
            }}>
              SCENE · 02 · DÉCOLLETAGE
            </div>

            <ContinueHint progress={p} />
          </Stage>
        </div>

        {/* RIGHT — editorial column */}
        <motion.div className="scene-text" style={{ y: textY, opacity: textOpacity, padding: '0 56px', alignSelf: 'center' }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № II · The Pendant
          </div>
          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 84px)',
            lineHeight: 0.96, fontWeight: 300, letterSpacing: '-0.015em', margin: 0,
            color: 'var(--ivory)',
          }}>
            An emerald from <span className="serif-italic">Muzo</span>,<br/>
            set against the hollow of the throat.
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '28px 0' }} />
          <p className="serif-italic" style={{
            fontSize: 18, lineHeight: 1.65,
            color: 'rgba(247,242,234,0.8)', maxWidth: 440, margin: 0,
          }}>
            A 4.2-carat cushion from the Muzo valley — selected for the "jardin" of
            inclusions that only this seam produces. Strung on a woven 18k chain,
            worn close to the breath.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--rule-dark)' }}>
            <Stat n="4.2" l="Carat cushion" />
            <Stat n="18k" l="Woven chain" />
            <Stat n="№ 03" l="of XII" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 36, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>{n}</div>
      <div className="label" style={{ color: 'rgba(247,242,234,0.65)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
