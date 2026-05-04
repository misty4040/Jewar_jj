import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Ring } from '../../../components/maison/Jewels';

/**
 * Sticky 400vh section. The signature piece rotates a full 360° as the
 * user scrolls; four craftsmanship notes cross-fade in sequence on the
 * right column. Uses the Maison Sorelle scrollytelling pattern.
 */
const NOTES = [
  {
    t: 'The stone',
    b: 'A 4.2-carat cushion-cut emerald from the Muzo valley, Colombia — selected for its "jardin," a garden of inclusions unique to this seam.',
  },
  {
    t: 'The setting',
    b: 'Eighteen miniature talons hand-drawn in rose gold, each filed to the thickness of three human hairs before bending.',
  },
  {
    t: 'The finish',
    b: 'Burnished by thumb across nine days. The surface catches light the way old silver does — quietly, never sharp.',
  },
  {
    t: 'The hallmark',
    b: 'Struck on the inner band: JEWR · MMXXVI · S.J — a date, a house, a pair of hands.',
  },
];

export default function Signature360() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.02, 0.96]);

  return (
    <section ref={ref} className="scene scene-ink" style={{ height: '400vh' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr 1fr',
        padding: '120px 48px 80px',
        maxWidth: 1600,
        margin: '0 auto',
      }}>
        {/* left: chapter */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="label" style={{ color: 'var(--gold)', marginBottom: 20 }}>Signature № 01</div>
            <div className="serif" style={{ fontSize: 'clamp(40px, 4vw, 64px)', lineHeight: 1, fontWeight: 300, letterSpacing: '-0.01em' }}>
              The <span className="serif-italic">Jewar</span><br />Ring
            </div>
            <div style={{ marginTop: 24, width: 50, height: 1, background: 'var(--gold)' }} />
            <div className="mono" style={{ marginTop: 20, color: 'rgba(247,242,234,0.55)' }}>REF · JWR-26-0142</div>
          </div>

          <div>
            <div className="label" style={{ color: 'rgba(247,242,234,0.5)', marginBottom: 12 }}>Rotate to examine</div>
            <AngleRail progress={scrollYProgress} />
          </div>
        </div>

        {/* center: rotating piece */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <motion.div
            style={{
              width: '68%',
              aspectRatio: '1/1',
              position: 'relative',
              rotate: rot,
              scale,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(201,169,110,0.35)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: '12%', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%' }} />
            <div style={{
              position: 'absolute', inset: '22%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))',
            }}>
              <Ring size={320} />
            </div>
            {/* tick marks around the dial */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: '50%', top: 0,
                width: 1, height: 10,
                background: 'rgba(201,169,110,0.45)',
                transformOrigin: '0 0',
                transform: `rotate(${i * 30}deg) translate(-50%, 0)`,
              }} />
            ))}
          </motion.div>
        </div>

        {/* right: craftsmanship notes */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, borderLeft: '1px solid rgba(247,242,234,0.15)', paddingLeft: 34 }}>
            {NOTES.map((n, i) => (
              <Note key={i} i={i} note={n} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 40, left: 48, right: 48,
        display: 'flex', justifyContent: 'space-between',
        color: 'rgba(247,242,234,0.4)',
      }}>
        <span className="mono">SCROLLYTELLING · 360° EXAMINATION</span>
        <ChapterLabel progress={scrollYProgress} />
      </div>
    </section>
  );
}

function AngleRail({ progress }) {
  const degLabel = useTransform(progress, (v) => `${String(Math.round(v * 360)).padStart(3, '0')}°`);
  const pct = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'rgba(247,242,234,0.7)' }}>
      <motion.span className="mono">{degLabel}</motion.span>
      <div style={{ flex: 1, height: 1, background: 'rgba(247,242,234,0.18)', position: 'relative' }}>
        <motion.div style={{ position: 'absolute', left: 0, top: -1, height: 3, background: 'var(--gold)', width: pct }} />
      </div>
      <span className="mono">360°</span>
    </div>
  );
}

function Note({ i, note, progress }) {
  // each note peaks at its slot (i/N ... (i+1)/N). Ramp edges are clamped
  // to [0,1] so framer-motion's WAAPI path accepts the offsets.
  const segment = 1 / NOTES.length;
  const slotMid = (i + 0.5) * segment;
  const rampIn = Math.max(0, i * segment - 0.12);
  const rampOut = Math.min(1, (i + 1) * segment + 0.08);
  const op = useTransform(progress, [rampIn, slotMid, rampOut], [0.2, 1, 0.25], { clamp: true });
  const tx = useTransform(progress, [rampIn, slotMid, rampOut], [-8, 0, 8]);
  return (
    <motion.div style={{ opacity: op, x: tx }}>
      <div className="label" style={{ color: 'var(--gold)', marginBottom: 10 }}>Note № {String(i + 1).padStart(2, '0')}</div>
      <div className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 10, lineHeight: 1.1 }}>{note.t}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0, color: 'rgba(247,242,234,0.72)', maxWidth: 360 }}>{note.b}</p>
    </motion.div>
  );
}

function ChapterLabel({ progress }) {
  const idx = useTransform(progress, (v) =>
    `CHAPTER ${String(Math.min(NOTES.length, Math.max(1, Math.ceil(v * NOTES.length)))).padStart(2, '0')} / ${String(NOTES.length).padStart(2, '0')}`
  );
  return <motion.span className="mono">{idx}</motion.span>;
}
