import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSets } from '../api/pokemontcg'
import styles from './Home.module.css'

const SERIES_ORDER = [
  'Base',
  'Jungle',
  'Fossil',
  'Team Rocket',
  'Gym',
  'Neo',
  'Legendary Collection',
  'E-Card',
  'EX',
  'Diamond & Pearl',
  'Platinum',
  'HeartGold & SoulSilver',
  'Call of Legends',
  'Black & White',
  'XY',
  'Sun & Moon',
  'Sword & Shield',
  'Scarlet & Violet',
]

export default function Home() {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getSets()
      .then(setSets)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = sets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const grouped = filtered.reduce((acc, set) => {
    const series = set.series || 'Other'
    if (!acc[series]) acc[series] = []
    acc[series].push(set)
    return acc
  }, {})

  const seriesKeys = Object.keys(grouped).sort((a, b) => {
    const ai = SERIES_ORDER.indexOf(a)
    const bi = SERIES_ORDER.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <img src="/pokeball.svg" alt="Pokeball" className={styles.pokeball} />
            <h1>
              <img src="/title-logo.svg" alt="Pokémon Card Catalogue" className={styles.titleLogo} />
            </h1>
          </div>
          <p className={styles.subtitle}>All English TCG set releases</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search sets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {!loading && (
            <span className={styles.count}>{filtered.length} sets</span>
          )}
        </div>

        {loading && <p className={styles.status}>Loading sets...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && seriesKeys.map((series) => (
          <section key={series} className={styles.series}>
            <h2 className={styles.seriesTitle}>{series}</h2>
            <div className={styles.grid}>
              {grouped[series].map((set) => (
                <Link
                  key={set.id}
                  to={`/set/${set.id}`}
                  className={styles.setCard}
                >
                  {set.images?.logo && (
                    <img
                      src={set.images.logo}
                      alt={set.name}
                      className={styles.setLogo}
                      loading="lazy"
                    />
                  )}
                  <div className={styles.setInfo}>
                    <span className={styles.setName}>{set.name}</span>
                    <span className={styles.setMeta}>
                      {set.releaseDate} &middot; {set.printedTotal ?? set.total} cards
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
