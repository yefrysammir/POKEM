/**
 * BASE DE DATOS DE MOVIMIENTOS
 * Ataques rápidos y cargados con sus estadísticas
 */

export const MOVES = {
  // Ataques rápidos (generan energía)
  'tackle': {
    name: 'Placaje',
    type: 'normal',
    power: 5,
    energy: 10,
    duration: 500,
    category: 'fast'
  },
  'scratch': {
    name: 'Arañazo',
    type: 'normal',
    power: 6,
    energy: 7,
    duration: 500,
    category: 'fast'
  },
  'ember': {
    name: 'Ascuas',
    type: 'fire',
    power: 10,
    energy: 10,
    duration: 1000,
    category: 'fast'
  },
  'fire-fang': {
    name: 'Colmillo Ígneo',
    type: 'fire',
    power: 12,
    energy: 8,
    duration: 900,
    category: 'fast'
  },
  'water-gun': {
    name: 'Pistola Agua',
    type: 'water',
    power: 5,
    energy: 5,
    duration: 500,
    category: 'fast'
  },
  'bubble': {
    name: 'Burbuja',
    type: 'water',
    power: 12,
    energy: 14,
    duration: 1200,
    category: 'fast'
  },
  'thunder-shock': {
    name: 'Impactrueno',
    type: 'electric',
    power: 5,
    energy: 8,
    duration: 600,
    category: 'fast'
  },
  'spark': {
    name: 'Chispa',
    type: 'electric',
    power: 6,
    energy: 9,
    duration: 700,
    category: 'fast'
  },
  'vine-whip': {
    name: 'Látigo Cepa',
    type: 'grass',
    power: 7,
    energy: 6,
    duration: 600,
    category: 'fast'
  },
  'razor-leaf': {
    name: 'Hoja Afilada',
    type: 'grass',
    power: 13,
    energy: 7,
    duration: 1000,
    category: 'fast'
  },
  'ice-shard': {
    name: 'Esquirla Helada',
    type: 'ice',
    power: 12,
    energy: 12,
    duration: 1200,
    category: 'fast'
  },
  'frost-breath': {
    name: 'Vaho Gélido',
    type: 'ice',
    power: 10,
    energy: 8,
    duration: 900,
    category: 'fast'
  },
  'low-kick': {
    name: 'Patada Baja',
    type: 'fighting',
    power: 6,
    energy: 6,
    duration: 600,
    category: 'fast'
  },
  'counter': {
    name: 'Contraataque',
    type: 'fighting',
    power: 12,
    energy: 8,
    duration: 900,
    category: 'fast'
  },
  'poison-sting': {
    name: 'Picotazo Veneno',
    type: 'poison',
    power: 5,
    energy: 7,
    duration: 600,
    category: 'fast'
  },
  'acid': {
    name: 'Ácido',
    type: 'poison',
    power: 9,
    energy: 8,
    duration: 800,
    category: 'fast'
  },
  'mud-slap': {
    name: 'Bofetón Lodo',
    type: 'ground',
    power: 15,
    energy: 12,
    duration: 1400,
    category: 'fast'
  },
  'mud-shot': {
    name: 'Disparo Lodo',
    type: 'ground',
    power: 5,
    energy: 7,
    duration: 600,
    category: 'fast'
  },
  'wing-attack': {
    name: 'Ataque Ala',
    type: 'flying',
    power: 8,
    energy: 9,
    duration: 800,
    category: 'fast'
  },
  'peck': {
    name: 'Picotazo',
    type: 'flying',
    power: 10,
    energy: 10,
    duration: 1000,
    category: 'fast'
  },
  'confusion': {
    name: 'Confusión',
    type: 'psychic',
    power: 20,
    energy: 15,
    duration: 1600,
    category: 'fast'
  },
  'psycho-cut': {
    name: 'Psico-corte',
    type: 'psychic',
    power: 5,
    energy: 8,
    duration: 600,
    category: 'fast'
  },
  'struggle-bug': {
    name: 'Estoicismo',
    type: 'bug',
    power: 15,
    energy: 15,
    duration: 1500,
    category: 'fast'
  },
  'bug-bite': {
    name: 'Picadura',
    type: 'bug',
    power: 5,
    energy: 6,
    duration: 500,
    category: 'fast'
  },
  'rock-throw': {
    name: 'Lanzarrocas',
    type: 'rock',
    power: 12,
    energy: 7,
    duration: 900,
    category: 'fast'
  },
  'rock-smash': {
    name: 'Golpe Roca',
    type: 'fighting',
    power: 15,
    energy: 10,
    duration: 1300,
    category: 'fast'
  },
  'shadow-claw': {
    name: 'Garra Umbría',
    type: 'ghost',
    power: 9,
    energy: 6,
    duration: 700,
    category: 'fast'
  },
  'hex': {
    name: 'Hex',
    type: 'ghost',
    power: 10,
    energy: 16,
    duration: 1200,
    category: 'fast'
  },
  'dragon-breath': {
    name: 'Dragoaliento',
    type: 'dragon',
    power: 6,
    energy: 4,
    duration: 500,
    category: 'fast'
  },
  'dragon-tail': {
    name: 'Cola Dragón',
    type: 'dragon',
    power: 15,
    energy: 9,
    duration: 1100,
    category: 'fast'
  },
  'bite': {
    name: 'Mordisco',
    type: 'dark',
    power: 6,
    energy: 4,
    duration: 500,
    category: 'fast'
  },
  'snarl': {
    name: 'Alarido',
    type: 'dark',
    power: 12,
    energy: 12,
    duration: 1100,
    category: 'fast'
  },
  'metal-claw': {
    name: 'Garra Metal',
    type: 'steel',
    power: 8,
    energy: 7,
    duration: 700,
    category: 'fast'
  },
  'bullet-punch': {
    name: 'Puño Bala',
    type: 'steel',
    power: 9,
    energy: 10,
    duration: 900,
    category: 'fast'
  },
  'fairy-wind': {
    name: 'Viento Feérico',
    type: 'fairy',
    power: 9,
    energy: 13,
    duration: 1000,
    category: 'fast'
  },
  'charm': {
    name: 'Encanto',
    type: 'fairy',
    power: 20,
    energy: 11,
    duration: 1500,
    category: 'fast'
  },

  // Ataques cargados (consumen energía)
  'struggle': {
    name: 'Forcejeo',
    type: 'normal',
    power: 35,
    energy: 100,
    category: 'charged',
    criticalChance: 0
  },
  'body-slam': {
    name: 'Golpe Cuerpo',
    type: 'normal',
    power: 50,
    energy: 33,
    category: 'charged',
    criticalChance: 0.05
  },
  'hyper-beam': {
    name: 'Hiperrayo',
    type: 'normal',
    power: 150,
    energy: 100,
    category: 'charged',
    criticalChance: 0.05
  },
  'flamethrower': {
    name: 'Lanzallamas',
    type: 'fire',
    power: 90,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'fire-blast': {
    name: 'Llamarada',
    type: 'fire',
    power: 140,
    energy: 100,
    category: 'charged',
    criticalChance: 0.05
  },
  'hydro-pump': {
    name: 'Hidrobomba',
    type: 'water',
    power: 130,
    energy: 100,
    category: 'charged',
    criticalChance: 0.05
  },
  'surf': {
    name: 'Surf',
    type: 'water',
    power: 65,
    energy: 40,
    category: 'charged',
    criticalChance: 0.05
  },
  'thunderbolt': {
    name: 'Rayo',
    type: 'electric',
    power: 90,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'thunder': {
    name: 'Trueno',
    type: 'electric',
    power: 100,
    energy: 60,
    category: 'charged',
    criticalChance: 0.05
  },
  'solar-beam': {
    name: 'Rayo Solar',
    type: 'grass',
    power: 180,
    energy: 100,
    category: 'charged',
    criticalChance: 0.05
  },
  'petal-blizzard': {
    name: 'Tormenta Floral',
    type: 'grass',
    power: 110,
    energy: 65,
    category: 'charged',
    criticalChance: 0.05
  },
  'blizzard': {
    name: 'Ventisca',
    type: 'ice',
    power: 130,
    energy: 75,
    category: 'charged',
    criticalChance: 0.05
  },
  'ice-beam': {
    name: 'Rayo Hielo',
    type: 'ice',
    power: 90,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'close-combat': {
    name: 'A Bocajarro',
    type: 'fighting',
    power: 100,
    energy: 45,
    category: 'charged',
    criticalChance: 0.05
  },
  'dynamic-punch': {
    name: 'Puño Dinámico',
    type: 'fighting',
    power: 90,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'sludge-bomb': {
    name: 'Bomba Lodo',
    type: 'poison',
    power: 80,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'gunk-shot': {
    name: 'Lanza Mugre',
    type: 'poison',
    power: 130,
    energy: 75,
    category: 'charged',
    criticalChance: 0.05
  },
  'earthquake': {
    name: 'Terremoto',
    type: 'ground',
    power: 140,
    energy: 100,
    category: 'charged',
    criticalChance: 0.05
  },
  'dig': {
    name: 'Excavar',
    type: 'ground',
    power: 100,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'hurricane': {
    name: 'Vendaval',
    type: 'flying',
    power: 110,
    energy: 65,
    category: 'charged',
    criticalChance: 0.05
  },
  'aerial-ace': {
    name: 'Golpe Aéreo',
    type: 'flying',
    power: 55,
    energy: 33,
    category: 'charged',
    criticalChance: 0.05
  },
  'psychic': {
    name: 'Psíquico',
    type: 'psychic',
    power: 100,
    energy: 65,
    category: 'charged',
    criticalChance: 0.05
  },
  'future-sight': {
    name: 'Premonición',
    type: 'psychic',
    power: 120,
    energy: 65,
    category: 'charged',
    criticalChance: 0.05
  },
  'bug-buzz': {
    name: 'Zumbido',
    type: 'bug',
    power: 100,
    energy: 60,
    category: 'charged',
    criticalChance: 0.05
  },
  'x-scissor': {
    name: 'Tijera X',
    type: 'bug',
    power: 45,
    energy: 35,
    category: 'charged',
    criticalChance: 0.05
  },
  'stone-edge': {
    name: 'Roca Afilada',
    type: 'rock',
    power: 100,
    energy: 55,
    category: 'charged',
    criticalChance: 0.25
  },
  'rock-slide': {
    name: 'Avalancha',
    type: 'rock',
    power: 80,
    energy: 45,
    category: 'charged',
    criticalChance: 0.05
  },
  'shadow-ball': {
    name: 'Bola Sombra',
    type: 'ghost',
    power: 100,
    energy: 55,
    category: 'charged',
    criticalChance: 0.05
  },
  'shadow-sneak': {
    name: 'Sombra Vil',
    type: 'ghost',
    power: 50,
    energy: 33,
    category: 'charged',
    criticalChance: 0.05
  },
  'dragon-claw': {
    name: 'Garra Dragón',
    type: 'dragon',
    power: 50,
    energy: 35,
    category: 'charged',
    criticalChance: 0.05
  },
  'outrage': {
    name: 'Enfado',
    type: 'dragon',
    power: 110,
    energy: 60,
    category: 'charged',
    criticalChance: 0.05
  },
  'dark-pulse': {
    name: 'Pulso Umbrío',
    type: 'dark',
    power: 80,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'foul-play': {
    name: 'Juego Sucio',
    type: 'dark',
    power: 95,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'flash-cannon': {
    name: 'Foco Resplandor',
    type: 'steel',
    power: 100,
    energy: 55,
    category: 'charged',
    criticalChance: 0.05
  },
  'iron-head': {
    name: 'Cabeza de Hierro',
    type: 'steel',
    power: 60,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  },
  'moonblast': {
    name: 'Fuerza Lunar',
    type: 'fairy',
    power: 130,
    energy: 70,
    category: 'charged',
    criticalChance: 0.05
  },
  'dazzling-gleam': {
    name: 'Brillo Mágico',
    type: 'fairy',
    power: 100,
    energy: 50,
    category: 'charged',
    criticalChance: 0.05
  }
};

/**
 * Obtiene un movimiento por su ID
 */
export function getMove(moveId) {
  return MOVES[moveId] || null;
}

/**
 * Obtiene movimientos aleatorios para un Pokémon según su tipo
 */
export function getRandomMovesForType(types, countFast = 1, countCharged = 2) {
  const fastMoves = Object.entries(MOVES)
    .filter(([_, move]) => move.category === 'fast' && 
      (types.includes(move.type) || Math.random() > 0.7))
    .map(([id, _]) => id);
    
  const chargedMoves = Object.entries(MOVES)
    .filter(([_, move]) => move.category === 'charged' && 
      (types.includes(move.type) || Math.random() > 0.5))
    .map(([id, _]) => id);
  
  const selectedFast = [];
  const selectedCharged = [];
  
  for (let i = 0; i < countFast && fastMoves.length > 0; i++) {
    const idx = Math.floor(Math.random() * fastMoves.length);
    selectedFast.push(fastMoves.splice(idx, 1)[0]);
  }
  
  for (let i = 0; i < countCharged && chargedMoves.length > 0; i++) {
    const idx = Math.floor(Math.random() * chargedMoves.length);
    selectedCharged.push(chargedMoves.splice(idx, 1)[0]);
  }
  
  return {
    fast: selectedFast,
    charged: selectedCharged
  };
}
