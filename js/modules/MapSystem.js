/**
 * SISTEMA DE MAPA VIRTUAL
 * Genera y gestiona el mundo de juego 2D
 */

import { CONFIG } from '../config.js';
import { gameState } from '../state.js';
import { getRandomPokemon } from '../data/pokemon.js';
import { generateId, randomInt, distance } from '../utils.js';

export class MapSystem {
  constructor() {
    this.gridSize = 20;
    this.cellSize = 60;
    this.spawns = new Map();
    this.pokestops = new Map();
    this.gyms = new Map();
    this.raids = new Map();
    this.playerPos = { x: 10, y: 10 };
    this.viewport = { width: 0, height: 0 };
    
    this.init();
  }

  init() {
    this.generateStaticFeatures();
    this.startSpawnSystem();
  }

  generateStaticFeatures() {
    // Generar Poképaradas fijas
    for (let i = 0; i < 15; i++) {
      const pos = this.getRandomPosition();
      this.pokestops.set(`${pos.x},${pos.y}`, {
        id: generateId(),
        x: pos.x,
        y: pos.y,
        name: `Parada ${i + 1}`,
        type: 'pokestop',
        cooldown: 300000 // 5 minutos
      });
    }

    // Generar Gimnasios
    for (let i = 0; i < 8; i++) {
      const pos = this.getRandomPosition();
      this.gyms.set(`${pos.x},${pos.y}`, {
        id: generateId(),
        x: pos.x,
        y: pos.y,
        name: `Gimnasio ${i + 1}`,
        type: 'gym',
        team: null,
        prestige: 0
      });
    }
  }

  getRandomPosition() {
    return {
      x: randomInt(2, this.gridSize - 3),
      y: randomInt(2, this.gridSize - 3)
    };
  }

  startSpawnSystem() {
    // Generar spawns cada 30 segundos
    setInterval(() => {
      this.generateSpawns();
    }, 30000);
    
    // Limpiar spawns expirados
    setInterval(() => {
      this.cleanSpawns();
    }, 60000);
    
    this.generateSpawns();
  }

  generateSpawns() {
    const maxSpawns = CONFIG.SPAWN.MAX_SPAWNS;
    const currentSpawns = this.spawns.size;
    
    if (currentSpawns >= maxSpawns) return;
    
    const toSpawn = Math.min(maxSpawns - currentSpawns, 3);
    
    for (let i = 0; i < toSpawn; i++) {
      if (Math.random() > CONFIG.SPAWN.SPAWN_RATE) continue;
      
      const pos = this.getSpawnPositionNearPlayer();
      const pokemon = getRandomPokemon();
      
      const spawn = {
        id: generateId(),
        x: pos.x,
        y: pos.y,
        pokemon: pokemon,
        level: randomInt(1, Math.min(gameState.getPlayer().level + 2, 30)),
        ivs: {
          attack: randomInt(0, 15),
          defense: randomInt(0, 15),
          hp: randomInt(0, 15)
        },
        isShiny: Math.random() < CONFIG.SPAWN.SHINY_CHANCE,
        expiresAt: Date.now() + CONFIG.SPAWN.DESPAWN_TIME,
        fleeChance: 0.1 + (pokemon.rarity === 'legendary' ? 0.3 : 0)
      };
      
      this.spawns.set(spawn.id, spawn);
      gameState.addSpawn(spawn);
    }
  }

  getSpawnPositionNearPlayer() {
    const range = 5;
    let attempts = 0;
    let pos;
    
    do {
      pos = {
        x: this.playerPos.x + randomInt(-range, range),
        y: this.playerPos.y + randomInt(-range, range)
      };
      attempts++;
    } while (
      (pos.x < 0 || pos.x >= this.gridSize || 
       pos.y < 0 || pos.y >= this.gridSize ||
       (pos.x === this.playerPos.x && pos.y === this.playerPos.y)) &&
      attempts < 20
    );
    
    return pos;
  }

  cleanSpawns() {
    const now = Date.now();
    for (const [id, spawn] of this.spawns) {
      if (spawn.expiresAt <= now) {
        this.spawns.delete(id);
        gameState.removeSpawn(id);
      }
    }
  }

  movePlayer(direction) {
    const newPos = { ...this.playerPos };
    
    switch(direction) {
      case 'up': newPos.y--; break;
      case 'down': newPos.y++; break;
      case 'left': newPos.x--; break;
      case 'right': newPos.x++; break;
    }
    
    // Verificar límites
    if (newPos.x < 0 || newPos.x >= this.gridSize || 
        newPos.y < 0 || newPos.y >= this.gridSize) {
      return false;
    }
    
    this.playerPos = newPos;
    gameState.updatePosition(newPos.x, newPos.y);
    gameState.discoverCell(newPos.x, newPos.y);
    
    return true;
  }

  getNearbyElements(radius = 3) {
    const nearby = {
      spawns: [],
      pokestops: [],
      gyms: [],
      raids: []
    };
    
    // Spawns
    for (const spawn of this.spawns.values()) {
      const dist = distance(this.playerPos, { x: spawn.x, y: spawn.y });
      if (dist <= radius) {
        nearby.spawns.push({ ...spawn, distance: dist });
      }
    }
    
    // Poképaradas
    for (const stop of this.pokestops.values()) {
      const dist = distance(this.playerPos, { x: stop.x, y: stop.y });
      if (dist <= radius) {
        nearby.pokestops.push({ ...stop, distance: dist });
      }
    }
    
    // Gimnasios
    for (const gym of this.gyms.values()) {
      const dist = distance(this.playerPos, { x: gym.x, y: gym.y });
      if (dist <= radius) {
        nearby.gyms.push({ ...gym, distance: dist });
      }
    }
    
    // Raids
    for (const raid of this.raids.values()) {
      const dist = distance(this.playerPos, { x: raid.x, y: raid.y });
      if (dist <= radius) {
        nearby.raids.push({ ...raid, distance: dist });
      }
    }
    
    return nearby;
  }

  interact(x, y) {
    const key = `${x},${y}`;
    const pos = { x, y };
    const dist = distance(this.playerPos, pos);
    
    if (dist > 1) return { type: 'none', message: 'Demasiado lejos' };
    
    // Verificar Poképarada
    const stop = this.pokestops.get(key);
    if (stop) {
      const rewards = gameState.spinPokestop(stop.id);
      if (rewards) {
        return { type: 'pokestop', rewards };
      }
      return { type: 'pokestop', message: 'En enfriamiento' };
    }
    
    // Verificar Gimnasio
    const gym = this.gyms.get(key);
    if (gym) {
      return { type: 'gym', gym };
    }
    
    // Verificar Spawn
    for (const spawn of this.spawns.values()) {
      if (spawn.x === x && spawn.y === y) {
        return { type: 'pokemon', spawn };
      }
    }
    
    return { type: 'none' };
  }

  addRaid(raid) {
    this.raids.set(raid.id, raid);
  }

  removeRaid(raidId) {
    this.raids.delete(raidId);
  }

  getMapData() {
    return {
      player: this.playerPos,
      spawns: Array.from(this.spawns.values()),
      pokestops: Array.from(this.pokestops.values()),
      gyms: Array.from(this.gyms.values()),
      raids: Array.from(this.raids.values()),
      discovered: gameState.state.map.discoveredCells
    };
  }
}
