import { HomePage } from '../../pages/Home.js'
import { AsignaturasPage } from '../../pages/Asignaturas.js'
import { TemasPage } from '../../pages/Temas.js'
import { QuizPage } from '../../pages/Quiz.js'
import { FlashcardsPage } from '../../pages/Flashcards.js'

export function loadBody(container) {
  container.innerHTML = '<div id="content"></div>'
  const content = document.querySelector('#content')
  HomePage(content)

  window.addEventListener('navigate', (e) => {
    let page, params
    if (typeof e.detail === 'string') {
      page = e.detail
      params = {}
    } else {
      page = e.detail.page
      params = e.detail.params || {}
    }
    renderPage(page, params, content)
  })
}

function renderPage(page, params, content) {
  switch(page) {
    case 'home':
      HomePage(content)
      break
    case 'asignaturas':
      AsignaturasPage(content)
      break
    case 'temas':
      TemasPage(content, params)
      break
    case 'quiz':
      QuizPage(content, params)
      break
    case 'flashcards':
      FlashcardsPage(content, params)
      break
  }
}