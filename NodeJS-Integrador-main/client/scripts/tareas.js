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
//     obtenerTareas();
//     try {
//       const response = await fetch('./server/index');
//       const data = await response.json();
  
//       // Array de objetos que representan las tareas
//       const tareas = data.tareas;
//       const listaTareas = document.getElementById('lista-tareas'); 
  
//       // Limpia cualquier contenido previo en la lista
//       listaTareas.innerHTML = '';
  
//       // Itera sobre las tareas y crea elementos <li> para cada una
//       tareas.forEach(tarea => {
//         const li = document.createElement('li');
//         li.textContent = `${tarea.id} : ${tarea.name} - ${tarea.description} (${tarea.completed ? 'true' : 'false'})`;
//         listaTareas.appendChild(li);
//       });
  
//     } catch (error) {
//       console.error('Error al renderizar tareas:', error);
//     }
//   }  

// }

// document.querySelector('.tareas-creadas').addEventListener('submit', handlerFormulario);

function renderizarTareas() {
  listaContactos.innerHTML = '';

  contactos.forEach((contacto, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';

      const contenido = `
          <li>${contacto.nombre} ${contacto.apellido} ${contacto.telefono}</li>
          <button class="btn btn-outline-danger btn-sm ms-2" onclick="toggleFavorito(${index})">
              ${contacto.favorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </button>
      `;

      li.innerHTML = contenido;
      listaContactos.appendChild(li);
  });
}
renderizarTareas();