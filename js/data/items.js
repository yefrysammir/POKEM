/**
 * BASE DE DATOS DE ITEMS
 * Pokébolas, pociones, bayas y objetos especiales
 */

export const ITEMS = {
  // Pokébolas
  'poke-ball': {
    id: 'poke-ball',
    name: 'Poké Ball',
    description: 'Dispositivo para capturar Pokémon salvajes. Se lanza como una bola a un Pokémon salvaje cómodamente encapsulando su objetivo.',
    category: 'balls',
    price: 100,
    sellPrice: 50,
    icon: 'radio_button_unchecked',
    catchRate: 1.0,
    color: '#FF0000'
  },
  'great-ball': {
    id: 'great-ball',
    name: 'Super Ball',
    description: 'Dispositivo de alto rendimiento para capturar Pokémon. Tiene una tasa de captura más alta que una Poké Ball estándar.',
    category: 'balls',
    price: 300,
    sellPrice: 150,
    icon: 'radio_button_unchecked',
    catchRate: 1.5,
    color: '#0000FF'
  },
  'ultra-ball': {
    id: 'ultra-ball',
    name: 'Ultra Ball',
    description: 'Dispositivo de ultra alto rendimiento para capturar Pokémon. Tiene una tasa de captura más alta que una Super Ball.',
    category: 'balls',
    price: 600,
    sellPrice: 300,
    icon: 'radio_button_unchecked',
    catchRate: 2.0,
    color: '#FFFF00'
  },
  'master-ball': {
    id: 'master-ball',
    name: 'Master Ball',
    description: 'La mejor Poké Ball con el máximo nivel de rendimiento. Cualquier Pokémon salvaje la atrapa sin fallar.',
    category: 'balls',
    price: 100000,
    sellPrice: 50000,
    icon: 'radio_button_unchecked',
    catchRate: 255,
    color: '#800080'
  },
  'premier-ball': {
    id: 'premier-ball',
    name: 'Honor Ball',
    description: 'Poké Ball algo rara creada conmemorando un evento de algún tipo.',
    category: 'balls',
    price: 0,
    sellPrice: 0,
    icon: 'radio_button_unchecked',
    catchRate: 1.0,
    color: '#FFFFFF',
    untradeable: true
  },
  
  // Pociones
  'potion': {
    id: 'potion',
    name: 'Poción',
    description: 'Medicina en spray que restaura 20 PS de un Pokémon.',
    category: 'medicine',
    price: 200,
    sellPrice: 100,
    icon: 'medical_services',
    healAmount: 20,
    color: '#FF69B4'
  },
  'super-potion': {
    id: 'super-potion',
    name: 'Superpoción',
    description: 'Medicina en spray que restaura 50 PS de un Pokémon.',
    category: 'medicine',
    price: 500,
    sellPrice: 250,
    icon: 'medical_services',
    healAmount: 50,
    color: '#FF1493'
  },
  'hyper-potion': {
    id: 'hyper-potion',
    name: 'Hiperpoción',
    description: 'Medicina en spray que restaura 200 PS de un Pokémon.',
    category: 'medicine',
    price: 1500,
    sellPrice: 750,
    icon: 'medical_services',
    healAmount: 200,
    color: '#FF69B4'
  },
  'max-potion': {
    id: 'max-potion',
    name: 'Poción Máxima',
    description: 'Medicina en spray que restaura todos los PS de un Pokémon.',
    category: 'medicine',
    price: 2500,
    sellPrice: 1250,
    icon: 'medical_services',
    healAmount: 999,
    color: '#FF1493'
  },
  'revive': {
    id: 'revive',
    name: 'Revivir',
    description: 'Medicina que revive a un Pokémon debilitado restaurando la mitad de sus PS máximos.',
    category: 'medicine',
    price: 1500,
    sellPrice: 750,
    icon: 'healing',
    revive: true,
    healPercent: 0.5,
    color: '#4169E1'
  },
  'max-revive': {
    id: 'max-revive',
    name: 'Revivir Máximo',
    description: 'Medicina que revive a un Pokémon debilitado restaurando todos sus PS.',
    category: 'medicine',
    price: 3000,
    sellPrice: 1500,
    icon: 'healing',
    revive: true,
    healPercent: 1.0,
    color: '#0000FF'
  },
  
  // Bayas
  'razz-berry': {
    id: 'razz-berry',
    name: 'Baya Frambu',
    description: 'Alimenta a un Pokémon salvaje para hacerlo más fácil de capturar.',
    category: 'berries',
    price: 100,
    sellPrice: 50,
    icon: 'nutrition',
    catchBonus: 1.5,
    color: '#FF0000'
  },
  'nanab-berry': {
    id: 'nanab-berry',
    name: 'Baya Latano',
    description: 'Alimenta a un Pokémon salvaje para calmarlo y hacer que se mueva menos.',
    category: 'berries',
    price: 100,
    sellPrice: 50,
    icon: 'nutrition',
    calmEffect: true,
    color: '#FFFF00'
  },
  'pinap-berry': {
    id: 'pinap-berry',
    name: 'Baya Pinia',
    description: 'Alimenta a un Pokémon salvaje para duplicar los caramelos si se captura.',
    category: 'berries',
    price: 100,
    sellPrice: 50,
    icon: 'nutrition',
    candyBonus: 2,
    color: '#FFA500'
  },
  'golden-razz-berry': {
    id: 'golden-razz-berry',
    name: 'Baya Frambu Dorada',
    description: 'Baya dorada que aumenta enormemente las posibilidades de captura.',
    category: 'berries',
    price: 0,
    sellPrice: 0,
    icon: 'nutrition',
    catchBonus: 2.5,
    color: '#FFD700',
    untradeable: true
  },
  'silver-pinap-berry': {
    id: 'silver-pinap-berry',
    name: 'Baya Pinia Plateada',
    description: 'Baya plateada que aumenta las posibilidades de captura y duplica los caramelos.',
    category: 'berries',
    price: 0,
    sellPrice: 0,
    icon: 'nutrition',
    catchBonus: 1.8,
    candyBonus: 2,
    color: '#C0C0C0',
    untradeable: true
  },
  
  // Objetos de evolución
  'sun-stone': {
    id: 'sun-stone',
    name: 'Piedra Solar',
    description: 'Piedra peculiar que hace evolucionar a ciertos Pokémon. Brilla con luz rojiza.',
    category: 'evolution',
    price: 3000,
    sellPrice: 1500,
    icon: 'wb_sunny',
    color: '#FF4500'
  },
  'moon-stone': {
    id: 'moon-stone',
    name: 'Piedra Lunar',
    description: 'Piedra peculiar que hace evolucionar a ciertos Pokémon. Es negra como la noche.',
    category: 'evolution',
    price: 3000,
    sellPrice: 1500,
    icon: 'nightlight_round',
    color: '#4682B4'
  },
  'fire-stone': {
    id: 'fire-stone',
    name: 'Piedra Fuego',
    description: 'Piedra peculiar que hace evolucionar a ciertos Pokémon. Tiene un fulgor anaranjado.',
    category: 'evolution',
    price: 3000,
    sellPrice: 1500,
    icon: 'local_fire_department',
    color: '#FF4500'
  },
  'thunder-stone': {
    id: 'thunder-stone',
    name: 'Piedra Trueno',
    description: 'Piedra peculiar que hace evolucionar a ciertos Pokémon. Tiene un fulgor eléctrico.',
    category: 'evolution',
    price: 3000,
    sellPrice: 1500,
    icon: 'bolt',
    color: '#FFD700'
  },
  'water-stone': {
    id: 'water-stone',
    name: 'Piedra Agua',
    description: 'Piedra peculiar que hace evolucionar a ciertos Pokémon. Es de un azul transparente.',
    category: 'evolution',
    price: 3000,
    sellPrice: 1500,
    icon: 'water_drop',
    color: '#1E90FF'
  },
  'leaf-stone': {
    id: 'leaf-stone',
    name: 'Piedra Hoja',
    description: 'Piedra peculiar que hace evolucionar a ciertos Pokémon. Tiene un ímpetu vegetal.',
    category: 'evolution',
    price: 3000,
    sellPrice: 1500,
    icon: 'eco',
    color: '#228B22'
  },
  'kings-rock': {
    id: 'kings-rock',
    name: 'Roca del Rey',
    description: 'Corona hecha de roca que hace evolucionar a ciertos Pokémon al intercambiarlos.',
    category: 'evolution',
    price: 5000,
    sellPrice: 2500,
    icon: 'crown',
    color: '#FFD700'
  },
  'metal-coat': {
    id: 'metal-coat',
    name: 'Revestimiento Metálico',
    description: 'Recubrimiento especial de metal que hace evolucionar a ciertos Pokémon.',
    category: 'evolution',
    price: 5000,
    sellPrice: 2500,
    icon: 'shield',
    color: '#708090'
  },
  'dragon-scale': {
    id: 'dragon-scale',
    name: 'Escama Dragón',
    description: 'Escama misteriosa que hace evolucionar a ciertos Pokémon. Brilla con luz de dragón.',
    category: 'evolution',
    price: 5000,
    sellPrice: 2500,
    icon: 'scale',
    color: '#8B0000'
  },
  'upgrade': {
    id: 'upgrade',
    name: 'Mejora',
    description: 'Caja transparente llena de maquinaria especial que hace evolucionar a ciertos Pokémon.',
    category: 'evolution',
    price: 5000,
    sellPrice: 2500,
    icon: 'upgrade',
    color: '#00CED1'
  },
  'sinnoh-stone': {
    id: 'sinnoh-stone',
    name: 'Piedra Sinnoh',
    description: 'Piedra especial que hace evolucionar a ciertos Pokémon de Sinnoh.',
    category: 'evolution',
    price: 0,
    sellPrice: 0,
    icon: 'diamond',
    color: '#B76E79',
    untradeable: true
  },
  'unova-stone': {
    id: 'unova-stone',
    name: 'Piedra Unova',
    description: 'Piedra especial que hace evolucionar a ciertos Pokémon de Unova.',
    category: 'evolution',
    price: 0,
    sellPrice: 0,
    icon: 'diamond',
    color: '#4B0082',
    untradeable: true
  },
  
  // Objetos especiales
  'lucky-egg': {
    id: 'lucky-egg',
    name: 'Huevo Suerte',
    description: 'Huevo lleno de felicidad que gana el doble de PX durante 30 minutos.',
    category: 'special',
    price: 500,
    sellPrice: 250,
    icon: 'egg_alt',
    effect: 'double_xp',
    duration: 1800,
    color: '#FFD700'
  },
  'incense': {
    id: 'incense',
    name: 'Incienso',
    description: 'Aroma misterioso que atrae a Pokémon salvajes durante 60 minutos.',
    category: 'special',
    price: 400,
    sellPrice: 200,
    icon: 'air',
    effect: 'spawn_boost',
    duration: 3600,
    color: '#FF69B4'
  },
  'lure-module': {
    id: 'lure-module',
    name: 'Módulo Cebo',
    description: 'Módulo electrónico que atrae Pokémon a una Poképarada durante 30 minutos.',
    category: 'special',
    price: 350,
    sellPrice: 175,
    icon: 'pin_drop',
    effect: 'lure',
    duration: 1800,
    color: '#00CED1'
  },
  'star-piece': {
    id: 'star-piece',
    name: 'Pieza Estrella',
    description: 'Pequeña gema de estrella que gana el 50% más de Polvo Estelar durante 30 minutos.',
    category: 'special',
    price: 400,
    sellPrice: 200,
    icon: 'star',
    effect: 'stardust_boost',
    duration: 1800,
    color: '#FFD700'
  },
  'raid-pass': {
    id: 'raid-pass',
    name: 'Pase de Raid',
    description: 'Pase para participar en una Incursión en un Gimnasio.',
    category: 'special',
    price: 0,
    sellPrice: 0,
    icon: 'local_fire_department',
    color: '#FF0000',
    untradeable: true,
    daily: true
  },
  'premium-raid-pass': {
    id: 'premium-raid-pass',
    name: 'Pase de Incursión Premium',
    description: 'Pase premium para participar en Incursiones sin límite diario.',
    category: 'special',
    price: 200,
    sellPrice: 100,
    icon: 'local_fire_department',
    color: '#FFD700'
  },
  'remote-raid-pass': {
    id: 'remote-raid-pass',
    name: 'Pase de Incursión a Distancia',
    description: 'Pase para participar en Incursiones desde cualquier lugar.',
    category: 'special',
    price: 300,
    sellPrice: 150,
    icon: 'wifi_tethering',
    color: '#800080'
  },
  
  // Almacenamiento
  'bag-upgrade': {
    id: 'bag-upgrade',
    name: 'Mejora de Mochila',
    description: 'Aumenta la capacidad de tu mochila en 50 espacios.',
    category: 'upgrade',
    price: 400,
    sellPrice: 200,
    icon: 'backpack',
    upgradeAmount: 50,
    color: '#8B4513'
  },
  'pokemon-storage-upgrade': {
    id: 'pokemon-storage-upgrade',
    name: 'Mejora de Almacenamiento',
    description: 'Aumenta la capacidad de almacenamiento de Pokémon en 50 espacios.',
    category: 'upgrade',
    price: 400,
    sellPrice: 200,
    icon: 'storage',
    upgradeAmount: 50,
    color: '#4169E1'
  }
};

/**
 * Obtiene un item por su ID
 */
export function getItem(itemId) {
  return ITEMS[itemId] || null;
}

/**
 * Obtiene items por categoría
 */
export function getItemsByCategory(category) {
  return Object.values(ITEMS).filter(item => item.category === category);
}

/**
 * Obtiene items disponibles en tienda
 */
export function getShopItems() {
  return Object.values(ITEMS).filter(item => item.price > 0 && !item.untradeable);
}
