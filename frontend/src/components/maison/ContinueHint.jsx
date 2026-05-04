import { motion, useTransform } from 'framer-motion';

/**
 * A small caption that fades in near the bottom of a sticky scene once the
 * in-scene animation has completed, telling the user they can scroll on.
 * Pass the scene's `progress` motion value; opacity tracks the tail end.
 */
export default function ContinueHint({ progress, label = 'Continue ↓' }) {
  const opacity = useTransform(progress, [0.82, 0.92, 1], [0, 1, 0.85]);
  const y = useTransform(progress, [0.82, 1], [8, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 28,
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        color: 'inherit',
        opacity,
        y,
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--gold)' }} />
      <span className="mono" style={{ color: 'inherit' }}>{label}</span>
      <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--gold)' }} />
    </motion.div>
  );
}
