/**
 * VISTA DE INVENTARIO/MOCHILA
 * Gestión de items y recursos
 */

import { gameState } from '../state.js';
import { getItem } from '../data/items.js';
import { showToast } from '../utils.js';

export class InventoryView {
  constructor(inventorySystem) {
    this.inventory = inventorySystem;
    this.container = null;
    this.currentCategory = 'all';
  }

  render() {
    const container = document.createElement('div');
    container.className = 'view inventory-view';
    
    container.innerHTML = `
      <div class="view-header">
        <h2>Mochila</h2>
        <div class="storage-info" id="storage-info"></div>
      </div>
      
      <div class="category-tabs">
        <button class="tab-btn active" data-category="all">Todos</button>
        <button class="tab-btn" data-category="balls">Poké Balls</button>
        <button class="tab-btn" data-category="medicine">Medicinas</button>
        <button class="tab-btn" data-category="berries">Bayas</button>
        <button class="tab-btn" data-category="evolution">Evolución</button>
        <button class="tab-btn" data-category="special">Especiales</button>
      </div>
      
      <div class="items-grid" id="items-grid"></div>
    `;

    this.container = container;
    this.setupEventListeners();
    this.updateStorageInfo();
    this.renderItems();
    
    return container;
  }

  setupEventListeners() {
    // Tabs de categorías
    this.container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        this.renderItems();
      });
    });
  }

  updateStorageInfo() {
    const info = this.inventory.getStorageInfo();
    const el = this.container.querySelector('#storage-info');
    el.textContent = `${info.items.current}/${info.items.max}`;
    
    // Cambiar color si está casi lleno
    if (info.items.current / info.items.max > 0.9) {
      el.style.color = 'var(--danger)';
    } else if (info.items.current / info.items.max > 0.7) {
      el.style.color = 'var(--warning)';
    }
  }

  renderItems() {
    const grid = this.container.querySelector('#items-grid');
    const items = this.currentCategory === 'all' 
      ? this.inventory.getItems()
      : this.inventory.getItemsByCategory(this.currentCategory);
    
    grid.innerHTML = '';
    
    if (items.length === 0) {
      grid.innerHTML = '<div class="empty-state">No tienes items en esta categoría</div>';
      return;
    }
    
    items.forEach(item => {
      const card = this.createItemCard(item);
      grid.appendChild(card);
    });
  }

  createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.style.borderColor = item.color || 'var(--primary)';
    
    card.innerHTML = `
      <div class="item-icon" style="background: ${item.color}20; color: ${item.color}">
        <span class="material-symbols-outlined">${item.icon}</span>
      </div>
      <span class="item-count">${item.quantity}</span>
      <span class="item-name">${item.name}</span>
    `;
    
    card.addEventListener('click', () => this.showItemDetails(item));
    
    return card;
  }

  showItemDetails(item) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal item-modal">
        <div class="modal-header">
          <div class="item-header-icon" style="background: ${item.color}20; color: ${item.color}">
            <span class="material-symbols-outlined">${item.icon}</span>
          </div>
          <div>
            <h2>${item.name}</h2>
            <p class="item-quantity">Tienes: ${item.quantity}</p>
          </div>
          <button class="modal-close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="modal-content">
          <p class="item-description">${item.description}</p>
          
          ${item.category === 'medicine' ? `
            <div class="use-section">
              <h4>Usar en:</h4>
              <div class="pokemon-select-list" id="heal-pokemon-list"></div>
            </div>
          ` : ''}
          
          ${item.category === 'balls' ? `
            <div class="ball-stats">
              <p>Tasa de captura: ${item.catchRate}x</p>
            </div>
          ` : ''}
        </div>
        
        <div class="modal-footer">
          ${item.sellPrice > 0 ? `
            <button class="btn btn-secondary" id="btn-sell">
              Vender (${item.sellPrice} monedas)
            </button>
          ` : ''}
          ${item.category === 'medicine' ? `
            <button class="btn btn-primary" id="btn-use">Usar</button>
          ` : ''}
          <button class="btn btn-danger" id="btn-discard">Descartar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Si es medicina, mostrar lista de Pokémon
    if (item.category === 'medicine') {
      this.renderPokemonListForHealing(modal, item);
    }
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    
    modal.querySelector('#btn-discard')?.addEventListener('click', () => {
      if (confirm(`¿Descartar ${item.name}?`)) {
        this.inventory.discardItem(item.id, 1);
        modal.remove();
        this.renderItems();
        this.updateStorageInfo();
      }
    });
    
    modal.querySelector('#btn-sell')?.addEventListener('click', () => {
      const qty = prompt(`¿Cuántos ${item.name} quieres vender? (Máx: ${item.quantity})`, '1');
      if (qty && !isNaN(qty)) {
        const amount = Math.min(parseInt(qty), item.quantity);
        if (this.inventory.discardItem(item.id, amount)) {
          gameState.addCoins(item.sellPrice * amount);
          showToast(`Vendiste ${amount} ${item.name}`, 'success');
          modal.remove();
          this.renderItems();
          this.updateStorageInfo();
        }
      }
    });
  }

  renderPokemonListForHealing(modal, item) {
    const list = modal.querySelector('#heal-pokemon-list');
    const pokemon = gameState.getPokemonCollection();
    
    // Filtrar Pokémon que necesitan curación
    const needsHealing = pokemon.filter(p => {
      const maxHp = gameState.calculateMaxHp(p);
      return p.currentHp < maxHp || (item.revive && p.currentHp <= 0);
    });
    
    if (needsHealing.length === 0) {
      list.innerHTML = '<p>No hay Pokémon que necesiten curación</p>';
      return;
    }
    
    needsHealing.forEach(p => {
      const maxHp = gameState.calculateMaxHp(p);
      const base = gameState.getPokemonById(p.id);
      
      const el = document.createElement('div');
      el.className = 'heal-pokemon-item';
      el.innerHTML = `
        <img src="${getSpriteUrl(base.species)}" alt="${base.species}">
        <div class="heal-info">
          <span>${base.name}</span>
          <div class="hp-bar-small">
            <div class="hp-fill" style="width: ${(p.currentHp / maxHp) * 100}%"></div>
          </div>
          <span>${p.currentHp}/${maxHp} PS</span>
        </div>
      `;
      
      el.addEventListener('click', () => {
        if (this.inventory.useItem(item.id, p.id)) {
          modal.remove();
          this.renderItems();
        }
      });
      
      list.appendChild(el);
    });
  }
}
