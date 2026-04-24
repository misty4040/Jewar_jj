import { useEffect, useRef } from 'react';

const HOVER_SELECTOR = 'a, button, [data-hover], .btn, .zoom-wrap, input, textarea';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest(HOVER_SELECTOR)) {
        document.body.classList.add('maison-cursor-hover');
      } else {
        document.body.classList.remove('maison-cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    let raf;
    const tick = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.body.classList.remove('maison-cursor-hover');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="maison-cursor-ring" />
      <div ref={dot} className="maison-cursor-dot" />
    </>
  );
}
