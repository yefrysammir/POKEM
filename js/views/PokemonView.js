/**
 * VISTA DE POKÉMON
 * Gestión de la colección y detalles
 */

import { getSpriteUrl, getSpriteScale } from '../config.js';
import { gameState } from '../state.js';
import { POKEMON_DB } from '../data/pokemon.js';
import { showToast } from '../utils.js';

export class PokemonView {
  constructor(inventorySystem) {
    this.inventory = inventorySystem;
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'view pokemon-view';
    
    container.innerHTML = `
      <div class="view-header">
        <h2>Tus Pokémon</h2>
        <div class="storage-info" id="storage-info"></div>
      </div>
      
      <div class="filters-bar">
        <select id="filter-type">
          <option value="all">Todos</option>
          <option value="favorites">Favoritos</option>
          <option value="shiny">Shiny</option>
          <option value="legendary">Legendarios</option>
          <option value="normal">Normal</option>
          <option value="fire">Fuego</option>
          <option value="water">Agua</option>
          <option value="grass">Planta</option>
          <option value="electric">Eléctrico</option>
          <option value="ice">Hielo</option>
          <option value="fighting">Lucha</option>
          <option value="poison">Veneno</option>
          <option value="ground">Tierra</option>
          <option value="flying">Volador</option>
          <option value="psychic">Psíquico</option>
          <option value="bug">Bicho</option>
          <option value="rock">Roca</option>
          <option value="ghost">Fantasma</option>
          <option value="dragon">Dragón</option>
          <option value="dark">Siniestro</option>
          <option value="steel">Acero</option>
          <option value="fairy">Hada</option>
        </select>
        
        <select id="sort-by">
          <option value="cp">PC</option>
          <option value="recent">Recientes</option>
          <option value="pokedex">Pokédex</option>
          <option value="iv">IVs</option>
        </select>
      </div>
      
      <div class="pokemon-grid" id="pokemon-grid"></div>
    `;

    this.container = container;
    this.setupEventListeners();
    this.updateStorageInfo();
    this.renderPokemonList();
    
    return container;
  }

  setupEventListeners() {
    const filterSelect = this.container.querySelector('#filter-type');
    const sortSelect = this.container.querySelector('#sort-by');
    
    filterSelect.addEventListener('change', () => {
      this.renderPokemonList(filterSelect.value, sortSelect.value);
    });
    
    sortSelect.addEventListener('change', () => {
      this.renderPokemonList(filterSelect.value, sortSelect.value);
    });
  }

  updateStorageInfo() {
    const info = this.inventory.getStorageInfo();
    const el = this.container.querySelector('#storage-info');
    el.textContent = `${info.pokemon.current}/${info.pokemon.max}`;
  }

  renderPokemonList(filter = 'all', sort = 'cp') {
    const grid = this.container.querySelector('#pokemon-grid');
    const pokemon = this.inventory.getPokemonList(filter, sort);
    
    grid.innerHTML = '';
    
    if (pokemon.length === 0) {
      grid.innerHTML = '<div class="empty-state">No tienes Pokémon</div>';
      return;
    }
    
    pokemon.forEach(p => {
      const card = this.createPokemonCard(p);
      grid.appendChild(card);
    });
  }

  createPokemonCard(pokemon) {
    const base = POKEMON_DB[pokemon.species];
    const details = this.inventory.getPokemonDetails(pokemon.id);
    const scale = getSpriteScale(base.name);
    
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    if (pokemon.favorite) card.classList.add('favorite');
    if (pokemon.isShiny) card.classList.add('shiny');
    
    card.innerHTML = `
      <div class="card-header">
        <span class="cp-badge">${pokemon.cp}</span>
        ${pokemon.favorite ? '<span class="material-symbols-outlined favorite-icon">star</span>' : ''}
      </div>
      
      <div class="pokemon-sprite" style="--sprite-scale: ${scale / 100}">
        <img src="${getSpriteUrl(base.name, pokemon.isShiny, false)}" 
             alt="${base.name}"
             onerror="this.src='${getSpriteUrl('pokeball')}'">
        ${pokemon.isShiny ? '<div class="shiny-sparkle">✨</div>' : ''}
      </div>
      
      <div class="pokemon-info">
        <h3>${base.name}</h3>
        <div class="types">
          ${base.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join('')}
        </div>
        <div class="iv-rating" style="color: ${details.ivRating.color}">
          ${details.ivRating.label} (${details.ivPercent}%)
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => this.showPokemonDetails(pokemon.id));
    
    return card;
  }

  getPokemonDetails(id) {
    const pokemon = gameState.getPokemonById(id);
    if (!pokemon) return null;

    const base = POKEMON_DB[pokemon.species];
    const ivPercent = this.calculateIVPercentage(pokemon.ivs);

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

  calculateIVPercentage(ivs) {
    const maxIV = 45;
    const currentIV = ivs.attack + ivs.defense + ivs.hp;
    return Math.round((currentIV / maxIV) * 100);
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
      item: base.itemToEvolve ? this.getItemName(base.itemToEvolve) : null,
      currentCandies: gameState.state.pokemon.candies[pokemon.species] || 0
    };
  }

  getItemName(itemId) {
    const items = {
      'thunder-stone': 'Piedra Trueno',
      'fire-stone': 'Piedra Fuego',
      'water-stone': 'Piedra Agua',
      'leaf-stone': 'Piedra Hoja',
      'moon-stone': 'Piedra Lunar',
      'sun-stone': 'Piedra Solar',
      'kings-rock': 'Roca del Rey',
      'metal-coat': 'Revestimiento Metálico',
      'dragon-scale': 'Escama Dragón',
      'upgrade': 'Mejora'
    };
    return items[itemId] || itemId;
  }

  showPokemonDetails(id) {
    const details = this.getPokemonDetails(id);
    if (!details) return;
    
    const scale = getSpriteScale(details.base.name);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal pokemon-modal">
        <div class="modal-header">
          <h2>${details.base.name}</h2>
          <button class="modal-close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="pokemon-detail-header">
            <div class="detail-sprite" style="--sprite-scale: ${scale / 100}">
              <img src="${getSpriteUrl(details.base.name, details.isShiny, false)}" 
                   alt="${details.base.name}"
                   onerror="this.src='${getSpriteUrl('pokeball')}'">
            </div>
            <div class="detail-info">
              <span class="cp-badge">${details.cp}</span>
              <div class="iv-badge" style="background: ${details.ivRating.color}">
                ${details.ivRating.label}
              </div>
              <p>Nivel ${details.level}</p>
              ${details.isShiny ? '<p class="shiny-text">✨ Shiny</p>' : ''}
            </div>
          </div>
          
          <div class="stats-section">
            <h4>Estadísticas</h4>
            ${this.renderStatBar('PS', details.currentHp || details.maxHp, details.maxHp, details.ivs.hp)}
            ${this.renderStatBar('Ataque', details.stats.attack, details.stats.attack, details.ivs.attack)}
            ${this.renderStatBar('Defensa', details.stats.defense, details.stats.defense, details.ivs.defense)}
          </div>
          
          <div class="moves-section">
            <h4>Ataques</h4>
            <div class="move-item">
              <span class="type-badge type-${details.moves.fast.type || 'normal'}">${details.moves.fast.type || 'normal'}</span>
              <span>${details.moves.fast.name || 'Placaje'}</span>
            </div>
            ${(details.moves.charged || []).map(m => `
              <div class="move-item">
                <span class="type-badge type-${m.type || 'normal'}">${m.type || 'normal'}</span>
                <span>${m.name}</span>
              </div>
            `).join('')}
          </div>
          
          ${details.canEvolve ? `
            <div class="evolution-section">
              <h4>Evolución</h4>
              <p>Requiere: ${details.evolutionCost.candy} caramelos${details.evolutionCost.item ? ` y ${details.evolutionCost.item}` : ''}</p>
              <p>Tienes: ${details.evolutionCost.currentCandies} caramelos</p>
              <button class="btn btn-primary" id="btn-evolve">Evolucionar</button>
            </div>
          ` : ''}
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" id="btn-favorite">
            <span class="material-symbols-outlined">${details.favorite ? 'star' : 'star_border'}</span>
            ${details.favorite ? 'Quitar favorito' : 'Favorito'}
          </button>
          <button class="btn btn-primary" id="btn-powerup">
            <span class="material-symbols-outlined">trending_up</span>
            Mejorar
          </button>
          <button class="btn btn-danger" id="btn-transfer">
            <span class="material-symbols-outlined">delete</span>
            Transferir
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.remove();
    });
    
    modal.querySelector('#btn-favorite').addEventListener('click', () => {
      const isFavorite = gameState.toggleFavorite(id);
      showToast(
        isFavorite ? `${details.base.name} es ahora favorito` : `${details.base.name} ya no es favorito`,
        'info'
      );
      modal.remove();
      this.renderPokemonList();
    });
    
    modal.querySelector('#btn-powerup').addEventListener('click', () => {
      if (gameState.powerUpPokemon(id)) {
        showToast(`${details.base.name} se ha fortalecido`, 'success');
        modal.remove();
        this.renderPokemonList();
      } else {
        showToast('No tienes suficientes recursos', 'error');
      }
    });
    
    modal.querySelector('#btn-transfer').addEventListener('click', () => {
      if (confirm(`¿Transferir a ${details.base.name} al Profesor? Obtendrás 1 caramelo.`)) {
        if (gameState.transferPokemon(id)) {
          showToast(`${details.base.name} fue transferido`, 'info');
          modal.remove();
          this.renderPokemonList();
          this.updateStorageInfo();
        }
      }
    });
    
    const evolveBtn = modal.querySelector('#btn-evolve');
    if (evolveBtn) {
      evolveBtn.addEventListener('click', () => {
        const evolved = gameState.evolvePokemon(id);
        if (evolved) {
          showToast(`¡${evolved.name} ha evolucionado!`, 'success');
          modal.remove();
          this.renderPokemonList();
        } else {
          showToast('No se pudo evolucionar', 'error');
        }
      });
    }
  }

  renderStatBar(label, current, max, iv) {
    const percent = Math.min(100, (current / max) * 100);
    return `
      <div class="stat-bar">
        <span class="stat-label">${label}</span>
        <div class="stat-progress">
          <div class="stat-fill" style="width: ${percent}%; background: ${this.getIVColor(iv)}"></div>
        </div>
        <span class="stat-value">${current} (IV: ${iv})</span>
      </div>
    `;
  }

  getIVColor(iv) {
    if (iv >= 13) return '#00E676';
    if (iv >= 8) return '#FFD93D';
    return '#FF6B6B';
  }
}
