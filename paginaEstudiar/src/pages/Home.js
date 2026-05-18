import { navigate } from '../utils/router.js'
import './Home.css'

export function HomePage(container) {
  container.innerHTML = `
    <section class="welcome">
      <h3>Bienvenido a tu plataforma de estudio</h3>
      <p>Selecciona una asignatura para comenzar a repasar</p>
      <button class="action-btn" data-page="asignaturas">Ver Asignaturas</button>
    </section>
  `

  container.querySelector('.action-btn').addEventListener('click', (e) => {
    navigate(e.target.dataset.page)
  })
}