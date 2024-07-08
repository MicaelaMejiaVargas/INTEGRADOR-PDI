/**
 * Obtiene las tareas de la base de datos
 * @returns {Array[Object]} - Un listado de tareas
 */
const obtenerTareas = async () => {
  const respuesta = await fetch('http://localhost:3000/tasks', {
    method: 'GET'
  })
  const tareas = await respuesta.json()

  return tareas
}

/**
 * Completa la lista <ul> con las tareas obtenidas
 */
const renderizarTareas = async () => {
  // Su implementación
}

renderizarTareas();