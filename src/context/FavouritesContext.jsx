import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pokemon-favourites'
const FavouritesContext = createContext(null)

export function FavouritesProvider({ children }) {
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs))
  }, [favs])

  const toggle = (card) =>
    setFavs((prev) => {
      const next = { ...prev }
      if (next[card.id]) delete next[card.id]
      else next[card.id] = card
      return next
    })

  const isFav = (id) => Boolean(favs[id])

  return (
    <FavouritesContext.Provider value={{ favs, toggle, isFav }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export const useFavourites = () => useContext(FavouritesContext)
