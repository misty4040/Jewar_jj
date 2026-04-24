import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Monogram from '../../../components/maison/Monogram';

/**
 * Opening "curtain" — an editorial introduction. The ivory canvas reveals
 * the monogram being drawn stroke-by-stroke, the display title rises
 * through a blur, and a hairline gold rule draws outward.
 */
export default function Curtain() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="scene" style={{ height: '100vh', minHeight: 680, background: 'var(--ivory)' }}>
      <motion.div
        style={{ y: bgY, position: 'absolute', inset: 0 }}
        aria-hidden
      >
        {/* soft ivory gradient + radial warm glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(227,207,160,0.35), transparent 62%)',
        }} />
      </motion.div>

      {/* top rules */}
      <div style={{ position: 'absolute', top: 110, left: 48, right: 48, height: 1, background: 'rgba(11,11,15,0.12)' }} />
      <div style={{ position: 'absolute', bottom: 90, left: 48, right: 48, height: 1, background: 'rgba(11,11,15,0.12)' }} />

      <motion.div
        style={{
          y: titleY,
          opacity: titleOpacity,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 32px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Monogram size={76} color="var(--gold-deep)" draw delay={0.1} />
        </motion.div>

        <motion.div
          className="label"
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 0.8, letterSpacing: 'var(--track-wide)' }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: 'var(--gold-deep)', marginTop: 32 }}
        >
          The Private Atelier · Volume XI
        </motion.div>

        <motion.h1
          className="serif"
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(60px, 9vw, 148px)',
            lineHeight: 0.92,
            margin: '32px 0 0',
            fontWeight: 300,
            letterSpacing: '-0.015em',
            maxWidth: 1200,
          }}
        >
          The light falls,<br />
          <span className="serif-italic">the jewel arrives.</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 44,
            width: 220,
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold) 80%, transparent)',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="serif-italic"
          style={{
            marginTop: 32,
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            maxWidth: 560,
            lineHeight: 1.55,
            color: 'var(--ink-2)',
          }}
        >
          An hour of slow-making, brought to the hand, the neck, the ear.
          Scroll, and watch the pieces find their place.
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.6, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: 'var(--muted)',
        }}
      >
        <motion.span
          animate={{ scaleY: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'inline-block', width: 1, height: 32, background: 'var(--gold)', transformOrigin: 'bottom' }}
        />
        <span className="mono">Scroll to begin</span>
      </motion.div>
    </section>
  );
}
