import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCardsForSet } from '../api/pokemontcg'
import { useFavourites } from '../context/FavouritesContext'
import { RARITY_ORDER, RARE_RARITIES, getRarityTier, raritySort } from '../utils/rarity'
import setDescriptions from '../data/setDescriptions'
import CardImage from '../components/CardImage'
import styles from './SetDetail.module.css'

export default function SetDetail() {
  const { setId } = useParams()
  const [cards, setCards] = useState([])
  const [setInfo, setSetInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRarity, setSelectedRarity] = useState('All')
  const [search, setSearch] = useState('')
  const [flipped, setFlipped] = useState({})
  const { toggle, isFav } = useFavourites()

  useEffect(() => {
    setLoading(true)
    setCards([])
    setSetInfo(null)
    setFlipped({})
    getCardsForSet(setId)
      .then((data) => {
        setCards(data)
        if (data.length > 0) setSetInfo(data[0].set)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [setId])

  const rarities = useMemo(() => {
    const r = new Set(cards.map((c) => c.rarity).filter(Boolean))
    return ['All', 'Rares Only', ...Array.from(r).sort(raritySort)]
  }, [cards])

  const filtered = useMemo(() => {
    const result = cards.filter((c) => {
      const matchRarity =
        selectedRarity === 'All'
          ? true
          : selectedRarity === 'Rares Only'
          ? RARE_RARITIES.has(c.rarity)
          : c.rarity === selectedRarity
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
      return matchRarity && matchSearch
    })

    return result.sort((a, b) => {
      const ai = RARITY_ORDER.indexOf(a.rarity ?? '')
      const bi = RARITY_ORDER.indexOf(b.rarity ?? '')
      const rarityDiff = (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
      if (rarityDiff !== 0) return rarityDiff
      const aNum = parseInt(a.number, 10)
      const bNum = parseInt(b.number, 10)
      if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum
      return (a.number ?? '').localeCompare(b.number ?? '', undefined, { numeric: true })
    })
  }, [cards, selectedRarity, search])

  const toggleFlip = (id) =>
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>
          &larr; All Sets
        </Link>
        {setInfo && (
          <div className={styles.setHeader}>
            {setInfo.images?.logo && (
              <img src={setInfo.images.logo} alt={setInfo.name} className={styles.headerLogo} />
            )}
            <div className={styles.setMeta}>
              <h1>{setInfo.name}</h1>
              <p className={styles.setStats}>
                Released: {setInfo.releaseDate} &middot; {setInfo.printedTotal ?? setInfo.total} cards
                {setInfo.series && <> &middot; {setInfo.series}</>}
              </p>
              {setDescriptions[setInfo.id] && (
                <p className={styles.setDescription}>{setDescriptions[setInfo.id]}</p>
              )}
            </div>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.rarityFilters}>
            {rarities.map((r) => (
              <button
                key={r}
                className={`${styles.rarityBtn} ${selectedRarity === r ? styles.active : ''} ${r === 'Rares Only' ? styles.raresOnly : ''}`}
                onClick={() => setSelectedRarity(r)}
              >
                {r}
              </button>
            ))}
          </div>
          {!loading && (
            <span className={styles.count}>
              {filtered.length} / {cards.length} cards
            </span>
          )}
        </div>

        {loading && <p className={styles.status}>Loading cards...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && (
          <div className={styles.grid}>
            {filtered.map((card) => (
              <div
                key={card.id}
                className={`${styles.cardWrapper} ${styles[getRarityTier(card.rarity)]} ${flipped[card.id] ? styles.flipped : ''}`}
                onClick={() => toggleFlip(card.id)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardFront}>
                    <button
                      className={`${styles.starBtn} ${isFav(card.id) ? styles.starred : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggle(card) }}
                      aria-label={isFav(card.id) ? 'Remove from favourites' : 'Add to favourites'}
                      title={isFav(card.id) ? 'Remove from favourites' : 'Add to favourites'}
                    >
                      {isFav(card.id) ? '★' : '☆'}
                    </button>
                    <CardImage
                      src={card.images?.small}
                      large={card.images?.large}
                      alt={card.name}
                      className={styles.cardImg}
                    />
                    <div className={styles.cardLabel}>
                      <span className={styles.cardName}>{card.name}</span>
                      {card.rarity && (
                        <span
                          className={`${styles.rarity} ${RARE_RARITIES.has(card.rarity) ? styles.rare : ''}`}
                        >
                          {card.rarity}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.cardBack}>
                    <CardImage
                      src={card.images?.large ?? card.images?.small}
                      alt={card.name}
                      className={styles.cardImgLarge}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className={styles.status}>No cards match your filters.</p>
        )}
      </main>
    </div>
  )
}
