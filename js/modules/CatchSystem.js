/**
 * SISTEMA DE CAPTURA
 * Mecánicas de lanzamiento y captura de Pokémon
 */

import { CONFIG } from '../config.js';
import { gameState } from '../state.js';
import { POKEMON_DB, calculateCP, calculateIVPercentage } from '../data/pokemon.js';
import { getItem } from '../data/items.js';
import { randomRange, showToast, vibrate } from '../utils.js';

export class CatchSystem {
  constructor() {
    this.currentEncounter = null;
  }

  startEncounter(spawn) {
    const base = POKEMON_DB[spawn.pokemon];
    
    this.currentEncounter = {
      spawn: spawn,
      pokemon: {
        species: spawn.species || spawn.pokemon.name.toLowerCase(),
        level: spawn.level,
        ivs: spawn.ivs,
        isShiny: spawn.isShiny,
        cp: calculateCP(base, spawn.level, spawn.ivs),
        moves: spawn.moves || { fast: 'tackle', charged: ['struggle'] }
      },
      catchRate: this.calculateCatchRate(spawn),
      fleeRate: spawn.fleeChance || 0.1,
      berries: {
        used: null,
        effect: null
      },
      balls: {
        used: 'poke-ball'
      },
      status: 'active', // active, caught, fled
      animation: null
    };

    return this.currentEncounter;
  }

  calculateCatchRate(spawn) {
    const base = POKEMON_DB[spawn.pokemon];
    if (!base) return 0.4;

    // Base según rareza
    let rate = CONFIG.CATCH.BASE_CATCH_RATE;
    switch(base.rarity) {
      case 'common': rate = 0.5; break;
      case 'uncommon': rate = 0.4; break;
      case 'rare': rate = 0.3; break;
      case 'epic': rate = 0.2; break;
      case 'legendary': rate = 0.05; break;
      default: rate = 0.4;
    }

    // Modificador por nivel
    rate *= (1 - (spawn.level / 100));

    return Math.max(0.05, Math.min(0.9, rate));
  }

  throwBall(ballType, throwQuality = 'normal') {
    if (!this.currentEncounter) return null;
    
    const ball = getItem(ballType);
    if (!ball || !gameState.hasItem(ballType)) {
      return { success: false, reason: 'No tienes esa Poké Ball' };
    }

    // Consumir ball
    gameState.removeItem(ballType);
    this.currentEncounter.balls.used = ballType;

    // Calcular probabilidad final
    let catchRate = this.currentEncounter.catchRate;
    
    // Modificador de ball
    catchRate *= ball.catchRate;
    
    // Modificador de baya
    if (this.currentEncounter.berries.used) {
      const berry = getItem(this.currentEncounter.berries.used);
      if (berry) {
        catchRate *= berry.catchBonus || 1;
      }
    }
    
    // Modificador de lanzamiento
    const throwBonus = {
      'normal': 1,
      'nice': CONFIG.CATCH.NICE_BONUS,
      'great': 1.5,
      'excellent': CONFIG.CATCH.EXCELLENT_BONUS
    };
    catchRate *= throwBonus[throwQuality] || 1;

    // Modificador de curva
    if (throwQuality === 'curve') {
      catchRate *= CONFIG.CATCH.CURVEBALL_BONUS;
    }

    // Límite de 100%
    catchRate = Math.min(0.99, catchRate);

    // Intentar captura (3 movimientos de ball)
    const shakes = this.attemptCatch(catchRate);
    
    return {
      shakes: shakes,
      caught: shakes === 3,
      flee: shakes < 3 && Math.random() < this.currentEncounter.fleeRate,
      quality: throwQuality
    };
  }

  attemptCatch(catchRate) {
    let shakes = 0;
    
    for (let i = 0; i < 3; i++) {
      // Fórmula de captura de Pokémon GO simplificada
      const random = Math.random();
      const threshold = catchRate * (1 - (i * 0.1)); // Más difícil cada shake
      
      if (random < threshold) {
        shakes++;
      } else {
        break;
      }
    }
    
    return shakes;
  }

  useBerry(berryType) {
    if (!this.currentEncounter) return false;
    
    const berry = getItem(berryType);
    if (!berry || !gameState.hasItem(berryType)) return false;
    
    if (berry.category !== 'berries') return false;
    
    gameState.removeItem(berryType);
    this.currentEncounter.berries.used = berryType;
    this.currentEncounter.berries.effect = berry;
    
    return true;
  }

  fleeAttempt() {
    if (!this.currentEncounter) return false;
    
    if (Math.random() < this.currentEncounter.fleeRate) {
      this.currentEncounter.status = 'fled';
      return true;
    }
    return false;
  }

  completeCapture() {
    if (!this.currentEncounter) return null;
    
    const encounter = this.currentEncounter;
    const pokemon = encounter.pokemon;
    
    // Calcular caramelos
    const base = POKEMON_DB[pokemon.species];
    const candyBonus = encounter.berries.effect?.candyBonus || 1;
    const candies = 3 * candyBonus + (pokemon.isShiny ? 5 : 0);
    
    // XP por captura
    let xp = 100;
    if (pokemon.isShiny) xp += 500;
    if (base.rarity === 'legendary') xp += 1000;
    
    // Añadir Pokémon al inventario
    const caughtPokemon = gameState.addPokemon({
      species: pokemon.species,
      level: pokemon.level,
      ivs: pokemon.ivs,
      cp: pokemon.cp,
      isShiny: pokemon.isShiny,
      moves: pokemon.moves,
      currentHp: 100 // HP completo al capturar
    });

    if (caughtPokemon) {
      gameState.addXP(xp);
      gameState.addStardust(100 + pokemon.level * 10);
      
      // Registrar en Pokédex
      gameState.state.stats.pokemonSeen++;
      
      vibrate([50, 100, 50]);
      
      return {
        success: true,
        pokemon: caughtPokemon,
        xp: xp,
        candies: candies,
        isNew: !gameState.state.pokemon.collection.some(
          p => p.species === pokemon.species && p.id !== caughtPokemon.id
        )
      };
    }
    
    return { success: false, reason: 'Almacenamiento lleno' };
  }

  getEncounterState() {
    return this.currentEncounter;
  }

  endEncounter() {
    const state = this.currentEncounter;
    this.currentEncounter = null;
    return state;
  }
}
