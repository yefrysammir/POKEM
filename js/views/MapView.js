/**
 * VISTA DEL MAPA
 * Renderizado e interacción con el mapa virtual
 */

import { getSpriteUrl, getSpriteScale } from '../config.js';
import { gameState } from '../state.js';
import { showToast } from '../utils.js';

export class MapView {
  constructor(mapSystem, catchSystem) {
    this.map = mapSystem;
    this.catch = catchSystem;
    this.container = null;
    this.mapGrid = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'view map-view';
    
    container.innerHTML = `
      <div class="map-container">
        <div class="map-grid" id="map-grid"></div>
        
        <div class="radar-container">
          <div class="radar-pulse"></div>
          <span class="radar-text">Buscando Pokémon...</span>
        </div>
        
        <div class="map-controls">
          <button class="map-control-btn" id="btn-locate">
            <span class="material-symbols-outlined">my_location</span>
          </button>
          <button class="map-control-btn primary" id="btn-menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
        
        <div class="nearby-panel" id="nearby-panel">
          <h3>Cerca de ti</h3>
          <div class="nearby-list" id="nearby-list"></div>
        </div>
      </div>
    `;

    this.container = container;
    this.mapGrid = container.querySelector('#map-grid');
    
    this.renderGrid();
    this.renderMapElements();
    this.setupEventListeners();
    this.startNearbyUpdates();
    
    return container;
  }

  renderGrid() {
    this.mapGrid.innerHTML = '';
    
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        const cell = document.createElement('div');
        cell.className = 'map-cell';
        cell.dataset.x = x;
        cell.dataset.y = y;
        
        // Marcar celdas descubiertas
        const key = `${x},${y}`;
        if (gameState.state.map.discoveredCells.includes(key)) {
          cell.classList.add('visited');
        }
        
        // Marcar posición actual
        if (x === this.map.playerPos.x && y === this.map.playerPos.y) {
          cell.classList.add('current');
          this.renderPlayer(cell);
        }
        
        this.mapGrid.appendChild(cell);
      }
    }
  }

  renderPlayer(cell) {
    const player = document.createElement('div');
    player.className = 'player-marker';
    player.innerHTML = '<div class="player-direction"></div>';
    cell.appendChild(player);
  }

  renderMapElements() {
    const data = this.map.getMapData();
    
    // Renderizar spawns
    data.spawns.forEach(spawn => {
      const cell = this.getCell(spawn.x, spawn.y);
      if (cell) {
        this.renderSpawn(cell, spawn);
      }
    });
    
    // Renderizar Poképaradas
    data.pokestops.forEach(stop => {
      const cell = this.getCell(stop.x, stop.y);
      if (cell) {
        this.renderPokestop(cell, stop);
      }
    });
    
    // Renderizar Gimnasios
    data.gyms.forEach(gym => {
      const cell = this.getCell(gym.x, gym.y);
      if (cell) {
        this.renderGym(cell, gym);
      }
    });
    
    // Renderizar Raids
    data.raids.forEach(raid => {
      const cell = this.getCell(raid.location.x, raid.location.y);
      if (cell) {
        this.renderRaid(cell, raid);
      }
    });
  }

  getCell(x, y) {
    return this.mapGrid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  }

  renderSpawn(cell, spawn) {
    const element = document.createElement('div');
    element.className = 'map-element pokemon-spawn';
    if (spawn.pokemon.rarity !== 'common') {
      element.classList.add('rare');
    }
    
    // Obtener escala personalizada
    const scale = getSpriteScale(spawn.pokemon.name);
    
    element.innerHTML = `
      <div class="spawn-ring"></div>
      <img src="${getSpriteUrl(spawn.pokemon.name, spawn.isShiny, false)}" 
           alt="${spawn.pokemon.name}"
           style="--sprite-scale: ${scale / 100}"
           onerror="this.src='${getSpriteUrl('pokeball')}'">
    `;
    
    element.addEventListener('click', () => this.onSpawnClick(spawn));
    cell.appendChild(element);
  }

  renderPokestop(cell, stop) {
    const element = document.createElement('div');
    element.className = 'map-element pokestop';
    if (gameState.state.map.visitedPokestops.includes(stop.id)) {
      element.classList.add('used');
    }
    
    element.innerHTML = `
      <span class="material-symbols-outlined">local_mall</span>
    `;
    
    element.addEventListener('click', () => this.onPokestopClick(stop));
    cell.appendChild(element);
  }

  renderGym(cell, gym) {
    const element = document.createElement('div');
    element.className = `map-element gym ${gym.team || ''}`;
    
    element.innerHTML = `
      <div class="gym-base">
        <span class="material-symbols-outlined">sports_martial_arts</span>
      </div>
    `;
    
    element.addEventListener('click', () => this.onGymClick(gym));
    cell.appendChild(element);
  }

  renderRaid(cell, raid) {
    const element = document.createElement('div');
    element.className = 'map-element raid-boss';
    
    element.innerHTML = `
      <div class="raid-egg stars-${raid.tier}">
        <span class="material-symbols-outlined">egg</span>
      </div>
      <div class="raid-timer">${this.formatRaidTime(raid.startsAt)}</div>
    `;
    
    element.addEventListener('click', () => this.onRaidClick(raid));
    cell.appendChild(element);
  }

  setupEventListeners() {
    // Controles de movimiento (teclado)
    document.addEventListener('keydown', (e) => {
      const keyMap = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        's': 'down',
        'a': 'left',
        'd': 'right'
      };
      
      if (keyMap[e.key]) {
        e.preventDefault();
        this.movePlayer(keyMap[e.key]);
      }
    });
    
    // Botón de localización
    this.container.querySelector('#btn-locate').addEventListener('click', () => {
      this.centerOnPlayer();
    });
    
    // Controles táctiles (swipe para mover)
    let touchStartX = 0;
    let touchStartY = 0;
    
    this.mapGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    this.mapGrid.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 30) {
          this.movePlayer(dx > 0 ? 'right' : 'left');
        }
      } else {
        if (Math.abs(dy) > 30) {
          this.movePlayer(dy > 0 ? 'down' : 'up');
        }
      }
    }, { passive: true });
  }

  movePlayer(direction) {
    if (this.map.movePlayer(direction)) {
      this.renderGrid();
      this.renderMapElements();
      this.updateNearby();
    }
  }

  centerOnPlayer() {
    // Centrar vista en el jugador
    const playerCell = this.getCell(this.map.playerPos.x, this.map.playerPos.y);
    if (playerCell) {
      playerCell.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }

  onSpawnClick(spawn) {
    const dist = Math.abs(spawn.x - this.map.playerPos.x) + 
                 Math.abs(spawn.y - this.map.playerPos.y);
    
    if (dist > 1) {
      showToast('Acércate más para capturar este Pokémon', 'warning');
      return;
    }
    
    // Iniciar encuentro
    window.monsterGo.startEncounter(spawn);
  }

  onPokestopClick(stop) {
    const dist = Math.abs(stop.x - this.map.playerPos.x) + 
                 Math.abs(stop.y - this.map.playerPos.y);
    
    if (dist > 1) {
      showToast('Acércate más para girar la Poképarada', 'warning');
      return;
    }
    
    const result = this.map.interact(stop.x, stop.y);
    if (result.type === 'pokestop') {
      if (result.rewards) {
        showToast(`¡Obtuviste items! +${result.rewards.xp} PX`, 'success');
        this.renderGrid(); // Actualizar estado de la parada
      } else {
        showToast(result.message, 'info');
      }
    }
  }

  onGymClick(gym) {
    showToast('Gimnasio: ' + gym.name, 'info');
    // TODO: Implementar vista de gimnasio
  }

  onRaidClick(raid) {
    const dist = Math.abs(raid.location.x - this.map.playerPos.x) + 
                 Math.abs(raid.location.y - this.map.playerPos.y);
    
    if (dist > 2) {
      showToast('Acércate más para ver la raid', 'warning');
      return;
    }
    
    // Navegar a vista de raid
    window.monsterGo.navigate('raid', { raidId: raid.id });
  }

  startNearbyUpdates() {
    this.updateNearby();
    setInterval(() => this.updateNearby(), 5000);
  }

  updateNearby() {
    const nearby = this.map.getNearbyElements(5);
    const list = this.container.querySelector('#nearby-list');
    
    list.innerHTML = '';
    
    // Combinar todos los elementos cercanos
    const allNearby = [
      ...nearby.spawns.map(s => ({ ...s, type: 'pokemon' })),
      ...nearby.raids.map(r => ({ ...r, type: 'raid' }))
    ].sort((a, b) => a.distance - b.distance);
    
    allNearby.slice(0, 5).forEach(item => {
      const element = document.createElement('div');
      element.className = 'nearby-item';
      
      if (item.type === 'pokemon') {
        const scale = getSpriteScale(item.pokemon.name);
        element.innerHTML = `
          <img src="${getSpriteUrl(item.pokemon.name, item.isShiny, false)}" 
               alt="${item.pokemon.name}"
               style="--sprite-scale: ${scale / 100}">
          <span>${item.pokemon.name}</span>
          <span class="distance">${Math.floor(item.distance * 100)}m</span>
        `;
      } else if (item.type === 'raid') {
        element.innerHTML = `
          <span class="material-symbols-outlined">local_fire_department</span>
          <span>Raid Nivel ${item.tier}</span>
          <span class="distance">${Math.floor(item.distance * 100)}m</span>
        `;
      }
      
      list.appendChild(element);
    });
  }

  formatRaidTime(timestamp) {
    const diff = Math.floor((timestamp - Date.now()) / 1000);
    if (diff <= 0) return '¡Activa!';
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
