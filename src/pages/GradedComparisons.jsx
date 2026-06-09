import { useEffect, useState } from 'react'
import { useFavourites } from '../context/FavouritesContext'
import { getCardsByIds } from '../api/pokemontcg'
import { getRarityTier, RARE_RARITIES } from '../utils/rarity'
import { checkCache, storePrices } from '../utils/priceCache'
import CardImage from '../components/CardImage'
import styles from './GradedComparisons.module.css'
import cardStyles from './SetDetail.module.css'

function bestTcgMarket(tcgplayer) {
  if (!tcgplayer?.prices) return null
  const preferred = ['holofoil', 'normal', 'reverseHolofoil', '1stEditionHolofoil', '1stEditionNormal']
  for (const v of preferred) {
    if (tcgplayer.prices[v]?.market != null) return tcgplayer.prices[v].market
  }
  const first = Object.entries(tcgplayer.prices).find(([, p]) => p?.market != null)
  return first ? first[1].market : null
}

function ebayPsaUrl(card, grade) {
  const query = `PSA ${grade} ${card.name} ${card.set?.name ?? ''} pokemon card`
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&_sacat=2536&LH_Sold=1&LH_Complete=1`
}

const GRADES = [
  { label: 'PSA 8', value: '8', colorClass: 'psa8' },
  { label: 'PSA 9', value: '9', colorClass: 'psa9' },
  { label: 'PSA 10', value: '10', colorClass: 'psa10' },
]

export default function GradedComparisons() {
  const { favs } = useFavourites()
  const favIds = Object.keys(favs)

  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [flipped, setFlipped] = useState({})

  useEffect(() => {
    if (favIds.length === 0) { setPrices({}); return }

    const { fresh, staleIds } = checkCache(favIds)
    setPrices({ ...fresh })

    if (staleIds.length === 0) return

    setLoading(true)
    setError(null)
    getCardsByIds(staleIds)
      .then(fetched => {
        storePrices(fetched)
        const now = Date.now()
        const entries = Object.fromEntries(
          fetched.map(c => [c.id, { tcgplayer: c.tcgplayer ?? null, cardmarket: c.cardmarket ?? null, cachedAt: now }])
        )
        setPrices(prev => ({ ...prev, ...entries }))
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favIds.join(',')])

  const cards = Object.values(favs)

  if (favIds.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <h1 className={styles.title}>Graded Comparisons</h1>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>🏆</p>
            <p>No favourites yet.</p>
            <p>Star cards in any set to compare their graded values here.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Graded Comparisons</h1>
          <p className={styles.subtitle}>
            {cards.length} card{cards.length !== 1 ? 's' : ''} &mdash; ungraded prices from TCGPlayer &middot; PSA links open eBay completed sales
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {loading && <p className={styles.status}>Fetching prices&hellip;</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCard}>Card</th>
                <th className={styles.thPrice}>Ungraded</th>
                {GRADES.map(g => (
                  <th key={g.value} className={`${styles.thGrade} ${styles[g.colorClass]}`}>{g.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cards.map(card => {
                const p = prices[card.id]
                const market = bestTcgMarket(p?.tcgplayer)
                const isRare = RARE_RARITIES.has(card.rarity)

                return (
                  <tr key={card.id} className={styles.row}>
                    <td className={styles.tdCard}>
                      <div
                        className={`${cardStyles.cardWrapper} ${cardStyles[getRarityTier(card.rarity)]} ${styles.thumb} ${flipped[card.id] ? cardStyles.flipped : ''}`}
                        onClick={() => setFlipped(p => ({ ...p, [card.id]: !p[card.id] }))}
                      >
                        <div className={cardStyles.cardInner}>
                          <div className={cardStyles.cardFront}>
                            <CardImage src={card.images?.small} large={card.images?.large} alt={card.name} className={cardStyles.cardImg} />
                          </div>
                          <div className={cardStyles.cardBack}>
                            <CardImage src={card.images?.large ?? card.images?.small} alt={card.name} className={cardStyles.cardImgLarge} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardInfo}>
                        <span className={`${styles.cardName} ${isRare ? styles.rare : ''}`}>{card.name}</span>
                        <span className={styles.cardSet}>{card.set?.name} #{card.number}</span>
                        {card.rarity && (
                          <span className={`${styles.rarity} ${isRare ? styles.rareRarity : ''}`}>{card.rarity}</span>
                        )}
                      </div>
                    </td>

                    <td className={styles.tdPrice}>
                      {market != null
                        ? <span className={`${styles.priceVal} ${isRare ? styles.rare : ''}`}>${market.toFixed(2)}</span>
                        : <span className={styles.noPrice}>{p ? '—' : <span className={styles.loading}>…</span>}</span>
                      }
                      {market != null && <span className={styles.priceSub}>TCGPlayer market</span>}
                    </td>

                    {GRADES.map(g => (
                      <td key={g.value} className={styles.tdGrade}>
                        <a
                          href={ebayPsaUrl(card, g.value)}
                          target="_blank"
                          rel="noreferrer"
                          className={`${styles.psaBtn} ${styles[g.colorClass]}`}
                        >
                          <span className={styles.psaLabel}>View sold</span>
                          <span className={styles.psaArrow}>→</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
