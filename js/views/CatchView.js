/**
 * VISTA DE CAPTURA
 * Interfaz de lanzamiento y captura de Pokémon
 */

import { getSpriteUrl, getSpriteScale } from '../config.js';
import { gameState } from '../state.js';
import { showToast, vibrate } from '../utils.js';

export class CatchView {
  constructor(catchSystem) {
    this.catch = catchSystem;
    this.container = null;
    this.encounter = null;
    this.isThrowing = false;
  }

  start(spawn) {
    this.encounter = this.catch.startEncounter(spawn);
    if (!this.encounter) return;
    
    const view = this.render();
    document.body.appendChild(view);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      view.classList.add('active');
    });
  }

  render() {
    const container = document.createElement('div');
    container.className = 'catch-scene';
    container.id = 'catch-view';
    
    const pokemon = this.encounter.pokemon;
    const base = this.encounter.spawn.pokemon;
    
    // Obtener escala personalizada
    const spriteScale = getSpriteScale(base.name);
    
    container.innerHTML = `
      <div class="catch-ring"></div>
      <div class="catch-ring inner"></div>
      
      <div class="wild-pokemon" id="wild-pokemon" 
           style="--sprite-scale: ${spriteScale / 100}">
        <img src="${getSpriteUrl(base.name, pokemon.isShiny, false)}" 
             alt="${base.name}"
             onerror="this.src='${getSpriteUrl('pokeball')}'">
      </div>
      
      <div class="catch-ui">
        <div class="pokemon-info">
          <h2>${base.name} ${pokemon.isShiny ? '✨' : ''}</h2>
          <span class="cp-badge">${pokemon.cp}</span>
          <div class="type-badges">
            ${base.types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join('')}
          </div>
        </div>
        
        <div class="catch-controls">
          <div class="berry-selector" id="berry-selector">
            <button class="berry-btn" data-berry="razz-berry">
              <span class="material-symbols-outlined">nutrition</span>
            </button>
          </div>
          
          <div class="ball-selector" id="ball-selector">
            <button class="ball-btn active" data-ball="poke-ball">
              <span class="material-symbols-outlined">radio_button_unchecked</span>
            </button>
            <button class="ball-btn" data-ball="great-ball">
              <span class="material-symbols-outlined">radio_button_checked</span>
            </button>
            <button class="ball-btn" data-ball="ultra-ball">
              <span class="material-symbols-outlined">adjust</span>
            </button>
          </div>
          
          <div class="throw-area" id="throw-area">
            <div class="pokeball" id="pokeball">
              <span class="material-symbols-outlined">radio_button_unchecked</span>
            </div>
          </div>
        </div>
        
        <div class="catch-actions">
          <button class="btn btn-secondary" id="btn-run">
            <span class="material-symbols-outlined">directions_run</span>
            Huir
          </button>
        </div>
      </div>
    `;

    this.container = container;
    this.setupEventListeners();
    
    return container;
  }

  setupEventListeners() {
    const throwArea = this.container.querySelector('#throw-area');
    const pokeball = this.container.querySelector('#pokeball');
    
    // Controles táctiles para lanzamiento
    let startY = 0;
    let startTime = 0;
    
    throwArea.addEventListener('touchstart', (e) => {
      if (this.isThrowing) return;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      pokeball.style.transform = 'scale(1.2)';
    }, { passive: true });
    
    throwArea.addEventListener('touchend', (e) => {
      if (this.isThrowing) return;
      
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      const deltaTime = Date.now() - startTime;
      
      // Calcular calidad del lanzamiento
      let quality = 'normal';
      if (deltaY > 200 && deltaTime < 500) {
        quality = 'excellent';
      } else if (deltaY > 150) {
        quality = 'great';
      } else if (deltaY > 100) {
        quality = 'nice';
      }
      
      this.throwBall(quality);
    }, { passive: true });
    
    // Mouse para desktop
    throwArea.addEventListener('mousedown', (e) => {
      if (this.isThrowing) return;
      startY = e.clientY;
      startTime = Date.now();
      pokeball.style.transform = 'scale(1.2)';
    });
    
    throwArea.addEventListener('mouseup', (e) => {
      if (this.isThrowing) return;
      
      const deltaY = startY - e.clientY;
      const deltaTime = Date.now() - startTime;
      
      let quality = 'normal';
      if (deltaY > 200 && deltaTime < 500) quality = 'excellent';
      else if (deltaY > 150) quality = 'great';
      else if (deltaY > 100) quality = 'nice';
      
      this.throwBall(quality);
    });
    
    // Selección de Poké Ball
    this.container.querySelectorAll('.ball-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.ball-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedBall = btn.dataset.ball;
      });
    });
    
    // Selección de baya
    this.container.querySelector('.berry-btn')?.addEventListener('click', () => {
      this.useBerry('razz-berry');
    });
    
    // Botón de huir
    this.container.querySelector('#btn-run').addEventListener('click', () => {
      this.attemptFlee();
    });
  }

  throwBall(quality) {
    if (this.isThrowing) return;
    this.isThrowing = true;
    
    const ball = this.selectedBall || 'poke-ball';
    const result = this.catch.throwBall(ball, quality);
    
    if (!result.success && result.reason) {
      showToast(result.reason, 'error');
      this.isThrowing = false;
      return;
    }
    
    // Animación de lanzamiento
    const pokeball = this.container.querySelector('#pokeball');
    pokeball.classList.add('pokeball-throwing');
    
    vibrate(50);
    
    setTimeout(() => {
      this.showCaptureAttempt(result);
    }, 800);
  }

  showCaptureAttempt(result) {
    const wildPokemon = this.container.querySelector('#wild-pokemon');
    
    // Ocultar Pokémon y mostrar ball en su lugar
    wildPokemon.style.opacity = '0';
    
    const captureBall = document.createElement('div');
    captureBall.className = 'pokeball pokeball-shaking';
    captureBall.style.position = 'absolute';
    captureBall.style.left = '50%';
    captureBall.style.top = '40%';
    captureBall.style.transform = 'translate(-50%, -50%)';
    captureBall.innerHTML = '<span class="material-symbols-outlined">radio_button_unchecked</span>';
    
    this.container.appendChild(captureBall);
    
    // Animación de movimientos
    setTimeout(() => {
      if (result.caught) {
        captureBall.classList.remove('pokeball-shaking');
        captureBall.classList.add('pokeball-success');
        this.onCaptureSuccess();
      } else {
        if (result.flee) {
          this.onPokemonFled();
        } else {
          captureBall.classList.add('pokeball-fail');
          setTimeout(() => {
            wildPokemon.style.opacity = '1';
            captureBall.remove();
            this.isThrowing = false;
            showToast('¡Casi! ¡Inténtalo de nuevo!', 'warning');
          }, 500);
        }
      }
    }, 1500);
  }

  onCaptureSuccess() {
    const result = this.catch.completeCapture();
    
    if (result.success) {
      vibrate([100, 50, 100, 50, 100]);
      
      // Efectos de partículas
      this.showParticles();
      
      setTimeout(() => {
        showToast(
          `¡Atrapaste a ${result.pokemon.name}! ${result.isNew ? '¡Nuevo!' : ''}`,
          'success'
        );
        this.close();
      }, 1000);
    } else {
      showToast(result.reason, 'error');
      this.close();
    }
  }

  onPokemonFled() {
    showToast('¡El Pokémon huyó!', 'error');
    this.close();
  }

  attemptFlee() {
    if (this.catch.fleeAttempt()) {
      showToast('Escapaste con seguridad', 'info');
      this.close();
    } else {
      showToast('No puedes escapar', 'warning');
    }
  }

  useBerry(berryType) {
    if (this.catch.useBerry(berryType)) {
      showToast('Usaste Baya Frambu', 'success');
      this.container.querySelector('.berry-btn').classList.add('used');
    } else {
      showToast('No tienes bayas', 'error');
    }
  }

  showParticles() {
    const container = this.container;
    const particles = document.createElement('div');
    particles.className = 'particles';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.setProperty('--tx', `${Math.random() * 200 - 100}px`);
      particle.style.setProperty('--ty', `${Math.random() * 200 - 100}px`);
      particle.style.left = '50%';
      particle.style.top = '40%';
      particles.appendChild(particle);
    }
    
    container.appendChild(particles);
  }

  close() {
    this.container.classList.remove('active');
    setTimeout(() => {
      this.container.remove();
      this.catch.endEncounter();
    }, 300);
  }
}
