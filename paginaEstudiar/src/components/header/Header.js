export function loadHeader(container) {
  container.innerHTML = `
    <div class="header-content">
      <h1 class="logo">📚 RepasaTodo</h1>
      <nav class="nav">
        <button class="nav-btn" data-page="home">Inicio</button>
        <button class="nav-btn" data-page="asignaturas">Asignaturas</button>
      </nav>
    </div>
  `

  container.querySelector('.nav').addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn')) {
      const page = e.target.dataset.page
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page, params: {} } }))
    }
  })
}