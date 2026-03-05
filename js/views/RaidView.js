/**
 * VISTA DE RAIDS
 * Lista y participación en incursiones
 */

import { gameState } from '../state.js';
import { getTierConfig } from '../data/raids.js';
import { showToast, formatTime } from '../utils.js';

export class RaidView {
  constructor(raidSystem) {
    this.raid = raidSystem;
    this.container = null;
  }

  render(params = {}) {
    const container = document.createElement('div');
    container.className = 'view raid-view';
    
    container.innerHTML = `
      <div class="view-header">
        <h2>Incursiones</h2>
        <p>Únete a raids para captur Pokémon poderosos</p>
      </div>
      
      <div class="raid-passes">
        <div class="pass-item">
          <span class="material-symbols-outlined">local_fire_department</span>
          <span>Pases: ${gameState.getItemCount('raid-pass') + gameState.getItemCount('premium-raid-pass')}</span>
        </div>
      </div>
      
      <div class="raids-list" id="raids-list">
        <div class="loading">Buscando raids cercanas...</div>
      </div>
    `;

    this.container = container;
    this.loadRaids();
    
    return container;
  }

  loadRaids() {
    const list = this.container.querySelector('#raids-list');
    const raids = this.raid.getNearbyRaids();
    
    list.innerHTML = '';
    
    if (raids.length === 0) {
      list.innerHTML = '<div class="empty-state">No hay raids cercanas</div>';
      return;
    }
    
    raids.forEach(raid => {
      const card = this.createRaidCard(raid);
      list.appendChild(card);
    });
  }

  createRaidCard(raid) {
    const config = getTierConfig(raid.tier);
    const card = document.createElement('div');
    card.className = 'raid-card';
    
    const timeLeft = Math.max(0, Math.floor((raid.expiresAt - Date.now()) / 1000));
    
    card.innerHTML = `
      <div class="raid-egg-preview stars-${raid.tier}">
        <span class="material-symbols-outlined">egg</span>
      </div>
      <div class="raid-info">
        <h3>Raid Nivel ${raid.tier}</h3>
        <p class="raid-boss">${raid.boss.name}</p>
        <div class="raid-meta">
          <span class="distance">${Math.floor(raid.distance * 100)}m</span>
          <span class="timer">${formatTime(timeLeft)}</span>
        </div>
        <div class="raid-participants">
          <span class="material-symbols-outlined">group</span>
          ${raid.participants.length}/${config.maxPlayers}
        </div>
      </div>
      <button class="btn btn-primary ${!raid.canJoin ? 'disabled' : ''}" 
              ${!raid.canJoin ? 'disabled' : ''}>
        ${raid.status === 'upcoming' ? 'Unirse' : 'En progreso'}
      </button>
    `;
    
    const joinBtn = card.querySelector('button');
    joinBtn.addEventListener('click', () => this.joinRaid(raid));
    
    return card;
  }

  joinRaid(raid) {
    const result = this.raid.joinRaid(raid.id);
    
    if (!result.success) {
      showToast(result.error, 'error');
      return;
    }
    
    // Mostrar lobby de raid
    this.showRaidLobby(raid);
  }

  showRaidLobby(raid) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal raid-lobby">
        <div class="lobby-header">
          <h2>Raid Nivel ${raid.tier}</h2>
          <p>${raid.boss.name}</p>
        </div>
        
        <div class="lobby-timer" id="lobby-timer">
          Iniciando en ${formatTime(Math.floor((raid.startsAt - Date.now()) / 1000))}...
        </div>
        
        <div class="lobby-team">
          <h3>Tu Equipo</h3>
          <div class="team-preview" id="lobby-team"></div>
        </div>
        
        <div class="lobby-participants">
          <h3>Participantes (${raid.participants.length})</h3>
          <div class="participants-list">
            ${raid.participants.map(p => `
              <div class="participant">
                <span class="material-symbols-outlined">account_circle</span>
                <span>Jugador ${p.playerId === 'player' ? '(Tú)' : ''}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="lobby-actions">
          <button class="btn btn-danger" id="btn-leave">Abandonar</button>
          <button class="btn btn-primary" id="btn-start" disabled>
            Esperando...
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar equipo actual
    const teamContainer = modal.querySelector('#lobby-team');
    const team = gameState.getCurrentTeam();
    
    if (team.length === 0) {
      teamContainer.innerHTML = '<p>No tienes equipo seleccionado</p>';
    } else {
      team.forEach(pokemon => {
        const el = document.createElement('div');
        el.className = 'team-pokemon';
        el.innerHTML = `
          <img src="${getSpriteUrl(pokemon.species)}" alt="${pokemon.species}">
          <span>${pokemon.cp}</span>
        `;
        teamContainer.appendChild(el);
      });
    }
    
    // Actualizar timer
    const timerInterval = setInterval(() => {
      const timeLeft = Math.floor((raid.startsAt - Date.now()) / 1000);
      const timerEl = modal.querySelector('#lobby-timer');
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = '¡Comenzando!';
        modal.querySelector('#btn-start').disabled = false;
        modal.querySelector('#btn-start').textContent = '¡Luchar!';
      } else {
        timerEl.textContent = `Iniciando en ${formatTime(timeLeft)}...`;
      }
    }, 1000);
    
    // Event listeners
    modal.querySelector('#btn-leave').addEventListener('click', () => {
      clearInterval(timerInterval);
      modal.remove();
    });
    
    modal.querySelector('#btn-start').addEventListener('click', () => {
      clearInterval(timerInterval);
      modal.remove();
      this.startRaidBattle(raid);
    });
  }

  startRaidBattle(raid) {
    // Iniciar batalla de raid
    const battle = this.raid.startRaidBattle(raid, gameState.getCurrentTeam());
    
    if (battle) {
      // Mostrar vista de batalla de raid
      this.showRaidBattle(battle);
    }
  }

  showRaidBattle(battle) {
    // Similar a BattleView pero con timer de raid y múltiples jugadores
    showToast('¡La raid ha comenzado!', 'success');
    // Implementación detallada en RaidSystem
  }
}
