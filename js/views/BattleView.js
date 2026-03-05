/**
 * VISTA DE COMBATE
 * Interfaz de batallas en tiempo real
 */

import { getSpriteUrl, getSpriteScale } from '../config.js';
import { gameState } from '../state.js';
import { showToast, formatTime } from '../utils.js';

export class BattleView {
  constructor(battleSystem) {
    this.battle = battleSystem;
    this.container = null;
    this.updateInterval = null;
  }

  start(opponent, playerPokemon) {
    const battle = this.battle.startWildBattle(opponent, playerPokemon);
    if (!battle) return;
    
    const view = this.render(battle);
    document.body.appendChild(view);
    
    this.startBattleLoop();
  }

  render(battle) {
    const container = document.createElement('div');
    container.className = 'battle-arena';
    container.id = 'battle-view';
    
    // Obtener escalas personalizadas
    const opponentScale = getSpriteScale(battle.opponent.name);
    const allyScale = getSpriteScale(battle.player.name);
    
    container.innerHTML = `
      <div class="raid-timer-bar">
        <div class="raid-timer-fill" id="battle-timer"></div>
      </div>
      
      <div class="battle-field">
        <div class="opponent-area">
          <div class="opponent-info">
            <div class="opponent-name">
              ${battle.opponent.name}
              <span class="opponent-level">Nv.${battle.opponent.level}</span>
            </div>
            <div class="hp-bar-container">
              <div class="hp-bar-fill high" id="opponent-hp" style="width: 100%"></div>
              <span class="hp-text" id="opponent-hp-text">${battle.opponent.maxHp}/${battle.opponent.maxHp}</span>
            </div>
          </div>
          <div class="opponent-sprite" id="opponent-sprite" 
               style="--sprite-scale: ${opponentScale / 100}">
            <img src="${getSpriteUrl(battle.opponent.name, battle.opponent.isShiny, false)}" 
                 alt="${battle.opponent.name}"
                 onerror="this.src='${getSpriteUrl('pokeball')}'">
          </div>
        </div>
        
        <div class="ally-area">
          <div class="ally-sprite" id="ally-sprite"
               style="--sprite-scale: ${allyScale / 100}">
            <img src="${getSpriteUrl(battle.player.name, battle.player.isShiny, true)}" 
                 alt="${battle.player.name}"
                 onerror="this.src='${getSpriteUrl('pokeball')}'">
          </div>
          <div class="ally-info">
            <div class="ally-name">
              ${battle.player.name}
              <span class="ally-level">Nv.${battle.player.level}</span>
            </div>
            <div class="hp-bar-container">
              <div class="hp-bar-fill high" id="ally-hp" style="width: 100%"></div>
              <span class="hp-text" id="ally-hp-text">${battle.player.maxHp}/${battle.player.maxHp}</span>
            </div>
            <div class="energy-bar">
              <div class="energy-fill" id="ally-energy" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="battle-controls">
        <div class="battle-timer" id="timer">100</div>
        
        <div class="moves-grid" id="moves-grid">
          <button class="move-btn type-${battle.player.moves.fast.type}" id="btn-fast">
            <div class="move-name">
              <span class="material-symbols-outlined">flash_on</span>
              ${battle.player.moves.fast.name}
            </div>
            <div class="move-power">Poder: ${battle.player.moves.fast.power}</div>
          </button>
          
          ${battle.player.moves.charged.map((move, i) => `
            <button class="move-btn type-${move.type}" id="btn-charged-${i}" disabled>
              <div class="move-name">
                <span class="material-symbols-outlined">offline_bolt</span>
                ${move.name}
              </div>
              <div class="move-energy">${move.energy}</div>
              <div class="move-power">Poder: ${move.power}</div>
            </button>
          `).join('')}
        </div>
        
        <div class="battle-actions">
          <button class="action-btn" id="btn-dodge">
            <span class="material-symbols-outlined">sprint</span>
            Esquivar
          </button>
          <button class="action-btn danger" id="btn-forfeit">
            <span class="material-symbols-outlined">flag</span>
            Rendirse
          </button>
        </div>
      </div>
    `;

    this.container = container;
    this.setupEventListeners();
    
    return container;
  }

  setupEventListeners() {
    // Ataque rápido
    this.container.querySelector('#btn-fast').addEventListener('click', () => {
      this.executeAction('fast');
    });
    
    // Ataques cargados
    this.battle.getBattleState().player.moves.charged.forEach((_, i) => {
      const btn = this.container.querySelector(`#btn-charged-${i}`);
      if (btn) {
        btn.addEventListener('click', () => {
          this.executeAction('charged', i);
        });
      }
    });
    
    // Esquivar
    this.container.querySelector('#btn-dodge').addEventListener('click', () => {
      this.executeAction('dodge');
    });
    
    // Rendirse
    this.container.querySelector('#btn-forfeit').addEventListener('click', () => {
      if (confirm('¿Quieres abandonar la batalla?')) {
        this.endBattle();
      }
    });
  }

  executeAction(type, index = 0) {
    const result = this.battle.processTurn({ type, moveIndex: index });
    if (!result) return;
    
    this.updateUI(result);
    
    if (this.battle.getBattleState().status !== 'active') {
      this.endBattle();
    }
  }

  startBattleLoop() {
    this.updateInterval = setInterval(() => {
      const state = this.battle.getBattleState();
      if (!state || state.status !== 'active') {
        this.endBattle();
        return;
      }
      
      // Actualizar timer
      state.timer--;
      const timerEl = this.container.querySelector('#timer');
      const timerBar = this.container.querySelector('#battle-timer');
      
      if (timerEl) timerEl.textContent = state.timer;
      if (timerBar) timerBar.style.width = `${state.timer}%`;
      
      if (state.timer <= 0) {
        this.endBattle();
      }
    }, 1000);
  }

  updateUI(result) {
    const state = this.battle.getBattleState();
    
    // Actualizar HP oponente
    const opponentHp = (state.opponent.currentHp / state.opponent.maxHp) * 100;
    const opponentHpEl = this.container.querySelector('#opponent-hp');
    const opponentHpText = this.container.querySelector('#opponent-hp-text');
    
    if (opponentHpEl) {
      opponentHpEl.style.width = `${opponentHp}%`;
      opponentHpEl.className = `hp-bar-fill ${opponentHp > 50 ? 'high' : opponentHp > 20 ? 'medium' : 'low'}`;
    }
    if (opponentHpText) {
      opponentHpText.textContent = `${state.opponent.currentHp}/${state.opponent.maxHp}`;
    }
    
    // Actualizar HP aliado
    const allyHp = (state.player.currentHp / state.player.maxHp) * 100;
    const allyHpEl = this.container.querySelector('#ally-hp');
    const allyHpText = this.container.querySelector('#ally-hp-text');
    
    if (allyHpEl) {
      allyHpEl.style.width = `${allyHp}%`;
      allyHpEl.className = `hp-bar-fill ${allyHp > 50 ? 'high' : allyHp > 20 ? 'medium' : 'low'}`;
    }
    if (allyHpText) {
      allyHpText.textContent = `${state.player.currentHp}/${state.player.maxHp}`;
    }
    
    // Actualizar energía
    const energyEl = this.container.querySelector('#ally-energy');
    if (energyEl) {
      energyEl.style.width = `${state.player.energy}%`;
    }
    
    // Habilitar/deshabilitar ataques cargados
    state.player.moves.charged.forEach((move, i) => {
      const btn = this.container.querySelector(`#btn-charged-${i}`);
      if (btn) {
        btn.disabled = state.player.energy < move.energy;
      }
    });
    
    // Animaciones de daño
    if (result.opponentDamage > 0) {
      this.showDamage('opponent', result.opponentDamage, result.playerAction?.effectiveness);
    }
    if (result.playerDamage > 0) {
      this.showDamage('ally', result.playerDamage, result.opponentAction?.effectiveness);
    }
  }

  showDamage(target, amount, effectiveness) {
    const sprite = this.container.querySelector(`#${target}-sprite`);
    if (!sprite) return;
    
    const damageEl = document.createElement('div');
    damageEl.className = 'damage-number';
    if (effectiveness >= 2) damageEl.classList.add('super-effective');
    damageEl.textContent = amount;
    
    sprite.appendChild(damageEl);
    
    // Animación de golpe
    sprite.classList.add('hit');
    setTimeout(() => sprite.classList.remove('hit'), 300);
    
    setTimeout(() => damageEl.remove(), 1000);
  }

  endBattle() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    const state = this.battle.endBattle();
    
    setTimeout(() => {
      this.container.remove();
      
      if (state.status === 'victory') {
        showToast('¡Victoria!', 'success');
      } else if (state.status === 'defeat') {
        showToast('Has perdido el combate', 'error');
      }
    }, 1000);
  }
}
