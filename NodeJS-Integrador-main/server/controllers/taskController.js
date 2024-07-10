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
      const {id} = req.params
      const task = await TaskModel.findByPk(id);
      
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
  
      res.status(200).json(task);
    } catch (error) {
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

      if(!id || !name || !description){
        return res.status(401).json({error: "ID, nombre o descripcion inválida"});
      }

      const tasks = await TaskModel.create({
        id, name, description, completed
      });
      tasks.save();

      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error creating task" });
    }
    res.json({ message: "create task" });
  }, 
  
  /**
   * Actualiza una tarea
   * @route PUT /tasks/:id
   * @param {TaskModel} req.body - Datos de la tarea a actualizar
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  updateTask: async (req, res) => {
    res.json({ message: "Update task" });
  }, 

  /**
   * Actualiza el estado 'completed' de una tarea a true / false respectivamente
   * @param {TaskModel} req.query - El id de la tarea a actualizar 
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error 
   */
  completeTask: async (req, res) => {
    res.json({message: "Completar tarea"})
  },
  
  /**
   * Elimina una tarea
   * @route DELETE /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea eliminada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  deleteTask: async (req, res) => {
    try {
      const id = req.params.id;
      const searchTask = await TaskModel.findOne({where: {id}});
  
      if(!searchTask){
        return res.status(404).json({ message: "Task not found"});
      }
  
      const borrar = await searchTask.destroy();

      return res.status(200).json({
        message: `Task deleted successfully`,
        data: borrar
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
    res.json({ message: "Delete task" });
  }
}

module.exports = taskController;