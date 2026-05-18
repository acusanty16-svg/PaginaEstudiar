import asignaturasData from '../data/asignaturas.json'
import temasData from '../data/temas.json'
import preguntasData from '../data/preguntas.json'
import flashcardsData from '../data/flashcards.json'

export function getAsignaturaById(id) {
  return asignaturasData.find(a => a.id === id)
}

export function getTemasByAsignatura(idAsignatura) {
  return temasData.find(t => t.idAsignatura === idAsignatura)
}

export function getPreguntasByAsignatura(idAsignatura) {
  return preguntasData.find(p => p.idAsignatura === idAsignatura)
}

export function getFlashcardsByAsignatura(idAsignatura) {
  return flashcardsData.find(f => f.idAsignatura === idAsignatura)
}

export function getPreguntasByTema(idAsignatura, idTema) {
  const data = preguntasData.find(p => p.idAsignatura === idAsignatura)
  if (!data) return []
  return data.preguntas.filter(p => p.idTema === idTema)
}

export function getFlashcardsByTema(idAsignatura, idTema) {
  const data = flashcardsData.find(f => f.idAsignatura === idAsignatura)
  if (!data) return []
  return data.tarjetas.filter(t => t.idTema === idTema)
}

export function getTemaById(idAsignatura, idTema) {
  const temas = temasData.find(t => t.idAsignatura === idAsignatura)
  if (!temas) return null
  return temas.temas.find(t => t.id === idTema)
}

export function getConteoPorTema(idAsignatura) {
  const temas = temasData.find(t => t.idAsignatura === idAsignatura)
  const flashcards = flashcardsData.find(f => f.idAsignatura === idAsignatura)
  const preguntas = preguntasData.find(p => p.idAsignatura === idAsignatura)

  if (!temas) return []

  return temas.temas.map(tema => ({
    ...tema,
    tarjetasCount: flashcards?.tarjetas.filter(t => t.idTema === tema.id).length || 0,
    preguntasCount: preguntas?.preguntas.filter(p => p.idTema === tema.id).length || 0
  }))
}

export { asignaturasData, temasData, preguntasData, flashcardsData }