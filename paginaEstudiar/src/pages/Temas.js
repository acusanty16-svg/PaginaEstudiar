import { navigate } from '../utils/router.js'
import { getAsignaturaById, getTemasByAsignatura } from '../utils/dataService.js'
import './Temas.css'

export function TemasPage(container, params) {
  const { asignaturaId } = params
  const asig = getAsignaturaById(asignaturaId)
  const temasData = getTemasByAsignatura(asignaturaId)

  container.innerHTML = `
    <section class="temas-section">
      <h2>${asig.icono} ${asig.nombre}</h2>
      <div class="temas-list">
        ${temasData.temas.map(tema => `
          <div class="tema-card">
            <h4>${tema.titulo}</h4>
            <p>${tema.contenido}</p>
          </div>
        `).join('')}
      </div>
      <div class="tema-actions">
        <button class="action-btn" data-page="quiz" data-asignatura="${asignaturaId}">Cuestionario</button>
        <button class="action-btn" data-page="flashcards" data-asignatura="${asignaturaId}">Flashcards</button>
      </div>
      <button class="back-btn" data-page="asignaturas">Volver</button>
    </section>
  `

  container.querySelector('.back-btn').addEventListener('click', (e) => {
    navigate(e.target.dataset.page)
  })

  container.querySelector('[data-page="quiz"]').addEventListener('click', () => {
    navigate('quiz', { asignaturaId })
  })

  container.querySelector('[data-page="flashcards"]').addEventListener('click', () => {
    navigate('flashcards', { asignaturaId })
  })
}