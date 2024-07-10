const TaskModel = require("../models/Task.js");
const { param } = require("../routes/taskRoutes.js");

const taskController = {
  /**
   * Obtiene todas las tareas de la base de datos
   * @route GET /tasks
   * @returns {Array<TaskModel>} 200 - Retorna un array de objetos con las tareas
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getAllTasks: async (req, res) => {
    try { 
      const tasks = await TaskModel.findAll();

      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting tasks" });
    }
  },

  /**
   * Obtiene una tarea por su id
   * @route GET /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getTaskById: async (req, res) => {
    try {
      // Busca la tarea por su ID en la base de datos usando el modelo Task
      const task = await Task.findByPk(taskId);
      
      // Verifica si se encontró la tarea
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      
      // Retorna la tarea encontrada como respuesta
      res.status(200).json(task);
    } catch (error) {
      // Si ocurre un error, retorna un error 500 con el mensaje
      console.error('Error al obtener la tarea por ID:', error);
      res.status(500).json({ error: 'Error al obtener la tarea por ID' });
    }
    res.json({ message: "Get task by id" });
  },
  
  /**
   * Crea una nueva tarea
   * @route POST /tasks
   * @param {TaskModel} req.body - Datos de la nueva tarea
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea creada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  createTask: async (req, res) => {
    try { 
      const {id, name, description, completed} = req.body
      const tasks = await TaskModel.create();

      if(!){

      }
      res.json({message: "Crear tarea!"});
      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error creating task" });
    }
  }, 
  
  /**
   * Actualiza una tarea
   * @route PUT /tasks/:id
   * @param {TaskModel} req.body - Datos de la tarea a actualizar
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  updateTask: (req, res) => {
    res.json({ message: "Update task" });
  }, 

  /**
   * Actualiza el estado 'completed' de una tarea a true / false respectivamente
   * @param {TaskModel} req.query - El id de la tarea a actualizar 
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error 
   */
  completeTask: (req, res) => {
    res.json({message: "Completar tarea"})
  },
  
  /**
   * Elimina una tarea
   * @route DELETE /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea eliminada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  deleteTask: (req, res) => {
    res.json({ message: "Delete task" });
  }
}

module.exports = taskController;