import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Stage from '../../../components/maison/Stage';
import { HandSilhouette, HAND_LANDING, HAND_VB } from '../../../components/maison/Silhouettes';
import SparkleBurst from '../../../components/maison/SparkleBurst';
import ContinueHint from '../../../components/maison/ContinueHint';
import { Ring } from '../../../components/maison/Jewels';

/**
 * The Ring · 3D arrival.
 *
 * The hand silhouette is the stage, rendered at known SVG coords so we
 * can anchor animations to the ring-finger landing point. The Ring SVG
 * tumbles in from the upper-left, deep in z-space, yawing 720° and
 * pitching through rotateX/rotateZ. A glowing trajectory arc draws
 * behind it. When it reaches the finger it flares, rotates flat into
 * the finger's plane, then "seats" with a sparkle burst. A breathing
 * glow carries it through to the next scene.
 */

// Scene height controls how long the animation is locked in place while the
// user scrolls. 320vh = 220vh of sticky scroll-lock (scene height minus the
// 100vh sticky pin). That's roughly 2.2 wheel flicks to play through.
const SCENE_VH = 320;

// The anchor in viewport percentage (matches HandSilhouette's viewBox mapping)
// The silhouette is placed centred in the stage; these percentages are the
// landing point as a fraction of the stage itself.
const ANCHOR = {
  x: 50 + ((HAND_LANDING.x - HAND_VB.w / 2) / HAND_VB.w) * 100 * 0.58,
  y: 50 + ((HAND_LANDING.y - HAND_VB.h / 2) / HAND_VB.h) * 100 * 0.88,
};

export default function RingOnHand() {
  const ref = useRef(null);
  const [sparkle, setSparkle] = useState(false);
  const [seated, setSeated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Active window wide — motion begins almost immediately, continues to end
  const p = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true });

  // --- hand silhouette (slow drift + breathe) --------------------------------
  const handOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const handY = useTransform(p, [0, 1], ['2%', '-3%']);
  const handScale = useTransform(p, [0, 1], [1.02, 1.0]);
  const handRotY = useTransform(p, [0, 1], [-4, 4]); // 3D turn through the scene

  // --- ring 3D arrival -------------------------------------------------------
  // Flight: starts far in z-space (-900), high-left of the anchor; tumbles;
  // lands exactly at anchor (0,0,0); slightly over-shoots then seats.
  const ringX = useTransform(p, [0.10, 0.55, 0.78, 1], ['-46vw', '-8vw', '0vw', '0vw']);
  const ringY = useTransform(p, [0.10, 0.55, 0.78, 1], ['-34vh', '-6vh', '0vh', '0vh']);
  const ringZ = useTransform(p, [0.10, 0.55, 0.78, 1], [-900, -120, 40, 0]);
  const ringScale = useTransform(p, [0.10, 0.40, 0.70, 0.82, 1], [0.35, 1.1, 1.25, 0.95, 1]);
  // Tumbles: 720° on Y during flight, pitches on X, rolls on Z
  const ringRotY = useTransform(p, [0.10, 0.78, 1], [220, 720, 720]);
  const ringRotX = useTransform(p, [0.10, 0.55, 0.78, 1], [48, -12, 72, 88]);
  const ringRotZ = useTransform(p, [0.10, 0.55, 0.78, 1], [-32, 16, 4, 0]);
  const ringOpacity = useTransform(p, [0.08, 0.22, 1], [0, 1, 1]);
  const ringBlurRaw = useTransform(p, [0.10, 0.35, 0.70], [6, 0, 0]);
  const ringFilter = useTransform(ringBlurRaw, (b) => `blur(${b}px)`);
  const ringShadow = useTransform(
    p,
    [0.1, 0.7, 1],
    [
      'drop-shadow(0 4px 8px rgba(227,207,160,0.0))',
      'drop-shadow(0 26px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 24px rgba(227,207,160,0.5))',
      'drop-shadow(0 18px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 12px rgba(227,207,160,0.3))',
    ]
  );

  // --- trajectory trail: path draws with flight --------------------------------
  const trailLen = useTransform(p, [0.1, 0.78], [0, 1]);
  const trailFade = useTransform(p, [0.78, 0.95], [1, 0]);

  // --- reticle / spotlight ----------------------------------------------------
  const glowOpacity = useTransform(p, [0.1, 0.7, 1], [0.2, 0.95, 0.6]);
  const reticleOpacity = useTransform(p, [0, 0.25, 0.75, 1], [0, 0.5, 0.5, 0]);

  // --- text column ------------------------------------------------------------
  const textY = useTransform(p, [0, 1], ['6vh', '-10vh']);
  const textOpacity = useTransform(p, [0, 0.15, 0.88, 1], [0, 1, 1, 0.35]);

  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.78 && !sparkle) {
      setSparkle(true);
      setSeated(true);
      window.setTimeout(() => setSparkle(false), 1300);
    }
    if (v < 0.15 && seated) setSeated(false);
  });

  return (
    <section ref={ref} className="scene scene-ink" style={{ height: `${SCENE_VH}vh` }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) minmax(500px, 1.25fr)',
        alignItems: 'stretch',
        maxWidth: 1600,
        margin: '0 auto',
        overflow: 'hidden',
      }}>

        {/* LEFT — editorial column */}
        <motion.div style={{ y: textY, opacity: textOpacity, padding: '0 56px', alignSelf: 'center' }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 36, height: 1, background: 'var(--gold)' }} />
            Scene № I · The Ring
          </div>
          <h2 className="serif" style={{
            fontSize: 'clamp(42px, 5.2vw, 86px)',
            lineHeight: 0.96, fontWeight: 300, letterSpacing: '-0.015em', margin: 0,
            color: 'var(--ivory)',
          }}>
            A band of <span className="serif-italic">rose gold</span>,<br/>
            held to the fourth finger.
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--gold)', margin: '28px 0' }} />
          <p className="serif-italic" style={{
            fontSize: 18, lineHeight: 1.65,
            color: 'rgba(247,242,234,0.8)', maxWidth: 440, margin: 0,
          }}>
            Eighteen miniature talons, hand-drawn in rose gold, each filed to the
            thickness of three human hairs before bending to cradle the cushion.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--rule-dark)' }}>
            <Stat n="IV" l="Generation" />
            <Stat n="18k" l="Rose gold" />
            <Stat n="4.2ct" l="Old cushion" />
          </div>
        </motion.div>

        {/* RIGHT — the 3D stage */}
        <div style={{ position: 'relative', height: '100vh' }}>
          <Stage anchor={ANCHOR} glow={glowOpacity}>

            {/* Hand silhouette on stage */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: '78%',
                aspectRatio: `${HAND_VB.w} / ${HAND_VB.h}`,
                marginLeft: 0, marginTop: 0,
                x: '-50%', y: '-50%',
                opacity: handOpacity,
                scale: handScale,
                rotateY: handRotY,
                transformStyle: 'preserve-3d',
              }}
            >
              <HandSilhouette style={{ width: '100%', height: '100%', display: 'block' }} />
            </motion.div>

            {/* Trajectory trail — arcing path from seed to anchor */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              aria-hidden
            >
              <defs>
                <linearGradient id="ring-trail" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(227,207,160,0)" />
                  <stop offset="50%" stopColor="rgba(227,207,160,0.65)" />
                  <stop offset="100%" stopColor="rgba(227,207,160,0.95)" />
                </linearGradient>
              </defs>
              <motion.path
                d={`M 4 4 Q 40 ${ANCHOR.y - 20}, ${ANCHOR.x} ${ANCHOR.y}`}
                fill="none"
                stroke="url(#ring-trail)"
                strokeWidth="0.25"
                strokeLinecap="round"
                style={{ pathLength: trailLen, opacity: trailFade }}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={`M 4 4 Q 40 ${ANCHOR.y - 20}, ${ANCHOR.x} ${ANCHOR.y}`}
                fill="none"
                stroke="rgba(227,207,160,0.35)"
                strokeWidth="0.12"
                strokeDasharray="0.6 1.2"
                strokeLinecap="round"
                style={{ pathLength: trailLen, opacity: trailFade }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Landing reticle highlight (pulses while ring approaches) */}
            <motion.div
              style={{
                position: 'absolute',
                left: `${ANCHOR.x}%`,
                top: `${ANCHOR.y}%`,
                width: 80, height: 80,
                marginLeft: -40, marginTop: -40,
                borderRadius: '50%',
                border: '1px solid rgba(227,207,160,0.6)',
                opacity: reticleOpacity,
                pointerEvents: 'none',
              }}
            />

            {/* THE RING — full 3D flight */}
            <motion.div
              style={{
                position: 'absolute',
                left: `${ANCHOR.x}%`,
                top: `${ANCHOR.y}%`,
                marginLeft: -130, marginTop: -130,
                width: 260, height: 260,
                x: ringX, y: ringY, z: ringZ,
                scale: ringScale,
                rotateX: ringRotX, rotateY: ringRotY, rotateZ: ringRotZ,
                opacity: ringOpacity,
                filter: ringShadow,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <motion.div
                style={{
                  width: '100%', height: '100%',
                  filter: ringFilter,
                }}
              >
                <Ring size={260} />
              </motion.div>
            </motion.div>

            {/* Sparkle burst anchored at landing point */}
            <div style={{
              position: 'absolute',
              left: `${ANCHOR.x}%`,
              top: `${ANCHOR.y}%`,
              width: 0, height: 0,
              pointerEvents: 'none',
            }}>
              <SparkleBurst show={sparkle} count={22} size={320} />
            </div>

            {/* scene ID */}
            <div className="mono" style={{
              position: 'absolute', right: 22, bottom: 18,
              color: 'rgba(227,207,160,0.7)',
            }}>
              SCENE · 01 · HAND
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
      <div className="serif" style={{ fontSize: 38, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>{n}</div>
      <div className="label" style={{ color: 'rgba(247,242,234,0.65)', marginTop: 8 }}>{l}</div>
    </div>
  );
}
