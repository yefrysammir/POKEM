/**
 * MONSTER GO - APLICACIÓN PRINCIPAL
 * Inicialización y coordinación de módulos
 */

import { CONFIG } from './config.js';
import { gameState } from './state.js';
import { Router } from './router.js';
import { MapSystem } from './modules/MapSystem.js';
import { BattleSystem } from './modules/BattleSystem.js';
import { CatchSystem } from './modules/CatchSystem.js';
import { InventorySystem } from './modules/Inventory.js';
import { ShopSystem } from './modules/Shop.js';
import { RaidSystem } from './modules/RaidSystem.js';
import { showToast } from './utils.js';

// Importar vistas
import { MapView } from './views/MapView.js';
import { PokemonView } from './views/PokemonView.js';
import { RaidView } from './views/RaidView.js';
import { InventoryView } from './views/InventoryView.js';
import { ShopView } from './views/ShopView.js';
import { BattleView } from './views/BattleView.js';
import { CatchView } from './views/CatchView.js';

class MonsterGoApp {
  constructor() {
    this.router = null;
    this.systems = {};
    this.views = {};
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    
    try {
      // Mostrar pantalla de carga
      this.showLoading();
      
      // Registrar Service Worker (PWA)
      await this.registerServiceWorker();
      
      // Inicializar sistemas
      this.systems.map = new MapSystem();
      this.systems.battle = new BattleSystem();
      this.systems.catch = new CatchSystem();
      this.systems.inventory = new InventorySystem();
      this.systems.shop = new ShopSystem();
      this.systems.raid = new RaidSystem();
      
      // Inicializar router
      this.router = new Router();
      this.registerRoutes();
      
      // Inicializar vistas
      this.views.map = new MapView(this.systems.map, this.systems.catch);
      this.views.pokemon = new PokemonView(this.systems.inventory);
      this.views.raid = new RaidView(this.systems.raid);
      this.views.inventory = new InventoryView(this.systems.inventory);
      this.views.shop = new ShopView(this.systems.shop);
      this.views.battle = new BattleView(this.systems.battle);
      this.views.catch = new CatchView(this.systems.catch);
      
      // Actualizar UI con datos del jugador
      this.updatePlayerUI();
      
      // Suscribirse a cambios de estado
      gameState.subscribe(() => this.updatePlayerUI());
      
      // Iniciar loops de actualización
      this.startUpdateLoops();
      
      // Navegar a la última ruta o mapa por defecto
      const lastRoute = gameState.state.lastRoute || 'map';
      this.router.navigate(lastRoute);
      
      // Ocultar pantalla de carga
      this.hideLoading();
      
      this.isInitialized = true;
      console.log('Monster GO inicializado correctamente');
      
    } catch (error) {
      console.error('Error inicializando la aplicación:', error);
      showToast('Error al iniciar el juego', 'error');
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registrado:', registration);
      } catch (error) {
        console.log('Error registrando Service Worker:', error);
      }
    }
  }

  registerRoutes() {
    this.router.register('map', () => this.views.map.render());
    this.router.register('pokemon', () => this.views.pokemon.render());
    this.router.register('raid', () => this.views.raid.render());
    this.router.register('inventory', () => this.views.inventory.render());
    this.router.register('shop', () => this.views.shop.render());
  }

  updatePlayerUI() {
    const player = gameState.getPlayer();
    
    // Actualizar nombre y nivel
    document.getElementById('player-name').textContent = player.name;
    document.getElementById('player-level').textContent = player.level;
    
    // Actualizar barra de XP
    const xpPercent = (player.xp / player.xpToNextLevel) * 100;
    document.getElementById('xp-fill').style.width = `${xpPercent}%`;
    
    // Actualizar recursos
    document.getElementById('coins').textContent = player.coins;
    document.getElementById('dust').textContent = player.stardust;
  }

  startUpdateLoops() {
    // Loop principal del juego (60 FPS)
    let lastTime = performance.now();
    
    const gameLoop = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Actualizar spawns del mapa
      this.systems.map.cleanSpawns();
      
      // Verificar items activos
      gameState.checkActiveItems();
      
      // Actualizar raids
      this.systems.raid.getNearbyRaids();
      
      requestAnimationFrame(gameLoop);
    };
    
    requestAnimationFrame(gameLoop);
    
    // Guardar estado cada 30 segundos
    setInterval(() => {
      gameState.saveState();
    }, 30000);
  }

  showLoading() {
    const splash = document.getElementById('splash-screen');
    const app = document.getElementById('app');
    
    splash.classList.remove('hidden');
    app.classList.add('hidden');
    
    // Animación de progreso
    const progress = splash.querySelector('.loading-progress');
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width += 2;
        progress.style.width = width + '%';
      }
    }, 50);
  }

  hideLoading() {
    const splash = document.getElementById('splash-screen');
    const app = document.getElementById('app');
    
    setTimeout(() => {
      splash.classList.add('hidden');
      app.classList.remove('hidden');
    }, 1000);
  }

  // Métodos públicos para acceso global
  startBattle(opponent, playerPokemon) {
    return this.views.battle.start(opponent, playerPokemon);
  }

  startEncounter(spawn) {
    return this.views.catch.start(spawn);
  }

  navigate(route, params) {
    return this.router.navigate(route, params);
  }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.monsterGo = new MonsterGoApp();
  window.monsterGo.init();
});

// Prevenir comportamientos no deseados en móvil
document.addEventListener('touchmove', (e) => {
  if (e.target.closest('.map-container')) {
    e.preventDefault();
  }
}, { passive: false });

// Prevenir zoom en doble tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);
