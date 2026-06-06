import { Routes, Route } from 'react-router-dom'
import { FavouritesProvider } from './context/FavouritesContext'
import GlobalNav from './components/GlobalNav'
import Home from './pages/Home'
import SetDetail from './pages/SetDetail'
import Favourites from './pages/Favourites'
import Market from './pages/Market'

export default function App() {
  return (
    <FavouritesProvider>
      <GlobalNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/set/:setId" element={<SetDetail />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </FavouritesProvider>
  )
}
