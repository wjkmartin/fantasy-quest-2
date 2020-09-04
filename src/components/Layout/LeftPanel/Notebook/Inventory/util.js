export function itemColorClass(itemRarity) {
        switch (itemRarity) {
          case 0:
            return 'rarity-poor'
          case 1:
            return 'rarity-common'
          case 2: 
            return 'rarity-uncommon'
          case 3: 
            return 'rarity-rare'
          case 4: 
            return 'rarity-very-rare'
          case 5: 
            return 'rarity-legendary'
          default:
            break;
        }
}

export function itemRarityName(itemRarity) {
  switch (itemRarity) {
    case 0:
      return 'Poor'
    case 1:
      return 'Common'
    case 2: 
      return 'Uncommon'
    case 3: 
      return 'Rare'
    case 4: 
      return 'Very Rare'
    case 5: 
      return 'Legendary'
    default:
      break;
  }
}