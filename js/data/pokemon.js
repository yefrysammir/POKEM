/**
 * BASE DE DATOS DE POKÉMON/MONSTRUOS
 * Incluye estadísticas, evoluciones y movimientos posibles
 */

export const POKEMON_DB = {
  // Iniciales y comunes
  bulbasaur: {
    id: 1,
    name: 'Bulbasaur',
    types: ['grass', 'poison'],
    baseStats: { hp: 90, attack: 118, defense: 111, speed: 90 },
    evolutions: ['ivysaur'],
    evolutionLevel: 16,
    rarity: 'common',
    candyToEvolve: 25
  },
  ivysaur: {
    id: 2,
    name: 'Ivysaur',
    types: ['grass', 'poison'],
    baseStats: { hp: 120, attack: 151, defense: 143, speed: 120 },
    evolutions: ['venusaur'],
    evolutionLevel: 32,
    rarity: 'uncommon',
    candyToEvolve: 100
  },
  venusaur: {
    id: 3,
    name: 'Venusaur',
    types: ['grass', 'poison'],
    baseStats: { hp: 160, attack: 198, defense: 189, speed: 160 },
    evolutions: [],
    rarity: 'rare',
    candyToEvolve: 0
  },
  charmander: {
    id: 4,
    name: 'Charmander',
    types: ['fire'],
    baseStats: { hp: 78, attack: 116, defense: 93, speed: 100 },
    evolutions: ['charmeleon'],
    evolutionLevel: 16,
    rarity: 'common',
    candyToEvolve: 25
  },
  charmeleon: {
    id: 5,
    name: 'Charmeleon',
    types: ['fire'],
    baseStats: { hp: 116, attack: 158, defense: 126, speed: 140 },
    evolutions: ['charizard'],
    evolutionLevel: 36,
    rarity: 'uncommon',
    candyToEvolve: 100
  },
  charizard: {
    id: 6,
    name: 'Charizard',
    types: ['fire', 'flying'],
    baseStats: { hp: 156, attack: 223, defense: 173, speed: 180 },
    evolutions: [],
    rarity: 'rare',
    candyToEvolve: 0
  },
  squirtle: {
    id: 7,
    name: 'Squirtle',
    types: ['water'],
    baseStats: { hp: 88, attack: 94, defense: 121, speed: 90 },
    evolutions: ['wartortle'],
    evolutionLevel: 16,
    rarity: 'common',
    candyToEvolve: 25
  },
  wartortle: {
    id: 8,
    name: 'Wartortle',
    types: ['water'],
    baseStats: { hp: 118, attack: 126, defense: 155, speed: 120 },
    evolutions: ['blastoise'],
    evolutionLevel: 36,
    rarity: 'uncommon',
    candyToEvolve: 100
  },
  blastoise: {
    id: 9,
    name: 'Blastoise',
    types: ['water'],
    baseStats: { hp: 158, attack: 171, defense: 207, speed: 160 },
    evolutions: [],
    rarity: 'rare',
    candyToEvolve: 0
  },
  
  // Pokémon comunes de ruta
  pidgey: {
    id: 16,
    name: 'Pidgey',
    types: ['normal', 'flying'],
    baseStats: { hp: 80, attack: 85, defense: 76, speed: 95 },
    evolutions: ['pidgeotto'],
    evolutionLevel: 18,
    rarity: 'common',
    candyToEvolve: 12
  },
  pidgeotto: {
    id: 17,
    name: 'Pidgeotto',
    types: ['normal', 'flying'],
    baseStats: { hp: 126, attack: 117, defense: 105, speed: 135 },
    evolutions: ['pidgeot'],
    evolutionLevel: 36,
    rarity: 'uncommon',
    candyToEvolve: 50
  },
  pidgeot: {
    id: 18,
    name: 'Pidgeot',
    types: ['normal', 'flying'],
    baseStats: { hp: 166, attack: 166, defense: 154, speed: 175 },
    evolutions: [],
    rarity: 'rare',
    candyToEvolve: 0
  },
  rattata: {
    id: 19,
    name: 'Rattata',
    types: ['normal'],
    baseStats: { hp: 60, attack: 103, defense: 70, speed: 110 },
    evolutions: ['raticate'],
    evolutionLevel: 20,
    rarity: 'common',
    candyToEvolve: 25
  },
  raticate: {
    id: 20,
    name: 'Raticate',
    types: ['normal'],
    baseStats: { hp: 110, attack: 161, defense: 139, speed: 150 },
    evolutions: [],
    rarity: 'uncommon',
    candyToEvolve: 0
  },
  caterpie: {
    id: 10,
    name: 'Caterpie',
    types: ['bug'],
    baseStats: { hp: 90, attack: 55, defense: 55, speed: 85 },
    evolutions: ['metapod'],
    evolutionLevel: 7,
    rarity: 'common',
    candyToEvolve: 12
  },
  metapod: {
    id: 11,
    name: 'Metapod',
    types: ['bug'],
    baseStats: { hp: 100, attack: 45, defense: 80, speed: 60 },
    evolutions: ['butterfree'],
    evolutionLevel: 10,
    rarity: 'common',
    candyToEvolve: 50
  },
  butterfree: {
    id: 12,
    name: 'Butterfree',
    types: ['bug', 'flying'],
    baseStats: { hp: 120, attack: 167, defense: 137, speed: 140 },
    evolutions: [],
    rarity: 'uncommon',
    candyToEvolve: 0
  },
  weedle: {
    id: 13,
    name: 'Weedle',
    types: ['bug', 'poison'],
    baseStats: { hp: 80, attack: 63, defense: 50, speed: 85 },
    evolutions: ['kakuna'],
    evolutionLevel: 7,
    rarity: 'common',
    candyToEvolve: 12
  },
  kakuna: {
    id: 14,
    name: 'Kakuna',
    types: ['bug', 'poison'],
    baseStats: { hp: 90, attack: 46, defense: 75, speed: 60 },
    evolutions: ['beedrill'],
    evolutionLevel: 10,
    rarity: 'common',
    candyToEvolve: 50
  },
  beedrill: {
    id: 15,
    name: 'Beedrill',
    types: ['bug', 'poison'],
    baseStats: { hp: 130, attack: 169, defense: 130, speed: 145 },
    evolutions: [],
    rarity: 'uncommon',
    candyToEvolve: 0
  },
  
  // Pokémon raros
  pikachu: {
    id: 25,
    name: 'Pikachu',
    types: ['electric'],
    baseStats: { hp: 70, attack: 112, defense: 96, speed: 130 },
    evolutions: ['raichu'],
    evolutionLevel: null, // Requiere piedra
    rarity: 'rare',
    candyToEvolve: 50,
    itemToEvolve: 'thunder-stone'
  },
  raichu: {
    id: 26,
    name: 'Raichu',
    types: ['electric'],
    baseStats: { hp: 120, attack: 193, defense: 151, speed: 170 },
    evolutions: [],
    rarity: 'epic',
    candyToEvolve: 0
  },
  abra: {
    id: 63,
    name: 'Abra',
    types: ['psychic'],
    baseStats: { hp: 50, attack: 195, defense: 82, speed: 120 },
    evolutions: ['kadabra'],
    evolutionLevel: 16,
    rarity: 'uncommon',
    candyToEvolve: 25
  },
  kadabra: {
    id: 64,
    name: 'Kadabra',
    types: ['psychic'],
    baseStats: { hp: 80, attack: 232, defense: 117, speed: 150 },
    evolutions: ['alakazam'],
    evolutionLevel: null, // Requiere intercambio/simulado
    rarity: 'rare',
    candyToEvolve: 100
  },
  alakazam: {
    id: 65,
    name: 'Alakazam',
    types: ['psychic'],
    baseStats: { hp: 110, attack: 271, defense: 167, speed: 180 },
    evolutions: [],
    rarity: 'epic',
    candyToEvolve: 0
  },
  machop: {
    id: 66,
    name: 'Machop',
    types: ['fighting'],
    baseStats: { hp: 140, attack: 137, defense: 82, speed: 100 },
    evolutions: ['machoke'],
    evolutionLevel: 28,
    rarity: 'uncommon',
    candyToEvolve: 25
  },
  machoke: {
    id: 67,
    name: 'Machoke',
    types: ['fighting'],
    baseStats: { hp: 160, attack: 177, defense: 125, speed: 130 },
    evolutions: ['machamp'],
    evolutionLevel: null,
    rarity: 'rare',
    candyToEvolve: 100
  },
  machamp: {
    id: 68,
    name: 'Machamp',
    types: ['fighting'],
    baseStats: { hp: 180, attack: 234, defense: 159, speed: 150 },
    evolutions: [],
    rarity: 'epic',
    candyToEvolve: 0
  },
  geodude: {
    id: 74,
    name: 'Geodude',
    types: ['rock', 'ground'],
    baseStats: { hp: 80, attack: 132, defense: 132, speed: 60 },
    evolutions: ['graveler'],
    evolutionLevel: 25,
    rarity: 'common',
    candyToEvolve: 25
  },
  graveler: {
    id: 75,
    name: 'Graveler',
    types: ['rock', 'ground'],
    baseStats: { hp: 110, attack: 164, defense: 164, speed: 90 },
    evolutions: ['golem'],
    evolutionLevel: null,
    rarity: 'uncommon',
    candyToEvolve: 100
  },
  golem: {
    id: 76,
    name: 'Golem',
    types: ['rock', 'ground'],
    baseStats: { hp: 160, attack: 211, defense: 198, speed: 120 },
    evolutions: [],
    rarity: 'rare',
    candyToEvolve: 0
  },
  
  // Legendarios (Raids 5 estrellas)
  articuno: {
    id: 144,
    name: 'Articuno',
    types: ['ice', 'flying'],
    baseStats: { hp: 180, attack: 192, defense: 236, speed: 170 },
    evolutions: [],
    rarity: 'legendary',
    candyToEvolve: 0,
    isLegendary: true
  },
  zapdos: {
    id: 145,
    name: 'Zapdos',
    types: ['electric', 'flying'],
    baseStats: { hp: 180, attack: 253, defense: 185, speed: 180 },
    evolutions: [],
    rarity: 'legendary',
    candyToEvolve: 0,
    isLegendary: true
  },
  moltres: {
    id: 146,
    name: 'Moltres',
    types: ['fire', 'flying'],
    baseStats: { hp: 180, attack: 251, defense: 181, speed: 180 },
    evolutions: [],
    rarity: 'legendary',
    candyToEvolve: 0,
    isLegendary: true
  },
  mewtwo: {
    id: 150,
    name: 'Mewtwo',
    types: ['psychic'],
    baseStats: { hp: 214, attack: 300, defense: 182, speed: 200 },
    evolutions: [],
    rarity: 'legendary',
    candyToEvolve: 0,
    isLegendary: true
  },
  mew: {
    id: 151,
    name: 'Mew',
    types: ['psychic'],
    baseStats: { hp: 200, attack: 210, defense: 210, speed: 190 },
    evolutions: [],
    rarity: 'legendary',
    candyToEvolve: 0,
    isLegendary: true
  },
  
  // Dragones pseudo-legendarios
  dratini: {
    id: 147,
    name: 'Dratini',
    types: ['dragon'],
    baseStats: { hp: 82, attack: 119, defense: 91, speed: 100 },
    evolutions: ['dragonair'],
    evolutionLevel: 30,
    rarity: 'rare',
    candyToEvolve: 25
  },
  dragonair: {
    id: 148,
    name: 'Dragonair',
    types: ['dragon'],
    baseStats: { hp: 122, attack: 163, defense: 138, speed: 140 },
    evolutions: ['dragonite'],
    evolutionLevel: 55,
    rarity: 'epic',
    candyToEvolve: 100
  },
  dragonite: {
    id: 149,
    name: 'Dragonite',
    types: ['dragon', 'flying'],
    baseStats: { hp: 182, attack: 263, defense: 198, speed: 180 },
    evolutions: [],
    rarity: 'legendary',
    candyToEvolve: 0
  }
};

/**
 * Obtiene un Pokémon por su ID o nombre
 */
export function getPokemon(idOrName) {
  if (typeof idOrName === 'number') {
    return Object.values(POKEMON_DB).find(p => p.id === idOrName) || null;
  }
  return POKEMON_DB[idOrName.toLowerCase()] || null;
}

/**
 * Obtiene Pokémon por rareza
 */
export function getPokemonByRarity(rarity) {
  return Object.values(POKEMON_DB).filter(p => p.rarity === rarity);
}

/**
 * Obtiene Pokémon aleatorio ponderado por rareza
 */
export function getRandomPokemon() {
  const rand = Math.random();
  let rarity;
  
  if (rand < 0.01) rarity = 'legendary';
  else if (rand < 0.05) rarity = 'epic';
  else if (rand < 0.15) rarity = 'rare';
  else if (rand < 0.40) rarity = 'uncommon';
  else rarity = 'common';
  
  const pool = getPokemonByRarity(rarity);
  if (pool.length === 0) return getPokemonByRarity('common')[0];
  
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Calcula estadísticas de un Pokémon a nivel específico
 */
export function calculateStats(basePokemon, level = 1, ivs = { attack: 10, defense: 10, hp: 10 }) {
  const cpMultiplier = Math.pow((level * 0.1332921), 2) / 100 + 0.094;
  
  return {
    hp: Math.floor((basePokemon.baseStats.hp + ivs.hp) * cpMultiplier),
    attack: Math.floor((basePokemon.baseStats.attack + ivs.attack) * cpMultiplier),
    defense: Math.floor((basePokemon.baseStats.defense + ivs.defense) * cpMultiplier),
    speed: basePokemon.baseStats.speed
  };
}

/**
 * Calcula el CP (Combat Power) de un Pokémon
 */
export function calculateCP(basePokemon, level, ivs) {
  const stats = calculateStats(basePokemon, level, ivs);
  return Math.floor(Math.sqrt(stats.hp) * Math.sqrt(stats.attack) * Math.sqrt(stats.defense) / 10);
}

/**
 * Calcula porcentaje de IVs perfectos
 */
export function calculateIVPercentage(ivs) {
  const maxIV = 45; // 15 max por stat × 3
  const currentIV = ivs.attack + ivs.defense + ivs.hp;
  return Math.round((currentIV / maxIV) * 100);
}
