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
  try {
    const respuesta = await obtenerTareas();
    const ulMostrar = document.getElementById('lista-tareas');
    ulMostrar.innerHTML = '';

    const ul = document.createElement('ul');

    respuesta.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `${tarea.id}: ${tarea.name} - ${tarea.description} (${tarea.completed ? 'true' : 'false'})`;
      ul.appendChild(li); 
    });

    ulMostrar.appendChild(ul);

  } catch (error) {
    console.error('Error al renderizar tareas:', error);
  }
}

renderizarTareas();