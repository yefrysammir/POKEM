/**
 * VISTA DE TIENDA
 * Compras de items y monedas
 */

import { gameState } from '../state.js';
import { showToast, formatNumber } from '../utils.js';

export class ShopView {
  constructor(shopSystem) {
    this.shop = shopSystem;
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'view shop-view';
    
    container.innerHTML = `
      <div class="view-header">
        <h2>Tienda</h2>
        <div class="currency-display">
          <span class="coins">
            <span class="material-symbols-outlined">paid</span>
            <span id="shop-coins">0</span>
          </span>
        </div>
      </div>
      
      <div class="shop-section">
        <h3>Ofertas Especiales</h3>
        <div class="featured-items" id="featured-items"></div>
      </div>
      
      <div class="shop-section">
        <h3>Items</h3>
        <div class="shop-categories">
          <button class="shop-tab active" data-cat="balls">Poké Balls</button>
          <button class="shop-tab" data-cat="medicine">Medicinas</button>
          <button class="shop-tab" data-cat="berries">Bayas</button>
          <button class="shop-tab" data-cat="upgrade">Mejoras</button>
        </div>
        <div class="shop-items" id="shop-items"></div>
      </div>
      
      <div class="shop-section">
        <h3>Monedas</h3>
        <div class="coin-packs" id="coin-packs"></div>
      </div>
    `;

    this.container = container;
    this.updateCurrency();
    this.renderFeatured();
    this.renderShopItems('balls');
    this.renderCoinPacks();
    this.setupEventListeners();
    
    return container;
  }

  setupEventListeners() {
    // Tabs de categorías
    this.container.querySelectorAll('.shop-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.container.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderShopItems(tab.dataset.cat);
      });
    });
  }

  updateCurrency() {
    const currency = this.shop.getPlayerCurrency();
    this.container.querySelector('#shop-coins').textContent = formatNumber(currency.coins);
  }

  renderFeatured() {
    const container = this.container.querySelector('#featured-items');
    const items = this.shop.getFeaturedItems();
    
    container.innerHTML = '';
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'featured-card';
      if (item.daily) card.classList.add('daily');
      
      card.innerHTML = `
        <div class="featured-icon">
          <span class="material-symbols-outlined">${item.icon}</span>
        </div>
        <div class="featured-info">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <div class="featured-items-list">
            ${Object.entries(item.items).map(([id, qty]) => `
              <span class="mini-item">${qty}x ${id}</span>
            `).join('')}
          </div>
        </div>
        <button class="btn btn-primary ${item.daily ? 'btn-free' : ''}">
          ${item.daily ? 'GRATIS' : `${item.price} monedas`}
        </button>
      `;
      
      card.querySelector('button').addEventListener('click', () => {
        const result = this.shop.buyBox(item.id);
        if (result.success) {
          this.updateCurrency();
          if (!item.daily) {
            card.querySelector('button').disabled = true;
            card.querySelector('button').textContent = 'Comprado';
          }
        }
      });
      
      container.appendChild(card);
    });
  }

  renderShopItems(category) {
    const container = this.container.querySelector('#shop-items');
    const items = this.shop.getItems(category);
    
    container.innerHTML = '';
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      
      card.innerHTML = `
        <div class="shop-item-icon" style="color: ${item.color}">
          <span class="material-symbols-outlined">${item.icon}</span>
        </div>
        <div class="shop-item-info">
          <h4>${item.name}</h4>
          <p>${item.description.substring(0, 50)}...</p>
        </div>
        <div class="shop-item-buy">
          <span class="price">${item.price}</span>
          <button class="btn btn-sm btn-primary" data-item="${item.id}">
            Comprar
          </button>
        </div>
      `;
      
      card.querySelector('button').addEventListener('click', () => {
        this.showPurchaseModal(item);
      });
      
      container.appendChild(card);
    });
  }

  showPurchaseModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal purchase-modal">
        <div class="modal-header">
          <h2>Comprar ${item.name}</h2>
          <button class="modal-close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="purchase-item">
            <span class="material-symbols-outlined" style="color: ${item.color}; font-size: 48px">
              ${item.icon}
            </span>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price-tag">${item.price} monedas</p>
          </div>
          
          <div class="quantity-selector">
            <label>Cantidad:</label>
            <div class="quantity-controls">
              <button id="qty-minus">-</button>
              <input type="number" id="qty-input" value="1" min="1" max="99">
              <button id="qty-plus">+</button>
            </div>
            <p class="total-price">Total: <span id="total-price">${item.price}</span> monedas</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" id="btn-cancel">Cancelar</button>
          <button class="btn btn-primary" id="btn-confirm">Confirmar compra</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lógica de cantidad
    const qtyInput = modal.querySelector('#qty-input');
    const totalPrice = modal.querySelector('#total-price');
    
    const updateTotal = () => {
      const qty = parseInt(qtyInput.value) || 1;
      totalPrice.textContent = formatNumber(item.price * qty);
    };
    
    modal.querySelector('#qty-minus').addEventListener('click', () => {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
      updateTotal();
    });
    
    modal.querySelector('#qty-plus').addEventListener('click', () => {
      qtyInput.value = Math.min(99, parseInt(qtyInput.value) + 1);
      updateTotal();
    });
    
    qtyInput.addEventListener('change', updateTotal);
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('#btn-cancel').addEventListener('click', () => modal.remove());
    
    modal.querySelector('#btn-confirm').addEventListener('click', () => {
      const qty = parseInt(qtyInput.value) || 1;
      const result = this.shop.buyItem(item.id, qty);
      
      if (result.success) {
        showToast(`Compraste ${qty} ${item.name}`, 'success');
        this.updateCurrency();
        modal.remove();
      } else {
        showToast(result.error, 'error');
      }
    });
  }

  renderCoinPacks() {
    const container = this.container.querySelector('#coin-packs');
    const packs = this.shop.getCurrencyPacks();
    
    container.innerHTML = '';
    
    packs.forEach((pack, index) => {
      const card = document.createElement('div');
      card.className = 'coin-pack';
      if (pack.bonus > 0) card.classList.add('has-bonus');
      
      card.innerHTML = `
        <div class="coin-amount">
          <span class="material-symbols-outlined">paid</span>
          <span class="amount">${formatNumber(pack.amount)}</span>
          ${pack.bonus > 0 ? `<span class="bonus">+${formatNumber(pack.bonus)}</span>` : ''}
        </div>
        <button class="btn btn-primary">${pack.price}</button>
      `;
      
      card.querySelector('button').addEventListener('click', () => {
        this.shop.purchaseCoins(index);
        // En una app real, esto abriría el sistema de pagos
        showToast('Procesando compra...', 'info');
      });
      
      container.appendChild(card);
    });
  }
}
