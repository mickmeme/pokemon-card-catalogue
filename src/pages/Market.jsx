import { useEffect, useState, useMemo } from 'react'
import { useFavourites } from '../context/FavouritesContext'
import { getCardsByIds } from '../api/pokemontcg'
import { getRarityTier, RARE_RARITIES } from '../utils/rarity'
import { checkCache, storePrices, formatCachedAt } from '../utils/priceCache'
import CardImage from '../components/CardImage'
import styles from './Market.module.css'
import cardStyles from './SetDetail.module.css'

function bestTcgPrice(tcgplayer) {
  if (!tcgplayer?.prices) return null
  const variants = tcgplayer.prices
  const preferred = ['holofoil', 'normal', 'reverseHolofoil', '1stEditionHolofoil', '1stEditionNormal']
  for (const v of preferred) {
    if (variants[v]?.market != null) return { market: variants[v].market, low: variants[v].low, variant: v }
  }
  const first = Object.entries(variants).find(([, p]) => p?.market != null)
  if (first) return { market: first[1].market, low: first[1].low, variant: first[0] }
  return null
}

function bestCmPrice(cardmarket) {
  if (!cardmarket?.prices) return null
  const p = cardmarket.prices
  const trend = p.trendPrice ?? p.averageSellPrice ?? null
  const low = p.lowPrice ?? null
  return (trend != null || low != null) ? { trend, low } : null
}

// Lowest available asking price across both platforms (for sorting)
function lowestAskingPrice(tcg, cm) {
  const prices = []
  if (tcg?.low != null) prices.push(tcg.low)
  if (cm?.low != null) prices.push(cm.low)
  return prices.length ? Math.min(...prices) : null
}

function ebaySearchUrl(card) {
  const query = `${card.name} ${card.set?.name ?? ''} pokemon card`
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&_sacat=2536&LH_BIN=1`
}

function ebayPsaUrl(card, grade) {
  // Sold/completed listings give real transaction prices, not just asking prices
  const query = `PSA ${grade} ${card.name} ${card.set?.name ?? ''} pokemon`
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&_sacat=2536&LH_Sold=1&LH_Complete=1`
}

const PSA_GRADES = ['10', '9.5', '9']

function formatPrice(n, currency = '$') {
  if (n == null) return '—'
  return `${currency}${n.toFixed(2)}`
}

function variantLabel(v) {
  return (
    {
      holofoil: 'Holo',
      normal: 'Normal',
      reverseHolofoil: 'Rev. Holo',
      '1stEditionHolofoil': '1st Ed. Holo',
      '1stEditionNormal': '1st Ed.',
    }[v] ?? v
  )
}

export default function Market() {
  const { favs } = useFavourites()
  const favIds = Object.keys(favs)

  // prices: { [cardId]: { tcgplayer, cardmarket, cachedAt } }
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetchingCount, setFetchingCount] = useState(0)
  const [error, setError] = useState(null)
  const [flipped, setFlipped] = useState({})

  useEffect(() => {
    if (favIds.length === 0) { setPrices({}); return }

    const { fresh, staleIds } = checkCache(favIds)

    // Populate immediately with whatever is cached
    setPrices({ ...fresh })

    if (staleIds.length === 0) return

    setLoading(true)
    setFetchingCount(staleIds.length)
    setError(null)

    getCardsByIds(staleIds)
      .then((fetched) => {
        storePrices(fetched)
        const now = Date.now()
        const newEntries = Object.fromEntries(
          fetched.map((c) => [c.id, { tcgplayer: c.tcgplayer ?? null, cardmarket: c.cardmarket ?? null, cachedAt: now }])
        )
        setPrices((prev) => ({ ...prev, ...newEntries }))
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favIds.join(',')])

  const enriched = useMemo(() =>
    Object.values(favs).map((c) => {
      const p = prices[c.id]
      const _tcg = bestTcgPrice(p?.tcgplayer)
      const _cm  = bestCmPrice(p?.cardmarket)
      const _cachedAt = p?.cachedAt ?? null
      return { ...c, _tcg, _cm, _cachedAt, _sortPrice: lowestAskingPrice(_tcg, _cm) }
    }),
    [favs, prices]
  )

  const sorted = useMemo(() =>
    [...enriched].sort((a, b) => {
      if (a._sortPrice == null && b._sortPrice == null) return 0
      if (a._sortPrice == null) return 1
      if (b._sortPrice == null) return -1
      return b._sortPrice - a._sortPrice  // most expensive first
    }),
    [enriched]
  )

  const toggleFlip = (id) => setFlipped((p) => ({ ...p, [id]: !p[id] }))

  if (favIds.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <h1 className={styles.title}>Market Prices</h1>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>💰</p>
            <p>No favourites yet.</p>
            <p>Star cards in any set to see their current prices here.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Market Prices</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.statusBar}>
          {sorted.length > 0 && (
            <span className={styles.count}>{sorted.length} card{sorted.length !== 1 ? 's' : ''} · sorted by lowest price</span>
          )}
          {loading && (
            <span className={styles.fetching}>Fetching {fetchingCount} updated price{fetchingCount !== 1 ? 's' : ''}…</span>
          )}
        </div>

        {loading && <p className={styles.status}>Fetching current prices…</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && (
          <div className={styles.list}>
            {sorted.map((card) => (
              <div key={card.id} className={styles.row}>
                {/* Card thumbnail with flip */}
                <div
                  className={`${cardStyles.cardWrapper} ${cardStyles[getRarityTier(card.rarity)]} ${styles.thumb} ${flipped[card.id] ? cardStyles.flipped : ''}`}
                  onClick={() => toggleFlip(card.id)}
                >
                  <div className={cardStyles.cardInner}>
                    <div className={cardStyles.cardFront}>
                      <CardImage src={card.images?.small} large={card.images?.large} alt={card.name} className={cardStyles.cardImg} />
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
                      <CardImage src={card.images?.large ?? card.images?.small} alt={card.name} className={cardStyles.cardImgLarge} />
                    </div>
                  </div>
                </div>

                {/* Info & prices */}
                <div className={styles.info}>
                  <div className={styles.cardTitle}>
                    <span className={styles.cardName}>{card.name}</span>
                    <span className={styles.setName}>{card.set?.name} #{card.number}</span>
                  </div>

                  <div className={styles.prices}>
                    {/* TCGPlayer */}
                    <div className={styles.priceBlock}>
                      <span className={styles.platform}>TCGPlayer</span>
                      {card._tcg ? (
                        <>
                          <span className={styles.priceMain}>{formatPrice(card._tcg.low)}</span>
                          <span className={styles.priceSub}>low · {variantLabel(card._tcg.variant)}</span>
                          {card._tcg.market != null && (
                            <div className={styles.priceBreakdown}>
                              <span className={styles.priceTier}>Market: <b>{formatPrice(card._tcg.market)}</b></span>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className={styles.noPrice}>No data</span>
                      )}
                    </div>

                    <div className={styles.priceDivider} />

                    {/* Cardmarket */}
                    <div className={styles.priceBlock}>
                      <span className={styles.platform}>Cardmarket</span>
                      {card._cm != null ? (
                        <>
                          <span className={styles.priceMain}>{formatPrice(card._cm.low, '€')}</span>
                          <span className={styles.priceSub}>low price</span>
                          {card._cm.trend != null && (
                            <div className={styles.priceBreakdown}>
                              <span className={styles.priceTier}>Trend: <b>{formatPrice(card._cm.trend, '€')}</b></span>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className={styles.noPrice}>No data</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.links}>
                    {card.tcgplayer?.url && (
                      <a href={card.tcgplayer.url} target="_blank" rel="noreferrer" className={`${styles.link} ${styles.linkTcg}`}>
                        TCGPlayer →
                      </a>
                    )}
                    {card.cardmarket?.url && (
                      <a href={card.cardmarket.url} target="_blank" rel="noreferrer" className={`${styles.link} ${styles.linkCm}`}>
                        Cardmarket →
                      </a>
                    )}
                    <a href={ebaySearchUrl(card)} target="_blank" rel="noreferrer" className={`${styles.link} ${styles.linkEbay}`}>
                      eBay listings →
                    </a>
                  </div>

                  {card._cachedAt && (
                    <p className={styles.cacheStamp}>
                      Prices last updated {formatCachedAt(card._cachedAt)}
                    </p>
                  )}

                  <div className={styles.psaSection}>
                    <div className={styles.psaHeader}>
                      <span className={styles.psaTitle}>PSA Graded — recent sold prices</span>
                      <span className={styles.psaNote}>Opens eBay completed listings</span>
                    </div>
                    <div className={styles.psaGrades}>
                      {PSA_GRADES.map((grade) => (
                        <a
                          key={grade}
                          href={ebayPsaUrl(card, grade)}
                          target="_blank"
                          rel="noreferrer"
                          className={`${styles.psaBtn} ${styles[`psa${grade.replace('.', '')}`]}`}
                        >
                          <span className={styles.psaGradeNum}>PSA {grade}</span>
                          <span className={styles.psaSoldLabel}>View sold →</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
