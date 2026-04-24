import { motion } from 'framer-motion';
import Monogram from '../../../components/maison/Monogram';

export default function ReturnCTA({ onExit }) {
  return (
    <section className="scene scene-ink" style={{ padding: '160px 48px 180px' }}>
      <div style={{
        maxWidth: 820, margin: '0 auto', textAlign: 'center',
        border: '1px solid var(--gold)', padding: '80px 60px',
        background: 'rgba(11,11,15,0.4)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Monogram size={64} color="var(--gold)" draw delay={0.1} />
        </motion.div>

        <motion.div
          className="label"
          style={{ color: 'var(--gold)', marginTop: 22 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          By appointment · Hazaribag · Delhi · Mumbai
        </motion.div>

        <motion.h2
          className="serif"
          style={{
            fontSize: 'clamp(40px, 4.8vw, 68px)',
            margin: '24px 0 0',
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: '-0.01em',
            color: 'var(--ivory)',
          }}
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          A private viewing,<br />
          <span className="serif-italic">in a room of our own.</span>
        </motion.h2>

        <motion.p
          style={{
            maxWidth: 520, margin: '28px auto 0',
            fontSize: 15, lineHeight: 1.75, color: 'rgba(247,242,234,0.78)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Pieces are shown one at a time, at your pace, with the person who made them.
          Coffee from the copper pot. No sales floor, no hurry.
        </motion.p>

        <div style={{ margin: '40px auto 36px', width: 48, height: 1, background: 'var(--gold)' }} />

        <motion.div
          style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a
            href="https://wa.me/1234567890?text=I%20would%20like%20a%20private%20viewing%20at%20Jewar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ color: 'var(--ivory)', borderColor: 'rgba(247,242,234,0.5)' }}
          >
            <span className="dot" />
            <span>Request a Viewing</span>
          </a>

          <button
            type="button"
            onClick={onExit}
            className="btn"
            style={{ color: 'var(--ivory)', borderColor: 'rgba(247,242,234,0.35)', background: 'transparent', cursor: 'pointer' }}
          >
            <span>Return to the House</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
