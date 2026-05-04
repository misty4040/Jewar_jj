/**
 * Chiaroscuro image frame matching the Maison design language. Accepts an
 * optional `src` — if provided, the image is shown beneath the crosshair
 * overlay (with desaturation + vignette). When `src` is absent, renders as
 * a pure "direction note" placeholder.
 */
export default function Placeholder({
  src,
  alt = '',
  label,
  number,
  ratio,
  height,
  ivory = false,
  style,
  className = '',
  children,
}) {
  const sizing = ratio ? { aspectRatio: ratio } : height ? { height } : { height: 420 };

  return (
    <div
      className={`img-placeholder${ivory ? ' ivory' : ''} ${className}`.trim()}
      style={{ ...sizing, ...style }}
    >
      {src && (
        <div className="ref-photo" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={src} alt={alt} loading="lazy" />
        </div>
      )}
      <div className="ph-crosshair" />
      {number && <div className="ph-number">{number}</div>}
      {label && <div className="ph-label">{label}</div>}
      {children}
    </div>
  );
}
