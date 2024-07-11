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
    const response = await fetch('./server/index');
    const data = await response.json();

    // Array de objetos que representan las tareas
    const tareas = data.tareas;
    const listaTareas = document.getElementById('lista-tareas'); 

    // Limpia cualquier contenido previo en la lista
    listaTareas.innerHTML = '';

    // Itera sobre las tareas y crea elementos <li> para cada una
    tareas.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `${tarea.id} : ${tarea.name} - ${tarea.description} (${tarea.completed ? 'true' : 'false'})`;
      listaTareas.appendChild(li);
    });

  } catch (error) {
    console.error('Error al renderizar tareas:', error);
  }
}

renderizarTareas();