/**
 * SISTEMA DE TIPOS ELEMENTALES
 * Define fortalezas, debilidades e inmunidades
 */

export const TYPES = {
  normal: {
    weaknesses: ['fighting'],
    resistances: [],
    immunities: ['ghost'],
    color: '#A8A878'
  },
  fire: {
    weaknesses: ['water', 'ground', 'rock'],
    resistances: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
    immunities: [],
    color: '#F08030'
  },
  water: {
    weaknesses: ['electric', 'grass'],
    resistances: ['fire', 'water', 'ice', 'steel'],
    immunities: [],
    color: '#6890F0'
  },
  electric: {
    weaknesses: ['ground'],
    resistances: ['electric', 'flying', 'steel'],
    immunities: [],
    color: '#F8D030'
  },
  grass: {
    weaknesses: ['fire', 'ice', 'poison', 'flying', 'bug'],
    resistances: ['water', 'electric', 'grass', 'ground'],
    immunities: [],
    color: '#78C850'
  },
  ice: {
    weaknesses: ['fire', 'fighting', 'rock', 'steel'],
    resistances: ['ice'],
    immunities: [],
    color: '#98D8D8'
  },
  fighting: {
    weaknesses: ['flying', 'psychic', 'fairy'],
    resistances: ['bug', 'rock', 'dark'],
    immunities: [],
    color: '#C03028'
  },
  poison: {
    weaknesses: ['ground', 'psychic'],
    resistances: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
    immunities: [],
    color: '#A040A0'
  },
  ground: {
    weaknesses: ['water', 'grass', 'ice'],
    resistances: ['poison', 'rock'],
    immunities: ['electric'],
    color: '#E0C068'
  },
  flying: {
    weaknesses: ['electric', 'ice', 'rock'],
    resistances: ['grass', 'fighting', 'bug'],
    immunities: ['ground'],
    color: '#A890F0'
  },
  psychic: {
    weaknesses: ['bug', 'ghost', 'dark'],
    resistances: ['fighting', 'psychic'],
    immunities: [],
    color: '#F85888'
  },
  bug: {
    weaknesses: ['fire', 'flying', 'rock'],
    resistances: ['grass', 'fighting', 'ground'],
    immunities: [],
    color: '#A8B820'
  },
  rock: {
    weaknesses: ['water', 'grass', 'fighting', 'ground', 'steel'],
    resistances: ['normal', 'fire', 'poison', 'flying'],
    immunities: [],
    color: '#B8A038'
  },
  ghost: {
    weaknesses: ['ghost', 'dark'],
    resistances: ['poison', 'bug'],
    immunities: ['normal', 'fighting'],
    color: '#705898'
  },
  dragon: {
    weaknesses: ['ice', 'dragon', 'fairy'],
    resistances: ['fire', 'water', 'electric', 'grass'],
    immunities: [],
    color: '#7038F8'
  },
  dark: {
    weaknesses: ['fighting', 'bug', 'fairy'],
    resistances: ['ghost', 'dark'],
    immunities: ['psychic'],
    color: '#705848'
  },
  steel: {
    weaknesses: ['fire', 'fighting', 'ground'],
    resistances: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
    immunities: ['poison'],
    color: '#B8B8D0'
  },
  fairy: {
    weaknesses: ['poison', 'steel'],
    resistances: ['fighting', 'bug', 'dark'],
    immunities: ['dragon'],
    color: '#EE99AC'
  }
};

/**
 * Calcula la efectividad de un tipo de ataque contra un tipo defensor
 * @param {string} attackType - Tipo del ataque
 * @param {string[]} defenderTypes - Tipos del defensor
 * @returns {number} Multiplicador de daño (0, 0.25, 0.5, 1, 2, 4)
 */
export function getEffectiveness(attackType, defenderTypes) {
  let multiplier = 1;
  
  defenderTypes.forEach(defType => {
    const typeData = TYPES[defType];
    if (!typeData) return;
    
    if (typeData.immunities.includes(attackType)) {
      multiplier *= 0;
    } else if (typeData.weaknesses.includes(attackType)) {
      multiplier *= 2;
    } else if (typeData.resistances.includes(attackType)) {
      multiplier *= 0.5;
    }
  });
  
  return multiplier;
}

/**
 * Obtiene el texto descriptivo de la efectividad
 */
export function getEffectivenessText(multiplier) {
  if (multiplier === 0) return 'No afecta';
  if (multiplier === 0.25) return 'Muy poco efectivo';
  if (multiplier === 0.5) return 'Poco efectivo';
  if (multiplier === 1) return 'Normal';
  if (multiplier === 2) return '¡Supereficaz!';
  if (multiplier === 4) return '¡Muy supereficaz!';
  return '';
}

/**
 * Obtiene el color asociado a un tipo
 */
export function getTypeColor(type) {
  return TYPES[type]?.color || '#888888';
}
