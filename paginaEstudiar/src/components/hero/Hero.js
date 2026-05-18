export function loadHero(container) {
  const heroSection = document.createElement('section')
  heroSection.id = 'hero'
  heroSection.className = 'hero'
  heroSection.innerHTML = `
    <div class="hero-content">
      <h2>Repasa tus estudios</h2>
      <p>Temarios, cuestionarios y flashcards para dominar tu grado superior</p>
      <button class="hero-btn" data-page="asignaturas">Comenzar</button>
    </div>
  `
  
  heroSection.querySelector('.hero-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'asignaturas', params: {} } }))
  })

  container.appendChild(heroSection)
}