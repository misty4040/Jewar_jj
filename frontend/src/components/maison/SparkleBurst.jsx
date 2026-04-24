import { motion } from 'framer-motion';

/**
 * A short-lived burst of gold sparkles radiating outward from a point.
 * Used when a jewel "lands" on the model. Renders absolutely positioned.
 */
export default function SparkleBurst({ show, count = 14, size = 220 }) {
  if (!show) return null;
  const items = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const radius = size / 2 + (i % 2 === 0 ? 12 : -8);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, delay: (i % 4) * 0.04 };
  });
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="maison-sparkle"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0.3, 1.4, 0.6] }}
          transition={{ duration: 1.1, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ left: '50%', top: '50%' }}
        />
      ))}
    </div>
  );
}
