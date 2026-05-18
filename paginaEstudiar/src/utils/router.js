export const navigate = (page, params = {}) => {
  window.dispatchEvent(new CustomEvent('navigate', { detail: { page, params } }))
}