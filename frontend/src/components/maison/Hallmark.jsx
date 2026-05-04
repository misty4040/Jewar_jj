import { motion, useTransform } from 'framer-motion';

/**
 * The maker's stamp, revealed after the jewel has seated. A four-letter
 * hallmark, a year, a pair of hands — the same structure you'd find
 * struck into the inside of a real heirloom band.
 *
 * Positioned in viewport-percent. Defaults put it centred below the
 * stage's horizon.
 */
export default function Hallmark({
  progress,
  settleAt = 0.78,
  reference = 'JWR · MMXXVI · S.J',
  x = 50,
  y = 78,
}) {
  const op = useTransform(progress, [settleAt, settleAt + 0.08, 1], [0, 1, 0.95]);
  const ty = useTransform(progress, [settleAt, settleAt + 0.1], [16, 0]);
  const dashScale = useTransform(progress, [settleAt, settleAt + 0.1], [0, 1]);
  const captionOp = useTransform(progress, [settleAt + 0.05, settleAt + 0.15], [0, 0.8]);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          opacity: op,
          y: ty,
          whiteSpace: 'nowrap',
        }}
      >
        <motion.span
          style={{
            display: 'inline-block',
            width: 28,
            height: 1,
            background: 'var(--gold)',
            transformOrigin: 'right',
            scaleX: dashScale,
          }}
        />
        <span
          className="mono"
          style={{
            color: 'var(--gold)',
            letterSpacing: '0.28em',
            fontSize: 11,
          }}
        >
          {reference}
        </span>
        <motion.span
          style={{
            display: 'inline-block',
            width: 28,
            height: 1,
            background: 'var(--gold)',
            transformOrigin: 'left',
            scaleX: dashScale,
          }}
        />
      </motion.div>

      <motion.div
        style={{
          marginTop: 8,
          textAlign: 'center',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 13,
          color: 'var(--gold)',
          opacity: captionOp,
        }}
      >
        struck by hand, by the fourth generation
      </motion.div>
    </div>
  );
}
