const BASE_URL = 'https://api.pokemontcg.io/v2'

async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getSets() {
  const data = await apiFetch('/sets?orderBy=releaseDate&pageSize=250')
  return data.data
}

export async function getCardsByIds(ids) {
  if (ids.length === 0) return []
  const BATCH = 20
  const results = []
  for (let i = 0; i < ids.length; i += BATCH) {
    const q = ids.slice(i, i + BATCH).map((id) => `id:${id}`).join(' OR ')
    const data = await apiFetch(`/cards?q=${encodeURIComponent(q)}&pageSize=${BATCH}`)
    results.push(...data.data)
  }
  return results
}

export async function getCardsForSet(setId) {
  const allCards = []
  let page = 1
  const pageSize = 250

  while (true) {
    const data = await apiFetch(
      `/cards?q=set.id:${setId}&orderBy=number&pageSize=${pageSize}&page=${page}`
    )
    allCards.push(...data.data)
    if (allCards.length >= data.totalCount) break
    page++
  }

  return allCards
}
