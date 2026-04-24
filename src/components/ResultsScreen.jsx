import { useState } from 'react'
import { motion } from 'framer-motion'
import PerspectiveNode from './PerspectiveNode'
import { NODE_CONFIG } from '../constants'
import styles from './ResultsScreen.module.css'

export default function ResultsScreen({ opinion, results, onReset }) {
  const [openKey, setOpenKey] = useState(null)

  function handleToggle(key) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <section className={styles.screen}>
      <div className={styles.intro}>
        <p className={styles.hint}>Your view</p>
        <p className={styles.opinion}>&ldquo;{opinion}&rdquo;</p>
      </div>

      <motion.div
        className={styles.spectrumLine}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      />

      <div className={styles.nodesList}>
        {NODE_CONFIG.map((config, i) => (
          <PerspectiveNode
            key={config.key}
            config={config}
            content={results[config.key]}
            isOpen={openKey === config.key}
            onToggle={() => handleToggle(config.key)}
            index={i}
          />
        ))}
      </div>

      <motion.button
        className={styles.resetBtn}
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        ← Try another view
      </motion.button>
    </section>
  )
}
