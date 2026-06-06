import { RARE_RARITIES } from './rarity'

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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

  const groupsHtml = groups.map(({ set, cards: setCards }) => {
    const cardsHtml = setCards.map(card => {
      const isRare = RARE_RARITIES.has(card.rarity)
      return `<div class="card${isRare ? ' rare' : ''}">
  <img src="${esc(card.images?.small ?? '')}" alt="${esc(card.name)}" loading="lazy" />
  <div class="label">
    <span class="name">${esc(card.name)}</span>
    ${card.number ? `<span class="number">#${esc(card.number)}</span>` : ''}
    ${card.rarity ? `<span class="rarity${isRare ? ' is-rare' : ''}">${esc(card.rarity)}</span>` : ''}
  </div>
</div>`
    }).join('\n')

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

    main { max-width: 1400px; margin: 0 auto; padding: 2rem 1rem; }

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
    </div>
  </header>
  <main>
${groupsHtml}
  </main>
  <footer>
    Card data and images from the <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">Pokemon TCG API</a>
  </footer>
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
