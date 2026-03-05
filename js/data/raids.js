/**
 * CONFIGURACIÓN DEL SISTEMA DE RAIDS
 * Dificultades, recompensas y bosses
 */

import { POKEMON_DB } from './pokemon.js';

export const RAID_CONFIG = {
  // Configuración por nivel de estrellas
  tiers: {
    1: {
      name: 'Normal',
      color: '#FFD700',
      minLevel: 1,
      maxPlayers: 4,
      timeLimit: 180000, // 3 minutos
      catchChance: 0.7,
      rewards: {
        xp: 3000,
        dust: 500,
        items: ['poke-ball', 'potion', 'revive']
      }
    },
    2: {
      name: 'Rare',
      color: '#FF6B6B',
      minLevel: 5,
      maxPlayers: 6,
      timeLimit: 180000,
      catchChance: 0.6,
      rewards: {
        xp: 3500,
        dust: 600,
        items: ['great-ball', 'super-potion', 'revive']
      }
    },
    3: {
      name: 'Rare+',
      color: '#A29BFE',
      minLevel: 10,
      maxPlayers: 8,
      timeLimit: 300000, // 5 minutos
      catchChance: 0.5,
      rewards: {
        xp: 5000,
        dust: 800,
        items: ['great-ball', 'hyper-potion', 'revive', 'razz-berry']
      }
    },
    4: {
      name: 'Epic',
      color: '#FD79A8',
      minLevel: 15,
      maxPlayers: 12,
      timeLimit: 300000,
      catchChance: 0.4,
      rewards: {
        xp: 7000,
        dust: 1000,
        items: ['ultra-ball', 'hyper-potion', 'max-revive', 'razz-berry']
      }
    },
    5: {
      name: 'Legendary',
      color: '#00D9FF',
      minLevel: 20,
      maxPlayers: 20,
      timeLimit: 600000, // 10 minutos
      catchChance: 0.1,
      rewards: {
        xp: 10000,
        dust: 1500,
        items: ['premier-ball', 'max-potion', 'max-revive', 'golden-razz-berry']
      }
    }
  },

  // Bosses disponibles por tier
  bosses: {
    1: [
      { pokemon: 'bulbasaur', cp: 3000 },
      { pokemon: 'charmander', cp: 3000 },
      { pokemon: 'squirtle', cp: 3000 },
      { pokemon: 'pidgey', cp: 2500 },
      { pokemon: 'rattata', cp: 2500 },
      { pokemon: 'caterpie', cp: 2000 },
      { pokemon: 'weedle', cp: 2000 }
    ],
    2: [
      { pokemon: 'ivysaur', cp: 6000 },
      { pokemon: 'charmeleon', cp: 6000 },
      { pokemon: 'wartortle', cp: 6000 },
      { pokemon: 'pikachu', cp: 5500 },
      { pokemon: 'abra', cp: 5000 },
      { pokemon: 'machop', cp: 5500 }
    ],
    3: [
      { pokemon: 'venusaur', cp: 12000 },
      { pokemon: 'charizard', cp: 12000 },
      { pokemon: 'blastoise', cp: 12000 },
      { pokemon: 'raichu', cp: 11000 },
      { pokemon: 'alakazam', cp: 13000 },
      { pokemon: 'machamp', cp: 12500 }
    ],
    4: [
      { pokemon: 'golem', cp: 20000 },
      { pokemon: 'dragonair', cp: 22000 },
      { pokemon: 'pidgeot', cp: 18000 },
      { pokemon: 'beedrill', cp: 19000 },
      { pokemon: 'butterfree', cp: 18500 }
    ],
    5: [
      { pokemon: 'articuno', cp: 35000 },
      { pokemon: 'zapdos', cp: 35000 },
      { pokemon: 'moltres', cp: 35000 },
      { pokemon: 'mewtwo', cp: 45000 },
      { pokemon: 'mew', cp: 40000 },
      { pokemon: 'dragonite', cp: 38000 }
    ]
  },

  // Recompensas adicionales por tier
  bonusRewards: {
    1: {
      guaranteed: { 'poke-ball': 5, 'stardust': 500 },
      random: [
        { item: 'potion', chance: 0.5, quantity: 3 },
        { item: 'revive', chance: 0.3, quantity: 1 },
        { item: 'razz-berry', chance: 0.2, quantity: 3 }
      ]
    },
    2: {
      guaranteed: { 'great-ball': 5, 'stardust': 600 },
      random: [
        { item: 'super-potion', chance: 0.5, quantity: 3 },
        { item: 'revive', chance: 0.4, quantity: 2 },
        { item: 'razz-berry', chance: 0.3, quantity: 3 }
      ]
    },
    3: {
      guaranteed: { 'great-ball': 8, 'stardust': 800 },
      random: [
        { item: 'hyper-potion', chance: 0.5, quantity: 3 },
        { item: 'revive', chance: 0.4, quantity: 3 },
        { item: 'razz-berry', chance: 0.4, quantity: 5 }
      ]
    },
    4: {
      guaranteed: { 'ultra-ball': 8, 'stardust': 1000 },
      random: [
        { item: 'hyper-potion', chance: 0.5, quantity: 5 },
        { item: 'max-revive', chance: 0.3, quantity: 2 },
        { item: 'razz-berry', chance: 0.5, quantity: 5 }
      ]
    },
    5: {
      guaranteed: { 'premier-ball': 10, 'stardust': 1500, 'rare-candy': 3 },
      random: [
        { item: 'max-potion', chance: 0.5, quantity: 5 },
        { item: 'max-revive', chance: 0.4, quantity: 3 },
        { item: 'golden-razz-berry', chance: 0.3, quantity: 3 },
        { item: 'fast-tm', chance: 0.1, quantity: 1 },
        { item: 'charged-tm', chance: 0.1, quantity: 1 }
      ]
    }
  }
};

/**
 * Genera un boss de raid aleatorio para un tier específico
 */
export function generateRaidBoss(tier) {
  const bosses = RAID_CONFIG.bosses[tier];
  if (!bosses || bosses.length === 0) return null;
  
  const bossTemplate = bosses[Math.floor(Math.random() * bosses.length)];
  const pokemon = POKEMON_DB[bossTemplate.pokemon];
  
  if (!pokemon) return null;
  
  // Calcular IVs del boss (siempre altos)
  const ivs = {
    attack: 10 + Math.floor(Math.random() * 6), // 10-15
    defense: 10 + Math.floor(Math.random() * 6),
    hp: 10 + Math.floor(Math.random() * 6)
  };
  
  return {
    ...pokemon,
    cp: bossTemplate.cp,
    ivs: ivs,
    level: 25, // Bosses de raid son nivel 25
    moves: generateBossMoves(pokemon.types),
    isShiny: Math.random() < 0.05 // 5% chance de shiny para raids
  };
}

/**
 * Genera movimientos para el boss de raid
 */
function generateBossMoves(types) {
  // Bosses tienen movimientos optimizados de su tipo
  const fastMoves = ['tackle', 'scratch', 'ember', 'water-gun', 'thunder-shock', 'vine-whip'];
  const chargedMoves = ['body-slam', 'flamethrower', 'hydro-pump', 'thunderbolt', 'solar-beam'];
  
  return {
    fast: fastMoves[Math.floor(Math.random() * fastMoves.length)],
    charged: chargedMoves.slice(0, 2)
  };
}

/**
 * Calcula recompensas de raid
 */
export function calculateRaidRewards(tier, contribution = 1.0) {
  const config = RAID_CONFIG.tiers[tier];
  const bonus = RAID_CONFIG.bonusRewards[tier];
  
  const rewards = {
    xp: Math.floor(config.rewards.xp * contribution),
    dust: Math.floor(config.rewards.dust * contribution),
    items: { ...bonus.guaranteed }
  };
  
  // Procesar recompensas aleatorias
  bonus.random.forEach(item => {
    if (Math.random() < item.chance * contribution) {
      rewards.items[item.item] = (rewards.items[item.item] || 0) + item.quantity;
    }
  });
  
  return rewards;
}

/**
 * Obtiene configuración de tier
 */
export function getTierConfig(tier) {
  return RAID_CONFIG.tiers[tier] || RAID_CONFIG.tiers[1];
}

/**
 * Verifica si el jugador puede participar en un tier
 */
export function canParticipate(playerLevel, tier) {
  const config = getTierConfig(tier);
  return playerLevel >= config.minLevel;
}
