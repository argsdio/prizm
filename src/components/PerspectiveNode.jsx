import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PerspectiveNode.module.css'

export default function PerspectiveNode({ config, content, isOpen, onToggle, index }) {
  const { label, colorClass } = config

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onToggle() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onToggle])

  return (
    <>
      {/* Circle node */}
      <motion.button
        className={`${styles.circle} ${styles[colorClass]}`}
        onClick={onToggle}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 + index * 0.12, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Open ${label}`}
      >
        <span className={styles.circleLabel}>{label}</span>
      </motion.button>

      {/* Modal rendered directly into document.body via Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onToggle}
              />
              <motion.div
                className={`${styles.modal} ${styles[`modal_${colorClass}`]}`}
                initial={{ opacity: 0, scale: 0.92, x: '-50%', y: 'calc(-50% + 24px)' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.94, x: '-50%', y: 'calc(-50% + 16px)' }}
                transition={{ duration: 0.35, ease: [0.34, 1.1, 0.64, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label={label}
              >
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitleRow}>
                    <div className={`${styles.modalDot} ${styles[`dot_${colorClass}`]}`} />
                    <h2 className={`${styles.modalTitle} ${styles[`title_${colorClass}`]}`}>{label}</h2>
                  </div>
                  <button className={styles.closeBtn} onClick={onToggle} aria-label="Close">✕</button>
                </div>
                <div className={styles.modalBody}>
                  <NodeContent contentKey={config.key} content={content} colorClass={colorClass} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

function NodeContent({ contentKey, content, colorClass }) {
  if (contentKey === 'questions' && Array.isArray(content)) {
    return (
      <ul className={styles.questionList}>
        {content.map((q, i) => (
          <li key={i} className={`${styles.questionItem} ${styles[`q_${colorClass}`]}`}>
            {q}
          </li>
        ))}
      </ul>
    )
  }

  const text = typeof content === 'string' ? content : JSON.stringify(content)
  return (
    <div className={styles.paragraphs}>
      {text.split('\n\n').map((para, i) =>
        para.trim() ? <p key={i}>{para.trim()}</p> : null
      )}
    </div>
  )
}