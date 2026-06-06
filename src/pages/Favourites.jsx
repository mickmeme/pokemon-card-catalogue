import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import { getRarityTier, RARE_RARITIES } from '../utils/rarity'
import { generateReport } from '../utils/generateReport'
import CardImage from '../components/CardImage'
import styles from './Favourites.module.css'
import cardStyles from './SetDetail.module.css'

export default function Favourites() {
  const { favs, toggle, isFav } = useFavourites()
  const [flipped, setFlipped] = useState({})

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

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>
            <span className={styles.star}>★</span> Favourites
          </h1>
          {cards.length > 0 && (
            <div className={styles.subtitleRow}>
              <p className={styles.subtitle}>{cards.length} card{cards.length !== 1 ? 's' : ''} across {groups.length} set{groups.length !== 1 ? 's' : ''}</p>
              <button className={styles.exportBtn} onClick={() => generateReport(favs)}>
                ↓ Download Report
              </button>
            </div>
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
