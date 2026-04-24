import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Prizm</span>
      <span className={styles.tagline}>See all the colors</span>
    </header>
  )
}
