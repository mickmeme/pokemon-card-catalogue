import { useState } from 'react'
import styles from './CardImage.module.css'

export default function CardImage({ src, large, alt, className }) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`${styles.placeholder} ${className ?? ''}`}>
        <span className={styles.icon}>◻</span>
        <span className={styles.label}>{alt}</span>
        <span className={styles.sub}>No image available</span>
      </div>
    )
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        // Try the large image as a fallback before giving up
        if (currentSrc === src && large && large !== src) {
          setCurrentSrc(large)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}
