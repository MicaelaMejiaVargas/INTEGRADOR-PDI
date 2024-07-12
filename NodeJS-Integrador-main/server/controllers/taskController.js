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
      const id = req.params.id;
      const task = await TaskModel.findByPk(id);
      
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error al obtener la tarea por ID:', error);
      res.status(500).json({ error: 'Error al obtener la tarea por ID' });
    }
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

      // if(!id || !name || !description || !completed){
      //   return res.status(401).json({error: "ID, nombre o descripcion inválida"});
      // }

      const tasks = await TaskModel.create({
        id, name, description, completed
      });
      tasks.save();

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
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const {id, name, description, completed} = req.body

      // Encuentra la tarea por su ID
      const updatedTask = await TaskModel.findOne({ where: { id: taskId }});

      if (!updatedTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      //Luego de encontrar el ID - Actualíza con los datos recibidos
      const actualizaTask = await updatedTask.update({name, description, completed});
      
      // Si la tarea se actualiza correctamente, devuelve la tarea actualizada
      res.status(200).json(actualizaTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  }, 

  /**
   * Actualiza el estado 'completed' de una tarea a true / false respectivamente
   * @param {TaskModel} req.query - El id de la tarea a actualizar 
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error 
   */
  completeTask: async (req, res) => {
    try {
      const taskId = req.query.id;
      const completed = req.query.completed === 'true'; // Convierte el string 'true' o 'false' a booleano
    
      // Encuentra la tarea por su ID
      const completarTask = await TaskModel.findOne({ where: { id: taskId}});
  
      if (!completarTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
  
      const comTask = await completarTask.update({completed});
      
      res.status(200).json(comTask);
    } catch (error) {
      console.log(error);
      // Si hay un error en el servidor, devuelve un error 500
      res.status(500).json({ error: 'Error al completar la tarea' });
    }
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
  }
}

module.exports = taskController;