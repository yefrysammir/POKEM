/**
 * ESTADO GLOBAL DEL JUEGO
 * Gestiona todos los datos del jugador y progreso
 */

import { CONFIG } from './config.js';
import { POKEMON_DB, calculateCP, calculateIVPercentage } from './data/pokemon.js';

// Estado inicial
const defaultState = {
  player: {
    name: 'Entrenador',
    level: 1,
    xp: 0,
    xpToNextLevel: CONFIG.PLAYER.XP_PER_LEVEL,
    coins: CONFIG.PLAYER.STARTING_COINS,
    stardust: CONFIG.PLAYER.STARTING_DUST,
    team: null, // mystic, valor, instinct
    avatar: 'default'
  },
  
  inventory: {
    items: {
      'poke-ball': 20,
      'potion': 10,
      'revive': 5,
      'razz-berry': 10
    },
    maxSize: CONFIG.PLAYER.MAX_BAG_SIZE
  },
  
  pokemon: {
    collection: [], // Array de Pokémon capturados
    storage: [], // Array de Pokémon en almacenamiento
    maxStorage: CONFIG.PLAYER.MAX_POKEMON_STORAGE,
    favorites: [], // IDs de Pokémon favoritos
    candies: {} // Contador de caramelos por especie
  },
  
  currentTeam: [], // Hasta 6 Pokémon para combates
  
  map: {
    currentPosition: { x: 10, y: 10 },
    discoveredCells: [],
    activeSpawns: [],
    visitedPokestops: [],
    activeRaids: []
  },
  
  stats: {
    pokemonCaught: 0,
    pokemonSeen: 0,
    battlesWon: 0,
    raidsCompleted: 0,
    distanceWalked: 0,
    startDate: new Date().toISOString()
  },
  
  settings: {
    music: true,
    soundEffects: true,
    vibration: true,
    notifications: true,
    language: 'es'
  },
  
  // Estado temporal de sesión
  session: {
    activeIncense: null,
    activeLuckyEgg: null,
    activeStarPiece: null,
    lastPokestopSpin: null
  }
};

class GameState {
  constructor() {
    this.state = this.loadState() || JSON.parse(JSON.stringify(defaultState));
    this.listeners = [];
  }

  // Persistencia
  loadState() {
    try {
      const saved = localStorage.getItem('monsterGoState');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error loading state:', e);
      return null;
    }
  }

  saveState() {
    try {
      localStorage.setItem('monsterGoState', JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  // Suscripción a cambios
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Getters
  getPlayer() {
    return this.state.player;
  }

  getInventory() {
    return this.state.inventory;
  }

  getPokemonCollection() {
    return this.state.pokemon.collection;
  }

  getPokemonById(id) {
    return this.state.pokemon.collection.find(p => p.id === id) || 
           this.state.pokemon.storage.find(p => p.id === id);
  }

  getCurrentTeam() {
    return this.state.currentTeam.map(id => this.getPokemonById(id)).filter(Boolean);
  }

  // Setters y modificadores
  addXP(amount) {
    const multiplier = this.state.session.activeLuckyEgg ? 2 : 1;
    const finalAmount = Math.floor(amount * multiplier);
    
    this.state.player.xp += finalAmount;
    
    // Verificar subida de nivel
    while (this.state.player.xp >= this.state.player.xpToNextLevel) {
      this.state.player.xp -= this.state.player.xpToNextLevel;
      this.state.player.level++;
      this.state.player.xpToNextLevel = Math.floor(
        CONFIG.PLAYER.XP_PER_LEVEL * Math.pow(CONFIG.PLAYER.XP_MULTIPLIER, this.state.player.level - 1)
      );
      this.onLevelUp();
    }
    
    this.saveState();
    return finalAmount;
  }

  onLevelUp() {
    // Recompensas por subir de nivel
    const rewards = {
      items: {},
      coins: 0
    };
    
    if (this.state.player.level % 5 === 0) {
      rewards.items['hyper-potion'] = 10;
      rewards.items['revive'] = 10;
      rewards.coins = 500;
    } else {
      rewards.items['potion'] = 5;
      rewards.items['poke-ball'] = 10;
    }
    
    this.addCoins(rewards.coins);
    Object.entries(rewards.items).forEach(([item, qty]) => {
      this.addItem(item, qty);
    });
    
    return rewards;
  }

  addCoins(amount) {
    this.state.player.coins += amount;
    this.saveState();
  }

  removeCoins(amount) {
    if (this.state.player.coins >= amount) {
      this.state.player.coins -= amount;
      this.saveState();
      return true;
    }
    return false;
  }

  addStardust(amount) {
    const multiplier = this.state.session.activeStarPiece ? 1.5 : 1;
    const finalAmount = Math.floor(amount * multiplier);
    this.state.player.stardust += finalAmount;
    this.saveState();
    return finalAmount;
  }

  removeStardust(amount) {
    if (this.state.player.stardust >= amount) {
      this.state.player.stardust -= amount;
      this.saveState();
      return true;
    }
    return false;
  }

  // Gestión de inventario
  addItem(itemId, quantity = 1) {
    const currentAmount = this.state.inventory.items[itemId] || 0;
    const totalItems = Object.values(this.state.inventory.items).reduce((a, b) => a + b, 0);
    
    if (totalItems + quantity > this.state.inventory.maxSize) {
      return false; // Mochila llena
    }
    
    this.state.inventory.items[itemId] = currentAmount + quantity;
    this.saveState();
    return true;
  }

  removeItem(itemId, quantity = 1) {
    const currentAmount = this.state.inventory.items[itemId] || 0;
    if (currentAmount >= quantity) {
      this.state.inventory.items[itemId] = currentAmount - quantity;
      if (this.state.inventory.items[itemId] === 0) {
        delete this.state.inventory.items[itemId];
      }
      this.saveState();
      return true;
    }
    return false;
  }

  hasItem(itemId, quantity = 1) {
    return (this.state.inventory.items[itemId] || 0) >= quantity;
  }

  getItemCount(itemId) {
    return this.state.inventory.items[itemId] || 0;
  }

  // Gestión de Pokémon
  addPokemon(pokemonData) {
    // Generar ID único
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    const pokemon = {
      id,
      ...pokemonData,
      caughtAt: new Date().toISOString(),
      favorite: false
    };
    
    // Calcular CP si no está calculado
    if (!pokemon.cp) {
      const base = POKEMON_DB[pokemon.species];
      pokemon.cp = calculateCP(base, pokemon.level, pokemon.ivs);
    }
    
    // Añadir a colección
    if (this.state.pokemon.collection.length < this.state.pokemon.maxStorage) {
      this.state.pokemon.collection.push(pokemon);
      
      // Añadir caramelo
      const candyKey = pokemon.species;
      this.state.pokemon.candies[candyKey] = (this.state.pokemon.candies[candyKey] || 0) + 
        (pokemon.candyBonus || 3);
      
      this.state.stats.pokemonCaught++;
      this.saveState();
      return pokemon;
    }
    
    return null; // Almacenamiento lleno
  }

  transferPokemon(id) {
    const index = this.state.pokemon.collection.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    const pokemon = this.state.pokemon.collection[index];
    
    // No permitir transferir favoritos
    if (pokemon.favorite) return false;
    
    // No permitir transferir si está en el equipo
    if (this.state.currentTeam.includes(id)) return false;
    
    // Eliminar de colección
    this.state.pokemon.collection.splice(index, 1);
    
    // Recompensa: 1 caramelo de la especie evolucionada
    const base = POKEMON_DB[pokemon.species];
    const candyType = base.evolutions.length > 0 ? pokemon.species : pokemon.species;
    this.state.pokemon.candies[candyType] = (this.state.pokemon.candies[candyType] || 0) + 1;
    
    this.saveState();
    return true;
  }

  toggleFavorite(id) {
    const pokemon = this.getPokemonById(id);
    if (pokemon) {
      pokemon.favorite = !pokemon.favorite;
      this.saveState();
      return pokemon.favorite;
    }
    return null;
  }

  addToTeam(id) {
    if (this.state.currentTeam.length >= 6) return false;
    if (this.state.currentTeam.includes(id)) return false;
    
    const pokemon = this.getPokemonById(id);
    if (!pokemon || pokemon.currentHp <= 0) return false;
    
    this.state.currentTeam.push(id);
    this.saveState();
    return true;
  }

  removeFromTeam(id) {
    const index = this.state.currentTeam.indexOf(id);
    if (index > -1) {
      this.state.currentTeam.splice(index, 1);
      this.saveState();
      return true;
    }
    return false;
  }

  healPokemon(id, amount) {
    const pokemon = this.getPokemonById(id);
    if (!pokemon) return false;
    
    const maxHp = this.calculateMaxHp(pokemon);
    const newHp = Math.min(pokemon.currentHp + amount, maxHp);
    const healed = newHp - pokemon.currentHp;
    
    pokemon.currentHp = newHp;
    this.saveState();
    return healed;
  }

  revivePokemon(id, percent = 0.5) {
    const pokemon = this.getPokemonById(id);
    if (!pokemon || pokemon.currentHp > 0) return false;
    
    const maxHp = this.calculateMaxHp(pokemon);
    pokemon.currentHp = Math.floor(maxHp * percent);
    this.saveState();
    return true;
  }

  calculateMaxHp(pokemon) {
    const base = POKEMON_DB[pokemon.species];
    if (!base) return 100;
    
    const cpMultiplier = Math.pow((pokemon.level * 0.1332921), 2) / 100 + 0.094;
    return Math.floor((base.baseStats.hp + pokemon.ivs.hp) * cpMultiplier);
  }

  powerUpPokemon(id) {
    const pokemon = this.getPokemonById(id);
    if (!pokemon || pokemon.level >= 40) return false;
    
    const base = POKEMON_DB[pokemon.species];
    const candyCost = pokemon.level < 20 ? 1 : pokemon.level < 30 ? 2 : 3;
    const dustCost = pokemon.level < 20 ? 200 : pokemon.level < 30 ? 3000 : 5000;
    
    if (this.state.pokemon.candies[pokemon.species] < candyCost) return false;
    if (this.state.player.stardust < dustCost) return false;
    
    // Aplicar mejoras
    this.state.pokemon.candies[pokemon.species] -= candyCost;
    this.state.player.stardust -= dustCost;
    pokemon.level += 0.5;
    
    // Recalcular CP y HP
    pokemon.cp = calculateCP(base, pokemon.level, pokemon.ivs);
    const oldMaxHp = this.calculateMaxHp({...pokemon, level: pokemon.level - 0.5});
    const newMaxHp = this.calculateMaxHp(pokemon);
    const hpDiff = newMaxHp - oldMaxHp;
    pokemon.currentHp = Math.min(pokemon.currentHp + hpDiff, newMaxHp);
    
    this.saveState();
    return true;
  }

  evolvePokemon(id) {
    const pokemon = this.getPokemonById(id);
    if (!pokemon) return null;
    
    const base = POKEMON_DB[pokemon.species];
    if (!base || base.evolutions.length === 0) return null;
    
    // Verificar requisitos
    if (base.candyToEvolve && 
        (this.state.pokemon.candies[pokemon.species] || 0) < base.candyToEvolve) {
      return null;
    }
    
    if (base.itemToEvolve && !this.hasItem(base.itemToEvolve)) {
      return null;
    }
    
    // Consumir recursos
    if (base.candyToEvolve) {
      this.state.pokemon.candies[pokemon.species] -= base.candyToEvolve;
    }
    if (base.itemToEvolve) {
      this.removeItem(base.itemToEvolve);
    }
    
    // Realizar evolución
    const newSpecies = base.evolutions[0];
    const newBase = POKEMON_DB[newSpecies];
    
    pokemon.species = newSpecies;
    pokemon.cp = calculateCP(newBase, pokemon.level, pokemon.ivs);
    pokemon.currentHp = this.calculateMaxHp(pokemon);
    
    this.saveState();
    return pokemon;
  }

  // Gestión de mapa
  updatePosition(x, y) {
    this.state.map.currentPosition = { x, y };
    this.saveState();
  }

  discoverCell(x, y) {
    const key = `${x},${y}`;
    if (!this.state.map.discoveredCells.includes(key)) {
      this.state.map.discoveredCells.push(key);
      this.saveState();
    }
  }

  addSpawn(spawn) {
    this.state.map.activeSpawns.push({
      ...spawn,
      expiresAt: Date.now() + CONFIG.SPAWN.DESPAWN_TIME
    });
    this.saveState();
  }

  removeSpawn(spawnId) {
    this.state.map.activeSpawns = this.state.map.activeSpawns.filter(s => s.id !== spawnId);
    this.saveState();
  }

  cleanExpiredSpawns() {
    const now = Date.now();
    const before = this.state.map.activeSpawns.length;
    this.state.map.activeSpawns = this.state.map.activeSpawns.filter(s => s.expiresAt > now);
    if (this.state.map.activeSpawns.length !== before) {
      this.saveState();
    }
  }

  spinPokestop(pokestopId) {
    if (this.state.map.visitedPokestops.includes(pokestopId)) {
      return null; // Ya visitado hoy
    }
    
    this.state.map.visitedPokestops.push(pokestopId);
    
    // Recompensas aleatorias
    const rewards = {
      items: {},
      xp: 50
    };
    
    // 3-5 items aleatorios
    const itemCount = 3 + Math.floor(Math.random() * 3);
    const possibleItems = ['poke-ball', 'potion', 'revive', 'razz-berry'];
    
    for (let i = 0; i < itemCount; i++) {
      const item = possibleItems[Math.floor(Math.random() * possibleItems.length)];
      rewards.items[item] = (rewards.items[item] || 0) + 1;
      this.addItem(item, 1);
    }
    
    this.addXP(rewards.xp);
    this.saveState();
    return rewards;
  }

  // Estadísticas
  incrementStat(stat, amount = 1) {
    if (this.state.stats[stat] !== undefined) {
      this.state.stats[stat] += amount;
      this.saveState();
    }
  }

  // Sesión activa
  activateItem(itemType, duration) {
    this.state.session[itemType] = Date.now() + (duration * 1000);
    this.saveState();
  }

  checkActiveItems() {
    const now = Date.now();
    let changed = false;
    
    ['activeIncense', 'activeLuckyEgg', 'activeStarPiece'].forEach(item => {
      if (this.state.session[item] && this.state.session[item] <= now) {
        this.state.session[item] = null;
        changed = true;
      }
    });
    
    if (changed) this.saveState();
  }

  // Reset completo
  reset() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    localStorage.removeItem('monsterGoState');
    this.saveState();
  }
}

// Exportar singleton
export const gameState = new GameState();
