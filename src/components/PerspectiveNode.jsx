import { motion, AnimatePresence } from 'framer-motion'
import styles from './PerspectiveNode.module.css'

export default function PerspectiveNode({ config, content, isOpen, onToggle, index }) {
  const { label, colorClass } = config

  return (
    <motion.div
      className={`${styles.node} ${styles[colorClass]}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <button
        className={styles.header}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className={styles.left}>
          <div className={styles.dot} />
          <span className={styles.label}>{label}</span>
        </div>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          aria-hidden
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={styles.body}
          >
            <div className={styles.content}>
              <NodeContent contentKey={config.key} content={content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function NodeContent({ contentKey, content }) {
  if (contentKey === 'questions' && Array.isArray(content)) {
    return (
      <ul className={styles.questionList}>
        {content.map((q, i) => (
          <li key={i} className={styles.questionItem}>
            {q}
          </li>
        ))}
      </ul>
    )
  }

  const text = typeof content === 'string' ? content : JSON.stringify(content)
  return (
    <>
      {text.split('\n\n').map((para, i) =>
        para.trim() ? <p key={i}>{para.trim()}</p> : null
      )}
    </>
  )
}
