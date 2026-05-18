import { navigate } from '../utils/router.js'
import { getAsignaturaById, getConteoPorTema, getPreguntasByTema, getTemaById } from '../utils/dataService.js'
import './Quiz.css'

export function QuizPage(container, params) {
  const { asignaturaId } = params

  if (!params.idTema) {
    renderTopicSelector(container, asignaturaId)
    return
  }

  renderQuizByTema(container, params.idTema, asignaturaId)
}

function renderTopicSelector(container, asignaturaId) {
  const asig = getAsignaturaById(asignaturaId)
  const temasConConteo = getConteoPorTema(asignaturaId)

  container.innerHTML = `
    <section class="quiz-section">
      <h2>Cuestionario: ${asig.nombre}</h2>
      <p class="section-subtitle">Selecciona un tema para hacer el cuestionario</p>
      <div class="temas-grid">
        ${temasConConteo.map(tema => `
          <div class="tema-card-selectable" data-id="${tema.id}">
            <h4>${tema.titulo}</h4>
            <p>${tema.preguntasCount} preguntas</p>
          </div>
        `).join('')}
      </div>
      <button class="back-btn" data-page="temas" data-asignatura="${asignaturaId}">Volver</button>
    </section>
  `

  container.querySelectorAll('.tema-card-selectable').forEach(card => {
    card.addEventListener('click', () => {
      navigate('quiz', { asignaturaId, idTema: card.dataset.id })
    })
  })

  container.querySelector('.back-btn').addEventListener('click', () => {
    navigate('temas', { asignaturaId })
  })
}

function renderQuizByTema(container, idTema, asignaturaId) {
  const asig = getAsignaturaById(asignaturaId)
  const tema = getTemaById(asignaturaId, idTema)
  const preguntas = getPreguntasByTema(asignaturaId, idTema)

  if (!preguntas.length) {
    container.innerHTML = `
      <section class="quiz-section">
        <h2>${tema?.titulo || 'Tema'}</h2>
        <p class="no-content">No hay preguntas para este tema todavía.</p>
        <button class="back-btn" data-page="quiz" data-asignatura="${asignaturaId}">Volver a temas</button>
      </section>
    `
    container.querySelector('.back-btn').addEventListener('click', () => {
      navigate('quiz', { asignaturaId })
    })
    return
  }

  container.innerHTML = `
    <section class="quiz-section">
      <h2>${tema?.titulo || asig.nombre}</h2>
      <p class="section-subtitle">${preguntas.length} preguntas</p>
      <div class="quiz-container">
        ${preguntas.map((preg, index) => `
          <div class="pregunta-card" data-index="${index}">
            <p class="pregunta-text">${index + 1}. ${preg.pregunta}</p>
            <div class="opciones">
              ${preg.opciones.map((op, i) => `
                <label class="opcion">
                  <input type="radio" name="preg-${index}" value="${i}">
                  <span>${op}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <button class="check-btn">Verificar respuestas</button>
      <button class="back-btn" data-page="quiz" data-asignatura="${asignaturaId}">Volver a temas</button>
    </section>
  `

  container.querySelector('.back-btn').addEventListener('click', () => {
    navigate('quiz', { asignaturaId })
  })

  container.querySelector('.check-btn').addEventListener('click', () => {
    const preguntasEl = container.querySelectorAll('.pregunta-card')
    let correctas = 0

    preguntasEl.forEach((pregCard, index) => {
      const pregunta = preguntas[index]
      const seleccionada = pregCard.querySelector('input:checked')

      pregCard.classList.remove('correcta', 'incorrecta')

      if (seleccionada && parseInt(seleccionada.value) === pregunta.respuestaCorrecta) {
        pregCard.classList.add('correcta')
        correctas++
      } else if (seleccionada) {
        pregCard.classList.add('incorrecta')
      }
    })

    alert(`Has acertado ${correctas} de ${preguntas.length}`)
  })
}