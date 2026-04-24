import { useState } from 'react'
import styles from './InputScreen.module.css'

export default function InputScreen({ onSubmit, error }) {
  const [value, setValue] = useState('')

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(value)
    }
  }

  return (
    <section className={styles.screen}>
      <h1 className={styles.headline}>
        What&rsquo;s your<br />view?
      </h1>
      <p className={styles.sub}>
        Share an opinion — any opinion. Prizm will refract it into perspectives
        that prepare you to listen, not just respond.
      </p>

      <div className={styles.inputWrap}>
        <textarea
          className={styles.textarea}
          placeholder="e.g. Pineapple should never be on pizza."
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        {error && (
          <div className={styles.errorBox} role="alert">
            {error}
          </div>
        )}

        <button
          className={styles.submitBtn}
          onClick={() => onSubmit(value)}
          disabled={!value.trim()}
        >
          Pass it through the prism →
        </button>
      </div>
    </section>
  )
}
