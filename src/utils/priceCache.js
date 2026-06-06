const CACHE_KEY = 'pokemon-price-cache'
const TTL_MS = 24 * 60 * 60 * 1000

function read() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) ?? {} }
  catch { return {} }
}

function write(cache) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)) }
  catch (e) { console.warn('Price cache write failed:', e) }
}

// Returns { fresh: { [id]: {tcgplayer, cardmarket, cachedAt} }, staleIds: string[] }
export function checkCache(ids) {
  const cache = read()
  const now = Date.now()
  const fresh = {}
  const staleIds = []

  for (const id of ids) {
    const entry = cache[id]
    if (entry && now - entry.cachedAt < TTL_MS) {
      fresh[id] = entry
    } else {
      staleIds.push(id)
    }
  }

  return { fresh, staleIds }
}

// Persist pricing fields from a list of freshly-fetched card objects
export function storePrices(cards) {
  const cache = read()
  const now = Date.now()
  for (const card of cards) {
    cache[card.id] = {
      tcgplayer: card.tcgplayer ?? null,
      cardmarket: card.cardmarket ?? null,
      cachedAt: now,
    }
  }
  write(cache)
}

export function formatCachedAt(ts) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
