import { navigate } from '../utils/router.js'
import { getAsignaturaById, getConteoPorTema, getFlashcardsByTema, getTemaById } from '../utils/dataService.js'
import './Flashcards.css'

export function FlashcardsPage(container, params) {
  const { asignaturaId } = params

  if (!params.idTema) {
    renderTopicSelector(container, asignaturaId)
    return
  }

  renderFlashcardsByTema(container, params.idTema, asignaturaId)
}

function renderTopicSelector(container, asignaturaId) {
  const asig = getAsignaturaById(asignaturaId)
  const temasConConteo = getConteoPorTema(asignaturaId)

  container.innerHTML = `
    <section class="flashcards-section">
      <h2>Flashcards: ${asig.nombre}</h2>
      <p class="section-subtitle">Selecciona un tema para ver sus tarjetas</p>
      <div class="temas-grid">
        ${temasConConteo.map(tema => `
          <div class="tema-card-selectable" data-id="${tema.id}">
            <h4>${tema.titulo}</h4>
            <p>${tema.tarjetasCount} tarjetas</p>
          </div>
        `).join('')}
      </div>
      <button class="back-btn" data-page="temas" data-asignatura="${asignaturaId}">Volver</button>
    </section>
  `

  container.querySelectorAll('.tema-card-selectable').forEach(card => {
    card.addEventListener('click', () => {
      navigate('flashcards', { asignaturaId, idTema: card.dataset.id })
    })
  })

  container.querySelector('.back-btn').addEventListener('click', () => {
    navigate('temas', { asignaturaId })
  })
}

function renderFlashcardsByTema(container, idTema, asignaturaId) {
  const asig = getAsignaturaById(asignaturaId)
  const tema = getTemaById(asignaturaId, idTema)
  const tarjetas = getFlashcardsByTema(asignaturaId, idTema)

  if (!tarjetas.length) {
    container.innerHTML = `
      <section class="flashcards-section">
        <h2>${tema?.titulo || 'Tema'}</h2>
        <p class="no-content">No hay flashcards para este tema todavía.</p>
        <button class="back-btn" data-page="flashcards" data-asignatura="${asignaturaId}">Volver a temas</button>
      </section>
    `
    container.querySelector('.back-btn').addEventListener('click', () => {
      navigate('flashcards', { asignaturaId })
    })
    return
  }

  container.innerHTML = `
    <section class="flashcards-section">
      <h2>${tema?.titulo || asig.nombre}</h2>
      <p class="section-subtitle">${tarjetas.length} tarjetas - Haz click para voltear</p>
      <div class="flashcards-container">
        ${tarjetas.map((tarjeta, index) => `
          <div class="flashcard" data-index="${index}">
            <div class="flashcard-front">
              <p>${tarjeta.anverso}</p>
              <span class="flip-hint">Click para voltear</span>
            </div>
            <div class="flashcard-back">
              <p>${tarjeta.reverso}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="back-btn" data-page="flashcards" data-asignatura="${asignaturaId}">Volver a temas</button>
    </section>
  `

  container.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped')
    })
  })

  container.querySelector('.back-btn').addEventListener('click', () => {
    navigate('flashcards', { asignaturaId })
  })
}