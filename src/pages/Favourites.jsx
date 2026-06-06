import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import { getRarityTier, RARE_RARITIES } from '../utils/rarity'
import { generateReport, publishToGitHubPages } from '../utils/generateReport'
import CardImage from '../components/CardImage'
import styles from './Favourites.module.css'
import cardStyles from './SetDetail.module.css'

const PAT_KEY = 'ghPat'

export default function Favourites() {
  const { favs, toggle, isFav } = useFavourites()
  const [flipped, setFlipped] = useState({})
  const [publishing, setPublishing] = useState(false)
  const [publishResult, setPublishResult] = useState(null)
  const [showPatSetup, setShowPatSetup] = useState(false)
  const [patInput, setPatInput] = useState('')

  const cards = Object.values(favs)

  const grouped = cards.reduce((acc, card) => {
    const key = card.set.id
    if (!acc[key]) acc[key] = { set: card.set, cards: [] }
    acc[key].cards.push(card)
    return acc
  }, {})

  const groups = Object.values(grouped).sort((a, b) =>
    a.set.releaseDate.localeCompare(b.set.releaseDate)
  )

  const toggleFlip = (id) =>
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))

  async function handlePublish(token) {
    setPublishing(true)
    setPublishResult(null)
    try {
      const url = await publishToGitHubPages(favs, token)
      setPublishResult({ url })
    } catch (e) {
      setPublishResult({ error: e.message })
    } finally {
      setPublishing(false)
    }
  }

  function onPublishClick() {
    const saved = localStorage.getItem(PAT_KEY)
    if (saved) {
      handlePublish(saved)
    } else {
      setShowPatSetup(true)
      setPublishResult(null)
    }
  }

  function onSaveAndPublish() {
    const token = patInput.trim()
    if (!token) return
    localStorage.setItem(PAT_KEY, token)
    setShowPatSetup(false)
    setPatInput('')
    handlePublish(token)
  }

  function onClearPat() {
    localStorage.removeItem(PAT_KEY)
    setPublishResult(null)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>
            <span className={styles.star}>★</span> Favourites
          </h1>
          {cards.length > 0 && (
            <>
              <div className={styles.subtitleRow}>
                <p className={styles.subtitle}>{cards.length} card{cards.length !== 1 ? 's' : ''} across {groups.length} set{groups.length !== 1 ? 's' : ''}</p>
                <button className={styles.exportBtn} onClick={() => generateReport(favs)}>
                  ↓ Download Report
                </button>
                <button
                  className={`${styles.exportBtn} ${styles.publishBtn}`}
                  onClick={onPublishClick}
                  disabled={publishing}
                >
                  {publishing ? 'Publishing…' : '↑ Publish to Pages'}
                </button>
                {localStorage.getItem(PAT_KEY) && (
                  <button className={styles.clearPatBtn} onClick={onClearPat} title="Clear saved GitHub token">
                    ✕ token
                  </button>
                )}
              </div>

              {showPatSetup && (
                <div className={styles.patSetup}>
                  <p className={styles.patTitle}>GitHub Personal Access Token required</p>
                  <p className={styles.patHint}>
                    Create one at <strong>github.com → Settings → Developer settings → Personal access tokens</strong>.
                    It needs <strong>repo</strong> scope (or <strong>Contents: Read and write</strong> for fine-grained tokens).
                  </p>
                  <div className={styles.patRow}>
                    <input
                      className={styles.patInput}
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      value={patInput}
                      onChange={e => setPatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && onSaveAndPublish()}
                      autoFocus
                    />
                    <button className={styles.exportBtn} onClick={onSaveAndPublish} disabled={!patInput.trim()}>
                      Save &amp; Publish
                    </button>
                    <button className={styles.clearPatBtn} onClick={() => setShowPatSetup(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {publishResult?.url && (
                <p className={styles.publishSuccess}>
                  Published! View at{' '}
                  <a href={publishResult.url} target="_blank" rel="noreferrer" className={styles.publishLink}>
                    {publishResult.url}
                  </a>
                  {' '}(may take ~30 s to update)
                </p>
              )}
              {publishResult?.error && (
                <p className={styles.publishError}>Publish failed: {publishResult.error}</p>
              )}
            </>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {cards.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>☆</p>
            <p>No favourites yet.</p>
            <p>Hover over any card and click the star to save it here.</p>
          </div>
        ) : (
          groups.map(({ set, cards: setCards }) => (
            <section key={set.id} className={styles.group}>
              <Link to={`/set/${set.id}`} className={styles.groupHeader}>
                {set.images?.logo && (
                  <img src={set.images.logo} alt={set.name} className={styles.setLogo} />
                )}
                <span className={styles.setName}>{set.name}</span>
                <span className={styles.setCount}>{setCards.length} card{setCards.length !== 1 ? 's' : ''}</span>
              </Link>
              <div className={styles.grid}>
                {setCards.map((card) => (
                  <div
                    key={card.id}
                    className={`${cardStyles.cardWrapper} ${cardStyles[getRarityTier(card.rarity)]} ${flipped[card.id] ? cardStyles.flipped : ''}`}
                    onClick={() => toggleFlip(card.id)}
                  >
                    <div className={cardStyles.cardInner}>
                      <div className={cardStyles.cardFront}>
                        <button
                          className={`${cardStyles.starBtn} ${cardStyles.starred}`}
                          onClick={(e) => { e.stopPropagation(); toggle(card) }}
                          aria-label="Remove from favourites"
                          title="Remove from favourites"
                        >
                          ★
                        </button>
                        <CardImage
                          src={card.images?.small}
                          large={card.images?.large}
                          alt={card.name}
                          className={cardStyles.cardImg}
                        />
                        <div className={cardStyles.cardLabel}>
                          <span className={cardStyles.cardName}>{card.name}</span>
                          {card.rarity && (
                            <span className={`${cardStyles.rarity} ${RARE_RARITIES.has(card.rarity) ? cardStyles.rare : ''}`}>
                              {card.rarity}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={cardStyles.cardBack}>
                        <CardImage
                          src={card.images?.large ?? card.images?.small}
                          alt={card.name}
                          className={cardStyles.cardImgLarge}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  )
}
