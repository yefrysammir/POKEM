/**
 * SISTEMA DE TIENDA
 * Compras con monedas y objetos premium
 */

import { gameState } from '../state.js';
import { getShopItems, getItem } from '../data/items.js';
import { showToast, formatNumber } from '../utils.js';

export class ShopSystem {
  constructor() {
    this.categories = ['balls', 'medicine', 'berries', 'special', 'upgrade'];
    this.currentCategory = 'balls';
  }

  getItems(category = this.currentCategory) {
    const items = getShopItems();
    
    if (category === 'all') {
      return items;
    }
    
    return items.filter(item => item.category === category);
  }

  getFeaturedItems() {
    // Ofertas especiales rotativas
    return [
      {
        id: 'special-box-1',
        name: 'Caja Especial',
        description: '20 Poké Balls, 10 Super Balls, 5 Hiperpociones',
        price: 0, // Gratis una vez al día
        currency: 'coins',
        items: { 'poke-ball': 20, 'great-ball': 10, 'hyper-potion': 5 },
        daily: true,
        icon: 'inventory_2'
      },
      {
        id: 'great-box',
        name: 'Caja Grande',
        description: '50 Super Balls, 20 Ultra Balls, 10 Max Revive',
        price: 980,
        currency: 'coins',
        items: { 'great-ball': 50, 'ultra-ball': 20, 'max-revive': 10 },
        icon: 'inventory_2'
      },
      {
        id: 'ultra-box',
        name: 'Caja Ultra',
        description: '100 Ultra Balls, 50 Max Potion, 20 Incense',
        price: 1980,
        currency: 'coins',
        items: { 'ultra-ball': 100, 'max-potion': 50, 'incense': 20 },
        icon: 'inventory_2'
      }
    ];
  }

  getCurrencyPacks() {
    return [
      { amount: 100, price: '$0.99', bonus: 0 },
      { amount: 550, price: '$4.99', bonus: 50 },
      { amount: 1200, price: '$9.99', bonus: 200 },
      { amount: 2500, price: '$19.99', bonus: 600 },
      { amount: 5200, price: '$39.99', bonus: 1400 },
      { amount: 14500, price: '$99.99', bonus: 4500 }
    ];
  }

  buyItem(itemId, quantity = 1) {
    const item = getItem(itemId);
    if (!item) return { success: false, error: 'Item no encontrado' };

    const totalPrice = item.price * quantity;
    
    if (gameState.getPlayer().coins < totalPrice) {
      return { success: false, error: 'Monedas insuficientes' };
    }

    // Verificar espacio en mochila
    const currentItems = Object.values(gameState.getInventory().items).reduce((a, b) => a + b, 0);
    if (currentItems + quantity > gameState.getInventory().maxSize) {
      return { success: false, error: 'Mochila llena' };
    }

    if (gameState.removeCoins(totalPrice)) {
      gameState.addItem(itemId, quantity);
      showToast(`Compraste ${quantity} ${item.name}`, 'success');
      return { success: true, item, quantity, totalPrice };
    }

    return { success: false, error: 'Error en la transacción' };
  }

  buyBox(boxId) {
    const box = this.getFeaturedItems().find(b => b.id === boxId);
    if (!box) return { success: false, error: 'Caja no encontrada' };

    if (box.daily) {
      const lastClaim = gameState.state.session.lastDailyBox;
      const today = new Date().toDateString();
      if (lastClaim === today) {
        return { success: false, error: 'Ya reclamaste tu caja hoy' };
      }
      gameState.state.session.lastDailyBox = today;
    } else {
      if (gameState.getPlayer().coins < box.price) {
        return { success: false, error: 'Monedas insuficientes' };
      }
      gameState.removeCoins(box.price);
    }

    // Añadir items de la caja
    Object.entries(box.items).forEach(([itemId, qty]) => {
      gameState.addItem(itemId, qty);
    });

    showToast(`¡Abriste ${box.name}!`, 'success');
    return { success: true, box };
  }

  buyUpgrade(type) {
    const upgradeCosts = {
      bag: 400,
      storage: 400
    };

    const cost = upgradeCosts[type];
    if (!cost) return { success: false, error: 'Mejora no válida' };

    if (gameState.getPlayer().coins < cost) {
      return { success: false, error: 'Monedas insuficientes' };
    }

    if (type === 'bag') {
      gameState.state.inventory.maxSize += 50;
      gameState.removeCoins(cost);
      showToast('¡Capacidad de mochila aumentada!', 'success');
      return { success: true };
    }

    if (type === 'storage') {
      gameState.state.pokemon.maxStorage += 50;
      gameState.removeCoins(cost);
      showToast('¡Almacenamiento de Pokémon aumentado!', 'success');
      return { success: true };
    }

    return { success: false, error: 'Error en la mejora' };
  }

  // Simulación de compra con dinero real (en app real, esto conectaría con API de pagos)
  purchaseCoins(packIndex) {
    const packs = this.getCurrencyPacks();
    const pack = packs[packIndex];
    
    if (!pack) return { success: false, error: 'Paquete no válido' };

    // Aquí iría la integración con el sistema de pagos
    // Por ahora, simulamos éxito
    showToast(`Procesando compra de ${formatNumber(pack.amount)} monedas...`, 'info');
    
    // Simular delay de procesamiento
    setTimeout(() => {
      gameState.addCoins(pack.amount + pack.bonus);
      showToast(`¡Recibiste ${formatNumber(pack.amount + pack.bonus)} monedas!`, 'success');
    }, 1500);

    return { success: true, processing: true };
  }

  getPlayerCurrency() {
    return {
      coins: gameState.getPlayer().coins,
      stardust: gameState.getPlayer().stardust
    };
  }
}
