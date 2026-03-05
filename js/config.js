/**
 * CONFIGURACIÓN GLOBAL DEL JUEGO
 * Ajusta parámetros, balances y URLs aquí
 */

export const CONFIG = {
  // Información del juego
  GAME_NAME: 'Monster GO',
  VERSION: '1.0.0',
  
  // URLs de sprites (Pokémon Showdown)
  SPRITES: {
    // Sprites animados de frente (para mapa, captura, oponente en combate)
    NORMAL_FRONT: 'https://play.pokemonshowdown.com/sprites/ani',
    SHINY_FRONT: 'https://play.pokemonshowdown.com/sprites/ani-shiny',
    
    // Sprites animados de espalda (para aliado en combate)
    NORMAL_BACK: 'https://play.pokemonshowdown.com/sprites/ani-back',
    SHINY_BACK: 'https://play.pokemonshowdown.com/sprites/ani-back-shiny',
    
    // Sprites estáticos (fallback)
    ICONS: 'https://play.pokemonshowdown.com/sprites/gen5',
    ITEMS: 'https://play.pokemonshowdown.com/sprites/itemicons'
  },
  
  // Configuración de escala de sprites por Pokémon (porcentaje del contenedor)
  // Pokémon no listados usan 100% (valor default)
  SPRITE_SCALE: {
    // Pokémon pequeños (30-60%)
    'caterpie': 50,
    'weedle': 50,
    'metapod': 45,      // Muy pequeño, capullo
    'kakuna': 45,
    'pidgey': 55,
    'rattata': 55,
    'spearow': 55,
    'pikachu': 60,
    'sandshrew': 55,
    'nidoranf': 55,
    'nidoranm': 55,
    'clefairy': 60,
    'vulpix': 55,
    'jigglypuff': 60,
    'zubat': 55,
    'oddish': 55,
    'paras': 55,
    'venonat': 55,
    'diglett': 45,      // Solo cabeza visible
    'meowth': 60,
    'psyduck': 60,
    'mankey': 60,
    'growlithe': 60,
    'poliwag': 55,
    'abra': 55,
    'machop': 60,
    'bellsprout': 60,
    'tentacool': 55,
    'geodude': 55,      // Flotante
    'ponyta': 60,
    'slowpoke': 65,
    'magnemite': 50,
    'doduo': 60,
    'seel': 60,
    'grimer': 60,
    'shellder': 50,
    'gastly': 60,       // Gas
    'onix': 70,         // Largo pero delgado
    'drowzee': 60,
    'krabby': 55,
    'voltorb': 50,      // Esfera
    'electrode': 55,
    'exeggcute': 55,    // Grupo de huevos
    'cubone': 60,
    'koffing': 55,      // Gas
    'rhyhorn': 65,
    'chansey': 65,
    'tangela': 60,
    'kangaskhan': 70,
    'horsea': 50,
    'goldeen': 55,
    'staryu': 50,
    'scyther': 70,
    'pinsir': 65,
    'tauros': 70,
    'magikarp': 60,
    'lapras': 75,
    'ditto': 50,        // Blob
    'eevee': 55,
    'porygon': 55,
    'omanyte': 55,
    'kabuto': 55,
    'aerodactyl': 75,
    'snorlax': 80,
    'articuno': 75,     // Ave legendaria
    'zapdos': 75,
    'moltres': 75,
    'dratini': 55,
    'dragonair': 65,
    'mewtwo': 75,
    'mew': 60,
    
    // Evoluciones medianas (70-85%)
    'butterfree': 70,
    'beedrill': 70,
    'pidgeotto': 70,
    'raticate': 70,
    'fearow': 75,
    'arbok': 75,
    'raichu': 70,
    'sandslash': 75,
    'nidorina': 70,
    'nidorino': 70,
    'clefable': 75,
    'ninetales': 75,
    'wigglytuff': 75,
    'golbat': 75,
    'gloom': 70,
    'parasect': 75,
    'venomoth': 75,
    'dugtrio': 65,
    'persian': 70,
    'golduck': 75,
    'primeape': 75,
    'arcanine': 85,
    'poliwhirl': 70,
    'kadabra': 70,
    'machoke': 75,
    'weepinbell': 70,
    'tentacruel': 80,
    'graveler': 70,
    'rapidash': 85,
    'slowbro': 80,
    'magneton': 70,
    'dodrio': 75,
    'dewgong': 80,
    'muk': 75,
    'cloyster': 70,
    'haunter': 70,
    'gengar': 70,
    'hypno': 75,
    'kingler': 75,
    'electrode': 60,
    'exeggutor': 85,    // Alto
    'marowak': 70,
    'hitmonlee': 75,
    'hitmonchan': 75,
    'lickitung': 75,
    'weezing': 70,
    'rhydon': 85,
    'chansey': 75,
    'seadra': 65,
    'seaking': 75,
    'starmie': 70,
    'mr-mime': 70,
    'jynx': 75,
    'electabuzz': 75,
    'magmar': 75,
    'gyarados': 90,     // Grande
    'vaporeon': 75,
    'jolteon': 75,
    'flareon': 75,
    'omastar': 75,
    'kabutops': 75,
    'dragonite': 90,    // Grande
    
    // Iniciales y evoluciones finales (80-95%)
    'ivysaur': 75,
    'venusaur': 90,
    'charmeleon': 75,
    'charizard': 90,    // Grande, alas
    'wartortle': 75,
    'blastoise': 90,   // Grande, cañones
    
    // Legendarios y grandes (90-100%)
    'mewtwo': 85,
    'mew': 70,
    'articuno': 85,
    'zapdos': 85,
    'moltres': 85
  },
  
  // Configuración del jugador
  PLAYER: {
    STARTING_COINS: 500,
    STARTING_DUST: 1000,
    MAX_BAG_SIZE: 350,
    MAX_POKEMON_STORAGE: 250,
    XP_PER_LEVEL: 1000,
    XP_MULTIPLIER: 1.2
  },
  
  // Sistema de spawn
  SPAWN: {
    SPAWN_RATE: 0.3,        // Probabilidad de spawn por celda
    MAX_SPAWNS: 10,         // Máximo de spawns visibles
    DESPAWN_TIME: 900000,   // 15 minutos en ms
    RARE_SPAWN_CHANCE: 0.05,
    SHINY_CHANCE: 0.001     // 1/1000
  },
  
  // Sistema de captura
  CATCH: {
    BASE_CATCH_RATE: 0.4,
    BALL_MODIFIER: {
      'poke-ball': 1,
      'great-ball': 1.5,
      'ultra-ball': 2,
      'master-ball': 255
    },
    CURVEBALL_BONUS: 1.7,
    EXCELLENT_BONUS: 2,
    NICE_BONUS: 1.15
  },
  
  // Sistema de combate
  BATTLE: {
    TURN_DURATION: 2000,    // ms entre turnos
    DODGE_WINDOW: 500,      // ms para esquivar
    CHARGE_TIME: 3000,      // ms para cargar ataque
    STAB_BONUS: 1.2,        // Same Type Attack Bonus
    TYPE_EFFECTIVENESS: {
      SUPER_EFFECTIVE: 2,
      NOT_VERY_EFFECTIVE: 0.5,
      IMMUNE: 0
    }
  },
  
  // Sistema de raids
  RAID: {
    DURATIONS: {
      1: 180000,    // 3 min
      2: 180000,
      3: 300000,    // 5 min
      4: 300000,
      5: 600000     // 10 min
    },
    PLAYERS_NEEDED: {
      1: 1,
      2: 2,
      3: 4,
      4: 6,
      5: 10
    }
  },
  
  // Tipos de elementos en el mapa
  MAP_ELEMENTS: {
    POKEMON: 'pokemon',
    POKESTOP: 'pokestop',
    GYM: 'gym',
    RAID: 'raid'
  },
  
  // Rareza de Pokémon
  RARITY: {
    COMMON: 0.6,
    UNCOMMON: 0.25,
    RARE: 0.1,
    EPIC: 0.04,
    LEGENDARY: 0.01
  },
  
  // Calidad de IVs
  IV_RATINGS: {
    PERFECT: { min: 100, label: 'Perfecto', color: '#FFD700' },
    AMAZING: { min: 82, label: 'Increíble', color: '#00E676' },
    GOOD: { min: 66, label: 'Bueno', color: '#FFD93D' },
    DECENT: { min: 50, label: 'Decente', color: '#FF6B6B' },
    POOR: { min: 0, label: 'Bajo', color: '#A0A0A0' }
  },
  
  // Tipos de clima
  WEATHER: {
    SUNNY: { types: ['fire', 'grass', 'ground'], boost: 1.2 },
    RAINY: { types: ['water', 'electric', 'bug'], boost: 1.2 },
    CLOUDY: { types: ['normal', 'rock', 'fighting'], boost: 1.2 },
    WINDY: { types: ['flying', 'dragon', 'psychic'], boost: 1.2 },
    SNOWY: { types: ['ice', 'steel'], boost: 1.2 },
    FOGGY: { types: ['dark', 'ghost'], boost: 1.2 }
  }
};

// Utilidad para obtener URL de sprite con soporte para espalda
export function getSpriteUrl(pokemonName, isShiny = false, isBack = false) {
  const formattedName = pokemonName.toLowerCase().replace(/\s+/g, '');
  
  if (isBack) {
    const base = isShiny ? CONFIG.SPRITES.SHINY_BACK : CONFIG.SPRITES.NORMAL_BACK;
    return `${base}/${formattedName}.gif`;
  }
  
  const base = isShiny ? CONFIG.SPRITES.SHINY_FRONT : CONFIG.SPRITES.NORMAL_FRONT;
  return `${base}/${formattedName}.gif`;
}

// Obtener escala personalizada para un Pokémon (default 100%)
export function getSpriteScale(pokemonName) {
  const formattedName = pokemonName.toLowerCase().replace(/\s+/g, '');
  return CONFIG.SPRITE_SCALE[formattedName] || 100;
}

// Utilidad para obtener icono (ahora usa sprites ani redimensionados)
export function getIconUrl(pokemonName, isShiny = false) {
  // Usamos los sprites animados pero los mostraremos más pequeños vía CSS
  return getSpriteUrl(pokemonName, isShiny, false);
}

// Obtener dimensiones del icono basado en escala
export function getIconDimensions(pokemonName, containerSize = 100) {
  const scale = getSpriteScale(pokemonName);
  const size = (containerSize * scale) / 100;
  return {
    width: `${size}%`,
    height: `${size}%`,
    scale: scale / 100
  };
}
