import { RARE_RARITIES } from './rarity'
import { getCachedPrices } from './priceCache'

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function bestTcgPrice(tcgplayer) {
  if (!tcgplayer?.prices) return null
  const preferred = ['holofoil', 'normal', 'reverseHolofoil', '1stEditionHolofoil', '1stEditionNormal']
  for (const v of preferred) {
    if (tcgplayer.prices[v]?.market != null)
      return { market: tcgplayer.prices[v].market, low: tcgplayer.prices[v].low }
  }
  const first = Object.entries(tcgplayer.prices).find(([, p]) => p?.market != null)
  if (first) return { market: first[1].market, low: first[1].low }
  return null
}

function bestCmPrice(cardmarket) {
  if (!cardmarket?.prices) return null
  const p = cardmarket.prices
  const trend = p.trendPrice ?? p.averageSellPrice ?? null
  const low = p.lowPrice ?? null
  return (trend != null || low != null) ? { trend, low } : null
}

function fmt(n, sym = '$') {
  return n != null ? `${sym}${n.toFixed(2)}` : null
}

function buildHtml(favs) {
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

  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const prices = getCachedPrices(cards.map(c => c.id))

  let totalTcg = 0, tcgCount = 0
  let totalCm = 0, cmCount = 0
  for (const card of cards) {
    const p = prices[card.id]
    const tcg = bestTcgPrice(p?.tcgplayer)
    const cm = bestCmPrice(p?.cardmarket)
    if (tcg?.market != null) { totalTcg += tcg.market; tcgCount++ }
    if (cm?.trend != null) { totalCm += cm.trend; cmCount++ }
  }

  const totalLine = (() => {
    const parts = []
    if (tcgCount > 0) parts.push(`<span class="total-val">$${totalTcg.toFixed(2)}</span><span class="total-label"> TCGPlayer market (${tcgCount}/${cards.length} cards)</span>`)
    if (cmCount > 0) parts.push(`<span class="total-val">€${totalCm.toFixed(2)}</span><span class="total-label"> Cardmarket trend (${cmCount}/${cards.length} cards)</span>`)
    return parts.length ? parts.join('<span class="total-sep"> &nbsp;·&nbsp; </span>') : '<span class="total-label">No price data cached — visit the Market tab first</span>'
  })()

  function cardHtml(card, { showSet = false } = {}) {
    const isRare = RARE_RARITIES.has(card.rarity)
    const p = prices[card.id]
    const tcg = bestTcgPrice(p?.tcgplayer)
    const cm = bestCmPrice(p?.cardmarket)
    const priceDisplay = fmt(tcg?.market) ?? fmt(cm?.trend, '€') ?? null
    return `<div class="card${isRare ? ' rare' : ''}">
  <img src="${esc(card.images?.small ?? '')}" alt="${esc(card.name)}" loading="lazy" />
  <div class="label">
    <span class="name">${esc(card.name)}</span>
    ${card.number ? `<span class="number">#${esc(card.number)}</span>` : ''}
    ${showSet ? `<span class="number">${esc(card.set?.name ?? '')}</span>` : ''}
    ${card.rarity ? `<span class="rarity${isRare ? ' is-rare' : ''}">${esc(card.rarity)}</span>` : ''}
    ${priceDisplay ? `<span class="price${isRare ? ' price-rare' : ''}">${esc(priceDisplay)}</span>` : '<span class="price no-price">No price</span>'}
  </div>
</div>`
  }

  const groupsHtml = groups.map(({ set, cards: setCards }) => {
    const cardsHtml = setCards.map(c => cardHtml(c)).join('\n')
    return `<section class="group">
  <div class="group-header">
    ${set.images?.logo ? `<img src="${esc(set.images.logo)}" alt="${esc(set.name)}" class="set-logo" />` : ''}
    <div class="set-info">
      <span class="set-name">${esc(set.name)}</span>
      <span class="set-meta">${esc(set.series)} &middot; Released ${esc(set.releaseDate)} &middot; ${setCards.length} card${setCards.length !== 1 ? 's' : ''}</span>
    </div>
  </div>
  <div class="grid">
${cardsHtml}
  </div>
</section>`
  }).join('\n')

  const sortedByPrice = [...cards].sort((a, b) => {
    const priceOf = c => {
      const p = prices[c.id]
      return bestTcgPrice(p?.tcgplayer)?.market ?? bestCmPrice(p?.cardmarket)?.trend ?? null
    }
    const pa = priceOf(a), pb = priceOf(b)
    if (pa == null && pb == null) return 0
    if (pa == null) return 1
    if (pb == null) return -1
    return pa - pb
  })

  const byPriceHtml = sortedByPrice.map(c => cardHtml(c, { showSet: true })).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pokemon Favourites &mdash; ${cards.length} card${cards.length !== 1 ? 's' : ''}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0f0f1a;
      --surface: #1a1a2e;
      --surface2: #16213e;
      --border: #2a2a4a;
      --accent: #f7d02c;
      --accent2: #3d7dca;
      --text: #e8e8f0;
      --text-muted: #8888aa;
      --rare-glow: rgba(247, 208, 44, 0.35);
      --radius: 12px;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      min-height: 100vh;
    }
    img { display: block; max-width: 100%; }
    a { color: var(--accent2); }

    header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      border-bottom: 2px solid var(--accent);
      padding: 2rem 1rem;
    }
    .header-inner { max-width: 1400px; margin: 0 auto; }
    h1 {
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .star { color: var(--accent); }
    .subtitle { color: var(--text-muted); font-size: 0.85rem; margin-top: 0.4rem; }
    .total { font-size: 0.9rem; margin-top: 0.6rem; display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.25rem; }
    .total-val { color: var(--accent); font-weight: 800; font-size: 1.1rem; }
    .total-label { color: var(--text-muted); font-size: 0.8rem; }
    .total-sep { color: var(--border); }

    main { max-width: 1400px; margin: 0 auto; padding: 2rem 1rem; }

    .view-toggle {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    .toggle-btn {
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text-muted);
      border-radius: var(--radius);
      padding: 0.45rem 1.1rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .toggle-btn:hover { color: var(--text); border-color: var(--text-muted); }
    .toggle-btn.active {
      background: var(--accent);
      color: #1a1a2e;
      border-color: var(--accent);
    }

    .group { margin-bottom: 3rem; }
    .group-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border);
    }
    .set-logo { height: 40px; width: auto; object-fit: contain; }
    .set-info { display: flex; flex-direction: column; gap: 0.2rem; }
    .set-name { font-size: 1rem; font-weight: 700; }
    .set-meta { font-size: 0.78rem; color: var(--text-muted); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: transform 0.15s;
    }
    .card:hover { transform: translateY(-3px); }
    .card.rare {
      border-color: var(--accent);
      box-shadow: 0 0 12px var(--rare-glow);
    }
    .card img { width: 100%; aspect-ratio: 2.5/3.5; object-fit: cover; }
    .label {
      padding: 0.5rem 0.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .name { font-size: 0.78rem; font-weight: 600; line-height: 1.2; }
    .number { font-size: 0.7rem; color: var(--text-muted); }
    .rarity { font-size: 0.68rem; color: var(--text-muted); }
    .rarity.is-rare { color: var(--accent); font-weight: 600; }
    .price { font-size: 0.72rem; color: #6ecfab; font-weight: 600; margin-top: 0.15rem; }
    .price.price-rare { color: var(--accent); }
    .price.no-price { color: var(--border); font-weight: 400; }

    footer {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.78rem;
      padding: 2rem 1rem;
      border-top: 1px solid var(--border);
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <h1><span class="star">&#9733;</span> Pokemon Favourites</h1>
      <p class="subtitle">${cards.length} card${cards.length !== 1 ? 's' : ''} across ${groups.length} set${groups.length !== 1 ? 's' : ''} &mdash; Generated ${date}</p>
      <p class="total">${totalLine}</p>
    </div>
  </header>
  <main>
    <div class="view-toggle">
      <button class="toggle-btn active" onclick="setView('collection')">By Collection</button>
      <button class="toggle-btn" onclick="setView('price')">By Price</button>
    </div>
    <div id="view-collection">
${groupsHtml}
    </div>
    <div id="view-price" style="display:none">
      <div class="grid">
${byPriceHtml}
      </div>
    </div>
  </main>
  <footer>
    Card data and images from the <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">Pokemon TCG API</a>
  </footer>
  <script>
    function setView(v) {
      document.getElementById('view-collection').style.display = v === 'collection' ? '' : 'none';
      document.getElementById('view-price').style.display = v === 'price' ? '' : 'none';
      document.querySelectorAll('.toggle-btn').forEach(function(btn, i) {
        btn.classList.toggle('active', (v === 'collection' && i === 0) || (v === 'price' && i === 1));
      });
    }
  </script>
</body>
</html>`
}

export function generateReport(favs) {
  const html = buildHtml(favs)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pokemon-favourites-${new Date().toISOString().slice(0, 10)}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const GH_OWNER = 'mickmeme'
const GH_REPO = 'pokemon-card-catalogue'
const GH_BRANCH = 'gh-pages'
const GH_PATH = 'index.html'

export async function publishToGitHubPages(favs, token) {
  const html = buildHtml(favs)

  const bytes = new TextEncoder().encode(html)
  const binStr = Array.from(bytes, b => String.fromCodePoint(b)).join('')
  const content = btoa(binStr)

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }

  let sha
  try {
    const r = await fetch(
      `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_PATH}?ref=${GH_BRANCH}`,
      { headers }
    )
    if (r.ok) sha = (await r.json()).sha
  } catch {}

  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_PATH}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Update favourites report ${new Date().toISOString().slice(0, 10)}`,
        content,
        branch: GH_BRANCH,
        ...(sha ? { sha } : {}),
      }),
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `GitHub API error ${res.status}`)
  }

  return `https://${GH_OWNER}.github.io/${GH_REPO}/`
}
