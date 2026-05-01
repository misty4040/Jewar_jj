import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Layered figure used as the "model" in each arrival scene. Renders a
 * silhouette as an instant-visible base (no network required), then
 * cross-fades a high-resolution photograph over it once loaded. If the
 * image 404s or is blocked, the silhouette remains as a graceful
 * fallback — so scenes can never appear empty.
 *
 * The photograph is styled with a warm editorial grade (desaturate,
 * slight contrast lift, brightness down) and a radial vignette so it
 * reads as a studio still, not a stock photo.
 */
export default function Figure({
  src,
  alt = '',
  silhouette: Silhouette,
  objectPosition = 'center center',
  tint = 'warm', // 'warm' | 'cool' | 'ivory'
  style,
  className,
  ambientZoom = true,
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showImage = loaded && !errored;

  const filter = tint === 'ivory'
    ? 'saturate(0.9) contrast(1.03) brightness(1.02)'
    : tint === 'cool'
      ? 'saturate(0.7) contrast(1.08) brightness(0.88) hue-rotate(6deg)'
      : 'saturate(0.78) contrast(1.08) brightness(0.88) hue-rotate(-6deg)';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Silhouette — always rendered; visible while loading or on error */}
      {Silhouette && (
        <motion.div
          animate={{ opacity: showImage ? 0.16 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden={showImage}
        >
          <Silhouette style={{ width: '100%', height: '100%', display: 'block' }} />
        </motion.div>
      )}

      {/* Photograph — fades in over the silhouette once loaded */}
      {src && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          animate={ambientZoom ? { scale: [1, 1.04, 1] } : undefined}
          transition={
            ambientZoom
              ? { duration: 22, repeat: Infinity, ease: 'easeInOut' }
              : undefined
          }
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            opacity: showImage ? 1 : 0,
            transition: 'opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
            filter,
          }}
        />
      )}

      {/* Warm overlay — unifies the photo with the Maison palette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            tint === 'ivory'
              ? 'linear-gradient(180deg, rgba(247,242,234,0.02) 0%, rgba(227,207,160,0.06) 50%, rgba(201,169,110,0.05) 100%)'
              : 'linear-gradient(180deg, rgba(11,11,15,0.18) 0%, rgba(11,11,15,0.06) 40%, rgba(11,11,15,0.38) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Vignette — pushes focus to the subject */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            tint === 'ivory'
              ? 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.22) 100%)'
              : 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.68) 100%)',
        }}
      />
    </div>
  );
}
