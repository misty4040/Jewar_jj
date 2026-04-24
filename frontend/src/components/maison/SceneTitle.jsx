import { motion, useTransform } from 'framer-motion';

/**
 * A cinematic chapter title shown at the top of each arrival scene.
 * Dominates the viewport on entry (progress 0 → 0.06), then gracefully
 * shrinks and fades as the scripted animation kicks in (→ 0.22).
 *
 * Lives above the stage as a non-interactive overlay.
 */
export default function SceneTitle({
  progress,
  numeral,
  name,
  italic,
  overline,
  tone = 'dark',
}) {
  const op = useTransform(progress, [0, 0.05, 0.18, 0.24], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.24], [1, 0.84]);
  const y = useTransform(progress, [0, 0.24], [0, -24]);
  const isDark = tone === 'dark';

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: isDark ? 'var(--ivory)' : 'var(--ink)',
        opacity: op,
        scale,
        y,
        pointerEvents: 'none',
        zIndex: 20,
        padding: '0 24px',
        textAlign: 'center',
      }}
      aria-hidden
    >
      <div className="label" style={{ color: 'var(--gold)', marginBottom: 18, letterSpacing: '0.5em' }}>
        {overline || `Chapter ${numeral}`}
      </div>

      <div
        className="serif"
        style={{
          fontSize: 'clamp(52px, 9vw, 148px)',
          fontWeight: 300,
          lineHeight: 0.94,
          letterSpacing: '-0.02em',
        }}
      >
        The <span className="serif-italic">{italic || name}</span>
      </div>

      <motion.div
        initial={false}
        animate={{ scaleX: 1 }}
        style={{
          marginTop: 26,
          width: 180,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold) 80%, transparent)',
          transformOrigin: 'center',
        }}
      />

      <div className="mono" style={{ color: 'var(--gold)', marginTop: 20, opacity: 0.75 }}>
        № {numeral}
      </div>
    </motion.div>
  );
}
