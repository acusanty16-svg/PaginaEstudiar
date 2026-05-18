import { navigate } from '../utils/router.js'
import { asignaturasData } from '../utils/dataService.js'
import './Asignaturas.css'

export function AsignaturasPage(container) {
  container.innerHTML = `
    <section class="asignaturas-section">
      <h2>Asignaturas</h2>
      <div class="asignaturas-grid">
        ${asignaturasData.map(asig => `
          <div class="asignatura-card" data-id="${asig.id}">
            <span class="asignatura-icon">${asig.icono}</span>
            <h3>${asig.nombre}</h3>
            <p>${asig.descripcion}</p>
          </div>
        `).join('')}
      </div>
      <button class="back-btn" data-page="home">Volver</button>
    </section>
  `

  container.querySelectorAll('.asignatura-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate('temas', { asignaturaId: card.dataset.id })
    })
  })

  container.querySelector('.back-btn').addEventListener('click', (e) => {
    navigate(e.target.dataset.page)
  })
}