/**
 * SISTEMA DE RAIDS
 * Gestión de incursiones contra Pokémon poderosos
 */

import { CONFIG } from '../config.js';
import { gameState } from '../state.js';
import { generateRaidBoss, calculateRaidRewards, getTierConfig, canParticipate } from '../data/raids.js';
import { POKEMON_DB } from '../data/pokemon.js';
import { showToast, generateId } from '../utils.js';

export class RaidSystem {
  constructor() {
    this.activeRaids = new Map();
    this.playerRaids = new Map(); // Raids en progreso del jugador
    this.startRaidGeneration();
  }

  startRaidGeneration() {
    // Generar raids cada hora
    setInterval(() => {
      this.generateNewRaids();
    }, 3600000);
    
    this.generateNewRaids();
  }

  generateNewRaids() {
    // Limpiar raids expiradas
    for (const [id, raid] of this.activeRaids) {
      if (raid.expiresAt < Date.now()) {
        this.activeRaids.delete(id);
      }
    }

    // Generar nuevas raids (2-4 por hora)
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      this.createRaid();
    }
  }

  createRaid() {
    // Determinar tier basado en nivel del jugador
    const playerLevel = gameState.getPlayer().level;
    let tier = 1;
    
    if (playerLevel >= 20 && Math.random() < 0.1) tier = 5;
    else if (playerLevel >= 15 && Math.random() < 0.2) tier = 4;
    else if (playerLevel >= 10 && Math.random() < 0.3) tier = 3;
    else if (playerLevel >= 5 && Math.random() < 0.4) tier = 2;

    const boss = generateRaidBoss(tier);
    if (!boss) return null;

    const config = getTierConfig(tier);
    
    const raid = {
      id: generateId(),
      tier: tier,
      boss: boss,
      location: this.generateLocation(),
      startsAt: Date.now() + 300000, // Empieza en 5 minutos
      expiresAt: Date.now() + 3600000, // Dura 1 hora
      participants: [],
      maxParticipants: config.maxPlayers,
      status: 'upcoming', // upcoming, active, completed
      timeLimit: config.timeLimit
    };

    this.activeRaids.set(raid.id, raid);
    return raid;
  }

  generateLocation() {
    // Generar posición aleatoria cerca del jugador
    const playerPos = gameState.state.map.currentPosition;
    return {
      x: playerPos.x + Math.floor(Math.random() * 10) - 5,
      y: playerPos.y + Math.floor(Math.random() * 10) - 5
    };
  }

  getNearbyRaids(radius = 5) {
    const playerPos = gameState.state.map.currentPosition;
    const nearby = [];

    for (const raid of this.activeRaids.values()) {
      const dist = Math.sqrt(
        Math.pow(raid.location.x - playerPos.x, 2) + 
        Math.pow(raid.location.y - playerPos.y, 2)
      );

      if (dist <= radius) {
        nearby.push({
          ...raid,
          distance: dist,
          canJoin: this.canJoinRaid(raid.id)
        });
      }
    }

    return nearby.sort((a, b) => a.distance - b.distance);
  }

  canJoinRaid(raidId) {
    const raid = this.activeRaids.get(raidId);
    if (!raid) return false;

    if (!canParticipate(gameState.getPlayer().level, raid.tier)) {
      return false;
    }

    if (raid.participants.length >= raid.maxParticipants) {
      return false;
    }

    if (raid.status === 'completed') {
      return false;
    }

    // Verificar pase de raid
    if (!gameState.hasItem('raid-pass') && !gameState.hasItem('premium-raid-pass')) {
      return false;
    }

    return true;
  }

  joinRaid(raidId, team = null) {
    const raid = this.activeRaids.get(raidId);
    if (!raid) return { success: false, error: 'Raid no encontrada' };

    if (!this.canJoinRaid(raidId)) {
      return { success: false, error: 'No puedes unirte a esta raid' };
    }

    // Consumir pase
    if (!gameState.removeItem('raid-pass')) {
      if (!gameState.removeItem('premium-raid-pass')) {
        return { success: false, error: 'Necesitas un pase de raid' };
      }
    }

    // Añadir participante
    raid.participants.push({
      playerId: 'player',
      team: team || gameState.getCurrentTeam(),
      damageDealt: 0
    });

    // Iniciar raid si es el primer participante
    if (raid.status === 'upcoming') {
      raid.status = 'active';
      this.startRaidBattle(raid);
    }

    return { success: true, raid };
  }

  startRaidBattle(raid) {
    const battle = {
      raidId: raid.id,
      boss: { ...raid.boss },
      players: raid.participants.map(p => ({
        ...p,
        currentTeam: p.team.map(pk => ({ ...pk, currentHp: pk.stats.hp }))
      })),
      timeRemaining: raid.timeLimit / 1000, // en segundos
      status: 'active'
    };

    // Simular batalla automática
    const interval = setInterval(() => {
      if (battle.timeRemaining <= 0 || battle.boss.currentHp <= 0) {
        clearInterval(interval);
        this.endRaid(raid, battle);
        return;
      }

      // Boss ataca
      if (Math.random() < 0.3) {
        const target = battle.players[Math.floor(Math.random() * battle.players.length)];
        if (target && target.currentTeam.length > 0) {
          const pokemon = target.currentTeam[0];
          const damage = Math.floor(raid.boss.stats.attack * 0.5);
          pokemon.currentHp = Math.max(0, pokemon.currentHp - damage);
          
          if (pokemon.currentHp <= 0) {
            target.currentTeam.shift(); // Pokémon debilitado
          }
        }
      }

      // Jugadores atacan
      battle.players.forEach(player => {
        if (player.currentTeam.length === 0) return;
        
        const attacker = player.currentTeam[0];
        const damage = Math.floor(attacker.stats.attack * 0.3);
        battle.boss.currentHp = Math.max(0, battle.boss.currentHp - damage);
        player.damageDealt += damage;
      });

      battle.timeRemaining--;
    }, 1000);

    this.playerRaids.set(raid.id, battle);
  }

  endRaid(raid, battle) {
    const victory = battle.boss.currentHp <= 0;
    
    if (victory) {
      raid.status = 'victory';
      
      // Calcular contribución del jugador
      const totalDamage = battle.players.reduce((sum, p) => sum + p.damageDealt, 0);
      const playerDamage = battle.players.find(p => p.playerId === 'player')?.damageDealt || 0;
      const contribution = totalDamage > 0 ? playerDamage / totalDamage : 0;

      // Recompensas
      const rewards = calculateRaidRewards(raid.tier, contribution);
      
      // Aplicar recompensas
      gameState.addXP(rewards.xp);
      gameState.addStardust(rewards.dust);
      Object.entries(rewards.items).forEach(([item, qty]) => {
        if (item !== 'stardust') {
          gameState.addItem(item, qty);
        }
      });

      // Oportunidad de captura
      const catchChance = getTierConfig(raid.tier).catchChance;
      const canCatch = Math.random() < catchChance;

      showToast(
        `¡Raid completada! +${rewards.xp} PX, +${rewards.dust} Polvo`,
        'success'
      );

      gameState.incrementStat('raidsCompleted');

      return {
        victory: true,
        rewards,
        catchOpportunity: canCatch ? battle.boss : null
      };
    } else {
      raid.status = 'defeat';
      showToast('La raid ha fallado. ¡Inténtalo de nuevo!', 'error');
      
      return {
        victory: false,
        rewards: null
      };
    }
  }

  attemptCatch(boss, ballType) {
    // Sistema de captura post-raid
    const catchRate = 0.1 + (ballType === 'premier-ball' ? 0.05 : 0);
    const shakes = Math.floor(Math.random() * 3) + 1;
    const caught = Math.random() < catchRate;

    if (caught) {
      const pokemon = gameState.addPokemon({
        species: boss.species,
        level: 20, // Nivel fijo para raids
        ivs: boss.ivs,
        cp: boss.cp,
        isShiny: boss.isShiny,
        moves: boss.moves
      });

      return { success: true, pokemon, shakes };
    }

    return { success: false, shakes, fled: Math.random() < 0.3 };
  }

  getRaidStatus(raidId) {
    return this.playerRaids.get(raidId) || null;
  }

  getActiveRaidsCount() {
    return this.activeRaids.size;
  }
}
