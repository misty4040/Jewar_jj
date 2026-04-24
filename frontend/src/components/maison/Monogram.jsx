import { motion } from 'framer-motion';

/**
 * Original Maison-style monogram: an interwoven J+S enclosed in a circle
 * with a serif dot. When `draw` is true, the strokes animate in using
 * path-length tweening.
 */
export default function Monogram({ size = 36, color = 'currentColor', draw = false, delay = 0 }) {
  const strokeProps = draw
    ? {
        initial: { pathLength: 0, opacity: 0.2 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      stroke={color}
      strokeWidth="1.1"
      aria-hidden
    >
      <motion.circle cx="30" cy="30" r="27" strokeOpacity="0.4" {...strokeProps} />
      {/* J */}
      <motion.path
        d="M22 18 L32 18 L32 38 C32 44, 26 44, 22 40"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...strokeProps}
        transition={{ ...strokeProps.transition, delay: delay + 0.15 }}
      />
      {/* S interlocked */}
      <motion.path
        d="M44 22 C 38 22, 36 28, 42 30 C 48 32, 46 38, 40 38"
        strokeLinecap="round"
        {...strokeProps}
        transition={{ ...strokeProps.transition, delay: delay + 0.35 }}
      />
      <motion.circle
        cx="30"
        cy="50"
        r="0.9"
        fill={color}
        stroke="none"
        initial={draw ? { opacity: 0 } : undefined}
        animate={draw ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: delay + 1.4 }}
      />
    </svg>
  );
}
