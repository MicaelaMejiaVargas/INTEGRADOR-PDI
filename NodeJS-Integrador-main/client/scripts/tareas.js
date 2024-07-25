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
const btnMostrar=document.querySelector(".mostrar-tareas");

const renderizarTareas = async () => {
  try {
    let contenido=btnMostrar.textContent;
    console.log(contenido);
    btnMostrar.textContent="Ocultar";

    const tareas = await obtenerTareas();
    const ul = document.getElementById('lista-tareas');
    ul.innerHTML = '';

    tareas.forEach((tarea, i) => {
      const li = document.createElement('li');
      const botonTexto = tarea.completed ? 'Completada' : 'Incompleta';
      const botonClase = tarea.completed ? 'btn-tareas-completed' : 'btn-tareas-incomplete';

      li.innerHTML = `${tarea.id} ${tarea.name} - ${tarea.description} <button class="${botonClase}" onclick="completar(${i})">${botonTexto}</button>`;

      ul.appendChild(li);
    });

  } catch (error) {
    console.error('Error al renderizar tareas:', error);
  }
};

/**
 * Marca una tarea como completada o incompleta
 */
const completar = async (i) => {
  try {
    const tareas = await obtenerTareas();
    const tarea = tareas[i];
    const nuevoEstado = !tarea.completed;

    const datos = {
      completed: nuevoEstado
    };

    const resp = await fetch(`http://localhost:3000/tasks/${tarea.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (!resp.ok) {
      console.log('Error al completar la tarea');
    }
    
    tarea.completed = nuevoEstado;

    renderizarTareas();

  } catch (error) {
    console.error('Error al completar la tarea:', error);
  }
};

btnMostrar.addEventListener("click", renderizarTareas);
