import { NavLink } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import styles from './GlobalNav.module.css'

export default function GlobalNav() {
  const { favs } = useFavourites()
  const count = Object.keys(favs).length

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
      >
        Sets
      </NavLink>
      <NavLink
        to="/favourites"
        className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
      >
        Favourites
        {count > 0 && <span className={styles.badge}>{count}</span>}
      </NavLink>
      <NavLink
        to="/market"
        className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
      >
        Market Prices
        {count > 0 && <span className={styles.badge}>{count}</span>}
      </NavLink>
    </nav>
  )
}
