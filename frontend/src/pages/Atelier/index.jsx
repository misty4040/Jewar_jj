import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

import Cursor from '../../components/maison/Cursor';
import FilmGrain from '../../components/maison/FilmGrain';
import Monogram from '../../components/maison/Monogram';

import Curtain from './scenes/Curtain';
import RingOnHand from './scenes/RingOnHand';
import NecklaceOnNeck from './scenes/NecklaceOnNeck';
import EarringsOnEar from './scenes/EarringsOnEar';
import BraceletOnWrist from './scenes/BraceletOnWrist';
import Signature360 from './scenes/Signature360';
import AtelierStrip from './scenes/AtelierStrip';
import ReturnCTA from './scenes/ReturnCTA';

import '../../styles/maison.css';

/**
 * Scenes that render on a dark "ink" canvas. Used to flip the top chrome
 * + progress rail theme in sync with the body.
 */
const INK_SCENES = new Set([2, 4, 5, 7]);

const SCENES = [
  { key: 'curtain',   label: 'Curtain',   numeral: '—' },
  { key: 'ring',      label: 'The Ring',  numeral: 'I' },
  { key: 'pendant',   label: 'Pendant',   numeral: 'II' },
  { key: 'earring',   label: 'Earring',   numeral: 'III' },
  { key: 'bracelet',  label: 'Bracelet',  numeral: 'IV' },
  { key: 'signature', label: 'Signature', numeral: 'V' },
  { key: 'atelier',   label: 'Atelier',   numeral: 'VI' },
  { key: 'viewing',   label: 'Viewing',   numeral: 'VII' },
];

export default function Atelier({ onExit }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [entering, setEntering] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const t = setTimeout(() => setEntering(false), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const scenes = Array.from(root.querySelectorAll('[data-scene]'));
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let best = 0;
      scenes.forEach((el, i) => {
        if (el.offsetTop <= y) best = i;
      });
      setActiveScene(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const onInk = INK_SCENES.has(activeScene);

  const handleExit = () => {
    setEntering(true);
    window.setTimeout(() => {
      onExit && onExit();
    }, 650);
  };

  const jumpToScene = (i) => {
    const el = document.querySelector(`[data-scene="${i}"]`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + 4;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="maison" ref={scrollRef}>
        <Cursor />
        <FilmGrain />

        {/* enter / exit overlay */}
        <AnimatePresence>
          {entering && (
            <motion.div
              className="maison-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>

        {/* top chrome */}
        <div className={`maison-top ${scrolled ? 'scrolled' : ''} ${onInk ? 'on-ink' : ''}`}>
          <span className="est">Est. 1908 · Hazaribag · Volume XI</span>
          <a
            href="#home"
            className="crest"
            onClick={(e) => { e.preventDefault(); handleExit(); }}
          >
            <Monogram size={28} color="currentColor" />
            <span className="wordmark">Jewar</span>
          </a>
          <button type="button" className="exit" onClick={handleExit}>
            Return to the House
          </button>
        </div>

        {/* progress rail — now clickable to jump between chapters */}
        <nav className={`maison-rail ${onInk ? 'on-ink' : ''}`} aria-label="Chapter navigation">
          <span className="idx">{SCENES[activeScene].numeral}</span>
          {SCENES.map((scene, i) => (
            <button
              key={scene.key}
              type="button"
              className={`tick ${i === activeScene ? 'active' : ''}`}
              onClick={() => jumpToScene(i)}
              aria-label={`Jump to ${scene.label}`}
              title={`${scene.numeral}. ${scene.label}`}
            />
          ))}
          <span className="idx">{SCENES[SCENES.length - 1].numeral}</span>
        </nav>

        {/* active scene label, fades with activeScene change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`maison-scene-badge ${onInk ? 'on-ink' : ''}`}
          >
            <span className="mono">{SCENES[activeScene].numeral}</span>
            <span className="divider" />
            <span className="mono">{SCENES[activeScene].label}</span>
          </motion.div>
        </AnimatePresence>

        {/* scenes */}
        <div data-scene="0"><Curtain /></div>
        <div data-scene="1"><RingOnHand /></div>
        <div data-scene="2"><NecklaceOnNeck /></div>
        <div data-scene="3"><EarringsOnEar /></div>
        <div data-scene="4"><BraceletOnWrist /></div>
        <div data-scene="5"><Signature360 /></div>
        <div data-scene="6"><AtelierStrip /></div>
        <div data-scene="7"><ReturnCTA onExit={handleExit} /></div>
      </div>
    </MotionConfig>
  );
}
