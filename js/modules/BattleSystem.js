/**
 * SISTEMA DE COMBATE
 * Gestiona batallas PvE y PvP con mecánicas de Pokémon GO
 */

import { CONFIG } from '../config.js';
import { gameState } from '../state.js';
import { getEffectiveness } from '../data/types.js';
import { getMove } from '../data/moves.js';
import { POKEMON_DB, calculateStats } from '../data/pokemon.js';
import { randomRange, showToast } from '../utils.js';

export class BattleSystem {
  constructor() {
    this.battle = null;
    this.callbacks = {};
  }

  startWildBattle(wildPokemon, playerPokemon) {
    const battle = {
      type: 'wild',
      player: this.createBattlePokemon(playerPokemon, true),
      opponent: this.createBattlePokemon(wildPokemon, false),
      timer: 100,
      turn: 0,
      log: [],
      status: 'active' // active, victory, defeat, fled
    };

    // Calcular HP máximo
    battle.player.maxHp = battle.player.stats.hp;
    battle.opponent.maxHp = battle.opponent.stats.hp;
    battle.player.currentHp = battle.player.maxHp;
    battle.opponent.currentHp = battle.opponent.maxHp;

    // Inicializar energía
    battle.player.energy = 0;
    battle.opponent.energy = 0;

    this.battle = battle;
    return battle;
  }

  startRaidBattle(raidBoss, playerTeam) {
    const battle = {
      type: 'raid',
      players: playerTeam.map(p => this.createBattlePokemon(p, true)),
      boss: this.createBattlePokemon(raidBoss, false),
      timer: 180, // 3 minutos
      timeLimit: 180,
      status: 'active',
      log: []
    };

    // HP del boss multiplicado para raid
    const tierMultiplier = raidBoss.tier === 5 ? 15 : raidBoss.tier === 4 ? 10 : 5;
    battle.boss.maxHp = battle.boss.stats.hp * tierMultiplier;
    battle.boss.currentHp = battle.boss.maxHp;

    battle.players.forEach(p => {
      p.maxHp = p.stats.hp;
      p.currentHp = p.maxHp;
      p.energy = 0;
    });

    this.battle = battle;
    return battle;
  }

  createBattlePokemon(pokemon, isPlayer) {
    const base = POKEMON_DB[pokemon.species];
    const stats = calculateStats(base, pokemon.level, pokemon.ivs);
    
    return {
      id: pokemon.id,
      species: pokemon.species,
      name: base.name,
      types: base.types,
      level: pokemon.level,
      stats: stats,
      moves: {
        fast: getMove(pokemon.moves.fast) || getMove('tackle'),
        charged: pokemon.moves.charged.map(m => getMove(m)).filter(Boolean)
      },
      isShiny: pokemon.isShiny,
      isPlayer
    };
  }

  executeFastMove(attacker, defender) {
    const move = attacker.moves.fast;
    const damage = this.calculateDamage(attacker, defender, move);
    
    defender.currentHp = Math.max(0, defender.currentHp - damage);
    attacker.energy = Math.min(100, attacker.energy + move.energy);
    
    return {
      move: move,
      damage: damage,
      effectiveness: getEffectiveness(move.type, defender.types),
      critical: Math.random() < 0.05,
      energyGained: move.energy
    };
  }

  executeChargedMove(attacker, defender, moveIndex = 0) {
    const move = attacker.moves.charged[moveIndex];
    if (!move || attacker.energy < move.energy) return null;

    attacker.energy -= move.energy;
    const damage = this.calculateDamage(attacker, defender, move, true);
    
    defender.currentHp = Math.max(0, defender.currentHp - damage);
    
    return {
      move: move,
      damage: damage,
      effectiveness: getEffectiveness(move.type, defender.types),
      critical: Math.random() < (move.criticalChance || 0.05)
    };
  }

  calculateDamage(attacker, defender, move, isCharged = false) {
    const attack = attacker.stats.attack;
    const defense = defender.stats.defense;
    const power = move.power;
    
    // STAB (Same Type Attack Bonus)
    const stab = attacker.types.includes(move.type) ? CONFIG.BATTLE.STAB_BONUS : 1;
    
    // Efectividad de tipo
    const effectiveness = getEffectiveness(move.type, defender.types);
    
    // Modificador aleatorio (0.85 - 1.00)
    const random = randomRange(0.85, 1.0);
    
    // Bonus si es cargado
    const chargedBonus = isCharged ? 1.2 : 1;
    
    // Fórmula de daño simplificada
    const damage = Math.floor(
      ((2 * attacker.level / 5 + 2) * power * (attack / defense) / 50 + 2) *
      stab * effectiveness * random * chargedBonus
    );
    
    return Math.max(1, damage);
  }

  processTurn(playerAction) {
    if (!this.battle || this.battle.status !== 'active') return null;

    const result = {
      playerAction: null,
      opponentAction: null,
      playerDamage: 0,
      opponentDamage: 0,
      log: []
    };

    // Acción del jugador
    if (playerAction.type === 'fast') {
      result.playerAction = this.executeFastMove(this.battle.player, this.battle.opponent);
      result.playerDamage = result.playerAction.damage;
    } else if (playerAction.type === 'charged') {
      result.playerAction = this.executeChargedMove(
        this.battle.player, 
        this.battle.opponent, 
        playerAction.moveIndex
      );
      if (result.playerAction) {
        result.playerDamage = result.playerAction.damage;
      }
    } else if (playerAction.type === 'dodge') {
      // Implementar lógica de esquive
      result.playerAction = { type: 'dodge', success: Math.random() < 0.5 };
    }

    // Verificar victoria
    if (this.battle.opponent.currentHp <= 0) {
      this.battle.status = 'victory';
      this.handleVictory();
      return result;
    }

    // IA del oponente (simple)
    if (this.battle.opponent.energy >= 50 && this.battle.opponent.moves.charged.length > 0) {
      result.opponentAction = this.executeChargedMove(
        this.battle.opponent,
        this.battle.player,
        0
      );
    } else {
      result.opponentAction = this.executeFastMove(this.battle.opponent, this.battle.player);
    }
    result.opponentDamage = result.opponentAction.damage;

    // Verificar derrota
    if (this.battle.player.currentHp <= 0) {
      this.battle.status = 'defeat';
    }

    this.battle.turn++;
    return result;
  }

  processRaidTick() {
    if (!this.battle || this.battle.type !== 'raid' || this.battle.status !== 'active') {
      return null;
    }

    const result = {
      bossActions: [],
      playerActions: [],
      damageDealt: 0,
      damageTaken: 0
    };

    // Boss ataca cada 2 segundos
    if (this.battle.timer % 2 === 0) {
      const target = this.battle.players[randomInt(0, this.battle.players.length - 1)];
      if (target && target.currentHp > 0) {
        const bossMove = this.battle.boss.moves.fast;
        const damage = this.calculateDamage(this.battle.boss, target, bossMove);
        target.currentHp = Math.max(0, target.currentHp - damage);
        result.damageTaken += damage;
        result.bossActions.push({ target: target.id, damage });
      }
    }

    // Jugadores atacan automáticamente (simulado)
    this.battle.players.forEach(player => {
      if (player.currentHp <= 0) return;
      
      if (player.energy >= 50 && player.moves.charged.length > 0) {
        const move = this.executeChargedMove(player, this.battle.boss, 0);
        if (move) {
          result.damageDealt += move.damage;
          result.playerActions.push({ player: player.id, move, damage: move.damage });
        }
      } else {
        const move = this.executeFastMove(player, this.battle.boss);
        result.damageDealt += move.damage;
        result.playerActions.push({ player: player.id, move, damage: move.damage });
      }
    });

    // Reducir timer
    this.battle.timer--;
    
    if (this.battle.boss.currentHp <= 0) {
      this.battle.status = 'victory';
    } else if (this.battle.timer <= 0 || this.battle.players.every(p => p.currentHp <= 0)) {
      this.battle.status = 'defeat';
    }

    return result;
  }

  handleVictory() {
    if (this.battle.type === 'wild') {
      const xp = 100 + (this.battle.opponent.level * 10);
      const stardust = 100 + (this.battle.opponent.level * 5);
      
      gameState.addXP(xp);
      gameState.addStardust(stardust);
      gameState.incrementStat('battlesWon');
      
      showToast(`¡Victoria! +${xp} PX, +${stardust} Polvo`, 'success');
    }
  }

  flee() {
    if (!this.battle) return false;
    
    if (this.battle.type === 'wild') {
      const fleeChance = 0.3; // 30% base
      if (Math.random() < fleeChance) {
        this.battle.status = 'fled';
        return true;
      }
      return false; // No se pudo huir
    }
    
    return false; // No se puede huir de raids
  }

  getBattleState() {
    return this.battle;
  }

  endBattle() {
    const finalState = this.battle;
    this.battle = null;
    return finalState;
  }
}
