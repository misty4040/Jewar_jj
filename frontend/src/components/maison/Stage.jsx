import { motion } from 'framer-motion';

/**
 * A shared "studio" stage used by each scene. A dark plinth with a warm
 * golden spotlight at a named anchor point, a faint concentric reticle
 * framing the landing zone, a soft floor vignette, and a perspective
 * container for the 3D jewel flight inside.
 *
 * Children render in the perspective container; pass a MotionValue
 * `glowIntensity` to make the spotlight breathe with scroll.
 */
export default function Stage({
  children,
  anchor = { x: 50, y: 50 }, // percent
  glow,                       // MotionValue (0..1) or undefined
  size = 'md',                // 'md' or 'lg' for the reticle diameter
  tone = 'dark',              // 'dark' | 'ivory'
}) {
  const isDark = tone === 'dark';
  const plate = isDark
    ? 'radial-gradient(ellipse at 50% 45%, #1e1b16 0%, #0b0b0f 55%, #040405 100%)'
    : 'radial-gradient(ellipse at 50% 40%, #f6ecd7 0%, #E4DCCB 55%, #cfbf9d 100%)';
  const floorShadow = isDark
    ? 'radial-gradient(ellipse at 50% 92%, rgba(0,0,0,0.85), transparent 60%)'
    : 'radial-gradient(ellipse at 50% 92%, rgba(0,0,0,0.25), transparent 60%)';
  const spotColor = isDark ? 'rgba(227,207,160,0.55)' : 'rgba(201,169,110,0.55)';

  const reticleDiam = size === 'lg' ? 320 : 200;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: plate,
      overflow: 'hidden',
      isolation: 'isolate',
    }}>
      {/* floor vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: floorShadow,
        pointerEvents: 'none',
      }} />

      {/* spotlight — scroll-reactive */}
      <motion.div
        style={{
          position: 'absolute',
          left: `${anchor.x}%`,
          top: `${anchor.y}%`,
          width: 900, height: 900,
          marginLeft: -450, marginTop: -450,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${spotColor} 0%, rgba(0,0,0,0) 62%)`,
          mixBlendMode: isDark ? 'screen' : 'multiply',
          opacity: glow ?? 0.7,
          pointerEvents: 'none',
          filter: 'blur(2px)',
        }}
      />

      {/* reticle framing the landing point */}
      <div style={{
        position: 'absolute',
        left: `${anchor.x}%`,
        top: `${anchor.y}%`,
        width: reticleDiam,
        height: reticleDiam,
        marginLeft: -reticleDiam / 2,
        marginTop: -reticleDiam / 2,
        border: `1px solid ${isDark ? 'rgba(227,207,160,0.22)' : 'rgba(168,136,78,0.28)'}`,
        borderRadius: '50%',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', inset: 18,
          border: `1px dashed ${isDark ? 'rgba(227,207,160,0.18)' : 'rgba(168,136,78,0.22)'}`,
          borderRadius: '50%',
        }} />
      </div>

      {/* golden hairline horizon */}
      <div style={{
        position: 'absolute',
        left: '8%', right: '8%',
        top: `${anchor.y}%`,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(201,169,110,0.22)' : 'rgba(168,136,78,0.35)'} 20%, ${isDark ? 'rgba(201,169,110,0.22)' : 'rgba(168,136,78,0.35)'} 80%, transparent)`,
        pointerEvents: 'none',
      }} />

      {/* 3D perspective container for animated content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        perspective: '1500px',
        perspectiveOrigin: `${anchor.x}% ${anchor.y}%`,
        transformStyle: 'preserve-3d',
      }}>
        {children}
      </div>

      {/* corner tick marks */}
      <CornerTicks isDark={isDark} />
    </div>
  );
}

function CornerTicks({ isDark }) {
  const c = isDark ? 'rgba(227,207,160,0.4)' : 'rgba(168,136,78,0.5)';
  const size = 18;
  const style = { position: 'absolute', width: size, height: size, pointerEvents: 'none' };
  return (
    <>
      <svg style={{ ...style, left: 18, top: 18 }} viewBox="0 0 18 18">
        <path d="M0 0 L10 0 M0 0 L0 10" stroke={c} strokeWidth="1" />
      </svg>
      <svg style={{ ...style, right: 18, top: 18 }} viewBox="0 0 18 18">
        <path d="M18 0 L8 0 M18 0 L18 10" stroke={c} strokeWidth="1" />
      </svg>
      <svg style={{ ...style, left: 18, bottom: 18 }} viewBox="0 0 18 18">
        <path d="M0 18 L10 18 M0 18 L0 8" stroke={c} strokeWidth="1" />
      </svg>
      <svg style={{ ...style, right: 18, bottom: 18 }} viewBox="0 0 18 18">
        <path d="M18 18 L8 18 M18 18 L18 8" stroke={c} strokeWidth="1" />
      </svg>
    </>
  );
}
