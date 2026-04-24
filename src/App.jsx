import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import InputScreen from './components/InputScreen'
import LoadingScreen from './components/LoadingScreen'
import ResultsScreen from './components/ResultsScreen'
import { fetchPerspectives } from './api'
import styles from './App.module.css'

const SCREENS = { INPUT: 'input', LOADING: 'loading', RESULTS: 'results' }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.INPUT)
  const [opinion, setOpinion] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(text) {
    if (!text.trim()) return
    setOpinion(text.trim())
    setError(null)
    setScreen(SCREENS.LOADING)

    try {
      const data = await fetchPerspectives(text.trim())
      setResults(data)
      setScreen(SCREENS.RESULTS)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try again.')
      setScreen(SCREENS.INPUT)
    }
  }

  function handleReset() {
    setScreen(SCREENS.INPUT)
    setResults(null)
    setOpinion('')
    setError(null)
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {screen === SCREENS.INPUT && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={styles.screenWrapper}
            >
              <InputScreen onSubmit={handleSubmit} error={error} />
            </motion.div>
          )}

          {screen === SCREENS.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.screenWrapper}
            >
              <LoadingScreen />
            </motion.div>
          )}

          {screen === SCREENS.RESULTS && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={styles.screenWrapper}
            >
              <ResultsScreen
                opinion={opinion}
                results={results}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}