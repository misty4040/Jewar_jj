import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Placeholder from '../../../components/maison/Placeholder';

/**
 * A quiet parallax triptych of hands-at-the-bench — three panels scrolling
 * at offset speeds, with a pull-quote seated on the centre gutter.
 */
const SHOTS = [
  {
    src: 'https://images.unsplash.com/photo-1602524204710-03fc73495e75?q=80&w=1200&auto=format&fit=crop',
    label: 'ATELIER · I\nDrawing the band',
    num: 'ATELIER · 01',
    speed: -120,
    ratio: '3/4',
  },
  {
    src: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce33c7?q=80&w=1200&auto=format&fit=crop',
    label: 'ATELIER · II\nSetting the talons',
    num: 'ATELIER · 02',
    speed: 80,
    ratio: '4/5',
  },
  {
    src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop',
    label: 'ATELIER · III\nBurnishing by thumb',
    num: 'ATELIER · 03',
    speed: -60,
    ratio: '3/4',
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
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="label" style={{ color: 'var(--gold-deep)', marginBottom: 16 }}>Of the bench · Since 1908</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(40px, 5vw, 76px)',
            margin: 0, fontWeight: 300, letterSpacing: '-0.01em',
            lineHeight: 1.05,
          }}>
            The hours behind<br /><span className="serif-italic">a single jewel.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
          {SHOTS.map((s, i) => (
            <Panel key={i} shot={s} progress={scrollYProgress} />
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
          <div className="label" style={{ color: 'var(--gold-deep)', marginTop: 16 }}>Head of Setting · IV Generation</div>
        </div>
      </div>
    </section>
  );
}

function Panel({ shot, progress }) {
  const y = useTransform(progress, [0, 1], [0, shot.speed]);
  return (
    <motion.div style={{ y }}>
      <Placeholder
        src={shot.src}
        alt={shot.label}
        label={shot.label}
        number={shot.num}
        ratio={shot.ratio}
        style={{ width: '100%' }}
      />
    </motion.div>
  );
}
