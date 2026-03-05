/**
 * SISTEMA DE ENRUTAMIENTO
 * Gestiona la navegación entre vistas de la aplicación
 */

import { gameState } from './state.js';

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.container = document.getElementById('main-content');
    this.navButtons = document.querySelectorAll('.nav-btn');
    
    this.init();
  }

  init() {
    // Event listeners para botones de navegación
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        this.navigate(view);
      });
    });

    // Navegación por gestos (swipe)
    this.initSwipeNavigation();
  }

  register(route, handler) {
    this.routes.set(route, handler);
  }

  navigate(route, params = {}) {
    if (!this.routes.has(route)) {
      console.error(`Ruta no encontrada: ${route}`);
      return;
    }

    // Actualizar UI de navegación
    this.updateNavUI(route);

    // Limpiar vista anterior
    if (this.currentRoute) {
      this.cleanupCurrentView();
    }

    // Renderizar nueva vista
    this.currentRoute = route;
    const handler = this.routes.get(route);
    const viewElement = handler(params);
    
    // Animación de transición
    viewElement.classList.add('view-transition');
    this.container.innerHTML = '';
    this.container.appendChild(viewElement);

    // Scroll al inicio
    this.container.scrollTop = 0;

    // Guardar ruta actual en estado
    gameState.state.lastRoute = route;
  }

  updateNavUI(activeRoute) {
    this.navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === activeRoute);
    });
  }

  cleanupCurrentView() {
    // Limpiar event listeners y recursos de la vista anterior
    const oldView = this.container.firstElementChild;
    if (oldView) {
      // Disparar evento de limpieza si existe
      const cleanupEvent = new CustomEvent('viewCleanup');
      oldView.dispatchEvent(cleanupEvent);
    }
  }

  initSwipeNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const routes = ['map', 'pokemon', 'raid', 'inventory', 'shop'];
    
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const distance = touchEndX - touchStartX;
      
      if (Math.abs(distance) > minSwipeDistance) {
        const currentIndex = routes.indexOf(this.currentRoute);
        
        if (distance > 0 && currentIndex > 0) {
          // Swipe derecha - ir a anterior
          this.navigate(routes[currentIndex - 1]);
        } else if (distance < 0 && currentIndex < routes.length - 1) {
          // Swipe izquierda - ir a siguiente
          this.navigate(routes[currentIndex + 1]);
        }
      }
    }, { passive: true });
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.navigate('map');
    }
  }
}
