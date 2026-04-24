import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>prizm</span>
      <span className={styles.tagline}>see beyond your sight</span>
    </header>
  )
}
