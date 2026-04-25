import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  return (
    <section className={styles.screen}>
      <div className={styles.beamContainer}>
        <svg
          className={styles.beamSvg}
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1816" stopOpacity="0" />
              <stop offset="60%" stopColor="#1a1816" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1a1816" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main wavering beam */}
          <path
            stroke="url(#beamGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
          >
            <animate
              attributeName="d"
              values="
                M0,40 Q80,34 160,40 Q240,46 300,40;
                M0,40 Q80,46 160,40 Q240,34 300,40;
                M0,40 Q80,34 160,40 Q240,46 300,40
              "
              dur="2.2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Spectrum rays fanning out from endpoint */}
          <motion.g
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: '300px 40px' }}
          >
            <line x1="300" y1="40" x2="328" y2="18" stroke="#e05b4b" strokeWidth="1.4" opacity="0.9" />
            <line x1="300" y1="40" x2="328" y2="29" stroke="#e8874a" strokeWidth="1.4" opacity="0.9" />
            <line x1="300" y1="40" x2="328" y2="40" stroke="#d4a847" strokeWidth="1.4" opacity="0.9" />
            <line x1="300" y1="40" x2="328" y2="51" stroke="#5ba876" strokeWidth="1.4" opacity="0.9" />
          </motion.g>

          {/* Traveling dot */}
          <circle r="3.5" fill="#1a1816">
            <animateMotion
              dur="2.2s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            >
              <mpath href="#beamPath" />
            </animateMotion>
          </circle>

          {/* Hidden path for animateMotion reference */}
          <path
            id="beamPath"
            d="M0,40 Q80,34 160,40 Q240,46 300,40"
            stroke="none"
            fill="none"
          />
        </svg>
      </div>

      <motion.p
        className={styles.label}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        refracting your view
      </motion.p>
      <motion.p
        className={styles.sublabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        listen first, discuss second!
      </motion.p>
    </section>
  )
}
