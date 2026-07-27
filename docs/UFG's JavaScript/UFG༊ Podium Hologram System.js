// ========================================
// Dust Particle System
// ========================================
const rearContainer = document.querySelector('.rear.dust-particles');
const frontContainer = document.querySelector('.front.dust-particles');

const PARTICLE_COUNT = 50;
for (const container of [rearContainer, frontContainer]) {
for(let i = 0; i < PARTICLE_COUNT; i++) {
  const particle = document.createElement('span');
  const maxOpacity = 0.35 + Math.random() * 0.65;
  const travelDistance = 80 + Math.random() * 140;
  const random = Math.random();

  let driftX = 0;
  if(random < 0.2) {
    driftX = -40;
  }

   else if(random < 0.4) {
     driftX = 50;
  }
  
  particle.style.setProperty('--drift-x', driftX + 'px');
  particle.style.animationDelay = Math.random() * 6 + 's';
  particle.style.animationDuration = (3 + Math.random() * 6) + 's';
  particle.style.setProperty('--travel-distance', '-' + travelDistance + 'px');
  particle.style.setProperty('--max-opacity', maxOpacity);
  
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  container.appendChild(particle);
 }
}

console.log('Particle System Loaded');
console.log(container.length);