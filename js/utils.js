/**
 * FUNCIONES UTILITARIAS
 * Helpers y utilidades generales
 */

// Generar ID único
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Formatear número con separadores
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Formatear tiempo (segundos a MM:SS)
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Formatear fecha relativa
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " años";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " meses";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " días";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " horas";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutos";
  
  return "hace un momento";
}

// Debounce para eventos
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle para eventos
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Animación de contador
export function animateCounter(element, start, end, duration = 1000) {
  const range = end - start;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing ease-out
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (range * easeProgress));
    
    element.textContent = formatNumber(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Vibración del dispositivo
export function vibrate(pattern) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// Notificación toast
export function showToast(message, type = 'info', duration = 3000) {
  const container = document.querySelector('.toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined">${getIconForType(type)}</span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, duration);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

function getIconForType(type) {
  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };
  return icons[type] || 'info';
}

// Cálculo de distancia entre dos puntos
export function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Aleatorio en rango
export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Aleatorio entero en rango
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Selección ponderada aleatoria
export function weightedRandom(items, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  
  return items[items.length - 1];
}

// Mezclar array (Fisher-Yates)
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Capitalizar string
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Formatear nombre de Pokémon (quitar guiones, capitalizar)
export function formatPokemonName(name) {
  return name.split('-').map(capitalize).join(' ');
}

// Detectar dispositivo móvil
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Guardar imagen en caché
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Interpolación lineal
export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// Easing functions
export const easing = {
  easeOutQuad: t => t * (2 - t),
  easeOutCubic: t => (--t) * t * t + 1,
  easeOutQuart: t => 1 - (--t) * t * t * t,
  easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

// Localización de tipos
export const typeNames = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada'
};

// Obtener nombre localizado de tipo
export function getTypeName(type) {
  return typeNames[type] || capitalize(type);
}
