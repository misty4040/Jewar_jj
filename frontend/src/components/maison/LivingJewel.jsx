import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Wraps a jewel SVG and gives it small post-landing "life":
 *   · a mouse-parallax with subtle rotateX / rotateY tilt, so the object
 *     appears to sit in space and catch the light as the cursor moves
 *   · a continuous breathing brightness pulse, so the metal never reads
 *     as dead pixel art
 *
 * Parallax and tilt are multiplied by a `settle` factor that ramps from
 * 0 → 1 as the scroll progress crosses `settleAt`. That means during the
 * scripted 3D flight the scene choreography is untouched; the life only
 * switches on once the jewel arrives.
 */
export default function LivingJewel({
  progress,
  settleAt = 0.78,
  children,
  parallax = 18,   // max px displacement from cursor
  tilt = 12,       // max deg rotateX/rotateY
  pulse = true,
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.6 });

  const settle = useTransform(progress, [settleAt - 0.08, settleAt + 0.04], [0, 1], { clamp: true });

  const px = useTransform([sx, settle], ([x, f]) => x * parallax * f);
  const py = useTransform([sy, settle], ([y, f]) => y * parallax * f);
  const prx = useTransform([sy, settle], ([y, f]) => -y * tilt * f);
  const pry = useTransform([sx, settle], ([x, f]) => x * tilt * f);

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        x: px,
        y: py,
        rotateX: prx,
        rotateY: pry,
        transformStyle: 'preserve-3d',
      }}
      animate={
        pulse
          ? {
              filter: [
                'brightness(1) saturate(1)',
                'brightness(1.14) saturate(1.07)',
                'brightness(1) saturate(1)',
              ],
            }
          : undefined
      }
      transition={pulse ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      {children}
    </motion.div>
  );
}
