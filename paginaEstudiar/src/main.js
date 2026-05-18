import './style.css'
import './components/header/Header.css'
import './components/hero/Hero.css'
import { loadHeader } from './components/header/Header.js'
import { loadHero } from './components/hero/Hero.js'
import { loadBody } from './components/body/Body.js'
import { loadFooter } from './components/footer/Footer.js'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')

  const header = document.createElement('header')
  header.id = 'header'
  app.appendChild(header)

  const main = document.createElement('main')
  main.id = 'main-content'
  app.appendChild(main)

  const footer = document.createElement('footer')
  footer.id = 'footer'
  app.appendChild(footer)

  loadHeader(header)
  loadHero(main)
  loadBody(main)
  loadFooter(footer)
})