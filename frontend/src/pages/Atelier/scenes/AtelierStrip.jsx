import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Stage from '../../../components/maison/Stage';
import { Ring, Pendant, Earring } from '../../../components/maison/Jewels';

/**
 * A quiet interlude between the four arrivals — three "vitrine" panels
 * at offset parallax speeds, each framing a piece under a gentle glow.
 * Doubles as an aesthetic summary before the return CTA.
 */
const PANELS = [
  {
    title: 'The Band',
    caption: 'Drawn in rose gold over seven days',
    Jewel: Ring,
    size: 220,
    speed: -130,
  },
  {
    title: 'The Pendant',
    caption: 'A Muzo emerald on a woven chain',
    Jewel: Pendant,
    size: 200,
    speed: 90,
  },
  {
    title: 'The Earring',
    caption: 'Akoya pearl, struck wire',
    Jewel: Earring,
    size: 200,
    speed: -60,
  },
];

export default function AtelierStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} className="scene" style={{ padding: '140px 48px 160px', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="label" style={{ color: 'var(--gold-deep)', marginBottom: 16 }}>
            Of the bench · Since 1908
          </div>
          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 76px)',
            margin: 0, fontWeight: 300, letterSpacing: '-0.01em',
            lineHeight: 1.05,
          }}>
            The hours behind<br/>
            <span className="serif-italic">a single jewel.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
          {PANELS.map((panel, i) => (
            <Panel key={i} panel={panel} progress={scrollYProgress} />
          ))}
        </div>

        <div style={{ marginTop: 80, textAlign: 'center' }}>
          <p className="serif-italic" style={{
            fontSize: 'clamp(22px, 2.2vw, 32px)',
            maxWidth: 720, margin: '0 auto',
            lineHeight: 1.4, color: 'var(--ink-2)',
          }}>
            "The setting is finished only when I can no longer feel the edge
            with my thumbnail. Not when the loupe agrees — when the hand agrees."
          </p>
          <div style={{ margin: '28px auto 0', width: 48, height: 1, background: 'var(--gold)' }} />
          <div className="label" style={{ color: 'var(--gold-deep)', marginTop: 16 }}>
            Head of Setting · IV Generation
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ panel, progress }) {
  const { Jewel, size, speed } = panel;
  const y = useTransform(progress, [0, 1], [0, speed]);
  const jewelRot = useTransform(progress, [0, 1], [0, 360]);
  return (
    <motion.div style={{ y }}>
      <div style={{
        aspectRatio: '3/4',
        position: 'relative',
        border: '1px solid rgba(11,11,15,0.12)',
        background: 'linear-gradient(180deg, #F7F2EA 0%, #EFE8DC 100%)',
      }}>
        <Stage anchor={{ x: 50, y: 54 }} tone="ivory" size="md">
          <motion.div
            style={{
              position: 'absolute',
              left: '50%', top: '54%',
              marginLeft: -size / 2, marginTop: -size / 2,
              width: size, height: size,
              rotate: jewelRot,
              filter: 'drop-shadow(0 26px 40px rgba(0,0,0,0.2)) drop-shadow(0 0 18px rgba(201,169,110,0.35))',
            }}
          >
            <Jewel size={size} />
          </motion.div>
        </Stage>

        <div style={{
          position: 'absolute', left: 18, top: 18,
          color: 'rgba(11,11,15,0.55)',
        }} className="mono">
          {String(panel.title.length).padStart(2, '0')} · VITRINE
        </div>
      </div>
      <div style={{ paddingTop: 22 }}>
        <div className="serif" style={{ fontSize: 26, fontWeight: 300, lineHeight: 1.1 }}>{panel.title}</div>
        <div className="label" style={{ color: 'var(--muted)', marginTop: 8 }}>{panel.caption}</div>
      </div>
    </motion.div>
  );
}
