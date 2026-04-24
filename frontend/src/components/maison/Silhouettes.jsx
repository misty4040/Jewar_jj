/**
 * Minimal luxury line-art silhouettes used as the on-stage "model" in each
 * Atelier scene. Stylised — not photographic — but always renders, doesn't
 * depend on network, and gives the animated jewel a clear anchor point.
 *
 * Each silhouette exposes a LANDING constant describing where the animated
 * jewel should settle (in SVG viewBox coordinates), so the scene can draw a
 * glow, reticle, or trajectory pointed at the same location.
 */

const STROKE = '#E3CFA0';
const STROKE_DEEP = '#C9A96E';
const FLESH_A = 'rgba(227, 207, 160, 0.10)';
const FLESH_B = 'rgba(227, 207, 160, 0.02)';

/* =========================================================
   HAND — slight three-quarter turn, fingers lifted. Ring
   lands on the fourth finger at (220, 210) in viewBox 500×620
   ========================================================= */
export const HAND_VB = { w: 500, h: 620 };
export const HAND_LANDING = { x: 228, y: 214 };

export function HandSilhouette({ className, style }) {
  return (
    <svg viewBox="0 0 500 620" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="hand-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={FLESH_A} />
          <stop offset="100%" stopColor={FLESH_B} />
        </linearGradient>
        <radialGradient id="hand-glow" cx="0.46" cy="0.34" r="0.42">
          <stop offset="0%" stopColor="rgba(227,207,160,0.5)" />
          <stop offset="70%" stopColor="rgba(227,207,160,0)" />
        </radialGradient>
      </defs>

      {/* soft warm light behind the hand */}
      <rect x="0" y="0" width="500" height="620" fill="url(#hand-glow)" />

      {/* wrist + palm — one sweeping contour */}
      <path
        d="M 168 600
           C 170 520, 150 460, 160 400
           C 170 340, 200 300, 210 260
           L 210 180
           C 210 150, 230 140, 244 150
           L 248 240
           L 260 120
           C 262 94, 290 90, 296 118
           L 294 240
           L 318 100
           C 322 72, 354 74, 356 104
           L 346 240
           L 368 150
           C 374 130, 400 134, 400 156
           L 384 260
           C 396 300, 396 360, 372 430
           C 356 480, 340 540, 334 600
           Z"
        fill="url(#hand-fill)"
        stroke={STROKE}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* thumb */}
      <path
        d="M 168 440
           C 140 400, 120 360, 122 320
           C 124 286, 150 280, 168 310
           C 180 330, 184 370, 182 404"
        fill="url(#hand-fill)"
        stroke={STROKE}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* finger joint hairlines */}
      <g stroke={STROKE} strokeWidth="0.5" strokeOpacity="0.55" fill="none">
        <path d="M 232 210 Q 242 200, 252 210" />
        <path d="M 274 194 Q 286 182, 298 194" />
        <path d="M 326 210 Q 340 200, 352 210" />
        <path d="M 372 240 Q 382 232, 390 240" />
      </g>

      {/* palm curvature lifeline */}
      <path
        d="M 190 380 C 220 440, 260 470, 310 460"
        fill="none"
        stroke={STROKE}
        strokeWidth="0.4"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

/* =========================================================
   NECK — head tilted back slightly, exposes collarbone and
   hollow. Pendant lands at (250, 330) in viewBox 500×620
   ========================================================= */
export const NECK_VB = { w: 500, h: 620 };
export const NECK_LANDING = { x: 250, y: 338 };

export function NeckSilhouette({ className, style }) {
  return (
    <svg viewBox="0 0 500 620" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="neck-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={FLESH_A} />
          <stop offset="100%" stopColor={FLESH_B} />
        </linearGradient>
        <radialGradient id="neck-glow" cx="0.5" cy="0.55" r="0.5">
          <stop offset="0%" stopColor="rgba(227,207,160,0.42)" />
          <stop offset="75%" stopColor="rgba(227,207,160,0)" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="500" height="620" fill="url(#neck-glow)" />

      {/* jaw + chin line */}
      <path
        d="M 120 80
           C 150 140, 200 180, 250 188
           C 300 180, 350 140, 380 80"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.3"
      />

      {/* neck column */}
      <path
        d="M 190 188
           C 188 240, 188 280, 200 320
           C 210 340, 250 348, 290 340
           C 302 280, 302 240, 300 188"
        fill="url(#neck-fill)"
        stroke={STROKE}
        strokeWidth="1.2"
      />

      {/* shoulder line + collarbone */}
      <path
        d="M 30 520
           C 100 440, 180 380, 200 340
           M 300 340
           C 320 380, 400 440, 470 520"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.1"
      />

      {/* collarbone ridge (subtle) */}
      <path
        d="M 110 430 C 170 420, 220 410, 244 410
           M 256 410 C 280 410, 330 420, 390 430"
        fill="none"
        stroke={STROKE}
        strokeWidth="0.6"
        strokeOpacity="0.55"
      />

      {/* torso top */}
      <path
        d="M 30 520 L 30 620 M 470 520 L 470 620"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.1"
      />
      <path
        d="M 30 540 Q 250 600, 470 540"
        fill="url(#neck-fill)"
        stroke={STROKE}
        strokeWidth="1.1"
      />
    </svg>
  );
}

/* =========================================================
   EAR — side profile silhouette. Earring hangs from the
   lobe at (280, 370) in viewBox 500×620
   ========================================================= */
export const EAR_VB = { w: 500, h: 620 };
export const EAR_LANDING = { x: 294, y: 370 };

export function EarSilhouette({ className, style }) {
  return (
    <svg viewBox="0 0 500 620" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="ear-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={FLESH_A} />
          <stop offset="100%" stopColor={FLESH_B} />
        </linearGradient>
        <radialGradient id="ear-glow" cx="0.55" cy="0.5" r="0.45">
          <stop offset="0%" stopColor="rgba(227,207,160,0.45)" />
          <stop offset="75%" stopColor="rgba(227,207,160,0)" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="500" height="620" fill="url(#ear-glow)" />

      {/* head contour (back of head + jaw, facing left) */}
      <path
        d="M 460 80
           C 400 60, 320 70, 260 120
           C 210 160, 185 220, 185 290
           C 185 340, 200 380, 226 410
           C 240 430, 248 460, 250 490
           C 252 540, 252 600, 252 620"
        fill="url(#ear-fill)"
        stroke={STROKE}
        strokeWidth="1.2"
      />

      {/* hair sweep */}
      <path
        d="M 460 80 Q 420 140, 380 180 Q 340 210, 300 215"
        fill="none"
        stroke={STROKE}
        strokeWidth="0.9"
        strokeOpacity="0.6"
      />

      {/* ear outer helix */}
      <path
        d="M 290 260
           C 330 260, 350 300, 346 350
           C 342 380, 320 390, 304 386
           C 294 384, 290 380, 290 372"
        fill="rgba(227,207,160,0.06)"
        stroke={STROKE_DEEP}
        strokeWidth="1.4"
      />

      {/* ear inner curve */}
      <path
        d="M 304 290
           C 324 296, 330 318, 326 342
           C 322 360, 310 364, 302 358"
        fill="none"
        stroke={STROKE}
        strokeWidth="0.8"
      />

      {/* lobe */}
      <path
        d="M 290 372
           C 288 380, 292 388, 300 388"
        fill="none"
        stroke={STROKE_DEEP}
        strokeWidth="1.3"
      />

      {/* jaw line softening */}
      <path
        d="M 226 410 Q 220 460, 230 520"
        fill="none"
        stroke={STROKE}
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />
    </svg>
  );
}

/* =========================================================
   WRIST — palm-down, fingers curled away. Bracelet wraps
   around the wrist at its centre (250, 310). Ellipse radii
   in viewBox units.
   ========================================================= */
export const WRIST_VB = { w: 500, h: 620 };
export const WRIST_LANDING = { x: 250, y: 316 };
export const WRIST_ELLIPSE = { rx: 112, ry: 40 };

export function WristSilhouette({ className, style }) {
  return (
    <svg viewBox="0 0 500 620" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="wrist-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={FLESH_A} />
          <stop offset="100%" stopColor={FLESH_B} />
        </linearGradient>
        <radialGradient id="wrist-glow" cx="0.5" cy="0.5" r="0.45">
          <stop offset="0%" stopColor="rgba(227,207,160,0.45)" />
          <stop offset="75%" stopColor="rgba(227,207,160,0)" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="500" height="620" fill="url(#wrist-glow)" />

      {/* forearm + wrist + back of hand, viewed at a low angle */}
      <path
        d="M 40 520
           C 80 460, 130 420, 170 400
           C 200 388, 230 384, 250 384
           C 270 384, 300 388, 330 400
           C 370 420, 420 460, 460 520
           L 460 620
           L 40 620
           Z"
        fill="url(#wrist-fill)"
        stroke={STROKE}
        strokeWidth="1.2"
      />

      {/* wrist bone hint */}
      <path
        d="M 155 370
           C 170 330, 230 316, 250 316
           C 270 316, 330 330, 345 370"
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
      />

      {/* tendon lines on back of hand */}
      <g stroke={STROKE} strokeWidth="0.5" strokeOpacity="0.5" fill="none">
        <path d="M 190 420 Q 200 460, 210 520" />
        <path d="M 230 420 Q 240 470, 250 540" />
        <path d="M 270 420 Q 280 470, 290 540" />
        <path d="M 310 420 Q 320 460, 330 520" />
      </g>

      {/* knuckle curve */}
      <path
        d="M 170 400 Q 250 380, 330 400"
        fill="none"
        stroke={STROKE}
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />

      {/* finger hints at bottom-edge */}
      <g fill="url(#wrist-fill)" stroke={STROKE} strokeWidth="0.9">
        <path d="M 140 400 Q 110 420, 90 460 L 80 520 L 130 520 Q 140 470, 150 420 Z" />
        <path d="M 360 400 Q 390 420, 410 460 L 420 520 L 370 520 Q 360 470, 350 420 Z" />
      </g>
    </svg>
  );
}
