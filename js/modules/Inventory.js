/**
 * SISTEMA DE MOCHILA
 * Gestión de items, Pokémon y equipo
 */

import { gameState } from '../state.js';
import { getItem } from '../data/items.js';
import { POKEMON_DB, calculateIVPercentage } from '../data/pokemon.js';
import { formatNumber, showToast } from '../utils.js';

export class InventorySystem {
  constructor() {
    this.currentFilter = 'all';
    this.currentSort = 'cp';
    this.selectedPokemon = null;
  }

  // Gestión de items
  getItems() {
    const items = [];
    for (const [id, quantity] of Object.entries(gameState.getInventory().items)) {
      const item = getItem(id);
      if (item) {
        items.push({ ...item, quantity });
      }
    }
    return items;
  }

  getItemsByCategory(category) {
    return this.getItems().filter(item => item.category === category);
  }

  useItem(itemId, targetId = null) {
    const item = getItem(itemId);
    if (!item || !gameState.hasItem(itemId)) return false;

    switch(item.category) {
      case 'medicine':
        return this.useMedicine(item, targetId);
      case 'berries':
        // Las bayas se usan en encuentro, no aquí
        return false;
      default:
        return false;
    }
  }

  useMedicine(item, pokemonId) {
    const pokemon = gameState.getPokemonById(pokemonId);
    if (!pokemon) return false;

    if (item.healAmount) {
      const healed = gameState.healPokemon(pokemonId, item.healAmount);
      if (healed > 0) {
        gameState.removeItem(item.id);
        showToast(`${pokemon.name} recuperó ${healed} PS`, 'success');
        return true;
      }
    }

    if (item.revive && pokemon.currentHp <= 0) {
      if (gameState.revivePokemon(pokemonId, item.healPercent)) {
        gameState.removeItem(item.id);
        const percent = Math.floor(item.healPercent * 100);
        showToast(`${pokemon.name} fue revivido con ${percent}% PS`, 'success');
        return true;
      }
    }

    return false;
  }

  discardItem(itemId, quantity = 1) {
    if (gameState.removeItem(itemId, quantity)) {
      showToast(`Descartaste ${quantity} ${getItem(itemId).name}`, 'info');
      return true;
    }
    return false;
  }

  // Gestión de Pokémon
  getPokemonList(filter = this.currentFilter, sort = this.currentSort) {
    let pokemon = gameState.getPokemonCollection();

    // Aplicar filtros
    if (filter !== 'all') {
      switch(filter) {
        case 'favorites':
          pokemon = pokemon.filter(p => p.favorite);
          break;
        case 'shiny':
          pokemon = pokemon.filter(p => p.isShiny);
          break;
        case 'legendary':
          pokemon = pokemon.filter(p => {
            const base = POKEMON_DB[p.species];
            return base && base.isLegendary;
          });
          break;
        default:
          // Filtrar por tipo
          pokemon = pokemon.filter(p => {
            const base = POKEMON_DB[p.species];
            return base && base.types.includes(filter);
          });
      }
    }

    // Aplicar ordenamiento
    pokemon.sort((a, b) => {
      switch(sort) {
        case 'cp':
          return b.cp - a.cp;
        case 'recent':
          return new Date(b.caughtAt) - new Date(a.caughtAt);
        case 'pokedex':
          const baseA = POKEMON_DB[a.species];
          const baseB = POKEMON_DB[b.species];
          return (baseA?.id || 0) - (baseB?.id || 0);
        case 'hp':
          return b.currentHp - a.currentHp;
        case 'iv':
          return calculateIVPercentage(b.ivs) - calculateIVPercentage(a.ivs);
        default:
          return 0;
      }
    });

    return pokemon;
  }

  getPokemonDetails(id) {
    const pokemon = gameState.getPokemonById(id);
    if (!pokemon) return null;

    const base = POKEMON_DB[pokemon.species];
    const ivPercent = calculateIVPercentage(pokemon.ivs);

    return {
      ...pokemon,
      base,
      ivPercent,
      ivRating: this.getIVRating(ivPercent),
      maxHp: gameState.calculateMaxHp(pokemon),
      canEvolve: this.canEvolve(pokemon),
      evolutionCost: this.getEvolutionCost(pokemon),
      isInTeam: gameState.state.currentTeam.includes(id)
    };
  }

  getIVRating(percent) {
    if (percent >= 100) return { label: 'Perfecto', color: '#FFD700', stars: 3 };
    if (percent >= 82) return { label: 'Increíble', color: '#00E676', stars: 3 };
    if (percent >= 66) return { label: 'Bueno', color: '#FFD93D', stars: 2 };
    if (percent >= 50) return { label: 'Decente', color: '#FF6B6B', stars: 1 };
    return { label: 'Bajo', color: '#A0A0A0', stars: 0 };
  }

  canEvolve(pokemon) {
    const base = POKEMON_DB[pokemon.species];
    if (!base || base.evolutions.length === 0) return false;

    if (base.candyToEvolve) {
      const candies = gameState.state.pokemon.candies[pokemon.species] || 0;
      if (candies < base.candyToEvolve) return false;
    }

    if (base.itemToEvolve) {
      if (!gameState.hasItem(base.itemToEvolve)) return false;
    }

    return true;
  }

  getEvolutionCost(pokemon) {
    const base = POKEMON_DB[pokemon.species];
    if (!base) return null;

    return {
      candy: base.candyToEvolve,
      item: base.itemToEvolve ? getItem(base.itemToEvolve) : null,
      currentCandies: gameState.state.pokemon.candies[pokemon.species] || 0
    };
  }

  evolvePokemon(id) {
    const result = gameState.evolvePokemon(id);
    if (result) {
      showToast(`¡${result.name} ha evolucionado!`, 'success');
      return result;
    }
    return null;
  }

  powerUpPokemon(id) {
    if (gameState.powerUpPokemon(id)) {
      const pokemon = gameState.getPokemonById(id);
      showToast(`¡${pokemon.name} se ha fortalecido! PC: ${pokemon.cp}`, 'success');
      return true;
    }
    showToast('No tienes suficientes recursos', 'error');
    return false;
  }

  transferPokemon(id) {
    const pokemon = gameState.getPokemonById(id);
    if (!pokemon) return false;

    if (pokemon.favorite) {
      showToast('No puedes transferir Pokémon favoritos', 'error');
      return false;
    }

    if (gameState.state.currentTeam.includes(id)) {
      showToast('No puedes transferir Pokémon en tu equipo', 'error');
      return false;
    }

    if (confirm(`¿Transferir a ${pokemon.name} al Profesor? Obtendrás 1 caramelo.`)) {
      if (gameState.transferPokemon(id)) {
        showToast(`${pokemon.name} fue transferido`, 'info');
        return true;
      }
    }
    return false;
  }

  toggleFavorite(id) {
    const isFavorite = gameState.toggleFavorite(id);
    const pokemon = gameState.getPokemonById(id);
    showToast(
      isFavorite ? `${pokemon.name} es ahora favorito` : `${pokemon.name} ya no es favorito`,
      'info'
    );
    return isFavorite;
  }

  // Gestión de equipo
  getCurrentTeam() {
    return gameState.getCurrentTeam();
  }

  addToTeam(pokemonId) {
    const result = gameState.addToTeam(pokemonId);
    if (result) {
      const pokemon = gameState.getPokemonById(pokemonId);
      showToast(`${pokemon.name} se unió al equipo`, 'success');
    } else {
      showToast('El equipo está completo o el Pokémon no puede unirse', 'error');
    }
    return result;
  }

  removeFromTeam(pokemonId) {
    const result = gameState.removeFromTeam(pokemonId);
    if (result) {
      const pokemon = gameState.getPokemonById(pokemonId);
      showToast(`${pokemon.name} dejó el equipo`, 'info');
    }
    return result;
  }

  // Información de almacenamiento
  getStorageInfo() {
    const pokemon = gameState.getPokemonCollection();
    const items = gameState.getInventory();
    
    return {
      pokemon: {
        current: pokemon.length,
        max: gameState.state.pokemon.maxStorage
      },
      items: {
        current: Object.values(items.items).reduce((a, b) => a + b, 0),
        max: items.maxSize
      }
    };
  }
}
