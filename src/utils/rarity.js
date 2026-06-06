// Index 0 = most rare. Legacy rarities slotted into matching tiers.
export const RARITY_ORDER = [
  // Hyper Rare
  'Mega Hyper Rare',
  'Hyper Rare',
  'Rare Secret',
  'Rare Rainbow',
  'Rare Shiny GX',
  // Special Illustration Rare
  'Special Illustration Rare',
  'Classic Collection',
  // Illustration Rare
  'Illustration Rare',
  'Rare Shining',
  'Rare Shiny',
  'Amazing Rare',
  'Radiant Rare',
  'Trainer Gallery Rare Holo',
  // Ultra Rare
  'Ultra Rare',
  'ACE SPEC Rare',
  'Rare Holo VSTAR',
  'Rare Holo VMAX',
  'Rare Holo V',
  'Rare Ultra',
  // Double Rare
  'Double Rare',
  'Rare Holo GX',
  'Rare Holo EX',
  // Rare
  'Rare Holo',
  'Rare',
  // Uncommon
  'Uncommon',
  // Common
  'Common',
  'Promo',
]

export const RARE_RARITIES = new Set([
  'Mega Hyper Rare',
  'Hyper Rare',
  'Rare Secret',
  'Rare Rainbow',
  'Rare Shiny GX',
  'Special Illustration Rare',
  'Classic Collection',
  'Illustration Rare',
  'Rare Shining',
  'Rare Shiny',
  'Amazing Rare',
  'Radiant Rare',
  'Trainer Gallery Rare Holo',
  'Ultra Rare',
  'ACE SPEC Rare',
  'Rare Holo VSTAR',
  'Rare Holo VMAX',
  'Rare Holo V',
  'Rare Ultra',
  'Double Rare',
  'Rare Holo GX',
  'Rare Holo EX',
  'Rare Holo',
  'Rare',
])

export function getRarityTier(rarity) {
  switch (rarity) {
    case 'Mega Hyper Rare':
      return 'tierMegaHyperRare'
    case 'Hyper Rare':
    case 'Rare Secret':
    case 'Rare Rainbow':
    case 'Rare Shiny GX':
      return 'tierHyperRare'
    case 'Special Illustration Rare':
    case 'Classic Collection':
      return 'tierSpecialIllustrationRare'
    case 'Illustration Rare':
    case 'Rare Shining':
    case 'Rare Shiny':
    case 'Amazing Rare':
    case 'Radiant Rare':
    case 'Trainer Gallery Rare Holo':
      return 'tierIllustrationRare'
    case 'Ultra Rare':
    case 'ACE SPEC Rare':
    case 'Rare Holo VSTAR':
    case 'Rare Holo VMAX':
    case 'Rare Holo V':
    case 'Rare Ultra':
      return 'tierUltraRare'
    case 'Double Rare':
    case 'Rare Holo GX':
    case 'Rare Holo EX':
      return 'tierDoubleRare'
    case 'Rare Holo':
    case 'Rare':
      return 'tierRare'
    case 'Uncommon':
      return 'tierUncommon'
    default:
      return 'tierCommon'
  }
}

export function raritySort(a, b) {
  const ai = RARITY_ORDER.indexOf(a)
  const bi = RARITY_ORDER.indexOf(b)
  if (ai === -1 && bi === -1) return a.localeCompare(b)
  if (ai === -1) return 1
  if (bi === -1) return -1
  return ai - bi
}
